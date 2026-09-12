const styles = [
  {id:'minimalism',name:'Minimalism',desc:'Reduction, whitespace, hierarchy',tag:'Quiet',visual:'minimal',language:'Restrained type, whitespace, monochrome',best:'Portfolios, product sites',energy:'Low'} ,
  {id:'brutalism',name:'Brutalism',desc:'Raw, direct, intentionally rough',tag:'Loud',visual:'brutal',language:'Hard edges, raw grids, high contrast',best:'Experimental projects, culture',energy:'High'},
  {id:'glassmorphism',name:'Glassmorphism',desc:'Translucent surfaces and depth',tag:'Soft',visual:'glass',language:'Blur, transparency, layered cards',best:'Apps, dashboards, premium UI',energy:'Medium'},
  {id:'neumorphism',name:'Neumorphism',desc:'Soft depth through light and shadow',tag:'Soft',visual:'neumorph',language:'Raised surfaces, gentle shadows',best:'Controls, focused interfaces',energy:'Low'},
  {id:'bento',name:'Bento / Modular',desc:'Content organized as flexible blocks',tag:'Modular',visual:'bento',language:'Cards, modules, strong grouping',best:'Product launches, portfolios',energy:'Medium'},
  {id:'editorial',name:'Editorial',desc:'Typography leads the composition',tag:'Type-led',visual:'editorial',language:'Serif display type, columns, pacing',best:'Magazines, culture, fashion',energy:'Medium'},
  {id:'retro',name:'Retro / Vintage',desc:'A visual language borrowed from another era',tag:'Nostalgic',visual:'retro',language:'Period type, texture, familiar motifs',best:'Food, music, creative brands',energy:'High'},
  {id:'corporate',name:'Corporate / Swiss',desc:'Structured, legible, systematic',tag:'Systemic',visual:'corporate',language:'Grid, hierarchy, utility-first clarity',best:'Business, SaaS, institutions',energy:'Medium'},
  {id:'experimental',name:'Experimental',desc:'Break the grid, keep a point of view',tag:'Expressive',visual:'experimental',language:'Unexpected scale, motion, asymmetry',best:'Studios, art, campaigns',energy:'Very high'},
];

const grid = document.getElementById('styleGrid');
const body = document.getElementById('compareBody');
const root = document.documentElement;
const siteTitle = document.querySelector('.hero h1');
const heroEyebrow = document.querySelector('.hero .eyebrow');
const heroLead = document.querySelector('.hero-lead');
const brand = document.querySelector('.brand');

function previewMarkup(style){
  const p = style.visual;
  const common = `<div class="meta"><div><h3>${style.name}</h3><p>${style.desc}</p></div><span class="tag">${style.tag}</span></div>`;
  const snippets = {
    minimal:`<div class="mini-nav"><span>studio</span><span>menu +</span></div><div class="mini-hero"><b>Less,<br>but better.</b><i>carefully.</i><div class="mini-line"></div><div class="mini-dot"></div></div>`,
    brutal:`<div class="b-top"><span>BRUTAL / 07</span><b>NO FILTER</b></div><div class="b-grid"><div class="b-main"><small>RAW INTERFACE</small><strong>MAKE<br>IT LOUD.</strong><i>01 / 04</i></div><div class="b-side"><span>↗</span><b>BREAK<br>THE<br>RULES</b></div></div><div class="b-footer"><span>CLICK / MOVE / BREAK</span><em>ENTER ↗</em></div>`,
    glass:`<div class="g-card"><b>Soft<br>spaces.</b><span>depth / light / motion</span><div class="g-pill">Explore →</div></div>`,
    neumorph:`<div class="neu-panel"><div class="neu-title"></div><div class="neu-row"><div class="neu-chip"></div><div class="neu-chip"></div></div><div class="neu-round"></div></div>`,
    bento:`<div class="b1"><small>01 / CORE</small><strong>Build<br>better.</strong><span>Product system</span></div><div class="b2"><small>02</small><strong>42K</strong><span>active modules</span></div><div class="b3"><small>03 / FLOW</small><strong>Design → Build → Ship</strong><span>One system, many surfaces.</span></div><div class="b4"><b>↗</b><span>View system</span></div>`,
    editorial:`<div class="e-top"><span>ISSUE 24</span><span>VISUAL CULTURE</span></div><h4>Forms<br>for now.</h4><p>A typographic composition where the content and its rhythm become the interface.</p><div class="e-foot">Essay / 7 min read</div>`,
    retro:`<div class="r-frame"><div class="r-star">★</div><h5>GOOD<br>IDEAS</h5><p>EST. 1987 / ALWAYS MOVING</p></div>`,
    corporate:`<div class="c-nav"><b>HELIO</b><span>01—04</span><span>ABOUT</span></div><div class="c-layout"><div><small>SWISS DIGITAL SYSTEM</small><div class="c-title">Build with<br><span>confidence.</span></div><div class="c-text">Clear hierarchy. Useful actions. No noise.</div><div class="c-btn">Get started →</div></div><div class="c-img"><i>01</i></div></div><div class="c-foot"><span>PRECISION / CLARITY / SCALE</span><b>—</b></div>`,
    experimental:`<div class="x-noise"></div><div class="x-blob"></div><div class="x-orbit"></div><div class="x-ring"></div><div class="x-type"><em>un</em>usual<br><strong>by design</strong><span>creative practice / 2026</span></div><div class="x-stamp">NO. 19</div><div class="x-arrow">↗</div>`,
  };
  return `<article class="style-card" id="card-${style.id}" data-style-id="${style.id}" role="button" tabindex="0" aria-label="Use ${style.name} style"><div class="preview ${p}">${snippets[p]}</div>${common}</article>`;
}

function render(filter = ''){
  const list = filter ? styles.filter(s => s.name.toLowerCase().includes(filter) || s.desc.toLowerCase().includes(filter)) : styles;
  grid.innerHTML = list.map(previewMarkup).join('');
  body.innerHTML = list.map(s => `<tr><td>${s.name}</td><td>${s.language}</td><td>${s.best}</td><td><span class="energy">${s.energy}</span></td></tr>`).join('');
  bindStyleCards();
}

function applyStyle(id, {save = true, scroll = true} = {}){
  const selected = styles.find(s => s.id === id) || styles[0];
  document.body.dataset.style = selected.id;
  document.body.classList.add('style-switching');
  window.setTimeout(() => document.body.classList.remove('style-switching'), 380);

  if (save) localStorage.setItem('webforms-style', selected.id);
  if (heroEyebrow) heroEyebrow.textContent = `${selected.name} / visual study`;
  if (siteTitle) siteTitle.innerHTML = `Web design styles,<br><span>${selected.name.toLowerCase()} in practice.</span>`;
  if (heroLead) heroLead.textContent = `${selected.name} is defined by ${selected.language.toLowerCase()}. The guide keeps its original structure, while the surrounding interface shifts just enough to let you feel the style.`;
  if (brand) brand.setAttribute('title', `Current style: ${selected.name}`);

  document.querySelectorAll('.style-card').forEach(card => {
    card.classList.toggle('is-active', card.dataset.styleId === selected.id);
  });

  if (scroll) {
    document.getElementById('styles')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

function bindStyleCards(){
  document.querySelectorAll('.style-card').forEach(card => {
    const choose = () => applyStyle(card.dataset.styleId);
    card.addEventListener('click', choose);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        choose();
      }
    });
  });
}

render();

const saved = localStorage.getItem('webforms-style');
applyStyle(styles.some(s => s.id === saved) ? saved : 'minimalism', {save:false, scroll:false});

document.getElementById('allStyles').addEventListener('click', () => {
  grid.scrollIntoView({behavior:'smooth', block:'start'});
});

document.getElementById('randomStyle').addEventListener('click', () => {
  const s = styles[Math.floor(Math.random() * styles.length)];
  applyStyle(s.id);
  setTimeout(() => {
    const el = document.getElementById(`card-${s.id}`);
    if(el){ el.classList.add('highlight'); setTimeout(()=>el.classList.remove('highlight'), 1400); }
  }, 500);
});
