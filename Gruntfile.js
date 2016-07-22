module.exports = function (grunt){

	var srcPath = './hr/',
		srcAllJS = srcPath + '/tpls/',
		// srcAllLESS = srcPath + 'less/',
		// srcAllCss = srcPath + 'css/',
		srcTepPath = srcPath + 'modules/';

	grunt.initConfig({
		'jst': {
			options:{
				amd: true,// 输出AMD模块文件，即用define函数包起来
				prettify: true,// 编译成一行
				namespace: false
			},
			files: {
				expand: true,
                cwd: srcTepPath,
                src: ['**/*.html'],
                dest: srcTepPath,
                ext: '-html.js' //编译后文件扩展名，a.html-->a-html.js
			}
		},
		// 'less': {
		// 	main: {
		// 		files: {
		// 			'css/all.css': 'less/all.less'
		// 			// srcAllCss+'all.css': (srcAllLESS+'all.less')
		// 		}
		// 	}
		// },
		'watch': {
			css: {
				options: {
					livereload: true,
					spawn: false
				},
				files: [srcTepPath + '**/*.html'],
				tasks: ['jst']
			}
		},
		'jshint': {
			options: {
				curly: true,
				eqnull: true,
				// eqeqeq: true,
				undef: true,
				laxbreak: true, //不检查换行
                scripturl: true, //容忍javascript:void(0)
				devel: true, // 允许alert,console
				loopfunc: true, //允许循环内写闭包函数
				globals: {
					"define": true,
					'window': true,
					'_': true,
					'$': true,
					'Backbone': true
				},
				'-W030': true, //忽略：一行内有多条表达式，a = b, c = d;
                '-W018': true, //忽略：Confusing use of '!'
                '-W084': true, //忽略：表达式内变量赋值，if(a = fn())
                '-W069': true, //忽略：['{a}'] is better written in dot notation
                '-W041': true, //忽略：Use '===' to compare with
                '-W033': true, //忽略: Missing semicolon漏掉分号
                '-W032': true, //忽略：Unnecessary semicolon 不必要的分号
                '-W099': true, //忽略： Mixed spaces and tabs
                '-W065': true //忽略：parseInt的第二个参数Missing radix parameter
				// reporterOutput: 'jshint.txt'
			},
			src: [srcAllJS + '/**/*.js', '!' + srcAllJS + '/**/*-html.js']
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jst');

	grunt.registerTask('default', ['jshint', 'watch']);
}