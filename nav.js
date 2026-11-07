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
})();
