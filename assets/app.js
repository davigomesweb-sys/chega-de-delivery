(function(){
  var S = window.SITE || {};
  function $all(s){return Array.prototype.slice.call(document.querySelectorAll(s));}
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function num(x){ return parseFloat(String(x).replace('.','').replace(',','.')); }

  // ---- preço com prazo real: antes do prazo vale o lançamento; depois, o preço normal (ou "encerrada")
  var P = S.promo || {}, endT = Date.parse(P.ate || ''), PRICE = P.precoPromo || '9,90', CHECK = S.checkout || '', PROMO_ON = false, EXPIRED = false;
  if(P.ativa && !isNaN(endT)){
    if(Date.now() < endT){ PROMO_ON = true; }
    else { EXPIRED = true; PRICE = P.precoNormal || PRICE; CHECK = P.checkoutNormal || ''; }
  }
  $all('[data-price]').forEach(function(el){ el.textContent = 'R$ ' + PRICE; });
  $all('[data-price-num]').forEach(function(el){ el.textContent = PRICE; });
  var PRICE_N = num(PRICE) || 9.9;

  function fmt(ms){
    var t = Math.max(0, Math.floor(ms/1000)), d = Math.floor(t/86400), h = Math.floor(t%86400/3600), m = Math.floor(t%3600/60), s = t%60;
    return (d > 0 ? d + 'd ' : '') + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
  }
  if(PROMO_ON){
    var d = new Date(endT), dtxt = pad(d.getDate()) + '/' + pad(d.getMonth()+1);
    $all('[data-promo]').forEach(function(el){ el.hidden = false; });
    $all('[data-promo-data]').forEach(function(el){ el.textContent = dtxt; });
    $all('[data-promo-normal]').forEach(function(el){ el.textContent = 'R$ ' + (P.precoNormal || ''); el.closest('[data-then]').hidden = !P.precoNormal; });
    var run = function(){
      var left = endT - Date.now();
      if(left <= 0){ location.reload(); return; }
      $all('[data-promo-cd]').forEach(function(el){ el.textContent = fmt(left); });
    };
    run(); setInterval(run, 1000);
  } else {
    $all('[data-then]').forEach(function(el){ el.hidden = true; });
    $all('[data-cd-box]').forEach(function(el){ el.hidden = true; });
  }

  // ---- links de compra (repassam UTMs e ids de anúncio para a Kirvano medir a origem)
  var KEEP = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','ttclid','src','sck'];
  function checkoutUrl(base){
    try{
      var u = new URL(base, location.href), cur = new URLSearchParams(location.search);
      KEEP.forEach(function(k){ if(cur.get(k)) u.searchParams.set(k, cur.get(k)); });
      return u.toString();
    }catch(e){ return base; }
  }
  $all('[data-checkout]').forEach(function(a){
    if(EXPIRED && !CHECK){
      a.removeAttribute('href'); a.textContent = 'Oferta encerrada'; a.style.opacity = '.55'; a.style.pointerEvents = 'none'; return;
    }
    a.setAttribute('href', CHECK ? checkoutUrl(CHECK) : '#oferta');   // sem link configurado: rola para a oferta (modo rascunho)
    a.addEventListener('click', function(){
      try{ if(window.fbq) fbq('track','InitiateCheckout',{value:PRICE_N,currency:'BRL',content_name:S.produto||'Chega de Delivery'}); }catch(e){}
      try{ if(window.ttq) ttq.track('InitiateCheckout',{value:PRICE_N,currency:'BRL',content_name:S.produto||'Chega de Delivery'}); }catch(e){}
    });
  });

  // ---- barra fixa no celular: aparece depois do topo e some quando a oferta está na tela
  var st = document.querySelector('.sticky'), offer = document.getElementById('oferta');
  if(st){
    document.body.classList.add('has-sticky');
    var inOffer = false;
    if(offer && 'IntersectionObserver' in window){ new IntersectionObserver(function(e){ inOffer = e[0].isIntersecting; upd(); }, {threshold:.15}).observe(offer); }
    var upd = function(){ st.classList.toggle('show', window.scrollY > 520 && !inOffer); };
    window.addEventListener('scroll', upd, {passive:true}); upd();
  }

  // ---- cookies e pixels (só depois do "Aceitar")
  var KEY = 'cdd_cookies';
  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }
  function loadPixels(){
    if(S.metaPixelId && !window.fbq){
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', S.metaPixelId); fbq('track','PageView'); fbq('track','ViewContent',{content_name:S.produto||'Chega de Delivery',value:PRICE_N,currency:'BRL'});
    }
    if(S.tiktokPixelId && !window.ttq){
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load(S.tiktokPixelId);ttq.page()}(window,document,'ttq');
    }
  }
  var box = document.querySelector('.cookie');
  var has = !!(S.metaPixelId || S.tiktokPixelId);
  if(get() === 'yes'){ loadPixels(); }
  else if(box && has && get() !== 'no'){
    box.classList.add('show');
    box.querySelector('.ok').addEventListener('click', function(){ set('yes'); box.classList.remove('show'); loadPixels(); });
    box.querySelector('.no').addEventListener('click', function(){ set('no'); box.classList.remove('show'); });
  }
})();
