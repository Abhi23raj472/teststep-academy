/* TestStep Academy - the study pages: Home, Syllabus, lessons, Cheat sheet and Glossary,
   plus the navigation and the switching between pages.
   The interview questions themselves are handled by script.js, which also provides the
   shared helpers used here (window.TSH). Content comes from study.json. */
(function () {
  'use strict';

  var T = window.TSH;
  if (!T) return;
  var h = T.h, icon = T.icon, richText = T.richText, safeUrl = T.safeUrl, animate = T.animate, Motion = T.Motion;

  var DONE_KEY = 'tsh.done';
  var VIEWS = ['home', 'syllabus', 'lesson', 'interview', 'cheatsheet', 'glossary'];
  var TITLES = { syllabus: 'Syllabus', interview: 'Interview prep', cheatsheet: 'Cheat sheet', glossary: 'Glossary' };
  var SITE = 'TestStep Academy';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Colour pairs for the cheat sheet groups, used in turn (class names in style.css).
  var TINTS = ['tint-violet', 'tint-green', 'tint-orange', 'tint-blue', 'tint-pink', 'tint-yellow'];

  var study = { units: [], lessons: [], cheatsheet: [], glossary: [] };
  var questions = [];             // filled once script.js has loaded them
  var done = loadDone();          // ids of lessons the visitor marked as done
  var firstRoute = true;
  var current = { view: '', id: '' };

  var el = {};
  [
    'nav', 'navLinks', 'menuToggle', 'syllabusItem', 'syllabusLink', 'syllabusMenu', 'tabbar',
    'homeTitle', 'homeKicker', 'homeLead', 'homeContinue', 'homeContinueText', 'homeContinueNote',
    'homeRing', 'homeRingText', 'homeProgressText', 'homeProgressSub',
    'homeQuestionCount', 'homeDiffBar', 'homeDiffNote', 'homeUnits', 'homeQotd',
    'homeCheatText', 'homeGlossaryText',
    'syllabusLead', 'syllabusSearch', 'syllabusBanner', 'syllabusList', 'syllabusEmpty',
    'lessonOutline', 'lessonArticle',
    'cheatSearch', 'cheatChips', 'cheatList', 'cheatEmpty',
    'glossaryLead', 'glossarySearch', 'glossaryLetters', 'glossaryList', 'glossaryEmpty'
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

  function doneCount() {
    return study.lessons.filter(function (lesson) { return done.has(lesson.id); }).length;
  }

  function plural(n, one, many) {
    return n + ' ' + (n === 1 ? one : many);
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

  // Reading time from the lesson's own text, at about 200 words a minute.
  function minutesFor(lesson) {
    var text = [lesson.simple].concat(list(lesson.body), list(lesson.points), [lesson.mistake || '']);
    if (lesson.example) {
      text.push(lesson.example.intro || '', lesson.example.outcome || '');
      list(lesson.example.code).forEach(function (item) { text.push(item.label || ''); });
    }
    list(lesson.graphics).forEach(function (g) {
      list(g.steps).forEach(function (s) { text.push(s.text || ''); });
      list(g.columns).forEach(function (c) { text.push(list(c.points).join(' ')); });
    });
    var words = text.join(' ').split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.round(words / 200) + 2); // + time for the diagram and example
  }

  // Small status icons: done, up next, not started.
  function stateIcon(kind) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '22');
    svg.setAttribute('height', '22');
    svg.setAttribute('class', 'state-icon state-' + kind);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', kind === 'done' ? 'Done' : (kind === 'next' ? 'Up next' : 'Not started'));
    var circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', kind === 'todo' ? '10' : '11');
    svg.appendChild(circle);
    if (kind !== 'todo') {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', kind === 'done' ? 'm7.5 12.5 3 3 6-6.5' : 'M10 8l6 4-6 4z');
      svg.appendChild(path);
    }
    return svg;
  }

  function badge(className, text) {
    return h('span', 'badge ' + className, text);
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

  function copyButton(code, ariaLabel) {
    var button = h('button', 'copy-btn');
    button.type = 'button';
    button.setAttribute('aria-label', ariaLabel || ('Copy: ' + code));
    button.appendChild(icon('copy', 14));
    var text = h('span', '', 'Copy');
    button.appendChild(text);
    button.addEventListener('click', function () { T.copyText(code, button, text); });
    return button;
  }

  // One line of syntax with a label and a copy button.
  function snippet(label, code, note) {
    var block = h('div', 'syntax-item');
    if (label) block.appendChild(h('p', 'syntax-label', label));
    var row = h('div', 'syntax-row');
    row.appendChild(h('pre', 'syntax-code', code));
    row.appendChild(copyButton(code));
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

  function panel(className, title) {
    var section = h('section', 'panel' + (className ? ' ' + className : ''));
    if (title) section.appendChild(h('h2', 'panel-title', title));
    return section;
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
      ul.style.setProperty('--n', String(Math.max(1, list(g.root.children).length)));
      list(g.root.children).forEach(function (child) {
        var li = h('li');
        li.appendChild(h('strong', '', child.label));
        if (child.text) {
          var span = h('span');
          span.appendChild(richText(child.text));
          li.appendChild(span);
        }
        ul.appendChild(li);
      });
      box.appendChild(ul);
      return box;
    },
    compare: function (g) {
      var box = h('div', 'compare');
      list(g.columns).forEach(function (column) {
        var col = h('div', 'compare-col');
        col.appendChild(h('h3', '', column.title));
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
    var section = panel('figure', graphic.title || 'Diagram');
    var fig = h('figure', 'figure-body');
    fig.appendChild(draw(graphic));
    section.appendChild(fig);
    return section;
  }

  // The parts of a diagram appear one after another when it scrolls into view.
  function animateFigure(fig) {
    if (!T.motionOn() || !Motion || typeof Motion.inView !== 'function') return;
    var parts = fig.querySelectorAll('.flow-step, .tree-root, .tree-children li, .compare-col, .stack li, .grid-table tbody tr');
    if (!parts.length) return;
    Motion.inView(fig, function () {
      animate(parts, { opacity: [0, 1], y: [10, 0] },
        { duration: 0.35, ease: T.EASE_OUT, delay: Motion.stagger(0.06) });
    }, { margin: '0px 0px -10% 0px' });
  }

  function riseIn(nodes) {
    if (!T.motionOn() || !Motion) return;
    var items = Array.prototype.slice.call(nodes, 0, 12);
    if (items.length) {
      animate(items, { opacity: [0, 1], y: [14, 0] },
        { duration: 0.38, ease: T.EASE_OUT, delay: Motion.stagger(0.04) });
    }
  }

  // ---------- navigation ----------

  function renderMenu() {
    el.syllabusMenu.textContent = '';
    study.units.forEach(function (unit) {
      var box = h('div', 'mega-unit');
      box.appendChild(h('h3', '', 'Unit ' + unit.id + ': ' + unit.title));
      var ul = h('ul');
      lessonsOf(unit.id).forEach(function (lesson) {
        var li = h('li');
        var a = link('mega-link', '', lessonHref(lesson));
        var tick = h('span', 'tick');
        if (done.has(lesson.id)) tick.appendChild(icon('check', 14));
        a.appendChild(tick);
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
    var links = el.navLinks.querySelectorAll('.nav-link');
    var tabs = el.tabbar.querySelectorAll('.tab');
    [links, tabs].forEach(function (group) {
      Array.prototype.forEach.call(group, function (a) {
        if (a.getAttribute('data-route') === section) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    });
  }

  // ---------- Home ----------

  function renderHome() {
    var total = study.lessons.length;
    var finished = doneCount();
    var next = nextUndone();
    var share = total ? finished / total : 0;
    var percent = Math.round(share * 100);

    // Hero: a welcome for newcomers, progress for returning visitors.
    if (!finished) {
      el.homeKicker.textContent = 'Tricentis Tosca, in simple words';
      el.homeTitle.textContent = 'Learn Tosca step by step, in simple words.';
      el.homeLead.textContent = plural(total, 'lesson', 'lessons') + ', each with a diagram and a worked example. When you are ready, practise with real interview questions.';
    } else if (next) {
      el.homeKicker.textContent = 'Welcome back';
      el.homeTitle.textContent = percent >= 50
        ? 'More than halfway to Tosca-ready.'
        : 'You are ' + percent + '% of the way to Tosca-ready.';
      el.homeLead.textContent = 'Pick up where you left off, or open any lesson from your learning path below.';
    } else {
      el.homeKicker.textContent = 'Every lesson done';
      el.homeTitle.textContent = 'You finished the syllabus. Time to rehearse.';
      el.homeLead.textContent = 'Go through the interview questions, then revise with the cheat sheet.';
    }

    if (!finished && study.lessons[0]) {
      el.homeContinueText.textContent = 'Start with lesson 1';
      el.homeContinue.href = lessonHref(study.lessons[0]);
      el.homeContinueNote.textContent = study.lessons[0].title + ', about ' + minutesFor(study.lessons[0]) + ' min';
    } else if (next) {
      el.homeContinueText.textContent = 'Continue: ' + next.title;
      el.homeContinue.href = lessonHref(next);
      el.homeContinueNote.textContent = 'Lesson ' + lessonNumber(next) + ', about ' + minutesFor(next) + ' min';
    } else {
      el.homeContinueText.textContent = 'Practise interview questions';
      el.homeContinue.href = '#/interview';
      el.homeContinueNote.textContent = '';
    }

    // Progress ring
    el.homeRing.style.setProperty('--p', String(percent));
    el.homeRingText.textContent = percent + '%';
    el.homeProgressText.textContent = finished
      ? finished + ' of ' + plural(total, 'lesson', 'lessons')
      : plural(total, 'lesson', 'lessons');
    var unitsDone = study.units.filter(function (unit) {
      var lessons = lessonsOf(unit.id);
      return lessons.length && lessons.every(function (lesson) { return done.has(lesson.id); });
    }).length;
    el.homeProgressSub.textContent = finished
      ? (unitsDone ? plural(unitsDone, 'unit', 'units') + ' complete' : 'Keep going, one lesson at a time')
      : 'Mark lessons as done to see your progress here.';

    renderHomeQuestions();

    if (el.homeCheatText && study.cheatsheet.length) {
      el.homeCheatText.textContent = plural(study.cheatsheet.length, 'group', 'groups') + ', copy in one tap';
    }
    if (el.homeGlossaryText && study.glossary.length) {
      el.homeGlossaryText.textContent = study.glossary.length + ' terms in plain words';
    }

    // Learning path: one card per unit
    el.homeUnits.textContent = '';
    var nextUnit = next ? next.unit : null;
    study.units.forEach(function (unit) {
      var lessons = lessonsOf(unit.id);
      if (!lessons.length) return;
      var count = lessons.filter(function (lesson) { return done.has(lesson.id); }).length;
      var complete = count === lessons.length;
      var isNext = unit.id === nextUnit;
      var target = lessons.find(function (lesson) { return !done.has(lesson.id); }) || lessons[0];

      var card = link('unit-card' + (isNext ? ' is-next' : '') + (complete ? ' is-done' : ''), '', lessonHref(target));
      var top = h('span', 'unit-top');
      top.appendChild(badge(complete ? 'badge-done' : (isNext ? 'badge-next' : 'badge-plain'), complete ? '✓' : String(unit.id)));
      var pill = h('span', 'state-pill', complete ? 'Done' : (isNext ? 'Up next' : plural(lessons.length, 'lesson', 'lessons')));
      pill.classList.add(complete ? 'pill-done' : (isNext ? 'pill-next' : 'pill-plain'));
      top.appendChild(pill);
      card.appendChild(top);
      card.appendChild(h('h3', '', unit.title));
      card.appendChild(h('p', '', unit.text || ''));
      card.appendChild(progressLine(count, lessons.length));
      el.homeUnits.appendChild(card);
    });
    riseIn(el.homeUnits.children);
  }

  function progressLine(count, total) {
    var row = h('span', 'progress-line');
    var track = h('span', 'track');
    var bar = h('span', 'bar');
    bar.style.width = (total ? Math.round(count / total * 100) : 0) + '%';
    track.appendChild(bar);
    row.appendChild(track);
    row.appendChild(h('span', 'frac', count + '/' + total));
    return row;
  }

  // The interview card and the question of the day need the questions from script.js.
  function renderHomeQuestions() {
    if (!questions.length) return;
    el.homeQuestionCount.textContent = String(questions.length);

    var levels = { Beginner: 0, Intermediate: 0, Advanced: 0 };
    questions.forEach(function (q) { if (levels[q.difficulty] != null) levels[q.difficulty] += 1; });
    el.homeDiffBar.textContent = '';
    ['Beginner', 'Intermediate', 'Advanced'].forEach(function (level) {
      if (!levels[level]) return;
      var seg = h('span', 'seg seg-' + level.toLowerCase());
      seg.style.flexGrow = String(levels[level]);
      el.homeDiffBar.appendChild(seg);
    });
    el.homeDiffNote.textContent = levels.Beginner + ' beginner, ' + levels.Intermediate + ' intermediate, ' + levels.Advanced + ' advanced';

    // Question of the day: the same question all day, a new one tomorrow.
    var day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
    var q = questions[day % questions.length];
    var box = el.homeQotd;
    box.textContent = '';
    var tags = h('div', 'qotd-tags');
    tags.appendChild(h('span', 'tag tag-pop', 'Question of the day'));
    if (q.difficulty) tags.appendChild(h('span', 'tag diff-' + q.difficulty.toLowerCase(), q.difficulty));
    tags.appendChild(h('span', 'qotd-topic', q.topic));
    box.appendChild(tags);
    box.appendChild(h('p', 'qotd-q', q.question));
    var actions = h('div', 'qotd-actions');
    actions.appendChild(link('btn btn-ink', 'Think, then open the approach', '#/interview?q=' + encodeURIComponent(q.id)));
    var mark = h('button', 'btn');
    mark.type = 'button';
    function paintMark() {
      var on = T.interview.isBookmarked(q.id);
      mark.textContent = on ? 'Bookmarked' : 'Bookmark';
      mark.setAttribute('aria-pressed', String(on));
    }
    paintMark();
    mark.addEventListener('click', function () {
      T.interview.toggleBookmark(q.id);
      paintMark();
    });
    actions.appendChild(mark);
    box.appendChild(actions);
    box.hidden = false;
  }

  // ---------- Syllabus ----------

  function renderSyllabus() {
    var words = searchWords(el.syllabusSearch);
    var shown = 0;
    var total = study.lessons.length;
    var finished = doneCount();
    var next = nextUndone();
    el.syllabusList.textContent = '';
    el.syllabusLead.textContent = plural(total, 'lesson', 'lessons') + ' in ' + plural(study.units.length, 'unit', 'units') +
      '. Go in order, or jump to what you need.';

    // Progress banner
    var banner = el.syllabusBanner;
    banner.textContent = '';
    if (total && !words.length) {
      var percent = Math.round(finished / total * 100);
      var ring = h('span', 'ring ring-small ring-ink');
      ring.style.setProperty('--p', String(percent));
      ring.setAttribute('aria-hidden', 'true');
      ring.appendChild(h('span', '', percent + '%'));
      banner.appendChild(ring);
      var text = h('div', 'ink-banner-text');
      text.appendChild(h('p', 'ink-banner-title', finished ? finished + ' of ' + total + ' lessons done' : 'Start with lesson 1'));
      text.appendChild(h('p', 'ink-banner-sub', next ? 'Up next: ' + next.title + ', in Unit ' + next.unit : 'Every lesson is done.'));
      banner.appendChild(text);
      if (next) banner.appendChild(link('btn btn-light', finished ? 'Continue learning' : 'Start learning', lessonHref(next)));
      banner.hidden = false;
    } else {
      banner.hidden = true;
    }

    study.units.forEach(function (unit) {
      var all = lessonsOf(unit.id);
      var lessons = all.filter(function (lesson) {
        return !words.length || hasAll(lesson.title + ' ' + lesson.simple + ' ' + list(lesson.body).join(' ') + ' ' + unit.title, words);
      });
      if (!lessons.length) return;
      shown += lessons.length;
      var count = all.filter(function (lesson) { return done.has(lesson.id); }).length;
      var complete = count === all.length;
      var isNext = !!next && next.unit === unit.id;

      var block = h('section', 'unit-block' + (isNext ? ' is-next' : ''));
      var head = h('div', 'unit-head');
      head.appendChild(badge(complete ? 'badge-done badge-lg' : (isNext ? 'badge-next badge-lg' : 'badge-plain badge-lg'), complete ? '✓' : String(unit.id)));
      var titles = h('div', 'unit-titles');
      titles.appendChild(h('p', 'unit-kicker', 'Unit ' + unit.id));
      titles.appendChild(h('h2', '', unit.title));
      if (unit.text) titles.appendChild(h('p', 'unit-text', unit.text));
      head.appendChild(titles);
      block.appendChild(head);
      block.appendChild(progressLine(count, all.length));

      var ol = h('ol', 'lesson-list');
      lessons.forEach(function (lesson) {
        var isDone = done.has(lesson.id);
        var isUpNext = next === lesson;
        var li = h('li');
        var row = link('lesson-row' + (isUpNext ? ' is-next' : ''), '', lessonHref(lesson));
        row.appendChild(stateIcon(isDone ? 'done' : (isUpNext ? 'next' : 'todo')));
        var title = h('span', 'lesson-title');
        title.appendChild(h('span', 'lesson-no', lessonNumber(lesson) + ' '));
        title.appendChild(document.createTextNode(lesson.title));
        row.appendChild(title);
        if (isUpNext) row.appendChild(h('span', 'lesson-tag', 'Up next'));
        li.appendChild(row);
        ol.appendChild(li);
      });
      block.appendChild(ol);
      el.syllabusList.appendChild(block);
    });
    el.syllabusEmpty.hidden = shown > 0;
  }

  // ---------- one lesson ----------

  // The rail next to a lesson lists the lessons of the same unit.
  function renderOutline(active) {
    var unit = unitOf(active);
    var lessons = lessonsOf(unit.id);
    el.lessonOutline.textContent = '';
    el.lessonOutline.appendChild(link('rail-back', 'All units', '#/syllabus'));
    el.lessonOutline.appendChild(h('p', 'rail-kicker', 'Unit ' + unit.id));
    el.lessonOutline.appendChild(h('h2', 'rail-title', unit.title));
    var ol = h('ol', 'rail-list');
    lessons.forEach(function (lesson, index) {
      var li = h('li');
      var a = link('', '', lessonHref(lesson));
      var isDone = done.has(lesson.id);
      var mark = h('span', 'rail-num' + (lesson === active ? ' is-active' : '') + (isDone ? ' is-done' : ''));
      if (isDone && lesson !== active) mark.appendChild(icon('check', 14));
      else mark.textContent = String(index + 1);
      a.appendChild(mark);
      a.appendChild(h('span', '', lesson.title));
      if (lesson === active) a.setAttribute('aria-current', 'page');
      li.appendChild(a);
      ol.appendChild(li);
    });
    el.lessonOutline.appendChild(ol);

    var others = study.units.filter(function (u) { return u.id !== unit.id; });
    if (others.length) {
      var more = h('details', 'rail-more');
      more.appendChild(h('summary', '', 'Other units'));
      var ul = h('ul');
      others.forEach(function (u) {
        var first = lessonsOf(u.id)[0];
        if (!first) return;
        var li = h('li');
        li.appendChild(link('', 'Unit ' + u.id + ': ' + u.title, lessonHref(first)));
        ul.appendChild(li);
      });
      more.appendChild(ul);
      el.lessonOutline.appendChild(more);
    }
  }

  function paintDone(button, lesson) {
    var isDone = done.has(lesson.id);
    button.textContent = '';
    button.appendChild(icon('check', 18));
    button.appendChild(document.createTextNode(isDone ? 'Done' : 'Mark as done'));
    button.classList.toggle('is-done', isDone);
    button.setAttribute('aria-pressed', String(isDone));
  }

  function renderLesson(lesson) {
    var article = el.lessonArticle;
    var unit = unitOf(lesson);
    var unitLessons = lessonsOf(unit.id);
    var index = study.lessons.indexOf(lesson);
    var previous = study.lessons[index - 1];
    var following = study.lessons[index + 1];
    article.textContent = '';

    // Hero
    var hero = h('header', 'lesson-hero');
    hero.appendChild(h('span', 'hero-blob hero-blob-a'));
    var chips = h('div', 'hero-chips');
    chips.appendChild(h('span', 'hero-chip', 'Unit ' + unit.id + ', lesson ' + (unitLessons.indexOf(lesson) + 1) + ' of ' + unitLessons.length));
    chips.appendChild(h('span', 'hero-chip', 'About ' + minutesFor(lesson) + ' minutes'));
    if (done.has(lesson.id)) chips.appendChild(h('span', 'hero-chip hero-chip-done', 'Done'));
    hero.appendChild(chips);
    var title = h('h1', '', lesson.title);
    title.tabIndex = -1;
    hero.appendChild(title);
    var simple = h('div', 'simple-box');
    simple.appendChild(h('p', 'simple-label', 'In simple words'));
    var simpleText = h('p', 'simple-text');
    simpleText.appendChild(richText(lesson.simple || ''));
    simple.appendChild(simpleText);
    hero.appendChild(simple);
    article.appendChild(hero);

    // Explanation
    if (list(lesson.body).length) {
      var how = panel('prose', 'How it works');
      lesson.body.forEach(function (paragraph) {
        var p = h('p');
        p.appendChild(richText(paragraph));
        how.appendChild(p);
      });
      article.appendChild(how);
    }

    // Diagrams
    var figures = [];
    list(lesson.graphics).forEach(function (graphic) {
      var fig = figure(graphic);
      if (fig) {
        article.appendChild(fig);
        figures.push(fig);
      }
    });

    // Worked example
    var example = lesson.example;
    if (example) {
      var box = panel('example-box', 'Worked example: ' + example.title);
      if (example.intro) {
        var intro = h('p', 'example-intro');
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

    // Key points and the common mistake, side by side
    var pair = h('div', 'lesson-pair');
    if (list(lesson.points).length) {
      var remember = panel('points-panel', 'Remember');
      var points = h('ul', 'points');
      lesson.points.forEach(function (point) {
        var li = h('li');
        var tickMark = h('span', 'point-tick');
        tickMark.appendChild(icon('check', 14));
        li.appendChild(tickMark);
        var text = h('span');
        text.appendChild(richText(point));
        li.appendChild(text);
        points.appendChild(li);
      });
      remember.appendChild(points);
      pair.appendChild(remember);
    }
    if (lesson.mistake) {
      var warn = panel('mistake-panel', 'Common mistake');
      var mistake = h('p');
      mistake.appendChild(richText(lesson.mistake));
      warn.appendChild(mistake);
      pair.appendChild(warn);
    }
    if (pair.children.length) article.appendChild(pair);

    var refs = docsLine(lesson.docs, 'More in the Tricentis manual: ');
    if (refs) {
      refs.classList.add('lesson-docs');
      article.appendChild(refs);
    }

    // Practise this topic
    var count = lesson.questions ? T.interview.count(lesson.questions) : 0;
    if (count) {
      var cta = link('practise-card', '', '#/interview?topic=' + encodeURIComponent(lesson.questions));
      var words = h('span', 'practise-words');
      words.appendChild(h('span', 'practise-kicker', 'Practise this topic'));
      words.appendChild(h('span', 'practise-title', plural(count, 'interview question', 'interview questions') + ' on ' + lesson.questions));
      cta.appendChild(words);
      cta.appendChild(h('span', 'practise-btn', 'Start practising'));
      article.appendChild(cta);
    }

    // Previous, done, next
    var foot = h('nav', 'lesson-foot');
    foot.setAttribute('aria-label', 'Lesson navigation');
    if (previous) {
      var back = link('foot-link', '', lessonHref(previous));
      back.appendChild(icon('arrowLeft', 16));
      back.appendChild(h('span', '', previous.title));
      back.setAttribute('aria-label', 'Previous lesson: ' + previous.title);
      foot.appendChild(back);
    } else {
      foot.appendChild(h('span', 'foot-spacer'));
    }
    var doneButton = h('button', 'done-btn');
    doneButton.type = 'button';
    paintDone(doneButton, lesson);
    doneButton.addEventListener('click', function () {
      if (done.has(lesson.id)) done.delete(lesson.id); else done.add(lesson.id);
      saveDone();
      paintDone(doneButton, lesson);
      renderOutline(lesson);
      renderMenu();
      if (done.has(lesson.id)) animate(doneButton, { scale: [1, 1.08, 1] }, { duration: 0.35, ease: T.EASE_OUT });
    });
    foot.appendChild(doneButton);
    if (following) {
      var forward = link('foot-link foot-next', '', lessonHref(following));
      forward.appendChild(h('span', '', following.title));
      forward.appendChild(icon('arrowRight', 16));
      forward.setAttribute('aria-label', 'Next lesson: ' + following.title);
      foot.appendChild(forward);
    } else {
      foot.appendChild(link('foot-link foot-next', 'Interview prep', '#/interview'));
    }
    article.appendChild(foot);

    renderOutline(lesson);
    figures.forEach(animateFigure);
  }

  // ---------- Cheat sheet ----------

  function slug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function renderCheatChips(groups) {
    el.cheatChips.textContent = '';
    groups.forEach(function (group) {
      var chip = h('button', 'jump-chip', group.title);
      chip.type = 'button';
      chip.addEventListener('click', function () {
        var target = document.getElementById('cheat-' + slug(group.title));
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: T.motionOn() ? 'smooth' : 'auto' });
          var heading = target.querySelector('h2');
          if (heading) heading.focus({ preventScroll: true });
        }
      });
      el.cheatChips.appendChild(chip);
    });
    el.cheatChips.hidden = groups.length < 2;
  }

  function renderCheatsheet() {
    var words = searchWords(el.cheatSearch);
    var shown = 0;
    var visible = [];
    el.cheatList.textContent = '';
    study.cheatsheet.forEach(function (group, groupIndex) {
      var items = list(group.items).filter(function (item) {
        return !words.length || hasAll(group.title + ' ' + item[0] + ' ' + item[1], words);
      });
      if (!items.length) return;
      shown += items.length;
      visible.push(group);

      var card = h('section', 'cheat-group ' + TINTS[groupIndex % TINTS.length]);
      card.id = 'cheat-' + slug(group.title);
      var head = h('div', 'cheat-head');
      var heading = h('h2', '', group.title);
      heading.tabIndex = -1;
      head.appendChild(heading);
      var firstDoc = list(group.docs).find(function (doc) { return doc && safeUrl(doc.url); });
      if (firstDoc) {
        var manual = h('a', 'cheat-manual', 'Manual');
        manual.href = safeUrl(firstDoc.url);
        manual.target = '_blank';
        manual.rel = 'noopener noreferrer';
        manual.title = firstDoc.title;
        head.appendChild(manual);
      }
      card.appendChild(head);

      var ul = h('ul', 'cheat-rows');
      items.forEach(function (item) {
        var li = h('li', 'cheat-row');
        var text = h('div', 'cheat-text');
        text.appendChild(h('code', 'cheat-code', item[0]));
        var meaning = h('p');
        meaning.appendChild(richText(item[1]));
        text.appendChild(meaning);
        li.appendChild(text);
        li.appendChild(copyButton(item[0]));
        ul.appendChild(li);
      });
      card.appendChild(ul);
      var refs = docsLine(group.docs, 'Checked against: ');
      if (refs) card.appendChild(refs);
      el.cheatList.appendChild(card);
    });
    renderCheatChips(visible);
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

    if (study.glossary.length) {
      el.glossaryLead.textContent = study.glossary.length + ' Tosca terms. Each one in a simple sentence first, then in more detail.';
    }

    // A to Z bar: letters without terms are shown but cannot be used.
    el.glossaryLetters.textContent = '';
    '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
      var button = h('button', 'letter', letter);
      button.type = 'button';
      if (!groups[letter]) {
        button.disabled = true;
      } else {
        button.setAttribute('aria-label', 'Terms starting with ' + (letter === '#' ? 'a symbol' : letter));
        button.addEventListener('click', function () {
          var target = document.getElementById('letter-' + (letter === '#' ? 'sym' : letter));
          if (target) target.scrollIntoView({ block: 'start', behavior: T.motionOn() ? 'smooth' : 'auto' });
        });
      }
      el.glossaryLetters.appendChild(button);
    });

    el.glossaryList.textContent = '';
    var letters = Object.keys(groups).sort();
    letters.forEach(function (letter) {
      var block = h('section', 'letter-block');
      block.id = 'letter-' + (letter === '#' ? 'sym' : letter);
      var head = h('div', 'letter-head');
      head.appendChild(h('h2', 'letter-badge', letter));
      head.appendChild(h('span', 'letter-count', plural(groups[letter].length, 'term', 'terms')));
      block.appendChild(head);
      var dl = h('dl', 'terms');
      groups[letter].forEach(function (entry) {
        var card = h('div', 'term');
        card.appendChild(h('dt', '', entry.term));
        if (entry.simple) {
          var simple = h('dd', 'term-simple');
          simple.appendChild(richText(entry.simple));
          card.appendChild(simple);
        }
        if (entry.detail) {
          var detail = h('dd', 'term-detail');
          detail.appendChild(richText(entry.detail));
          card.appendChild(detail);
        }
        if (entry.topic) {
          var topic = h('dd', 'term-topic');
          var count = T.interview.count(entry.topic);
          if (count) topic.appendChild(link('tag tag-soft', entry.topic, '#/interview?topic=' + encodeURIComponent(entry.topic)));
          else topic.appendChild(h('span', 'tag tag-soft', entry.topic));
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
  // #/cheatsheet, #/glossary. #/interview?topic=… narrows the questions to a
  // topic and #/interview?q=… opens one question.
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
    var params = {};
    query.split('&').forEach(function (pair) {
      var bits = pair.split('=');
      if (!bits[0] || !bits[1]) return;
      try { params[bits[0]] = decodeURIComponent(bits[1]); } catch (e) { params[bits[0]] = bits[1]; }
    });
    return { view: name, id: '', topic: params.topic, question: params.q };
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
    else if (route.view === 'interview') T.interview.show(route.topic, route.question);
    else if (route.view === 'cheatsheet') renderCheatsheet();
    else if (route.view === 'glossary') renderGlossary();

    document.title = lesson ? lesson.title + ' - ' + SITE
      : (TITLES[route.view] ? TITLES[route.view] + ' - ' + SITE : SITE);

    var view = views[route.view];
    if (!firstRoute && !route.question) {
      window.scrollTo(0, 0);
      var heading = view.querySelector('h1');
      if (heading && heading.focus) heading.focus({ preventScroll: true });
    }
    firstRoute = false;
    animate(view, { opacity: [0, 1], y: [10, 0] }, { duration: 0.32, ease: T.EASE_OUT });
    if (route.view === 'syllabus') riseIn(el.syllabusList.querySelectorAll('.unit-block'));
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

  T.interview.ready.then(function (loaded) {
    questions = loaded || [];
    if (current.view === 'home') renderHome();
    if (current.view === 'glossary') renderGlossary();
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
