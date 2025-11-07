import * as fs from "node:fs";
import * as path from "node:path";

interface TokenValue {
  $value: string | number;
  $type?: string;
}

type TokenObject = Record<string, TokenValue | Record<string, any>>;

/**
 * Sanitizes a token name to only include letters, numbers, and hyphens
 */
function sanitizeName(name: string): string {
  // Replace any character that's not a letter, number, or hyphen with a hyphen
  // Convert to lowercase
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    // Replace multiple consecutive hyphens with a single hyphen
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}

/**
 * Checks if a value already has CSS units
 */
function hasUnits(value: string): boolean {
  // Check for common CSS units: px, em, rem, %, vh, vw, ch, ex, etc.
  return /^\d*\.?\d+\s*(px|em|rem|%|vh|vw|ch|ex|vmin|vmax|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)$/i.test(
    value.trim()
  );
}

/**
 * Checks if a value is a color (hex, rgb, rgba, etc.)
 */
function isColor(value: string): boolean {
  // Check for hex colors, rgb/rgba/hsl/hsla functions
  return (
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl") ||
    value.startsWith("var(")
  );
}

/**
 * Formats CSS value - appends px to numeric values unless already unit-specified or unitless
 */
function formatCSSValue(
  value: string | number,
  type?: string,
  path: string = ""
): string {
  const strValue = String(value);

  // If it's already a color, string with units, or a string type, use as-is
  if (isColor(strValue) || hasUnits(strValue) || type === "text") {
    return strValue;
  }

  // If it's a number (numeric string without units)
  if (typeof value === "number" || /^-?\d*\.?\d+$/.test(strValue)) {
    // Check if it's a unitless CSS property (font-weight, opacity, z-index)
    // Font-weight is typically 400, 500, 600, 700 (unitless)
    // But spacing, font-size, border-width, radius need px
    const lowerPath = path.toLowerCase();
    if (
      lowerPath.includes("font-weight") ||
      lowerPath.includes("opacity") ||
      lowerPath.includes("z-index")
    ) {
      return strValue; // Keep unitless
    }
    // Otherwise append px
    return `${strValue}px`;
  }

  // Otherwise return as-is
  return strValue;
}

/**
 * Recursively walks through token object and builds CSS variables
 * Excludes the Semantic section
 */
function buildCSSVariables(
  obj: TokenObject,
  prefix: string[] = [],
  variables: Map<string, string> = new Map(),
  currentPath: string = ""
): Map<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata keys
    if (key.startsWith("$")) {
      continue;
    }

    // Skip Semantic section - we handle that separately
    if (key === "Semantic") {
      continue;
    }

    const newPath = [...prefix, key];
    const pathKey = newPath.map(sanitizeName).join("-");
    const fullPath = currentPath ? `${currentPath}/${key}` : key;

    if (value && typeof value === "object" && "$value" in value) {
      // Found a token value
      const token = value as TokenValue;
      const cssValue = formatCSSValue(token.$value, token.$type, fullPath);
      variables.set(pathKey, cssValue);
    } else if (value && typeof value === "object") {
      // Recursively process nested objects
      buildCSSVariables(
        value as TokenObject,
        newPath,
        variables,
        fullPath
      );
    }
  }

  return variables;
}

/**
 * Formats CSS variable name (e.g., color-stroke-neutral-25 -> --color-stroke-neutral-25)
 */
function formatCSSVariableName(name: string): string {
  return `--${name}`;
}

/**
 * Main build function
 */
function buildTokens(): void {
  const inputPath = path.join(process.cwd(), "src/styles/arkem-tokens.json");
  const outputPath = path.join(process.cwd(), "src/styles/tokens.css");

  // Read input JSON
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Token file not found: ${inputPath}`);
  }

  const jsonContent = fs.readFileSync(inputPath, "utf-8");
  const tokens: TokenObject = JSON.parse(jsonContent);

  // Build CSS variables map (excluding Semantic)
  const variables = buildCSSVariables(tokens);

  // Generate CSS content
  const cssLines: string[] = [];
  cssLines.push(":root {");

  // Sort variables alphabetically for consistent output
  Array.from(variables.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([name, value]) => {
      const cssVarName = formatCSSVariableName(name);
      cssLines.push(`  ${cssVarName}: ${value};`);
    });

  cssLines.push("}");

  const cssContent = cssLines.join("\n");

  // Write output file
  fs.writeFileSync(outputPath, cssContent, "utf-8");

  console.log(`✓ Generated ${variables.size} CSS variables`);
  console.log(`✓ Saved to: ${outputPath}`);
}

// Run the build
try {
  buildTokens();
} catch (error) {
  console.error("Error building tokens:", error);
  process.exit(1);
}
