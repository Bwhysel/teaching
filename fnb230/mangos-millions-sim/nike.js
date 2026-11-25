const E = require('./engine.js');
const pct = x => (x*100).toFixed(0)+'%', b = x => '$'+x.toFixed(2)+'B';
const c=E.CO.NKE, w0=c.ND/(c.ND+c.E), base={bU:E.unlever(c),T:c.T,EBIT:c.EBIT};
const p0=E.curve(base), wS=E.bestMove(p0,w0).to.w;
const L=[];
for (const t of [0.21,0.22,0.23,0.24,0.25]) L.push(['T '+t, s=>({...s,T:t})]);
for (const m of [1.05,1.1,1.15,1.2,1.3]) L.push(['beta x'+m, s=>({...s,bU:s.bU*m})]);
for (const m of [0.0471,0.0491,0.0516,0.0541]) L.push(['MRP '+m, s=>({...s,MRP:m})]);
for (const a of [-0.001,-0.002,-0.003]) L.push(['spreads '+a, s=>({...s,spreadAdd:a})]);
for (const [l,f] of L){ const p1=E.curve(f(base)), pk=p1.reduce((a,p)=>p.V>a.V?p:a), fb=E.bestMove(p1,wS), hb=E.holdBand(p1);
  console.log(`${l.padEnd(14)} peak ${pct(pk.w)} | from ${pct(wS)} -> ${pct(fb.to.w)} net ${b(fb.net)} cost ${b(fb.cost)} | band ${hb.map(pct).join('-')}`); }
