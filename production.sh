#!/bin/bash

# Install Encore CLI

set -e  # Exit on any error

echo "📦 Installing Encore CLI..."

# Check if Encore CLI is already installed
if command -v encore &> /dev/null; then
    echo "✅ Encore CLI is already installed"
    encore version
    exit 0
fi

# Download and install Encore CLI
echo "⬇️  Downloading Encore CLI installer..."
curl --output install.sh -L https://encore.dev/install.sh

echo "🔧 Installing Encore CLI..."
bash install.sh

# Clean up installer script
rm install.sh

# Add encore to PATH for current session
export PATH="$HOME/.encore/bin:$PATH"

echo "✅ Encore CLI installation completed!"
echo "� Encore CLI installed at: $HOME/.encore/bin/encore"
echo "💡 To use encore in future sessions, add this to your shell profile:"
echo "   export PATH=\"\$HOME/.encore/bin:\$PATH\""

# Verify installation
if command -v encore &> /dev/null; then
    echo "🎉 Installation verified successfully!"
    encore version
else
    echo "❌ Installation verification failed"
    exit 1
fi

# Build Docker image with configuration
echo "🔨 Building Docker image with configuration..."
encore build docker --config ./infra.json pos:latest

echo "✅ Docker image 'pos:latest' built successfully!"