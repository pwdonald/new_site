module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dev: {
                files: {
                    'public/javascripts/index.js': 'public/js/main.js',
                    'public/javascripts/admin.js': 'public/js/client/admin.js'
                },
                options: {
                    transform: ['stringify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },

        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFileInline: true
                },
                files: {
                    'public/css/compiled.css': 'public/css/index.less'
                }
            }
        },

        watch: {
            client: {
                files: ['views/**/*.html', 'public/js/**/*.js', 'public/css/**/*.less'],
                tasks: ['concurrent:client'],
                options: {
                    spawn: true,
                    livereload: true
                }
            }
        },

        concurrent: {
            client: {
                tasks: ['browserify:dev', 'less:dev'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:client', 'watch:client']);
};