const { chromium } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  console.log(await p.evaluate(() => {
    const S0 = __MM.SAMPLE, pts = __MM.buildCurve({ bU: S0.bU, T: S0.T, EBIT: S0.EBIT, spreadMult: 1, RF: S0.RF, MRP: S0.MRP, wmin: 0 });
    const out = []; const C = __MM.COSTS();
    for (const [up, down] of [[0, 0.0315], [0.0057, 0.0315], [0.015, 0.0315], [0.03, 0.0315], [0.0057, 0], [0.0057, 0.06], [0.0057, 0.10]]) {
      const keep = { up: C.up, down: C.down }; C.up = up; C.down = down;
      const band = __MM.holdBand(pts), bm = __MM.bestMove(pts, S0.today);
      out.push(`bonds ${(up*100).toFixed(2)}% stock ${(down*100).toFixed(1)}% → band ${band ? band.map(w => Math.round(w*100)).join('–') : 'none'} | best move from 20%: ${Math.round(bm.to.w*100)}%`);
      C.up = keep.up; C.down = keep.down;
    }
    return out.join('\n');
  }));
  await p.click('[data-act=explore]'); await p.waitForTimeout(400);
  await p.focus('#x-up'); for (let i = 0; i < 6; i++) await p.keyboard.press('ArrowRight');
  console.log('xsay:', await p.$eval('#xsay', e => e.textContent));
  console.log('read:', await p.$eval('#xread', e => e.textContent));
  await p.screenshot({ path: O + 'X2.png', fullPage: true });
  const words = await p.evaluate(() => document.getElementById('app').innerText.split(/\s+/).length);
  await p.click('[data-act=xdone]');
  console.log('game costs restored:', JSON.stringify(await p.evaluate(() => __MM.COSTS())), '| words:', words, '| errors:', errs.length ? errs : 'none');
  await b.close();
})();
