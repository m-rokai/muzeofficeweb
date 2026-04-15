# Next session — ready-to-paste prompt

Copy-paste the block below into a fresh Claude Code session after clearing context. It gives the new Claude just enough to pick up where we left off without re-doing work.

---

```
I'm resuming work on muzeoffice.com (Next.js 16 on Vercel). There's a comprehensive handoff document at ~/Desktop/muzeoffice-web/handoff/README.md — please read that FIRST before doing anything.

Short version: the previous session made P0 SEO fixes (LocalBusinessSchema, canonical URLs, BlogPosting JSON-LD, author byline bug fix, legal entity consistency) but couldn't deploy them because Kitty's TCC permission dropped mid-session. The edits are on disk and the build passed — they just need to be deployed.

First thing to do: verify you can read files in ~/Desktop/muzeoffice-web/ (TCC should be fixed now). If yes, audit the edits landed, run `npm run build`, then `vercel deploy --prod --yes`. If TCC is still blocked, tell me and I'll fix Kitty's permission before continuing.

The SEO audit backlog (P1 + P2 items) is also in the handoff doc. After the P0 deploy completes, we can pick up from there.
```

---

## What the new Claude should do, step by step

1. **Read `~/Desktop/muzeoffice-web/handoff/README.md` end-to-end.**
2. **Verify filesystem access** with `ls ~/Desktop/muzeoffice-web/app/page.tsx`. If it errors with "Operation not permitted", stop and ask the user to fix Kitty's Full Disk Access permission.
3. **Audit P0 edits landed on disk**:
   ```
   cd ~/Desktop/muzeoffice-web
   grep -rln "LocalBusinessSchema" app/
   grep -rln "canonical:" app/
   grep -n "normalizeAuthor" lib/blog.ts
   grep -n "legalName" lib/utils/constants.ts
   grep -n "Mail Holding" app/page.tsx
   grep -n "BlogPosting" 'app/blog/[slug]/page.tsx'
   ```
   Expected: all return matches. If `app/page.tsx` does NOT show `LocalBusinessSchema` or `canonical:` or `Mail Holding`, the edits did NOT land and need to be re-applied (see handoff README section "What's ON DISK but NOT YET DEPLOYED" for the exact intended state).
4. **Run `npm run build`** — should compile 102 pages cleanly with no errors.
5. **Deploy**: `vercel deploy --prod --yes` from the project root.
6. **Verify live site** with `curl` spot checks:
   - `curl -s https://muzeoffice.com/ | grep -oE '<link rel="canonical"[^>]*>'` → should show `href="https://muzeoffice.com/"`
   - `curl -s https://muzeoffice.com/ | grep -oE '"@type":"CoworkingSpace"'` → should match
   - `curl -s https://muzeoffice.com/blog/9-amazing-benefits-of-having-a-coworking-membership | grep -oE '"@type":"BlogPosting"'` → should match
   - `curl -s https://muzeoffice.com/las-vegas-virtual-office | grep -oE 'Mail Holding'` → should match
7. **Report to the user** which spot checks passed, then stand by for the next task from the P1 backlog.

## Shortcut — just run the packaged script

The previous session left a ready-to-run deploy script at `handoff/deploy-p0-fixes.sh` (in this folder). It does steps 3-6 above automatically with a confirmation prompt.

```
bash ~/Desktop/muzeoffice-web/handoff/deploy-p0-fixes.sh
```
