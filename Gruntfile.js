module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['client.js'],
        tasks: ['exec:browserify']
      },
    },
    exec: {
      browserify: {
        cmd: 'browserify ./client.js > ./public/javascripts/z-bundle.js'
      } 
    }
  });

  grunt.registerTask('boom', ['exec:browserify', 'watch']);

};
