define(function (require, exports, module) {
	var tpls = [
		require('../../modules/addstaff/template-html'),
		require('../../modules/addstaff/staffmsg-html')
	];
	var EventBus = require('./eventBus');
	var eventBus = new EventBus();
	var addstaffStatus = 1;
	var statusCount = 5;
	var staffTpls = ['addstaff'];

	var Addstaff = function (opts){
		this.$el = opts.$el;
	};

	Addstaff.prototype = {
		init: function (){
			var me = this;
			me.$el.html(tpls[0]({name: 'hello'}));
			me.renderProc();

			window.Parsley.addValidator('addsvalidateSelect', {
				// requirementType: 'string',
				validateString: function(value) {
					if (value === 'false') {
						return false;
					}
					return true;
				}
			});
			me.renderForm();

			me.eventBind();
		},
		// 处理进度条
		renderProc: function(){
			var me = this;
			var $proc = $('.process-wraper li', me.$this);
			$proc.removeClass('proc-modify').removeClass('proc-triangle-modify-before').removeClass('proc-triangle-modify-after');
			$($proc.get(addstaffStatus - 1)).addClass('proc-modify');
			if (addstaffStatus === 1) {
				$($proc.get(addstaffStatus - 1)).addClass('proc-triangle-modify-after');
				return;
			}
			if (addstaffStatus === statusCount) {
				$($proc.get(addstaffStatus - 2)).addClass('proc-triangle-modify-before');
				return;
			}
			$($proc.get(addstaffStatus - 2)).addClass('proc-triangle-modify-before');
			$($proc.get(addstaffStatus - 1)).addClass('proc-triangle-modify-after');
		},
		// 处理表单
		renderForm: function (){
			var me = this;
			// 页面处理
			me[staffTpls[addstaffStatus - 1]]();
		},
		// 添加
		addstaff: function (){
			var me = this;
			var $forms = $('.adds-form', me.$el);
			$forms.html(tpls[addstaffStatus]());
			me.timepicker($forms);

			var $form = $('form', $forms);
			$form.parsley().on('field:error', function (obj){
				obj.$element.addClass('adds-error').siblings('.msg-prompt').show();
			}).on('field:success', function (obj){
				obj.$element.removeClass('adds-error').siblings('.msg-prompt').hide();
			}).on('form:submit', function (obj){
				// 下一步
				var data = $form.serialize();
				console.log(data);
				addstaffStatus++;
				eventBus.fire('statusChange:next');
				return false;
			});

			var twolevel = require('./twolevel');
			twolevel($('#cerType'), $('#cerNum'));

			me.prevStep($forms);
		},
		// 上一步
		prevStep: function ($el){
			var $prev = $('.prev', $el);
			if (addstaffStatus === 1) {
				$prev.css('cursor', 'not-allowed');
				return;
			}
		},
		// 下一步
		// nextStep: function (options){
		// 	var $next = $('.next', options.$el);
		// 	console.log($next);
		// 	$next.on('next', function (){
		// 		console.log(2333333);
		// 	});
		// },
		// 处理日历
		timepicker: function ($form){
			$('.adds-timepicker', $form).datetimepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				language: 'zh-CN',
				todayHighlight: true,
				minView: 2,// 最小为天数
				pickerPosition: 'bottom-right'
			}).on('changeDate', function (ev){
				$(ev.target).removeClass('adds-error').siblings('.msg-prompt').hide();
			});
		},
		// // 处理表单元素，聚焦事件
		// focus: function (){
		// 	var me = this;
		// 	var form = $('.adds-form', me.$el)[0];
		// 	// 时间捕获并加载
		// 	form.addEventListener('focus', function (event){
		// 		event = event || window.event;
		// 		$target = $(event.target);
		// 		if ($target.hasClass('staffmsg-input')) {
		// 			$target.siblings('.msg-prompt').show();
		// 			$target.parent().siblings().addClass('msg-prompt-sibling');
		// 		}
		// 	}, true);
		// 	form.addEventListener('blur', function (event){
		// 		event = event || window.event;
		// 		$target = $(event.target);
		// 		var $this = $(this);
		// 		$('.msg-prompt', $this).hide();
		// 		$('.msg-prompt-sibling', $this).removeClass('msg-prompt-sibling');
		// 		// console.log(23);
		// 	}, true);
		// },
		eventBind: function (){
			var me = this;
			eventBus.on('statusChange', function (){
				me.renderProc();
			});
			eventBus.on('statusChange:prev', function (){
				// me.renderProc();
			});
			eventBus.on('statusChange:next', function (){
				// me.renderProc();
			});
			$('#prev').on('click', function (){
				if (addstaffStatus !== 1) {
					addstaffStatus--;
					eventBus.fire('statusChange:prev');
				}
			});
			$('#next').on('click', function (){
				if (addstaffStatus !== statusCount) {
					addstaffStatus++;
					eventBus.fire('statusChange:next');
				}
			});
			// 聚焦则显示提示文字
			$('.adds-form', me.$el).focus(function (evt){
				console.log(123);
			});
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