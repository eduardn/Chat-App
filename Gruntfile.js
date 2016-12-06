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
        ngtemplates:  {
            chatApp:        {
                cwd: './app',
                src:      'components/**/*.html',
                dest:     './dist/templates.js'
            }
        },
        useminPrepare: {
            html: './dist/index.html',
            options: {
                root: './app',
                dest: './dist'
            }
        },
        usemin: {
            html: './dist/index.html'
        },
        copy: {
           html: {
               src: './app/index.html',
               dest: './dist/index.html'
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
                    type: 'html',
                    dir: 'coverage/'
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('test:unit', ['karma:unit']);
    grunt.registerTask('package', ['copy:html', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'usemin', 'ngtemplates']);

    grunt.registerTask('default', ['browserSync']);
};
