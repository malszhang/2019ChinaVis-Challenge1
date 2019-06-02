var dom = document.getElementById("change");
var myChart2 = echarts.init(dom);
var date = []
var cnt = []
var aname = [
	["主会场", "1"],
	["分会场A", "2"],
	["分会场B", "3"],
	["分会场C", "4"],
	["分会场D", "5"],
	["海报区", "6"],
	["签到处", "7"],
	["厕所1", "8"],
	["厕所2", "9"],
	["厕所3", "10"],
	["展厅", "11"],
	["餐厅", "12"],
	["休闲区", "13"],
	["服务台", "14"],
	["room1", "15"],
	["room2", "16"],
	["room3", "17"],
	["room4", "18"],
	["room5", "19"],
	["room6", "20"],
	["扶梯1", "21"],
	["扶梯2", "22"],
	["扶梯3", "23"],
	["扶梯4", "24"],
	["入口1", "25"],
	["入口2", "26"],
	["入口3", "27"],
	["入口4", "28"],
	["出口1", "29"],
	["出口2", "30"],
	["出口3", "31"],
	["出口4", "32"],

]
var nodes = [];

var categories = [];
for (var i = 0; i < aname.length; i++) {
	categories[i] = {
		name: aname[i][0]
	};
	nodes[i] = {
		"name": aname[i][0],
		"value1": 0,
		"category": aname[i][0],
		"label": {
			"normal": {
				"show": true
			}
		},
		"symbolSize": 10
	};
}
function draw(_data){
	var links = [];
	var minL = 0;
	var minN = 0;
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
			nodes[_data[i].links[j].target - 1].value1++;
			Nvalue = nodes[_data[i].links[j].target - 1].value1;
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
			text: 'Les Miserables',
			subtext: 'Circular layout',
			top: 'bottom',
			left: 'right'
		},
		tooltip: {},
		//         legend: [{
		//             // selectedMode: 'single',
		//             data: categories.map(function (a) {
		//                 return a.name;
		//             })
		//         }],
		animationDurationUpdate: 1500,
		animationEasingUpdate: 'quinticInOut',
		tooltip: {
			trigger: 'axis',
			position: function(pt) {
				return [pt[0], '10%'];
			}
		},
		series: [{
			name: 'Les Miserables',
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
	myChart2.setOption(option2);
}


