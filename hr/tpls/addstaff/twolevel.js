/*
 * 二级联动
 * 说明：二级菜单只能在一级菜单有值的情况下输入, 依赖于jQuery
 * 作者：Mengxuan
 */
define(function (require, exports, module) {
	module.exports = function ($first, $second){
		$first.on('change', function (){
			var $this = $(this);
			var value = $this.prop('value');
			if (value === 'false') {
				$second.prop('value', '').prop('disabled', true).prop('required', false);
				return;
			}
			$second.prop('disabled', false).prop('required', true);
		});
	}
});