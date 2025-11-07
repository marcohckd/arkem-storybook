import * as fs from "node:fs";
import * as path from "node:path";

interface TokenValue {
  $value: string | number;
  $type?: string;
}

type TokenObject = Record<string, TokenValue | Record<string, any>>;

/**
 * Converts a hierarchical JSON path to kebab-case
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/gi, "-")
    .toLowerCase()
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Flattens hierarchical token object to flat kebab-case structure
 */
function flattenTokens(
  obj: TokenObject,
  prefix: string[] = [],
  flat: Record<string, string | number> = {}
): Record<string, string | number> {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;

    const newPrefix = [...prefix, key];
    const flatKey = newPrefix.map(toKebabCase).join("-");

    if (value && typeof value === "object" && "$value" in value) {
      const token = value as TokenValue;
      flat[flatKey] = token.$value;
    } else if (value && typeof value === "object") {
      flattenTokens(value as TokenObject, newPrefix, flat);
    }
  }
  return flat;
}

/**
 * Extracts color value from token structure
 */
function getColorValue(
  obj: TokenObject,
  ...path: string[]
): string | undefined {
  let current: any = obj;
  for (const segment of path) {
    if (current && typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }
  if (current && typeof current === "object" && "$value" in current) {
    return String(current.$value);
  }
  return undefined;
}

/**
 * Helper to get nested value safely
 */
function getNested(obj: any, ...path: string[]): any {
  let current = obj;
  for (const segment of path) {
    if (current && typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }
  return current;
}

/**
 * Main normalization function
 */
function normalizeTokens(): void {
  const tokensPath = path.join(process.cwd(), "arkem-tokens.json");
  const flatPath = path.join(process.cwd(), "src/arkem-tokens.flat.json");
  const tokensCssPath = path.join(process.cwd(), "src/styles/tokens.css");
  const semanticCssPath = path.join(
    process.cwd(),
    "src/styles/tokens-semantic.css"
  );

  // Read source tokens
  if (!fs.existsSync(tokensPath)) {
    throw new Error(`Token file not found: ${tokensPath}`);
  }

  const jsonContent = fs.readFileSync(tokensPath, "utf-8");
  const tokens: TokenObject = JSON.parse(jsonContent);

  // Build flat JSON
  const flatTokens = flattenTokens(tokens);
  fs.writeFileSync(
    flatPath,
    JSON.stringify(flatTokens, null, 2),
    "utf-8"
  );
  console.log(`✓ Generated flat tokens: ${Object.keys(flatTokens).length} variables`);

  const colorStroke = getNested(tokens, "Color/Stroke");
  
  // Build tokens.css
  const cssLines: string[] = [":root {"];
  const levels = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

  // Neutral: fill/stroke/icon
  const neutral = getNested(colorStroke, "Neutral");
  if (neutral) {
    for (const level of levels) {
      const levelToken = getNested(neutral, level);
      if (levelToken && "$value" in levelToken) {
        const color = String(levelToken.$value);
        cssLines.push(`  --color-fill-neutral-${level}: ${color};`);
        cssLines.push(`  --color-stroke-neutral-${level}: ${color};`);
        cssLines.push(`  --color-icon-neutral-${level}: ${color};`);
      }
    }
  }

  // Brand: fill/stroke/icon
  const brand = getNested(colorStroke, "Brand");
  if (brand) {
    for (const level of levels) {
      const levelToken = getNested(brand, level);
      if (levelToken && "$value" in levelToken) {
        const color = String(levelToken.$value);
        cssLines.push(`  --color-fill-brand-${level}: ${color};`);
        cssLines.push(`  --color-stroke-brand-${level}: ${color};`);
        cssLines.push(`  --color-icon-brand-${level}: ${color};`);
      }
    }
  }

  // Feedback: fill/stroke for success/warning/error
  const feedback = getNested(colorStroke, "Feedback");
  const feedbackTypes = ["Success", "Warning", "Error"];
  if (feedback) {
    for (const type of feedbackTypes) {
      const typeLower = type.toLowerCase();
      const typeObj = getNested(feedback, type);
      if (typeObj) {
        for (const level of ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]) {
          const levelToken = getNested(typeObj, level);
          if (levelToken && "$value" in levelToken) {
            const color = String(levelToken.$value);
            cssLines.push(`  --color-fill-feedback-${typeLower}-${level}: ${color};`);
            cssLines.push(`  --color-stroke-feedback-${typeLower}-${level}: ${color};`);
          }
        }
      }
    }
  }

  // Text tokens
  const semantic = getNested(colorStroke, "Semantic");
  const text = getNested(semantic, "Text");
  const textPrimary = text?.Primary?.$value ? String(text.Primary.$value) : undefined;
  const textSecondary = text?.Secondary?.$value ? String(text.Secondary.$value) : undefined;
  const textMuted = text?.Muted?.$value ? String(text.Muted.$value) : undefined;
  const textInverse = text?.Inverse?.$value ? String(text.Inverse.$value) : undefined;
  const textHover = text?.Hover?.$value ? String(text.Hover.$value) : undefined;

  if (textPrimary) cssLines.push(`  --color-text-primary: ${textPrimary};`);
  if (textSecondary) cssLines.push(`  --color-text-secondary: ${textSecondary};`);
  if (textMuted) cssLines.push(`  --color-text-muted: ${textMuted};`);
  if (textInverse) cssLines.push(`  --color-text-inverse: ${textInverse};`);
  if (textHover) cssLines.push(`  --color-text-hover: ${textHover};`);

  // Add other existing tokens (border-widths, radius, spacing, typography)
  const otherSections = [
    "Border Widths/Mode 1",
    "Typography/Mode 1",
    "Spacing/Style",
    "Radius/Mode 1",
  ];

  for (const section of otherSections) {
    const sectionObj = getNested(tokens, section);
    if (sectionObj) {
      const sectionTokens = flattenTokens(sectionObj, [section]);
      for (const [key, value] of Object.entries(sectionTokens)) {
        const cssKey = key.replace(/\//g, "-");
        if (typeof value === "number") {
          // Check if it's a unitless value
          const lowerKey = key.toLowerCase();
          if (lowerKey.includes("font-weight") || lowerKey.includes("opacity") || lowerKey.includes("z-index")) {
            cssLines.push(`  --${cssKey}: ${value};`);
          } else {
            cssLines.push(`  --${cssKey}: ${value}px;`);
          }
        } else {
          cssLines.push(`  --${cssKey}: ${value};`);
        }
      }
    }
  }

  cssLines.push("}");

  fs.writeFileSync(tokensCssPath, cssLines.join("\n"), "utf-8");
  console.log(`✓ Generated tokens.css`);

  // Build tokens-semantic.css
  const semanticLines: string[] = [":root {"];
  
  // Background
  const bg = getNested(semantic, "Background");
  if (bg) {
    if (bg.Base?.$value) semanticLines.push(`  --semantic-background-base: ${bg.Base.$value};`);
    if (bg.Raised?.$value) semanticLines.push(`  --semantic-background-raised: ${bg.Raised.$value};`);
    if (bg.Interactive?.$value) semanticLines.push(`  --semantic-background-interactive: ${bg.Interactive.$value};`);
    if (bg.Overlay?.$value) semanticLines.push(`  --semantic-background-overlay: ${bg.Overlay.$value};`);
    if (bg.Backdrop?.$value) semanticLines.push(`  --semantic-background-backdrop: ${bg.Backdrop.$value};`);
    if (bg.Muted?.$value) semanticLines.push(`  --semantic-background-muted: ${bg.Muted.$value};`);
  }

  // Border
  const border = getNested(semantic, "Border");
  if (border) {
    if (border.Subtle?.$value) semanticLines.push(`  --semantic-border-subtle: ${border.Subtle.$value};`);
    if (border.Muted?.$value) semanticLines.push(`  --semantic-border-muted: ${border.Muted.$value};`);
    if (border.Strong?.$value) semanticLines.push(`  --semantic-border-strong: ${border.Strong.$value};`);
  }

  // Brand
  const brandSemantic = getNested(semantic, "Brand");
  if (brandSemantic) {
    if (brandSemantic.Base?.$value) semanticLines.push(`  --semantic-brand-base: ${brandSemantic.Base.$value};`);
    if (brandSemantic.Hover?.$value) semanticLines.push(`  --semantic-brand-hover: ${brandSemantic.Hover.$value};`);
    if (brandSemantic.Active?.$value) semanticLines.push(`  --semantic-brand-active: ${brandSemantic.Active.$value};`);
    if (brandSemantic.Pressed?.$value) semanticLines.push(`  --semantic-brand-pressed: ${brandSemantic.Pressed.$value};`);
    if (brandSemantic.Muted?.$value) semanticLines.push(`  --semantic-brand-muted: ${brandSemantic.Muted.$value};`);
    if (brandSemantic.Mode?.$value) semanticLines.push(`  --semantic-brand-mode: ${brandSemantic.Mode.$value};`);
  }

  // Text (aliases to color-text-*)
  semanticLines.push(`  --semantic-text-primary: var(--color-text-primary);`);
  semanticLines.push(`  --semantic-text-secondary: var(--color-text-secondary);`);
  semanticLines.push(`  --semantic-text-muted: var(--color-text-muted);`);
  semanticLines.push(`  --semantic-text-inverse: var(--color-text-inverse);`);
  semanticLines.push(`  --semantic-text-hover: var(--color-text-hover);`);

  // Feedback
  const feedbackSemantic = getNested(semantic, "Feedback");
  if (feedbackSemantic) {
    for (const type of feedbackTypes) {
      const typeLower = type.toLowerCase();
      const typeObj = getNested(feedbackSemantic, type);
      if (typeObj) {
        if (typeObj.Base?.$value) semanticLines.push(`  --semantic-feedback-${typeLower}-base: ${typeObj.Base.$value};`);
        if (typeObj.Surface?.$value) semanticLines.push(`  --semantic-feedback-${typeLower}-surface: ${typeObj.Surface.$value};`);
        if (typeObj.TextOn?.$value) semanticLines.push(`  --semantic-feedback-${typeLower}-texton: ${typeObj.TextOn.$value};`);
      }
    }
  }

  // Focus
  const focus = getNested(semantic, "Focus");
  if (focus?.Ring?.$value) semanticLines.push(`  --semantic-focus-ring: ${focus.Ring.$value};`);

  // POIs
  const pois = getNested(semantic, "POIs");
  if (pois && typeof pois === "object") {
    for (const [key, value] of Object.entries(pois)) {
      if (value && typeof value === "object" && "$value" in value) {
        const poiKey = toKebabCase(key === "point(generic)" ? "point-generic" : key);
        semanticLines.push(`  --poi-${poiKey}: ${(value as TokenValue).$value};`);
      }
    }
  }

  // Connections
  const connections = getNested(colorStroke, "Connections");
  if (connections) {
    if (connections["Cluster 1"]?.$value) semanticLines.push(`  --connections-cluster-1: ${connections["Cluster 1"].$value};`);
    if (connections["Cluster 2"]?.$value) semanticLines.push(`  --connections-cluster-2: ${connections["Cluster 2"].$value};`);
    if (connections.Color?.$value) semanticLines.push(`  --connections-color: ${connections.Color.$value};`);
  }

  // Tone grey convenience tokens
  const neutral200 = neutral?.["200"]?.$value ? String(neutral["200"].$value) : undefined;
  const neutral300 = neutral?.["300"]?.$value ? String(neutral["300"].$value) : undefined;
  const neutral800 = neutral?.["800"]?.$value ? String(neutral["800"].$value) : undefined;

  if (neutral200) {
    semanticLines.push(`  --tone-grey-default: var(--color-fill-neutral-200);`);
    semanticLines.push(`  --tone-grey-focused: var(--color-fill-neutral-200);`);
  }
  if (neutral300) semanticLines.push(`  --tone-grey-hover: var(--color-fill-neutral-300);`);
  if (neutral800) semanticLines.push(`  --tone-grey-disabled: var(--color-fill-neutral-800);`);

  // Typography semantic tokens
  semanticLines.push(`  --font-family-base: var(--typography-mode-1-font-family-ibm-plex-sans);`);
  semanticLines.push(`  --font-size-10: var(--typography-mode-1-font-size-10);`);
  semanticLines.push(`  --font-size-11: var(--typography-mode-1-font-size-11);`);
  semanticLines.push(`  --font-size-12: var(--typography-mode-1-font-size-12);`);
  semanticLines.push(`  --font-size-14: var(--typography-mode-1-font-size-14);`);
  semanticLines.push(`  --font-size-16: var(--typography-mode-1-font-size-16);`);
  semanticLines.push(`  --font-size-18: var(--typography-mode-1-font-size-18);`);
  semanticLines.push(`  --font-size-20: var(--typography-mode-1-font-size-20);`);
  semanticLines.push(`  --font-size-24: var(--typography-mode-1-font-size-24);`);
  semanticLines.push(`  --font-size-30: var(--typography-mode-1-font-size-30);`);
  semanticLines.push(`  --font-size-36: var(--typography-mode-1-font-size-36);`);
  semanticLines.push(`  --font-size-48: var(--typography-mode-1-font-size-48);`);
  semanticLines.push(`  --font-size-60: var(--typography-mode-1-font-size-60);`);
  semanticLines.push(`  --font-size-72: var(--typography-mode-1-font-size-72);`);

  // Line heights
  semanticLines.push(`  --line-14: var(--typography-mode-1-line-height-14);`);
  semanticLines.push(`  --line-16: var(--typography-mode-1-line-height-16);`);
  semanticLines.push(`  --line-18: var(--typography-mode-1-line-height-18);`);
  semanticLines.push(`  --line-20: var(--typography-mode-1-line-height-20);`);
  semanticLines.push(`  --line-24: var(--typography-mode-1-line-height-24);`);
  semanticLines.push(`  --line-28: var(--typography-mode-1-line-height-28);`);
  semanticLines.push(`  --line-30: var(--typography-mode-1-line-height-30);`);
  semanticLines.push(`  --line-32: var(--typography-mode-1-line-height-32);`);
  semanticLines.push(`  --line-38: var(--typography-mode-1-line-height-38);`);
  semanticLines.push(`  --line-44: var(--typography-mode-1-line-height-44);`);
  semanticLines.push(`  --line-60: var(--typography-mode-1-line-height-60);`);
  semanticLines.push(`  --line-72: var(--typography-mode-1-line-height-72);`);
  semanticLines.push(`  --line-90: var(--typography-mode-1-line-height-90);`);

  // Font weights
  semanticLines.push(`  --font-weight-regular: var(--typography-mode-1-font-weight-regular);`);
  semanticLines.push(`  --font-weight-medium: var(--typography-mode-1-font-weight-medium);`);
  semanticLines.push(`  --font-weight-semibold: var(--typography-mode-1-font-weight-semibold);`);
  semanticLines.push(`  --font-weight-bold: var(--typography-mode-1-font-weight-bold);`);

  // Spacing aliases
  semanticLines.push(`  --spacing-8: var(--spacing-style-spacing-4px-2-8px);`);
  semanticLines.push(`  --spacing-12: var(--spacing-style-spacing-4px-3-12px);`);

  // Radius aliases
  semanticLines.push(`  --radius-xs: var(--radius-mode-1-radius-xs);`);
  semanticLines.push(`  --radius-sm: var(--radius-mode-1-radius-sm);`);
  semanticLines.push(`  --radius-md: var(--radius-mode-1-radius-md);`);

  // Border aliases
  semanticLines.push(`  --border-width-thin: var(--border-widths-mode-1-border-width-thin);`);
  semanticLines.push(`  --border-text-hover: var(--semantic-text-hover);`);
  semanticLines.push(`  --border-text-subtle: var(--semantic-border-subtle);`);
  semanticLines.push(`  --border-text-strong: var(--semantic-border-strong);`);
  semanticLines.push(`  --border-text-muted: var(--semantic-border-muted);`);

  // Shadow aliases
  semanticLines.push(`  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);`);
  semanticLines.push(`  --shadow-skeuomorphic: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1);`);

  semanticLines.push("}");

  fs.writeFileSync(semanticCssPath, semanticLines.join("\n"), "utf-8");
  console.log(`✓ Generated tokens-semantic.css`);

  // Count variables
  const fillCount = levels.length * 2; // neutral + brand
  const strokeCount = levels.length * 2; // neutral + brand
  const iconCount = levels.length * 2; // neutral + brand
  const feedbackFillCount = 3 * 11; // 3 types * 11 levels
  const feedbackStrokeCount = 3 * 11;
  const textCount = 5;

  console.log("\n📊 Token Counts:");
  console.log(`  Fill: ${fillCount} (neutral) + ${fillCount} (brand) + ${feedbackFillCount} (feedback) = ${fillCount * 2 + feedbackFillCount}`);
  console.log(`  Stroke: ${strokeCount} (neutral) + ${strokeCount} (brand) + ${feedbackStrokeCount} (feedback) = ${strokeCount * 2 + feedbackStrokeCount}`);
  console.log(`  Icon: ${iconCount}`);
  console.log(`  Text: ${textCount}`);
  console.log(`  Total color tokens: ${(fillCount * 2 + feedbackFillCount) + (strokeCount * 2 + feedbackStrokeCount) + iconCount + textCount}`);
}

// Run
try {
  normalizeTokens();
} catch (error) {
  console.error("Error normalizing tokens:", error);
  process.exit(1);
}

