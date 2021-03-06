//Global Dependencies for LiveReload
// var path = require('path');
// var lrSnippet = ;

// var folderMount = function folderMount(connect, point) {
//   return connect.static(path.resolve(point));
// };

module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('gruntacular');
  //Live Reload Plugins
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  //config
  grunt.initConfig({
    watch: {
      //run unit tests with testacular (server needs to be already running)
      
    },

    //for tests that run in browsers
    testacular: {
      //start testacular server (the watch task will run the tests when files change)
      unit: {
        configFile: 'config/testacular.conf.js',
      },
      //continuous integration mode for the build: run tests once in PhantomJS browser.
      continuous: {
        configFile: 'config/testacular.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
    },

    //for tests that run in Node
    simplemocha: {
      options: {
        require: 'should',
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'dot'
      },
      all: { src: 'test/node/**/*.js' }
    },

    //stylus css
    stylus: {
      compile: {
        //specify each "combined" file. Each file can then use @import() to bring in its dependencies
        files: {
          'app/styles/app.css': 'app/styles/app.styl'
        }
      }
    },

    //delete the previous build directory
    clean: ["build"],

    //copy images to the build
    copy: {
      img: {
        src: ['app/img/**'], 
        dest: 'build/img'
      }
    },

    //inline all Angular templates as Strings into a JS file that can be concatted in the build
    ngtemplates: {
      options:  {base: 'app'},
      app: {
        src: ['app/templates/**/*.html'],
        dest: 'build/templates.js'
      }
    },

    //replace all the script tags in the HTML file with the single built script
    htmlrefs: {
      options: {
        file: { 
          buildNumber: 47878 //todo generate unique from contents of file for each file
        }
      },
      build: {
        src: 'app/index.html',
        dest: 'build/'
      }
    },

    //minify the HTML file (index.html)
    htmlmin: {
      index: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    //combine all JS into one file, all CSS into one file
    concat: {
      js: {
        src: [
          'app/js/lib/angular/angular.js',
          'app/js/lib/angular/angular-resource.js',
          'app/js/app.js',
          'app/js/controllers/**/*.js', 
          'app/js/services/**/*.js', 
          'app/js/filters/**/*.js', 
          'app/js/directives/**/*.js',
          'build/templates.js'
        ],
        dest: 'app/app.build.js'
      },
      styles: {
        src: ['app/styles/**/*.css'],
        dest: 'build/styles/app.css'
      }
    },

    //minify the JS file to be as small as possible
    uglify: {
      app: {
        src: ['app/app.build.js'],
        dest: 'build/app.min.js'
      }
    },

    regarde: {
      dev: {
        files: [
            'app/js/**/*.js',
            'app/styles/**/*.css',
            'app/**/*.html'
        ],
        tasks: ['livereload']
      },
//      testacular: {
//        files: ['app/js/**/*.js', 'test/browser/**/*.js'],
//        tasks: ['testacular:unit:run']
//      },
      stylus: {
        files: ['app/styles/**/*.styl'],
        tasks: ['stylus']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [require('grunt-contrib-livereload/lib/utils').livereloadSnippet, (function(c,p) {
              return c.static(require('path').resolve(p));})(connect, '.')]
          }
        }
      }
    }

  });

  grunt.registerTask('test', ['testacular:continuous', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'stylus', 'copy', 'ngtemplates', 'htmlrefs', 'htmlmin', 'concat', 'uglify']);
  grunt.registerTask('livetasks', ['livereload-start', 'connect:livereload', 'regarde']);
};