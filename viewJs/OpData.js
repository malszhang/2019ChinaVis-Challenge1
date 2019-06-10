//会场的进出情况
var dom = document.getElementById("inout");
var inoutChart = echarts.init(dom);
var date = []
var cnt = []
var aname1 = [
	["主会场", "1"],
	["分会场A", "2"],
	["分会场B", "2"],
	["分会场C", "2"],
	["分会场D", "2"],
	["海报区", "3"],
	["签到处", "4"],
	["厕所1", "5"],
	["厕所2", "5"],
	["厕所3", "5"],
	["展厅", "6"],
	["餐厅", "7"],
	["休闲区", "8"],
	["服务台", "9"],
	["room1", "10"],
	["room2", "10"],
	["room3", "10"],
	["room4", "10"],
	["room5", "10"],
	["room6", "10"],
	["扶梯1", "11"],
	["扶梯2", "11"],
	["扶梯3", "11"],
	["扶梯4", "11"],
	["入口1", "12"],
	["入口2", "12"],
	["入口3", "12"],
	["入口4", "12"],
	["出口1", "13"],
	["出口2", "13"],
	["出口3", "13"],
	["出口4", "13"],

]
var Color1 = ["#c40b13","#00334e","#5c8d89","#900c3f","#556fb5",
				"#774e26","#729d39","#df4d19","#9873b9","#444444",
				"#F25157","#339CC7","#190036"]
function draw(_data){
	var nodes = [];
	
	var categories = [];
	for (var i = 0; i < aname1.length; i++) {
		categories[i] = {
			name: aname1[i][1]
		};
		nodes[i] = {
			"name": aname1[i][0],
			"value1": 0,
			"category": aname1[i][1],
			"label": {
				"normal": {
					"show": true
				}
			},
			"symbolSize": 10,
			// "itemStyle":{
			// 	"color":Color[i]
			// }
		};
	}
	var links = [];
	var minL = 1000;
	var minN = 1000;
	var maxL = 0;
	var maxN = 0;
	for (var i = 0; i < _data.length; i++) {
		for (var j = 0; j < _data[i].links.length; j++) {
			source = _data[i].links[j].source - 1
			target = _data[i].links[j].target - 1
			flag = 0;
			for (var k = 0; k < links.length; k++) {
				if (links[k].source == source && links[k].target == target) {
					links[k].value++;
					Lvalue = links[k].value;
					if (minL > Lvalue) minL = Lvalue;
					if (maxL < Lvalue) maxL = Lvalue;
					flag = 1;
					break;
				}
			}
			if (flag == 0) {
				links.push({
					"source": source,
					"target": target,
					"value": 1,
					"lineStyle": {
						"width": 3
					}
	
				});
			}
			//nodes[source].value1--;
			nodes[target].value1++;
			Nvalue = nodes[target].value1;
			if (minN > Nvalue) minN = Nvalue;
			if (maxN < Nvalue) maxN = Nvalue;
		}
	}
	for (var k = 0; k < links.length; k++) {
		links[k].lineStyle.width = (links[k].value - minL) / (maxL - minL) * 10 + 3;
	}
	for (var k = 0; k < nodes.length; k++) {
		nodes[k].symbolSize = (nodes[k].value1 - minN) / (maxN - minN) * 30 + 5;
	}
	option2 = {
		title: {
			text: '场地间人员出入图',
			top: 10,
			left: 20
		},

		color:Color1,
		tooltip: {},
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'quinticInOut',
		tooltip: {
			trigger: 'axis',
			position: function(pt) {
				return [pt[0], '10%'];
			}
		},
		series: [{
			type: 'graph',
			layout: 'circular',
			circular: {
				rotateLabel: true
			},
			data: nodes,
			links: links,
			categories: categories,
			roam: true,
			focusNodeAdjacency: true,
			itemStyle: {
				normal: {
					borderColor: '#fff',
					borderWidth: 1,
					shadowBlur: 10,
					shadowColor: 'rgba(0, 0, 0, 0.3)'
				}
			},
			label: {
				normal: {
					position: 'right',
					formatter: '{b}'
				}
			},
			lineStyle: {
				normal: {
					color: 'source',
					curveness: 0.3,
				}
			},
			emphasis: {
				lineStyle: {
	
				}
			}
		}]
	};
	inoutChart.setOption(option2);
}


