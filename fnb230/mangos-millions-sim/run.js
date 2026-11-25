const E = require('./engine.js');
const pct = x => (x*100).toFixed(1)+'%';
const b = x => '$'+x.toFixed(1)+'B';
for (const [k,c] of Object.entries(E.CO)){
  const w0 = c.ND/(c.ND+c.E), bU = E.unlever(c);
  const base = { bU, T:c.T, EBIT:c.EBIT };
  const pts = E.curve(base);
  const cur = E.at(pts, w0), peak = pts.reduce((a,p)=>p.V>a.V?p:a);
  const bm = E.bestMove(pts, w0);
  console.log(`\n== ${c.name}: w0=${pct(w0)} bU=${bU.toFixed(3)} T=${pct(c.T)} EBIT=${b(c.EBIT)}  mkt EV=${b(c.E+c.ND)}`);
  console.log(`  model V at current = ${b(cur.V)} (rating ${cur.rating}, kd ${pct(cur.kd)}, ke ${pct(cur.ke)}, WACC ${pct(cur.ka)})  gap vs mkt EV: ${pct(cur.V/(c.E+c.ND)-1)}`);
  console.log(`  peak V at w=${pct(peak.w)} = ${b(peak.V)} rating ${peak.rating}; best move from current -> ${pct(bm.to.w)} net ${b(bm.net)} (gain ${b(bm.gain)}, cost ${b(bm.cost)})`);
  console.log(`  hold band: ${E.holdBand(pts).map(pct).join(' to ')}`);
  // compact curve
  const row = [-10,-5,0,10,20,30,40,50,60,70,80,90].map(w=>{const p=E.at(pts,w/100);return `${w}%:${p.V.toFixed(0)}${p.rating==='cash'?'':'/'+p.rating}`});
  console.log('  '+row.join('  '));
}
