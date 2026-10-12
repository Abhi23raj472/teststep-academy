/* TestStep Academy - the Interview preparation page: loads questions.json and renders the questions.
   The other pages (Home, Syllabus, Cheat sheet, Glossary) are in site.js, which uses the helpers
   shared at the end of this file.
   No build step. Animation comes from Motion (vendor/motion.js, the plain-JavaScript
   build of Framer Motion); every animation is optional, so the page also works
   without that file and for people who ask their system for reduced motion. */
(function () {
  'use strict';

  var TOPICS = [
    'Module scanning (XScan)',
    'TestCase design',
    'Test data (TDM/TDS)',
    'API testing',
    'Execution lists and DEX',
    'Recovery and cleanup scenarios',
    'TBox',
    'Steering dynamic controls',
    'Buffers and parameterisation',
    'CI/CD integration',
    'SAP testing',
    'Multi-user workspaces',
    'Reporting'
  ];

  var BOOKMARK_KEY = 'tsh.bookmarks';
  var THEME_KEY = 'tsh.theme';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var EASE_OUT = [0.22, 1, 0.36, 1];

  var state = {
    questions: [],
    query: '',
    topic: '',
    difficulty: '',
    bookmarkedOnly: false,
    bookmarks: loadBookmarks(),
    openIds: new Set()
  };

  var cardEntries = new Map(); // question id -> the DOM parts of its card
  var topicButtons = [];

  var el = {};
  [
    'scrollProgress', 'hero', 'themeToggle',
    'statQuestions', 'statTopics', 'statBookmarks',
    'topicList', 'difficultyList', 'bookmarkFilter',
    'search', 'resultCount', 'clearFilters', 'expandAll',
    'cards', 'empty', 'emptyTitle', 'emptyHint', 'emptyClear', 'toTop'
  ].forEach(function (id) { el[id] = document.getElementById(id); });

  // ---------- motion helpers ----------

  var Motion = window.Motion || null;
  var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function motionOn() {
    return !!Motion && !(reduceQuery && reduceQuery.matches);
  }

  // Runs an animation when motion is available. Keyframes are written as [from, to]
  // with "to" being the element's normal state, so skipping the animation is harmless.
  function animate(target, keyframes, options) {
    if (!motionOn()) return null;
    try {
      return Motion.animate(target, keyframes, options || {});
    } catch (e) {
      return null;
    }
  }

  function whenDone(animation, callback) {
    if (animation && typeof animation.then === 'function') animation.then(callback, callback);
    else callback();
  }

  function stopAnimation(animation) {
    if (animation && typeof animation.stop === 'function') {
      try { animation.stop(); } catch (e) { /* already finished */ }
    }
  }

  // ---------- storage (works without it, e.g. in private windows) ----------

  function loadBookmarks() {
    try {
      var raw = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
      return new Set(Array.isArray(raw) ? raw : []);
    } catch (e) {
      return new Set();
    }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(Array.from(state.bookmarks)));
    } catch (e) { /* bookmarks then last for this visit only */ }
  }

  // ---------- loading ----------

  // questions.json is the source of truth. Browsers block fetch() on file:// pages,
  // so when index.html is opened by double-click we fall back to questions.js,
  // a mirror of the same data that fetch_questions.py keeps in sync.
  function loadQuestions() {
    return fetch('questions.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(loadMirror);
  }

  function loadMirror() {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'questions.js';
      s.onload = function () {
        if (Array.isArray(window.TOSCA_QUESTIONS)) resolve(window.TOSCA_QUESTIONS);
        else reject(new Error('questions.js did not define the question list'));
      };
      s.onerror = function () { reject(new Error('questions.json and questions.js could not be loaded')); };
      document.head.appendChild(s);
    });
  }

  function clean(list) {
    return (Array.isArray(list) ? list : [])
      .filter(function (q) { return q && q.question; })
      .map(function (q, i) {
        var approach = Array.isArray(q.approach) ? q.approach : (q.approach ? [q.approach] : []);
        // optional: exact expressions, commands or queries, each with a short label
        var syntax = (Array.isArray(q.syntax) ? q.syntax : [])
          .filter(function (item) { return item && item.code; })
          .map(function (item) {
            return {
              label: item.label ? String(item.label) : '',
              code: String(item.code),
              note: item.note ? String(item.note) : ''
            };
          });
        // optional: the manual pages the syntax was checked against
        var docs = (Array.isArray(q.docs) ? q.docs : [])
          .filter(function (doc) { return doc && doc.title && doc.url; })
          .map(function (doc) { return { title: String(doc.title), url: String(doc.url) }; });
        return {
          id: q.id != null ? q.id : 'q' + i,
          question: String(q.question).replace(/\s+/g, ' ').trim(),
          approach: approach.map(String),
          syntax: syntax,
          docs: docs,
          answer: q.answer ? String(q.answer) : '',
          topic: q.topic ? String(q.topic) : 'Other',
          difficulty: q.difficulty ? String(q.difficulty) : '',
          source: q.source && typeof q.source === 'object' ? q.source : null
        };
      });
  }

  // ---------- small DOM helpers ----------

  function h(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Icons are drawn from path data (Lucide outlines, 24 x 24).
  var ICONS = {
    bookmark: ['m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z'],
    chevron: ['m6 9 6 6 6-6'],
    warning: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z', 'M12 9v4', 'M12 17h.01'],
    copy: ['M8 8h12v12H8z', 'M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3'],
    check: ['M20 6 9 17l-5-5'],
    arrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
    arrowLeft: ['M19 12H5', 'm12 19-7-7 7-7'],
    link: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6']
  };

  function icon(name, size) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    ICONS[name].forEach(function (d) {
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  // Only http(s) links are rendered as links; anything else is shown as plain text.
  function safeUrl(url) {
    try {
      var u = new URL(String(url));
      return (u.protocol === 'http:' || u.protocol === 'https:') ? u.href : null;
    } catch (e) {
      return null;
    }
  }

  // Finds the end of a Tosca expression such as {B[Name]} or {MATH[{B[Count]}+1]}
  // that starts at `start`, by matching braces. Returns -1 if it never closes.
  function expressionEnd(text, start) {
    var depth = 0;
    for (var i = start; i < text.length && i - start < 160; i++) {
      if (text[i] === '{') depth += 1;
      else if (text[i] === '}') {
        depth -= 1;
        if (depth === 0) return i + 1;
      }
    }
    return -1;
  }

  // Text with Tosca expressions set in a code style. Built from text nodes only.
  function richText(text) {
    var frag = document.createDocumentFragment();
    var opener = /#?\{[A-Za-z]+[\[}]/g;
    var last = 0;
    var match;
    while ((match = opener.exec(text))) {
      var braceAt = match.index + (match[0][0] === '#' ? 1 : 0);
      var end = expressionEnd(text, braceAt);
      if (end === -1) continue;
      if (match.index > last) frag.appendChild(document.createTextNode(text.slice(last, match.index)));
      frag.appendChild(h('code', '', text.slice(match.index, end)));
      last = end;
      opener.lastIndex = end;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  // Question text with the search words marked.
  function highlighted(text) {
    var frag = document.createDocumentFragment();
    var words = state.query.split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!words.length) {
      frag.appendChild(document.createTextNode(text));
      return frag;
    }
    var pattern = new RegExp('(' + words.map(function (w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|') + ')', 'ig');
    text.split(pattern).forEach(function (part, i) {
      if (!part) return;
      if (i % 2) frag.appendChild(h('mark', '', part));
      else frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  function pad(id) {
    return typeof id === 'number' ? (id < 10 ? '0' + id : String(id)) : String(id);
  }

  function metaTags(q) {
    var frag = document.createDocumentFragment();
    frag.appendChild(h('span', 'tag', q.topic));
    if (q.difficulty) {
      var level = q.difficulty.toLowerCase().replace(/[^a-z]/g, '');
      var tag = h('span', 'tag diff-' + level);
      tag.appendChild(h('span', 'dot dot-' + level));
      tag.appendChild(document.createTextNode(q.difficulty));
      frag.appendChild(tag);
    }
    return frag;
  }

  function copyText(text, button, label) {
    function done() {
      label.textContent = 'Copied';
      button.replaceChild(icon('check', 14), button.firstChild);
      setTimeout(function () {
        label.textContent = 'Copy';
        button.replaceChild(icon('copy', 14), button.firstChild);
      }, 1600);
    }
    function fallback() {
      var area = h('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try { if (document.execCommand('copy')) done(); } catch (e) { /* copying is not available */ }
      document.body.removeChild(area);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  // The expanded part of a question: steps, the mistake to avoid, the short answer, the source.
  function detailsContent(q) {
    var frag = document.createDocumentFragment();
    var steps = [];
    var mistake = '';
    q.approach.forEach(function (step) {
      var found = /^\s*(?:common )?mistake\s*:\s*/i.exec(step);
      if (found) mistake = step.slice(found[0].length);
      else steps.push(step);
    });

    if (steps.length) {
      frag.appendChild(h('h3', 'details-title', 'Approach'));
      var ol = h('ol', 'approach');
      steps.forEach(function (step) {
        var li = h('li');
        li.appendChild(richText(step));
        ol.appendChild(li);
      });
      frag.appendChild(ol);
    }

    if (q.syntax.length) {
      frag.appendChild(h('h3', 'details-title', 'Syntax'));
      var list = h('div', 'syntax');
      q.syntax.forEach(function (item) {
        var block = h('div', 'syntax-item');
        if (item.label) block.appendChild(h('p', 'syntax-label', item.label));
        var row = h('div', 'syntax-row');
        row.appendChild(h('pre', 'syntax-code', item.code));
        var copyCode = h('button', 'copy-btn');
        copyCode.type = 'button';
        copyCode.setAttribute('aria-label', 'Copy: ' + (item.label || item.code));
        copyCode.appendChild(icon('copy', 14));
        var copyLabel = h('span', '', 'Copy');
        copyCode.appendChild(copyLabel);
        copyCode.addEventListener('click', function () { copyText(item.code, copyCode, copyLabel); });
        row.appendChild(copyCode);
        block.appendChild(row);
        if (item.note) block.appendChild(h('p', 'syntax-note', item.note));
        list.appendChild(block);
      });
      frag.appendChild(list);

      var checked = q.docs.filter(function (doc) { return safeUrl(doc.url); });
      if (checked.length) {
        var refs = h('p', 'syntax-docs', 'Checked against the Tricentis manual: ');
        checked.forEach(function (doc, index) {
          if (index) refs.appendChild(document.createTextNode(', '));
          var link = h('a', '', doc.title);
          link.href = safeUrl(doc.url);
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          refs.appendChild(link);
        });
        frag.appendChild(refs);
      }
    }

    if (mistake) {
      var box = h('div', 'mistake');
      box.appendChild(icon('warning', 18));
      var body = h('div');
      body.appendChild(h('strong', '', 'Common mistake'));
      var text = h('span');
      text.appendChild(richText(mistake.charAt(0).toUpperCase() + mistake.slice(1)));
      body.appendChild(text);
      box.appendChild(body);
      frag.appendChild(box);
    }

    if (q.answer) {
      var answer = h('div', 'answer');
      var head = h('div', 'answer-head');
      head.appendChild(h('h3', 'details-title', 'Say it in the interview'));
      var copy = h('button', 'copy-btn');
      copy.type = 'button';
      copy.setAttribute('aria-label', 'Copy the short answer');
      copy.appendChild(icon('copy', 14));
      var label = h('span', '', 'Copy');
      copy.appendChild(label);
      copy.addEventListener('click', function () { copyText(q.answer, copy, label); });
      head.appendChild(copy);
      answer.appendChild(head);
      var p = h('p');
      p.appendChild(richText(q.answer));
      answer.appendChild(p);
      frag.appendChild(answer);
    }

    if (q.source && (q.source.title || q.source.url)) {
      var source = h('p', 'source');
      source.appendChild(icon('link', 15));
      var line = h('span', '', 'Source: ');
      var href = safeUrl(q.source.url);
      var name = q.source.title || q.source.url;
      if (href) {
        var a = h('a', '', name);
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        line.appendChild(a);
      } else {
        line.appendChild(document.createTextNode(name));
      }
      source.appendChild(line);
      frag.appendChild(source);
    }
    return frag;
  }

  // ---------- filtering ----------

  function matches(q, ignoreTopic) {
    if (!ignoreTopic && state.topic && q.topic !== state.topic) return false;
    if (state.difficulty && q.difficulty !== state.difficulty) return false;
    if (state.bookmarkedOnly && !state.bookmarks.has(q.id)) return false;
    if (state.query) {
      var haystack = (q.question + ' ' + q.topic + ' ' + q.answer + ' ' + q.approach.join(' ') + ' ' +
        q.syntax.map(function (item) { return item.label + ' ' + item.code; }).join(' ')).toLowerCase();
      // every word must appear somewhere, in any order
      return state.query.split(/\s+/).every(function (word) { return haystack.indexOf(word) !== -1; });
    }
    return true;
  }

  function filtered() {
    return state.questions.filter(function (q) { return matches(q, false); });
  }

  function hasFilters() {
    return !!(state.query || state.topic || state.difficulty || state.bookmarkedOnly);
  }

  // ---------- expand and collapse ----------

  // Opens or closes a panel by animating its height. `entry` keeps the running
  // animation so a quick second click starts from where the first one stopped.
  function slide(entry, panel, open, animated, onOpened) {
    entry.token = (entry.token || 0) + 1;
    var token = entry.token;
    stopAnimation(entry.animation);
    entry.animation = null;

    function settle() {
      if (entry.token !== token) return;
      panel.style.height = '';
      panel.style.opacity = '';
      panel.style.overflow = '';
      if (!open) panel.hidden = true;
    }

    if (!animated || !motionOn()) {
      panel.hidden = !open;
      settle();
      if (open && onOpened) onOpened(false);
      return;
    }

    var from = panel.hidden ? 0 : panel.offsetHeight;
    panel.hidden = false;
    panel.style.overflow = 'hidden';
    if (open) {
      panel.style.height = 'auto';
      var to = panel.offsetHeight;
      entry.animation = animate(panel, { height: [from, to], opacity: [from ? 1 : 0, 1] },
        { duration: 0.34, ease: EASE_OUT });
      if (onOpened) onOpened(true);
    } else {
      entry.animation = animate(panel, { height: [from, 0], opacity: [1, 0] },
        { duration: 0.22, ease: 'easeIn' });
    }
    whenDone(entry.animation, settle);
  }

  function setCardOpen(q, open, animated) {
    var entry = cardEntries.get(q.id);
    if (open) state.openIds.add(q.id); else state.openIds.delete(q.id);
    if (!entry) return;
    if (open && !entry.details.firstChild) entry.details.appendChild(detailsContent(q));
    entry.li.classList.toggle('is-open', open);
    entry.toggle.setAttribute('aria-expanded', String(open));
    slide(entry, entry.body, open, animated);
  }

  // ---------- question list ----------

  function renderCard(q) {
    var open = state.openIds.has(q.id);
    var marked = state.bookmarks.has(q.id);
    var bodyId = 'card-body-' + q.id;

    var li = h('li', 'card' + (open ? ' is-open' : ''));
    var head = h('div', 'card-head');

    var toggle = h('button', 'card-toggle');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-controls', bodyId);
    toggle.appendChild(h('span', 'num', pad(q.id)));
    var wrap = h('span', 'q-wrap');
    var meta = h('span', 'meta');
    meta.appendChild(metaTags(q));
    wrap.appendChild(meta);
    var question = h('span', 'q');
    question.appendChild(highlighted(q.question));
    wrap.appendChild(question);
    toggle.appendChild(wrap);
    var chevron = icon('chevron', 20);
    chevron.setAttribute('class', 'chevron');
    toggle.appendChild(chevron);

    var mark = h('button', 'bookmark');
    mark.type = 'button';
    mark.appendChild(icon('bookmark', 20));

    var body = h('div', 'card-body');
    body.id = bodyId;
    body.hidden = !open;
    var details = h('div', 'details');
    if (open) details.appendChild(detailsContent(q));
    body.appendChild(details);

    var entry = { li: li, toggle: toggle, body: body, details: details, mark: mark };
    cardEntries.set(q.id, entry);
    paintBookmark(entry, marked);

    toggle.addEventListener('click', function () {
      setCardOpen(q, !state.openIds.has(q.id), true);
      updateExpandAll();
    });
    mark.addEventListener('click', function () { toggleBookmark(q.id); });

    head.appendChild(toggle);
    head.appendChild(mark);
    li.appendChild(head);
    li.appendChild(body);
    return li;
  }

  function paintBookmark(entry, marked) {
    entry.mark.setAttribute('aria-pressed', String(marked));
    entry.mark.setAttribute('aria-label', marked ? 'Remove bookmark' : 'Bookmark this question');
    entry.mark.title = marked ? 'Remove bookmark' : 'Bookmark';
  }

  function renderList(list, animated) {
    cardEntries.clear();
    el.cards.textContent = '';
    var frag = document.createDocumentFragment();
    var items = list.map(renderCard);
    items.forEach(function (item) { frag.appendChild(item); });
    el.cards.appendChild(frag);

    el.empty.hidden = list.length > 0;
    if (!list.length) {
      var noBookmarks = state.bookmarkedOnly && !state.bookmarks.size;
      el.emptyTitle.textContent = noBookmarks ? 'No bookmarks yet' : 'No questions match';
      el.emptyHint.textContent = noBookmarks
        ? 'Use the bookmark icon on a question to save it here.'
        : 'Try a different search term or clear the filters.';
    }
  }

  function updateExpandAll() {
    var list = filtered();
    var allOpen = list.length > 0 && list.every(function (q) { return state.openIds.has(q.id); });
    el.expandAll.hidden = !list.length;
    el.expandAll.textContent = allOpen ? 'Collapse all' : 'Expand all';
  }

  // ---------- filters ----------

  function buildTopics() {
    var present = new Set(state.questions.map(function (q) { return q.topic; }));
    // Known topics first, in their usual order, then anything new found in the data.
    var extra = Array.from(present).filter(function (t) { return TOPICS.indexOf(t) === -1; }).sort();
    var names = [''].concat(TOPICS.filter(function (t) { return present.has(t); }), extra);
    el.topicList.textContent = '';
    topicButtons = names.map(function (topic) {
      var button = h('button', 'topic');
      button.type = 'button';
      button.appendChild(h('span', 'topic-name', topic || 'All topics'));
      var count = h('span', 'topic-count', '0');
      button.appendChild(count);
      button.addEventListener('click', function () {
        state.topic = topic;
        render({ animated: true });
        if (button.scrollIntoView) button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      });
      el.topicList.appendChild(button);
      return { topic: topic, button: button, count: count };
    });
    return names.length - 1;
  }

  // Each topic shows how many questions it would give with the other filters as they are.
  function paintFilters() {
    var pool = state.questions.filter(function (q) { return matches(q, true); });
    var perTopic = {};
    pool.forEach(function (q) { perTopic[q.topic] = (perTopic[q.topic] || 0) + 1; });
    topicButtons.forEach(function (item) {
      var n = item.topic ? (perTopic[item.topic] || 0) : pool.length;
      item.count.textContent = String(n);
      item.button.setAttribute('aria-pressed', String(state.topic === item.topic));
      item.button.classList.toggle('is-empty', n === 0);
    });
    Array.prototype.forEach.call(el.difficultyList.children, function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-difficulty') === state.difficulty));
    });
    el.bookmarkFilter.setAttribute('aria-checked', String(state.bookmarkedOnly));
  }

  function clearFilters() {
    state.query = '';
    state.topic = '';
    state.difficulty = '';
    state.bookmarkedOnly = false;
    el.search.value = '';
    render({ animated: true });
  }

  // ---------- shared rendering ----------

  function render(options) {
    var animated = !!(options && options.animated);
    var list = filtered();
    var total = state.questions.length;

    paintFilters();
    el.statBookmarks.textContent = String(state.bookmarks.size);
    el.clearFilters.hidden = !hasFilters();

    el.resultCount.textContent = hasFilters()
      ? 'Showing ' + list.length + ' of ' + total + ' questions'
      : total + ' questions';
    renderList(list, animated);
    updateExpandAll();
  }

  function toggleBookmark(id) {
    var marked = !state.bookmarks.has(id);
    if (marked) state.bookmarks.add(id); else state.bookmarks.delete(id);
    saveBookmarks();

    if (state.bookmarkedOnly) {
      // the visible set itself changes
      render({ animated: false });
      return;
    }
    el.statBookmarks.textContent = String(state.bookmarks.size);
    var entry = cardEntries.get(id);
    if (entry) {
      paintBookmark(entry, marked);
    }
  }

  // ---------- theme ----------

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function labelThemeToggle() {
    el.themeToggle.setAttribute('aria-label', currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // ---------- events ----------

  el.search.addEventListener('input', function () {
    state.query = el.search.value.trim().toLowerCase();
    render({ animated: false }); // no entrance animation while typing
  });

  el.difficultyList.addEventListener('click', function (ev) {
    var chip = ev.target.closest ? ev.target.closest('.chip') : null;
    if (!chip) return;
    state.difficulty = chip.getAttribute('data-difficulty');
    render({ animated: true });
  });

  el.bookmarkFilter.addEventListener('click', function () {
    state.bookmarkedOnly = !state.bookmarkedOnly;
    render({ animated: true });
  });

  el.clearFilters.addEventListener('click', clearFilters);
  el.emptyClear.addEventListener('click', clearFilters);

  el.expandAll.addEventListener('click', function () {
    var list = filtered();
    var open = !list.every(function (q) { return state.openIds.has(q.id); });
    list.forEach(function (q) { setCardOpen(q, open, false); });
    updateExpandAll();
  });

  el.themeToggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* not saved */ }
    labelThemeToggle();
  });

  el.toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: motionOn() ? 'smooth' : 'auto' });
  });

  // "/" jumps to the search box and Escape clears it.
  document.addEventListener('keydown', function (ev) {
    var active = document.activeElement;
    var typing = /^(INPUT|SELECT|TEXTAREA)$/.test(active.tagName);
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;

    if (ev.key === '/' && !typing && el.search.offsetParent) { // only while the questions are on screen
      ev.preventDefault();
      el.search.focus();
      return;
    }
    if (ev.key === 'Escape' && active === el.search && el.search.value) {
      el.search.value = '';
      state.query = '';
      render({ animated: false });
    }
  });

  // Reading progress along the top, and the back-to-top button.
  function onScrollPosition() {
    el.toTop.classList.toggle('is-visible', window.scrollY > 700);
  }

  function paintProgress(progress) {
    el.scrollProgress.style.transform = 'scaleX(' + Math.max(0, Math.min(1, progress)) + ')';
  }

  window.addEventListener('scroll', onScrollPosition, { passive: true });
  if (Motion && typeof Motion.scroll === 'function') {
    Motion.scroll(function (progress) { if (typeof progress === 'number') paintProgress(progress); });
  } else {
    window.addEventListener('scroll', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      paintProgress(max > 0 ? window.scrollY / max : 0);
    }, { passive: true });
  }

  // Follow the system theme until the visitor picks one.
  if (window.matchMedia) {
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemTheme = function (ev) {
      var saved = null;
      try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* no storage */ }
      if (saved) return;
      document.documentElement.setAttribute('data-theme', ev.matches ? 'dark' : 'light');
      labelThemeToggle();
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemTheme);
  }

  // ---------- start ----------

  labelThemeToggle();

  var ready = loadQuestions()
    .then(function (data) {
      state.questions = clean(data);
      // Drop bookmarks for questions that no longer exist.
      var ids = new Set(state.questions.map(function (q) { return q.id; }));
      state.bookmarks.forEach(function (id) { if (!ids.has(id)) state.bookmarks.delete(id); });
      var topicCount = buildTopics();
      el.statQuestions.textContent = String(state.questions.length);
      el.statTopics.textContent = String(topicCount);
      render({ animated: true });
      return state.questions;
    })
    .catch(function (err) {
      el.cards.textContent = '';
      el.statQuestions.textContent = '0';
      el.statTopics.textContent = '0';
      el.resultCount.textContent = 'Could not load the questions.';
      el.empty.hidden = false;
      el.emptyClear.hidden = true;
      el.emptyTitle.textContent = 'Questions did not load';
      el.emptyHint.textContent = 'Check that questions.json sits next to index.html and is valid JSON. If you opened the page by double-click, run "python fetch_questions.py --sync" once to rebuild questions.js. (' + err.message + ')';
      return [];
    });

  // Shared with site.js.
  window.TSH = {
    Motion: Motion,
    EASE_OUT: EASE_OUT,
    h: h,
    icon: icon,
    richText: richText,
    safeUrl: safeUrl,
    animate: animate,
    motionOn: motionOn,
    copyText: copyText,
    interview: {
      ready: ready, // resolves with the questions once they are loaded
      count: function (topic) {
        return state.questions.filter(function (q) { return q.topic === topic; }).length;
      },
      // Called whenever the Interview page is opened. A topic narrows the list to it.
      show: function (topic) {
        if (topic) {
          state.topic = topic;
          state.query = '';
          state.difficulty = '';
          state.bookmarkedOnly = false;
          el.search.value = '';
        }
        if (state.questions.length) render({ animated: true });
      }
    }
  };
})();
