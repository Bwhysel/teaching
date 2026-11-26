// Look-back navigation test: choices stay locked; browser back stays in the game.
const { chromium } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  await p.fill('#nm', 'Nav'); await p.click('[data-act=start]');
  // round 1: keep, confirm, news, bet keep, confirm, reveal, explain answer, next
  await p.click('[data-act=keep]'); await p.click('[data-act=confirm]'); await p.waitForTimeout(400);
  await p.click('[data-act=tobet]'); await p.click('[data-act=keep]'); await p.click('[data-act=confirm]'); await p.waitForTimeout(1500);
  await p.screenshot({ path: O + 'N-reveal-front.png' });
  await p.click('[data-act=toexplain]'); await p.click('[data-act=t2][data-v="0"]'); await p.click('[data-act=submit]');
  await p.click('[data-act=next]'); await p.waitForTimeout(300);
  const before = await p.evaluate(() => JSON.stringify(__MM.state().res));
  const steps = [];
  for (let i = 0; i < 6; i++) {
    const has = await p.$('[data-act=back]'); if (!has) { steps.push('no back'); break; }
    await p.click('[data-act=back]'); await p.waitForTimeout(250);
    steps.push(await p.evaluate(() => (document.querySelector('.lookback') ? 'view:' : 'front:') + (document.querySelector('.top .ttl') || {}).textContent + ' | ' + (document.querySelector('h2,h3') || {}).textContent));
    if (i === 1) await p.screenshot({ path: O + 'N-lookback.png', fullPage: true });
  }
  console.log(steps.join('\n'));
  // locked: no confirm/keep/drag binding; try clicking on chart in view set screen
  const lockedBtns = await p.evaluate(() => [...document.querySelectorAll('[data-act]')].filter(e => e.offsetParent).map(e => e.getAttribute('data-act')).join(','));
  console.log('visible actions in view:', lockedBtns);
  await p.click('[data-act=front]'); await p.waitForTimeout(250);
  const after = await p.evaluate(() => JSON.stringify(__MM.state().res));
  console.log('choices unchanged:', before === after, '| back at front step:', await p.evaluate(() => __MM.state().step + ' r' + __MM.state().r), '| lookback banner gone:', !(await p.$('.lookback')));
  // browser back gesture
  await p.goBack(); await p.waitForTimeout(400);
  console.log('after browser back -> url same:', p.url().endsWith('mangos-millions.html'), '| view banner:', !!(await p.$('.lookback')));
  await p.goBack(); await p.waitForTimeout(400);
  console.log('after 2nd browser back -> still in game:', p.url().endsWith('mangos-millions.html'));
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
