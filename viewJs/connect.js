//人员关系图
var dom = document.getElementById("connect");
var connectChart = echarts.init(dom);

connectChart.showLoading();
var nodes = []
var links = []
$.get('json/connect.json', function(data) {
	
	var innode = []
	var _nodes = []
	var category = []
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
					"value1": data[i].infor[j].sim,
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
	var max = 0;
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < innode.length; j++) {
			if (nodes[i].name == innode[j][0]) {
				nodes[i].value++;
				nodes[i].category = innode[j][1]
			}
		}
		if (nodes[i].value > 0) {
			nodes[i].symbolSize = (nodes[i].value-1)/6*20+10;
			_nodes.push(nodes[i]);
		}

	}

	connectChart.hideLoading();

	option = {
		grid:{
			top:10,
			left:50,
			right:50,
			bottom:10
		},
		title: {
			text: '人员关系图',
			top: 10,
			left: 20
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
		series: [{
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
				repulsion: 50,
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

	connectChart.setOption(option);
});
