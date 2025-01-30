export default {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: '20'
        },
        modules: false // This prevents transformation to CommonJS
      }]
    ]
  };