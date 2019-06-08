function secondToDate(result) {
	var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	return result = h + ":" + m + ":" + s;
}

var dom = document.getElementById("heat");
var moveChart = echarts.init(dom);
var yAxis = []
var xAxis = []
for (var i = 32; i >= 0; i--) {
	yAxis.push(i);
}

for (var i = 0; i <= 30; i++) {
	xAxis.push(i);
}
option1 = {
	title: {
		text: '人员移动轨迹图',
		top: 10,
		left: 20
	},
	grid: {
		left: 20,
		top: 50,
		right: 20,
		bottom: 20,
	},
	graphic: [{
		type: 'image',
		top: 50,
		left: 20,
		bottom: 30,
		right: 20,
		z: -10,
		style: {
			image: 'img/floor3.jpg',
			width: 765,
			height: 482,
		}
	}],
	xAxis: [{
			show: false
		},
		{
			show:false,
			data: xAxis
		}
	],
	yAxis: {
		show:false,
		data: yAxis
	},

	dataZoom: {
		type: 'inside'
	},
	series: []
};
moveChart.showLoading();

var max = 0;
var min = 1000;
moveChart.hideLoading();
moveChart.setOption(option1);
function Heap(data,pid) {
	var node = []
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == pid) {
			var infor = data[i].info;
			for (var j = 0; j < infor.length; j++) {

				var f = parseInt(infor[j].sid[0]);
				var x = parseInt(infor[j].sid.slice(3));
				var y = parseInt(infor[j].sid.slice(1, 3));
				var time = infor[j].end_time - infor[j].start_time;
				time = time <= 0 ? 0 : time;
				if (time > max) {
					max = time;
				}
				if (time < min) {
					min = time;
				}
				if (f == 1) {
					y = 32 - y;
				} else {
					y = 15 - y;
				}
				node.push([x, y, time, infor[j].start_time, infor[j].end_time]);
				// 				node.push({
				// 					"x":x,
				// 					"y":y,
				// 					"value":time,
				// 					"name":infor[j].start_time
				// 				})

			}
			//console.log(node);
			break;
		}

	}

	var links = node.map(function(item, idx) {
		return {
			source: idx,
			target: idx + 1
		};
	});
	links.pop();
	option1.series.push({
		xAxisIndex: 1,
		yAxisIndex: 0,
		type: 'graph',
		coordinateSystem: 'cartesian2d',
		data: node,
		links: links,
		edgeSymbol: ['none', 'arrow'],
		edgeSymbolSize: 5,
		legendHoverLink: false,
		lineStyle: {
			normal: {
				color: '#333'
			}
		},
		itemStyle: {
			normal: {
				borderWidth: 1,
				borderColor: '#333',
				
			}
		},
		label: {
			normal: {
				textStyle: {
					color: '#C93028',
					fontSize:18
				},
				position: 'top',
				formatter: function(params) {
					return secondToDate(params.data[3]) + "~" + secondToDate(params.data[4])
				}
			}
		},
		symbolSize: function(params) {

			return (params[2] - min) / (max - min) * 20 + 5
		},
		animationDelay: function(idx) {
			return idx * 100;
		}
	});

	moveChart.setOption(option1);
};
