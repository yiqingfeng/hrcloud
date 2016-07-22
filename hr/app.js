define(function(require, exports, module) {
	new (Backbone.Router.extend({
		routes: {
			'hr/index/=/param-:value': 'index',
			'hr/addstaff': 'addstaff'
		},
		index: function (value){
			var options = {
				tplName: 'index',
				$el: $('#sub-tpl .tpl-c'),
				param: value
			}
			require('./tpls/index/index').init(options);
		},
		addstaff: function (){
			var options = {
				tplName: 'addstaff',
				$el: $('#sub-tpl .tpl-c')
			}
			require('./tpls/addstaff/index').init(options);
		}
	}));

	Backbone.history.start();// 监控 hashchange 事件并分配路由

	// var routes = {routes: {}};
	// // 仅允许id和param两种参数
	// var tplRouterReg = function (path){
	// 	var router = path.substring(1);
	// 	var tplName = path.match(/#hr\/([a-zA-Z]+)/)[1];
	// 	routes.routes[router] = tplName;
	// 	var tplsEntry = './tpls/' + tplName + '/index.js';
	// 	var tpls = require(tplsEntry);
	// 	routes[tplName] = function (){
	// 		console.log
	// 		// var tpls = './tpls/' + tplName + '/index.js';
	// 		// console.log(tpls);
	// 		// console.log(require(tpls));
	// 		// require('./tpls/' + 'index' + '/index').init();
	// 	}
	// } 

	// tplRouterReg('#hr/index/=/:param-:value');

	// console.log(routes.index);

	// new (Backbone.Router.extend(routes));
	// Backbone.history.start();
});