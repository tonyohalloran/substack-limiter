# Substack Limiter

A Tampermonkey userscript that limits how many Substack feed posts you can see per day.

## Why?

I like Substack. I want to discover new writers and see what people I follow are posting. But the "For You" feed is another potential infinite scroll that I don't want in my life.

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

I'm using this with [mindful-blocker](https://github.com/marisawallace/mindful-blocker), a hosts-file-based website blocker with reflection timers and time restrictions! 
