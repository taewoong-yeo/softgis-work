<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<t:app>
	<h2 style="display:none;">함께할지도</h2>
	
	<input type="hidden" name="is_admin" id="is_admin" value="${__ADMIN__}">
	<input type="hidden" name="user_id" id="user_id" value="${__USER__.getUsr_id()}">
	<input type="hidden" name="answer_jobmode" id="answer_jobmode" value="">
	<input type="hidden" name="answer_cd" id="answer_cd" value="">
	<input type="hidden" id="map_sel_cd" name="map_sel_cd">
	<input type="hidden" id="endYn"/>
	
	<div id="map" class="map map-ov-lt">
		<div id="popup"></div>
		<div id="map-legend" class="map-legend"></div>
		<div class="map-ui map-ui-rt map-catalog">
			<button class="base" data-map-action="map-catalog" title="정보지도 중첩">정보지도 중첩</button>
		</div>
		<div class="map-ui map-ui-rt map-stats">
			<button class="base" data-map-action="map-stats" title="통계 보기">통계 보기</button>
		</div>
		<div class="map-ui map-ui-rt map-type">
			<button class="base active" data-map-action="map-base" title="일반">일반</button>
			<button class="satellite" data-map-action="map-satellite" title="영상">영상</button>
			<button class="hybrid" data-map-action="map-hybrid" title="하이브리드">하이브리드</button>
			<button class="gray" data-map-action="map-gray" title="흑백">흑백</button>
			<button class="midnight" data-map-action="map-midnight" title="야간">야간</button>
		</div> 
		<div class="map-ui map-ui-rt map-action">
			<div class="map-ui-group">
				<button data-map-action=":full-screen" title="전체 화면"><i class="fas fa-expand"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="home" title="홈으로"><i class="fas fa-home"></i></button>
				<button data-map-action=":zoom-in" title="확대"><i class="fas fa-plus"></i></button>
				<button data-map-action=":zoom-out" title="축소"><i class="fas fa-minus"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="measure-exit" title="취소"><i class="fas fa-mouse-pointer"></i></button>
				<button data-map-action="measure-line" title="거리재기"><i class="fas fa-ruler-horizontal"></i></button>
				<button data-map-action="measure-polygon" title="면적재기"><i class="fas fa-ruler-combined"></i></button>
				<button data-map-action="measure-radius" title="반경재기"><i class="fas fa-circle-notch"></i></button>
				<button data-map-action="measure-reset" title="초기화"><i class="fas fa-eraser"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="ui-visible" title="UI 표시"><i class="fas fa-eye-slash"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="capture" title="이미지 저장"><i class='bx bxs-download'></i></button>
			</div>
			<div class="map-ui-group u-margin-bottom-0">
				<button class="map-base-toggler" title="배경지도 목록"><i class="bx bxs-layer"></i></button>
				<div class="map-base">
					<h3>배경지도</h3>
					<div class="map-base-inner">
						<div class="map-base-item landinfo">
							<div class="map-base-title" style="background: #007d52; color: #fff;">
								<label class="map-base-name" data-wms="landInfo">국토정보기본도</label>
								<div class="map-base-info">
									<a href="#" class="map-base-info-source" title="데이터 정보"><i class="bx bx-question-mark"></i></a>
									<a href="#" class="map-base-info-legend" title="범례 보기"><i class="bx bx-images"></i></a>
									<input type="checkbox" class="map-base-info-show" name="layer_show" value="" checked title="레이어 보기/숨기기">
								</div>
							</div>
							<div class="map-base-toolbar" style="background: #007d5226;">
								<div class="map-base-opacity">
									<span class="map-base-opacity-label">투명도</span>
									<input class="map-base-opacity-input" value="100">
									<p class="map-base-opacity-value">100%</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="center_point"></div>
		<img class="center_marker" src="<c:url value='/assets/images/marker/marker11.png'/>" width="46px;" height="46px;" />
	</div>
	<div class="contents partcptnMap">
		<div class="navOpenButton active">
			<svg width="24" height="38" viewBox="0 0 100 126" xmlns="http://www.w3.org/2000/svg">
			    <path d="M68.182 76.5H59.09v-9H40.909v9h-9.09v-9c.004-4.968 4.072-8.995 9.09-9h18.182c5.018.005 9.086 4.032 9.09 9v9zM50 54c-7.531 0-13.636-6.044-13.636-13.5S42.469 27 50 27c7.531 0 13.636 6.044 13.636 13.5C63.628 47.952 57.528 53.992 50 54zm0-18c-2.51 0-4.545 2.015-4.545 4.5S47.49 45 50 45s4.545-2.015 4.545-4.5C54.543 38.016 52.51 36.003 50 36zm0 90L11.657 81.23a158.041 158.041 0 0 1-1.583-2.03A48.68 48.68 0 0 1 0 49.5C0 22.162 22.386 0 50 0s50 22.162 50 49.5a48.66 48.66 0 0 1-10.067 29.688l-.007.011s-1.364 1.775-1.567 2.013L50 126zM17.33 73.777c.004.004 1.06 1.387 1.302 1.685L50 112.086 81.409 75.41c.2-.249 1.265-1.643 1.267-1.646A39.793 39.793 0 0 0 90.91 49.5C90.909 27.132 72.593 9 50 9S9.091 27.132 9.091 49.5a39.813 39.813 0 0 0 8.239 24.277z" fill="#1e9893" fill-rule="evenodd"/>
			</svg>
			<span>함께할지도</span>
			<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
			    <path d="M17.707 13.293a1 1 0 0 1-1.414 1.414L11 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0l6 6z" fill="#fff" fill-rule="evenodd"/>
			</svg>
		</div>
		<button type="button" class="hideMap">선택완료</button>
		<div class="partcptnMapSidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps">
			<ul class="navbar-nav">
				<li class="nav-item mapngInfo">
					<div class="categoryWrap">
						<!-- <c:if test="${not empty session }">
							<button id="btnReportMap" style="display:none">신고하기</button>
							<button id="btnReportCancelMap" style="display:none">신고취소하기</button>
						</c:if> -->
						
						<svg width="100" height="126" viewBox="0 0 100 126" xmlns="http://www.w3.org/2000/svg">
							<path d="M68.182 76.5H59.09v-9H40.909v9h-9.09v-9c.004-4.968 4.072-8.995 9.09-9h18.182c5.018.005 9.086 4.032 9.09 9v9zM50 54c-7.531 0-13.636-6.044-13.636-13.5S42.469 27 50 27c7.531 0 13.636 6.044 13.636 13.5C63.628 47.952 57.528 53.992 50 54zm0-18c-2.51 0-4.545 2.015-4.545 4.5S47.49 45 50 45s4.545-2.015 4.545-4.5C54.543 38.016 52.51 36.003 50 36zm0 90L11.657 81.23a158.041 158.041 0 0 1-1.583-2.03A48.68 48.68 0 0 1 0 49.5C0 22.162 22.386 0 50 0s50 22.162 50 49.5a48.66 48.66 0 0 1-10.067 29.688l-.007.011s-1.364 1.775-1.567 2.013L50 126zM17.33 73.777c.004.004 1.06 1.387 1.302 1.685L50 112.086 81.409 75.41c.2-.249 1.265-1.643 1.267-1.646A39.793 39.793 0 0 0 90.91 49.5C90.909 27.132 72.593 9 50 9S9.091 27.132 9.091 49.5a39.813 39.813 0 0 0 8.239 24.277z" fill="#FB9A4E" fill-rule="evenodd"/>
						</svg>

						<div class="mappingIndex">
							<p>함께할지도</p>
						</div>

						<div class="category"> -</div>
						<button class="btnReportMap" style="display: none;">
							<svg width="306" height="272" viewBox="0 0 306 272" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 238V136C17 99.9306 31.3285 65.3384 56.8335 39.8335C82.3384 14.3285 116.931 0 153 0C189.069 0 223.662 14.3285 249.167 39.8335C274.671 65.3384 289 99.9306 289 136V238H306V272H0V238H17ZM51 238H255V136C255 108.948 244.254 83.0038 225.125 63.8751C205.996 44.7464 180.052 34 153 34C125.948 34 100.004 44.7464 80.8751 63.8751C61.7464 83.0038 51 108.948 51 136V238ZM68 136C68 113.457 76.9553 91.8365 92.8959 75.8959C108.837 59.9553 130.457 51 153 51V85C139.474 85 126.502 90.3732 116.938 99.9375C107.373 109.502 102 122.474 102 136H68Z" fill="black"/>
							</svg>
						</button>
						<div class="closeButtonWrap">
							<svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
							    <path d="M17.707 8.707a1 1 0 0 0-1.414-1.414L11 12.586 5.707 7.293a1 1 0 1 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6z" fill="#fff" fill-rule="evenodd"/>
							</svg>
						</div>
						<button class="btnReportCancelMap" style="display: none;">
							<svg width="306" height="272" viewBox="0 0 306 272" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M17 238V136C17 99.9306 31.3285 65.3384 56.8335 39.8335C82.3384 14.3285 116.931 0 153 0C189.069 0 223.662 14.3285 249.167 39.8335C274.671 65.3384 289 99.9306 289 136V238H306V272H0V238H17ZM51 238H255V136C255 108.948 244.254 83.0038 225.125 63.8751C205.996 44.7464 180.052 34 153 34C125.948 34 100.004 44.7464 80.8751 63.8751C61.7464 83.0038 51 108.948 51 136V238ZM68 136C68 113.457 76.9553 91.8365 92.8959 75.8959C108.837 59.9553 130.457 51 153 51V85C139.474 85 126.502 90.3732 116.938 99.9375C107.373 109.502 102 122.474 102 136H68Z" fill="black"/>
							</svg>
						</button>
					</div>
					<!-- <div class="mappingName">
						<p> - </p>
					</div> -->

					<div class="mappingName">
						<p>-</p>
					</div>
					
					<div class="mappingIntro">
						<p> - </p> 
					</div>
				</li>
				<li class="nav-item mapngInfo defaultInfo-item">
					<div class="locationName">
						<p class="title">지역 :</p>
						<p class="locationNameTxt">-</p>
					</div>  
					<div class="periodName">
						<p class="title">기간 :</p>
						<p class="periodNameTxt">~</p>
					</div>
					<div class="pertiName">
						<p class="title">참여자 수 :</p>
						<p class="pertiNameTxt">0명</p>
					</div> 
				</li>
				<li class="nav-item opinionItem">
					<div class="itemRow">
						<div class="mappingName" id="itemRowTitle">
							<p> - </p>
						</div>
					</div>
					<div class="itemRow">
						<div class="category-name">
							<h2>등록자 :</h2>
						</div>
						<div class="content" id="itemRowReguser">
							<p>-</p>
						</div>
					</div>
					<div class="itemRow">
						<div class="category-name">
							<h2>등록일자 :</h2>
						</div>
						<div class="content" id="itemRowRegdate">
							<p>-</p>
						</div>
					</div>
					<div class="itemRow name-item">
						<div class="category-name">
							<h2>제목 :</h2>
						</div>
						<div class="content" id="itemRowAnswerTitle">
							<p>-</p>
						</div>
					</div>
<!-- 					<div class="itemRow location-item"> -->
<!-- 						<div class="category-name"> -->
<!-- 							<h2>위치 :</h2> -->
<!-- 						</div> -->
<!-- 						<div class="content" id="itemRowAnswerGeom"> -->
<!-- 							<p>-</p> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<div class="itemRow opinion-item">
						<div class="category-name">
							<h2>의견 :</h2>
						</div>
						<div class="content" id="itemRowAnswerContent">
							<p>-</p>
						</div>   
					</div>
				</li> 
				<li class="nav-item button-item button-mob">
					<div class="partiButtonWrap">
						<button> 
							<svg width="30" height="28" viewBox="0 0 30 28" xmlns="http://www.w3.org/2000/svg">
							<path d="M25 12h-2v2h2a3.003 3.003 0 0 1 3 3v4h2v-4a5.006 5.006 0 0 0-5-5zM23 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-1 28h-2v-2a3.003 3.003 0 0 0-3-3h-4a3.003 3.003 0 0 0-3 3v2H8v-2a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5v2zm-7-17a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-8 3H5a5.006 5.006 0 0 0-5 5v4h2v-4a3.003 3.003 0 0 1 3-3h2v-2zM7 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10A5 5 0 0 0 7 0z" fill="#FFDABE" fill-rule="evenodd"/>
							</svg>
						참여하기 </button>
					</div>
				</li>
				<li class="nav-item button-item opinion-mob">
					<p>의견 검색</p>
					<div class="search-wrap">
						 <input type="text" id="search_answer_title"  name="search_answer_title" value="" placeholder="검색어를 입력하세요" autocomplete="off"/><button class="cmmnty-answer-search"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
						</svg></button>
					</div>
				</li>
				<li class="nav-item opinionWrap-item opinion-mob"> 
					<div class="opinionList">
						<ul class="opinionListItem" style="padding-right: 10px;"></ul>
					</div>
				</li>
				<li class="nav-item button-item">
					<div class="partiButtonWrap">
						<button class="list" onclick="javascript:location.href=Constant.CONTEXT_PATH +'/cmmntyMap/cmmnty-list.do?searchCatCd=${paramMap.searchCatCd}&searchMapngTitle=${paramMap.searchMapngTitle }'">목록</button>
					</div>
				</li>
			</ul>
			
			
			<!-- 참여하기 팝업 -->
			<div class="addOpinionWrap">
				<div class="navbar-opinion">
				<form id="opinionForm" name="opinionForm" method="post" enctype="multipart/form-data">
				<input type="hidden" name="mapng_id" id="mapng_id" value="<c:url value='${mapng_id}' />">
				<input type="hidden" name="answer_id" id="answer_id" value="">
				<input type="hidden" name="feature_style" id="feature_style" />
				<ul class="navbar-nav">
					<h2 class="cmmntyGraphName">
						<svg width="30" height="28" viewBox="0 0 30 28" xmlns="http://www.w3.org/2000/svg">
							<path d="M25 12h-2v2h2a3.003 3.003 0 0 1 3 3v4h2v-4a5.006 5.006 0 0 0-5-5zM23 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-1 28h-2v-2a3.003 3.003 0 0 0-3-3h-4a3.003 3.003 0 0 0-3 3v2H8v-2a5.006 5.006 0 0 1 5-5h4a5.006 5.006 0 0 1 5 5v2zm-7-17a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-8 3H5a5.006 5.006 0 0 0-5 5v4h2v-4a3.003 3.003 0 0 1 3-3h2v-2zM7 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m0-2a5 5 0 1 0 0 10A5 5 0 0 0 7 0z" fill="#FFDABE" fill-rule="evenodd"/>
						</svg>										
						참여하기
						
						<div class="closeButtonWrap opinionCancle"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
					</h2>
					<c:choose>
						<c:when test="${not empty session }">
							<li class="nav-item" style="display:none;">
								<div class="partiWrap">
									<input type="hidden" name="opinion_usr_id" id="opinion_usr_id" placeholder="아이디" value="${__USER__.getUsr_id()}">
									<input type="hidden" name="opinion_usr_pwd" id="opinion_usr_pwd" placeholder="비밀번호" value="">
								</div>
							</li>
						</c:when>
								
						<c:when test="${empty session }">
							<li class="nav-item">
								<div class="partiWrap">
											<h2>참여자</h2>
											<input type="text" name="opinion_usr_id" id="opinion_usr_id" placeholder="아이디" value="">
											<input type="password" name="opinion_usr_pwd" id="opinion_usr_pwd" placeholder="비밀번호" value="">
								</div>
							</li>
						</c:when>
					</c:choose>
					<li class="nav-item">
						<div class="partiName">
							<h2>제목</h2>
							<input type="text" name="answer_title" id="answer_title" placeholder="제목을 입력해주세요.">
						</div>
					</li>
					<li class="nav-item location-item">
						<h2 class="locTitile">위치</h2>
						<button type="button" class="showMap">지도위치찍기</button>
						<input type="hidden" name="geom" id="geom">
						<div class="addressName">
							<input type="text" name="address" id="address" data-type="" placeholder="위치">
							<button type="button" class="searchAddress">
								<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
								</svg>
							</button>
						</div>
						<span style="display:none;">※ 현재 지도에 표시된 위치로 저장됩니다. 위 주소를 확인해주세요.</span>
						<div class="opinionIcon"></div>
					</li>
					<li class="nav-item radius_wrap">
						<div class="partiName">
							<h2>반경</h2>
							<input type="text" name="point_radius" id="point_radius" placeholder="반경 거리(m)"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">m
						</div>
					</li>
					<li class="nav-item opinion-item">
						<h2>의견</h2>
						<div class="opinionWrap">
							<textarea name="answer_cont" id="answer_cont" cols="30" rows="4" placeholder="의견을 입력해주세요."></textarea>
						</div>
					</li>
					<li class="nav-item opinion-item pic-item">
						<h2>사진첨부</h2>
						<div class="formPic">
							<div class="addButtonBox">
								<input type="hidden" name="imgList" id="imgList" multiple>
								<input type="file" name="fileList" id="fileList" multiple>
								<input type="file" name="picFiles" id="picFiles" multiple accept=".jpg,.bmp,.gif,.png">
								<label for="picFiles" class="formPicAddButton">업로드</label><span> ※ 사진은 3장까지 업로드 가능합니다.</span>
							</div>
							
							<div class="addPicTableBox">
								<table class="addPicList">
								</table>
							</div>
						</div>
	
					</li>
					<li class="nav-item answer-item">
						<c:if test="${not empty mapng_ques}">
							<h2>질문</h2>
						</c:if> 
						<div class="answerRow">	
							<div class="questionRow">
							<c:forEach items="${mapng_ques}" var="item" varStatus="status">
								<p><c:out value="${item.ques_nm}" /></p>
								 
								 <c:choose> 
									<c:when test="${item.ans_opt_cd eq 1 }">
										<input type="text" id="ques_answer${status.count}" name="ques_answer${status.count}">
									</c:when> 
									<c:otherwise>
										<c:forEach items="${fn:split(item.choice_list, ',') }" var="citemList">
											<c:set var="citem" value="${citemList}" />
											<ul>
												<li>
													<input type="radio" id="ques_answer${status.count}" name="ques_answer${status.count}" value="${fn:split(citem,'-')[0]}">
													<label for="dewey">${fn:split(citem,'-')[1]} </label>
												  </li>
											  </ul>
										</c:forEach>
									</c:otherwise> 
								</c:choose> 
							</c:forEach>	
							</div>
							
						</div>
						
					</li>
				</ul>
				<div class="ButtonWrap">
					<button type="button" class="opinionCancle">취소</button>
					<button type="button" class="opinionReg">등록</button>
				</div>
				</form>
				</div>
			</div>
			
		</div>
		
					
					<!-- 신고하기 팝업 -->
					<div class="reportWrap">
						<div class="Wrap">
						<form id="reportForm" name="reportForm" method="post">
							<h2 class="cmmntyGraphName">									
								신고하기
								<div class="closeButtonWrap"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
							</h2>
							<div class="list">
								<input type="hidden" name="report_answer_id" id="report_answer_id" value="">
								<c:forEach items="${report_type}" var="item">
								<div>
									<span for="report_cd${item.cd_id }"><c:out value="${item.cd_nm }"/></span>
									<input type="radio" name="report_cd" id="report_cd${item.cd_id }" value="${item.cd_id }" <c:if test="${item.cd_id eq '01' }">checked</c:if> />
									<c:if test="${item.cd_id eq '99'}"><input type="text" name="report_cont" id="report_cont" style="display:none;" maxlength="50"/></c:if>
								</div>
								</c:forEach>
							</div>
							<div class="ButtonWrap">
								<button type="button" class="reportClose">닫기</button>
								<button type="button" class="reportReg">확인</button>
							</div>
						</form>
						</div>
					</div>

		<!-- 정보지도 중첩 팝업 -->
		<div class="cmmntyCatalogNav navbar">
			<div class="closeButtonWrap"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
			<h2 class="cmmntyGraphName">
				<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
					<path d="m16 24-6.09-8.6A8.14 8.14 0 0 1 16 2a8.08 8.08 0 0 1 8 8.13 8.2 8.2 0 0 1-1.8 5.13L16 24zm0-20a6.07 6.07 0 0 0-6 6.13 6.19 6.19 0 0 0 1.49 4L16 20.52 20.63 14A6.24 6.24 0 0 0 22 10.13 6.07 6.07 0 0 0 16 4zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 1h-2v2h2v14H4V14h2v-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2z" fill="#FFDABE" fill-rule="evenodd"/>
				</svg>
				정보지도 중첩 목록</h2>
			<ul class="navbar-nav">
				<li class="catalog-list">
					<div class="card-content" style="height: 100%;">
						<div class="sub-wrap">
							 <form action="<c:url value="/faqList.do" />" method="GET">
								 <div class="search-wrap">
									<input type="text" id="search_answer_title"  name="search_answer_title" placeholder="검색어를 입력하세요" /><button class="cmmnty-answer-search"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								   <path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
							   		</svg></button>
						   			</div>
							</form>
							<span>총 : ${fn:length(dataCatlogList)}건</span>
							<table class="sub-table">
								<colgroup>
									<col width="80"><col width="306"><col width="80"><col width="130">
								</colgroup>
								<thead>
									<tr>
								  		<th>카테고리</th>
								  		<th>데이터명</th>
								  		<th>수집주기</th>
								  		<th>갱신일자</th>
									</tr>
								</thead>
								<tbody>
						 		<c:forEach items="${dataCatlogList}" var="item">
									<tr data-tbl="${item.mta_tbl}">
										<td>${item.mta_cat_nm}</td>
										<td>${item.mta_nm}</td>
										<td>${item.mta_fcly_nm}</td>
										<td>${item.reg_dt}</td>
									</tr>
								</c:forEach>
								</tbody>
							</table>		 
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		<!--통계그래프 팝업-->
		<div class="cmmntyGraphSidenav navbar">
			<div class="closeButtonWrap"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
			<h2 class="cmmntyGraphName">
				<svg width="30" height="28" viewBox="0 0 30 28" xmlns="http://www.w3.org/2000/svg">
					<path d="M15 2C8.373 2 3 7.373 3 14s5.373 12 12 12 12-5.373 12-12S21.627 2 15 2zm10 11h-9V4.05A10 10 0 0 1 25 13zM14.42 24A10 10 0 0 1 14 4.05v9a2 2 0 0 0 2 2h9A10 10 0 0 1 14.42 24z" fill="#FFDABE" fill-rule="evenodd"/>
				</svg>
				통계 차트 시각화</h2>
			<ul class="navbar-nav">
				<li class="markerGraph">
					<h2>유형별 통계</h2>
					<div class="card-content">
						<div id="pointStats" style="height:100%;"></div>
					</div>
				</li>
				<li class="locationGraph">
					<h2>지역별 통계</h2>
					<div class="card-content">
						<div id="geomStats" style="height:100%;"></div>
					</div>
				</li>
				<!-- <li class="answerGraph">
					<h2>Hot 키워드</h2>
					<div class="card-content">
						<div id="cmmntyAnswerWordCloud" style="height:100%;"></div>
					</div>
				</li>  -->
			</ul>
		</div>
		
		<!-- 아이디 확인하기 팝업 -->
		<div class="IdConfirmWrap">
			<div class="Wrap">
				<div class="closeButtonWrap"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
				<h2 class="correctionText">댓글 수정</h2> <!-- 수정 일시 -->
				<h2 class="removeText">댓글 삭제</h2>     <!--  삭제 일시 -->
				<p class="firstText">작성자만 글을 수정/삭제 할 수 있습니다.</p>
				<p>작성자 본인이라면, 글 작성시 입력한 아이디와 비밀번호를 확인해주세요.</p>
				<div class="IdConfirm">
					<input type="text" name="del_answer_user_id" id="del_answer_user_id" placeholder="아이디">
					<input type="password" name="del_answer_user_pwd" id="del_answer_user_pwd" placeholder="비밀번호">
				</div>
				<div class="ButtonWrap">
					<button type="button" class="opinionCancle2">닫기</button>
					<button type="button" class="confirmButton">확인</button>
				</div>
			</div>
		</div>
		
		<!-- 의견 사진 확대 -->
		<div class="answerPicWrap">
			<div class="Wrap">
				<div class="closeButtonWrap"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z"/></svg></div>
				<img src=""/>
			</div>
		</div>
	</div>
</t:app>