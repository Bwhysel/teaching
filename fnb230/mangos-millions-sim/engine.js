// Mango's Millions engine (textbook Ch. 14: MM with taxes + trade-off via rising required returns)
// Units: $ billions, rates as decimals.
const C = {
  RF: 0.0485, MRP: 0.0441,
  COST_UP: 0.0057, COST_DOWN: 0.0315,
  // Damodaran Jan 2026, large non-financial firms: [coverage lower bound, rating, spread]
  RATINGS: [[-1e9,'D',0.19],[0.2,'C',0.16],[0.65,'CC',0.1261],[0.8,'CCC',0.0885],[1.25,'B-',0.0509],[1.5,'B',0.0321],
            [1.75,'B+',0.0275],[2.0,'BB',0.0184],[2.25,'BB+',0.0138],[2.5,'BBB',0.0111],[3.0,'A-',0.0089],[4.25,'A',0.0078],
            [5.5,'A+',0.0070],[6.5,'AA',0.0055],[8.5,'AAA',0.0040]],
  W_MIN: -0.10, W_MAX: 0.90, STEP: 0.01,
};
const CO = {
  NKE:  { name:'Nike',        E:54.45,  ND:-0.475,  beta:1.03, T:0.203, EBIT:3.853 },
  DAL:  { name:'Delta',       E:54.57,  ND:8.318,   beta:1.42, T:0.191, EBIT:5.286 },
  ED:   { name:'Con Edison',  E:44.68,  ND:27.386,  beta:0.22, T:0.221, EBIT:3.387 },
  CHTR: { name:'Charter',     E:148.05*0.13587, ND:106.479, beta:0.73, T:0.227, EBIT:12.332 },
  GOOGL:{ name:'Alphabet',    E:3357,   ND:-138.98, beta:1.23, T:0.168, EBIT:156.976 },
};
function rate(cov, spreadMult=1, spreadAdd=0){
  let r = C.RATINGS[0];
  for (const x of C.RATINGS) if (cov > x[0]) r = x;
  return { rating:r[1], spread: r[2]*spreadMult + spreadAdd };
}
// Build the curve for a scenario: {bU, T, EBIT, spreadMult, spreadAdd}
function curve(s){
  const pts = [];
  const n = Math.round((C.W_MAX - C.W_MIN)/C.STEP);
  for (let i=0;i<=n;i++){
    const w = +(C.W_MIN + i*C.STEP).toFixed(4);
    const bL = s.bU * (1 + (1 - s.T) * w/(1 - w));
    const ke = C.RF + bL * (s.MRP || C.MRP);
    let kd, rt='—', cov=Infinity, V, ka, iters=0;
    if (w <= 0){ kd = C.RF; ka = w*kd*(1-s.T) + (1-w)*ke; V = s.EBIT*(1-s.T)/ka; rt='cash'; }
    else {
      kd = C.RF + 0.004; const seen = new Map();
      for (iters=0; iters<200; iters++){
        ka = w*kd*(1-s.T) + (1-w)*ke;
        V = s.EBIT*(1-s.T)/ka;
        const D = w*V; cov = s.EBIT/(kd*D);
        const r = rate(cov, s.spreadMult||1, s.spreadAdd||0);
        const kdn = C.RF + r.spread; rt = r.rating;
        if (Math.abs(kdn-kd) < 1e-12) break;
        const key = kdn.toFixed(8);
        if (seen.has(key)) { kd = Math.max(kd, kdn); ka = w*kd*(1-s.T)+(1-w)*ke; V = s.EBIT*(1-s.T)/ka; cov = s.EBIT/(kd*w*V); rt = rate(cov,s.spreadMult||1,s.spreadAdd||0).rating; break; } // cycle: take the higher rate
        seen.set(key, 1); kd = kdn;
      }
    }
    const D = w*V;
    pts.push({ w, bL, ke, kd, ka, V, D, rating: rt, cov, TB: s.T*D });
  }
  const v0 = pts.find(p=>Math.abs(p.w)<1e-9).V;
  for (const p of pts){ p.dV = p.V - v0; p.costRates = p.TB - p.dV; }
  return pts;
}
function at(pts, w){ return pts.reduce((a,b)=> Math.abs(b.w-w) < Math.abs(a.w-w) ? b : a); }
function tcost(Dold, Dnew){ const d = Dnew - Dold; return d >= 0 ? d*C.COST_UP : -d*C.COST_DOWN; }
// Net value of moving from w_old to w_new on a curve. Debt before the move is valued on the same curve.
function move(pts, wOld, wNew){
  const a = at(pts, wOld), b = at(pts, wNew);
  const cost = tcost(a.D, b.D);
  return { from:a, to:b, gain: b.V - a.V, cost, net: b.V - a.V - cost };
}
function bestMove(pts, wOld){
  let best = null;
  for (const p of pts){ const m = move(pts, wOld, p.w); if (!best || m.net > best.net + 1e-12) best = m; }
  return best;
}
// "Do nothing" band: positions from which no move gains anything after costs
function holdBand(pts){
  const ok = pts.filter(p => bestMove(pts, p.w).net <= 1e-9).map(p=>p.w);
  return ok.length ? [Math.min(...ok), Math.max(...ok)] : null;
}
function unlever(c){ return c.beta / (1 + (1 - c.T) * c.ND / c.E); }
module.exports = { C, CO, curve, at, move, bestMove, holdBand, unlever, rate };
