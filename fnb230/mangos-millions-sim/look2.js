const { chromium, devices } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  await p.fill('#nm', 'Ana'); await p.tap('[data-act=start]'); await p.waitForTimeout(1400);
  await p.$eval('#chartbox', e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(200);
  await (await p.$('#chartbox')).screenshot({ path: O + 'D-untouched.png' });
  // touch tap at ~55% across the plot
  const r = await p.$eval('#drag svg', e => { const q = e.getBoundingClientRect(); return { l: q.left, t: q.top, w: q.width, h: q.height }; });
  await p.touchscreen.tap(r.l + r.w * 0.62, r.t + r.h * 0.45); await p.waitForTimeout(400);
  const st = await p.evaluate(() => ({ w: __MM.state().w, touched: __MM.state().touched, btn: document.querySelector('[data-act=confirm]').textContent }));
  console.log('after touch tap:', JSON.stringify(st));
  await p.$eval('#chartbox', e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(200);
  await (await p.$('#chartbox')).screenshot({ path: O + 'D-touched.png' });
  await p.tap('[data-act=confirm]'); await p.waitForTimeout(500); await p.tap('[data-act=tobet]'); await p.waitForTimeout(500);
  await p.$eval('#chartbox', e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(200);
  await (await p.$('#chartbox')).screenshot({ path: O + 'D-bet.png' });
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
