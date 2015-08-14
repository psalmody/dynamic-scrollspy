module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            separator: ';\n',
            banner: '/**\n*  AutoScrollspy v <%= pkg.version %>\n*  <%= pkg.homepage %>\n*/\n',
        },
        build: {
            src: ['src/dynamicscrollspy.js'],
            dest: 'dynamicscrollspy.js'
        }
    },
    uglify: {
      options: {
        banner: '/**\n*  AutoScrollspy v <%= pkg.version %>\n*  <%= pkg.homepage %>\n*/\n',
        mangle: false
      },
      build: {
        files: [{
          src: 'dynamicscrollspy.js',
          dest: 'dynamicscrollspy.min.js'
        }]
      }
    },
    watch: {
      files: ['src/dynamicscrollspy.js'],
      tasks: ['concat','uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat','uglify']);

};
