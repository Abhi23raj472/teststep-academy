// Set the theme before first paint: saved choice first, otherwise the system setting.
// This lives in its own file so the page's Content-Security-Policy can forbid inline scripts.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('tsh.theme'); } catch (e) {}
  var dark = saved ? saved === 'dark'
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
})();
