const { chromium } = require('playwright');
const FILE = 'file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 360, height: 780 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto(FILE);
  // 1. Exhaustive path enumeration per round (step-1 choice x bet choice)
  const ex = await p.evaluate(() => {
    const out = [];
    __MM.MODEL.forEach((M, r) => {
      const C = __MM.CONFIG, b1 = __MM.bestMove(M.p0, M.w0);
      let best = { pts: -1 }, worst = { pts: 1e9 }, n = 0, hist = {};
      for (const a of M.p0) {
        const m1 = __MM.move(M.p0, M.w0, a.w), s1 = __MM.shareOf(m1, b1), p1 = Math.round(C.PTS_STEP1 * s1);
        const b2 = __MM.bestMove(M.p1, a.w);
        for (const c of M.p1) {
          const m2 = __MM.move(M.p1, a.w, c.w), s2 = __MM.shareOf(m2, b2), p2 = Math.round(C.PTS_BET * s2), pts = p1 + p2;
          n++; hist[pts] = (hist[pts] || 0) + 1;
          if (pts > best.pts) best = { pts, w1: a.w, w2: c.w };
          if (pts < worst.pts) worst = { pts, w1: a.w, w2: c.w };
        }
      }
      const stay = Math.round(C.PTS_STEP1 * __MM.shareOf(__MM.move(M.p0, M.w0, M.w0), b1)) + Math.round(C.PTS_BET * __MM.shareOf(__MM.move(M.p1, M.w0, M.w0), __MM.bestMove(M.p1, M.w0)));
      // rule check: best path's moves are the value-maximizing moves after costs
      const ruleOK = Math.abs(best.w1 - b1.to.w) < 1e-9 || __MM.move(M.p0, M.w0, best.w1).net >= b1.net - 1e-9;
      const full = Object.entries(hist).filter(([k]) => +k === 15).reduce((a, [, v]) => a + v, 0);
      out.push(`${M.c.name}: paths=${n} best=${best.pts} (w1 ${Math.round(best.w1*100)}%, w2 ${Math.round(best.w2*100)}%) worst=${worst.pts} stay=${stay} fullMarks=${(100*full/n).toFixed(1)}% ruleOK=${ruleOK}`);
    });
    return out;
  });
  console.log(ex.join('\n'));
  // 2. Keyboard: focus stays on slider across first input re-render
  await p.fill('#nm', 'Keys'); await p.click('[data-act=start]');
  await p.focus('#drag'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight');
  const kb = await p.evaluate(() => ({ focus: document.activeElement && document.activeElement.id, val: document.getElementById('drag').getAttribute('aria-valuenow'), btn: document.querySelector('[data-act=confirm]').textContent }));
  console.log('keyboard:', JSON.stringify(kb));
  // Tab to confirm and press Enter
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.keyboard.press('Enter');
  await p.waitForTimeout(300);
  console.log('after Enter step:', await p.evaluate(() => __MM.state().step));
  // 3. Reload mid-game: resume
  await p.reload();
  const resumeBtn = await p.$('[data-act=resume]');
  console.log('resume offered after reload:', !!resumeBtn);
  if (resumeBtn) { await resumeBtn.click(); console.log('resumed step:', await p.evaluate(() => __MM.state().step), 'round', await p.evaluate(() => __MM.state().r)); }
  // 4. Double-tap confirm on bet plays one round
  await p.click('[data-act=tobet]'); await p.click('[data-act=keep]');
  await p.dblclick('[data-act=confirm]').catch(() => {});
  await p.waitForTimeout(300);
  console.log('after double tap step:', await p.evaluate(() => __MM.state().step), 'round', await p.evaluate(() => __MM.state().r));
  // 5. Tap targets < 44px
  const small = await p.evaluate(() => [...document.querySelectorAll('button,input')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.height < 44 || r.width < 44); }).map(e => e.outerHTML.slice(0, 60)));
  console.log('small targets:', small.length ? small : 'none');
  // 6. Reduced motion page loads and shows final values at once
  const ctx = await b.newContext({ reducedMotion: 'reduce', viewport: { width: 320, height: 700 } });
  const q = await ctx.newPage(); q.on('pageerror', e => errs.push(String(e)));
  await q.goto(FILE); await q.fill('#nm', 'RM'); await q.click('[data-act=start]'); await q.click('[data-act=keep]'); await q.click('[data-act=confirm]');
  console.log('reduced motion counter:', await q.$eval('#cu1', e => e.textContent), '| 320 sideways:', await q.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  // 7. Offline / external refs
  const ext = await p.evaluate(() => [...document.querySelectorAll('script[src],link[href],img[src]')].filter(e => !/^data:/.test(e.getAttribute('src') || e.getAttribute('href'))).map(e => e.outerHTML.slice(0,80)));
  console.log('external refs:', ext.length ? ext : 'none');
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
