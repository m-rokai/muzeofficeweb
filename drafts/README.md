# Blog Drafts — Convention & Business Traveler Content

These MDX files are ready-to-publish blog posts stored outside `content/blog/` so they don't appear on the live site.

## How to publish

1. Copy the file(s) you want to publish from `drafts/` to `content/blog/`:
   ```
   cp drafts/where-to-work-during-ces-las-vegas.mdx content/blog/
   ```
2. Update the `date` field in the frontmatter to the actual publication date.
3. Run `npm run build` to verify.
4. Deploy: `vercel deploy --prod --yes`

You can publish all at once or stagger them over days/weeks.

## What's here

### Convention-specific posts (18)

Each targets a specific major Las Vegas convention, written for exhibitors and attendees who need off-Strip workspace, meeting rooms, or quiet work areas.

| File | Convention | Month |
|---|---|---|
| `where-to-work-during-ces-las-vegas.mdx` | CES | January |
| `where-to-work-during-sema-show-las-vegas.mdx` | SEMA Show | November |
| `where-to-work-during-world-of-concrete-las-vegas.mdx` | World of Concrete | January |
| `where-to-work-during-nab-show-las-vegas.mdx` | NAB Show | April |
| `where-to-work-during-magic-las-vegas.mdx` | MAGIC | February & August |
| `where-to-work-during-shot-show-las-vegas.mdx` | SHOT Show | January |
| `where-to-work-during-conexpo-las-vegas.mdx` | CONEXPO-CON/AGG | March |
| `where-to-work-during-asd-market-week-las-vegas.mdx` | ASD Market Week | March & August |
| `where-to-work-during-isc-west-las-vegas.mdx` | ISC West | March |
| `where-to-work-during-kbis-las-vegas.mdx` | KBIS | February |
| `where-to-work-during-mjbizcon-las-vegas.mdx` | MJBizCon | November |
| `where-to-work-during-aws-reinvent-las-vegas.mdx` | AWS re:Invent | December |
| `where-to-work-during-money-2020-las-vegas.mdx` | Money 20/20 | October |
| `where-to-work-during-black-hat-las-vegas.mdx` | Black Hat USA | August |
| `where-to-work-during-g2e-las-vegas.mdx` | G2E (Global Gaming Expo) | October |
| `where-to-work-during-cosmoprof-las-vegas.mdx` | Cosmoprof North America | July |
| `where-to-work-during-jck-las-vegas.mdx` | JCK Las Vegas | June |
| `where-to-work-during-hlth-las-vegas.mdx` | HLTH | October |

### Evergreen posts (3)

Cross-convention content that supports the cluster and targets broader workspace/traveler queries.

| File | Topic |
|---|---|
| `off-strip-workspace-near-las-vegas-convention-center.mdx` | Geographic guide for LVCC visitors |
| `client-meetings-during-las-vegas-convention.mdx` | Hotel ballroom vs. coworking meeting rooms |
| `team-retreat-venue-las-vegas.mdx` | Corporate offsite / retreat venue guide |

## Internal linking

Each convention post links to:
- `/las-vegas-convention-coworking` (commercial page)
- `/las-vegas-meeting-rooms` (commercial page)
- `/book-a-tour` (conversion page)
- Related convention posts where relevant

The evergreen posts additionally link to `/las-vegas-event-space` and `/las-vegas-airport-coworking`.
