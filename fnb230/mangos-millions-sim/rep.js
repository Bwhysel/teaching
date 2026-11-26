const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  const rows = await p.evaluate(() => __MM.MODEL.map(M => {
    const pc = w => Math.round(w * 100) + '%';
    const b1 = __MM.bestMove(M.p0, M.w0), b2 = __MM.bestMove(M.p1, b1.to.w), pk0 = __MM.peak(M.p0), pk1 = __MM.peak(M.p1);
    const cur = M.p0[Math.round((M.w0 - M.p0.wmin) * 100)], ev = M.c.E + M.c.ND;
    const bands = (M.band0 ? M.band0.map(pc).join('–') : 'none') + ' / ' + (M.band1 ? M.band1.map(pc).join('–') : 'none');
    return '| ' + M.c.name + ' | ' + pc(M.w0) + ' | ' + pc(pk0.w) + ' | ' + pc(pk1.w) + ' | ' + pc(b1.to.w) + ' → ' + pc(b2.to.w) + ' | ' + bands + ' | ' + cur.V.toFixed(1) + ' vs ' + ev.toFixed(1) + ' (' + ((cur.V / ev - 1) * 100).toFixed(0) + '%) | ' + cur.rating + ' |';
  }));
  console.log(rows.join('\n'));
  await b.close();
})();
