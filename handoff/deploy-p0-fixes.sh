#!/bin/bash
# Muze Office — deploy pending P0 SEO fixes
#
# Usage: bash ~/Desktop/muzeoffice-web/handoff/deploy-p0-fixes.sh
#
# This script deploys the P0 SEO fixes that were made on-disk in the previous
# session but never deployed due to a TCC permission issue in Kitty. The edits
# already built cleanly locally (102 pages, zero errors) — this script re-runs
# the build as a sanity check and then deploys to Vercel production.
#
# Before running: ensure Kitty has Full Disk Access
# (System Settings → Privacy & Security → Full Disk Access → add kitty.app)
# and quit/reopen Kitty if you just granted it.

set -e

cd ~/Desktop/muzeoffice-web

echo "=========================================="
echo "  Sanity check — P0 edits on disk"
echo "=========================================="
echo

echo "-- app/page.tsx : Mail Holding \$39 + LocalBusinessSchema + canonical --"
grep -n "Mail Holding\|LocalBusinessSchema\|canonical:\|virtual offices from \$" app/page.tsx | head -10
echo

echo "-- lib/utils/constants.ts : legal name should be Muze International Corporation --"
grep -n "legalName" lib/utils/constants.ts
echo

echo "-- app/(marketing)/privacy-policy/page.tsx : should have zero Muze Office LLC --"
grep -cn "Muze Office LLC" 'app/(marketing)/privacy-policy/page.tsx' || echo "zero matches (good)"
grep -n "Muze International Corporation" 'app/(marketing)/privacy-policy/page.tsx'
echo

echo "-- lib/blog.ts : should have authorOverrides + normalizeAuthor --"
grep -n "authorOverrides\|normalizeAuthor" lib/blog.ts | head -5
echo

echo "-- Canonical URLs across all pages --"
grep -rln "canonical:" app/ | sort
echo

echo "-- LocalBusinessSchema imports --"
grep -rln "LocalBusinessSchema" app/ | sort
echo

echo "-- BlogPosting JSON-LD on blog post pages --"
grep -n "BlogPosting\|blogPostingSchema" 'app/blog/[slug]/page.tsx' | head -5
echo

echo "=========================================="
echo "  Confirm deploy"
echo "=========================================="
read -p "Does the audit above look correct? Proceed with build + deploy? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted. No changes deployed."
  exit 1
fi

echo
echo "=========================================="
echo "  Running production build"
echo "=========================================="
npm run build

echo
echo "=========================================="
echo "  Deploying to Vercel production"
echo "=========================================="
vercel deploy --prod --yes

echo
echo "=========================================="
echo "  Post-deploy verification"
echo "=========================================="
echo

echo "-- Testing canonical on homepage --"
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://muzeoffice.com/ | grep -oE '<link rel="canonical"[^>]*>' | head -1

echo
echo "-- Testing LocalBusinessSchema on homepage --"
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://muzeoffice.com/ | grep -oE '"@type":"CoworkingSpace"' | head -1

echo
echo "-- Testing BlogPosting schema --"
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://muzeoffice.com/blog/9-amazing-benefits-of-having-a-coworking-membership | grep -oE '"@type":"BlogPosting"' | head -1

echo
echo "-- Testing Mail Holding tier on virtual office page --"
curl -s -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://muzeoffice.com/las-vegas-virtual-office | grep -oE 'Mail Holding' | head -1

echo
echo "Done. If all four spot checks printed a match, the P0 SEO foundation is fully deployed."
echo "Visit https://muzeoffice.com and click through to verify visually."
