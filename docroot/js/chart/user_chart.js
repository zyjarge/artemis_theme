$(function() {
	categories = [];
	series = [];
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=user",
		success:function(data) {
			var array = new Array();
			array = data.split("#");
			categories = array[0].split(",");
			
			seriesData = new Array();
			seriesData = array[1].split(",");
			
			for(var i = 0; i < seriesData.length; i++) {
				seriesData[i] = parseInt(seriesData[i]);
			}
			series = [{name:'',data:seriesData}];
		}
    });
	
	chartObj = {
		chart : {
			type : 'bar',
			renderTo: "user_access_chart",
			zoomType : "xy",
		},
		title : {
			text : '2月20号以后各用户访问量'
		},
		xAxis : {
			categories : categories,
			title : {
				text : null
			},
		},
		yAxis : {
			min : 0,
			title : {
				text : '访问量',
			},
			labels : {
				overflow : 'justify',
				formatter: function() {
                 	var num = Highcharts.numberFormat(this.value, 0, ".", ","); 
                 	return num;
                }
			}
		},
		tooltip : {
			valueSuffix : ''
		},
		plotOptions : {
			bar : {
				dataLabels : {
					enabled : true
				}
			}
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : -40,
			y : 100,
			floating : true,
			borderWidth : 1,
			backgroundColor : (Highcharts.theme
					&& Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
			shadow : true
		},
		credits : {
			enabled : false
		},
		series : series
	};

	new Highcharts.Chart(chartObj);
});


$(function() {
	var dataArray = new Array();
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=chart_val",
		success:function(data) {
			var array = new Array();
			array = data.split("#");
			categories = array[0].split(",");
			
			seriesData = new Array();
			seriesData = array[1].split(",");
			
			for(var i = 0; i < seriesData.length; i++) {
				dataArray.push([categories[i], parseInt(seriesData[i])]);
			}
		}
    });
	
	chartObj = {
		chart : {
			type : 'pie',
			renderTo: "user_chart_access_chart",
			zoomType : "xy",
		},
		title : {
			text : '各用户图表访问量'
		},
		tooltip : {
			valueSuffix : ''
		},
		plotOptions : {
			bar : {
				dataLabels : {
					enabled : true
				}
			}
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : -40,
			y : 100,
			floating : true,
			borderWidth : 1,
			backgroundColor : (Highcharts.theme
					&& Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
			shadow : true
		},
		credits : {
			enabled : false
		},
		series: [{
	            type: 'pie',
	            name: 'Browser share',
	            data: dataArray
	        }]
	};

	new Highcharts.Chart(chartObj);
});