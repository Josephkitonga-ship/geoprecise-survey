(function(){
  var NUMBER = '254718702057';
  var WA = 'https://wa.me/' + NUMBER;

  /* ---- sample plots: replace with real listings and photos ---- */
  var PLOTS = [
    {t:'Commercial plot, Kimana', m:'Size on enquiry', img:'images/plot-commercial.jpg',
     alt:'Fenced commercial plot with blue and white beacon posts, facing a roadside row of shops'},
    {t:'Farm plot, Kimana', m:'Size on enquiry', img:'images/plot-farm.jpg',
     alt:'Farm plot near Kimana'},
    {t:'Quarter-acre plot, Kimana', m:'About 1/4 acre', img:'images/plot-quarter.jpg',
     alt:'Aerial view of a fenced plot marked with blue and white boundary posts, among houses'},
    {t:'Residential plot, Kimana', m:'Size on enquiry', img:'images/plot-residential.jpg',
     alt:'Fenced residential plot with blue and white beacon posts beside apartment buildings'}
  ];

  var TOPICS = [
    {k:'Cadastral survey', s:'I need a cadastral survey.'},
    {k:'Beacon establishment', s:'I need beacon establishment.'},
    {k:'Land subdivision', s:'I need a land subdivision.'},
    {k:'Titling', s:'I need help with titling.'},
    {k:'Land search', s:'I need a land search.'},
    {k:'Topographical survey', s:'I need a topographical survey.'},
    {k:'Engineering survey', s:'I need an engineering survey.'},
    {k:'GIS', s:'I need GIS mapping.'},
    {k:'Buying a plot', s:'I would like to buy a plot.'}
  ];

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn'), nav = document.getElementById('nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---- year ---- */
  var yr = document.getElementById('yr');
  if(yr){ yr.textContent = new Date().getFullYear(); }

  /* ---- direct WhatsApp buttons (header + floating) ---- */
  var direct = document.querySelectorAll('.wa-direct');
  var hello = 'Hello Geoprecise Land Survey, I would like to ask about your land survey services.';
  for(var d=0; d<direct.length; d++){
    direct[d].href = WA + '?text=' + encodeURIComponent(hello);
    direct[d].target = '_blank';
    direct[d].rel = 'noopener';
  }

  /* ---- sample plot images ---- */
  function scene(i){
    var skies = [['#7CC0EA','#DDF0FA'],['#9BCBEA','#F4EBD0'],['#6FB5E5','#E6F4FB'],['#8FC6E6','#F6EFD8']];
    var grass = ['#6DAE34','#8AB83C','#5E9F2E','#9AB844'];
    var s = skies[i%4], g = grass[i%4];
    var treeX = [310,90,330,70][i%4];
    var mountain = (i%2===0) ?
      '<path d="M0 150 L90 135 L170 108 L205 100 L240 108 L330 136 L400 146 V160 H0Z" fill="#8F9CB8"/>' +
      '<path d="M170 108 L205 100 L240 108 L226 112 L214 108 L200 113 L186 108Z" fill="#fff" opacity=".9"/>' :
      '<path d="M0 148 Q80 120 160 142 T320 136 T400 144 V160 H0Z" fill="#86A66A"/>';
    return '<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="sk'+i+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+s[0]+'"/><stop offset="1" stop-color="'+s[1]+'"/></linearGradient></defs>' +
      '<rect width="400" height="260" fill="url(#sk'+i+')"/>' + mountain +
      '<rect y="150" width="400" height="110" fill="'+g+'"/>' +
      '<path d="M0 175 Q120 160 400 182 V260 H0Z" fill="#000" opacity=".06"/>' +
      [[70,238],[120,176],[300,172],[352,236]].map(function(p){
        return '<rect x="'+(p[0]-4)+'" y="'+(p[1]-16)+'" width="8" height="18" fill="#B3201F"/><rect x="'+(p[0]-4)+'" y="'+(p[1]-16)+'" width="8" height="5" fill="#F6E23E"/>';
      }).join('') +
      '<g transform="translate('+treeX+',150)"><rect x="-3" y="-10" width="6" height="38" fill="#5B4331"/>' +
      '<ellipse cx="0" cy="-16" rx="34" ry="11" fill="#3E6B22"/><ellipse cx="-8" cy="-22" rx="24" ry="8" fill="#4B7D29"/></g>' +
      '</svg>';
  }

  var grid = document.getElementById('plotGrid');
  if(grid){
    PLOTS.forEach(function(p,i){
      var art = document.createElement('article');
      art.className = 'plot';
      art.innerHTML =
        '<div class="img">' + scene(i) + '<img loading="lazy" alt=""><span class="tag">Sample image</span></div>' +
        '<div class="body"><h3></h3><p class="meta"></p><p class="price">Price on enquiry</p><span class="spacer"></span>' +
        '<a class="btn btn-wa btn-sm">Enquire on WhatsApp</a></div>';
      art.querySelector('h3').textContent = p.t;
      art.querySelector('.meta').textContent = p.m;
      var label = /enquiry/i.test(p.m) ? p.t : p.t + ' (' + p.m + ')';
      art.querySelector('a').href = 'contact.html?plot=' + encodeURIComponent(label) + '#message';
      var im = art.querySelector('.img img'), tg = art.querySelector('.tag');
      im.addEventListener('load', function(){ tg.remove(); });
      im.addEventListener('error', function(){ im.remove(); });
      im.alt = p.alt; im.src = p.img;
      grid.appendChild(art);
    });
  }

  /* ---- contact page: ready WhatsApp message ---- */
  var msgEl = document.getElementById('msg');
  if(msgEl){
    var nameEl = document.getElementById('name');
    var sendEl = document.getElementById('send');
    var chipsEl = document.getElementById('chips');
    var topic = null, plot = null, edited = false;

    var params = new URLSearchParams(window.location.search);
    var qTopic = params.get('topic'), qPlot = params.get('plot');
    if(qPlot){ plot = qPlot; }
    else if(qTopic){
      for(var i=0;i<TOPICS.length;i++){ if(TOPICS[i].k === qTopic){ topic = TOPICS[i]; } }
    }

    var build = function(){
      var n = nameEl.value.trim();
      var who = n ? "I'm " + n + ". " : "";
      var need;
      if(plot){ need = "I'm interested in this plot on your website: " + plot + ". Is it still available?"; }
      else if(topic){ need = topic.s; }
      else { need = "I would like to ask about your land survey services."; }
      var tail = plot ? "\n\nPlease share the location, size and price. Thank you." :
                        "\n\nLocation of the land: \n\nPlease advise on the next steps and cost. Thank you.";
      return "Hello Geoprecise Land Survey,\n\n" + who + need + tail;
    };
    var link = function(){ sendEl.href = WA + '?text=' + encodeURIComponent(msgEl.value); };
    var refresh = function(){
      if(!edited){ msgEl.value = build(); }
      link();
      var btns = chipsEl.querySelectorAll('button');
      for(var j=0;j<btns.length;j++){
        btns[j].setAttribute('aria-pressed', (!plot && topic && topic.k === btns[j].dataset.k) ? 'true' : 'false');
      }
    };

    TOPICS.forEach(function(tp){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = tp.k; b.dataset.k = tp.k;
      b.setAttribute('aria-pressed','false');
      b.addEventListener('click', function(){
        topic = (topic && topic.k === tp.k && !plot) ? null : tp;
        plot = null; edited = false; refresh();
      });
      chipsEl.appendChild(b);
    });

    nameEl.addEventListener('input', refresh);
    msgEl.addEventListener('input', function(){ edited = true; link(); });
    refresh();
  }
})();
