const { chromium } = require('playwright');
const O = '/tmp/claude-0/-home-user-teaching/cf62903a-f23e-55db-a5d1-f5cc3ba7c3b8/scratchpad/shots/';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file:///home/user/teaching/fnb230/fnb230-mod13-mangos-millions.html');
  await p.click('[data-act=explore]'); await p.waitForTimeout(400);
  const paths = () => p.$$eval('#xchart svg path', ps => ps.filter(x => /stroke-dasharray="4 4"/.test(x.outerHTML)).length);
  console.log('dashed starting line before any move:', await paths());
  await p.click('[data-act=stage][data-v="3"]'); await p.waitForTimeout(200);
  await p.focus('#x-T'); for (let i = 0; i < 9; i++) await p.keyboard.press('ArrowRight');
  console.log('dashed starting line after tax +9:', await paths(), '| yellow after-cost line present:', await p.$$eval('#xchart svg path', ps => ps.some(x => /#FFD23F/.test(x.outerHTML))));
  const card = await p.$('#xchart'); await p.$eval('#xchart', e => e.scrollIntoView({ block: 'center' }));
  await (await p.$('.card.chart')).screenshot({ path: O + 'T-start-vs-now.png' });
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
