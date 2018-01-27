'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    browserSync: {
      server: {
        bsFiles: {
          src: [
            'build/css/style.min.css',
            'build/js/index.min.js',
            'build/*.html'
          ]
        },
        options: {
          server: 'build',
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    clean: {
      build: ['build'],
      icons: ['build/img/icons']
    },

    concat: {
      build: {
        src: ['node_modules/picturefill/dist/picturefill.js',
              'node_modules/svg4everybody/dist/svg4everybody.js',
              'src/js/index.js'],
        dest: 'build/js/index.js'
      }
    },

    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: [
              'fonts/**/*.{woff,woff2}',
              '*.html'
            ],
            dest: 'build'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['*.html'],
            dest: 'build'
          }
        ]
      }
    },

    csso: {
      compress: {
        options: {
          comments: false,
          report: true
        },
        files: {
          'build/css/style.min.css': ['build/css/style.css']
        }
      }
    },

    imagemin: {
      images: {
        options: {
          use: [
            require('imagemin-optipng')(),
            require('imagemin-svgo')({
              plugins: [{removeTitle: true}]
            }),
            require('imagemin-jpegoptim')({
              max: 80,
              progressive: true
            })
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'src/img',
            src: ['**/*.{jpg,png,svg}'],
            dest: 'build/img'
          }
        ]
      },
      webp: {
        options: {
          use: [
            require('imagemin-webp')({
              quality: 70
            })
          ]
        },
        files: [
          {
            expand: true,
            cwd: 'src/img/content',
            src: ['**/*.jpg'],
            dest: 'build/img/content',
            ext: '.webp'
          }
        ]
      }
    },

    less: {
      style: {
        files: {
          'build/css/style.css': ['src/less/style.less']
        }
      }
    },

    lintspaces: {
      default: {
        src: [
          'src/*.html',
          '*.json',
          '*.js',
          '*.md',
          'src/**/*.js',
          'src/img/**/*.svg',
          'src/less/**/*.less'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')(),
            require('css-mqpacker')()
          ]
        },
        src: 'build/css/*.css'
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false
      },
      default: {
        files: {
          'build/img/symbols.svg': ['build/img/icons/*.svg']
        }
      }
    },

    uglify: {
      default: {
        files: {
          'build/js/index.min.js': ['build/js/index.js']
        }
      }
    },

    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify']
      },
      style: {
        files: ['src/less/**/*.less'],
        tasks: ['less', 'postcss', 'csso']
      }
    }
  });

  // Load the plugins that provide necessary tasks.
  require('load-grunt-tasks')(grunt);

  // Default tasks.
  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('build', ['clean:build', 'copy:build', 'less', 'postcss', 'csso', 'concat', 'uglify', 'imagemin', 'svgstore', 'clean:icons']);
};
