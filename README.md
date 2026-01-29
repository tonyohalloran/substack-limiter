# Substack Limiter

A Tampermonkey userscript that limits how many Substack feed posts you see per day.

## Why?

I like Substack. I want to discover new writers and see what people I follow are posting. But the "For You" feed is an infinite scroll, and infinite scrolls are designed to keep you scrolling.

The problem isn't Substack itself - it's that **discovery has no natural stopping point**. You can always see one more post, one more recommendation. Before you know it, you've spent an hour scrolling through snippets instead of actually reading anything.

I wanted a middle ground:
- **See enough to discover** new writers worth following (20 posts/day)
- **Not so much that I doom-scroll** through an endless feed
- **No willpower required** - the limit is enforced, not suggested

## How it works

- Counts posts as they appear in the feed (including infinite scroll)
- After 20 posts, hides additional posts and shows a banner
- Resets at midnight
- Individual article pages are unaffected - read as much long-form as you want

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click the Tampermonkey icon → "Create new script"
3. Delete the template and paste the contents of `substack-limiter.user.js`
4. Save (Ctrl/Cmd+S)

## Configuration

Edit the `DAILY_LIMIT` constant at the top of the script:

```javascript
const DAILY_LIMIT = 20;  // Change this to your preferred limit
```

## Part of a bigger system

This pairs with [mindful-blocker](https://github.com/tonyohalloran/mindful-blocker), a hosts-file-based website blocker with reflection timers and time restrictions. The blocker handles binary "should I be on this site at all right now?" while this limiter handles "I'm here intentionally, but I don't want to lose an hour."
