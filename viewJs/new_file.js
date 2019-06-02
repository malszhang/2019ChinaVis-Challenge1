var dom = document.getElementById("heap");
var myChart = echarts.init(dom);
var date = []
var cnt = []
var _data = [{
		value: 10454605,
		name: '0-0.1'
	}, {
		value: 2644867,
		name: '0.1-0.2'
	},
	{
		value: 667988,
		name: '0.2-0.3'
	},
	{
		value: 42073+606+1,
		name: '>0.3'
	},
// 	{
// 		value: 606,
// 		name: '0.4-0.5'
// 	},
// 	{
// 		value: 1,
// 		name: '0.5-0.6'
// 	},
// 	{
// 		value: 0,
// 		name: '0.6-1'
// 	}
]
// myChart.showLoading();
// $.get('json/test.json', function(data) {
// 	myChart.hideLoading();
// 	var k = 0;
// 	for (var i = 0; i < data.length; i++) {
// 		for (var j = 0; j < data[i].infor.length; j++) {
// 			if (data[i].infor[j].sim > 0.2 && data[i].infor[j].sim <= 0.3) {
// 				_data[0].value++
// 			} else if (data[i].infor[j].sim > 0.3 && data[i].infor[j].sim <= 0.4) {
// 				_data[1].value++
// 			} else if (data[i].infor[j].sim > 0.4 && data[i].infor[j].sim <= 0.5) {
// 				_data[2].value++
// 			} else if (data[i].infor[j].sim > 0.5 && data[i].infor[j].sim <= 0.6) {
// 				_data[3].value++
// 			} else if (data[i].infor[j].sim > 0.6 && data[i].infor[j].sim <= 1) {
// 				_data[4].value++
// 			}
// 		}
// 	}
	option = {
		title: {
			text: '节点相似度分布',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['0-0.1', '0.1-0.2', '0.2-0.3','>0.3']
		},
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: _data,
			label: {
				noemal: {
					formatter: "{b} : {c} ({d}%)"
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	myChart.setOption(option);
// });
