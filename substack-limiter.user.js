// ==UserScript==
// @name         Substack Feed Limiter
// @namespace    mindful-blocker
// @version      1.0
// @description  Limits daily Substack feed posts to encourage discovery without doom-scrolling
// @match        https://substack.com/*
// @match        https://www.substack.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const DAILY_LIMIT = 20;
    const STORAGE_KEY = 'substackLimiter';

    function getToday() {
        return new Date().toISOString().split('T')[0];
    }

    function getState() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const state = JSON.parse(stored);
                if (state.date === getToday()) {
                    return state;
                }
            }
        } catch (e) {}
        return { date: getToday(), seen: 0 };
    }

    function saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function createLimitBanner(seen) {
        const banner = document.createElement('div');
        banner.id = 'substack-limit-banner';
        banner.style.cssText = `
            padding: 24px;
            margin: 16px 0;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 12px;
            text-align: center;
            color: #eee;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        `;
        banner.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 12px;">🧘</div>
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
                You've seen ${seen} posts today
            </div>
            <div style="font-size: 14px; color: #aaa;">
                That's enough discovery for one day. Go read something long-form.
            </div>
        `;
        return banner;
    }

    function processFeeds() {
        const state = getState();
        const posts = document.querySelectorAll('[class*="feedUnit-"]');
        let visibleCount = 0;
        let bannerInserted = false;

        posts.forEach((post, index) => {
            // Skip already processed
            if (post.dataset.limiterProcessed) {
                if (post.style.display !== 'none') visibleCount++;
                return;
            }

            post.dataset.limiterProcessed = 'true';
            state.seen++;
            saveState(state);

            if (state.seen > DAILY_LIMIT) {
                post.style.display = 'none';

                // Insert banner after the last visible post
                if (!bannerInserted && !document.getElementById('substack-limit-banner')) {
                    const banner = createLimitBanner(DAILY_LIMIT);
                    post.parentNode.insertBefore(banner, post);
                    bannerInserted = true;
                }
            } else {
                visibleCount++;
            }
        });

        // Update banner if it exists
        const existingBanner = document.getElementById('substack-limit-banner');
        if (existingBanner && state.seen > DAILY_LIMIT) {
            existingBanner.querySelector('div:nth-child(2)').textContent =
                `You've seen ${DAILY_LIMIT} posts today (${state.seen - DAILY_LIMIT} hidden)`;
        }
    }

    // Initial run
    processFeeds();

    // Watch for infinite scroll loading new posts
    const observer = new MutationObserver((mutations) => {
        let hasNewPosts = mutations.some(m =>
            [...m.addedNodes].some(n =>
                n.nodeType === 1 && (
                    n.matches?.('[class*="feedUnit-"]') ||
                    n.querySelector?.('[class*="feedUnit-"]')
                )
            )
        );
        if (hasNewPosts) {
            processFeeds();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Status in console
    const state = getState();
    console.log(`[Substack Limiter] ${state.seen}/${DAILY_LIMIT} posts seen today`);
})();
