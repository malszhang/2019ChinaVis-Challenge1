var dom = document.getElementById("heap");
var myChart = echarts.init(dom);
myChart.showLoading();
$.get('data/day1.json', function(data) {
	var x_data=[], y_data=[];
	for (var i = 0; i <= 15; i++){
		x_data.push(i)
	}
	for (var i = 0; i <= 29; i++){
		y_data.push(i)
	}
 	myChart.hideLoading();
	option = {
		baseOption: {
			timeline: {
				axisType: 'category',
				orient: 'vertical',
				autoPlay: true,
				inverse: true,
				playInterval: 1000,
				left: null,
				right: 0,
				top: 20,
				bottom: 20,
				width: 55,
				height: null,
				data: []
			},
			grid: {},
			xAxis: {data:x_data},
			yAxis: {data:y_data},
			series: [{
				type: 'scatter',
				symbolSize: 3,
				data:[]
			}],
		},
		options: []
	};
	var _data = [];
	for (var n = 0; n < data.length; n++) {
		_data=[];
		for (var j = 0; j < data[n].length; j++){
			//floor = data[n][j][1][0];
			x = 15 - data[n][j][1].slice(1, 3);
			y = data[n][j][1].slice(3);
			_data.push([x, y])
		}
		if (n % 30 == 0){
			option.baseOption.timeline.data.push(data[n][2]);
		}
		option.options.push({
			series: [{
				type: 'scatter',
				symbolSize: 3,
				data:_data
			}],
			
		});

	}
	myChart.setOption(option);
});
