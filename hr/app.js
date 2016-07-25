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

	var test = {
        'data' : [
            { "id" : "ajson1", "parent" : "#", "text" : "Simple root node"},
            { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
            { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
            { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" },
            { "id" : "ajson5", "parent" : "#", "text" : "node" },
            { "id" : "ajson6", "parent" : "ajson5", "text" : "Root node 2" },
            { "id" : "ajson7", "parent" : "ajson6", "text" : "Child 1" },
            { "id" : "ajson8", "parent" : "ajson6", "text" : "Child 2" }
        ]
    };
	var $department = $('<div id="department"></div>');
	$department.jstree({
		 "core": {
            // "themes": {
            //     "responsive": false,
            //     "dots": false,
            //     "icons": false,
            //     "url": true
            // },
            // so that create works
            "check_callback": true,
            "dblclick_toggle":false,

            //data
            'data':test.data
        }
	});
	$department.bind("select_node.jstree",function(e,data){
        if(!$department.jstree("is_open",data.node)) {
            $department.jstree("open_node", data.node);
        }
        else {
            $department.jstree("close_node", data.node);
        }
        // console.log(data.node);
        // console.log(data.node.children.length);
        // window.location.hash = data.node.id;
    });
	$('#g-side .wraper').html($department)

});