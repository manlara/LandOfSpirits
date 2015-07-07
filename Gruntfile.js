
module.exports = function(grunt) {
  'use strict';

  // Need to put the following in a helper file
  var indexEJS_options = {
    crewPics: ['zina-semenova', 'mike-bogatyrev', 'maria-lavrentieva', 'vera-bogatyreva', 'manuel-lara', 'zhenya-teppoev', 'nikolay-topakov', 'anita-topakova'],
    crewName: ['Zina Semenova','Mike Bogatyrev','Maria Lavrentieva','Vera Bogatyreva','Manuel Lara','Eugine Teppoev','Nikolay Topakov','Anita Topakova'],
    crewDesc: ['project leader','cameraman, editor','cameraman','sound recorder, photographer','line producer','technical assistant, editor','local guide','local guide'],
    StoryPanelBg: ['story-1.png','story-2.png','story-3.png','story-4.png'],
    StoryPanelPics:  ['story-1-circle-2x.png','story-2-circle-2x.png', 'story-3-circle-2x.png', 'story-4-circle-2x.png'],
    StoryPanelPicsName: ['Mike & Zina', 'Vera & Maria', 'Grandma Zoe', 'Shor King'],
    StoryPanelPicsDesc: ['How Zina and crew went to end of the world and met the Shorian King','Taiga exploration. How the crew got to know hay mowers','Meet Zoe and let\'s ride on her horse to the nearest store' ,'Get on board and let King show you around'],
    StoryPanelPicsLink: ['how-zina-got-an-idea-to-visit-a7c2cbe922fe', 'one-day-in-ust-anzas-cc5bbdbdd034', 'how-zina-got-an-idea-to-visit-a7c2cbe922fe', 'one-day-in-ust-anzas-cc5bbdbdd034']
  };

  var fs = require("fs");
  var reEJS = /.ejs$/;
  var ejsFiles = fs.readdirSync("./templates/");
  var ejsObject = function(){
    var tmp = {};
    for ( var i=0; i<ejsFiles.length; i++){
      if ( reEJS.test(ejsFiles[i].toLowerCase()) ){
        if ( ejsFiles[i]=='index.ejs' ){
          tmp[i] = {
            options: indexEJS_options,
            src: './templates/'+ejsFiles[i], dest: './app/'+ejsFiles[i].replace(reEJS,".html")};
        } 
        else if( ejsFiles[i].indexOf('story')>-1 ){
          tmp[i] = {
          options: require( "./story.js" ).dataArray( "Stories/"+ejsFiles[i].replace(reEJS,".txt") ),
          src: './templates/'+ejsFiles[i], dest: './app/'+ejsFiles[i].replace(reEJS,".html")};

        } 
        else if( ejsFiles[i].indexOf('gallery')>-1 ){
          tmp[i] = {
          options: require( "./gallery.js" ).dataArray( "./Gallery/" ),
          src: './templates/'+ejsFiles[i], dest: './app/'+ejsFiles[i].replace(reEJS,".html")};

        } else{
          tmp[i] = {src: './templates/'+ejsFiles[i], dest: './app/'+ejsFiles[i].replace(reEJS,".html")};
        }
          
      }
    }
    return tmp;
  };

  var configBridge = grunt.file.readJSON('configBridge.json', { encoding: 'utf8' });

  grunt.initConfig({

    // start a local server
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          open: true,
          base: 'app',
          livereload: true
        }
      }
    },

    ejs: ejsObject(),

    // this deletes css and js files
    clean: {
      appAssets: ['app/assets/css/**/*.css','app/assets/js/**/*.js']
    },

    // compile less code to css
    less: {
      development: {
        options: {
          sourceMap: true
        },
        files: {"app/assets/css/app.css": "source/less/app.less"}
      }
    },

    // validates javascript code so it follows best practices
    jshint: {
      files: ["Gruntfile.js", "source/js/**/*.js"],
      options: {
        globals: {jQuery: true}
      }
    },

    // concat all js files into one
    concat: {
      options: {
        seperator: ";"
      },
      js_frontend: {
        src: [
          "bower_components/jquery/dist/jquery.js",
          "bower_components/bootstrap/dist/js/bootstrap.js",
          "libs/bxslider-4/dist/jquery.bxslider.js",
          "source/js/app.js"
        ],
        dest: "app/assets/js/app.min.js"
      }
    },

    // will update the browser when js or less or css or html changes, automatically!
    watch: {
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['jshint', 'concat'],
        options: {
          livereload: true
        }
      },
      less: {
        files: ['source/less/**/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      },
      ejs: {
        files: ['templates/**/*.ejs'],
        tasks: ['ejs'],
        options: {
          livereload: true
        }
      },
      stories: {
        files: ['Stories/*.txt','Gallery/*.txt'],
        tasks: ['ejs'],
        options: {
          livereload: true
        }
      }
    },

    // compress and minify javascript
    uglify: {
      production: {
        files: {'app/assets/js/app.min.js': 'app/assets/js/app.min.js'}
      }
    },

    // Minify css
    cssmin: {
      production: {
        expand: true,
        cwd: 'app/assets/css',
        src: ['*.css'],
        dest: 'app/assets/css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'app/assets/css/app.css'
      }
    },

    grunticon: {
      myIcons: {
        files: [{
            expand: true,
            cwd: 'source/icons/',
            src: ['*.svg', '*.png'],
            dest: "app/assets/fonts/"
        }],
        options: {
          enhanceSVG: true
        }
      }
    },

    // versioning this project on git automatically
    // grunt-shell allows you to execute shell commands from within this Gruntfile
    shell: {
      bumpVersion: {
        command: 'npm version patch'
      }
    }

  });

  
  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ejs');
  grunt.loadNpmTasks('grunt-grunticon');
  
  // Register Grunt tasks

  grunt.registerTask('release',['shell: bumpVersion']);

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('dev2', ['ejs','less:development']);

  grunt.registerTask('preview', ['shell:previewSite']);

  grunt.registerTask('prebuild',[
    'clean:appAssets',
    'ejs',
    'concat',
    'less:development'
  ]);

  grunt.registerTask('postbuild',[
    'uglify:production',
    'autoprefixer:core',
    'cssmin:production'
  ]);

  grunt.registerTask('buildProduction',[
    'prebuild',
    'postbuild'
  ]);

  grunt.registerTask('deployProduction',[
    'buildProduction',
    'release'
  ]);

  grunt.registerTask('fonts',[
    'grunticon'
  ]);

  grunt.registerTask('default',[
    'prebuild',
    'postbuild',
    'connect',
    'watch'
  ]);
  
};