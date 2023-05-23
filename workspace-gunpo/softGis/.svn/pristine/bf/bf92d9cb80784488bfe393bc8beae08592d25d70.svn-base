import { Map, MapDataVisualizer } from '../modules/map';
import { Validator } from '../shared/validator';
import { Cookie } from '../shared/cookie-manage';
import Geoserver from '../shared/geoserver';
import Highchart from '../modules/adminHighcharts';

const HTML = {
	BASE: (item) => `
		<div class="map-base-item">
			<div class="map-base-title">
				<label class="map-base-name" data-style="${item.data_style}" data-wms="${item.data_wms}">${item.data_nm}</label>
				<div class="map-base-info">
					<a href="#" class="map-base-info-source" title="데이터 정보"><i class="bx bx-question-mark"></i></a>
					<a href="#" class="map-base-info-legend" title="범례 보기"><i class="bx bx-images"></i></a>
					<input type="checkbox" class="map-base-info-show" name="layer_show" value="" checked title="레이어 보기/숨기기">
				</div>
			</div>
			<div class="map-base-toolbar">
				<div class="map-base-opacity">
					<span class="map-base-opacity-label">투명도</span>
					<input class="map-base-opacity-input" value="100">
					<p class="map-base-opacity-value">100%</p>
				</div>
			</div>
		</div>
	`,
	LAYER: (layer) => `
		<div class="map-layer-item">
			<div class="map-layer-title">
				<div class="map-layer-name" data-style="${layer.data_style}" data-wms="${layer.data_wms}">${layer.data_nm}</div>
			</div>
			<div class="map-layer-toolbar">
				<div class="map-layer-opacity">
					<span class="map-layer-opacity-label">투명도</span>
					<input class="map-layer-opacity-input" value="100">
				</div>
				<a href="#" class="map-layer-grid">리스트</a>
				<a href="#" class="map-layer-legend">범례</a>
				<a href="#" class="map-layer-option">분석도구</a>
				<a href="#" class="map-layer-style">스타일</a>
			</div>
			<a href="#" class="map-layer-close">닫기</a>
		</div>
	`,
	ICON: (item) => `
		<div class="marker_item">
			<img src="${item.src}">
			<span>${item.desc}</span>
		</div>
	`,
	LEGEND: (item) => `
		<div class="legend_item">
			<img src="${item.src}">
			<span>${item.desc}</span>
		</div>
	`
};

function CmmntyDetailRoute() {
	
	const $map = $('#map');
	const map = new Map($map);
	const element = document.getElementById('popup');
	const popup = new ol.Overlay({
		element: element,
		positioning: 'bottom-center',
		stopEvent: false
	});
	let map_sel_cd = "";
	
	let popover;
	let selectedFeature = null;
	let hoverFeature = null;
	
	const is_admin = $("#is_admin").val();	// 관리자 여부
	let user_id = $("#user_id").val();	// 로그인 id

	// 커뮤니티 id 
	const mapng_id = $('#mapng_id').val();

	let g_answer_id = 0;
	let g_mng_yn = 0;
	
	//이미지 파일
	let imgList = new Array();
	
	//지도 그리기
	let lineStyle = "";
	let draw;
	let lineStringVec;
	let polygonVec;
	let circleVec;
	let sketch;
	let tooltipElement;
	let tooltip;
	
	initMap();
 
	initDetailForm();
	
	//validation 체크
	const validator = new Validator({
		answer_title: { required: true },
		geom: { required: true },
		answer_cont: { required: true }
	}, {
		fieldNames: {
			answer_title : '제목',
			geom : '위치',
			answer_cont : '의견'
		}
	});
 
	$(".opinionReg").on("click", ()=>{
		opinionReg(); 
	});
	
	//
	$(".opinionCancle2").on("click", ()=>{
		$(".IdConfirmWrap").removeClass("active");
		$("#answer_jobmode").val('');
	});
	
	//모바일 트리거 메뉴화
	$(".navOpenButton").on("click", function(){
		if($(this).siblings(".partcptnMapSidenav").hasClass("active")){
			$(this).siblings(".partcptnMapSidenav").removeClass("active");
			
			
		}else{			
			$(this).siblings(".partcptnMapSidenav").addClass("active");
			$(this).removeClass("active");
			$('partcptnMapSidenav').animate({
				top:'-300px'
	        },600);
		}
			
	});
	
	$(".closeButtonMob").on("click", function(){
		$(".partcptnMapSidenav").removeClass("active");
//		$(this).parent().parent().removeClass("active");
		$(".navOpenButton").addClass("active");
		changeCenterMarker();
	});
	
	//정보지도 중첩 팝업 / 통계 팝업 close
	$(".closeButtonWrap").on("click", function(){
		$(this).parents().removeClass("active");
//		$(this).parent().parent().removeClass("active");
		$(".navOpenButton").addClass("active");
		changeCenterMarker();
	});
	
	//참여하기 버튼 클릭
	$(".partiButtonWrap:eq(0) button").on("click", () => {
		if($("#answer_cd").val() == "02" && $("#user_id").val() == ""){
			if(confirm("로그인이 필요한 매핑입니다. \n로그인 화면으로 이동하시겠습니까?")){
				location.href=Constant.CONTEXT_PATH + "/login-sns.do";
			}else return;
		}else if($("#endYn").val() == "Y"){
			alert("완료된 건 입니다.");
			return;
		}
		if($(".opinionItem").attr("class").indexOf("active") > -1){
			$(".opinionList ul li").removeClass("active");
			$(".opinionItem").removeClass("active"); 
			$(".mapngInfo").css("display", "");
			$(".partiButtonWrap").eq(0).find("button").text("등록하기");
			
			resetMap();
		}else{			
			$("#answer_jobmode").val('');
			$(".addOpinionWrap").addClass("active");	// 참여하기 팝업
			$(".partiWrap").css("display","block");
			
			if(map_sel_cd == "02"){
				addLineString();
			}else if(map_sel_cd == "03"){
				addPolygon();
			}
		}
		
		if(map_sel_cd == "01" || map_sel_cd == "04"){
			$(".location-item span").css("display","block");
		}else if(map_sel_cd == "02"){
			$(".addressName").html("※ 지도에서 시작과 종료 위치를 선택 한 후 더블클릭 해주세요.");
			$(".addressName").css("border", "0");
		}else if(map_sel_cd == "03"){
			$(".addressName").html("※ 지도에서 영역을 선택 한 후 더블클릭 해주세요.");
			$(".addressName").css("border", "0");
		}

		changeCenterMarker();
		onMoveEnd();
	});
	
	function changeCenterMarker(idx) {
		let stat = $('.addOpinionWrap').css('display');
		if (stat == 'none') {
			$('.center_point').show();
			$('.center_marker').hide();
		} else {
			if (map_sel_cd == '01' || map_sel_cd == '04') {
				if(idx == "" || idx == null || idx == undefined) idx = 0;
				if ($('.marker_item').length > 0) $('.center_marker').attr('src', $($('.marker_item')[idx]).find('img').attr('src')); 
				
				$('.center_point').hide();
				$('.center_marker').show();
			}
		}
	}

	//취소하기 버튼 클릭
	$(".opinionCancle").on("click", () => {
		$(".addOpinionWrap").removeClass("active");
		$(".partcptnMapSidenav").addClass("active");
		changeCenterMarker();

		$("#opinionForm").reset();
		initQuesAnswer();
		$('input[name="ques_answer1"]').removeAttr('checked');
		$("#answer_jobmode").val('');
		$(".addPicList tr").remove();
		list = [];
		
		resetMap();
	});
	
	$(".ButtonWrap").find(".opinionCancle").on('click', ()=>{
		$(".IdConfirmWrap").removeClass("active");
		$("#del_answer_user_id").val('');
		$("#del_answer_user_pwd").val('');  
	}); 
	

	$(".ButtonWrap").find(".confirmButton").on('click', ()=>{
		
		let del_answer_user_id = $.trim($("#del_answer_user_id").val());
		
		if ( del_answer_user_id === '' || del_answer_user_id === null || del_answer_user_id === undefined){
			alert('아이디를 입력해주세요.');
			document.getElementById("del_answer_user_id").focus();
			return;
		} 

		let del_answer_user_pwd = $.trim($("#del_answer_user_pwd").val());
		if ( del_answer_user_pwd === '' || del_answer_user_pwd === null || del_answer_user_pwd === undefined){
			alert('패스워드를 입력해주세요.');
			document.getElementById("del_answer_user_pwd").focus();
			return;
		}  
		
		let answer_jobmode = $("#answer_jobmode").val();
		
		if ( answer_jobmode =="DELETE"){
			$.post({
				url: Constant.CONTEXT_PATH + '/cmmntyMap/deleteCmmntyAnswer.do'
					, data: {answer_id:g_answer_id, answer_usr_id: del_answer_user_id, answer_usr_pw: del_answer_user_pwd, mng_yn: g_mng_yn, session:0 } 
					, dataType: 'json'
					, async: true
					, success: function(d) {  
						let result = d.result;    
						if(result>0){

							callCmmntyView();
							$(".opinionList ul li").removeClass("active");
							$(".opinionItem").removeClass("active");
							$(".mapngInfo").css("display", "");
							callOpinionList();

							// 아이디 확인하기 팝업 폼 내용 초기화
							$(".IdConfirmWrap").removeClass("active");
							$("#del_answer_user_id").val('');
							$("#del_answer_user_pwd").val('');	
						}else{
							alert('아이디/패스워드를 확인해주세요.');
						}
				}
			});
		}else if ( answer_jobmode =="UPDATE"){

			// 아이디 / 패스워드 체크
			$.post({
				url: Constant.CONTEXT_PATH + '/cmmntyMap/getCheckAnswerIdPwd.do'
					, data: {answer_id:g_answer_id, answer_usr_id: del_answer_user_id, answer_usr_pw: del_answer_user_pwd}
					, dataType: 'json'
					, async: false
					, success: function(d) { 

						let result = d.result;     
						if(result>0){
							$(".join").text("수정하기");
							$(".opinionReg").text("저장하기");	
							user_id = del_answer_user_id;
							$('.cmmnty-answer-update').trigger("click");
							
							$(".addOpinionWrap").addClass("active");
							$(".IdConfirmWrap").removeClass("active");
							$("#opinion_usr_id").val($.trim($('#del_answer_user_id').val()));
							$("#opinion_usr_pwd").val($.trim($('#del_answer_user_pwd').val()));
							$(".partiWrap").css("display","none");
							
							changeCenterMarker();
						}else{
							alert('아이디/패스워드를 확인해주세요.');
						}
					}
			});
		}
	}); 
	
	function initDetailForm(){

		if ( mapng_id === '' || mapng_id === null || mapng_id === undefined){
			alert('잘못된 접근'); 
			history.back();
			return;
		}else{
			
			// 커뮤니티 상세
			callCmmntyView();
			// 의견 목록
			callOpinionList();
 		}
	}

	function callCmmntyView(){
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyMapDetail.do'
				, data: {mapng_id: mapng_id }
				, dataType: 'json'
				, async: true
				, success: function(d) {
					let result = d.result;

					let cat_nm = result.cat_nm;
					let mapng_title = result.mapng_title; 
					let mapng_desc = result.mapng_desc; 
					let area_nm = result.area_nm; // 지역코드 명
					let area_dtl_nm = result.area_dtl_nm; // 지역상세코드 명
							
					let start_dt = result.start_dt; // 시작일자(기간)
					let end_dt = result.end_dt; // 종료일자(기간)
					let dt = start_dt +' - ' + end_dt;
					let answer_cnt = result.answer_cnt;	// 참여자수  
					let report_cnt = result.report_cnt;	// 매핑신고여부  

					$("#answer_cd").val(result.answer_cd);
					
					$(".category").text(cat_nm);
					$(".mapngInfo").find(".mappingName").html('<p>' + mapng_title +'</p>');
					$(".mapngInfo").find(".mappingIntro").html('<p>' + mapng_desc +'</p>');
					$(".mapngInfo").find(".locationNameTxt").html( area_nm +'('+area_dtl_nm+')');
					$(".mapngInfo").find(".periodNameTxt").html(dt);
					$(".mapngInfo").find(".pertiNameTxt").html(answer_cnt+'명');
					$("#endYn").val(result.end_yn);
					
					if(report_cnt > 0 ){
						$("#btnReportCancelMap").show();
					}else{
						$("#btnReportMap").show();
					}
					
					let area_center = result.area_center;
					if (area_center != '') {
						map.map.getView().animate({
							center: area_center.split(','),
							duration: 500
						});
					}
					
					$('.center_point').show();
					$('.center_marker').hide();
						
					//참여하기 팝업
					$('#map_sel_cd').val(result.map_sel_cd);
					map_sel_cd = result.map_sel_cd;

					let source = new ol.source.Vector();
					let layer = new ol.layer.Vector({ source });
					if (map_sel_cd == '01') {
						$('.opinionIcon').html('');
						$('.map-legend').html('');
						$(JSON.parse(result.map_sel_option)).each(function() {
							$('.opinionIcon').append(HTML.ICON(this));
							$('.map-legend').append(HTML.LEGEND(this));
						});
						$('.marker_item:nth-child(1)').addClass('active');
						$('.marker_item').on('click', function() {
							$('.marker_item').removeClass('active');
							$(this).addClass('active');
							$('.center_marker').attr('src', $(this).find('img').attr('src'));
						});
					} else if (map_sel_cd != '01') {
						lineStyle = JSON.parse(result.map_sel_option);
						$("#feature_style").val(result.map_sel_option);
					}
					
					if(map_sel_cd != "04"){
						$(".radius_wrap").hide();
					}
					
					//map
					let map_sel_option = JSON.parse(result.map_sel_option)[0];
					let featurecollection = JSON.parse(result.featurecollection.value)[0];
					let features = featurecollection.features;
					let center = JSON.parse(featurecollection.center);
					
					var geojsonObject = {
						"type": "FeatureCollection",
						"crs": {"type": "name", "properties": {}},
						"name": "cmmnty",
						"features": features
					};
					
					var vectorSource = new ol.source.Vector({
						features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
					});
					
					var vectorLayer = new ol.layer.Vector({
						type: "usermap",
						name: "cmmnty",
						zIndex: 1,
						source: vectorSource,
						style: getFeatureStyleFunction
					});
					
					map.map.getLayers().forEach(layer => layer.getSource().refresh());
					map.map.addLayer(vectorLayer);
					if (map_sel_cd == '03' || map_sel_cd == '04') {
						map.getLayerByName("cmmnty").setOpacity(0.5);
					}
					if (geojsonObject.features.length > 1)  {
						map.map.getView().fit(vectorLayer.getSource().getExtent(), map.map.getSize());
					}
					
					if (center != null) {
						map.map.getView().animate({
							center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
							duration: 500
						});
					}
					
					$('.map-base-item.landinfo .map-base-opacity-input').kendoSlider({
						dragHandleTitle: '드레그',
						showButtons: false,
						tooltip: { enabled: false },
						min: 0,
						max: 100,
						largeStep: 0,
						smallStep: 1,
						change: onLayerOpacityChange
					});
					
					
					//배경지도
					let _this = {data_wms: $($('.map-base-item.landinfo .map-base-name')).data('wms'), data_nm: $('.map-base-item.landinfo .map-base-name').html(), data_style: null, mapng_id: null};
					$('.map-base-item.landinfo .map-base-info-show').on('change', _this, onCheckLayerShow.bind(this));
					
					let layerData = d.mapData;
					if (layerData.length > 0) {
						$(layerData).each(function() {
							const $layer = $(HTML.BASE(this));
							$('.map-base-inner').append($layer);
							
							getWmsLayer(this.data_wms, this.data_style);
							
							const $layerOpacity = $layer.find('.map-base-opacity-input');
							$layerOpacity.kendoSlider({
								dragHandleTitle: '드레그',
								showButtons: false,
								tooltip: { enabled: false },
								min: 0,
								max: 100,
								largeStep: 0,
								smallStep: 1,
								change: onLayerOpacityChange
							});
							
							$layer.find('.map-base-info-source').on('click', getDataSource(this));
							$layer.find('.map-base-info-legnd').on('click', getDataLegnd(this));
							$layer.find('.map-base-info-show').on('change', this, onCheckLayerShow.bind(this));
							
							$('.map-base').show();
						});
					} else {
						$('.map-base').hide();
					}
				}
		}); 
	}
	
	//라인 클릭시
    function addLineString() {
		let dash = lineStyle.lineDash.split(",");
    	let source = new ol.source.Vector();
    	let layer = new ol.layer.Vector({ source });

        lineStringVec = new ol.layer.Vector({
            title : 'vector',
            source: source ,
			name: "lineStringVec",
            style: new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: lineStyle.color,
	        		lineDash: dash,
					width: lineStyle.width
	        	})
	        })  
        });

        map.map.addLayer(lineStringVec); //vector layer add
        createTooltip();

        draw = new ol.interaction.Draw({
            source: source,
            type: 'LineString',
            style: new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: lineStyle.color,
	        		lineDash: dash,
					width: lineStyle.width
	        	})
	        })  
        });
        map.map.addInteraction(draw);
        
        let listener;
        let tooltipCoord;
    	draw.on('drawstart', function (evt) {
    		if(source.getFeatures().length == 1){
    			source.clear();
    		}
            sketch = evt.feature;
            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output = formatLengthLine(geom);
                tooltipCoord = geom.getLastCoordinate();
                tooltipElement.innerHTML = output;
                tooltip.setPosition(tooltipCoord);
            })
    	});
    }
	
	//폴리곤 클릭시
    function addPolygon() {
		let dash = lineStyle.lineDash.split(",");
    	let source = new ol.source.Vector();
    	let layer = new ol.layer.Vector({ source });

    	polygonVec = new ol.layer.Vector({
            title : 'vector',
            source: source ,
			name: "polygonVec",
            style: new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: lineStyle.color,
	        		lineDash: dash,
					width: lineStyle.width
	        	}),
	        	fill: new ol.style.Fill({
	        		color: lineStyle.fill
	        	})
	        })  
        });

        map.map.addLayer(polygonVec); //vector layer add
        createTooltip();
        
        draw = new ol.interaction.Draw({
            source: source,
            type: 'Polygon',
            style: new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: lineStyle.color,
	        		lineDash: dash,
					width: lineStyle.width
	        	}),
	        	fill: new ol.style.Fill({
	        		color: lineStyle.fill
	        	})
	        })  
        });
        map.map.addInteraction(draw);

        let listener;
        let tooltipCoord;
    	draw.on('drawstart', function (evt) {
    		if(source.getFeatures().length == 1){
    			source.clear();
    		}
            sketch = evt.feature;
            listener = sketch.getGeometry().on('change', function(evt) {
                var geom = evt.target;
                var output = formatLengthPolygon(geom);
                tooltipCoord = geom.getLastCoordinate();
                tooltipElement.innerHTML = output;
                tooltip.setPosition(tooltipCoord);
            })
    	});
    }
    
    //툴팁 html 생성
    function createTooltip() {
        if (tooltipElement) {
            tooltipElement.parentNode.removeChild(tooltipElement);
        }
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'ol-tooltip';
        tooltip = new ol.Overlay({
            element: tooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
        });
        map.map.addOverlay(tooltip);
    }

    //line 거리 계산
    function formatLengthLine(line) {
        let length = ol.sphere.getLength(line);
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }

        return output;
    };

    //polygon 거리 계산
    function formatLengthPolygon(polygon) {
    	let area = ol.sphere.getArea(polygon);
    	let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;

    };
	
	
	//정보지도 중첩 목록 리스트 클릭
	$('.sub-table tr').on('click',  onCatalogListClcik);
	
	const vis = new MapDataVisualizer(map, {}, {
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({ color: 'rgba(255,255,255,.5)', width: 2 }),
			fill: new ol.style.Fill({ color: 'rgba(255,255,255,.5)' })
		}),
		selectedStyle: new ol.style.Style({
			stroke: new ol.style.Stroke({ color: '#152475', width: 3 }),
			fill: new ol.style.Fill({ color: '#006bd800' }),
			zIndex: 98
		}),
		mapStyler: (feature, style, args) => {
			style.getFill().setColor(EMD_LIGHT_COLOR[feature.values_.emd_nm]);
		}
	});
	
	async function onCatalogListClcik(e) {
		e.preventDefault();
		
		const layerName = $(this).data('tbl');
		//const layerWMS = Geoserver.getWMSLayer(layerName);
		//layerWMS.set('name', 'data-catalog');
		//layerWMS.setOpacity(1);
		
		$.ajax({
			type: 'POST',
			dataType: 'jsonp',
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getDataCatlogGeojson.do',
			data: { table: layerName },
			success: function(d) {
				if (d.result == undefined) return;
				
				const vectorSource = new ol.source.Vector({
					features: new ol.format.GeoJSON().readFeatures(JSON.parse(d.result)),
				});
				
				const vectorLayer = new ol.layer.Vector({
				  source: vectorSource,
				  //style: styleFunction,
				});
				
				vectorLayer.set('name', 'data-catalog');
				map.removeLayerByName('data-catalog');
				map.map.addLayer(vectorLayer);
			}, error : function(error){
				//console.log(error);
			}
		});
		

		//map.removeLayerByName('data-catalog');
		//map.map.addLayer(layerWMS);
	}
	
	function getDataSource(data) {
	
	}
	
	function getDataLegnd(data) {
		//$('.legend-pop img').attr('src', codroe.util.vWorldLegendImageUrl + '?layer=' + layer + '&style=' + style + '&apiKey=' + codroe.util.vWorldApiKey + '&image=png&output=image');
	}
	
	function onCheckLayerShow(obj) {
		let layer = map.getLayerByName(obj.data.data_wms);
		if ($(obj.target).is(':checked') == false) layer.setOpacity(0);
		else layer.setOpacity(parseInt($(obj.target).parent().parent().siblings().find('input.map-base-opacity-input').val())/100);
	}
	
	let getFeatureStyleFunction = function(feature, resolution) {
		let type = feature.getGeometry().getType();
		if (type === 'Point') {
			let iconSrc = Constant.CONTEXT_PATH + '/assets/images/marker/marker11.png';
			let feature_style = feature.getProperties().feature_style
			if (feature_style != null) {
				iconSrc = JSON.parse(feature_style)[0].src;
			}
		
			return [
				new ol.style.Style({
		            image: new ol.style.Icon(({
		                anchor: [0.5, 46],
		                anchorXUnits: "fraction",
		                anchorYUnits: "pixels",
		                scale: 1,
		                src: iconSrc,
		                declutterMode: "none"
		            })),
		            text: new ol.style.Text({
		            	text: feature.getProperties().rnum + '',
		            	font: 'bold 16px Arial',
		            	offsetX: 0.5,
		            	offsetY: -25,
		            	fill: new ol.style.Fill({color: '#fff'}),
		            	declutterMode: "none"
		            })
				})
			];
		}else if(type === 'LineString') {
			return [
	            new ol.style.Style({
		        	stroke: new ol.style.Stroke({
		        		color: lineStyle.color,
		        		lineDash: lineStyle.lineDash.split(","),
						width: lineStyle.width
		        	})
		        })  
            ]
		}else {
			return [
	            new ol.style.Style({
		        	stroke: new ol.style.Stroke({
		        		color: lineStyle.color,
		        		lineDash: lineStyle.lineDash.split(","),
						width: lineStyle.width
		        	}),
		        	fill: new ol.style.Fill({
		        		color: lineStyle.fill
		        	})
		        })  
            ]
		}
    }
	
	function onLayerOpacityChange(e) {
		const $layer = e.sender.element.closest('.map-base-item');
		const layerId = $layer.find('.map-base-name').data('wms');
		const layerVector = map.getLayerByName(layerId);
		layerVector.setOpacity(e.value / 100);
		
		const opacityValue = $layer.find('.map-base-opacity-value');
		opacityValue.html(e.value + '%');
		
		if ($($layer.find('.map-base-info-show')).is(':checked') == false) {
			$layer.find('.map-base-info-show').prop('checked', true);
		}
	}
	
	function getWmsLayer(wmsId, style) {
		let wmsLayer = new ol.layer.Tile({
            source : new ol.source.TileWMS({
        		url: Constant.VWORLD_WMS_URL,
                params: {"SERVICE": "WMS", "REQUEST": "GetMap", "LAYERS" : wmsId, "STYLES" : style, "TILED" : true, "VERSION" : "1.3.0", "KEY": Constant.VWORLD_APIKEY, "domain": Constant.DOMAIN},
                serverType: "geoserver",
                crossorigin: 'anonymous'
            }),
            minResolution: 0.1,
            maxResolution: 20,
            name : wmsId,
            layerCategory : "WMS",
            type : "WMS",
            visible : true,
            opacity : 1
        });
		
		map.map.addLayer(wmsLayer);
	}
	
	function callOpinionList(){
 
		// 커뮤니티 > 의견 목록 표출
		let searchTitle = $("#search_answer_title").val();
		$(".opinionList").find(".opinionListItem").empty(); 
		 
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyDetailAnswerList.do'
			, data: {mapng_id: mapng_id, search_answer_title: searchTitle}
			, dataType: 'json'
			, async: true
			, success: function(d) {
				let result = d.result;
				let session = d.session;
				let str = "";
				
				if(result && result.length > 0 && d.search_answer_title){
					$("#search_answer_title").val(d.search_answer_title);
				}
				
				for (var a=0; a<result.length; a++){
					let num = result[a].rnum;
					let answer_title = result[a].answer_title;
					let answer_id = result[a].answer_id;
					let reg_usr_id = result[a].reg_usr_id;  
					let reg_dt = result[a].reg_dt;   
					let report_cnt = result[a].report_cnt;  
					
		            str += '<li><span>'+num+'</span><p class="cmmnty-answer-view" view-answerid='+answer_id+'>'+answer_title+'</p><p>'+reg_dt+'</p><div class="ListButtonWrap">';

					if((result[a].reg_usr_id == session || session == null) && result[a].answer_usr_pw != null) {
						str += '<button type="button" class="cmmnty-answer-update" upt-answerid='+answer_id+' reg_usr_id='+reg_usr_id+'>수정</button>';
						str += '<button type="button" class="cmmnty-answer-del" del-answerid='+answer_id+' del-reg_usr_id='+reg_usr_id+'>삭제</button>';
					}else if(result[a].reg_usr_id == session && session != null){
						str += '<button type="button" class="cmmnty-answer-update" upt-answerid='+answer_id+' reg_usr_id='+reg_usr_id+'>수정</button>';
						str += '<button type="button" class="cmmnty-answer-del" del-answerid='+answer_id+' del-reg_usr_id='+reg_usr_id+'>삭제</button>';
					}
					
					if(session != null){
						if(report_cnt > 0){
							str += '<button type="button" class="cmmnty-answer-report-cancel" report-answerid='+answer_id+'>취소</button>';
						}else{
							str += '<button type="button" class="cmmnty-answer-report" report-answerid='+answer_id+'>신고</button>';
						}
					}
					str += '</div></li>';
				}
				
				$(".opinionList").find(".opinionListItem").append(str);  
				$('.cmmnty-answer-del').on('click', onAddDelAnswerButtonClick.bind(this));  
				$('.cmmnty-answer-update').on('click', onAddUptAnswerButtonClick.bind(this));
				$('.cmmnty-answer-view').on('click', onAddAnswerViewButtonClick.bind(this)); 
				$('.cmmnty-answer-report').on('click', onAddRprtAnswerButtonClick.bind(this)); 
				$('.cmmnty-answer-report-cancel').on('click', onAddRprtCancelAnswerButtonClick.bind(this)); 
			}
		});
	}

	async function onAddAnswerViewButtonClick(e) {
		let answer_id = e.currentTarget.getAttribute('view-answerid');
		
		// 상세보기 호출 
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyDetailAnswerDetail.do'
			, data: {answer_id: answer_id }
			, dataType: 'json'
			, async: true
			, success: function(d) {
				let result = d.result; 
				let answer_title = result.answer_title;
				let answer_cont = replaceBrTag(result.answer_cont);  
				let geom = result.geom; 
				let reg_usr_id = result.reg_usr_id; // 지역코드
				let reg_dt = result.reg_dt; // 지역상세코드
				let title = $(".mapngInfo").find(".mappingName").text();
				/*
				$("#itemRowTitle").html('<p>' + title +'</p>');
				$("#itemRowReguser").html('<p>' + reg_usr_id +'</p>');
				$("#itemRowRegdate").html('<p>' + reg_dt +'</p>');
				$("#itemRowAnswerTitle").html('<p>' + answer_title +'</p>');
				$("#itemRowAnswerGeom").html('<p>' + geom +'</p>');
				$("#itemRowAnswerContent").html('<p>' + answer_cont +'</p>');
				*/
				
				if (geom.length > 0) {
					let tmp = geom.split(/[\s(\s)]/);
					let tmp2;
					if(map_sel_cd == "02"){
						tmp2 = tmp[2].split(",");
						tmp[2] = tmp2[0];
					}else if(map_sel_cd == "03"){
						tmp2 = tmp[3].split(",");
						tmp[1] = tmp[2];
						tmp[2] = tmp2[0];
					}
					map.map.getView().animate({
						center: ol.proj.transform([tmp[1], tmp[2]], 'EPSG:4326', 'EPSG:3857'),
						zoom: map.map.getView().getZoom(),
						duration: 500
					});
					
					setTimeout(function() {
						let answer_id = d.result.answer_id;
						$(map.getLayerByName('cmmnty').getSource().getFeatures()).each(function(i, f) {
						    if (answer_id == f.getProperties().answer_id) {
						    	const coord = ol.proj.transform([tmp[1], tmp[2]], 'EPSG:4326', 'EPSG:3857');
						    	omMapPopvoer(f, coord);
						    }
						});
					}, 550);
					
					if (window.innerWidth <= 1080) { 
						$(".partcptnMapSidenav").removeClass("active");
						$(".navOpenButton").addClass("active");
					}
				}
			} 
		});
		 
		/*
		$(".opinionList ul li").removeClass("active");
		$(e.currentTarget.parentElement).addClass("active");
		$(".mapngInfo").css("display", "none");
		$(".opinionItem").addClass("active");
		$(".partiButtonWrap").eq(0).find("button").text("뒤로가기");
		*/
	}
	
	async function onAddUptAnswerButtonClick(e){
		let isUptPop = true;

		let answer_id = e.currentTarget.getAttribute('upt-answerid');
		let reg_usr_id = e.currentTarget.getAttribute('reg_usr_id');

		if ( is_admin === 'true' || user_id == reg_usr_id){
			$(".join").text("수정하기");
			$(".opinionReg").text("저장하기");
			$(".addOpinionWrap").addClass("active");	// 참여하기 팝업 띄우기.
			
			// 상세보기 호출 
			$.post({
				url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyDetailAnswerDetail.do'
				, data: {answer_id: answer_id }
				, dataType: 'json'
				, async: true
				, success: function(d) {
					let result = d.result; 
					let answer_title = result.answer_title;
					let answer_cont = replaceBrTag(result.answer_cont);  

					$("#answer_title").val(answer_title);
					$("#geom").val(result.geom);
					$("#address").val(result.address);
					$("#answer_cont").val(result.answer_cont);		
					$("#point_radius").val(result.point_radius);		
					
					setQuesAnswer('ques_answer1', result.ques_answer1);
					setQuesAnswer('ques_answer2', result.ques_answer2); 
					setQuesAnswer('ques_answer3', result.ques_answer3);
					setQuesAnswer('ques_answer4', result.ques_answer4);
					setQuesAnswer('ques_answer5', result.ques_answer5);
					setQuesAnswer('ques_answer6', result.ques_answer6);
					setQuesAnswer('ques_answer7', result.ques_answer7);
					setQuesAnswer('ques_answer8', result.ques_answer8);
					setQuesAnswer('ques_answer9', result.ques_answer9);
					setQuesAnswer('ques_answer10', result.ques_answer10);

					//지도 이동
					if (result.geom.length > 0) {
						let tmp = result.geom.split(/[\s(\s)]/);
						let tmp2;
						if(map_sel_cd == "02"){
							tmp2 = tmp[2].split(",");
							tmp[2] = tmp2[0];
						}else if(map_sel_cd == "03"){
							tmp2 = tmp[3].split(",");
							tmp[1] = tmp[2];
							tmp[2] = tmp2[0];
						}
						map.map.getView().animate({
							center: ol.proj.transform([tmp[1], tmp[2]], 'EPSG:4326', 'EPSG:3857'),
							zoom: map.map.getView().getZoom(),
							duration: 500
						});
						
						setTimeout(function() {
							let answer_id = d.result.answer_id;
							$(map.getLayerByName('cmmnty').getSource().getFeatures()).each(function(i, f) {
							    if (answer_id == f.getProperties().answer_id) {
							    	const coord = ol.proj.transform([tmp[1], tmp[2]], 'EPSG:4326', 'EPSG:3857');
							    	omMapPopvoer(f, coord);
							    }
							});
						}, 550);
						
						if (window.innerWidth <= 1080) { 
							$(".partcptnMapSidenav").removeClass("active");
							$(".navOpenButton").addClass("active");
						}
					}

					//첨부파일 정보
					let str = '';
					if(result.img_file1_nm != null){
						str += '<tr class="addPicListItem">';
						str += '<td data-img="'+result.img_file1+'">'+result.img_file1_nm+'</td>';
						str += '<td><svg class="realFileDeleteBtn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg></td>';
						str += '</tr>';
						
						imgList.push(result.img_file1);
					}
					if(result.img_file2_nm != null){
						str += '<tr class="addPicListItem">';
						str += '<td data-img="'+result.img_file2+'">'+result.img_file2_nm+'</td>';
						str += '<td><svg class="realFileDeleteBtn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg></td>';
						str += '</tr>';
						
						imgList.push(result.img_file2);
					}
					if(result.img_file3_nm != null){
						str += '<tr class="addPicListItem">';
						str += '<td data-img="'+result.img_file3+'">'+result.img_file3_nm+'</td>';
						str += '<td><svg class="realFileDeleteBtn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg></td>';
						str += '</tr>';
						
						imgList.push(result.img_file3);
					}
					$(".addPicList").html(str);
					
					
					if(map_sel_cd == "01" || map_sel_cd == "04"){
						let idx = 0;
						$(".marker_item").removeClass("active");
						$(".marker_item").each(function(n){
							if($(this).find("img").attr("src") == JSON.parse(result.feature_style)[0].src) {
								$(this).addClass("active");
								idx = n;
							};
						});
						changeCenterMarker(idx);
						$(".location-item span").css("display","block");
					}else if(map_sel_cd == "02"){
						$(".addressName").html("※ 지도에서 시작과 종료 위치를 선택 한 후 더블클릭 해주세요.");
						$(".addressName").css("border", "0");
						addLineString();
					}else if(map_sel_cd == "03"){
						$(".addressName").html("※ 지도에서 영역을 선택 한 후 더블클릭 해주세요.");
						$(".addressName").css("border", "0");
						addPolygon();
					}
					
				}
			});
			g_answer_id = answer_id;
			$("#answer_jobmode").val('UPDATE');
			
		}else{
			if( isUptPop ){
				$(".IdConfirmWrap").addClass("active");
				document.getElementById("del_answer_user_id").focus();
				g_answer_id = answer_id;
				$("#answer_jobmode").val('UPDATE');
			}/*else{
				$(".IdConfirmWrap").removeClass("active");
			}*/
		}
	}
	
	async function onAddDelAnswerButtonClick(e) { 

		let answer_id = e.currentTarget.getAttribute('del-answerid');
		let reg_usr_id = e.currentTarget.getAttribute('del-reg_usr_id');
		let isDelPop = true;
		if ( is_admin === 'true' || user_id == reg_usr_id){

			if(!confirm('정말 삭제하시겠습니까?')) 
				return;
			 
			$.post({
				url: Constant.CONTEXT_PATH + '/cmmntyMap/deleteCmmntyAnswer.do'
					, data: {answer_id:answer_id, mng_yn: 1, session:1 } 
					, dataType: 'json'
					, async: true
					, success: function(d) {  
						let result = d.result;     
						callCmmntyView();
						$(".opinionList ul li").removeClass("active");
						$(".opinionItem").removeClass("active");
						$(".mapngInfo").css("display", "");
						$(".partiButtonWrap").eq(0).find("button").text("참여하기");
						$(".join").text("참여하기");
						callOpinionList();

						// 아이디 확인하기 팝업 폼 내용 초기화
						$(".IdConfirmWrap").removeClass("active");
						$("#del_answer_user_id").val('');
						$("#del_answer_user_pwd").val('');	
						initMap();
				} 
			});
			
		}else if ( is_admin !== 'true'){

			if( isDelPop ){
				$(".IdConfirmWrap").addClass("active");
				document.getElementById("del_answer_user_id").focus();
				g_answer_id = answer_id;
				$("#answer_jobmode").val('DELETE');
			}else{
				$(".IdConfirmWrap").removeClass("active");
			}
			
		}
	}
	
	async function onAddRprtAnswerButtonClick(e) {
		initReportPop();
		
		let report_answer_id = e.currentTarget.getAttribute('report-answerid');
		$("#report_answer_id").val(report_answer_id);
		
		$(".reportWrap").addClass("active");	// 신고하기 팝업
	}
		
	//의견 검색
	$(".cmmnty-answer-search").on("click", callOpinionList);
	$("#search_answer_title").on("keyup", callOpinionList);
	
	$("input[name='report_cd']").on("change", (e,a)=>{
		$("#report_cont").val("");
		if(e.currentTarget.value == "99"){
			$("#report_cont").show();
		}else{
			$("#report_cont").hide();
		}
	});
	
	$(".reportClose").on("click", ()=>{
		$(".reportWrap").removeClass("active");
		$("#report_answer_id").val("");
	});
 
	$(".reportReg").on("click", (e)=>{

		if(!confirm('신고하시겠습니까?')) 
			return;
			
		let data = new FormData($("#reportForm")[0]);
		data.append('mapng_id', mapng_id);
		//data.append('report_answer_id', $("#report_answer_id").val());
		
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/reportCmmntyAnswer.do'
				, data: data
				, dataType: 'json'
				, processData: false
				, contentType: false
				, async: true
				, success: function(d) {  
					alert("신고 처리되었습니다.");
					$(".reportClose").click();
					
					if(data.get("report_answer_id")){
						callOpinionList();
					}else{
						$("#btnReportCancelMap").show();
						$("#btnReportMap").hide();
					}
				} 
		});
	});
 
	async function onAddRprtCancelAnswerButtonClick(e) {

		if(!confirm('신고취소 하시겠습니까?'))
			return;
		 
		let report_answer_id = e.currentTarget.getAttribute('report-answerid');
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/reportCancelCmmntyAnswer.do'
				, data: {mapng_id: mapng_id, report_answer_id: report_answer_id} 
				, dataType: 'json'
				, async: true
				, success: function(d) { 
					alert("신고취소 처리되었습니다."); 
					callOpinionList();
				} 
		});
	}
	   
	  
	async function opinionReg(){ 

		if(map_sel_cd == "01"){
			let featureArr = [];
			let featureObj = new Object();
			
			featureObj.src = $(".opinionIcon").find(".active").find("img").attr("src");
			featureObj.desc = $(".opinionIcon").find(".active").find("span").text();
			featureArr.push(featureObj);
			$("#feature_style").val(JSON.stringify(featureArr));
		}else if(map_sel_cd == "02"){
			if(map.getLayerByName('lineStringVec').getSource().getFeatures()[0] != undefined){
				let coord = map.getLayerByName('lineStringVec').getSource().getFeatures()[0].getGeometry().getCoordinates();
				let geom = [];
				$(coord).each(function(i, f){
					geom.push(ol.proj.transform(f, 'EPSG:3857', 'EPSG:4326').toString().replace(",", " "));
				});
				$("#geom").val("LINESTRING("+geom.toString()+")");
			} else if(map.getLayerByName('lineStringVec').getSource().getFeatures()[0] == undefined && $("#geom").val().indexOf("Point") > -1) {
				$("#geom").val("");
			}
		}else if(map_sel_cd == "03"){
			if(map.getLayerByName('polygonVec').getSource().getFeatures()[0] != undefined){
				let coord = map.getLayerByName('polygonVec').getSource().getFeatures()[0].getGeometry().getCoordinates()[0];
				let geom = [];
				$(coord).each(function(i, f){
					geom.push(ol.proj.transform(f, 'EPSG:3857', 'EPSG:4326').toString().replace(",", " "));
				});
				$("#geom").val("POLYGON(("+geom.toString()+"))");
			}else if(map.getLayerByName('lineStringVec').getSource().getFeatures()[0] == undefined && $("#geom").val().indexOf("Point") > -1) {
				$("#geom").val("");
			}
		}
		
		const dataTranster = new DataTransfer();
		Array.from(list)
	    .forEach(file => {
	        dataTranster.items.add(file);
	    });
		document.querySelector('#fileList').files = dataTranster.files;
		//첨부파일 확장자&크기 제한
		let regex = new RegExp("(.*?)\.(jpg|bmp|gif|png)$");
		
		for(let i=0; i<$("#fileList").get(0).files.length; i++){
			let file = $("#fileList").get(0).files[i];

			if(!regex.test(file.name)){
				alert("첨부 가능한 사진은 jpg, png, bmp, gif 입니다.");
				return false;
			}
		}
		
		$("#imgList").val(imgList);
		
		let data = new FormData($("#opinionForm")[0]);
		let answer_jobmode = $("#answer_jobmode").val();
		if(!await validator.validateAllAsync($("#opinionForm").serializeFlat()))
			return;
		
		if ( answer_jobmode =="" || answer_jobmode =="INSERT"){

			$(".join").text("참여하기");
			$(".opinionReg").text("등록하기");
			$.ajax({
				url: Constant.CONTEXT_PATH + '/cmmntyMap/insertCmmntyAnswer.do'
					, data: data
					, dataType: 'json'
					, enctype: 'multipart/form-data'
					, processData: false
					, contentType: false
					, async: true
					, success: function(d) {  
						let result = d.result; 

						if (result>0){
							callCmmntyView();
							callOpinionList();
							$(".addOpinionWrap").removeClass("active");
							$("#opinionForm").reset();
							initQuesAnswer();
							$(".addPicList tr").remove();
							list = [];
							imgList = [];
						}
						
					}
			});
				
		}else if ( answer_jobmode =="UPDATE"){
			$("#answer_id").val(g_answer_id);
			let uptData = new FormData($("#opinionForm")[0]);
			
			$(".join").text("수정하기");
			$(".opinionReg").text("저장하기");
			$.post({ 
				url: Constant.CONTEXT_PATH + '/cmmntyMap/updateCmmntyAnswer.do'
					, data: uptData
					, dataType: 'json'
					, enctype: 'multipart/form-data'
					, processData: false
					, contentType: false
					, async: true
					, success: function(d) {  
						let result = d.result; 

						if (result>0){
							callCmmntyView();
							callOpinionList();
							$(".addOpinionWrap").removeClass("active");
							$("#opinionForm").reset();
							initQuesAnswer();
							list = [];
							imgList = [];
						}
					}
			});
			
		}

		resetMap();
		
 
	}

//	엔터값(\r\n)  ->  BR 태그 로 변경
    function replaceBrTag(str) {
        if (str == undefined || str == null)
        {
            return "";
        }

        str = str.replace(/\r\n/ig, '<br>');
        str = str.replace(/\\n/ig, '<br>');
        str = str.replace(/\n/ig, '<br>');
        return str;
    }
    
    function setQuesAnswer(el, v){
    	if(document.getElementById(el) != null){
			let elType = document.getElementById(el).type;
			if (elType === 'text'){
				$("#" + el).val(v) ; 
			}else{
	//			ques_answer = $('input[name='+el+']:checked').val();
				
				jQuery("input[value='"+v+"']").attr('checked', true);
				
			}
    	}
    }
    
    function initQuesAnswer(){
    	$('input[name="ques_answer1"]').removeAttr('checked');
    	$('input[name="ques_answer2"]').removeAttr('checked');
    	$('input[name="ques_answer3"]').removeAttr('checked');
    	$('input[name="ques_answer4"]').removeAttr('checked');
    	$('input[name="ques_answer5"]').removeAttr('checked');
    	$('input[name="ques_answer6"]').removeAttr('checked');
    	$('input[name="ques_answer7"]').removeAttr('checked');
    	$('input[name="ques_answer8"]').removeAttr('checked');
    	$('input[name="ques_answer9"]').removeAttr('checked');
    	$('input[name="ques_answer10"]').removeAttr('checked');
    	
    }
    //
    function getQuesAnswer(el){
    	
    	let ques_answer = '';

    	if(document.getElementById(el) != null){
			let elType = document.getElementById(el).type;
			if (elType === 'text'){
				ques_answer = $.trim($("#" + el).val());
			}else{
				ques_answer = $('input[name='+el+']:checked').val();
			}
			
			if (ques_answer === undefined){
				ques_answer = '';
			}
    	}
    	return ques_answer;
    }
    
	
	function initMap() {
		getLandInfoWmsLayer();
		
		const layers = {};
		const markers = {};
		
		map.map.addOverlay(popup);
		
		$map.on('click', '.map-type [data-map-action]', onMapTypeChange);
		$map.on('click', '.map-base-toggler', onMapBaseWMSChange);
		$map.on('click', '.map-catalog', onCatalogList);
		$map.on('click', '.map-stats', onMapStats);
		map.map.on('moveend', onMoveEnd);
		map.map.on('singleclick', onMapClick);

		map.map.on('pointermove', function (e) {
			const pixel = map.map.getEventPixel(e.originalEvent);
			const hit = map.map.hasFeatureAtPixel(pixel);
			map.map.getTarget().style.cursor = hit ? 'pointer' : '';
			
			if (hoverFeature !== null) {
				hoverFeature.setStyle(undefined);
				hoverFeature = null;
			}
			
			map.map.forEachFeatureAtPixel(e.pixel, function (f) {
				hoverFeature = f;
				return true;
			});

			if (hoverFeature && map_sel_cd == "01") {
				if (hoverFeature.get('feature_style') == undefined) return;
				
				hoverFeature.setStyle(
					new ol.style.Style({
			            image: new ol.style.Icon(({
			                anchor: [0.5, 46],
			                anchorXUnits: "fraction",
			                anchorYUnits: "pixels",
			                scale: 1.2,
			                src: JSON.parse(hoverFeature.get('feature_style'))[0].src
			            })),
			            text: new ol.style.Text({
			            	text: hoverFeature.getProperties().rnum + '',
			            	font: 'bold 16px Arial',
			            	offsetX: 0.5,
			            	offsetY: -30,
			            	fill: new ol.style.Fill({color: '#fff'}),
			            })
			        })
		        );
			}
		});

		map.map.on('movestart', disposePopover);
		
		/*
		$map.on('submit', '.map-anal-search', onMapSearchSubmit);
		$map.on('click', '.map-anal-item-select', onMapItemSelect);
	
		$map.on('click', '.map-layer-close', onLayerClose);
		$map.on('click', '.map-layer-grid', onLayerGridClick);
		$map.on('click', '.map-layer-legend', onLayerLegendClick);
		$map.on('click', '.map-layer-option', onLayerOptionClick);
		$map.on('click', '.map-layer-style', onLayerStyleClick);
		$map.on('change', '.map-layer-time', onLayerTimeChange);
		
		$map.on('click', '.map-layer-toggler', onLayerTogglerClick);
		$map.on('click', '.map-anal-toggler', onAnalTogglerClick);
		$map.on('click', '.map-legend-toggler', onLegendTogglerClick);
		$map.on('click', '.map-grid-toggler', onGridTogglerClick);
		*/
	}
	
	function getLandInfoWmsLayer(type) {
		const projExtent = ol.proj.get('EPSG:3857').getExtent();
		const startResolution = ol.extent.getWidth(projExtent) /256;
		const resolutions = new Array(22);
		for (let i = 0, ii = resolutions.length; i < ii; ++i) {
			resolutions[i] = startResolution / Math.pow(2, i);
		}
		const tileGrid = new ol.tilegrid.TileGrid({
			extent: projExtent,
			resolutions: resolutions,
			tileSize: [915, 700],
		});
		
		let wmsUrl = Constant.LANDINFO_WMS_BASE_URL;
		let wmsKey = Constant.LANDINFO_WMS_BASE_KEY;
		if (type == 'satellite' || type == 'hybrid' || type == 'midnight') {
			wmsUrl = Constant.LANDINFO_WMS_SATELLITE_URL;
			wmsKey = Constant.LANDINFO_WMS_SATELLITE_KEY;
		}
		
    	let landInfoLayer = new ol.layer.Tile({
			source: new ol.source.TileWMS({
				url: wmsUrl,
				params: {
					"authkey": wmsKey,
					"LAYERS": "0",
					"CRS": "EPSG:3857",
					"FORMAT": "image/png",
					"TRANSPARENT": "true",
					"BGCOLOR": "0xFFFFFF",
					"EXCEPTIONS": "blank",
					"domain": Constant.DOMAIN
				},
				serverType: "geoserver",
				tileGrid: tileGrid,
				crossorigin: 'anonymous',
				crossOrigin: 'anonymous'
			}),
			minResolution: 0.1,
			maxResolution: 20,
			name: "landInfo",
			type: "WMS",
			visible: true,
			opacity: 1
		});
		map.map.addLayer(landInfoLayer);
	}
	
	function disposePopover() {
		if (popover) {
			popover.dispose();
			popover = undefined;
		}
	}
	
	function onMapClick(e) {
		var feature = map.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
			if (layer == null) return;
			
			if (layer.get('name') == 'cmmnty') return feature;
			else return null;    
		});
		
		var coord = map.map.getCoordinateFromPixel(e.pixel);
		omMapPopvoer(feature, coord);
	}
	
	function omMapPopvoer(feature, coord) {
		disposePopover();
		
		if (!feature) return;
		
		if (feature) {
			let info = feature.getProperties();
			let HTML = '<div class="title"><i class="bx bx-x close"></i>' + info.answer_title + '</div>';
				HTML += '<div class="reg_info">작성자 : ' + info.answer_usr_nm + '&emsp;&emsp;작성일시 : ' + info.reg_dt + '</div>';
				HTML += '<pre class="cont">'+ info.answer_cont + '</pre>';
				
				if(info.img_file1 != null){
					HTML += '<div class="defaultImage slick-list">';
					HTML += '<div class="image_slide">';
		  			HTML += '<div class="variableSlider slick-slide"><img src="/loadImage.do?file_id='+info.img_file1+'"/></div>';
		  		}
		  		if(info.img_file2 != null){
		  			HTML += '<div class="variableSlider slick-slide"><img src="/loadImage.do?file_id='+info.img_file2+'"/></div>';
		  		}
		  		if(info.img_file3 != null){
		  			HTML += '<div class="variableSlider slick-slide"><img src="/loadImage.do?file_id='+info.img_file3+'"/></div>';
		  		}
		  		if(info.img_file1 != null){
		  			HTML += '</div></div>';
		  		}
			
			popup.setPosition(coord);
			popover = new bootstrap.Popover(element, {
				placement: 'right',
				html: true,
				//content: feature.getProperties().answer_title,
				content: HTML
			});
			popover.show();

			$(".image_slide").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				dots: true,
				variableWidth: false,
				
			});
			
			$(".image_slide div img").on("click", function(f){
				onAnswerPicPop(f.target.src);
			});
			
			$('.popover-body .close').on('click', disposePopover);
		} else {
			map_popup.setPosition(undefined);
		}
	};
	
	function onMapTypeChange(e) {
		e.preventDefault();
		const $this = $(e.currentTarget);
		const action = $this.data('map-action');
		switch(action) {
			case 'map-base': map.setMapLayer('base'); break;
			case 'map-satellite': map.setMapLayer('satellite'); break;
			case 'map-hybrid': map.setMapLayer('hybrid'); break;
			case 'map-gray': map.setMapLayer('gray'); break;
			case 'map-midnight': map.setMapLayer('midnight'); break;
		}
		$this.siblings().removeClass('active');
		$this.addClass('active');
		
		map.removeLayerByName('landInfo');
		getLandInfoWmsLayer(action.replace('map-', ''));
	}
	
	function onMapBaseWMSChange(e) {
		e.preventDefault();
		
		if ($('.map-base-item').length == 0) return;
		
		const $this = $('.map-base');
		if ($this.css('display') == 'none') $this.show();
		else $this.hide();
	}
	
	//의견 이미지 확대
	function onAnswerPicPop(src){
		$(".answerPicWrap").addClass("active");
		$(".answerPicWrap .Wrap").find("img").attr("src", src);
	}
	
	//정보지도 버튼 클릭
	function onCatalogList(e) {
		$(".cmmntyCatalogNav").addClass("active");
		
	}
	
	//통계그래프 버튼 클릭
	function onMapStats(e) {
		$(".cmmntyGraphSidenav").addClass("active");
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyStats.do'
				, data: { mapng_id: mapng_id }
				, dataType: 'json'
				, async: true
				, success: function(d) {  
					let pointStats = d.pointStats; 
					
					let resultData1 = dataTrans(pointStats, 'default');
					lineColumChart('pointStats', '유형별 통계', resultData1);
					
					let geomStats = d.geomStats;
					
					let sdCount = 0;
					geomStats.forEach((item, index) => {
						if(item.type == 'sd') sdCount ++;
					});
					
					if (sdCount == 1) {
						geomStats.forEach((item, index) => {
							item.type === 'sd' ? geomStats.splice(index, 1) : '' ;
						});
					}
  
					let resultData2 = dataTrans(geomStats, 'default');
					lineColumChart('geomStats', '지역별 통계', resultData2);

					let str = "";
					str += "<li class='answerGraph'>";
					str += "<h2></h2>";
					str += '<div class="card-content">';
					str += '<div id="" style="height:100%;"></div>';
					str += '</div></li>';
					
					$(".answerGraph").remove();
					if(d.cmmntyQuesStats1.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 1 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats1");
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats1, 'default');
						lineColumChart('cmmntyQuesStats1', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats2.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 2 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats2");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats2, 'default');
						lineColumChart('cmmntyQuesStats2', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats3.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 3 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats3");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats3, 'default');
						lineColumChart('cmmntyQuesStats3', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats4.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 4 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats4");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats4, 'default');
						lineColumChart('cmmntyQuesStats4', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats5.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 5 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats5");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats5, 'default');
						lineColumChart('cmmntyQuesStats5', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats6.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 6 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats6");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats6, 'default');
						lineColumChart('cmmntyQuesStats6', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats7.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 7 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats7");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats7, 'default');
						lineColumChart('cmmntyQuesStats7', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats8.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 8 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats8");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats8, 'default');
						lineColumChart('cmmntyQuesStats8', "질문별 통계", cmmntyQuesStats);
					}

					if(d.cmmntyQuesStats9.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 9 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats9");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats9, 'default');
						lineColumChart('cmmntyQuesStats9', "질문별 통계", cmmntyQuesStats);
					}
					if(d.cmmntyQuesStats10.length > 0) {
						$(".navbar-nav").append(str);
						$(".navbar-nav").find("li").last().find("h2").text("질문 10 통계");
						$(".navbar-nav").find("li").last().children("div").find("div").attr("id","cmmntyQuesStats10");
						
						let cmmntyQuesStats = dataTrans(d.cmmntyQuesStats10, 'default');
						lineColumChart('cmmntyQuesStats10', "질문별 통계", cmmntyQuesStats);
					}

					wordCloud(d.cmmntyAnswerWordCloud, 'cmmntyAnswerWordCloud');
				}
		});
	}
	
	//주소찾기 클릭
	$(".searchAddress").on('click', () => {		
		new daum.Postcode({
			oncomplete: function(data) { //선택시 입력값 세팅
				$("#address").val(data.address);
				$("#address").data("type", "ROAD");
				vWorldGeocoder("ROAD",data.address);
			}
		}).open();
	});
	
	async function onMoveEnd(e) {
		let center = ol.proj.transform(map.map.getView().getCenter(), 'EPSG:3857', 'EPSG:4326').toString();
		await $.ajax({
			type: 'POST',
			dataType: 'jsonp',
			url: Constant.VWORLD_GEOCODER_URL,
			data: { type: 'BOTH', service: 'address', request: 'getAddress', key: Constant.VWORLD_APIKEY, point: center },
			success: function(d) {
				const data = d.response.result;
				if(map_sel_cd == "01" || map_sel_cd == "04") $("#geom").val("Point("+center.replace(","," ")+")");
				if (data != undefined && data != null) {
					if (data.length == 1) {
						$('#address').val(data[0].text);
						$('#address').data('type', 'PARCEL');
					} else {
						$('#address').val(data[1].text);
						$('#address').data('type', 'ROAD');
					}
				}
			}, error : function(error){
				//console.log(error);
			}
		});
	}
	
	async function vWorldGeocoder(type, addr) {
		await $.ajax({
			type: 'POST',
			dataType: 'jsonp',
			url: Constant.VWORLD_GEOCODER_URL,
			data: { type: type, service: 'address', request: 'getCoord', key: Constant.VWORLD_APIKEY, address: addr },
			success: function(d) {
				const data = d.response.result;
				if(map_sel_cd == "01" || map_sel_cd == "04") $("#geom").val("Point("+data.point.x+" "+data.point.y+")");
				map.map.getView().animate({
					center: ol.proj.transform([data.point.x, data.point.y], 'EPSG:4326', 'EPSG:3857'),
					duration: 500
				});
			}, error : function(error){
				//console.log(error);
			}
		});
	}	
	
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

	//사진 등록
	let list = new Array();
	$("#picFiles").on('change', function(v) {
		if(v.target.files.length > 3){
			alert("사진은 3장까지 업로드 가능합니다.");
			return false;
		}else {
			if(eval(imgList.length + list.length + v.target.files.length) > 3) {
				alert("사진은 3장까지 업로드 가능합니다.");
				return false;
			}
			for(let i=0; i<v.target.files.length; i++){
				list.push(v.target.files[i]);
				
				let str = '';
				str += '<tr class="addPicListItem">';
				str += '<td>'+v.target.files[i].name+'</td>';
				str += '<td><svg class="fileDeleteBtn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg></td>';
				str += '</tr>';
				$(".addPicList").append(str);
			}
		}
	});
	
	//사진 삭제
	$(document).on('click','.fileDeleteBtn', function(e) { 
		list = list.filter(file => file.name != $(this).parents().prev("td").text());
		$(this).parents('tr').remove();		
	});
	
	//저장된 사진 삭제
	$(document).on('click','.realFileDeleteBtn', function(e) { 
		imgList = imgList.filter(id => id != $(this).parents().prev("td").data("img"));
		console.log(imgList);
		console.log(imgList.length);
		$(this).parents('tr').remove();		
	});
	
	$("#btnReportMap").on("click", ()=>{
		initReportPop();
		
		$(".reportWrap").addClass("active");	// 신고하기 팝업
	});
	
	$("#btnReportCancelMap").on("click", ()=>{
		if(!confirm('신고취소 하시겠습니까?'))
			return;
		 
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/reportCancelCmmntyAnswer.do'
				, data: {mapng_id: mapng_id} 
				, dataType: 'json'
				, async: true
				, success: function(d) { 
					alert("신고취소 처리되었습니다."); 
					
					$("#btnReportCancelMap").hide();
					$("#btnReportMap").show();
				} 
		});
	});
	
	function initReportPop(){
		$("input[name='report_cd']:eq(0)").prop("checked","checked"); 
		$("#answer_id").val("");
		$("#report_cont").val("");
		$("#report_cont").hide();
	}
	
	function resetMap(){
		if(tooltipElement){
			tooltipElement.parentNode.removeChild(tooltipElement);
			tooltipElement = null;
		}
		
		map.map.removeInteraction(draw);
		map.removeLayerByName('lineStringVec');
		map.removeLayerByName('polygonVec');
	}
	
	//반응형에서 지도위치찍기 버튼 클릭시 
	$(".showMap").on("click", () => {
		$(".addOpinionWrap").removeClass("active");
		$(".partcptnMapSidenav").removeClass("active");
		$(".navOpenButton").removeClass("active");
		$(".hideMap").addClass("active");
	});
	
	//반응형 위치 선택완료 클릭시 
	$(".hideMap").on("click", () => {
		$(".addOpinionWrap").addClass("active");
		$(".partcptnMapSidenav").addClass("active");
		$(".hideMap").removeClass("active");
	});
}

export default CmmntyDetailRoute;