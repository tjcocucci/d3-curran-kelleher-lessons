(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var BackgroundCircle = function (ref) {
    var radius = ref.radius;
    var strokeWidth = ref.strokeWidth;

    return (
      React.createElement( 'circle', { 
        r: radius, fill: "yellow", stroke: "black", 'stroke-width': strokeWidth })
    );
  };

  var Eyes = function (ref) {
    var eyeRadius = ref.eyeRadius;
    var eyeOffsetX = ref.eyeOffsetX;
    var eyeOffsetY = ref.eyeOffsetY;

    return (
    React.createElement( React.Fragment, null,
      React.createElement( 'circle', { 
        r: eyeRadius, cx: -eyeOffsetX, cy: -eyeOffsetY }),
      React.createElement( 'circle', { 
        r: eyeRadius, cx: +eyeOffsetX, cy: -eyeOffsetY })
    )
  );
  };

  var Mouth = function (ref) {
      var mouthRadius = ref.mouthRadius;
      var mouthWidth = ref.mouthWidth;

      var mouthArc = d3.arc()
        .innerRadius(mouthRadius)
        .outerRadius(mouthRadius + mouthWidth)
        .startAngle(Math.PI / 2)
        .endAngle(Math.PI * 3 / 2);
      return React.createElement( 'path', { d: mouthArc() });
  };

  var FaceContainer = function (ref) {
    var children = ref.children;
    var width = ref.width;
    var height = ref.height;
    var centerX = ref.centerX;
    var centerY = ref.centerY;

    return (
    React.createElement( 'svg', { width: width, height: height },
      React.createElement( 'g', { transform: ("translate(" + centerX + ", " + centerY + ")") },
        children
      )
    )
  );
  };

  var Face = function (ref) {
      var width = ref.width;
      var height = ref.height;
      var centerX = ref.centerX;
      var centerY = ref.centerY;
      var strokeWidth = ref.strokeWidth;
      var eyeRadius = ref.eyeRadius;
      var eyeOffsetX = ref.eyeOffsetX;
      var eyeOffsetY = ref.eyeOffsetY;
      var mouthWidth = ref.mouthWidth;
      var mouthRadius = ref.mouthRadius;

      return (
      React.createElement( FaceContainer, {
        width: width, height: height, centerX: centerX, centerY: centerY },
          React.createElement( BackgroundCircle, { 
            radius: centerY - strokeWidth / 2, strokeWidth: strokeWidth }),
          React.createElement( Eyes, {
            eyeRadius: eyeRadius, eyeOffsetX: eyeOffsetX, eyeOffsetY: eyeOffsetY }),
          React.createElement( Mouth, {
            mouthRadius: mouthRadius, mouthWidth: mouthWidth })
      )
  );
  };

  var width = 160;
  var height = 160;

  var array = d3.range(6 * 5);

  var App = function () { return array.map(function () { return React__default['default'].createElement( Face, {
      width: width, height: height, centerX: width / 2, centerY: height / 2, strokeWidth: 10, eyeOffsetX: 30, eyeOffsetY: 30, eyeRadius: 10 + Math.random()*10, mouthRadius: 40, mouthWidth: 10 }); }
  ); };

  var rootElement = document.getElementById("root");
  ReactDOM__default['default'].render(React__default['default'].createElement( App, null ), rootElement);

}(React, ReactDOM, d3));
//# sourceMappingURL=bundle.js.map
