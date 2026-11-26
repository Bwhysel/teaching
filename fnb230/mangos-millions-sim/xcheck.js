const { chromium } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  const r = await p.evaluate(() => {
    const S0 = __MM.SAMPLE, best = o => { const pts = __MM.buildCurve(Object.assign({ bU: S0.bU, T: S0.T, EBIT: S0.EBIT, spreadMult: 1, RF: S0.RF, MRP: S0.MRP, wmin: 0 }, o)); return Math.round(__MM.peak(pts).w * 100); };
    const sweep = (k, vals) => k + ': ' + vals.map(v => v + '→' + best({ [k]: v }) + '%').join('  ');
    const flat = (() => { const pts = __MM.buildCurve({ bU: S0.bU, T: 0, EBIT: S0.EBIT, spreadMult: 1, RF: S0.RF, MRP: S0.MRP, perfect: true, wmin: 0 }); const v = pts.map(q => q.V); return (Math.max(...v) - Math.min(...v)).toFixed(6); })();
    return ['base best ' + best({}) + '%', sweep('T', [0, 0.1, 0.21, 0.3, 0.4]), sweep('spreadMult', [0.5, 1, 1.5, 2, 3]), sweep('RF', [0.01, 0.03, 0.0485, 0.06, 0.08]), sweep('MRP', [0.03, 0.04, 0.0441, 0.055, 0.07]), sweep('bU', [0.3, 0.6, 1, 1.5, 2]), 'perfect world range of V: ' + flat].join('\n');
  });
  console.log(r);
  // UI: open from start, move tax slider by keyboard, toggle perfect, back
  await p.click('[data-act=explore]'); await p.waitForTimeout(400);
    console.log('stage on open:', await p.$eval('[data-act=stage][aria-pressed=true]', e => e.textContent), '|', await p.$eval('#xread', e => e.textContent));
  await p.screenshot({ path: O + 'X-perfect.png', fullPage: true });
  await p.click('[data-act=stage][data-v="2"]'); await p.waitForTimeout(300);
  const s2 = await p.evaluate(() => { const S0 = __MM.SAMPLE; const pts = __MM.buildCurve({ bU: S0.bU, T: S0.T, EBIT: S0.EBIT, spreadMult: 1, RF: S0.RF, MRP: S0.MRP, perfect: true, wmin: 0 }); let mono = true; for (let i = 1; i < pts.length; i++) if (pts[i].V < pts[i-1].V - 1e-9) mono = false; return mono; });
  console.log('stage 2 rising everywhere:', s2, '|', await p.$eval('#xread', e => e.textContent));
  await p.screenshot({ path: O + 'X-stage2.png', fullPage: true });
  await p.click('[data-act=stage][data-v="3"]'); await p.waitForTimeout(300);
  console.log('stage 3:', await p.$eval('#xread', e => e.textContent), '| spread label:', await p.$eval('#xv-spreadMult', e => e.textContent));
  const words = await p.evaluate(() => document.getElementById('app').innerText.split(/\s+/).length);
  console.log('words on explorer screen:', words, '| sideways:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await p.click('[data-act=xdone]'); await p.waitForTimeout(300);
  console.log('back on start:', !!(await p.$('[data-act=start]')));
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
