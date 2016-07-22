define(function (require, exports, module) {
	var tpls = [
		require('../../modules/addstaff/template-html')
	];

	var Addstaff = function (opts){
		this.$el = opts.$el;
	};

	Addstaff.prototype = {
		init: function (){
			var me = this;
			me.$el.html(tpls[0]({name: 'hello'}));
		}
	}

	exports.init = function (options){
		var addstaff = new Addstaff({
			$el: options.$el,
			tplName: options.tplName
		});
		addstaff.init();
	}
});