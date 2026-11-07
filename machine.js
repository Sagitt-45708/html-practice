/* 小机器：读两个数字 + 一个运算符，算出结果 */
(function () {
  'use strict';

  var form = document.getElementById('machineForm');
  var numA = document.getElementById('numA');
  var numB = document.getElementById('numB');
  var op = document.getElementById('op');
  var result = document.getElementById('result');

  function show(text, ok) {
    result.hidden = false;
    result.textContent = text;
    result.style.background = ok ? '#e9f7ef' : '#fdeceb';
    result.style.color = ok ? '#166b45' : '#a3271f';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var a = parseFloat(numA.value);
    var b = parseFloat(numB.value);

    if (isNaN(a) || isNaN(b)) {
      show('两个数字都要填。', false);
      return;
    }

    var value;

    switch (op.value) {
      case '+': value = a + b; break;
      case '-': value = a - b; break;
      case '*': value = a * b; break;
      case '/':
        if (b === 0) {
          show('不能除以 0。', false);
          return;
        }
        value = a / b;
        break;
      default:
        show('运算选错了。', false);
        return;
    }

    // 保留三位小数，去掉多余的 0
    var pretty = Math.round(value * 1000) / 1000;
    show(a + ' ' + op.value + ' ' + b + ' = ' + pretty, true);
  });
})();
