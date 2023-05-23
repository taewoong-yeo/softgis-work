import Highchart from '../modules/adminHighcharts';
import { Map, MapDataVisualizer } from '../modules/map';
import Loading from '../modules/loading';

function DbUrRoute() {
	const $map = $('#MAP');
	let $data = null;

	const ADM_LINE = {
		'종로구': [[197683,455054]],
		'중구': [[199622,450943]],
		'용산구': [[198167,448009]],
		'성동구':	[[203647,450059]],
		'광진구':	[[207784,449724]],
		'동대문구': [[205063,453786]],
		'중랑구':	[[208343,455277]],
		'성북구':	[[201522,456135]],
		'강북구':	[[200739,460235]],
		'도봉구':	[[202901,463291]],
		'노원구': [[206591,461316]],
		'은평구': [[193560,457731]],
		'서대문구': [[194701,453041]],
		'마포구': [[191868,450916]],
		'양천구': [[187954,446853]],
		'강서구': [[184488,451401]],
		'구로구': [[187321,443797]],
		'금천구': [[191234,439958]],
		'영등포구': [[192315,446928]],
		'동작구': [[195894,444468]],
		'관악구': [[195148,440927]],
		'서초구': [[203050,441672]],
		'강남구': [[205473,444058]],
		'송파구': [[209760,445064]],
		'강동구': [[213189,450022]]
	};

	const map = new Map($map, {
		type: 'none',
		defaultMinZoom: 1,
		defaultMaxZoom: 15,
		defaultZoom: 11,
//		defaultExtentLimit: [14122708.945016740,4480288.388548866, 14134370.694298401,4493752.689251301],
		centerCoord: [198410,451028]
	});
	
	const visShadow = new MapDataVisualizer(map, {}, {
		style: new ol.style.Style({
			fill: new ol.style.Fill({ color: 'rgba(0,0,0,.2)' })
		})
	});

	const vis = new MapDataVisualizer(map, {}, {
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
			fill: new ol.style.Fill({ color: '#fff' })
		}),
		selectedStyle: new ol.style.Style({
			stroke: new ol.style.Stroke({ color: '#6D8A10', width: 3 }),
			fill: new ol.style.Fill({ color: '#6D8A10' }),
			zIndex: 98
		}),
		mapStyler: (feature, style, args) => {
			style.getFill().setColor('#d2e0a5');
		}
	});

	(async () => {
		Loading.show();

		try {
			await loadFeatures();
			await loadOverlay();

			vis.addSelect('click', onMapSelect);
			
			onMapInitalized();
		} finally {
			Loading.hide();
		}

		function onMapInitalized() {
//			$map.trigger('ol-init', [map.map, vis.dataCache['seoulMap'].data]);
		}

		function onMapSelect(e) {
			const selected = e.selected.shift();
			$("#nmSgg").val(selected.values_.sigungu_nm);
			$("#sggSelect").val(selected.values_.sigungu_cd);
			getChart();
		}
	})();

	async function loadFeatures() {
		const seoulMap = await $.get(Constant.CONTEXT_PATH + '/dashboardSeoulMap.do');
		const seoulMapGeoJSON = JSON.parse(seoulMap.result);
		const seoulMapFeature = MapDataVisualizer.convertGeoJSONToFeatures(seoulMapGeoJSON);
		const seoulMapShadow = seoulMapFeature.map(v => {
			const clone = v.clone();
			const geom = clone.getGeometry();

			geom.translate(-100, -100);

			return clone;
		});

		visShadow.dataCache['seoulMap'] = { data: seoulMapShadow };
		vis.dataCache['seoulMap'] = { data: seoulMapFeature };
		$data = vis.dataCache['seoulMap'].data;
		//await visShadow.showDataset('seoulMap');
		await vis.showDataset('seoulMap');
	}

	async function loadOverlay() {
		const features = vis.dataCache['seoulMap'].data;

		const points = [];
		const lines = [];

		for(const i in features) {
			const feature = features[i];
			const featureName = feature.values_.sigungu_nm;
			const featureLine = ADM_LINE[featureName];

			points.push(new ol.Feature({ geometry: new ol.geom.Point(featureLine[0]) }));
			lines.push(new ol.Feature({ geometry: new ol.geom.LineString(featureLine) }));

			const container = document.createElement('div');
			const content = document.createElement('div');

			container.classList.add('ol-label');
			container.appendChild(content);
			container.style.backgroundColor = '#b4bf83';

			content.classList.add('ol-label-content');
			content.innerHTML = featureName;

			document.body.appendChild(container);

			const overlay = new ol.Overlay({
				element: container,
				position: featureLine[featureLine.length - 1],
				stopEvent: false
			});

			map.map.addOverlay(overlay);
		}

		const source = new ol.source.Vector({
			features: points.concat(lines)
		});

		const layer = new ol.layer.Vector({
			zIndex: 99,
			source: source,
			style: new ol.style.Style({
				stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
				image: new ol.style.Circle({ fill: new ol.style.Fill({ color: 'black' }), radius: 2 })
			})
		});

		map.map.addLayer(layer);
	}
	
	//구별 검색조건 변경시
	$('#sggSelect').on('change', () => {
		if($("#sggSelect option:checked").val() != '') $("#nmSgg").val($("#sggSelect option:checked").text());
		else { $("#nmSgg").val(""); resetMap(); }
		getChart();
		mapSelect();
	});
	
	//날짜별 검색조건 변경시
	$('#yyyy').on('change', () => {
		getChart();
		mapSelect();
	});

	function mapSelect(){
		var nmSgg = $("#nmSgg").val();

		if(nmSgg) {
			var feature = $data.filter(function(v) {
				return v.get('sigungu_nm') == nmSgg;
			}).pop();

			map.map.getInteractions().forEach(function (interaction) {
				if (interaction instanceof ol.interaction.Select) {
					var features = interaction.getFeatures();

					features.clear();
					features.push(feature);
				}
			});
		}

	}
	
	//지도 리셋
	function resetMap(){
		map.map.getInteractions().forEach(function (interaction) {
			if (interaction instanceof ol.interaction.Select) {
				var features = interaction.getFeatures();
				features.clear();
			}
		});
		
		map.map.getView().setCenter([198410,451028]);
		map.map.getView().setZoom(11);
	}
	
	//리셋
	$("#inquiry button, #reset, #MAP [data-map-action=home]").on("click", function(){
		
		$("#sggSelect option:eq(0)").attr("selected", "selected");
		
		getChart();
		resetMap();
	});
	
	//옵션설정
	Highcharts.setOptions({
		global: {
			useUTC: false, // 시간이 맞지 않을때
			thousandsSep: ',' // 천단위 콤마 설정
		},
		title: {
			text: undefined //chart title
		},
		lang: {
			thousandsSep: ',' //천단위 콤마 설정
		},
		colors: ['#dd9595', '#4dc783', '#b495dd', '#f4bc44', '#92c7ef'],
		xAxis: {
			labels: {
				//autoRotation: undefined, //글자 겹칠시 회전 설정
			},
			tickWidth: 0 //수치범위표시 연결 선굵기
		},
		yAxis: {
			title: { enabled: false },
			gridLineWidth: 0,
			tickAmount: 5, // 그리드 눈금자 수
		},
		plotOptions: {
			series: {
				colorByPoint: true,
				layoutAlgorithm: 'squarified',
				states: {
					inactive: {
						opacity: 1 //차트 마우스오버시 배경 불투명도 정도
					},
					hover: {
						halo: false, //pie chart mouseover effect
					}
				},
				stickyTracking: false, //배경 마우스오버시 포인터 활성화 여부
				stacking: undefined, //series 겹침 여부
			},
			pie: {
				dataLabels:{
					enabled: true,
					style:{ // 데이터 수치 표시 스타일
						color : "#ffffff", //텍스트 컬러
						textOutline : "none", // 데이터 수치표시 테두리
					}
				},
				borderWidth: 0, //데투리
				borderColor: "", //테두리 색상
				innerSize: '45%', //도넛모양 원안에 원사이즈
			},
		},
		tooltip: {
			shared: false //툴팁 공유 //여러개 상요시 false 해야 같이 선택안됨
		},
		legend: {
			enabled: false //범례 여부
		},
		credits: {
			enabled: false //하단 참조 주소값 여부
		},
		// navigation: {
		// 	buttonOptions: {
		// 		align: 'right',
		// 		y: -20
		// 	}
		// },
		exporting: {
			enabled: true, //햄버거 버튼 여부
			filename: '차트',
			buttons: {
				contextButton: {
				  menuItems: ['downloadPNG', 'downloadJPEG']
				}
			  }
		}
	});
	
	getChart();
	function getChart(){
		$.ajax({
			type: "GET",
			url: Constant.CONTEXT_PATH + '/dashboardDataUr.do',
			async: false,
			data : {yyyy: $("#yyyy").val(), nmSgg: $("#nmSgg").val()},
			success: function(data){
				let vis = new Object();
				vis.vis_nm = "년도별 빈집 현황";
				// 전체 빈집 가구수
				let resultData1 = dataTrans(data.result.yearEmptyHouseCount, 'default');
				setString(data.result.yearEmptyHouseCount, vis, "yearEmptyHouse");
				lineColumChart('yearEmptyHouse', '빈집수', resultData1);

				vis.vis_type = "LINE";
				vis.vis_nm = "거주형태별 빈집 현황";
				vis.trgt_div = "yearStleEmptyHouse";
				vis.vis_series = "Y";
				// 거주형태별 빈집 가구수
				let resultData2 = dataTransSeries(data.result.yearStleEmptyHouseCount, 'series');
				setString(data.result.yearStleEmptyHouseCount, vis, "yearStleEmptyHouse");
				createChart(vis, resultData2);

				vis.vis_nm = "거주형태별 빈집 비율";
				// 거주형태별 빈집 비율
				let resultData3 = dataTrans(data.result.stleEmptyHouseRate, 'multiSeries');
				setString(data.result.stleEmptyHouseRate, vis, "stleEmptyHouse");
				pieChart('stleEmptyHouse', resultData3);

				vis.vis_type = "COLUMN";
				vis.trgt_div = "areaEmptyHouse";
				vis.vis_nm = "지역별 빈집 현황";
				// 전체 빈집 가구수
				let resultData4 = multiColumnSeries(data.result.areaEmptyHouseCount);
				resultData4.data.shift();
				resultData4.max = data.result.areaEmptyHouseMax;
				setString(data.result.areaEmptyHouseCount, vis, "areaEmptyHouse");
				createChart(vis, resultData4);

				vis.vis_type = "LINE";
				vis.vis_nm = "거주형태별 빈집 증감";
				vis.trgt_div = "stleEmptyHouseIncrease";
				// 거주형태별 빈집 증감
				let resultData5 = dataTransSeries(data.result.stleEmptyHouseIncrease, 'series');
				setString(data.result.stleEmptyHouseIncrease, vis, "stleEmptyHouseIncrease");
//				resultData5.yAxis = {max:100};
				resultData5.format = '{point.y}%'; //.f 소수점자리
				createChart(vis, resultData5);
				
				vis.vis_nm = "지역별 노후건물 현황";
				// 지역별 노후건물 현황
				if(data.result.areaOldBuildingHouseCount != undefined) {
					let resultData6 = dataTrans(data.result.areaOldBuildingHouseCount, 'default');
					setString(data.result.areaOldBuildingHouseCount, vis, "areaOldBuildingHouseCount");
					lineColumChart('areaOldBuildingHouseCount', '노후건물수', resultData6);
					$(".areaOldBuildingHouseCount").show();
				}else{
					$(".areaOldBuildingHouseCount").hide();
				}
				
				// 분석결과
				if(data.result.resultData != undefined) {
					vis.vis_nm = "지역별 빈집 예측";
					let resultData7 = dataTrans(data.result.resultData, 'multiSeries');
					setString(data.result.resultData, vis, "resultData");
					lineColumChart('resultData', '지역별 빈집 예측', resultData7);
					$(".resultData").show();
				} else {
					$(".resultData").hide();
				}
				
			}, error : function(error){
				console.log(error);
				alert("에러");
			}
		});// ajax end
	}//getChart end
	
	function setString(data, v, id){
		var d = data[0];
		$("[data-chart='"+id+"']").find(".cht-title").text(v.vis_nm);
	}
}

export default DbUrRoute;