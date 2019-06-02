var dom = document.getElementById("heap1");
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
			"category":0
		})
	}
	var caIndex = 1;
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].infor.length; j++) {
			if (data[i].infor[j].sim > 0.35) {
				links.push({
					"source": data[i].id,
					"target": data[i].infor[j].id.toString(),
					"value": data[i].infor[j].sim,
				})
				nodes[i].value++;
				category.push(caIndex);
				nodes[i].category = caIndex;
				innode.push([data[i].infor[j].id, caIndex]);
				caIndex++;
			}
		}
	}
	
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < innode.length; j++) {
			if (nodes[i].name == innode[j][0]) {
				nodes[i].value++;
				if (nodes[i].category == 0){
					nodes[i].category = innode[j][1]
				}
			}
		}
		if (nodes[i].value > 0) {
			nodes[i].symbolSize = nodes[i].value/10;
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
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'quinticInOut',
		series: [{
			name: 'Les Miserables',
			type: 'graph',
			layout: 'force',
			categories:category,
			data: _nodes,
			links: links,
			label: {
				normal: {
					position: 'right'
				}
			},
			force: {
				repulsion: 50
			},
			roam: true,
			lineStyle: {
				normal: {
					color: 'source',
					width: 3
				}
			},
		}]
	};

	myChart.setOption(option);
});
