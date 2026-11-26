const E = require('./engine.js');
const pct = x => (x*100).toFixed(0)+'%', b = x => '$'+x.toFixed(2)+'B';
const S = {
  NKE:[0.95,0.9,0.85,0.8].map(m=>['spreads x'+m,s=>({...s,spreadMult:m})]),
  DAL:[1.15,1.25,1.35,1.5].map(m=>['spreads x'+m,s=>({...s,spreadMult:m})]),
  GOOGL:[0.28,0.32,0.35,0.40].map(t=>['T '+t,s=>({...s,T:t})]),
  CHTR:[2,2.5].map(m=>['spreads x'+m,s=>({...s,spreadMult:m})]),
};
for (const k of Object.keys(S)){ const c=E.CO[k], w0=c.ND/(c.ND+c.E), base={bU:E.unlever(c),T:c.T,EBIT:c.EBIT};
  const p0=E.curve(base), s1=E.bestMove(p0,w0), wS=s1.to.w; console.log(`\n${c.name}: step-1 best ${pct(wS)}`);
  for (const [l,f] of S[k]){ const p1=E.curve(f(base)), pk=p1.reduce((a,p)=>p.V>a.V?p:a), fb=E.bestMove(p1,wS), fc=E.bestMove(p1,w0), hb=E.holdBand(p1);
    console.log(`  ${l.padEnd(14)} peak ${pct(pk.w)} | from ${pct(wS)} -> ${pct(fb.to.w)} net ${b(fb.net)} (cost ${b(fb.cost)}) | from today ${pct(w0)} -> ${pct(fc.to.w)} | band ${hb.map(pct).join('-')}`); } }
