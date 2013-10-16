ALL_TASKS = ['coffee:all', 'sass:all']

module.exports = (grunt) ->

  path = require('path')
  exec = require('child_process').exec

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.initConfig

    pkg: '<json:package.json>'

    coffee:
      all:
        files:
          'scripts/main.js': 'scripts/main.coffee'

    sass:
      all:
        files:
          'styles/main.css': 'styles/main.scss'

    watch:
      all:
        files: ['./scripts/**/*.coffee', 'styles/**/*.scss']
        tasks: ALL_TASKS

  grunt.registerTask 'default', ALL_TASKS
