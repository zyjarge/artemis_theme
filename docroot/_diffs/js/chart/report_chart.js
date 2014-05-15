$(function() {
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=report_sum",
		success:function(data) {
			data = data.substring(1);
			$("#report_sum").html(data);
		}
    });
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=mc_report_percent",
		success:function(data) {
			var array = new Array();
			array = data.split("#");
			var adnum = parseInt(array[0]);
			var mcnum = parseInt(array[1]);
			var percent =  100 * adnum / (adnum + mcnum);
			percent = percent + "";
			percent = percent.substring(0,2) + "%";
			$("#mc_percent").html(percent);
		}
    });
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=work_weekday_day",
		success:function(data) {
			data = data.substring(1);
			data = parseInt(data);
			$("#workday_avg").html(data);
		}
    });
	
	var dataArray = new Array();
	
	$.ajax({
		type: "post",
		async:false,
		dataType:'text',
		url: "/artemis_access_log/get-chart-data?type=report_val",
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
			renderTo: "report_access_chart",
			zoomType : "xy",
		},
		title : {
			text : '各报告访问量'
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