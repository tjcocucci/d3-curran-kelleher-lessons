(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var BackgroundCircle = function (ref) {
    var faceRadius = ref.faceRadius;
    var strokeWidth = ref.strokeWidth;

    return (
    React.createElement( 'circle', {
      r: faceRadius, fill: "yellow", 'stroke-width': strokeWidth, stroke: "black" }
    )
  );
  };

  var Eyes = function (ref) {
    var offsetX = ref.offsetX;
    var offsetY = ref.offsetY;
    var eyeRadius = ref.eyeRadius;

    return (
    React.createElement( React.Fragment, null,
      React.createElement( 'circle', {
        cx: -offsetX, cy: -offsetY, r: eyeRadius, fill: "black" }
      ),
      React.createElement( 'circle', {
        cx: offsetX, cy: -offsetY, r: eyeRadius, fill: "black" }
      )
    )
  );
  };

  var Mouth = function (ref) {
    var mouthRadius = ref.mouthRadius;
    var mouthWidth = ref.mouthWidth;

    var mouthArc = d3.arc()
      .innerRadius(mouthRadius - mouthWidth / 2)
      .outerRadius(mouthRadius + mouthWidth / 2)
      .startAngle(Math.PI / 2)
      .endAngle(Math.PI * 3 / 2);
    return React.createElement( 'path', { d: mouthArc() })
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
    var faceRadius = ref.faceRadius;
    var strokeWidth = ref.strokeWidth;
    var offsetX = ref.offsetX;
    var offsetY = ref.offsetY;
    var eyeRadius = ref.eyeRadius;
    var mouthRadius = ref.mouthRadius;
    var mouthWidth = ref.mouthWidth;

    return (
    React.createElement( FaceContainer, {
      width: width, height: height, centerX: centerX, centerY: centerY },
      React.createElement( BackgroundCircle, {
        faceRadius: faceRadius, strokeWidth: strokeWidth }),
      React.createElement( Eyes, {
        offsetX: offsetX, offsetY: offsetY, eyeRadius: eyeRadius }),
      React.createElement( Mouth, {
        mouthRadius: mouthRadius, mouthWidth: mouthWidth }
      )
    )
  );
  };

  var width = 200;
  var height = 200;
  var faceRadius = 90;

  var App = function () { return (
    React__default["default"].createElement( Face, {
      width: 200, height: 200, centerX: width / 2, centerY: height / 2, faceRadius: 90, eyeRadius: 10, offsetX: faceRadius / 3, offsetY: faceRadius / 3, strokeWidth: 10, mouthRadius: faceRadius * 2 / 3, mouthWidth: 10 })
  ); };

  var rootElement = document.getElementById("root");
  ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3);
//# sourceMappingURL=bundle.js.map
