$(function() {
	categories = [];
	series = [];
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=date_access_val",
		success:function(data) {
			var array = new Array();
			array = data.split("#");
			categories = array[0].split(",");
			
			seriesData = new Array();
			seriesData = array[1].split(",");
			
			for(var i = 0; i < seriesData.length; i++) {
				seriesData[i] = parseInt(seriesData[i]);
			}
			
			var one_week_sum = 0;
			for(var i = seriesData.length - 7; i < seriesData.length; i++) {
				one_week_sum += seriesData[i];
			}
			
			$("#one_week").html(one_week_sum);
			
			series = [{name:'',data:seriesData}];
		}
    });
	
	chartObj = {
		chart : {
			type : 'column',
			renderTo: "date_access_chart",
			zoomType : "xy",
		},
		title : {
			text : '近一个月访问量'
		},
		xAxis : {
			categories : categories,
			title : {
				text : null
			},
			 labels: {
             	rotation : 90
             }
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