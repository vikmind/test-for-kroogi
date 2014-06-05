module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		modernizr:{
			build: {
				"devFile" : "bower_components/modernizr/modernizr.js",
				"outputFile" : "app/js/vendor/modernizr.js",
				"extra" : {
					"shiv" : true,
					"printshiv" : false,
					"load" : false,
					"mq" : false,
					"cssclasses" : true
				},
				"extensibility" : {
					"addtest" : false,
					"prefixed" : true,
					"teststyles" : true,
					"testprops" : true,
					"testallprops" : false,
					"hasevents" : true,
					"prefixes" : true,
					"domprefixes" : true
				},
				"tests" : ["svg"]
			}
		},
		/* ====================================================================================================================================================
		 *	 Images config
		 * ==================================================================================================================================================== */
		svgmin: {
			options: {
				plugins: [{
					removeViewBox: false
				}]
			},
			dist: {
				files: [{
					cwd: "src/img/svg.src/",
					src: "*.svg",
					dest: "app/img/svg/",
					expand: true
				}]
			}
		},
		/* ====================================================================================================================================================
		 *	 CSS config
		 * ==================================================================================================================================================== */
		less: {
			live: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'app/css/style.css.map',
					sourceMapRootpath: '../'
				},
				files: {
					"app/css/style.css": "src/less/style.less"
				}
			}
		},
		autoprefixer: {
			build: {
				options:{
					browsers: ['last 2 version', 'ie 9'],
					map: true
				},
				src: 'app/css/style.css'
			}
		},
		/* ====================================================================================================================================================
		 *	 Watch and utilities
		 * ==================================================================================================================================================== */
		watch:{
			options:{
				livereload: true
			},
			less:{
				files: ['src/less/**'],
				tasks: ['less'],
				options:{
					livereload: false
				}
			},
			css:{
				files: ['app/css/style.css']
			}
		},
		notify:{
			start: {
				options:{
					title: 'Grunt started',
					message: 'Watch server started'
				}
			}
		},
		notify_hooks:{
			options:{
				enabled:true
			}
		},
		shell: {
			bower_update: {
				options: {
					stderr: false
				},
				command: 'bower install'
			}
		},
		clean: {
			img: ['img/min/**', 'img/sprite.min.png', 'img/sprite@2x.min.png']
		}
	});
	/* ====================================================================================================================================================
	 *	 Tasks Section
	 * ==================================================================================================================================================== */
	grunt.loadNpmTasks('grunt-notify');
	grunt.task.run('notify_hooks');

	grunt.registerTask('bower_update', 'Just run bower isntall', function(){
		grunt.loadNpmTasks('grunt-shell');
		grunt.task.run('shell:bower_update');
	});

	grunt.registerTask('modernizr', 'Build custom modernizr version', function(){
		grunt.loadNpmTasks('grunt-modernizr');
		grunt.task.run('modernizr');
	});

	grunt.registerTask('less', 'Less and autoprefixer', function(){
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.task.run('less:live');
		grunt.loadNpmTasks('grunt-autoprefixer');
		grunt.task.run('autoprefixer:build');
	});

	grunt.registerTask('svg', 'SVGmin', function(){
		grunt.loadNpmTasks('grunt-svgmin');
		grunt.task.run('svgmin');
	});

	grunt.registerTask('default', 'Watch', function(){
		grunt.task.run(['bower_update', 'less']);
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.task.run('notify:start');
		grunt.task.run('watch');
	});
};	