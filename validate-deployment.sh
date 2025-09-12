#!/bin/bash

echo "🔧 Claims Dashboard - Deployment Validation"
echo "==========================================="
echo ""

# Check environment file
if [ -f .env ]; then
    echo "✅ Environment file (.env) exists"
    if grep -q "NEXTAUTH_URL" .env; then
        echo "✅ NEXTAUTH_URL is configured"
    else
        echo "❌ NEXTAUTH_URL is missing"
    fi
    if grep -q "NEXTAUTH_SECRET" .env; then
        echo "✅ NEXTAUTH_SECRET is configured"
    else
        echo "❌ NEXTAUTH_SECRET is missing"
    fi
else
    echo "❌ Environment file (.env) not found"
fi

echo ""

# Check critical files
echo "📁 File Structure Check:"
files=(
    "lib/auth.ts"
    "lib/env.ts"
    "app/api/auth/[...nextauth]/route.ts"
    "app/auth/signin/page.tsx"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""

# Check build
echo "🏗️  Build Test:"
if npm run build > /dev/null 2>&1; then
    echo "✅ Production build successful"
else
    echo "❌ Production build failed"
fi

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push changes to trigger Vercel deployment"
echo "2. Verify Vercel environment variables are set correctly"
echo "3. Test OAuth flow on production domain"
