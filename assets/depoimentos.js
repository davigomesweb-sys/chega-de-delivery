(function(){
  // Só publique depoimento real e autorizado (menor de idade: com autorização do responsável).
  var D = [
    {tag:"Economia", nota:5, nome:"Mariana Silveira", quem:"Leitora do guia", foto:"assets/img/dep-1.webp", texto:"Eu vivia abrindo o iFood no fim do dia porque chegava morta da faculdade e sem energia. Esse guia abriu minha mente! O combo econômico salvou não só a minha rotina, mas principalmente o meu bolso. Paguei menos de 10 reais no PDF e já recuperei esse valor no primeiro final de semana sem pedir marmita cara."},
    {tag:"Praticidade", nota:5, nome:"Lucas Martins", quem:"Leitor do guia", foto:"assets/img/dep-2.webp", texto:"Sou péssimo na cozinha e achava que fazer marmita exigia o dia inteiro. A linha do tempo de 2 horas no domingo é genial, tudo fica pronto junto. As receitas são muito bem explicadas, com medidas de xícara e colher de verdade. Recomendo demais!"},
    {tag:"Variedade", nota:4, nome:"Camila Rodrigues", quem:"Leitora do guia", foto:"assets/img/dep-3.webp", texto:"O que eu mais gostei foi a variedade das 100 receitas. Antes eu tentava fazer marmita e enjoava no terceiro dia porque comia a mesma coisa. Com os combos e as opções de congelamento, consigo variar o almoço e o jantar da semana toda sem esforço. Só dou 4 estrelas porque queria que tivesse ainda mais opções vegetarianas, mas o material é excelente."},
    {tag:"Custo-benefício", nota:5, nome:"Bruno Teixeira", quem:"Leitor do guia", foto:"assets/img/dep-4.webp", texto:"Por R$ 9,90 eu achei que ia ser um e-book ralo, mas me surpreendi. As etiquetas para imprimir e o guia de congelamento dão um toque super profissional. Saber exatamente o que vai congelar bem e como descongelar sem perder o gosto tirou toda a minha insegurança."},
    {tag:"Rotina corrida", nota:5, nome:"Juliana Alves", quem:"Leitora do guia", foto:"assets/img/dep-5.webp", texto:"Simplesmente perfeito para quem mora sozinho e tem a rotina corrida. O formato do PDF é ótimo para abrir no celular enquanto estou no mercado com a lista de compras do combo. Em duas horas de domingo resolvi a minha semana inteira."},
    {tag:"Tempo", nota:4, nome:"Rafael Souza", quem:"Leitor do guia", foto:"assets/img/dep-6.webp", texto:"O esquema de '15 minutos de preparo ativo' é real. O que demora um pouco mais é o forno ou a panela trabalhando sozinhos, enquanto aproveito para lavar a louça ou descansar. Ajudou muito a cortar o gasto absurdo que eu tinha com delivery todo mês."},
    {tag:"Método", nota:5, nome:"Beatriz Costa", quem:"Leitora do guia", foto:"assets/img/dep-7.webp", texto:"Comprei achando que seria mais um livro de receitas comum, mas o método de organização é o grande diferencial. Os exemplos de cardápio prontos de segunda a sexta facilitam demais a nossa vida. Vale cada centavo!"},
    {tag:"Congelamento", nota:5, nome:"Thiago Guedes", quem:"Leitor do guia", foto:"assets/img/dep-8.webp", texto:"Minha esposa e eu trabalhamos fora o dia todo e estávamos viciados em pedir comida. Esse guia nos deu o empurrãozinho que faltava. A comida congelada fica com cara de feita na hora se você seguir o passo a passo de reaquecimento. Nota 10!"},
    {tag:"Ingredientes", nota:4, nome:"Larissa Pires", quem:"Leitora do guia", foto:"assets/img/dep-9.webp", texto:"As receitas usam ingredientes normais que a gente acha em qualquer mercado de bairro, sem frescura ou produtos caros. Adorei a parte de bases e combinações, dá para misturar os pratos e montar um prato bem completo. Super prático."},
    {tag:"Delivery", nota:5, nome:"Diego Fernandes", quem:"Leitor do guia", foto:"assets/img/dep-10.webp", texto:"Melhor investimento do ano. Em um mês economizei centenas de reais que iam direto para aplicativos de entrega. O guia é direto ao ponto, sem enrolação, e cumpre exatamente o que promete. Recomendo para todo mundo que não tem tempo a perder."}
  ];
  var sec = document.getElementById('depoimentos'); if(!sec || !D.length) return;
  var track = sec.querySelector('[data-track]'), dots = sec.querySelector('[data-dots]');
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function stars(n){ var p = Math.max(0, Math.min(5, n)) / 5 * 100; return '<span class="st" role="img" aria-label="Nota ' + String(n).replace('.',',') + ' de 5"><i style="width:' + p + '%"></i></span> <b class="sn">' + n.toFixed(1).replace('.',',') + '</b>'; }
  var notas = [];
  track.innerHTML = D.map(function(d, i){
    notas.push(d.nota);
    return '<article class="dep" aria-label="' + (i+1) + ' de ' + D.length + '">' +
      '<span class="dtag">' + esc(d.tag) + '</span>' +
      '<div class="dst">' + stars(d.nota) + '</div>' +
      '<blockquote>“' + esc(d.texto) + '”</blockquote>' +
      '<div class="dwho"><span class="av"><img src="' + esc(d.foto) + '" alt="" width="48" height="48" loading="lazy"></span><span><b>' + esc(d.nome) + '</b><small>' + esc(d.quem) + '</small></span></div></article>';
  }).join('');
  var m = notas.reduce(function(a,b){ return a+b; }, 0) / notas.length, avg = sec.querySelector('[data-avg]');
  avg.innerHTML = stars(Math.round(m*10)/10) + ' <span>média de ' + notas.length + ' avaliações</span>'; avg.hidden = false;
  dots.innerHTML = D.map(function(_, i){ return '<button type="button" aria-label="Depoimento ' + (i+1) + '"></button>'; }).join('');
  var cards = Array.prototype.slice.call(track.children), btns = Array.prototype.slice.call(dots.children), cur = 0, hold = 0;
  function go(i){ cur = (i + cards.length) % cards.length; track.scrollTo({left: cards[cur].offsetLeft - track.offsetLeft, behavior: 'smooth'}); }
  function mark(){
    var x = track.scrollLeft + track.clientWidth/3, best = 0;
    cards.forEach(function(c, i){ if(c.offsetLeft - track.offsetLeft <= x) best = i; });
    if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = cards.length - 1;
    btns.forEach(function(b, i){ b.classList.toggle('on', i === best); }); cur = best;
  }
  track.addEventListener('scroll', mark, {passive:true});
  btns.forEach(function(b, i){ b.addEventListener('click', function(){ hold = Date.now() + 12000; go(i); }); });
  ['pointerdown','touchstart','wheel','focusin','mouseenter'].forEach(function(ev){ track.addEventListener(ev, function(){ hold = Date.now() + 12000; }, {passive:true}); });
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vis = true; if('IntersectionObserver' in window){ new IntersectionObserver(function(e){ vis = e[0].isIntersecting; }, {threshold:.3}).observe(sec); }
  if(!reduce){
    setInterval(function(){
      if(!vis || document.hidden || Date.now() < hold) return;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if(atEnd) track.scrollTo({left: 0, behavior: 'smooth'}); else go(cur + 1);
    }, 5500);
  }
  sec.hidden = false; mark();
})();
