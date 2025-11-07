#!/bin/bash
set -e

echo "🚀 Setting up GitHub repository and deploying Storybook..."
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found. Installing..."
    brew install gh
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "🔐 GitHub authentication required..."
    echo "📝 Please follow these steps:"
    echo "   1. A browser window will open"
    echo "   2. Authorize GitHub CLI"
    echo "   3. Copy the authentication code"
    echo ""
    read -p "Press Enter to start authentication..."
    gh auth login --web
fi

echo ""
echo "✅ Authenticated with GitHub"
echo ""

# Check if repository exists
REPO_EXISTS=$(gh repo view marcohckd/arkem-design-system --json name 2>&1 || echo "NOT_FOUND")

if [[ "$REPO_EXISTS" == *"NOT_FOUND"* ]] || [[ "$REPO_EXISTS" == *"Could not resolve"* ]]; then
    echo "📦 Creating repository: arkem-design-system"
    gh repo create marcohckd/arkem-design-system --public --source=. --remote=origin --push
    echo "✅ Repository created and code pushed!"
else
    echo "📦 Repository already exists. Pushing code..."
    git push -u origin main
    echo "✅ Code pushed!"
fi

echo ""
echo "🔧 Enabling GitHub Pages..."
gh api repos/marcohckd/arkem-design-system/pages \
  -X POST \
  -f source[type]=none \
  -f source[branch]=gh-pages || echo "Note: Pages may need to be enabled manually"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to: https://github.com/marcohckd/arkem-design-system/settings/pages"
echo "   2. Under 'Source', select 'GitHub Actions'"
echo "   3. Save"
echo ""
echo "✨ Your Storybook will be live at:"
echo "   https://marcohckd.github.io/arkem-design-system/"
echo ""
echo "🔄 The GitHub Actions workflow will deploy automatically on the next push!"

