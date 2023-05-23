import { Map, MapDataVisualizer } from '../modules/map';
import { Validator } from '../shared/validator';
import { Cookie } from '../shared/cookie-manage';

const HEIGHT = 600;
const HTML = {
	LAYER: (layer) => `
	<div class="map-layer-item">
		<div class="map-layer-title">
			<div class="map-layer-name">${layer.lyr_nm}</div>
			<select class="map-layer-time">${layer.lyr_dates.map((d, i) => `<option value="${layer.lyr_tbls[i]}">${d}</option>`).join('')}</select>
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
	`
};


function MyCmmntyFormRoute() {
	const $map = $('#map');
	const map = new Map($map);
	
	const $document = $(document);
	const $form = $('form');
	const modalWrap = $('.modalWrap');

	const $styleMarker = $(".modal_wrap_back.marker");
	const $styleMarkerList = $('.cmmntyMap-style-marker-list');
	
	const $styleLine = $(".modal_wrap_back.line");
	
	const markers = {};

	$('.settingButton').on('click', onLayerStyleClick);
	$('.DeleteButton').on('click', onDeleteButtonClick);
	$('#area_cd').on('change', getBndSggCdList);
	$document.on('click', '.cmmntyMap-style-marker-item', onStyleMarkerClick);
	$document.on('click', '.save_marker', onStyleSubmit);
	$document.on('click', '.cmmntyMap-style-line-palette', onPreviewLine);
	$document.on('click', '.save_line', onLineStyleSubmit);
	$document.on('keyup', '#line_width', setLineWidth);
	$document.on('change', "select[name=sel_quest_opt]", onSelQuestOptChange);
	$document.on('click', ".answerAddButton", onAnswerAddClick);
	$document.on('click', "button[name=answerDelButton]", onAnswerDelClick);
	
	//등록구분 선택
	$("#map_sel_cd").on("change", function() {
		$("input[name=map_sel_option]").val("");
		$(".marker_info").empty();
		
		if($(this).val() != "01"){
			$(".marker_wrap").hide();
		}else{
			$(".marker_wrap").show();
		};
	});
	
	//날짜선택시 상시 취소
	$("input[type=date]").on("change", () => {
		$("#dontCareCheck").prop("checked",false);
	});
		
	initMap();

	initKendo();

	initMapSelOption();

	function initKendo() {

		$styleLine.find('.cmmntyMap-style-line-palette').kendoColorPalette({
			value: '#000000'
		});
		
		setLineWidth(1);
		
		//선 모양 선택
		const dashArr = ['solid','dot','dash'];
		const valueArr = ['1','1 12','4 10'];
		for(let i=0; i<dashArr.length; i++){
			$(".cmmntyMap-style-line-dash").append("<input type='radio' name='line_dash' id='"+dashArr[i]+"' value='"+valueArr[i]+"'/><label for='"+dashArr[i]+"'><div class='"+dashArr[i]+"'></div></label>");
			$("input[name=line_dash]").eq(0).attr("checked",true);
			const draw = kendo.drawing;
			const path = renderPath(dashArr[i]);
			
			function renderPath(type) {
				let path = new kendo.drawing.Path({
			      stroke: {
			        color: '#000',
			        dashType: type
			      }
			    });
			
			    let start = new kendo.geometry.Point(10, 10);
			    for (var i = 0; i < 5; i++) {
			      path.lineTo(start.clone().translate(i * 20, 0));
			    }
			
			    return path;
			}
			const surface = draw.Surface.create($("."+dashArr[i]));
			surface.draw(path);
		}
	}
	
	//지역 선택시 시군구 코드 리스트 조회
	function getBndSggCdList(e){
		$.post({
			url: Constant.CONTEXT_PATH + '/cmmntyMap/getBndSggCdList.do'
				, data: {sd_cd: e.target.value }
				, dataType: 'json'
				, async: true
				, success: function(d) {
					let result = d.result;
					let str = "<option value=''>선택</option>";
					for(let i=0; i<result.length; i++){
						str += "<option value="+result[i].sgg_cd+">"+result[i].sgg_nm+"</option>";
					}
					$("#area_dtl_cd").html(str);
				}
			});
	}
	
	
	let vworldWmsLayer;

	//썸네일등록 버튼 클릭
	$(".tumbSettingButton").on("click", function(){ 
		
		$(".image").addClass("active");
	
		//썸네일 기본이미지 슬라이드
		
		$(".default_slide").slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			dots: true,
			variableWidth: true,
			
						
//			respinsive: [
//				{
//					breakpoint: 1080,
//					settings: {
//						slidesToShow: 1
//					}
//				}
//			]
		});
		
		$('.slider-track').slick('goTo', 1);
	});

	//질문추가하기 버튼 클릭
	$(".questionSettingButton").on("click", () => {
		if($(".question-wrap").length > 10){
			alert("질문은 최대 10개까지 가능합니다.");
		}else {
			let addRow = $(".question-wrap").eq(0).clone();
			addRow.css("display","");
			addRow.find("input").val("");
			$(".form-question").append(addRow);
		}
	});
	
	//기본 이미지 클릭
	$(".variableSlider").on("click", function() {
		if($("#preview").length > 0 && $("#preview").is(':visible')){
			$("#preview").hide();
		}
		
		let regExp = /(["'])(?:(?=(\\?))\2.)*?\1/;
		$(".preview_image").css("background-image",'url('+$(this).css("background-image").match(regExp)[0]+')');
		$("#file_id").val($(this).attr("class").match(/[0-9]/)[0]);
//		$("#img_file").val("");
	});
	
	//이미지 미리보기 기능
	$("#img_file").on("change", function(){
		//첨부파일 확장자&크기 제한
		let regex = new RegExp("(.*?)\.(jpg|bmp|gif|png)$");
		let maxSize = 5242880;
		let file = $(this).get(0).files[0];
		
		if (file == undefined) return;
		
		if(file.size >= maxSize){
			alert("5mb 이상 파일은 첨부할 수 없습니다.");
			$(this).val('');
			return false;
		};
		if(!regex.test(file.name)){
			alert("첨부 가능한 사진은 jpg, png, bmp, gif 입니다.");
			$(this).val('');
			return false;
		}
		
		if($("#preview").length > 0 && $("#preview").is(':visible')){
			$("#preview").hide();
		}
		
		if($(this).get(0).files && file) {
			
			var reader = new FileReader();
			reader.onload = function(e) {
				$(".preview_image").css("background-image",'url("' + e.target.result + '")');
			};
			reader.readAsDataURL(file);
		}else{
			$(".preview_image").css("background-image","");
		}
	});

	//이미지 등록
	$(".save_img").on("click", function(){
		if($(".preview_image").css("background-image") == "none"){
			alert("이미지를 등록하거나, 기본 이미지를 선택해주세요.");
			return false;
		};
		$form.find("#img_file").remove();
		let file = $("#img_file").clone();
		file.css("display", "none");
		$form.append(file);
		
		modalWrap.css("display","none");
		$(".img_preview").addClass("active");
		$(".img_preview").css("background-image",$(".preview_image").css("background-image"));
		$(".close_modal").trigger("click");
	});
	
	$(".close_modal").on("click", function(){
		/*
		if($("#preview").length > 0 && !$("#preview").is(':visible')){ //취소버튼
			$("#preview").show();
			$(".image").css("background-image","");
			//$("#file_id").val($(this).attr("class").match(/[0-9]/)[0]);
			$("#img_file").val("");
		}
		*/
		$(".modal_wrap_back.image").removeClass('active');
	});
	
	//삭제하기 버튼 클릭
	$(document).on("click", ".questionRemoveButton", function() {
		var curIdx = $(".question-wrap .questionRemoveButton").index($(this));
		var curRmvObj = $(".question-wrap:eq("+curIdx+")");
		curRmvObj.remove();
	});

	//무관 체크 여부 확인
	const chkDateDontCare = [(v, ov) => $("#dontCareCheck").is(":checked") != false || v !== '' && v !== null && v !== undefined, '기간설정,상시 둘 중 한개는 필수입니다.'	];
	//기간 선택 여부 확인
	const chkStartDt = [(v, ov) =>  $("#start_dt").val() === '' || v !== '' && v !== null && v !== undefined, ' 필수입니다.'];
	//이미지 선택 여부 확인
	const chkImgFile = [(v, ov) =>  v !== '' && v !== null && v !== undefined || $("#file_id").val() !== '' && $("#file_id").val() !== null && $("#file_id").val() !== undefined, ' 필수입니다.'];
	//무관 체크시 날짜 삭제
	$("#dontCareCheck").on('change',(v,ov)=>{
		if(v.target.checked){
			$("#start_dt").val("");
			$("#end_dt").val("");
		};
	});
	
	const validator = new Validator({
		mapng_title: { required: true, maxLength: 50 },
		mapng_desc: { required: true, maxLength: 200 },
		cat_cd: { required: true },
		map_sel_cd: { required: true },
		map_sel_option: { required: true },
	}, {
		fieldNames: {
			mapng_title: '매핑제목',
			mapng_desc: '매핑소개',
			cat_cd: '카테고리',
			map_sel_cd: '등록구분',
			map_sel_option: '등록구분 설정',
		}
	});
	
	const validatorTemp = new Validator({
		mapng_title: { required: true, maxLength: 50 }
	}, {
		fieldNames: {
			mapng_title: '매핑제목'
		}
	});

	//저장하기
	$form.on('submit', async (e, d) => {
		if(d === true) return d;
		
		e.preventDefault();
		
		if(!await chkQuesNm()){
			return;
		}
		
		var objOption = $(".question-wrap:not(:eq(0)) select[name='sel_quest_opt']");
		objOption.each(function(idx, item){
			if($(this).val()=="03"){
				var idxOption = $(".question-wrap select[name='sel_quest_opt']").index($(this));
				var strOptionNm = "ipt_quest_option";
				$(".question-wrap:eq("+idxOption+") input[name='"+strOptionNm+"']").prop("name", strOptionNm+idxOption);
			}
		});

		let styleList = new Array();
		if($("#map_sel_cd").val() == "01" && $(".marker_info div").length > 0){
			$(".marker_info div").each(function(){
				let style = new Object();
				style.src = $(this).find("img").attr("src");
				style.desc = $(this).find("input").val();
				styleList.push(style);
			});
			$("input[name=map_sel_option]").val(JSON.stringify(styleList));
		}
		
		let dataWmsArr = new Array();
		let dataStyleArr = new Array();
		let dataTextArr = new Array();
		$("input[name=data_wms]").each(function(){
			dataWmsArr.push($(this).val());
		});
		$("input[name=dataWmsList]").val(dataWmsArr);
		
		$("input[name=data_style]").each(function(){
			dataStyleArr.push($(this).val());
		});
		$("input[name=dataStyleList]").val(dataStyleArr);
		
		$("input[name=data_nm]").each(function(){
			dataTextArr.push($(this).val());
		});
		$("input[name=dataNmList]").val(dataTextArr);
		
		//if(d === true) return d;
		
		//e.preventDefault();
		const data = $form.serializeFlat();
		
		if($("input[name=temp_yn]").val() != "Y"){
			if(!await validator.validateAllAsync(data))
				return;
		}else {
			if(!await validatorTemp.validateAllAsync(data))
				return;
		}

		$form.trigger('submit', true);
	});
	
	//취소 버튼 클릭
	$(".cancleButton").on("click", () => location.href=Constant.CONTEXT_PATH + "/mycmmntyMap/mycmmnty-list.do" );
	
	//임시저장 버튼 클릭
	$(".temporaryButton").on("click", () => {
		$("input[name=temp_yn]").val("Y");
		$form.submit();
	});
	
	//저장 버튼 클릭
	$(".SaveButton").on("click", () => {
		$("input[name=temp_yn]").val("N");
		$form.submit();
	});
	
	function initMap() {
		
		const layers = {};
		const markers = {};
		
		//현재 위치 요청
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				map.map.getView().animate({
					//center: [pos.coords.longitude, pos.coords.latitude],
					center: ol.proj.transform([pos.coords.longitude, pos.coords.latitude], 'EPSG:4326', 'EPSG:3857'),
					zoom: 13,
					duration: 500
				});
			});
		}
		
		//위치데이터 카테고리 클릭
		$('.locationList label').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
	    	$(this).next().toggleClass('on');
		});
		
		//위치데이터 데이터 그룹 클릭
		$('.locationList dl dt').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('on');
			$(this).next().toggleClass('on');
		});
		
		//위치데이터 체크박크 생성 및 wms 요청
		$('.locationList ol li').each(function(idx, item){
	        $(item).prepend('<input type="checkbox" id="chk_' + idx + '"/>');
	    }).promise().done(function () {
	    	let _this = this;
	    	//wms 요청
	    	$(this).find('input[type="checkbox"]').on('change', function () {
				if (this.checked) {
					let wmsLayer = $(this).parent().data('wms');
					let wmsStyle = $(this).parent().data('style');
					vworldWmsLayer = new ol.layer.Tile({
						source: new ol.source.TileWMS({
							url: `${Constant.VWORLD_WMS_URL}`,
							params: {
								"SERVICE": "WMS",
								"REQUEST": "GetMap",
								"VERSION": "1.3.0",
								"LAYERS": wmsLayer,
								"STYLES": wmsStyle,
								"TILED": true,
								"WIDTH": 256,
								"HEIGHT": 256,
								"FORMAT": "image/png",
								"KEY": `${Constant.VWORLD_APIKEY}`
							},
							serverType: "geoserver"
						}),
						minResolution: 0.1,
						maxResolution: 20,
						name: wmsLayer,
						layerCategory: "WMS",
						type: "WMS",
						visible: true,
						opacity: 1
					});
					
					map.map.addLayer(vworldWmsLayer);
					
					if ($('.selectedLocationList ul li').length < 5) {
						let str = "";
						str += '<li>';
						str += '<input type="hidden" name="data_wms" value="'+wmsLayer+'"/>';
						str += '<input type="hidden" name="data_style" value="'+wmsStyle+'"/>';
						str += '<input type="hidden" name="data_nm" value="'+$(this).parent().text()+'"/>';
						str += '<label>' + $(this).parent().text() + '</label><i class="bx bx-minus-circle"></i></li>';
						$('.selectedLocationList ul').append(str);
						$('.selectedLocationList ul li i').on('click', function() {
							let layerTitle = $(this).parent().text();
							$(this).parent().remove();
							$('.locationList ol li input[type="checkbox"]').each(function() {
								if ($(this).parent().text() == layerTitle) {
									$(this).prop('checked', false);
									map.removeLayerByName($(this).parent().data('wms'));
								}
							});
							changeSelectedLocationList();
						});
					} else {
						alert('화면에 표시할 수 있는 위치데이터의 수는 최대 5개 입니다.\n위치데이터의 check 상태를 조정 후 다시 시도하여 주십시오.');
					}
					changeSelectedLocationList();
				} else {
					map.removeLayerByName($(this).parent().data('wms'));
					let layerTitle = $(this).parent().text();
					$('.selectedLocationList ul li').each(function() {
						if ($(this).find('label').text() == layerTitle) {
							$(this).remove();
						}
					});
					changeSelectedLocationList();
				}
			});
	    });
	    
		$.post({
			url: Constant.CONTEXT_PATH + '/mycmmntyMap/getMyCmmntyMapDataList.do'
			, data: {mapng_id: $("#mapng_id").val() }
			, dataType: 'json'
			, async: true
			, success: function(r) {
				let result = r.myMapDataList;
				for(let i=0; i<result.length; i++){
					var objCheck = $("[data-wms='"+result[i].data_wms+"'] input:checkbox[id^='chk_']");
					objCheck.prop("checked","checked");
					objCheck.trigger("change");
					objCheck.parents("dl").prev().addClass('active');
					objCheck.parents("dl").addClass('on');
					objCheck.parents("dd").prev().addClass('on');
					objCheck.parents("dd").addClass('on');
				}
			}
		});
	}

	function changeSelectedLocationList() {
		let listCnt = $('.selectedLocationList ul li').length;
	    if (listCnt > 0) {
	        $('.selCnt').html('(' + listCnt + ')');
	    } else {
	    	$('.selCnt').html('');
	    }
	}
	
	function oncmmntyMapStyleReset(e) {
		const $dialog = e.sender.element;

		const layerId = $dialog.data('layer');

		cleanupLayerStyle(layerId);
	}
	
	async function onLayerStyleClick(e) {
		
		if($("#map_sel_cd").val() == "01"){
			e.preventDefault();
			$styleMarker.addClass("active");
	
			await loadMarker();
			
		}else if($("#map_sel_cd").val() == "02"){
			$styleLine.addClass("active");
			$(".polygon").hide();
		}else if($("#map_sel_cd").val() == "03" || $("#map_sel_cd").val() == "04"){
			$styleLine.addClass("active");
			$(".polygon").show();
		}else{
			alert("등록구분을 선택 후 설정해주세요.");
		}
	}

	//마커 조회
	async function loadMarker() {
		const markerList = await $.post(Constant.CONTEXT_PATH + '/cmmntyMap/getCmmntyMarker.do');

		$(".cmmntyMap-style-marker-list").html("");
		for(const i in markerList.marker) {
			const marker = markerList.marker[i];
			const $item = $('<div class="cmmntyMap-style-marker-item"><img /><div>');
			$item.find('img').attr('src', Constant.CONTEXT_PATH + '/assets/images/marker/' + marker);
			$item.appendTo($styleMarkerList);
		}
	}

	//마커 클릭
	function onStyleMarkerClick(e) {
		e.preventDefault();

		const $this = $(e.currentTarget);
		
		if($this.attr("class").indexOf('active') > -1){
			$this.removeClass('active');
		}else $this.addClass('active');

	}
	
	//마커 선택
	function onStyleSubmit(e) {
		let img = $('.cmmntyMap-style-marker-item.active img');
		let info_str = "";
		$(".marker_wrap").find("p").remove();
		$(".marker_wrap").prepend('<p class="category">아이콘설명</p>');
		for(let i=0; i<img.length; i++){
			info_str += "<div>";
			info_str += "<img src='"+img.get(i).currentSrc+"'/>";
			info_str += "<input type='text' name='marker_name' id='marker_name' placeholder='설명이 필요한 경우 입력해주세요.' >";
			info_str += "</div>";
		}
		
		$(".marker_info").html(info_str);
		$(".close_modal").trigger("click");
	}
	
	//선 두께 설정
	function setLineWidth(e) {
		let width = 1;
		if(typeof(e) != "number"){
			width = e.target.value;
		}
		const draw = kendo.drawing;
		const path = renderPath();
		
		function renderPath() {
			let path = new kendo.drawing.Path({
		      stroke: {
		        color: '#000',
		        width: width
		      }
		    });
		
		    let start = new kendo.geometry.Point(10, 10);
		    for (var i = 0; i < 5; i++) {
		      path.lineTo(start.clone().translate(i * 20, 0));
		    }
		
		    return path;
		}
		
		const surface = draw.Surface.create($(".preview_line"));
		surface.draw(path);
	}
	
	//라인 색상 미리보기
	function onPreviewLine(e) {
		let target = e.currentTarget;
		$(target).next("div").css("background-color", $(target).data('kendoColorPalette')._value.match.input);
	}
	
	//라인 설정
	function onLineStyleSubmit(e) {
		if($styleLine.find("#line_width").get(0).value == ""){
			alert("두께를 입력해주세요.");
			return false;
		}
		let style = new Object();
		style.color = $styleLine.find('.line').data('kendoColorPalette')._value.match.input;
		style.width = $styleLine.find("#line_width").get(0).value;
		style.lineDash = $styleLine.find("input[name=line_dash]:checked").get(0).value;
		if($("#map_sel_cd").val() == "03" || $("#map_sel_cd").val() == "04") style.fill = $styleLine.find('.bg').data('kendoColorPalette')._value.match.input;
		
		$(".style_str").html("색상 : "+ style.color + ", 두께 : " + style.width + "px");
		$("input[name=map_sel_option]").val(JSON.stringify(style));
		$(".close_modal").trigger("click");
	}
	
	function initMapSelOption(){
		var strMapSelCd = $("#map_sel_cd").val();
		if(strMapSelCd == "01"){
			$(".marker_wrap").show();
			var strMapSelOption = $("#map_sel_option").val();
			if(strMapSelOption && strMapSelOption != ""){
				var jsonMapSelOption = JSON.parse(strMapSelOption);
				
				$(".marker_wrap").find("p").remove();
				$(".marker_wrap").prepend('<p class="category">아이콘설명</p>');
				
				let info_str = "";				
				
	            jsonMapSelOption.forEach(function(curItem, idx, allItem){
					info_str += "<div>";
					info_str += "<img src='" + Constant.CONTEXT_PATH + "/assets" + curItem["src"].split("assets")[1] + "'/>";
					info_str += "<input type='text' name='marker_name' id='marker_name' value='"+curItem["desc"]+"' >";
					info_str += "</div>";
				});
				
				$(".marker_info").html(info_str);
			}
		}else{
			$(".marker_wrap").hide();
		}
	}
	
	async function onDeleteButtonClick(e) {
		e.preventDefault();

		if(confirm("삭제하시겠습니까?")){
			try {
				const result = await $.post(Constant.CONTEXT_PATH + '/mycmmntyMap/deleteMyCmmntyMap.do', {mapng_id: $("#mapng_id").val()});
	
				alert('삭제가 완료되었습니다.');
				location.href=Constant.CONTEXT_PATH + "/mycmmntyMap/mycmmnty-list.do";
	
			}catch(e) {
				console.log(e);
			} finally {
				
			}
		}
	}
	
	function onSelQuestOptChange(e){
		var curVal = e.target.value;
		var curIdx = $("select[name=sel_quest_opt]").index($(this));
		var curOptObj = $(".question-wrap:eq("+curIdx+") .form-question-row:eq(1)");
		
		if(curVal == "03"){ //객관
			curOptObj.show();
		}else if(curVal == "01"){ // 단답
			curOptObj.hide();
		}
	}
	
	function onAnswerAddClick(e){
		var curIdx = $(".question-wrap .answerAddButton").index($(this));
		var objOption = $(".question-wrap:eq("+curIdx+") input[name=ipt_quest_option]");
		if(objOption.length < 5){
			var curAddObj = objOption.last();
			var addObj = curAddObj.clone();
			addObj.val("");
			
			$(this).before(addObj);
			
			let btn = "";
			btn += '<button type="button" name="answerDelButton" class="del-btn">';
			btn += '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">';
			btn += '<path d="M19 6.225 17.775 5 12 10.775 6.225 5 5 6.225 10.775 12 5 17.775 6.225 19 12 13.225 17.775 19 19 17.775 13.225 12z" fill="#111" fill-rule="evenodd"/>';
			btn += '</svg></button>';
			$(this).before(btn);
			addObj.css("margin-right","3px");
		}else{
			alert("답변은 최대 5개까지 가능합니다.");
		}
	}
	
	function onAnswerDelClick(e){
		var curAddIdx = $(".question-wrap .answerAddButton").index($(this).siblings(".answerAddButton"));
		var curIdx = $(".question-wrap:eq("+curAddIdx+") button[name=answerDelButton]").index($(this));
		var objOption = $(".question-wrap:eq("+curAddIdx+") input[name=ipt_quest_option]");
		
		objOption.eq(++curIdx).remove();
		$(this).remove();
	}
	
	async function chkQuesNm(){ 
		var objQuesNm = $('.question-wrap:not(:eq(0)) input:text[name="ques_nm"]');
		var fltQuesNm = objQuesNm.filter(function() { return this.value == ""; });
		var objQuesOption = $('.question-wrap:not(:eq(0)) input:text[name="ipt_quest_option"]:visible');
		var fltQuesOption = objQuesOption.filter(function() { return this.value == ""; });
		var iLenQuesNm = fltQuesNm.length;
		var iLenQuesOption = fltQuesOption.length;
		
		if(iLenQuesNm > 0){
			alert("질문을 입력하세요.");
			return false;
		}else if(iLenQuesOption > 0){
			alert("질문의 옵션을 입력하세요.");
			return false;
		}
		
		return true;
	}
}

export default MyCmmntyFormRoute;