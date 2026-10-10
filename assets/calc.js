(function(){
  var root = document.getElementById('calculadora'); if(!root) return;
  var f = function(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); };
  var q = function(s){ return root.querySelector(s); };
  var n = q('#c-n'), d = q('#c-d'), h = q('#c-h');
  var WEEKS = 52/12;                       // semanas por mês, conta exata
  var priceEl = document.querySelector('[data-price-num]');
  var GUIDE = priceEl ? parseFloat(priceEl.textContent.replace('.','').replace(',','.')) || 9.9 : 9.9;
  function val(el, def){ var v = parseFloat(String(el.value).replace(',','.')); return isFinite(v) && v >= 0 ? v : def; }
  function calc(){
    var meals = val(n,0), dv = val(d,0), hm = val(h,0);
    q('#c-nv').textContent = meals + (meals === 1 ? ' refeição' : ' refeições');
    var diff = dv - hm, month = meals * WEEKS * diff, year = month * 12;
    var big = q('#c-big'), sub = q('#c-sub'), rows = q('#c-rows');
    if(meals <= 0 || diff <= 0){
      big.textContent = f(0);
      sub.textContent = diff <= 0 ? 'Com esses números, cozinhar em casa não sai mais barato que o delivery. Confira os valores.' : 'Escolha quantas refeições de delivery você pede por semana.';
      rows.hidden = true; return;
    }
    rows.hidden = false;
    big.textContent = f(month);
    sub.textContent = 'a menos por mês, se trocar essas ' + meals + ' refeições por semana por marmita de casa.';
    q('#c-del').textContent = f(meals * WEEKS * dv);
    q('#c-home').textContent = f(meals * WEEKS * hm);
    q('#c-year').textContent = f(year);
    var pay = GUIDE / diff;
    q('#c-pay').textContent = pay <= 1 ? 'na 1ª marmita que você não pedir' : 'em ' + Math.ceil(pay) + ' marmitas que você não pedir';
  }
  [n,d,h].forEach(function(el){ el.addEventListener('input', calc); });
  calc();
  root.hidden = false;
})();
