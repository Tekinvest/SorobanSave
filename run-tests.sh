#!/bin/bash
# Quick test runner script for SorobanSave

echo "🧪 Running SorobanSave Test Suite"
echo "=================================="
echo ""

echo "📦 Smart Contract Tests"
echo "------------------------"
cargo test --workspace --lib
CONTRACT_RESULT=$?

echo ""
echo "🌐 Frontend Tests"
echo "------------------------"
if [ -d "frontend/node_modules" ]; then
    cd frontend && npm test run
    FRONTEND_RESULT=$?
else
    echo "⚠️  Frontend dependencies not installed. Run: cd frontend && npm install"
    FRONTEND_RESULT=1
fi

echo ""
echo "=================================="
if [ $CONTRACT_RESULT -eq 0 ] && [ $FRONTEND_RESULT -eq 0 ]; then
    echo "✅ All tests passed!"
    exit 0
else
    echo "❌ Some tests failed"
    exit 1
fi
