module.exports = function (grunt) {
  grunt.initConfig({
    browserSync: {
      bsFiles: {
        src: 'app'
      },
      options: {
        server: {
          baseDir: 'app',
          routes: {
                '/bower_components': './bower_components',
                '/node_modules': './node_modules'
              }
        }
      }
    },
    karma: {
      unit: {
        configFile: './test/karma.conf.js',
        autoWatch: false,
        singleRun: true
      },
      unit_coverage: {
        configFile: './test/karma.conf.js',
        autoWatch: false,
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
          'app/**/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      }
    },
    protractor: {
      options: {
        keepAlive: false
      },
      run: {
        options: {
          configFile: "./test/protractor.conf.js",
          args: {
            baseUrl: 'http://localhost:8888/',
            specs: ['./test/web/et/*ET.js'],
            browser: 'chrome'
          }
        }
      },
      mockedRun: {
        options: {
          configFile: "./test/protractor.conf.js"
        }
      }
    }
});

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('test:unit', ['karma:unit']);



  grunt.registerTask('default', ['browserSync']);
};
