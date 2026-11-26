const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  const out = await p.evaluate(() => {
    const C = __MM.CONFIG, clamp = (M, w) => Math.round(Math.max(M.p0.wmin, Math.min(0.9, w)) * 100) / 100;
    const P = {
      'Debt is free money (90% always)': (M, from, best) => 0.9,
      'Debt is dangerous (0% always)': (M, from, best) => 0,
      'Timid mover (halfway to best)': (M, from, best) => from + (best - from) / 2,
      'Overshooter (twice as far)': (M, from, best) => from + (best - from) * 2,
      'Direction only, 10 points each time': (M, from, best) => from + Math.sign(best - from) * 0.10,
      'Best mover': (M, from, best) => best,
      'Stays put': (M, from, best) => from,
    };
    const res = {};
    for (const [name, f] of Object.entries(P)) {
      let tot = 0; const per = [];
      __MM.MODEL.forEach((M, i) => {
        const b1 = __MM.bestMove(M.p0, M.w0), w1 = clamp(M, f(M, M.w0, b1.to.w));
        const m1 = __MM.move(M.p0, M.w0, w1), p1 = Math.round(C.PTS_STEP1 * __MM.shareOf(m1, b1));
        const b2 = __MM.bestMove(M.p1, w1), w2 = clamp(M, f(M, w1, b2.to.w));
        const m2 = __MM.move(M.p1, w1, w2), p2 = Math.round(C.PTS_BET * __MM.shareOf(m2, b2));
        tot += p1 + p2; per.push(`${M.c.id} ${Math.round(w1*100)}→${Math.round(w2*100)} ${p1}+${p2} (net ${m2.net.toFixed(1)} vs ${b2.net.toFixed(1)})`);
      });
      res[name] = { movePts: tot, per };
    }
    return res;
  });
  for (const [k, v] of Object.entries(out)) console.log(`${k}: move points ${v.movePts}/75 → with all reasons right ${v.movePts + 25}, with none ${v.movePts}\n   ${v.per.join(' | ')}`);
  await b.close();
})();
