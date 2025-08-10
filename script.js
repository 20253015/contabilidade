// Utils
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => Array.from(p.querySelectorAll(s));

// Menu mobile
const hamb = $('#hamb');
const menu = $('#menu');
hamb?.addEventListener('click', ()=>{
  const open = menu.classList.toggle('open');
  hamb.setAttribute('aria-expanded', String(open));
});
$$('#menu a').forEach(a=>a.addEventListener('click', ()=> menu.classList.remove('open')));

// Header shrink
const navbar = $('#navbar');
window.addEventListener('scroll', ()=> navbar.classList.toggle('shrink', window.scrollY > 10), {passive:true});

// Reveal
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:.12});
  $$('[data-reveal]').forEach(el=>obs.observe(el));
} else {
  $$('[data-reveal]').forEach(el=> el.classList.add('visible'));
}

// Back to top
$('#backTop')?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Ano no rodapé
$('#year').textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = $('#themeToggle');
const applyTheme = (t)=> document.body.classList.toggle('dark', t === 'dark');
const storedTheme = localStorage.getItem('062-theme');
if (storedTheme) {
  applyTheme(storedTheme);
  themeToggle.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(storedTheme === 'dark'));
}
themeToggle.addEventListener('click', ()=>{
  const now = document.body.classList.toggle('dark');
  const mode = now ? 'dark' : 'light';
  localStorage.setItem('062-theme', mode);
  themeToggle.setAttribute('aria-pressed', String(now));
  themeToggle.textContent = now ? '☀️' : '🌙';
});

// Form → WhatsApp
const form = $('#leadForm');
const toast = (msg)=>{
  let t = document.getElementById('toast');
  if(!t){ t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 2400);
};
const buildMessage = () => {
  const nome = $('#nome').value.trim();
  const email = $('#email').value.trim();
  const tel = $('#tel').value.trim();
  const mensagem = $('#msg').value.trim();
  return `Olá! Tenho interesse nos serviços de contabilidade.%0A%0A`+
         `Nome: ${encodeURIComponent(nome)}%0A`+
         `E-mail: ${encodeURIComponent(email)}%0A`+
         (tel?`Telefone: ${encodeURIComponent(tel)}%0A`:``)+
         (mensagem?`Mensagem: ${encodeURIComponent(mensagem)}%0A`:``);
};
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  if (!$('#nome').value.trim() || !$('#email').validity.valid || !$('#lgpd').checked){
    toast('Verifique os campos obrigatórios.');
    return;
  }
  const url = `https://wa.me/5562994067881?text=${buildMessage()}`;
  window.open(url,'_blank');
  toast('Abrindo WhatsApp…');
});

// Carrossel depoimentos
const track = $('#ttrack');
const dotsWrap = $('#dots');
let index = 0;
const slides = track ? Array.from(track.querySelectorAll('.card')) : [];
const slideW = () => slides[0]?.offsetWidth + 18 || 338;
const makeDots = ()=>{
  dotsWrap.innerHTML = '';
  slides.forEach((_, i)=>{
    const b = document.createElement('button');
    b.className = 'dot'; b.type = 'button';
    b.setAttribute('aria-label', `Ir para o slide ${i+1}`);
    b.addEventListener('click', ()=> goTo(i));
    dotsWrap.appendChild(b);
  });
};
const updateDots = ()=> Array.from(dotsWrap.querySelectorAll('.dot')).forEach((d,i)=> d.setAttribute('aria-current', i===index ? 'true' : 'false'));
const goTo = (i)=>{
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(${-index * slideW()}px)`;
  updateDots();
};
const autoplay = ()=>{ if (!document.hidden) goTo(index + 1); };
if (track){
  makeDots(); goTo(0);
  let timer = setInterval(autoplay, 4000);
  track.addEventListener('mouseenter', ()=> clearInterval(timer));
  track.addEventListener('mouseleave', ()=> timer = setInterval(autoplay, 4000));
  window.addEventListener('resize', ()=> goTo(index));
}

// Scroll-Spy
const spyLinks = $$('a[data-spy]');
const sections = spyLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const clearSpy = ()=> spyLinks.forEach(a=> a.removeAttribute('aria-current'));
const setSpy = (id)=> {
  clearSpy();
  const link = spyLinks.find(a => a.getAttribute('href') === `#${id}`);
  if (link) link.setAttribute('aria-current','true');
};
const spyObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if (entry.isIntersecting) setSpy(entry.target.id); });
}, {rootMargin:"-40% 0px -55% 0px", threshold:0});
sections.forEach(sec => spyObserver.observe(sec));
