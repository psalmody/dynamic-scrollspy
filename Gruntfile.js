module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            separator: ';\n',
            banner: '/**\n*  AutoScrollspy v <%= pkg.version %> by <%= pkg.author %>\n*  <%= pkg.homepage %>\n*/\n',
        },
        build: {
            src: ['src/dynamicscrollspy.js'],
            dest: 'dist/dynamicscrollspy.js'
        }
    },
    uglify: {
      options: {
        banner: '/**\n*  AutoScrollspy v <%= pkg.version %>\n*  <%= pkg.homepage %>\n*/\n',
        mangle: false
      },
      build: {
        files: [{
          src: 'dist/dynamicscrollspy.js',
          dest: 'dist/dynamicscrollspy.min.js'
        }]
      }
    },
    jsbeautifier: {
      files: ["src/*.js",'tests/*.html'],
      options: {
        js: {
          indentSize: 2
        }
      }
    },
    express: {
      options: {
        script: 'bin/dev-server.js'
      },
      dev: {
        options: {
          script: 'bin/dev-server.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['src/*.js','tests/*.html'],
      tasks: ['jsbeautifier','concat','uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['jsbeautifier','concat','uglify']);
  grunt.registerTask('serve', ['express:dev', 'watch']);

};
