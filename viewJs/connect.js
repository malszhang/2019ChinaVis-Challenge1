//人员关系图
var dom = document.getElementById("connect");
var myChart = echarts.init(dom);
var nodes = []
var links = []
var innode = []
var _nodes = []
var category = []
myChart.showLoading();
$.get('json/connect.json', function(data) {
	for (var i = 0; i < data.length; i++) {
		nodes.push({
			"name": data[i].id,
			"symbolSize": 10,
			"value": 0,
			"draggable": true,
			"category": 0
		})
	}
	var caIndex = 1;
	var flag = 0;
	var index;
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].infor.length; j++) {
			if (data[i].infor[j].sim > 0.4) {
				flag = 1;
				links.push({
					"source": data[i].id,
					"target": data[i].infor[j].id.toString(),
					"value": data[i].infor[j].sim,
					//"value":5
				})
				nodes[i].value++;
				
				innode.push([data[i].infor[j].id, caIndex]);
			}
		}
		if (flag == 1){
			category.push(caIndex);
			nodes[i].category = caIndex;
			caIndex++;
		}
	}

	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < innode.length; j++) {
			if (nodes[i].name == innode[j][0]) {
				nodes[i].value++;
				nodes[i].category = innode[j][1]
			}
		}
		if (nodes[i].value > 0) {
			nodes[i].symbolSize = nodes[i].value;
			_nodes.push(nodes[i]);
		}
	}

	myChart.hideLoading();

	option = {
		title: {
			text: 'Les Miserables',
			subtext: 'Default layout',
			top: 'bottom',
			left: 'right'
		},
		tooltip: {},
		//animationDurationUpdate: 1500,
		//animationEasingUpdate: 'quinticInOut',
		toolbox: {
			show: true,
			left: 'right',
			iconStyle: {
				normal: {
					borderColor: '#000'
				}
			},
			feature: {},
			z: 202
		},
		brush:{
			brushLink:'all',
			inBrush:{
				
				opacity:1,
				symbolSize:14
			},
			outOfBrush:{
				color:'#fff',
				opacity:0.2
			},
			z:10
		},
		series: [{
			name: 'Les Miserables',
			type: 'graph',
			layout: 'force',
			//animation: false,
			categories: category,
			
			data: _nodes,
			links: links,
			label: {
				normal: {
					position: 'right'
				}
			},
			force: {
				initLayout: 'circular',
				repulsion: 20,
				gravity: 0.2,
				edgeLength: 5
			},

			roam: true,
			focusNodeAdjacency: true,
			lineStyle: {
				normal: {
					color: 'source',
					width: 3,
					//curveness:0.5
				}
			},
		}]
	};

	myChart.setOption(option);
});
