import Highchart from '../modules/adminHighcharts';
import { Map, MapDataVisualizer } from '../modules/map';
import Loading from '../modules/loading';

function DbCoronaRoute() {
	const $map = $('#MAP');

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
//		type: 'none',
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
			
			$map.trigger('ol-init', [map.map, vis.dataCache['seoulMap'].data]);
		}

		function onMapSelect(e) {
			const selected = e.selected.shift();
			$("#nmAdm").val(selected.values_.sigungu_nm);
			$("#sggSelect").val(selected.values_.sigungu_cd);
			$map.trigger('ol-select', [selected.length ? selected.shift().get('adm_cd') : undefined]);
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
		if($("#sggSelect option:checked").val() != '') $("#nmAdm").val($("#sggSelect option:checked").text());
		else { $("#nmAdm").val(""); resetMap(); }
		getChart();
		mapSelect();
	});
	
	//날짜별 검색조건 변경시
	$('#base_date').on('change', () => {
		getChart();
		mapSelect();
	});

	function mapSelect(){
		var nmAdm = $("#nmAdm").val();

		if(nmAdm) {
			var feature = $data.filter(function(v) {
				return v.get('sigungu_nm') == nmAdm;
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
			url: Constant.CONTEXT_PATH + '/dashboardDataCorona.do',
			async: false,
			data : {base_date: $("#base_date").val(), nmAdm: $("#nmAdm").val()},
			success: function(data){
				let vis = new Object();				
				// 일별 코로나 확진자
				vis.vis_nm = "일별 코로나 확진자수";
				let resultData1 = dataTrans(data.result.dayCoronaCount, 'default');
				setString(data.result.dayCoronaCount, vis, "dayCoronaCount");
				lineColumChart('dayCoronaCount', '확진자수', resultData1);
						
				// 지역별 코로나 확진자
				vis.vis_nm = "지역별 코로나 확진자수";
				let resultData2 = dataTrans(data.result.areaCoronaCount, 'dual');
				let resultData3 = dataTrans(data.result.areaCoronaCount, 'default');
				setString(data.result.areaCoronaCount, vis, "areaCoronaCount");
				lineColumChart('areaCoronaCount', '누적확진자수', resultData2, '일일확진자수', resultData3);

				// 분석결과
				if(data.result.resultData != undefined) {
					vis.vis_nm = "지역별 코로나 예측";
					let resultData4 = dataTrans(data.result.resultData, 'multiSeries');
					setString(data.result.resultData, vis, "resultData");
					lineColumChart('resultData', '지역별 코로나 예측', resultData4);
					$(".resultData").show();
				}else{
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

export default DbCoronaRoute;