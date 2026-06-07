(function(){
  var DAY=Math.floor(Date.now()/86400000);
  var HOUR=new Date().getHours();
  function seeded(s,mn,mx){var x=Math.sin((DAY+s)*9301+49297)*233280;return Math.floor((x-Math.floor(x))*(mx-mn+1))+mn;}
  function rnd(mn,mx){return Math.floor(Math.random()*(mx-mn+1))+mn;}
  function clamp(v,mn,mx){return Math.max(mn,Math.min(mx,v));}
  function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}

  var visit=seeded(1,22,54);
  var shop=seeded(2,5,14);
  var orders=Math.floor(seeded(3,45,92)*(0.25+Math.min(HOUR/22,1)*0.75));

  var NAMES=['Мария','Иван','Георги','Петя','Стефан','Надя','Кристина','Димитър','Елена','Александър','Виктория','Николай','Симона','Боян','Цвети','Тодор','Даниела','Мартин'];
  var CITIES=['София','Пловдив','Варна','Бургас','Русе','Стара Загора','Плевен','В. Търново','Благоевград','Добрич','Шумен'];
  var PRODUCTS=['Nike Air Max 270','Jordan 1 Retro High','Adidas Ultraboost 22','New Balance 550','Nike Dunk Low','Puma RS-X','Converse Chuck 70','Reebok Classic'];
  var TIMES=['преди 1 минута','преди 2 минути','преди 4 минути','преди 6 минути','преди 9 минути','преди 12 минути'];

  function build(){
    if(document.getElementById('mk-bar'))return;

    var st=document.createElement('style');
    st.innerHTML=
      '#mk-bar{position:fixed;top:0;left:0;right:0;z-index:2147483647;background:#111;border-bottom:2px solid #e8000d;padding:8px 16px;display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}'+
      '#mk-bar span{font-size:13px;font-weight:600;color:rgba(255,255,255,0.82);white-space:nowrap}'+
      '#mk-bar strong{color:#e8000d;font-weight:900;font-size:14px}'+
      '#mk-bar .mk-s{width:1px;height:13px;background:rgba(255,255,255,0.15)}'+
      '#mk-pop{position:fixed;bottom:90px;left:16px;z-index:2147483646;width:280px;max-width:calc(100vw - 32px);background:#111;border:1.5px solid rgba(255,255,255,0.08);border-left:4px solid #22c55e;border-radius:13px;padding:11px 30px 11px 13px;box-shadow:0 8px 28px rgba(0,0,0,0.6);display:flex;align-items:center;gap:10px;opacity:0;transform:translateX(-20px);transition:opacity 0.35s,transform 0.35s;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}'+
      '#mk-pop.on{opacity:1;transform:translateX(0);pointer-events:auto}'+
      '#mk-pop-ico{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#e8000d,#ff6b6b);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}'+
      '#mk-pop-name{font-size:13px;font-weight:700;color:#fff;margin:0 0 1px}'+
      '#mk-pop-prod{font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 1px}'+
      '#mk-pop-time{font-size:10px;font-weight:700;color:#22c55e;margin:0}'+
      '#mk-pop-x{position:absolute;top:6px;right:8px;background:none;border:none;color:rgba(255,255,255,0.25);font-size:13px;cursor:pointer;padding:0;line-height:1}';
    document.head.appendChild(st);

    var bar=document.createElement('div');
    bar.id='mk-bar';
    bar.innerHTML=
      '<span>&#128064; <strong id="mk-v">'+visit+'</strong> на сайта сега</span>'+
      '<div class="mk-s"></div>'+
      '<span>&#128722; <strong id="mk-s2">'+shop+'</strong> пазаруват</span>'+
      '<div class="mk-s"></div>'+
      '<span>&#128230; <strong id="mk-o">'+orders+'</strong> поръчки днес</span>';
    document.body.appendChild(bar);

    var pop=document.createElement('div');
    pop.id='mk-pop';
    pop.innerHTML=
      '<div id="mk-pop-ico">&#128249;</div>'+
      '<div><p id="mk-pop-name"></p><p id="mk-pop-prod"></p><p id="mk-pop-time"></p></div>'+
      '<button id="mk-pop-x">&#x2715;</button>';
    document.body.appendChild(pop);

    var paused=false;
    document.getElementById('mk-pop-x').onclick=function(){pop.classList.remove('on');paused=true;setTimeout(function(){paused=false;},45000);};

    setInterval(function(){
      visit=clamp(visit+rnd(-1,2),14,68);
      shop=clamp(shop+rnd(-1,1),3,Math.min(visit-6,20));
      if(Math.random()<0.18)orders++;
      var v=document.getElementById('mk-v');if(v)v.textContent=visit;
      var s2=document.getElementById('mk-s2');if(s2)s2.textContent=shop;
      var o=document.getElementById('mk-o');if(o)o.textContent=orders;
    },rnd(5,9)*1000);

    function showPop(){
      if(paused)return;
      document.getElementById('mk-pop-name').textContent=pick(NAMES)+' от '+pick(CITIES);
      document.getElementById('mk-pop-prod').textContent='купи '+pick(PRODUCTS);
      document.getElementById('mk-pop-time').textContent=pick(TIMES);
      pop.classList.add('on');
      setTimeout(function(){pop.classList.remove('on');},5500);
    }
    function nextPop(){setTimeout(function(){showPop();nextPop();},rnd(22,42)*1000);}
    setTimeout(function(){showPop();nextPop();},rnd(10,15)*1000);
  }

  if(document.body){build();}
  else if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',build);}
  else{build();}
  window.addEventListener('load',function(){if(!document.getElementById('mk-bar'))build();});
  setTimeout(function(){if(!document.getElementById('mk-bar'))build();},1000);
}());
