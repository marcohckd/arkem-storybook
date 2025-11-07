import * as fs from "node:fs";
import * as path from "node:path";

interface TokenValue {
  $value: string | number;
  $type?: string;
}

type TokenObject = Record<string, TokenValue | Record<string, any>>;

interface SemanticToken {
  name: string;
  value: string;
  type?: string;
}

/**
 * Converts a token reference like {Color/Neutral/950} to CSS variable var(--color-neutral-950)
 */
function convertTokenReference(ref: string): string {
  // Match {Category/Subcategory/Token} pattern
  const match = ref.match(/^\{([^}]+)\}$/);
  if (!match) {
    return ref; // Not a reference, return as-is
  }

  const tokenPath = match[1];
  // Convert path to kebab-case CSS variable
  const cssVar = tokenPath
    .split("/")
    .map((part) =>
      part
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter((part) => part.length > 0)
    .join("-");

  return `var(--${cssVar})`;
}

/**
 * Processes a $value that might contain token references
 */
function processValue(value: string | number): string {
  const str = String(value);

  // Check if it's a token reference
  if (str.match(/^\{[^}]+\}$/)) {
    return convertTokenReference(str);
  }

  // Check if it contains token references mixed with other content
  const refPattern = /\{([^}]+)\}/g;
  if (refPattern.test(str)) {
    return str.replace(refPattern, (match) => convertTokenReference(match));
  }

  // Otherwise return as-is
  return str;
}

/**
 * Sanitizes a token name to kebab-case
 */
function toKebabCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Recursively traverses Semantic object and collects tokens
 */
function collectSemanticTokens(
  obj: TokenObject,
  prefix: string[] = [],
  tokens: SemanticToken[] = []
): SemanticToken[] {
  for (const [key, value] of Object.entries(obj)) {
    // Skip metadata keys
    if (key.startsWith("$")) {
      continue;
    }

    const newPath = [...prefix, key];

    if (value && typeof value === "object" && "$value" in value) {
      // Found a token value
      const token = value as TokenValue;
      const pathKey = newPath.map(toKebabCase).join("-");
      const cssValue = processValue(token.$value);

      tokens.push({
        name: pathKey,
        value: cssValue,
        type: token.$type,
      });
    } else if (value && typeof value === "object") {
      // Recursively process nested objects
      collectSemanticTokens(value as TokenObject, newPath, tokens);
    }
  }

  return tokens;
}

/**
 * Generates CSS comment from token type
 */
function formatTypeComment(type?: string): string {
  if (!type) return "";
  return ` /* ${type} */`;
}

/**
 * Main build function
 */
function buildSemanticTokens(): void {
  const inputPath = path.join(process.cwd(), "src/styles/arkem-tokens.json");
  const outputPath = path.join(
    process.cwd(),
    "src/styles/tokens-semantic.css"
  );

  // Read input JSON
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Token file not found: ${inputPath}`);
  }

  const jsonContent = fs.readFileSync(inputPath, "utf-8");
  const tokens: TokenObject = JSON.parse(jsonContent);

  // Navigate to Color/Stroke/Semantic
  const semantic = tokens["Color/Stroke"]?.["Semantic"];
  if (!semantic || typeof semantic !== "object") {
    throw new Error(
      "Semantic section not found in Color/Stroke path of token file"
    );
  }

  // Collect all semantic tokens
  const semanticTokens = collectSemanticTokens(semantic as TokenObject);

  // Track invalid references
  const invalidReferences: string[] = [];
  semanticTokens.forEach((token) => {
    // Check if value contains unresolved references (still has {})
    if (typeof token.value === "string" && token.value.includes("{") && !token.value.startsWith("var(")) {
      invalidReferences.push(`${token.name}: ${token.value}`);
    }
  });

  // Sort tokens alphabetically by name
  semanticTokens.sort((a, b) => a.name.localeCompare(b.name));

  // Generate CSS content
  const cssLines: string[] = [];
  cssLines.push(":root {");

  semanticTokens.forEach((token) => {
    const cssVarName = `--semantic-${token.name}`;
    const typeComment = formatTypeComment(token.type);
    cssLines.push(`  ${cssVarName}: ${token.value};${typeComment}`);
  });

  cssLines.push("}");

  const cssContent = cssLines.join("\n");

  // Write output file
  fs.writeFileSync(outputPath, cssContent, "utf-8");

  // Summary
  console.log(`✓ Generated ${semanticTokens.length} semantic CSS variables`);
  console.log(`✓ Saved to: ${outputPath}`);

  if (invalidReferences.length > 0) {
    console.log(`\n⚠️  Found ${invalidReferences.length} invalid or unresolved references:`);
    invalidReferences.forEach((ref) => console.log(`   - ${ref}`));
  } else {
    console.log(`✓ All token references resolved successfully`);
  }
}

// Run the build
try {
  buildSemanticTokens();
} catch (error) {
  console.error("Error building semantic tokens:", error);
  process.exit(1);
}

