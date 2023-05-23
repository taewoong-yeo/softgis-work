import { Map, MapDataVisualizer } from '../modules/map';
import { Validator } from '../shared/validator';
import { Cookie } from '../shared/cookie-manage';

function TroblGoodsCnrsRoute() {
	
	const $map = $('#map');
	const map = new Map($map);
		
	initMap();
	
	const $form = $('form');
	const popupDetail = $(".popupDetail");
	const navLink = $('.nav-link');
	const replyCommit = $('.replyCommit');
	const dontCareCheck = $("#dontCareCheck");
	const partcptnSearch = $(".partcptnSearch");
	getList("");

	//무관 체크 여부 확인
	const chkDateDontCare = [(v, ov) => dontCareCheck.is(":checked") != false || v !== '' && v !== null && v !== undefined, '대여가능기간,무관 둘 중 한개는 필수입니다.'	];
	//기간 선택 여부 확인
	const chkStartDt = [(v, ov) =>  $("#rental_start_dt").val() === '' || v !== '' && v !== null && v !== undefined, ' 필수입니다.'];
	//무관 체크시 날짜 삭제
	dontCareCheck.on('change',(v,ov)=>{
		if(v.target.checked){
			$("#rental_start_dt").val("");
			$("#rental_end_dt").val("");
		};
	});
	
	const validator = new Validator({
		goods_nm: { required: true, maxLength: 50 },
		rental_start_dt: { function: chkDateDontCare },
		rental_end_dt: { function: chkStartDt },
		goods_addr: { required: true}
	}, {
		fieldNames: {
			goods_nm: '물품명',
			rental_start_dt: '대여가능기간',
			rental_end_dt: '대여가능기간',
			goods_addr: '위치'
		}
	});
	
	navLink.on('click', function() { 
		$(".partcptnMapSidenavTwoDept").toggleClass("active"); 
		$('.nav-link').removeClass("active");
		$(this).addClass("active"); 
		
	});
	navLink.eq(0).trigger('click');
	
	//리스트 닫기 버튼 클릭
	$('.closeButton').on('click', () => { $(".partcptnMapSidenavTwoDept").removeClass("active"); });

	//신청 버튼 클릭
	$(document).on('click','.reservationButton', (e) => { viewInfo(e.target.id) });

	//신청 팝업 닫기
	$('.itemPopupClose a').on('click', () => { $(".itemPopup").removeClass("active"); });

	//등록 팝업 닫기
	$('.itemAddPopupClose a').on('click', () => { $(".itemAddPopup").removeClass("active"); });

	//리스트 항목 선택시
	$(document).on('click','.partcptnListItem', function(e) { 
		$(this).addClass("active");	
		$(this).siblings().removeClass("active"); 
		
		if($(this).attr("class").indexOf("mine") > -1){
			$(".itemAddPopup").addClass("active");
			$.post({
				url: '/partcptnMap/getTroblGoodsDetail.do'
					, data: {goods_id: $(this).attr("id") }
					, dataType: 'json'
					, async: true
					, success: function(rst) {
						$("#goods_id").val(rst.result.goods_id);
						$("#goods_nm").val(rst.result.goods_nm);
						$("#rental_start_dt").val(rst.result.rental_start_dt);
						$("#rental_end_dt").val(rst.result.rental_end_dt);
						if(rst.result.rental_start_dt == null || rst.result.rental_start_dt == ''){
							dontCareCheck.prop("checked",true);
						}else{
							dontCareCheck.prop("checked",false);
						}
						$("#goods_addr").val(rst.result.goods_addr);
					}
				});
		}
	});
	
	//댓글 삭제
	$(document).on('click',".replyDeleteButton",function(){
		$(this).parent(".replyListItem").remove(); 
	});
	
	//댓글 등록
	replyCommit.on('click', () => {
		$.post('insertTroblGoodsReply.do', {goods_id: $("#rsv_goods_id").val(), reply_cont: $("#reply_cont").val()}); 
		viewInfo($("#rsv_goods_id").val());
		$("#reply_cont").val("");
	});
	
	//상세 내용 조회
	function viewInfo(id){
		$("#rsv_goods_id").val(id);
		$.post({
			url: '/partcptnMap/getTroblGoodsDetail.do'
				, data: {goods_id: id }
				, dataType: 'json'
				, async: true
				, success: function(rst) {
					popupDetail.find($(".name")).html(rst.result.goods_nm);
					popupDetail.find($(".popupDurationOne")).html(rst.result.rental_start_dt);
					popupDetail.find($(".popupDurationTwo")).html(rst.result.rental_end_dt);
					popupDetail.find($(".location")).html(rst.result.goods_addr);

					let str = "";
					for(let i=0; i<rst.replyList.length; i++){
						str += '<div class="replyListItem">';
						str += '<p class="replyWriter">'+rst.replyList[i].reg_usr_id+'</p>';
						str += '<p class="replyContent">'+rst.replyList[i].reply_cont+'</p>';
						str += '<p class="replyDate">'+rst.replyList[i].reg_dt+'</p>';
						str += '<svg class="replyDeleteButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg>';
						str += '</div>';
					}
					$(".replyListBox").html(str);
				}
			});
		$(".itemPopup").addClass("active");
	}
	
	//목록 조회
	function getList(gb, keyword) {
		$.post({
			url: '/partcptnMap/getTroblGoodsList.do'
				, data: {listGb: gb, search_keyword: keyword }
				, dataType: 'json'
				, async: true
				, success: function(rst) {
					let str = "";
					for(let i=0; i<rst.list.length; i++){
						str += '<div class="partcptnListItem ';
						if(i==0 && gb == "") str += "active"; 
						if(gb != "") str += ' mine" id="'+rst.list[i].goods_id; 
						str += '">';
						str += '<div class="itemName">';
						str += '<p class="category">물품명</p>';
						str += '<p class="name">'+rst.list[i].goods_nm+'</p>';
						str += '</div>';
						str += '<div class="rentDuration">';
						str += '<p class="category">대여가능기간</p>';
						str += '<p class="durationOne">'+rst.list[i].rental_dt+'</p>';
						str += '</div>';
						str += '<div class="itemLocation">';
						str += '<p class="category">위치</p>';
						str += '<p class="location">'+rst.list[i].goods_addr+'</p>';
						str += '</div>';
						str += '<div class="buttonWrap">';
						if(gb == "") str += '<button class="reservationButton" id="'+rst.list[i].goods_id+'"><p id="'+rst.list[i].goods_id+'" class="reserveText active">신청하기</p><p class="editText">수정하기</p></button>';
						str += '</div>';
						str += '</div>';
					}
					$(".list").html(str);
				}
			});
	}
	
	//검색 버튼 클릭시
	partcptnSearch.on('click', () => {
		if($(".partcptnReturnList").attr("class").indexOf("active") > -1){
			getList('INDVDL',$("#search_keyword").val());
		}else getList('',$("#search_keyword").val());
	});
	
	//추가하기 버튼 클릭시
	$(".partcptnAddList").on('click', () => { 
		$form.find("input").val("");
		$(".partcptnReturnList").addClass("active");
		$(".addNotice").addClass("active");
		$(".itemAddPopup").addClass("active");
		$(".itemPopup").removeClass("active");
		$("#search_keyword").val('');
		getList("INDVDL");
	});

	//목록으로 버튼 클릭시
	$(".partcptnReturnList").on('click', () => { 
		$(".partcptnReturnList").removeClass("active");
		$(".addNotice").removeClass("active");
		$(".itemAddPopup").removeClass("active");
		$(".itemPopup").removeClass("active");
		$("#search_keyword").val('');
		getList("");
	});
	
	//주소 검색
	$(".popupMapSearch").on('click', () => {		
		new daum.Postcode({
			oncomplete: function(data) { //선택시 입력값 세팅
				$("#goods_addr").val(data.address);
			}
		}).open();
	});

	//사진 등록
	let list = new Array();
	$("#picFiles").on('change', function(v) {
		for(let i=0; i<v.target.files.length; i++){
			list.push(v.target.files[i]);
			
			let str = '';
			str += '<tr class="addPicListItem">';
			str += '<td>'+v.target.files[i].name+'</td>';
			str += '<td><svg class="replyDeleteButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M16 12H8"/><circle cx="12" cy="12" r="10"/></g></svg></td>';
			str += '</tr>';
			$(".addPicList").append(str);
		}
	});
	
	//사진 삭제
	$(document).on('click','.replyDeleteButton', function(e) { 
		list = list.filter(file => file.name != $(this).parents().prev("td").text());
		$(this).parents('tr').remove();		
	});
	
	$form.on('submit', async (e, d) => {
		const dataTranster = new DataTransfer();
		Array.from(list)
	    .forEach(file => {
	        dataTranster.items.add(file);
	    });
		document.querySelector('#fileList').files = dataTranster.files;
		
		if(d === true) return d;
		e.preventDefault();
		const data = $form.serializeFlat();

		if(!await validator.validateAllAsync(data))
			return;

		if($("#goods_id").val() != ""){
			$form.attr("action","/partcptnMap/updateTroblGoods.do");
		}
		$form.trigger('submit', true);
	});
	
	function initMap() {
		
		const layers = {};
		const markers = {};
		
		
		/*
		$map.on('click', '.map-type [data-map-action]', onMapTypeChange);
		$map.on('click', '.map-anal-filter button', onMapFilterChange);
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
}

export default TroblGoodsCnrsRoute;