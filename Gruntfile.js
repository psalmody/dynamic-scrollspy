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
            dest: 'build/dynamicscrollspy.js'
        }
    },
    uglify: {
      options: {
        banner: '/**\n*  AutoScrollspy v <%= pkg.version %>\n*  <%= pkg.homepage %>\n*/\n',
        mangle: false
      },
      build: {
        files: [{
          src: 'build/dynamicscrollspy.js',
          dest: 'build/dynamicscrollspy.min.js'
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
    watch: {
      files: ['src/*.js','tests/*.html'],
      tasks: ['jsbeautifier','concat','uglify'],
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('default', ['jsbeautifier','concat','uglify']);

};
