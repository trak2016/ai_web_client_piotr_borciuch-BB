module.exports = function(config) {
  config.set({

    browsers: ['Firefox'],
    basePath: '',
    frameworks: ['browserify', 'jasmine'],

    files: [
        './jspm_packages/system.js',
        './config.js',
      'src/app/**/*.js',
      'src/tests/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },



    // define reporters, port, logLevel, browsers etc.
  });
};
