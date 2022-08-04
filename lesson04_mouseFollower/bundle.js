(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var radius = 10;
  var width = 200;
  var height = 200;
  var initialMousePosition = {x: width / 2, y: height / 2};

  var App = function () {
    var ref = React.useState(initialMousePosition);
    var mousePosition = ref[0];
    var setMousePosition = ref[1];
    var handleMouseMove = React.useCallback(function (ref) {
      var clientX = ref.clientX;
      var clientY = ref.clientY;

      setMousePosition({x: clientX, y: clientY});
    }, [setMousePosition]);
    console.log(mousePosition.x, mousePosition.y);
    return (
      React__default['default'].createElement( 'svg', { width: width, height: height, onMouseMove: handleMouseMove },
        React__default['default'].createElement( 'circle', { cx: mousePosition.x, cy: mousePosition.y, r: radius })
      )
  )};

  var rootElement = document.getElementById("root");
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM));
//# sourceMappingURL=bundle.js.map
