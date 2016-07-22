define(function (require, exports, module) {
	var tpls = [
		// require('./template-html')
	];

	var Entry = function (opts){
		// this.opts = $.extend()
		this.$el = opts.$el;
	}
	Entry.prototype = {
		init: function (){
			console.log(tpls[0]);
		}
	}

	exports.init = function (options){
		var entry = new Entry({
			$el: options.$el,
			tplName: options.tplName
		});
		entry.init();
	}
});