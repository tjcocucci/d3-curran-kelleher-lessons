const buble = require('@rollup/plugin-buble');
  
  export default {
  input: 'index.js',
  external: ["react","react-dom"],
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true,
    globals: {"react":"React","react-dom":"ReactDOM"}
  },
  plugins: [buble()]
};