const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
console.log((await p.evaluate(() => __MM.MODEL.map(M => { const C=__MM.CONFIG, b1=__MM.bestMove(M.p0,M.w0); let best={u:-1};
 for (const a of M.p0){ const s1=__MM.shareOf(__MM.move(M.p0,M.w0,a.w),b1), b2=__MM.bestMove(M.p1,a.w);
  for (const c of M.p1){ const s2=__MM.shareOf(__MM.move(M.p1,a.w,c.w),b2), u=C.PTS_STEP1*s1+C.PTS_BET*s2; if(u>best.u+1e-12) best={u,w1:a.w,w2:c.w,b2:b2.to.w}; } }
 const rule = Math.abs(best.w1-b1.to.w)<1e-9 && Math.abs(best.w2-best.b2)<1e-9;
 return `${M.c.name}: unrounded best path ${Math.round(best.w1*100)}% -> ${Math.round(best.w2*100)}% (rule path ${Math.round(b1.to.w*100)}% -> ${Math.round(best.b2*100)}%) follows rule: ${rule}`; }))).join('\n'));
await b.close(); })();
