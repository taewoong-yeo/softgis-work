var agent = navigator.userAgent.toLowerCase();
if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
	$(".fa-download").hide();
}else{
	
}

var colorArray = [ "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
		"#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A",
		"#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548",
		"#9E9E9E", "#607D8B" ];

const ADM_CD = [ [ 36020, '여수시' ], [ 3602011, '돌산읍' ], [ 3602031, '소라면' ],
		[ 3602032, '율촌면' ], [ 3602033, '화양면' ], [ 3602034, '남면' ],
		[ 3602035, '화정면' ], [ 3602036, '삼산면' ], [ 3602051, '동문동' ],
		[ 3602052, '한려동' ], [ 3602053, '중앙동' ], [ 3602054, '충무동' ],
		[ 3602055, '광림동' ], [ 3602056, '서강동' ], [ 3602057, '대교동' ],
		[ 3602058, '국동' ], [ 3602059, '월호동' ], [ 3602060, '여서동' ],
		[ 3602061, '문수동' ], [ 3602062, '미평동' ], [ 3602063, '둔덕동' ],
		[ 3602064, '만덕동' ], [ 3602065, '쌍봉동' ], [ 3602066, '시전동' ],
		[ 3602067, '여천동' ], [ 3602068, '주삼동' ], [ 3602069, '삼일동' ],
		[ 3602070, '묘도동' ] ]

const EMD_CD = [ [ 46130000, '여수시' ], [ 46130101, '종화동' ], [ 46130102, '수정동' ],
		[ 46130103, '공화동' ], [ 46130104, '관문동' ], [ 46130105, '고소동' ],
		[ 46130106, '동산동' ], [ 46130107, '중앙동' ], [ 46130108, '교동' ],
		[ 46130109, '군자동' ], [ 46130110, '충무동' ], [ 46130111, '연등동' ],
		[ 46130112, '광무동' ], [ 46130113, '서교동' ], [ 46130114, '봉강동' ],
		[ 46130115, '봉산동' ], [ 46130116, '남산동' ], [ 46130117, '국동' ],
		[ 46130118, '신월동' ], [ 46130119, '여서동' ], [ 46130120, '문수동' ],
		[ 46130121, '오림동' ], [ 46130122, '미평동' ], [ 46130123, '둔덕동' ],
		[ 46130124, '오천동' ], [ 46130125, '만흥동' ], [ 46130126, '덕충동' ],
		[ 46130127, '경호동' ], [ 46130128, '학동' ], [ 46130129, '학용동' ],
		[ 46130130, '안산동' ], [ 46130131, '소호동' ], [ 46130132, '시전동' ],
		[ 46130133, '신기동' ], [ 46130134, '웅천동' ], [ 46130135, '선원동' ],
		[ 46130136, '여천동' ], [ 46130137, '화장동' ], [ 46130138, '주삼동' ],
		[ 46130139, '봉계동' ], [ 46130140, '해산동' ], [ 46130141, '화치동' ],
		[ 46130142, '월하동' ], [ 46130143, '평여동' ], [ 46130144, '중흥동' ],
		[ 46130145, '적량동' ], [ 46130146, '월내동' ], [ 46130147, '묘도동' ],
		[ 46130148, '낙포동' ], [ 46130149, '신덕동' ], [ 46130150, '상암동' ],
		[ 46130151, '호명동' ], [ 46130250, '돌산읍' ], [ 46130310, '소라면' ],
		[ 46130320, '율촌면' ], [ 46130330, '화양면' ], [ 46130340, '남면' ],
		[ 46130350, '화정면' ], [ 46130360, '삼산면' ] ];

function chartContent(e) {
	var chartName = $(e.currentTarget).parents(".card-box").data("chart"), chartSelect = document
			.querySelector("#" + chartName), chartNumber = chartSelect
			.getAttribute('data-highcharts-chart'), chartObject = Highcharts.charts[chartNumber];
	var options = chartObject.userOptions;
	if (chartName != 'disChart' && chartName != "bldEmdTrde"
			&& chartName != "bldIncrease") {
		options.plotOptions.series.colorByPoint = true;
		delete options['colorAxis'];
	}
	options.chart.renderTo = 'modal-chart';
	$("#modalOption").find("button").show();
	if (chartName == "peopleAges") {
		options.series[0].data.sort(function(a, b) {
			if (Number(a.name.split('~')[0]) < b.name.split('~')[0])
				return -1;
			if (Number(a.name.split('~')[0]) > b.name.split('~')[0])
				return 1;
			return 0;
		})
	} else if (chartName == "disChart" || chartName == "bldEmdTrde"
			|| chartName == "bldIncrease") {
		$("#modalOption").find("button").hide();
		$(".modalShot").show();
	} else if (options.series.length > 1) {
		options.plotOptions.series.colorByPoint = false;
		$("[data-chart-type=area]").hide();
		$("[data-chart-type=pie]").hide();
		// $("#modalOption").hide();
	}
	new Highcharts.Chart(options);
}

function tableContent(dt) {

	$.ajax({
		type : "GET",
		url : Constant.CONTEXT_PATH + "/" + dt + '/trafficData.do',
		async : false,
		success : function(data) {

			$('#modal-table').find('.dashboard-modal-table').remove();
			let dmt = '';
			dmt += '<div class="dashboard-modal-table">';
			dmt += '<table>';
			dmt += '<thead>';
			dmt += '<tr>';
			dmt += '<th>분류</th>';
			dmt += '<th>사망</th>';
			dmt += '<th>중상</th>';
			dmt += '<th>경상</th>';
			dmt += '<th>부상</th>';
			dmt += '<th>대형사고</th>';
			dmt += '<th>중대여객</th>';
			dmt += '<th>중대화물</th>';
			dmt += '</tr>';
			dmt += '</thead>';
			dmt += '<tbody>';
			for (let i = 0; i < data.result.length; i++) {
				dmt += '<tr>';
				dmt += '<th>' + data.result[i].acdnt + '</th>';
				dmt += '<td>' + data.result[i].death + '</td>';
				dmt += '<td>' + data.result[i].imprtn_frght + '</td>';
				dmt += '<td>' + data.result[i].imprtn_pasngr + '</td>';
				dmt += '<td>' + data.result[i].inj + '</td>';
				dmt += '<td>' + data.result[i].lgz_acdnt + '</td>';
				dmt += '<td>' + data.result[i].ordnr + '</td>';
				dmt += '<td>' + data.result[i].serinj + '</td>';
				dmt += '</tr>';
			}
			dmt += '</tobdy>';
			dmt += '</table>';
			dmt += '</div>';
			$('#modal-table').find('.dashboard-modal-body').append(dmt);

		},
		error : function(error) {
			console.log(error);
			alert("에러");
		}
	});// ajax end
}

$(function(){
    // 모달
    $(".button-modal").on("click", function(e) {
        let dt = $(this).data('type');
        let dmt = $(this).data('modal-type');
        dashboardModal(e, dmt, dt);
    });
});

// modal function
function dashboardModal(e, dmt, dt) {
	let modal;
	let $_this = e.currentTarget;

	let chartHead = $($_this).parents(".card-box-btn").prev().text();
	$(".dashboard-modal-header p:nth-child(1)").text(chartHead);
	if (dmt == 'table') {
		modal = $("#modal-table");
		tableContent(dt);
	} else if (dmt == 'modal-chart') {
		modal = $("#modal-chart-default");
		chartContent(e);
	} else {
		modal = $("#newChart");
	}
	modal.fadeIn(100);
	modal.children().slideDown(500);
}

function stringTime(x) {
	let yyyy = x.toString().substring(0, 4);
	let mm = x.toString().substring(4, 6);
	return yyyy + "." + mm;
}
// 캡처 라이브러리
function saveAs(uri, filename) {
	// 캡쳐된 파일을 이미지 파일로 내보낸다.
	var link = document.createElement('a');
	if (typeof link.download === 'string') {
		link.href = uri;
		link.download = filename;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		window.open(uri);
	}
}

// 달력 라이브러리
function mp($el, opts) {
	let $element = $("#" + $el);
	let option = opts
			|| {
				monthNames : [ '1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)',
						'5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)',
						'10월(OCT)', '11월(NOV)', '12월(DEC)' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월',
						'8월', '9월', '10월', '11월', '12월' ],

				buttonImageOnly : '',
				changeYear : false,
				yearRange : 'c-2:c+2',
				dateFormat : 'yy-mm'
			}

	$($element).monthpicker(option);
};

function numberWithCommas(x) {
	var x = x.toString();
	if (x.indexOf('.') != -1) { // 소수점있을시
		var xArr = x.split('.');
		var temp = xArr[1];
		x = xArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return x + '.' + temp;
	}
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function() {
	$(function() {
		// 차트 타입 변경
		$(".cht-opt-btn").on("click", function() {
			var chartType = $(this).data("chart-type");
			var chartId = $(this).parents(".dashboard-modal-box").data("chart")
			changeType(chartId, chartType);
		});
		$(".test-opt")
				.click(
						function() {
							var chartType = $(this).data("chart-type"), chartName = $(
									this).parents(".card-box").data("chart"), chartSelect = document
									.querySelector("#" + chartName), chartNumber = chartSelect
									.getAttribute('data-highcharts-chart'), chartObject = Highcharts.charts[chartNumber];
							chartObj.event.addChartSeries(chartObject);
						});
		$(".test-opt2").click(
				function() {
					chartName = $(this).parents(".card-box").data("chart"),
							chartSelect = document.querySelector("#"
									+ chartName), chartNumber = chartSelect
									.getAttribute('data-highcharts-chart'),
							chartObject = Highcharts.charts[chartNumber];
					chartObj.event.setSeriesData(chartObject);
				});
	});

	$(".close-btn").on("click", function() {
		$(".dashboard-modal-box").slideUp(300);
		$(this).parents(".dashboard-modal").fadeOut(500);
	});

	// 캡쳐 라이브러리
	$(".shot").on(
			"click",
			function() {
				var agent = navigator.userAgent.toLowerCase();
				if ((navigator.appName == 'Netscape' && agent
						.indexOf('trident') != -1)
						|| (agent.indexOf("msie") != -1)) {
					alert("인터넷 익스플로어에서 는 기능을 지원하지 않습니다. \n다른 브라우저를 이용해주세요.");
					return false;
				} else {
					var screenDom = $(this).parents(".card-box")[0];
					var chartName = $(this).parents(".card-title").find("h3")
							.text()
							+ " 차트";
					// 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
					html2canvas(screenDom).then(
							function(canvas) {
								saveAs(canvas.toDataURL('image/png'), chartName
										+ ".png");
							});
				}
			});

	// 캡쳐 라이브러리
	$(".modalShot").on(
			"click",
			function() {
                var transform = $(".dashboard-modal-box").css("transform");
                $(".dashboard-modal-box").css("transform", "none");
				var agent = navigator.userAgent.toLowerCase();
				if ((navigator.appName == 'Netscape' && agent
						.indexOf('trident') != -1)
						|| (agent.indexOf("msie") != -1)) {
					alert("인터넷 익스플로어에서 는 기능을 지원하지 않습니다. \n다른 브라우저를 이용해주세요.");
					return false;
				} else {
					var screenDom = $(this).parents(".dashboard-modal-box")[0];
					var chartName = $(this).parents(".dashboard-modal-header")
							.find("p").text()
							+ " 차트";
					html2canvas(screenDom).then(
							function(canvas) {
								saveAs(canvas.toDataURL('image/png'), chartName
										+ ".png");
							});
				}
                $(".dashboard-modal-box").css("transform", transform);
			});

	// 이벤트 =====================================
	// $("#sDate").monthpicker({
	// monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)',
	// '6월(JUN)',
	// '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
	// monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',
	// '10월', '11월', '12월'],

	// buttonImageOnly: '',
	// changeYear: false,
	// yearRange: 'c-2:c+2',
	// dateFormat: 'yy-mm',
	// maxDate: new Date(),
	// });
	$("#eDate").monthpicker(
			{
				monthNames : [ '1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)',
						'5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)',
						'10월(OCT)', '11월(NOV)', '12월(DEC)' ],
				monthNamesShort : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월',
						'8월', '9월', '10월', '11월', '12월' ],

				buttonImageOnly : '',
				changeYear : false,
				yearRange : 'c-2:c+2',
				dateFormat : 'yy-mm',
				maxDate : new Date(),
			});

	// $("#sDate").monthpicker("setDate", '-2M');
	$("#eDate").monthpicker("setDate", 'today');
	// $('#eDate').monthpicker("option", "onClose", function ( selectedDate ) {
	// $("#sDate").monthpicker( "option", "maxDate", selectedDate );
	// });

});

function sorting(data) {
	if (data[0].hiddenValue) {
		data.sort(function(a, b) {
			if (Number(a.hiddenValue) < b.hiddenValue)
				return -1;
			if (Number(a.hiddenValue) > b.hiddenValue)
				return 1;
			return 0;
		});
	}
}
