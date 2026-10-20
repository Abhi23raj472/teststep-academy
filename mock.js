/* TestStep Academy - Mock interview.
   An interviewer reads questions from the question bank aloud (the browser's speech
   synthesis), the candidate answers by speaking (the browser's speech recognition) or
   by typing, and Claude rates each answer through the Anthropic API with the visitor's
   own key. The key is sent only to api.anthropic.com; it is never part of this site.
   Everything is inserted as text, never as HTML. Shared helpers come from script.js
   (window.TSH) and the lessons from site.js (window.TSH.site). */
(function () {
  'use strict';

  var T = window.TSH;
  if (!T) return;
  var h = T.h, icon = T.icon;

  var API_URL = 'https://api.anthropic.com/v1/messages';
  var KEY_STORE = 'tsh.mock.key';
  var PREFS_STORE = 'tsh.mock.prefs';
  var HISTORY_STORE = 'tsh.mock.history';
  var MINUTES_PER_QUESTION = 3;
  var RING = 2 * Math.PI * 82; // circumference of the scorecard ring (r = 82)

  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var synth = window.speechSynthesis || null;
  // A key may only be remembered where no other site shares this page's storage.
  var canRemember = /\.github\.io$/.test(location.hostname) ||
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  var el = {};
  [
    'mockSetup', 'mockLive', 'mockFeedback', 'mockSummary',
    'mockTopics', 'mockLevel', 'mockCount', 'mockCountHint', 'mockMode', 'mockModeHint', 'mockFollowUps',
    'mockMeter', 'mockMicTest', 'mockMicStatus', 'mockLang',
    'mockVoice', 'mockVoiceSample', 'mockRate',
    'mockKey', 'mockKeyForget', 'mockRememberRow', 'mockRemember', 'mockModel', 'mockKeyError',
    'mockStart', 'mockSupport', 'mockHistoryBlock', 'mockHistory',
    'mockBarMeta', 'mockProgress', 'mockClock', 'mockEnd',
    'mockTopicChip', 'mockLevelChip', 'mockQCount', 'mockOrb', 'mockStatus', 'mockQuestion',
    'mockRepeat', 'mockHideText', 'mockLevelBars', 'mockAnswerClock', 'mockAnswer', 'mockAnswerHint',
    'mockLiveError', 'mockPause', 'mockSwitchMode', 'mockRestart', 'mockDone', 'mockSkip',
    'mockScore', 'mockFeedbackKicker', 'mockVerdict', 'mockFeedbackQuestion', 'mockHearFeedback',
    'mockCriteria', 'mockGood', 'mockImprove', 'mockBetter', 'mockHearBetter',
    'mockSyntaxBlock', 'mockSyntax', 'mockSaid', 'mockAgain', 'mockRevise', 'mockNext', 'mockNextLabel', 'mockNextSub',
    'mockRingBar', 'mockRingValue', 'mockResultDate', 'mockResultTitle', 'mockResultSummary', 'mockResultChips',
    'mockTiles', 'mockQList', 'mockStrengths', 'mockWork', 'mockReviseList', 'mockAnother'
  ].forEach(function (id) { el[id] = document.getElementById(id); });
  if (!el.mockSetup) return;

  var questions = [];
  var settings = loadPrefs();
  var apiKey = '';
  var session = null;   // the interview in progress, see startInterview()
  var screen = 'setup'; // setup | live | feedback | summary
  var visible = false;  // whether the Mock interview page is open
  var clockTimer = null;

  // ---------- storage ----------

  function readStore(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      if (value == null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* kept for this visit only */ }
  }

  function loadPrefs() {
    var p = readStore(PREFS_STORE, {}) || {};
    return {
      topic: typeof p.topic === 'string' ? p.topic : '',
      level: typeof p.level === 'string' ? p.level : 'Intermediate',
      count: [3, 5, 8].indexOf(p.count) !== -1 ? p.count : 5,
      mode: p.mode === 'text' || !Recognition ? 'text' : 'voice',
      followUps: p.followUps !== false,
      lang: ['en-IN', 'en-US', 'en-GB'].indexOf(p.lang) !== -1 ? p.lang : 'en-IN',
      voice: typeof p.voice === 'string' ? p.voice : '',
      rate: [0.85, 1, 1.15].indexOf(p.rate) !== -1 ? p.rate : 1,
      model: typeof p.model === 'string' ? p.model : 'claude-sonnet-5-5'
    };
  }

  function savePrefs() {
    writeStore(PREFS_STORE, settings);
  }

  // ---------- small helpers ----------

  function clean(value, max) {
    return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max || 600);
  }

  function cleanList(value, n, max) {
    return (Array.isArray(value) ? value : []).map(function (item) { return clean(item, max || 300); })
      .filter(Boolean).slice(0, n);
  }

  function joinText(a, b) {
    return (String(a || '') + ' ' + String(b || '')).replace(/\s+/g, ' ').trim();
  }

  function scoreTone(score) {
    return score >= 8 ? 'tone-mint' : score >= 5 ? 'tone-lemon' : 'tone-peach';
  }

  function clock(seconds) {
    var s = Math.max(0, Math.round(seconds));
    var m = Math.floor(s / 60);
    return m + ':' + String(s % 60).padStart(2, '0');
  }

  function longClock(seconds) {
    var s = Math.max(0, Math.round(seconds));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function shortDate(date) {
    try {
      return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
    } catch (e) {
      return date.toDateString();
    }
  }

  function shuffle(items) {
    var a = items.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function show(node, on) {
    node.hidden = !on;
  }

  function topicLabel(topic) {
    return topic || 'Mixed topics';
  }

  function levelLabel(level) {
    return level || 'Mixed levels';
  }

  // ---------- the interviewer's voice ----------

  var speaking = null;

  function currentVoice() {
    if (!synth) return null;
    var voices = synth.getVoices();
    return voices.find(function (v) { return v.name === settings.voice; }) || null;
  }

  // Speaks the text and calls done() once it has been read. Long text is split into
  // sentences (some browsers stop a long utterance part-way). A timer makes sure the
  // interview goes on even where the browser never reports the end.
  function speak(text, done) {
    stopSpeaking();
    var finished = false;
    var timer = setTimeout(finish, Math.min(90000, 3000 + text.length * 95 / settings.rate));
    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      speaking = null;
      if (done) done();
    }
    speaking = { cancel: function () { finished = true; clearTimeout(timer); } };

    if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') {
      setTimeout(finish, 400);
      return;
    }
    var parts = (text.match(/[^.!?]+[.!?]*/g) || [text])
      .map(function (part) { return part.trim(); }).filter(Boolean);
    if (!parts.length) {
      setTimeout(finish, 0);
      return;
    }
    var voice = currentVoice();
    // Some browsers drop an utterance queued in the same moment as cancel()
    setTimeout(function () {
      if (finished) return;
      queue(parts, voice, finish);
    }, 60);
  }

  function queue(parts, voice, finish) {
    parts.forEach(function (part, i) {
      var u = new window.SpeechSynthesisUtterance(part);
      if (voice) {
        u.voice = voice;
        u.lang = voice.lang;
      } else {
        u.lang = settings.lang;
      }
      u.rate = settings.rate;
      if (i === parts.length - 1) u.onend = finish;
      u.onerror = function (ev) {
        if (ev.error !== 'interrupted' && ev.error !== 'canceled') finish();
      };
      synth.speak(u);
    });
  }

  function stopSpeaking() {
    if (speaking) {
      speaking.cancel();
      speaking = null;
    }
    if (synth) synth.cancel();
  }

  function fillVoices() {
    var select = el.mockVoice;
    select.textContent = '';
    var voices = synth ? synth.getVoices().filter(function (v) { return /^en/i.test(v.lang); }) : [];
    if (!voices.length) {
      var none = h('option', '', synth ? 'Default voice' : 'Not available in this browser');
      none.value = '';
      select.appendChild(none);
      select.disabled = !synth;
      el.mockVoiceSample.disabled = !synth;
      return;
    }
    // Voices for the chosen English first, then the rest
    voices.sort(function (a, b) {
      var am = a.lang.replace('_', '-') === settings.lang ? 0 : 1;
      var bm = b.lang.replace('_', '-') === settings.lang ? 0 : 1;
      return am - bm || a.name.localeCompare(b.name);
    });
    voices.forEach(function (v) {
      var option = h('option', '', v.name + ' (' + v.lang + ')');
      option.value = v.name;
      select.appendChild(option);
    });
    if (!voices.some(function (v) { return v.name === settings.voice; })) settings.voice = voices[0].name;
    select.value = settings.voice;
    select.disabled = false;
    el.mockVoiceSample.disabled = false;
  }

  // ---------- listening to the answer ----------

  var rec = null;          // the running speech recognition, if any
  var listening = false;   // true while the candidate's answer is being taken down
  var committed = '';      // the answer so far, from earlier recognition sessions or typing
  var sessionFinal = '';   // the final words of the running recognition session
  var afterStop = null;    // called once a stopped recognition has delivered its last words

  function startListening() {
    if (!Recognition) {
      setMode('text');
      return;
    }
    hideLiveError();
    committed = el.mockAnswer.value.trim();
    listening = true;
    el.mockAnswer.readOnly = true;
    setStatus('listening');
    startRecognition();
    updateTools();
  }

  function startRecognition() {
    sessionFinal = '';
    var r;
    try {
      r = new Recognition();
    } catch (e) {
      listening = false;
      showLiveError('Speech recognition could not start in this browser. Type your answer instead.');
      setMode('text');
      return;
    }
    rec = r;
    r.lang = settings.lang;
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = function (ev) {
      var finals = '', interim = '';
      for (var i = 0; i < ev.results.length; i++) {
        var result = ev.results[i];
        if (result.isFinal) finals += result[0].transcript + ' ';
        else interim += result[0].transcript;
      }
      sessionFinal = finals;
      el.mockAnswer.value = joinText(committed, finals + interim);
      el.mockAnswer.scrollTop = el.mockAnswer.scrollHeight;
    };
    r.onspeechstart = function () { el.mockLevelBars.classList.add('is-hearing'); };
    r.onspeechend = function () { el.mockLevelBars.classList.remove('is-hearing'); };
    r.onerror = function (ev) {
      if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') {
        listening = false;
        showLiveError('The microphone is blocked for this page. Allow it from the icon in the address bar, or type your answer.');
        setMode('text');
      } else if (ev.error === 'audio-capture') {
        listening = false;
        showLiveError('No microphone was found. Connect one, or type your answer.');
        setMode('text');
      } else if (ev.error === 'network') {
        listening = false;
        showLiveError('Speech recognition needs an internet connection. Type your answer, or try again when you are back online.');
        setMode('text');
      }
      // "no-speech" and "aborted" just end this session; it restarts below while listening
    };
    r.onend = function () {
      if (rec === r) rec = null;
      committed = joinText(committed, sessionFinal);
      sessionFinal = '';
      el.mockAnswer.value = committed;
      el.mockLevelBars.classList.remove('is-hearing');
      if (listening) {
        // Browsers end recognition after a pause; carry on until the candidate is done
        setTimeout(function () { if (listening && !rec) startRecognition(); }, 150);
      } else if (afterStop) {
        var next = afterStop;
        afterStop = null;
        next();
      }
    };
    try {
      r.start();
    } catch (e) {
      rec = null;
    }
  }

  // Stops listening. `then` runs once the last words are in (at most 1.5 s later).
  function stopListening(then) {
    listening = false;
    el.mockAnswer.readOnly = false;
    el.mockLevelBars.classList.remove('is-hearing');
    if (rec) {
      var called = false;
      var go = function () {
        if (called) return;
        called = true;
        if (then) then();
      };
      afterStop = go;
      setTimeout(function () { afterStop = null; go(); }, 1500);
      try { rec.stop(); } catch (e) { afterStop = null; go(); }
    } else if (then) {
      then();
    }
  }

  // ---------- microphone check on the setup page ----------

  var mic = null;

  function buildMeter() {
    el.mockMeter.textContent = '';
    for (var i = 0; i < 16; i++) el.mockMeter.appendChild(h('span'));
    for (var j = 0; j < 7; j++) el.mockLevelBars.appendChild(h('span'));
  }

  function drawMeter(level) {
    var bars = el.mockMeter.children;
    var lit = Math.round(level * bars.length);
    for (var i = 0; i < bars.length; i++) {
      var on = i < lit;
      bars[i].classList.toggle('is-on', on);
      bars[i].style.height = on ? (30 + ((i * 37) % 70)) + '%' : '12%';
    }
  }

  function testMic() {
    if (mic) {
      closeMic();
      return;
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      micStatus('This browser cannot use a microphone here. You can still type your answers.', false);
      return;
    }
    micStatus('Say a few words…', false);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        var Ctx = window.AudioContext || window.webkitAudioContext;
        var ctx = new Ctx();
        var analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        ctx.createMediaStreamSource(stream).connect(analyser);
        var data = new Uint8Array(analyser.fftSize);
        mic = { stream: stream, ctx: ctx, raf: 0, heard: false };
        el.mockMicTest.textContent = 'Stop test';
        var loop = function () {
          analyser.getByteTimeDomainData(data);
          var sum = 0;
          for (var i = 0; i < data.length; i++) {
            var v = (data[i] - 128) / 128;
            sum += v * v;
          }
          var level = Math.min(1, Math.sqrt(sum / data.length) * 4);
          drawMeter(level);
          if (level > 0.25 && !mic.heard) {
            mic.heard = true;
            micStatus('We can hear you', true);
          }
          mic.raf = requestAnimationFrame(loop);
        };
        loop();
      })
      .catch(function (err) {
        var name = err && err.name;
        if (name === 'NotAllowedError' || name === 'SecurityError') {
          micStatus('Microphone access is blocked. Allow it from the icon in the address bar and test again.', false);
        } else if (name === 'NotFoundError') {
          micStatus('No microphone was found. Connect one, or answer by typing.', false);
        } else {
          micStatus('The microphone could not be opened. You can still type your answers.', false);
        }
      });
  }

  function closeMic() {
    if (!mic) return;
    cancelAnimationFrame(mic.raf);
    mic.stream.getTracks().forEach(function (track) { track.stop(); });
    try { mic.ctx.close(); } catch (e) { /* already closed */ }
    mic = null;
    drawMeter(0);
    el.mockMicTest.textContent = 'Test microphone';
  }

  function micStatus(text, ok) {
    el.mockMicStatus.textContent = text;
    el.mockMicStatus.classList.toggle('is-ok', ok);
    el.mockMicStatus.classList.toggle('tone-mint', ok);
  }

  // ---------- the Anthropic API ----------

  function apiError(status, body) {
    var detail = body && body.error && body.error.message ? String(body.error.message) : '';
    var msg;
    if (status === 401) msg = 'Anthropic did not accept the API key. Check the key and try again.';
    else if (status === 403) msg = 'This API key may not use the chosen model. Pick another rating model.';
    else if (status === 404) msg = 'The rating model was not found for this key. Pick another rating model.';
    else if (/credit|balance|billing/i.test(detail)) msg = 'Your Anthropic account has no credit left. Add credit in the Anthropic Console, then try again.';
    else if (status === 429) msg = 'Too many requests for this key right now. Wait a minute and try again.';
    else if (status >= 500) msg = 'Anthropic is busy right now. Try again in a moment.';
    else msg = 'The request to Anthropic failed.';
    var err = new Error(detail ? msg + ' (' + clean(detail, 200) + ')' : msg);
    err.status = status;
    return err;
  }

  function callClaude(payload) {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        // the key belongs to the visitor and is used from their own browser
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(Object.assign({ model: settings.model }, payload))
    })
      .catch(function () {
        throw new Error('Could not reach Anthropic. Check your internet connection and try again.');
      })
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (body) {
          if (!res.ok) throw apiError(res.status, body);
          return body;
        });
      });
  }

  // Asks Claude to fill in one tool call, which keeps the answer in a fixed shape.
  function callTool(system, text, tool, maxTokens) {
    return callClaude({
      max_tokens: maxTokens || 1500,
      system: system,
      tools: [tool],
      tool_choice: { type: 'tool', name: tool.name },
      messages: [{ role: 'user', content: text }]
    }).then(function (body) {
      var block = (body && Array.isArray(body.content) ? body.content : [])
        .find(function (b) { return b.type === 'tool_use' && b.name === tool.name; });
      if (!block || !block.input) throw new Error('Claude did not return a rating. Try again.');
      return block.input;
    });
  }

  // A one-token request that confirms the key, the model and the credit before starting.
  function checkKey() {
    return callClaude({ max_tokens: 1, messages: [{ role: 'user', content: 'Reply with OK.' }] });
  }

  function criterion(description) {
    return {
      type: 'object',
      description: description,
      properties: {
        score: { type: 'integer', minimum: 0, maximum: 10 },
        note: { type: 'string', description: 'At most 12 words.' }
      },
      required: ['score', 'note']
    };
  }

  var RATE_TOOL = {
    name: 'rate_answer',
    description: 'Record the rating of the candidate answer and the coaching for it.',
    input_schema: {
      type: 'object',
      properties: {
        score: { type: 'integer', minimum: 0, maximum: 10, description: 'Overall score out of 10.' },
        headline: { type: 'string', description: 'One short verdict sentence to the candidate, at most 12 words.' },
        criteria: {
          type: 'object',
          properties: {
            facts: criterion('Are the Tosca statements correct?'),
            approach: criterion('Are the right steps chosen, in a sensible order?'),
            structure: criterion('Is the answer clear, concise and easy to follow when spoken?'),
            terms: criterion('Does it use the right Tosca terms and syntax?')
          },
          required: ['facts', 'approach', 'structure', 'terms']
        },
        did_well: { type: 'array', items: { type: 'string' }, description: '0 to 3 items.' },
        improve: { type: 'array', items: { type: 'string' }, description: '1 to 3 items.' },
        stronger_answer: { type: 'string', description: 'What a strong candidate would say, first person, 2 to 4 spoken sentences.' },
        syntax: {
          type: 'array',
          description: 'Up to 4 real Tosca expressions or values worth mentioning.',
          items: {
            type: 'object',
            properties: { code: { type: 'string' }, label: { type: 'string' } },
            required: ['code', 'label']
          }
        },
        follow_up: { type: 'string', description: 'A follow-up question, or an empty string.' },
        lesson_id: { type: 'string', description: 'The id of one lesson from the list, or an empty string.' }
      },
      required: ['score', 'headline', 'criteria', 'did_well', 'improve', 'stronger_answer', 'syntax', 'follow_up', 'lesson_id']
    }
  };

  var RATE_SYSTEM = [
    'You are an experienced interviewer for Tricentis Tosca test automation roles. You rate one answer from a mock interview and coach the candidate.',
    'The answer was spoken and turned into text by speech recognition. Ignore filler words, grammar and words that were obviously misheard, and judge the content.',
    'Use the reference material when it is given; it was checked against the Tricentis manual. Never invent Tosca features, menu names or syntax. If you are not sure something exists in Tosca, leave it out.',
    'Scoring: 9-10 complete, precise and well structured; 7-8 correct with small gaps; 5-6 partly correct or a key point missing; 3-4 mostly vague or partly wrong; 1-2 wrong or off-topic; 0 no real answer.',
    'Criteria, each 0-10 with a note of at most 12 words: facts, approach, structure, terms.',
    'did_well and improve: concrete points about this answer, in plain words, addressed to the candidate as "you", at most 25 words each. did_well may be empty for a very weak answer.',
    'stronger_answer: what a strong candidate would say, first person, 2-4 spoken sentences, at most 90 words.',
    'syntax: up to 4 real Tosca expressions or values worth mentioning for this question, preferring the reference syntax, each with a short label. Empty when none applies.',
    'follow_up: only when follow-ups are allowed and the answer gave something to build on (score 4 or more), one natural follow-up question an interviewer would ask next, at most 25 words. Otherwise an empty string.',
    'lesson_id: the id of the one lesson from the given list that best covers what was missing, or an empty string.',
    'Write in simple English.'
  ].join('\n');

  function lessonsFor(topic) {
    var site = T.site;
    if (!site) return [];
    return site.lessons().filter(function (lesson) { return lesson.questions === topic; });
  }

  function rateAnswer(item, answer) {
    var ref = item.q;
    var lines = [];
    lines.push('Question: ' + item.question);
    lines.push('Topic: ' + item.topic + ' | Level: ' + (item.difficulty || 'not set'));
    if (item.isFollowUp) lines.push('This is a follow-up question the interviewer asked after: "' + ref.question + '". The reference below belongs to that question.');
    if (ref.answer) lines.push('Reference answer: ' + ref.answer);
    if (ref.approach && ref.approach.length) {
      lines.push('Reference approach:');
      ref.approach.forEach(function (step) { lines.push('- ' + step); });
    }
    if (ref.syntax && ref.syntax.length) {
      lines.push('Reference syntax:');
      ref.syntax.forEach(function (s) { lines.push('- ' + s.code + ' : ' + (s.label || '')); });
    }
    lines.push('Follow-ups allowed: ' + (session.settings.followUps && !item.isFollowUp ? 'yes' : 'no'));
    var lessons = lessonsFor(item.topic);
    if (lessons.length) {
      lines.push('Lessons for this topic (id: title):');
      lessons.forEach(function (lesson) { lines.push('- ' + lesson.id + ': ' + lesson.title); });
    }
    lines.push('Candidate answer (speech to text):');
    lines.push('"""');
    lines.push(answer);
    lines.push('"""');
    return callTool(RATE_SYSTEM, lines.join('\n'), RATE_TOOL, 1600).then(function (raw) {
      return cleanRating(raw, lessons);
    });
  }

  function cleanRating(raw, lessons) {
    var r = raw && typeof raw === 'object' ? raw : {};
    var num = function (v) {
      var n = Math.round(Number(v));
      return isFinite(n) ? Math.max(0, Math.min(10, n)) : 0;
    };
    var c = r.criteria && typeof r.criteria === 'object' ? r.criteria : {};
    var crit = function (key, label) {
      var x = c[key] && typeof c[key] === 'object' ? c[key] : {};
      return { label: label, score: num(x.score), note: clean(x.note, 160) };
    };
    var lessonId = clean(r.lesson_id, 80);
    return {
      score: num(r.score),
      headline: clean(r.headline, 140) || 'Here is how your answer went.',
      criteria: [
        crit('facts', 'Correct Tosca facts'),
        crit('approach', 'Approach'),
        crit('structure', 'Clear structure'),
        crit('terms', 'Tosca terms')
      ],
      good: cleanList(r.did_well, 3),
      improve: cleanList(r.improve, 3),
      better: clean(r.stronger_answer, 900),
      syntax: (Array.isArray(r.syntax) ? r.syntax : []).map(function (s) {
        return { code: clean(s && s.code, 160), label: clean(s && s.label, 160) };
      }).filter(function (s) { return s.code; }).slice(0, 4),
      followUp: clean(r.follow_up, 300),
      lessonId: lessons.some(function (lesson) { return lesson.id === lessonId; }) ? lessonId : ''
    };
  }

  var SUMMARY_TOOL = {
    name: 'summarize_interview',
    description: 'Record the summary of the whole mock interview.',
    input_schema: {
      type: 'object',
      properties: {
        headline: { type: 'string', description: 'A verdict of at most 5 words, such as "Nearly interview-ready".' },
        summary: { type: 'string', description: 'One or two sentences to the candidate.' },
        strengths: { type: 'array', items: { type: 'string' }, description: 'Up to 3 strengths.' },
        work_on: { type: 'array', items: { type: 'string' }, description: 'Up to 3 things to work on.' }
      },
      required: ['headline', 'summary', 'strengths', 'work_on']
    }
  };

  var SUMMARY_SYSTEM = 'You review a finished mock interview for a Tricentis Tosca test automation role. ' +
    'From the ratings of each answer, write a short, honest verdict for the candidate. Strengths and things to work on are concrete Tosca skills, ' +
    'each at most 20 words, addressed as "you" or written as short phrases. Do not repeat the question texts. Write in simple English.';

  function summarize(rated) {
    var lines = rated.map(function (r, i) {
      return [
        'Question ' + (i + 1) + ' (' + r.item.topic + (r.item.isFollowUp ? ', follow-up' : '') + '): ' + r.item.question,
        'Score: ' + r.rating.score + '/10. Verdict: ' + r.rating.headline,
        'Did well: ' + (r.rating.good.join(' | ') || 'nothing'),
        'To improve: ' + (r.rating.improve.join(' | ') || 'nothing')
      ].join('\n');
    });
    return callTool(SUMMARY_SYSTEM, lines.join('\n\n'), SUMMARY_TOOL, 700).then(function (raw) {
      return {
        headline: clean(raw.headline, 60),
        summary: clean(raw.summary, 400),
        strengths: cleanList(raw.strengths, 3),
        work: cleanList(raw.work_on, 3)
      };
    });
  }

  // ---------- setup page ----------

  function topicsInBank() {
    var counts = {};
    var order = [];
    questions.forEach(function (q) {
      if (!counts[q.topic]) {
        counts[q.topic] = 0;
        order.push(q.topic);
      }
      counts[q.topic]++;
    });
    return order.map(function (topic) { return { topic: topic, count: counts[topic] }; });
  }

  function renderTopics() {
    el.mockTopics.textContent = '';
    var all = [{ topic: '', count: questions.length }].concat(topicsInBank());
    if (settings.topic && !all.some(function (t) { return t.topic === settings.topic; })) settings.topic = '';
    all.forEach(function (t) {
      var b = h('button', 'chip');
      b.type = 'button';
      b.setAttribute('aria-pressed', String(t.topic === settings.topic));
      b.appendChild(document.createTextNode(topicLabel(t.topic)));
      b.appendChild(h('span', 'mock-chip-count', String(t.count)));
      b.addEventListener('click', function () {
        settings.topic = t.topic;
        savePrefs();
        renderTopics();
        updateCountHint();
      });
      el.mockTopics.appendChild(b);
    });
  }

  // The questions matching the chosen topic and level; when there are too few, other
  // levels of the same topic fill the gap.
  function pool() {
    var inTopic = questions.filter(function (q) { return !settings.topic || q.topic === settings.topic; });
    var exact = inTopic.filter(function (q) { return !settings.level || q.difficulty === settings.level; });
    var picked = shuffle(exact);
    if (picked.length < settings.count) {
      picked = picked.concat(shuffle(inTopic.filter(function (q) { return exact.indexOf(q) === -1; })));
    }
    return { questions: picked.slice(0, settings.count), exact: exact.length, topic: inTopic.length };
  }

  function updateCountHint() {
    if (!questions.length) {
      el.mockCountHint.textContent = 'Loading questions…';
      return;
    }
    var p = pool();
    var n = p.questions.length;
    var text = 'About ' + (n * MINUTES_PER_QUESTION) + ' minutes';
    if (p.topic < settings.count) {
      text = 'This topic has ' + p.topic + ' question' + (p.topic === 1 ? '' : 's') +
        (settings.followUps ? ', plus follow-ups' : '') + '.';
    } else if (settings.level && p.exact < settings.count) {
      text = 'Only ' + p.exact + ' ' + settings.level + ' question' + (p.exact === 1 ? '' : 's') + ' here; other levels fill the rest.';
    }
    el.mockCountHint.textContent = text;
  }

  // Radio groups made of buttons: click or arrow keys pick one.
  function segmented(container, current, onPick) {
    var buttons = Array.prototype.slice.call(container.querySelectorAll('[role="radio"]'));
    function paint(value) {
      buttons.forEach(function (b) {
        var on = b.getAttribute('data-value') === String(value);
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
      });
    }
    function pick(b) {
      if (b.disabled) return;
      paint(b.getAttribute('data-value'));
      onPick(b.getAttribute('data-value'));
    }
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { pick(b); });
      b.addEventListener('keydown', function (ev) {
        var step = ev.key === 'ArrowRight' || ev.key === 'ArrowDown' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? -1 : 0;
        if (!step) return;
        ev.preventDefault();
        var j = i;
        do { j = (j + step + buttons.length) % buttons.length; } while (buttons[j].disabled && j !== i);
        buttons[j].focus();
        pick(buttons[j]);
      });
    });
    paint(current);
    return paint;
  }

  function renderHistory() {
    var items = readStore(HISTORY_STORE, []);
    items = Array.isArray(items) ? items : [];
    el.mockHistory.textContent = '';
    show(el.mockHistoryBlock, items.length > 0);
    items.slice(0, 6).forEach(function (item) {
      var li = h('li', 'mock-history-item');
      var pct = Math.max(0, Math.min(100, Math.round(Number(item.percent) || 0)));
      var badge = h('span', 'mock-history-score ' + scoreTone(pct / 10), pct + '%');
      li.appendChild(badge);
      var text = h('span', 'mock-history-text');
      text.appendChild(h('strong', '', clean(item.title, 120)));
      var when = item.date ? shortDate(new Date(item.date)) : '';
      text.appendChild(h('span', '', [clean(item.meta, 120), when].filter(Boolean).join(' · ')));
      li.appendChild(text);
      el.mockHistory.appendChild(li);
    });
  }

  function keyError(text) {
    el.mockKeyError.textContent = text || '';
    show(el.mockKeyError, !!text);
  }

  function setupKey() {
    var stored = canRemember ? readStore(KEY_STORE, '') : '';
    if (typeof stored === 'string' && stored) {
      apiKey = stored;
      el.mockKey.value = stored;
      el.mockRemember.checked = true;
    }
    show(el.mockRememberRow, canRemember);
    show(el.mockKeyForget, !!stored);
    el.mockKey.addEventListener('input', function () {
      apiKey = el.mockKey.value.trim();
      keyError('');
      if (el.mockRemember.checked) writeStore(KEY_STORE, apiKey || null);
    });
    el.mockRemember.addEventListener('change', function () {
      writeStore(KEY_STORE, el.mockRemember.checked && apiKey ? apiKey : null);
      show(el.mockKeyForget, el.mockRemember.checked && !!apiKey);
    });
    el.mockKeyForget.addEventListener('click', function () {
      writeStore(KEY_STORE, null);
      apiKey = '';
      el.mockKey.value = '';
      el.mockRemember.checked = false;
      show(el.mockKeyForget, false);
      el.mockKey.focus();
    });
  }

  // ---------- switching screens ----------

  function showScreen(name, focus) {
    screen = name;
    if (name === 'setup') paintMode(settings.mode);
    show(el.mockSetup, name === 'setup');
    show(el.mockLive, name === 'live');
    show(el.mockFeedback, name === 'feedback');
    show(el.mockSummary, name === 'summary');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (focus) {
      var target = { setup: null, live: el.mockQuestion, feedback: el.mockVerdict, summary: el.mockResultTitle }[name];
      if (target) target.focus({ preventScroll: true });
    }
    if (name !== 'setup') closeMic();
    runClock(name === 'live' || name === 'feedback');
  }

  function runClock(on) {
    clearInterval(clockTimer);
    clockTimer = null;
    if (on && visible && session) {
      tick();
      clockTimer = setInterval(tick, 1000);
    }
  }

  function tick() {
    if (!session) return;
    el.mockClock.textContent = longClock((Date.now() - session.started) / 1000);
    if (session.answerStarted) el.mockAnswerClock.textContent = clock((Date.now() - session.answerStarted) / 1000);
  }

  // ---------- the interview ----------

  function startInterview() {
    keyError('');
    if (!questions.length) {
      keyError('The questions have not loaded yet. Wait a moment and try again.');
      return;
    }
    apiKey = el.mockKey.value.trim();
    if (!apiKey) {
      keyError('Add your Anthropic API key to have your answers rated.');
      el.mockKey.focus();
      return;
    }
    var picked = pool().questions;
    if (!picked.length) {
      keyError('No questions match this topic and level.');
      return;
    }
    closeMic();
    el.mockStart.disabled = true;
    el.mockStart.textContent = 'Checking your key…';
    // Speech has to start from a click; an empty utterance unlocks it for later.
    if (synth && window.SpeechSynthesisUtterance) synth.speak(new window.SpeechSynthesisUtterance(''));

    checkKey()
      .then(function () {
        session = {
          started: Date.now(),
          answerStarted: 0,
          settings: Object.assign({}, settings),
          total: Math.min(settings.count, settings.followUps ? picked.length * 2 : picked.length),
          queue: picked.map(function (q) {
            return { q: q, question: q.question, topic: q.topic, difficulty: q.difficulty, isFollowUp: false };
          }),
          results: [],
          index: 0,
          review: -1
        };
        askCurrent();
      })
      .catch(function (err) {
        keyError(err.message);
      })
      .then(function () {
        el.mockStart.disabled = false;
        el.mockStart.textContent = 'Start interview';
      });
  }

  function currentItem() {
    return session.queue[session.index];
  }

  function renderProgress() {
    el.mockProgress.textContent = '';
    var count = Math.max(session.queue.length, 1);
    for (var i = 0; i < count; i++) {
      var result = session.results[i];
      var li = h('li');
      if (result) {
        li.className = 'is-done ' + (result.skipped ? 'is-skipped' : scoreTone(result.rating.score));
        li.textContent = result.skipped ? '–' : String(result.rating.score);
        li.setAttribute('aria-label', 'Question ' + (i + 1) + ': ' + (result.skipped ? 'skipped' : 'scored ' + result.rating.score + ' out of 10'));
      } else {
        li.textContent = String(i + 1);
        if (i === session.index && screen === 'live') {
          li.className = 'is-current';
          li.setAttribute('aria-current', 'step');
        }
      }
      el.mockProgress.appendChild(li);
    }
    el.mockProgress.setAttribute('aria-label', 'Progress: question ' + (session.index + 1) + ' of ' + count);
  }

  function renderLive() {
    var item = currentItem();
    var s = session.settings;
    el.mockBarMeta.textContent = topicLabel(s.topic) + ' · ' + levelLabel(s.level) + ' · ' + session.queue.length + ' questions';
    el.mockTopicChip.textContent = item.topic;
    el.mockTopicChip.className = 'mock-topic-chip tone-lilac';
    el.mockLevelChip.textContent = item.isFollowUp ? 'Follow-up' : (item.difficulty || 'Any level');
    el.mockQCount.textContent = 'Question ' + (session.index + 1) + ' of ' + session.queue.length;
    el.mockQuestion.textContent = item.question;
    el.mockAnswer.value = '';
    committed = '';
    el.mockAnswerClock.textContent = '0:00';
    session.answerStarted = 0;
    hideLiveError();
    el.mockDone.textContent = 'Done, rate my answer';
    setBusy(false);
    renderProgress();
  }

  function askCurrent() {
    renderLive();
    showScreen('live', true);
    readQuestion();
  }

  function readQuestion() {
    var item = currentItem();
    setStatus('speaking');
    var intro = item.isFollowUp ? 'A follow-up. ' : 'Question ' + (session.index + 1) + '. ';
    speak(intro + item.question, function () {
      if (screen === 'live' && visible) beginAnswer();
    });
  }

  function beginAnswer() {
    if (!session.answerStarted) session.answerStarted = Date.now();
    if (session.settings.mode === 'voice' && Recognition) {
      startListening();
    } else {
      setStatus('typing');
      el.mockAnswer.readOnly = false;
      el.mockAnswer.focus({ preventScroll: true });
    }
    updateTools();
  }

  var STATUS = {
    speaking: 'The interviewer is asking.',
    listening: 'Listening. Your turn to answer.',
    paused: 'Paused. You can fix words in your answer.',
    typing: 'Your turn. Type your answer.',
    thinking: 'Rating your answer…',
    error: 'The answer could not be rated.'
  };

  function setStatus(state) {
    el.mockStatus.textContent = STATUS[state] || '';
    el.mockStatus.setAttribute('data-state', state);
    el.mockOrb.className = 'mock-orb is-' + state;
    var tone = { speaking: 'tone-lilac', listening: 'tone-mint', paused: 'tone-lemon', typing: 'tone-sky', thinking: 'tone-lemon', error: 'tone-peach' }[state];
    el.mockOrb.classList.add(tone || 'tone-lilac');
  }

  function updateTools() {
    var voice = session && session.settings.mode === 'voice';
    show(el.mockPause, voice && !!Recognition);
    el.mockPause.textContent = listening ? 'Pause' : 'Resume';
    show(el.mockSwitchMode, !!Recognition);
    el.mockSwitchMode.textContent = voice ? 'Type instead' : 'Speak instead';
    el.mockAnswerHint.textContent = voice
      ? 'Written out as you speak. Pause to fix a word before you send.'
      : 'Type your answer as you would say it.';
    el.mockAnswer.placeholder = voice ? 'Your words appear here as you speak.' : 'Type your answer here.';
  }

  function setMode(mode) {
    if (!session) return;
    if (mode === 'voice' && !Recognition) mode = 'text';
    session.settings.mode = mode;
    settings.mode = mode;
    savePrefs();
    if (mode === 'text') {
      if (listening) stopListening();
      setStatus('typing');
      el.mockAnswer.readOnly = false;
      el.mockAnswer.focus({ preventScroll: true });
    } else {
      startListening();
    }
    updateTools();
  }

  function setBusy(busy) {
    [el.mockDone, el.mockSkip, el.mockPause, el.mockSwitchMode, el.mockRestart, el.mockRepeat].forEach(function (b) {
      b.disabled = busy;
    });
    el.mockAnswer.readOnly = busy || listening;
  }

  function showLiveError(text) {
    el.mockLiveError.textContent = text;
    show(el.mockLiveError, true);
  }

  function hideLiveError() {
    show(el.mockLiveError, false);
  }

  function submitAnswer() {
    hideLiveError();
    stopSpeaking();
    stopListening(function () {
      var answer = el.mockAnswer.value.trim();
      if (!answer) {
        showLiveError('Say or type your answer first, or skip this question.');
        setStatus(session.settings.mode === 'voice' ? 'paused' : 'typing');
        updateTools();
        return;
      }
      var index = session.index;
      var item = currentItem();
      var seconds = session.answerStarted ? (Date.now() - session.answerStarted) / 1000 : 0;
      setStatus('thinking');
      setBusy(true);
      rateAnswer(item, answer)
        .then(function (rating) {
          if (!session || session.index !== index) return;
          var result = { answer: answer, rating: rating, seconds: seconds, follow: null };
          result.follow = addFollowUp(index, rating.followUp);
          session.results[index] = result;
          showFeedback(index);
        })
        .catch(function (err) {
          if (!session || session.index !== index) return;
          setBusy(false);
          setStatus('error');
          showLiveError(err.message);
          el.mockDone.textContent = 'Try rating again';
          updateTools();
        });
    });
  }

  // A follow-up goes right after the question it digs into. To keep the length the
  // candidate chose, the last question not asked yet makes room for it.
  function addFollowUp(index, text) {
    var item = session.queue[index];
    if (!text || !session.settings.followUps || item.isFollowUp) return null;
    var follow = { q: item.q, question: text, topic: item.topic, difficulty: item.difficulty, isFollowUp: true };
    var record = { item: follow, dropped: null };
    if (session.queue.length >= session.total) {
      for (var i = session.queue.length - 1; i > index; i--) {
        if (!session.queue[i].isFollowUp) {
          record.dropped = session.queue.splice(i, 1)[0];
          break;
        }
      }
      if (!record.dropped) return null;
    }
    session.queue.splice(index + 1, 0, follow);
    return record;
  }

  function undoFollowUp(record) {
    if (!record) return;
    var at = session.queue.indexOf(record.item);
    if (at !== -1) session.queue.splice(at, 1);
    if (record.dropped) session.queue.push(record.dropped);
  }

  function skipQuestion() {
    stopSpeaking();
    stopListening();
    session.results[session.index] = { answer: '', rating: null, skipped: true, seconds: 0, follow: null };
    nextQuestion();
  }

  function nextQuestion() {
    stopSpeaking();
    session.index++;
    if (session.index >= session.queue.length) finish();
    else askCurrent();
  }

  function answerAgain() {
    stopSpeaking();
    var result = session.results[session.index];
    if (result) undoFollowUp(result.follow);
    session.results[session.index] = undefined;
    renderLive();
    showScreen('live', true);
    beginAnswer();
  }

  // ---------- one answer's rating ----------

  function showFeedback(index) {
    var item = session.queue[index];
    var result = session.results[index];
    var r = result.rating;
    var reviewing = session.review === index;

    el.mockScore.textContent = '';
    el.mockScore.className = 'mock-score ' + scoreTone(r.score);
    el.mockScore.setAttribute('aria-label', 'Score: ' + r.score + ' out of 10');
    el.mockScore.appendChild(h('span', 'mock-score-value', String(r.score)));
    el.mockScore.appendChild(h('span', 'mock-score-of', 'out of 10'));
    el.mockFeedbackKicker.textContent = 'Question ' + (index + 1) + ' · ' + item.topic + (item.isFollowUp ? ' · Follow-up' : '');
    el.mockVerdict.textContent = r.headline;
    el.mockFeedbackQuestion.textContent = item.question;

    el.mockCriteria.textContent = '';
    r.criteria.forEach(function (c) {
      var li = h('li');
      var head = h('div', 'mock-crit-head');
      head.appendChild(h('strong', '', c.label));
      head.appendChild(h('span', 'mock-crit-score ' + scoreTone(c.score), c.score + '/10'));
      li.appendChild(head);
      var track = h('span', 'track');
      track.setAttribute('aria-hidden', 'true');
      var fill = h('span', 'track-fill ' + scoreTone(c.score));
      fill.style.width = (c.score * 10) + '%';
      track.appendChild(fill);
      li.appendChild(track);
      if (c.note) li.appendChild(h('span', 'mock-crit-note', c.note));
      el.mockCriteria.appendChild(li);
    });

    fillList(el.mockGood, r.good.length ? r.good : ['Nothing yet: this answer missed the main point.'], 'check');
    fillList(el.mockImprove, r.improve.length ? r.improve : ['Nothing to add. Keep answers like this one.'], 'arrowRight');
    el.mockBetter.textContent = r.better || 'No model answer was given for this question.';

    el.mockSyntax.textContent = '';
    r.syntax.forEach(function (s) {
      var box = h('div', 'mock-syntax-item');
      box.appendChild(h('code', '', s.code));
      if (s.label) box.appendChild(h('span', '', s.label));
      el.mockSyntax.appendChild(box);
    });
    show(el.mockSyntaxBlock, r.syntax.length > 0);
    el.mockSaid.textContent = result.answer;

    var lesson = r.lessonId && T.site ? T.site.lessons().find(function (l) { return l.id === r.lessonId; }) : null;
    show(el.mockRevise, !!lesson);
    if (lesson) {
      el.mockRevise.href = T.site.lessonHref(lesson);
      el.mockRevise.textContent = 'Revise ' + T.site.lessonNumber(lesson) + ' ' + lesson.title;
    }

    show(el.mockAgain, !reviewing);
    var last = index >= session.queue.length - 1;
    var nextItem = session.queue[index + 1];
    if (reviewing) {
      el.mockNextLabel.textContent = 'Back to the scorecard';
      el.mockNextSub.textContent = '';
    } else if (last) {
      el.mockNextLabel.textContent = 'See your scorecard';
      el.mockNextSub.textContent = '';
    } else {
      el.mockNextLabel.textContent = 'Next question';
      el.mockNextSub.textContent = nextItem.isFollowUp ? 'A follow-up on this answer' : 'Question ' + (index + 2) + ' of ' + session.queue.length;
    }
    if (!reviewing) renderProgress();
    showScreen('feedback', true);
  }

  function fillList(list, items, iconName) {
    list.textContent = '';
    items.forEach(function (text) {
      var li = h('li');
      li.appendChild(icon(iconName, 20));
      li.appendChild(h('span', '', text));
      list.appendChild(li);
    });
  }

  // ---------- scorecard ----------

  function finish() {
    stopSpeaking();
    stopListening();
    var done = session.results.map(function (r, i) { return r ? { item: session.queue[i], result: r, index: i } : null; })
      .filter(Boolean);
    if (!done.length) {
      session = null;
      showScreen('setup', true);
      return;
    }
    session.finished = Date.now();
    var rated = done.filter(function (d) { return !d.result.skipped; })
      .map(function (d) { return { item: d.item, rating: d.result.rating }; });
    var total = done.reduce(function (sum, d) { return sum + (d.result.skipped ? 0 : d.result.rating.score); }, 0);
    var percent = Math.round(total / done.length * 10);
    var minutes = Math.max(1, Math.round((session.finished - session.started) / 60000));
    var s = session.settings;

    el.mockRingBar.setAttribute('stroke-dasharray', (percent / 100 * RING).toFixed(1) + ' ' + Math.ceil(RING));
    el.mockRingBar.style.visibility = percent > 0 ? '' : 'hidden';
    el.mockRingValue.textContent = percent + '%';
    el.mockResultDate.textContent = 'Interview complete · ' + shortDate(new Date());
    el.mockResultTitle.textContent = verdictFor(percent);
    el.mockResultSummary.textContent = rated.length ? 'Writing your summary…' : 'You skipped every question, so there is nothing to rate yet.';

    el.mockResultChips.textContent = '';
    [topicLabel(s.topic), levelLabel(s.level), done.length + ' question' + (done.length === 1 ? '' : 's'), minutes + ' min']
      .forEach(function (text) { el.mockResultChips.appendChild(h('li', '', text)); });

    var best = rated.reduce(function (m, r) { return Math.max(m, r.rating.score); }, 0);
    var weakTopics = [];
    done.forEach(function (d) {
      var weak = d.result.skipped || d.result.rating.score < 7;
      if (weak && weakTopics.indexOf(d.item.topic) === -1) weakTopics.push(d.item.topic);
    });
    el.mockTiles.textContent = '';
    [
      ['Answered', rated.length + ' of ' + done.length, 'tone-sky'],
      ['Best answer', rated.length ? best + '/10' : '–', 'tone-mint'],
      ['To practise', weakTopics.length + ' topic' + (weakTopics.length === 1 ? '' : 's'), 'tone-peach']
    ].forEach(function (t) {
      var tile = h('div', 'stat-tile ' + t[2]);
      tile.appendChild(h('span', 'stat-label', t[0]));
      tile.appendChild(h('span', 'stat-value', t[1]));
      el.mockTiles.appendChild(tile);
    });

    el.mockQList.textContent = '';
    done.forEach(function (d) {
      var li = h('li');
      var score = d.result.skipped ? null : d.result.rating.score;
      var badge = h('span', 'mock-qscore ' + (score == null ? 'tone-peach' : scoreTone(score)), score == null ? 'Skip' : String(score));
      badge.setAttribute('role', 'img');
      badge.setAttribute('aria-label', score == null ? 'Skipped' : 'Score ' + score + ' out of 10');
      li.appendChild(badge);
      var text = h('div', 'mock-qtext');
      text.appendChild(h('p', 'mock-qmeta', 'Question ' + (d.index + 1) + ' · ' + d.item.topic + (d.item.isFollowUp ? ' · Follow-up' : '')));
      text.appendChild(h('p', 'mock-qquestion', d.item.question));
      li.appendChild(text);
      if (score != null) {
        var see = h('button', 'btn', 'See feedback');
        see.type = 'button';
        see.addEventListener('click', function () {
          session.review = d.index;
          showFeedback(d.index);
        });
        li.appendChild(see);
      }
      el.mockQList.appendChild(li);
    });

    var good = [], bad = [];
    rated.forEach(function (r) {
      r.rating.good.forEach(function (g) { if (good.length < 3) good.push(g); });
      r.rating.improve.forEach(function (i) { if (bad.length < 3 && r.rating.score < 8) bad.push(i); });
    });
    fillList(el.mockStrengths, good.length ? good : ['Answer a few questions to see your strengths.'], 'check');
    fillList(el.mockWork, bad.length ? bad : ['Nothing urgent. Try the Advanced level next.'], 'arrowRight');
    renderRevise(done);

    saveHistory({
      date: new Date().toISOString(),
      title: topicLabel(s.topic) + ' · ' + levelLabel(s.level),
      meta: done.length + ' question' + (done.length === 1 ? '' : 's') + ' · ' + minutes + ' min',
      percent: percent
    });
    session.review = -1;
    showScreen('summary', true);

    if (rated.length) {
      var mine = session;
      summarize(rated)
        .then(function (sum) {
          if (session !== mine) return;
          if (sum.headline) el.mockResultTitle.textContent = sum.headline;
          el.mockResultSummary.textContent = sum.summary || '';
          if (sum.strengths.length) fillList(el.mockStrengths, sum.strengths, 'check');
          if (sum.work.length) fillList(el.mockWork, sum.work, 'arrowRight');
        })
        .catch(function () {
          if (session === mine) el.mockResultSummary.textContent = 'Here is how each answer went.';
        });
    }
  }

  function verdictFor(percent) {
    if (percent >= 85) return 'Interview-ready';
    if (percent >= 70) return 'Nearly interview-ready';
    if (percent >= 50) return 'Getting there';
    return 'Keep practising';
  }

  // Lessons Claude pointed to for weak answers, then the interview questions on those topics.
  function renderRevise(done) {
    el.mockReviseList.textContent = '';
    var cards = [];
    var seen = {};
    done.forEach(function (d) {
      var r = d.result;
      if (r.skipped || r.rating.score >= 8 || !r.rating.lessonId || !T.site) return;
      var lesson = T.site.lessons().find(function (l) { return l.id === r.rating.lessonId; });
      if (!lesson || seen[lesson.id]) return;
      seen[lesson.id] = true;
      cards.push({
        href: T.site.lessonHref(lesson),
        badge: T.site.lessonNumber(lesson),
        tone: T.site.unitTone(lesson.unit),
        kind: 'Lesson · Module ' + lesson.unit,
        title: lesson.title
      });
    });
    done.forEach(function (d) {
      var r = d.result;
      if (!r.skipped && r.rating.score >= 8) return;
      var topic = d.item.topic;
      if (seen['topic:' + topic]) return;
      seen['topic:' + topic] = true;
      cards.push({
        href: '#/interview?topic=' + encodeURIComponent(topic),
        badge: String(T.interview.count(topic)),
        tone: 'tone-sky',
        kind: 'Interview questions',
        title: topic
      });
    });
    if (!cards.length) {
      el.mockReviseList.appendChild(h('li', 'mock-empty-note', 'Nothing to revise: every answer scored 8 or more. Try the Advanced level next.'));
      return;
    }
    cards.slice(0, 4).forEach(function (c) {
      var li = h('li');
      var a = h('a', 'mock-revise-card');
      a.href = c.href;
      var badge = h('span', 'module-badge ' + c.tone, c.badge);
      badge.setAttribute('aria-hidden', 'true');
      a.appendChild(badge);
      a.appendChild(h('span', 'mock-revise-kind', c.kind));
      a.appendChild(h('strong', '', c.title));
      li.appendChild(a);
      el.mockReviseList.appendChild(li);
    });
  }

  function saveHistory(entry) {
    var items = readStore(HISTORY_STORE, []);
    items = Array.isArray(items) ? items : [];
    items.unshift(entry);
    writeStore(HISTORY_STORE, items.slice(0, 20));
  }

  function endInterview() {
    if (!session) return;
    stopSpeaking();
    stopListening();
    var any = session.results.some(Boolean);
    if (any) {
      finish();
    } else {
      session = null;
      renderHistory();
      showScreen('setup', true);
    }
  }

  // ---------- events ----------

  segmented(el.mockLevel, settings.level, function (value) {
    settings.level = value;
    savePrefs();
    updateCountHint();
  });
  segmented(el.mockCount, settings.count, function (value) {
    settings.count = Number(value);
    savePrefs();
    updateCountHint();
  });
  var paintMode = segmented(el.mockMode, settings.mode, function (value) {
    settings.mode = value;
    savePrefs();
  });
  segmented(el.mockRate, settings.rate, function (value) {
    settings.rate = Number(value);
    savePrefs();
  });

  if (!Recognition) {
    var voiceOption = el.mockMode.querySelector('[data-value="voice"]');
    voiceOption.disabled = true;
    settings.mode = 'text';
    paintMode('text');
    el.mockModeHint.textContent = 'Voice answers need Chrome, Edge or Safari. In this browser you type.';
  }

  el.mockFollowUps.setAttribute('aria-checked', String(settings.followUps));
  el.mockFollowUps.addEventListener('click', function () {
    settings.followUps = !settings.followUps;
    el.mockFollowUps.setAttribute('aria-checked', String(settings.followUps));
    savePrefs();
    updateCountHint();
  });

  el.mockLang.value = settings.lang;
  el.mockLang.addEventListener('change', function () {
    settings.lang = el.mockLang.value;
    savePrefs();
    fillVoices();
  });
  el.mockVoice.addEventListener('change', function () {
    settings.voice = el.mockVoice.value;
    savePrefs();
  });
  el.mockVoiceSample.addEventListener('click', function () {
    speak('Hello, I am your interviewer. Let us start with your first question.');
  });
  el.mockModel.value = settings.model;
  if (el.mockModel.value !== settings.model) settings.model = el.mockModel.value;
  el.mockModel.addEventListener('change', function () {
    settings.model = el.mockModel.value;
    savePrefs();
    keyError('');
  });

  el.mockMicTest.addEventListener('click', testMic);
  el.mockStart.addEventListener('click', startInterview);

  el.mockRepeat.addEventListener('click', function () {
    var wasListening = listening;
    stopListening();
    setStatus('speaking');
    speak(currentItem().question, function () {
      if (screen !== 'live' || !visible) return;
      if (wasListening || session.settings.mode === 'voice') startListening();
      else setStatus('typing');
    });
  });
  el.mockHideText.addEventListener('click', function () {
    var hidden = !el.mockQuestion.classList.contains('is-hidden');
    el.mockQuestion.classList.toggle('is-hidden', hidden);
    el.mockHideText.setAttribute('aria-pressed', String(hidden));
    el.mockHideText.textContent = hidden ? 'Show question text' : 'Hide question text';
  });
  el.mockPause.addEventListener('click', function () {
    if (listening) {
      stopListening(function () {
        setStatus('paused');
        updateTools();
      });
      el.mockPause.textContent = 'Resume';
    } else {
      stopSpeaking();
      startListening();
    }
  });
  el.mockSwitchMode.addEventListener('click', function () {
    setMode(session && session.settings.mode === 'voice' ? 'text' : 'voice');
  });
  el.mockRestart.addEventListener('click', function () {
    var wasVoice = session.settings.mode === 'voice';
    stopListening(function () {
      el.mockAnswer.value = '';
      committed = '';
      session.answerStarted = Date.now();
      if (wasVoice) startListening();
      else el.mockAnswer.focus();
    });
  });
  el.mockDone.addEventListener('click', submitAnswer);
  el.mockSkip.addEventListener('click', skipQuestion);
  el.mockEnd.addEventListener('click', endInterview);

  el.mockHearFeedback.addEventListener('click', function () {
    var r = session && session.results[session.review !== -1 ? session.review : session.index];
    if (r && r.rating) speak([r.rating.headline].concat(r.rating.improve).join(' '));
  });
  el.mockHearBetter.addEventListener('click', function () {
    var r = session && session.results[session.review !== -1 ? session.review : session.index];
    if (r && r.rating && r.rating.better) speak(r.rating.better);
  });
  el.mockAgain.addEventListener('click', answerAgain);
  el.mockNext.addEventListener('click', function () {
    stopSpeaking();
    if (session.review !== -1) {
      session.review = -1;
      showScreen('summary', true);
    } else {
      nextQuestion();
    }
  });
  el.mockAnother.addEventListener('click', function () {
    session = null;
    renderHistory();
    showScreen('setup', true);
  });

  // ---------- start ----------

  buildMeter();
  drawMeter(0);
  setupKey();
  fillVoices();
  if (synth) {
    if (synth.addEventListener) synth.addEventListener('voiceschanged', fillVoices);
    else synth.onvoiceschanged = fillVoices;
  }
  if (!Recognition) el.mockSupport.textContent = 'This browser cannot turn speech into text, so you will type your answers. For voice answers, use Chrome, Edge or Safari.';
  renderHistory();
  updateCountHint();

  T.interview.ready.then(function (list) {
    questions = list;
    renderTopics();
    updateCountHint();
  });

  T.mock = {
    // Called whenever the Mock interview page is opened.
    show: function () {
      visible = true;
      if (!session) {
        renderHistory();
        showScreen('setup', false);
      } else {
        showScreen(screen, false);
        if (screen === 'live' && !listening && el.mockStatus.getAttribute('data-state') === 'paused') updateTools();
      }
    },
    // Called when another page is opened: the interviewer stops talking and the
    // microphone is released. The interview waits where it was.
    leave: function () {
      if (!visible) return;
      visible = false;
      stopSpeaking();
      closeMic();
      runClock(false);
      if (listening) {
        stopListening(function () {
          setStatus('paused');
          updateTools();
        });
      } else if (screen === 'live' && el.mockStatus.getAttribute('data-state') === 'speaking') {
        setStatus('paused');
        updateTools();
      }
    }
  };
})();
