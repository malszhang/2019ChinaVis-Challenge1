function secondToDate(result) {
	var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	return result = h + ":" + m + ":" + s;
}

var dom = document.getElementById("heat");
var myChart1 = echarts.init(dom);
var yAxis = []
var xAxis = []
for (var i = 32; i >= 0; i--) {
	yAxis.push(i);
}

for (var i = 0; i <= 30; i++) {
	xAxis.push(i);
}
option1 = {

	graphic:[
		{
			type:'image',
			top:60,
			left:81,
			z:-10,
			style:{
				image:'img/floor3.jpg',
				width:643,
				height:640*32/30,
                opacity: 0.4
			}
		}
	],
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
myChart1.showLoading();
var node = []
var max = 0;
var min = 1000;
var ids = [10000,10023];
$.get('json/day2_person.json', function(data) {
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == ids[1]) {
			var infor = data[i].info;
			for (var j = 0; j < infor.length; j++) {
				
				var f = parseInt(infor[j].sid[0]);
				var x = parseInt(infor[j].sid.slice(3));
				var y = parseInt(infor[j].sid.slice(1, 3));
				var time = infor[j].end_time-infor[j].start_time;
				time = time <= 0? 0: time;
				if (time > max){
					max = time;
				}
				if (time < min){
					min = time;
				}
				if (f == 1){
					y = 32-y;
				}else{
					y = 15-y;
				}
				node.push([x,y,time,infor[j].start_time,infor[j].end_time]);
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
	myChart1.hideLoading();
	option1.series.push({
		xAxisIndex: 1,
		yAxisIndex:0,
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
					color: '#333'
				},
				position: 'top',
				formatter: function(params){
					return secondToDate(params.data[3])+"~"+secondToDate(params.data[4])
				}
			}
		},
		symbolSize: function(params){
			
			return (params[2]-min)/(max-min)*20+5
		},
		animationDelay: function(idx) {
			return idx * 100;
		}
	});

	myChart1.setOption(option1);
});
