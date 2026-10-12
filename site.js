/* TestStep Academy - the study pages: Home, Syllabus, lessons, Cheat sheet and Glossary,
   plus the navigation and the switching between pages.
   The interview questions themselves are handled by script.js, which also provides the
   shared helpers used here (window.TSH). Content comes from study.json. */
(function () {
  'use strict';

  var T = window.TSH;
  if (!T) return;
  var h = T.h, icon = T.icon, richText = T.richText, safeUrl = T.safeUrl, animate = T.animate;

  var DONE_KEY = 'tsh.done';
  var VIEWS = ['home', 'syllabus', 'lesson', 'interview', 'cheatsheet', 'glossary'];
  var TITLES = { syllabus: 'Syllabus', interview: 'Interview preparation', cheatsheet: 'Cheat sheet', glossary: 'Glossary' };
  var SITE = 'TestStep Academy';

  var study = { units: [], lessons: [], cheatsheet: [], glossary: [] };
  var done = loadDone();          // ids of lessons the visitor marked as done
  var questionTotal = 0;
  var firstRoute = true;
  var current = { view: '', id: '' };

  var el = {};
  [
    'nav', 'navLinks', 'menuToggle', 'syllabusItem', 'syllabusLink', 'syllabusMenu',
    'homeContinue', 'homeProgress', 'homeProgressText', 'homeProgressPercent', 'homeProgressBar',
    'homePath', 'homeUnits', 'homeQuestionCount',
    'syllabusLead', 'syllabusSearch', 'syllabusList', 'syllabusEmpty',
    'lessonOutline', 'lessonArticle',
    'cheatSearch', 'cheatList', 'cheatEmpty',
    'glossarySearch', 'glossaryList', 'glossaryEmpty'
  ].forEach(function (id) { el[id] = document.getElementById(id); });

  var views = {};
  VIEWS.forEach(function (name) { views[name] = document.getElementById('view-' + name); });

  // ---------- storage ----------

  function loadDone() {
    try {
      var raw = JSON.parse(localStorage.getItem(DONE_KEY) || '[]');
      return new Set(Array.isArray(raw) ? raw : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveDone() {
    try { localStorage.setItem(DONE_KEY, JSON.stringify(Array.from(done))); } catch (e) { /* kept for this visit only */ }
  }

  // ---------- loading ----------

  // study.json is read directly on a web server. A page opened from disk cannot
  // read JSON files, so study.js (a generated copy) is the fallback.
  function loadStudy() {
    return fetch('study.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(function () {
        return new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.src = 'study.js';
          s.onload = function () {
            if (window.TOSCA_STUDY) resolve(window.TOSCA_STUDY);
            else reject(new Error('study.js did not define the study content'));
          };
          s.onerror = function () { reject(new Error('study.json and study.js could not be loaded')); };
          document.head.appendChild(s);
        });
      });
  }

  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  // ---------- helpers ----------

  function lessonsOf(unitId) {
    return study.lessons.filter(function (lesson) { return lesson.unit === unitId; });
  }

  function unitOf(lesson) {
    return study.units.find(function (unit) { return unit.id === lesson.unit; }) || { id: lesson.unit, title: '' };
  }

  function lessonNumber(lesson) {
    return lesson.unit + '.' + (lessonsOf(lesson.unit).indexOf(lesson) + 1);
  }

  function lessonHref(lesson) {
    return '#/learn/' + encodeURIComponent(lesson.id);
  }

  function nextUndone() {
    return study.lessons.find(function (lesson) { return !done.has(lesson.id); }) || null;
  }

  function searchWords(input) {
    return input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  }

  function hasAll(text, words) {
    var lower = String(text).toLowerCase();
    return words.every(function (word) { return lower.indexOf(word) !== -1; });
  }

  function link(className, text, href) {
    var a = h('a', className, text);
    a.href = href;
    return a;
  }

  function tick(isDone) {
    var mark = h('span', 'tick');
    if (isDone) mark.appendChild(icon('check', 14));
    return mark;
  }

  function docsLine(docs, lead) {
    var checked = list(docs).filter(function (doc) { return doc && safeUrl(doc.url); });
    if (!checked.length) return null;
    var p = h('p', 'syntax-docs', lead);
    checked.forEach(function (doc, index) {
      if (index) p.appendChild(document.createTextNode(', '));
      var a = h('a', '', doc.title);
      a.href = safeUrl(doc.url);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      p.appendChild(a);
    });
    return p;
  }

  // One line of syntax with a label and a copy button.
  function snippet(label, code, note) {
    var block = h('div', 'syntax-item');
    if (label) block.appendChild(h('p', 'syntax-label', label));
    var row = h('div', 'syntax-row');
    row.appendChild(h('pre', 'syntax-code', code));
    var button = h('button', 'copy-btn');
    button.type = 'button';
    button.setAttribute('aria-label', 'Copy: ' + code);
    button.appendChild(icon('copy', 14));
    var text = h('span', '', 'Copy');
    button.appendChild(text);
    button.addEventListener('click', function () { T.copyText(code, button, text); });
    row.appendChild(button);
    block.appendChild(row);
    if (note) block.appendChild(h('p', 'syntax-note', note));
    return block;
  }

  function tableOf(columns, rows) {
    var scroll = h('div', 'table-scroll');
    var table = h('table', 'grid-table');
    var head = h('thead');
    var headRow = h('tr');
    list(columns).forEach(function (name) { headRow.appendChild(h('th', '', name)); });
    head.appendChild(headRow);
    table.appendChild(head);
    var body = h('tbody');
    list(rows).forEach(function (cells) {
      var tr = h('tr');
      list(cells).forEach(function (cell) {
        var td = h('td');
        td.appendChild(richText(String(cell)));
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
    table.appendChild(body);
    scroll.appendChild(table);
    return scroll;
  }

  // ---------- diagrams ----------

  // Each lesson describes its diagrams as data. They are drawn with HTML and CSS,
  // so they follow the theme and reflow on small screens.
  var DIAGRAMS = {
    flow: function (g) {
      var ol = h('ol', 'flow');
      list(g.steps).forEach(function (step) {
        var li = h('li', 'flow-step');
        li.appendChild(h('strong', '', step.label));
        var text = h('span');
        text.appendChild(richText(step.text || ''));
        li.appendChild(text);
        ol.appendChild(li);
      });
      return ol;
    },
    tree: function (g) {
      var box = h('div', 'tree');
      var root = h('div', 'tree-root');
      root.appendChild(h('strong', '', g.root.label));
      if (g.root.text) root.appendChild(h('span', '', g.root.text));
      box.appendChild(root);
      var ul = h('ul', 'tree-children');
      list(g.root.children).forEach(function (child) {
        var li = h('li');
        li.appendChild(h('strong', '', child.label));
        if (child.text) li.appendChild(h('span', '', child.text));
        ul.appendChild(li);
      });
      box.appendChild(ul);
      return box;
    },
    compare: function (g) {
      var box = h('div', 'compare');
      list(g.columns).forEach(function (column) {
        var col = h('div', 'compare-col');
        col.appendChild(h('h4', '', column.title));
        var ul = h('ul');
        list(column.points).forEach(function (point) {
          var li = h('li');
          li.appendChild(richText(point));
          ul.appendChild(li);
        });
        col.appendChild(ul);
        box.appendChild(col);
      });
      return box;
    },
    stack: function (g) {
      var ol = h('ol', 'stack');
      list(g.layers).forEach(function (layer) {
        var li = h('li');
        li.appendChild(h('strong', '', layer.label));
        if (layer.text) li.appendChild(h('span', '', layer.text));
        ol.appendChild(li);
      });
      return ol;
    },
    grid: function (g) {
      return tableOf(g.columns, g.rows);
    }
  };

  function figure(graphic) {
    var draw = graphic && DIAGRAMS[graphic.type];
    if (!draw) return null;
    var fig = h('figure', 'figure');
    if (graphic.title) fig.appendChild(h('figcaption', '', graphic.title));
    fig.appendChild(draw(graphic));
    return fig;
  }

  // ---------- navigation ----------

  function renderMenu() {
    el.syllabusMenu.textContent = '';
    study.units.forEach(function (unit) {
      var box = h('div', 'mega-unit');
      box.appendChild(h('h3', '', 'Unit ' + unit.id + ' · ' + unit.title));
      var ul = h('ul');
      lessonsOf(unit.id).forEach(function (lesson) {
        var li = h('li');
        var a = link('mega-link', '', lessonHref(lesson));
        a.appendChild(tick(done.has(lesson.id)));
        a.appendChild(h('span', '', lesson.title));
        if (current.view === 'lesson' && current.id === lesson.id) a.setAttribute('aria-current', 'page');
        li.appendChild(a);
        ul.appendChild(li);
      });
      box.appendChild(ul);
      el.syllabusMenu.appendChild(box);
    });
  }

  function closeMenus() {
    el.nav.classList.remove('is-open');
    el.menuToggle.setAttribute('aria-expanded', 'false');
    el.menuToggle.setAttribute('aria-label', 'Open menu');
    // keep the syllabus menu shut until the pointer has left it
    el.syllabusItem.classList.add('is-closed');
    if (document.activeElement && el.syllabusItem.contains(document.activeElement)) document.activeElement.blur();
  }

  function markActiveLink(view) {
    var section = view === 'lesson' ? 'syllabus' : view;
    Array.prototype.forEach.call(el.navLinks.querySelectorAll('.nav-link'), function (a) {
      if (a.getAttribute('data-route') === section) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  // ---------- Home ----------

  function renderHome() {
    var total = study.lessons.length;
    var next = nextUndone();

    if (!done.size && study.lessons[0]) {
      el.homeContinue.textContent = 'Start with lesson 1';
      el.homeContinue.href = lessonHref(study.lessons[0]);
    } else if (next) {
      el.homeContinue.textContent = 'Continue: ' + next.title;
      el.homeContinue.href = lessonHref(next);
    } else {
      el.homeContinue.textContent = 'Review the syllabus';
      el.homeContinue.href = '#/syllabus';
    }

    el.homeProgress.hidden = !done.size || !total;
    if (done.size && total) {
      var share = Math.min(1, done.size / total);
      el.homeProgressText.textContent = done.size + ' of ' + total + ' lessons done';
      el.homeProgressPercent.textContent = Math.round(share * 100) + '%';
      if (T.motionOn()) animate(el.homeProgressBar, { scaleX: [0, share] }, { duration: 0.7, ease: T.EASE_OUT });
      else el.homeProgressBar.style.transform = 'scaleX(' + share + ')';
    }

    el.homePath.textContent = '';
    var path = figure({
      type: 'flow',
      steps: [
        { label: '1. Learn', text: 'Read a lesson from the Syllabus. Each one starts in simple words.' },
        { label: '2. See it', text: 'Study the diagram and the worked example.' },
        { label: '3. Remember', text: 'Look things up in the Cheat sheet and the Glossary.' },
        { label: '4. Practise', text: 'Answer the interview questions on the same topic.' }
      ]
    });
    el.homePath.appendChild(path);

    el.homeUnits.textContent = '';
    study.units.forEach(function (unit) {
      var lessons = lessonsOf(unit.id);
      if (!lessons.length) return;
      var finished = lessons.filter(function (lesson) { return done.has(lesson.id); }).length;
      var target = lessons.find(function (lesson) { return !done.has(lesson.id); }) || lessons[0];
      var card = link('unit-card', '', lessonHref(target));
      card.appendChild(h('span', 'unit-num', 'Unit ' + unit.id));
      card.appendChild(h('h3', '', unit.title));
      card.appendChild(h('p', '', unit.text || ''));
      card.appendChild(h('span', 'unit-meta',
        lessons.length + (lessons.length === 1 ? ' lesson' : ' lessons') + (finished ? ' · ' + finished + ' done' : '')));
      el.homeUnits.appendChild(card);
    });

    if (questionTotal) el.homeQuestionCount.textContent = questionTotal + ' scenario';
  }

  // ---------- Syllabus ----------

  function renderSyllabus() {
    var words = searchWords(el.syllabusSearch);
    var shown = 0;
    el.syllabusList.textContent = '';
    el.syllabusLead.textContent = study.lessons.length + ' lessons in ' + study.units.length +
      ' units. Work through them in order, or jump to the topic you need.';

    study.units.forEach(function (unit) {
      var lessons = lessonsOf(unit.id).filter(function (lesson) {
        var defined = list(lesson.definitions).map(function (item) { return item.term + ' ' + item.text; }).join(' ');
        return !words.length || hasAll(lesson.title + ' ' + defined + ' ' + lesson.simple + ' ' + list(lesson.body).join(' ') + ' ' + unit.title, words);
      });
      if (!lessons.length) return;
      shown += lessons.length;

      var block = h('section', 'unit-block');
      block.appendChild(h('h2', '', 'Unit ' + unit.id + ': ' + unit.title));
      if (unit.text) block.appendChild(h('p', '', unit.text));
      var ul = h('ul', 'lesson-list');
      lessons.forEach(function (lesson) {
        var li = h('li');
        var row = link('lesson-row', '', lessonHref(lesson));
        row.appendChild(h('span', 'lesson-no', lessonNumber(lesson)));
        var text = h('span');
        text.appendChild(h('strong', '', lesson.title));
        text.appendChild(h('span', 'lesson-simple', lesson.simple));
        row.appendChild(text);
        var mark = h('span', 'done-mark' + (done.has(lesson.id) ? ' is-done' : ''));
        mark.setAttribute('aria-label', done.has(lesson.id) ? 'Done' : 'Not done yet');
        mark.appendChild(icon('check', 14));
        row.appendChild(mark);
        li.appendChild(row);
        ul.appendChild(li);
      });
      block.appendChild(ul);
      el.syllabusList.appendChild(block);
    });
    el.syllabusEmpty.hidden = shown > 0;
  }

  // ---------- one lesson ----------

  function renderOutline(active) {
    el.lessonOutline.textContent = '';
    study.units.forEach(function (unit) {
      el.lessonOutline.appendChild(h('h2', '', 'Unit ' + unit.id + ' · ' + unit.title));
      var ul = h('ul');
      lessonsOf(unit.id).forEach(function (lesson) {
        var li = h('li');
        var a = link('', '', lessonHref(lesson));
        a.appendChild(tick(done.has(lesson.id)));
        a.appendChild(h('span', '', lesson.title));
        if (lesson === active) a.setAttribute('aria-current', 'page');
        li.appendChild(a);
        ul.appendChild(li);
      });
      el.lessonOutline.appendChild(ul);
    });
    var here = el.lessonOutline.querySelector('[aria-current="page"]');
    if (here && here.scrollIntoView) here.scrollIntoView({ block: 'nearest' });
  }

  function paintDone(button, lesson) {
    var isDone = done.has(lesson.id);
    button.textContent = '';
    if (isDone) button.appendChild(icon('check', 16));
    button.appendChild(document.createTextNode(isDone ? 'Done' : 'Mark as done'));
    button.classList.toggle('is-done', isDone);
    button.setAttribute('aria-pressed', String(isDone));
  }

  function renderLesson(lesson) {
    var article = el.lessonArticle;
    var unit = unitOf(lesson);
    var index = study.lessons.indexOf(lesson);
    var previous = study.lessons[index - 1];
    var following = study.lessons[index + 1];
    article.textContent = '';

    var crumbs = h('p', 'crumbs');
    crumbs.appendChild(link('', 'Syllabus', '#/syllabus'));
    crumbs.appendChild(document.createTextNode(' / Unit ' + unit.id + ': ' + unit.title + ' / Lesson ' + lessonNumber(lesson)));
    article.appendChild(crumbs);

    var title = h('h1', '', lesson.title);
    title.tabIndex = -1;
    article.appendChild(title);

    if (list(lesson.definitions).length) {
      var defs = h('section', 'definitions');
      defs.appendChild(h('h2', 'details-title', lesson.definitions.length === 1 ? 'Definition' : 'Definitions'));
      var terms = h('dl');
      lesson.definitions.forEach(function (item) {
        var row = h('div', 'definition');
        row.appendChild(h('dt', '', item.term));
        var meaning = h('dd');
        meaning.appendChild(richText(item.text));
        row.appendChild(meaning);
        terms.appendChild(row);
      });
      defs.appendChild(terms);
      article.appendChild(defs);
    }

    var simple = h('div', 'simple-box');
    simple.appendChild(h('h2', 'details-title', 'In simple words'));
    var simpleText = h('p');
    simpleText.appendChild(richText(lesson.simple || ''));
    simple.appendChild(simpleText);
    article.appendChild(simple);

    list(lesson.body).forEach(function (paragraph) {
      var p = h('p');
      p.appendChild(richText(paragraph));
      article.appendChild(p);
    });

    list(lesson.graphics).forEach(function (graphic) {
      var fig = figure(graphic);
      if (fig) article.appendChild(fig);
    });

    var example = lesson.example;
    if (example) {
      article.appendChild(h('h2', '', 'Example: ' + example.title));
      var box = h('div', 'example-box');
      if (example.intro) {
        var intro = h('p');
        intro.appendChild(richText(example.intro));
        box.appendChild(intro);
      }
      if (example.grid) box.appendChild(tableOf(example.grid.columns, example.grid.rows));
      if (list(example.code).length) {
        var code = h('div', 'syntax');
        example.code.forEach(function (item) { code.appendChild(snippet(item.label, item.code)); });
        box.appendChild(code);
      }
      if (example.outcome) {
        var outcome = h('p', 'outcome');
        outcome.appendChild(richText(example.outcome));
        box.appendChild(outcome);
      }
      article.appendChild(box);
    }

    if (list(lesson.points).length) {
      article.appendChild(h('h2', '', 'Key points'));
      var points = h('ul', 'points');
      lesson.points.forEach(function (point) {
        var li = h('li');
        li.appendChild(icon('check', 16));
        var text = h('span');
        text.appendChild(richText(point));
        li.appendChild(text);
        points.appendChild(li);
      });
      article.appendChild(points);
    }

    if (lesson.mistake) {
      var warn = h('div', 'mistake');
      warn.appendChild(icon('warning', 18));
      var body = h('div');
      body.appendChild(h('strong', '', 'Common mistake'));
      var mistake = h('span');
      mistake.appendChild(richText(lesson.mistake));
      body.appendChild(mistake);
      warn.appendChild(body);
      article.appendChild(warn);
    }

    var refs = docsLine(lesson.docs, 'More in the Tricentis manual: ');
    if (refs) {
      refs.style.marginTop = '18px';
      article.appendChild(refs);
    }

    var count = lesson.questions ? T.interview.count(lesson.questions) : 0;
    if (count) {
      var cta = link('btn btn-primary lesson-cta',
        'Practise ' + count + (count === 1 ? ' interview question' : ' interview questions') + ' on ' + lesson.questions,
        '#/interview?topic=' + encodeURIComponent(lesson.questions));
      article.appendChild(cta);
    }

    var foot = h('div', 'lesson-foot');
    var doneButton = h('button', 'btn');
    doneButton.type = 'button';
    paintDone(doneButton, lesson);
    doneButton.addEventListener('click', function () {
      if (done.has(lesson.id)) done.delete(lesson.id); else done.add(lesson.id);
      saveDone();
      paintDone(doneButton, lesson);
      renderOutline(lesson);
      renderMenu();
    });
    foot.appendChild(doneButton);

    var nav = h('div', 'lesson-nav');
    if (previous) {
      var back = link('btn', '', lessonHref(previous));
      back.appendChild(icon('arrowLeft', 16));
      back.appendChild(document.createTextNode('Previous'));
      back.title = previous.title;
      nav.appendChild(back);
    }
    if (following) {
      var forward = link('btn btn-primary', '', lessonHref(following));
      forward.appendChild(document.createTextNode('Next: ' + following.title));
      forward.appendChild(icon('arrowRight', 16));
      nav.appendChild(forward);
    } else {
      nav.appendChild(link('btn btn-primary', 'Go to interview preparation', '#/interview'));
    }
    foot.appendChild(nav);
    article.appendChild(foot);

    renderOutline(lesson);
  }

  // ---------- Cheat sheet ----------

  function renderCheatsheet() {
    var words = searchWords(el.cheatSearch);
    var shown = 0;
    el.cheatList.textContent = '';
    study.cheatsheet.forEach(function (group) {
      var items = list(group.items).filter(function (item) {
        return !words.length || hasAll(group.title + ' ' + item[0] + ' ' + item[1], words);
      });
      if (!items.length) return;
      shown += items.length;
      var card = h('section', 'cheat-group');
      card.appendChild(h('h2', '', group.title));
      var box = h('div', 'syntax');
      items.forEach(function (item) { box.appendChild(snippet(item[1], item[0])); });
      card.appendChild(box);
      var refs = docsLine(group.docs, 'Checked against the Tricentis manual: ');
      if (refs) card.appendChild(refs);
      el.cheatList.appendChild(card);
    });
    el.cheatEmpty.hidden = shown > 0;
  }

  // ---------- Glossary ----------

  function renderGlossary() {
    var words = searchWords(el.glossarySearch);
    var groups = {};
    study.glossary.forEach(function (entry) {
      if (words.length && !hasAll(entry.term + ' ' + entry.simple + ' ' + entry.detail, words)) return;
      var letter = entry.term.charAt(0).toUpperCase();
      if (!/[A-Z]/.test(letter)) letter = '#';
      (groups[letter] = groups[letter] || []).push(entry);
    });

    el.glossaryList.textContent = '';
    var letters = Object.keys(groups).sort();
    letters.forEach(function (letter) {
      var block = h('section', 'letter-block');
      block.appendChild(h('h2', '', letter));
      var dl = h('dl', 'terms');
      groups[letter].forEach(function (entry) {
        var card = h('div', 'term');
        card.appendChild(h('dt', '', entry.term));
        if (entry.simple) {
          var simple = h('dd');
          simple.appendChild(richText(entry.simple));
          card.appendChild(simple);
        }
        if (entry.detail) {
          var detail = h('dd', 'term-detail');
          detail.appendChild(richText(entry.detail));
          card.appendChild(detail);
        }
        if (entry.topic) {
          var topic = h('dd');
          topic.appendChild(h('span', 'tag', entry.topic));
          card.appendChild(topic);
        }
        dl.appendChild(card);
      });
      block.appendChild(dl);
      el.glossaryList.appendChild(block);
    });
    el.glossaryEmpty.hidden = letters.length > 0;
  }

  // ---------- switching pages ----------

  // Pages are addressed through the part of the address after #, so they work
  // without a server: #/ (home), #/syllabus, #/learn/<lesson>, #/interview,
  // #/cheatsheet, #/glossary.
  function readRoute() {
    var hash = location.hash;
    if (hash && hash.indexOf('#/') !== 0) return null; // an in-page link such as "skip to content"
    var path = hash.replace(/^#\/?/, '');
    var query = '';
    var at = path.indexOf('?');
    if (at !== -1) {
      query = path.slice(at + 1);
      path = path.slice(0, at);
    }
    var parts = path.split('/').filter(Boolean);
    var name = parts[0] || 'home';
    if (name === 'learn') {
      var id = '';
      try { id = decodeURIComponent(parts[1] || ''); } catch (e) { id = parts[1] || ''; }
      return { view: 'lesson', id: id };
    }
    if (VIEWS.indexOf(name) === -1 || name === 'lesson') name = 'home';
    var topic;
    query.split('&').forEach(function (pair) {
      var bits = pair.split('=');
      if (bits[0] === 'topic' && bits[1]) {
        try { topic = decodeURIComponent(bits[1]); } catch (e) { topic = bits[1]; }
      }
    });
    return { view: name, id: '', topic: topic };
  }

  function show(route) {
    var lesson = null;
    if (route.view === 'lesson') {
      lesson = study.lessons.find(function (item) { return item.id === route.id; }) || null;
      if (!lesson) route = { view: 'syllabus', id: '' };
    }
    current = { view: route.view, id: lesson ? lesson.id : '' };

    VIEWS.forEach(function (name) { views[name].hidden = name !== route.view; });
    markActiveLink(route.view);
    closeMenus();
    renderMenu();

    if (route.view === 'home') renderHome();
    else if (route.view === 'syllabus') renderSyllabus();
    else if (route.view === 'lesson') renderLesson(lesson);
    else if (route.view === 'interview') T.interview.show(route.topic);
    else if (route.view === 'cheatsheet') renderCheatsheet();
    else if (route.view === 'glossary') renderGlossary();

    document.title = lesson ? lesson.title + ' - ' + SITE
      : (TITLES[route.view] ? TITLES[route.view] + ' - ' + SITE : SITE);

    var view = views[route.view];
    if (!firstRoute) {
      window.scrollTo(0, 0);
      var heading = view.querySelector('h1');
      if (heading && heading.focus) heading.focus({ preventScroll: true });
    }
    firstRoute = false;
    animate(view, { opacity: [0, 1] }, { duration: 0.15, ease: T.EASE_OUT });
  }

  function onRoute() {
    var route = readRoute();
    if (route) show(route);
  }

  // ---------- events ----------

  window.addEventListener('hashchange', onRoute);

  el.menuToggle.addEventListener('click', function () {
    var open = !el.nav.classList.contains('is-open');
    el.nav.classList.toggle('is-open', open);
    el.menuToggle.setAttribute('aria-expanded', String(open));
    el.menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // The syllabus menu opens on hover and on keyboard focus (CSS). These keep the
  // state readable for screen readers and let it close again after a click.
  el.syllabusItem.addEventListener('mouseenter', function () {
    el.syllabusItem.classList.remove('is-closed');
    el.syllabusLink.setAttribute('aria-expanded', 'true');
  });
  el.syllabusItem.addEventListener('mouseleave', function () {
    el.syllabusItem.classList.remove('is-closed');
    el.syllabusLink.setAttribute('aria-expanded', 'false');
  });
  el.syllabusItem.addEventListener('focusin', function () {
    el.syllabusItem.classList.remove('is-closed');
    el.syllabusLink.setAttribute('aria-expanded', 'true');
  });
  el.syllabusItem.addEventListener('focusout', function (ev) {
    if (!el.syllabusItem.contains(ev.relatedTarget)) el.syllabusLink.setAttribute('aria-expanded', 'false');
  });

  // A click on the page the visitor is already on does not change the address,
  // so close the menus by hand.
  el.nav.addEventListener('click', function (ev) {
    var a = ev.target.closest ? ev.target.closest('a') : null;
    if (a && a.getAttribute('href') === location.hash) closeMenus();
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closeMenus();
  });

  el.syllabusSearch.addEventListener('input', renderSyllabus);
  el.cheatSearch.addEventListener('input', renderCheatsheet);
  el.glossarySearch.addEventListener('input', renderGlossary);

  // ---------- start ----------

  T.interview.ready.then(function (questions) {
    questionTotal = questions.length;
    if (current.view === 'home') renderHome();
    if (current.view === 'lesson') {
      var lesson = study.lessons.find(function (item) { return item.id === current.id; });
      if (lesson) renderLesson(lesson);
    }
  });

  loadStudy()
    .then(function (data) {
      study.units = list(data.units);
      study.lessons = list(data.lessons);
      study.cheatsheet = list(data.cheatsheet);
      study.glossary = list(data.glossary);
    })
    .catch(function () {
      // Without the study content the interview questions still work.
      if (!location.hash || location.hash === '#/') location.replace('#/interview');
    })
    .then(function () {
      show(readRoute() || { view: 'home', id: '' });
    });
})();
