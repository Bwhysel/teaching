// Check every reveal at 320px: no sideways scroll, breakdown row labels readable.
const { chromium } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 320, height: 700 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  await p.fill('#nm', 'Narrow'); await p.click('[data-act=start]');
  const out = [];
  for (let r = 0; r < 5; r++) {
    await p.click('[data-act=keep]'); await p.click('[data-act=confirm]'); await p.waitForTimeout(300);
    await p.click('[data-act=tobet]'); await p.click('[data-act=keep]'); await p.click('[data-act=confirm]'); await p.waitForTimeout(1500);
    const side = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    const tbl = await p.$eval('.brk', t => { const r = t.getBoundingClientRect(); return Math.round(r.width) + 'px wide; rows ' + [...t.querySelectorAll('td:first-child')].map(td => Math.round(td.getBoundingClientRect().height)).join('/'); });
    out.push(`R${r + 1} reveal at 320px: sideways=${side} | table ${tbl}`);
    if (r === 0) { const e = await p.$('.brk'); await e.scrollIntoViewIfNeeded(); await (await p.$('.brk')).screenshot({ path: O + 'N320-table.png' }); }
    await p.click('[data-act=toexplain]');
    if (r === 3) { await p.waitForTimeout(4300); await p.click('[data-act=reflectdone]'); }
    await p.waitForTimeout(200);
    out.push(`R${r + 1} explain at 320px: sideways=${await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)}`);
    await p.click('[data-act=t2][data-v="0"]'); await p.click('[data-act=submit]'); await p.click('[data-act=next]'); await p.waitForTimeout(300);
  }
  out.push('debrief sideways=' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await p.click('[data-act=results]'); await p.waitForTimeout(300);
  out.push('review sideways=' + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await p.click('[data-act=explore]'); await p.waitForTimeout(300);
  for (const st of [1, 2, 3]) { await p.click(`[data-act=stage][data-v="${st}"]`); await p.waitForTimeout(150); out.push(`explorer stage ${st} sideways=` + await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)); }
  console.log(out.join('\n')); console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
