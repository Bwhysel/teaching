const E = require('./engine.js');
const pct = x => (x*100).toFixed(0)+'%', b = x => '$'+x.toFixed(1)+'B';
const S = {
  NKE:  [['spreads x0.7',s=>({...s,spreadMult:0.7})],['spreads x0.5',s=>({...s,spreadMult:0.5})],['spreads -0.3pt',s=>({...s,spreadAdd:-0.003})],['MRP +1pt',s=>({...s,MRP:0.0541})],['T 25%',s=>({...s,T:0.25})]],
  DAL:  [['spreads x1.5',s=>({...s,spreadMult:1.5})],['spreads x2',s=>({...s,spreadMult:2})],['spreads x2.5',s=>({...s,spreadMult:2.5})]],
  ED:   [['bU +5%',s=>({...s,bU:s.bU*1.05})],['bU +10%',s=>({...s,bU:s.bU*1.10})],['spreads x1.1',s=>({...s,spreadMult:1.1})],['spreads x1.2',s=>({...s,spreadMult:1.2})]],
  CHTR: [['spreads x1.5',s=>({...s,spreadMult:1.5})],['spreads x2',s=>({...s,spreadMult:2})],['spreads +1pt',s=>({...s,spreadAdd:0.01})]],
  GOOGL:[['T 25%',s=>({...s,T:0.25})],['T 28%',s=>({...s,T:0.28})],['T 30%',s=>({...s,T:0.30})]],
};
for (const [k,c] of Object.entries(E.CO)){
  const w0 = c.ND/(c.ND+c.E), base = { bU:E.unlever(c), T:c.T, EBIT:c.EBIT };
  const p0 = E.curve(base), s1 = E.bestMove(p0, w0), wS = s1.to.w;
  console.log(`\n== ${c.name}: current ${pct(w0)} | step-1 best ${pct(wS)} net ${b(s1.net)} | hold band ${E.holdBand(p0).map(pct).join('-')}`);
  for (const [lab,f] of S[k]){
    const p1 = E.curve(f(base)), fb = E.bestMove(p1, wS), fc = E.bestMove(p1, w0);
    console.log(`  ${lab.padEnd(15)} from ${pct(wS)} -> ${pct(fb.to.w)} net ${b(fb.net)} | from current ${pct(w0)} -> ${pct(fc.to.w)} net ${b(fc.net)} | band ${E.holdBand(p1).map(pct).join('-')}`);
  }
}
