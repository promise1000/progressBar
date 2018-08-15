'use strict';

System.register(['lodash', 'jquery', 'jquery.flot', 'jquery.flot.pie'], function (_export, _context) {
  "use strict";

  var _, $;

  function link(scope, elem, attrs, ctrl) {
    var data, panel;
    elem = elem.find('.progressbar-panel');
    // 向ctrl实例注册render函数
    ctrl.events.on('render', function () {
      if (!ctrl.data) {
        return;
      }
      // data后台的相应值
      data = ctrl.data;
      progressBar(ctrl);
    });
    function progressBar(ctrl) {
      // 获取bar的自适应高度
      var width = elem.width();
      var height = elem.height();
      var barHeight = Math.min(width * 0.045, ctrl.height * 0.055);
      // 拼bar容器标签
      var content = '<div class="bar-container" style="padding: 10px 27px;">';
      // 重复引用赋值(简化引用操作)
      var bars = ctrl.bars;
      // bar文字大小
      var fontSize = ctrl.adjFontSize ? ctrl.fontSize : '0.8vw';
      // 循环bar对象
      for (var item in bars) {
        // 获取节点值数组
        var barClr = bars[item].thresholds.split(',');
        barClr.push(bars[item].max);
        // 关联阀值添加删除
        barClr.length > bars[item].label.length && bars[item].label.push('rgba(12, 201, 12, 0.9)');
        barClr.length < bars[item].label.length && bars[item].label.pop();
        // 获取tag对象
        var tag = bars[item].label;
        // 获取最大值和最小值
        var max = parseFloat(bars[item].max);
        var min = parseFloat(bars[item].min);
        // 拼接节段label
        content += '<div style="text-align:left; color:#ffffff; font-size:' + fontSize + '; display:inline-block; margin:19px 1px 1px 1px;">' + item + '</div>';
        content += '<div style="float:right; color:#ffffff; font-size:' + fontSize + '; display:inline-block; margin:19px 1px 1px 1px;">' + bars[item].prefix + ' ' + bars[item].value + ' ' + bars[item].postfix + '</div>';
        content += '<div class="progress" style="width: 100%; height:' + barHeight + 'px;"><span class="tag-min">' + min + '</span>';
        for (var i in barClr) {
          // 节段宽度(！！！需计算)
          var width = 100 / barClr.length;
          content += '<div class="progress-bar" style="width: ' + width + '%; height: ' + barHeight + 'px; background-color: ' + tag[i] + '; display:inline-block;"><span class="tag-val">' + barClr[i] + '</span></div>';
        }
        // 获取滑块的位置
        var left = bars[item].value / parseFloat(max - min) * 100;
        content += '<span class="bar-tag" style="left:' + left + '%;"></span>';
        content += '</div>';
      }
      content += '</div>';
      elem.html(content);
    }
  }

  _export('default', link);

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_jqueryFlot) {}, function (_jqueryFlotPie) {}],
    execute: function () {}
  };
});
//# sourceMappingURL=rendering.js.map
