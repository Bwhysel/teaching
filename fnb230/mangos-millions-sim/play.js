// Play-through test: strategy = 'best' | 'stay' | 'fast'
const { chromium } = require('playwright');
const path = require('path');
const FILE = 'file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html';
const OUT = process.argv[3] || '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots';
const strat = process.argv[2] || 'best';
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', e => errs.push(String(e))); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(FILE);
  const shot = async n => { if (strat === 'best') await p.screenshot({ path: `${OUT}/${n}.png`, fullPage: true }); };
  const words = async () => p.evaluate(() => document.getElementById('app').innerText.split(/\s+/).filter(Boolean).length);
  const sideways = async () => p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  const report = [];
  await shot('00-start');
  await p.fill('#nm', 'Test Student');
  await p.click('[data-act=start]');
  for (let r = 0; r < 5; r++) {
    const info = await p.evaluate(r => { const M = __MM.MODEL[r]; const b1 = __MM.bestMove(M.p0, M.w0); return { w0: M.w0, best1: b1.to.w }; }, r);
    await shot(`r${r}-1-set`);
    const wSet = await words(), sw1 = await sideways();
    let w1 = strat === 'best' ? info.best1 : info.w0;
    if (strat === 'stay' || strat === 'fast') await p.click('[data-act=keep]');
    else { await p.$eval('#sl', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, Math.round(w1 * 100)); await p.$eval('#sl', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, Math.round(w1 * 100)); }
    await p.click('[data-act=confirm]');
    await p.waitForTimeout(400);
    await shot(`r${r}-2-news`);
    const wNews = await words();
    await p.click('[data-act=tobet]');
    await p.waitForTimeout(400);
    const info2 = await p.evaluate(r => { const M = __MM.MODEL[r]; const s = __MM.state(); const b = __MM.bestMove(M.p1, s.res[r].w1); return { w1: s.res[r].w1, best2: b.to.w }; }, r);
    await shot(`r${r}-3-bet`);
    const wBet = await words();
    if (strat === 'best') { await p.$eval('#sl', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, Math.round(info2.best2 * 100)); await p.$eval('#sl', (el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, Math.round(info2.best2 * 100)); }
    else await p.click('[data-act=keep]');
    await p.click('[data-act=confirm]');
    await p.waitForTimeout(1600);
    await shot(`r${r}-4-reveal`);
    const wRev = await words();
    await p.click('[data-act=toexplain]');
    if (r === 3) {
      await p.waitForTimeout(300);
      await shot(`r${r}-4b-reflect`);
      const dis = await p.$eval('[data-act=reflectdone]', e => e.disabled);
      await p.click('[data-act=reflectdone]', { force: true, timeout: 1000 }).catch(() => {});
      const still = await p.$('[data-act=reflectdone]');
      report.push(`reflect: button disabled during hold=${dis}, still open after fast tap=${!!still}`);
      await p.waitForTimeout(4200);
      await p.click('[data-act=reflectdone]');
    }
    await p.waitForTimeout(300);
    // answers
    const ans = await p.evaluate(r => { const s = __MM.state(); return { order: s.res[r].order }; }, r);
    const correct = await p.evaluate(r => { return null; }, r);
    const R = await p.evaluate(r => r, r);
    const t1 = ['more', 'less', 'same', 'less', 'more'][r];
    await p.click(`[data-act=t2][data-v="${strat === 'fast' ? 1 : 0}"]`);
    await p.click('[data-act=submit]');
    await shot(`r${r}-5-explain`);
    const wEx = await words();
    const st = await p.evaluate(r => __MM.state().res[r], r);
    report.push(`R${r + 1}: w1=${Math.round(st.w1 * 100)} w2=${Math.round(st.w2 * 100)} pts ${st.p1}/${st.p2}/${st.p3} | words set=${wSet} news=${wNews} bet=${wBet} reveal=${wRev} explain=${wEx} | sideways=${sw1}`);
    await p.click('[data-act=next]');
    await p.waitForTimeout(400);
  }
  await shot('90-debrief');
  await p.click('[data-act=results]');
  await p.waitForTimeout(300);
  await shot('95-results');
  const total = await p.evaluate(() => document.querySelector('.receipt .total').innerText);
  report.push(`TOTAL ${total}`);
  // 320px sideways check on results
  await p.setViewportSize({ width: 320, height: 700 });
  report.push(`320px sideways on results: ${await sideways()}`);
  console.log(strat, '\n' + report.join('\n'));
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
