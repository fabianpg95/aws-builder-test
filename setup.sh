#!/bin/bash

echo "📦 Creating virtual environment..."
python3 -m venv .venv

echo "✅ Activating virtual environment..."
source .venv/bin/activate

echo "⬇️ Installing dependencies from requirements.txt..."
pip install -r src/requirements.txt

echo "✅ Done. Virtual environment is active and dependencies are installed."
echo "🧪 To deactivate the environment, run: deactivate"
