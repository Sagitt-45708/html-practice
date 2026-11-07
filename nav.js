/* 导航高亮：根据当前文件名点亮对应链接 */
(function () {
  'use strict';

  var path = location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.site-nav a');

  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) link.classList.add('is-active');
  });

  // 页脚年份
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 注册 Service Worker：装到手机桌面后，离线也能打开
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        // file:// 下注册失败，不影响页面
      });
    });
  }

  // 浏览器支持安装时，右下角出现「安装到手机」
  var deferredPrompt = null;
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'install-fab';
  fab.textContent = '安装到手机';
  document.body.appendChild(fab);

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredPrompt = event;
    fab.classList.add('show');
  });

  fab.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      fab.classList.remove('show');
    });
  });

  window.addEventListener('appinstalled', function () {
    fab.classList.remove('show');
  });
})();
