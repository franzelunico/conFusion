'use strict';

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  // Cuan largo es el tiempo que toma las tareas. Puede ayudar a la hora de optimizar los tiempos de construcción
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  // Cargar automáticamente las tareas requeridas Grunt
  require('jit-grunt')(grunt);


  // Define the configuration for all the tasks
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	// Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/scripts/{,*/}*.js'
        ]
      }
    }
  });


  grunt.registerTask('build', [
    'jshint'
  ]);


  grunt.registerTask('default',['build']);
};

