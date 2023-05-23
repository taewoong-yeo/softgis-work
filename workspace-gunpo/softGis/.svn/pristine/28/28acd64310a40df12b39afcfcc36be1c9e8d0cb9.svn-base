<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<t:subapp>
	<c:if test='${empty myDetail}'><c:redirect url="/mycmmntyMap/mycmmnty-list.do" /></c:if>
	<c:set var="now" value="<%=new java.util.Date() %>" />
	<fmt:formatDate value="${now}" var="today" pattern="yyyy-MM-dd" />
	
	<div class="title_bg">
		<div class="title_container">
			<div class="title_wrap">
				<div class="title_menu">나의 함께할지도</div>
				<span>함께할지도 수정화면입니다.</span>
			</div>
			<div class="title_btn">
				<a href="<c:url value='/mycmmntyMap/mycmmnty-list.do'/>" class="icon_wrap">
					<img src="<c:url value='/assets/images/common/icon-list.png'/>"/>
				</a>
				<span>목록<br/>가기</span>
			</div>
		</div>
	</div>

	<!-- 마커 선택 -->
	<div class="modal_wrap_back marker">
		<div class="modal_wrap" >
		
			<div class="title_wrap">
				<span>마커선택</span>
				<div class="close_button_wrap close_modal">
					<img src="<c:url value='/assets/images/common/btn-close.png'/>"/>
				</div>
			</div>
			
			<div class="marker_modal_wrap">
				<div class="marker_sub">
					<div class="cmmntyMap-style-marker-list"></div>
				</div>
			</div>
			<div class="modalButtonWrap">
				<button type="button" class="save_marker">저장</button>
				<button type="button" class="close_modal">취소</button>
			</div>
		</div>
	</div>

	<!-- 라인/폴리곤/반경 선택 -->
	<div class="modal_wrap_back line">
		<div class="modal_wrap" >
		
			<div class="title_wrap">
				<span>스타일</span>
				<div class="close_button_wrap close_modal">
					<img src="<c:url value='/assets/images/common/btn-close.png'/>"/>
				</div>
			</div>
			
			<div class="line_modal_wrap">
				<div class="line_sub">
					<div class="line_sub_item">
						<span>색상</span>
						<div class="cmmntyMap-style-line-palette line"></div>
						<div class="preview_color"></div>
					</div>
					<div class="line_sub_item">
						<span>두께</span>
						<div class="item_sub">
							<input type="text" id="line_width" value="1"/><span>px</span>
						</div>
						<div class="preview_line"></div>
					</div>
					<div class="line_sub_item">
						<span>모양</span>
						<div class="cmmntyMap-style-line-dash">
						</div>
					</div>
					<div class="line_sub_item polygon">
						<span>배경색상</span>
						<div class="cmmntyMap-style-line-palette bg"></div>
						<div class="preview_color"></div>
					</div>
				</div>
			</div>
			<div class="modalButtonWrap">
				<button type="button" class="save_line">저장</button>
				<button type="button" class="close_modal">취소</button>
			</div>
		</div>
	</div>


	<!-- 이미지 선택 -->
	<div class="modal_wrap_back image">
		<div class="modal_wrap" >
		
			<div class="title_wrap">
				<span>썸네일등록</span>
				<div class="close_button_wrap close_modal">
					<img src="<c:url value='/assets/images/common/btn-close.png'/>"/>
				</div>
			</div>
			
			<div class="image_wrap">
				<div class="preview_wrap">
					<h2>이미지 미리보기</h2>
					<div class="imageView">
						<div class="preview_image">
			<!-- 				<img id="preview" /> -->
						</div>
						<div class="imageRule">
							<div>
								<p>* 첨부 가능한 확장자는 jpg, png, bmp, gif 입니다.</p>
								<p>* 파일 크기는 최대 5M입니다.</p>
								<p>* 이미지 사이즈 : 가로 278px, 세로 178px</p>
								<p>* 이미지가 없을 경우 기본 이미지 중 선택하세요.</p>
							</div>
			
							<h2>이미지 추가</h2>
							<div class="attach"> 
								<input type="file" name="img_file" id="img_file" placeholder="업로드"  accept=".jpg,.bmp,.gif,.png">
							</div>
						</div>
					</div>
			
				</div>
				
				<div class="sample_wrap">
				
					<h2>기본 이미지</h2>
					<div class="sample_slide">
						<section class="variable slider data-category-theme slick-initialized slick-slider" id="variable">
						<div class="defaultImage slick-list">
							<div class="default_slide">
								<div class="variableSlider slick-slide image1"></div>
								<div class="variableSlider slick-slide image2"></div>
								<div class="variableSlider slick-slide image3"></div>
								<div class="variableSlider slick-slide image4"></div>
								<div class="variableSlider slick-slide image5"></div>
								<div class="variableSlider slick-slide image6"></div>
								<div class="variableSlider slick-slide image7"></div>
								<div class="variableSlider slick-slide image8"></div>
								<div class="variableSlider slick-slide image9"></div>
								<div class="variableSlider slick-slide image10"></div>
								<div class="variableSlider slick-slide image11"></div>
								<div class="variableSlider slick-slide image12"></div>
								<div class="variableSlider slick-slide image13"></div>
								<div class="variableSlider slick-slide image14"></div>
							</div>
						</div>
						</section>
					</div>
				</div>
			</div>
			<div class="modalButtonWrap">
				<button type="button" class="save_img">저장</button>
				<button type="button" class="close_modal">취소</button>
			</div>
		</div>
	</div>

	<div class="sub-main cmmntyMap">
		<form id="submitForm" method="post" enctype="multipart/form-data" action="<c:url value='/mycmmntyMap/updateMyCmmntyMap.do'/>">
		<input type="hidden" name="mapng_id" id="mapng_id" value="${myDetail.mapng_id}" />
		<input type="hidden" name="temp_yn" value="N"/>
		<input type="hidden" name="map_sel_option" id="map_sel_option" value="${fn:escapeXml(myDetail.map_sel_option)}" />
		<input type="hidden" name="dataWmsList"/>
		<input type="hidden" name="dataStyleList"/>
		<input type="hidden" name="dataNmList"/>
		
		<div class="sub-wrap">
			<div class="sub-content">
				<div class="title">
					<h2>기본 정보</h2>
					<span>함께할지도에 등록할 정보를 입력해 주세요.</span>
				</div>
				<div class="info-form default">
					<div class="formItemName">
						<p class="category">제목</p>
						<input type="text" name="mapng_title" id="mapng_title" value="${myDetail.mapng_title}" maxlength="50">
					</div>
					<div class="formItemName">
						<p class="category">소개</p>
						<textarea name="mapng_desc" id="mapng_desc" rows="5" maxlength="200">${myDetail.mapng_desc}</textarea>
					</div>
					<div class="formItemName">
						<p class="category">카테고리</p>
						<select id="cat_cd" name="cat_cd">
							<option value="">선택</option>
							<t:code-as-option group="DATA_CATE" selValue="${myDetail.cat_cd}"/>
						</select>
					</div>
					<div class="formItemName wrapRow">
						<p class="category">등록구분</p>
						<select id="map_sel_cd" name="map_sel_cd">
							<option value="">선택</option>
							<t:code-as-option group="MAP_SEL" selValue="${myDetail.map_sel_cd}" />
						</select>
						<button type="button" class="settingButton" map-option='${myDetail.map_sel_option }'>설정하기</button>
						<c:out value="${myDeatil.map_sel_option }"/>
					</div>
					<div class="formItemName marker_wrap" style="margin-bottom:0px">
						<div class="marker_info">
						</div>
					</div>
				</div>
			</div>
				
			<div class="sub-content">
				<div class="title">
					<h2>선택 정보</h2>
					<span>함께할지도에 등록할 선택 정보를 입력해 주세요.</span>
				</div>
				<div class="info-form default">
					<div class="formItemName">
						<p class="category">지역설정</p>
						<select id="area_cd" name="area_cd">
							<option value="">선택</option>
							<c:forEach items="${bnd_sd_list}" var="item">
								<option value="${item.sd_cd}" <c:if test="${item.sd_cd eq myDetail.area_cd}">selected</c:if>>${item.sd_nm}</option>
								<%--<c:if test="${item.sd_cd eq myDetail.area_cd}">selected</c:if> --%>
							</c:forEach>
						</select>
						<select id="area_dtl_cd" name="area_dtl_cd">
							<option value="">선택</option>
							<c:forEach items="${result}" var="item">
								<option value="${item.sgg_cd}" <c:if test="${item.sgg_cd eq myDetail.area_dtl_cd}">selected</c:if>>${item.sgg_nm}</option>
								<%--<c:if test="${item.sd_cd eq myDetail.area_cd}">selected</c:if> --%>
							</c:forEach>
						</select>
					</div>
					<div class="formItemName">
						<p class="category">기간설정</p>
						<div class="formInputBox">
							<input type="date" name="start_dt" id="start_dt" value="${myDetail.start_dt}">
							<span>-&nbsp;&nbsp;&nbsp;</span> 
							<input type="date" name="end_dt" id="end_dt" value="${myDetail.end_dt}">
	
							<div class="formCheckBox">
								<input type="checkbox" name="" id="dontCareCheck" <c:if test="${empty myDetail.start_dt and empty myDetail.end_dt}">checked</c:if>>
								<label for="dontCareCheck">상시</label> 
							</div>
						</div>
					</div>
					<div class="formItemName">
						<p class="category">질문추가</p>
						<div class="form-question">
							<div class= "question-wrap" style="display:none">
								<div class="form-question-row">
									<select name="sel_quest_opt">
										<t:code-as-option group="SURVEY_ITEM" />
									</select>
									<input type="text" name="ques_nm">
									<button type="button" class="questionRemoveButton">
										<div>
											<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											    <path d="M19 6.225 17.775 5 12 10.775 6.225 5 5 6.225 10.775 12 5 17.775 6.225 19 12 13.225 17.775 19 19 17.775 13.225 12z" fill="#FFF" fill-rule="evenodd"/>
											</svg>
											<span>삭제</span>
										</div>
									</button>
								</div>
	
								<div class="form-question-row">
									<input type="text" name="ipt_quest_option" class="answer_option"><button type="button" class="answerAddButton">
										<div>
											<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											    <path d="M13.353 10.64H20v2.416h-6.647V20H10.67v-6.944H4V10.64h6.67V4h2.683z" fill="#FFF" fill-rule="nonzero"/>
											</svg>
										</div>
										<span>답변추가</span>
									</button>
								</div> 
							</div>
							<button type="button" class="questionSettingButton">
								<div>
									<img src="<c:url value='/assets/images/cmmnty/btn-plus.png'/>"/>
									<span>추가하기</span>
								</div>
							</button>
								
							<c:set var="curQuesId" value="" />
							<c:forEach items="${myQuesList}" var="item" varStatus="status">
								<c:if test="${curQuesId ne item.ques_id}">
									<c:set var="curQuesId" value="${item.ques_id}" />
									<div class= "question-wrap">
										<div class="form-question-row">
											<select name="sel_quest_opt">
												<t:code-as-option group="SURVEY_ITEM" selValue="${item.ans_opt_cd}" />
											</select>
											<input type="text" name="ques_nm" value="${item.ques_nm}">
											<button type="button" class="questionRemoveButton">
												<div>
													<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													    <path d="M19 6.225 17.775 5 12 10.775 6.225 5 5 6.225 10.775 12 5 17.775 6.225 19 12 13.225 17.775 19 19 17.775 13.225 12z" fill="#FFF" fill-rule="evenodd"/>
													</svg>
													<span>삭제</span>
												</div>
											</button>
										</div>
										<div class="form-question-row" <c:if test="${item.ans_opt_cd ne 03}">style="display:none"</c:if>>
								</c:if>
								<c:if test="${item.ans_opt_cd eq 03}"> 
										<input type="text" name="ipt_quest_option" class="answer_option" value="${item.opt_desc}" style="margin-right:3px">
									<c:if test="${item.rnum ne 1}">
										<button type="button" name="answerDelButton" class="del-btn">
											<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											    <path d="M19 6.225 17.775 5 12 10.775 6.225 5 5 6.225 10.775 12 5 17.775 6.225 19 12 13.225 17.775 19 19 17.775 13.225 12z" fill="#111" fill-rule="evenodd"/>
											</svg>
										</button>
									</c:if>
								</c:if>
								<c:if test="${item.ans_opt_cd ne 03}"> 
										<input type="text" name="ipt_quest_option" class="answer_option">
								</c:if>
								<c:if test="${myQuesList[status.index+1].ques_id ne item.ques_id}">
											<button type="button" class="answerAddButton">
												<div>
													<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													    <path d="M13.353 10.64H20v2.416h-6.647V20H10.67v-6.944H4V10.64h6.67V4h2.683z" fill="#FFF" fill-rule="nonzero"/>
													</svg>
												</div>
												<span>답변추가</span>
											</button>
										</div>
									</div>
								</c:if>
							</c:forEach>
						</div>
					</div>
					<div class="formItemName">
						<p class="category">의견참여방법</p>
						<c:forEach items="${answer_type }" var="item">
							<label for="answer_cd${item.cd_id }"><input type="radio" name="answer_cd" id="answer_cd${item.cd_id }" value="${item.cd_id }" <c:if test="${item.cd_id eq '01' }">checked</c:if>> <c:out value="${item.cd_nm }"/></label>
						</c:forEach>
					</div>
					<div class="formItemName">
						<p class="category">썸네일등록</p>
						<input type="hidden" name="file_id" id="file_id" value="${myDetail.file_id}"/>
						<button type="button" class="tumbSettingButton">설정하기</button>
					</div>
					<div class="img_preview"></div>
				</div>
				
			</div>

			<div class="sub-content map-option">
				<div class="title">
					<h2>배경 지도 (옵션)</h2>
					<span>※ 위치데이터는 최대 5개까지 추가 가능합니다.</span>
				</div>
				<div class="info-form">
					<div class="dataListBar">
						<h2>위치데이터 추가</h2>
						<div class="locationList">
							<ul>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M6.857 12.571h1.714v1.143H6.857v-1.143zm1.714-1.142h1.143v1.142H8.571V11.43zm0-2.286h1.143v1.143H8.571V9.143zM8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8zm-.345 1.16 1.433 2.866-.904 2.26H4.726l-.805 2.507 1.63 1.63-.576.863-2.526-1.572h-1.08A6.82 6.82 0 0 1 7.655 1.16zm-5.88 9.697h.348l2.248 1.4c.523.328 1.214.179 1.555-.337l.576-.864a1.146 1.146 0 0 0-.143-1.442L5.222 8.478l.337-1.05h2.625c.468.002.89-.283 1.062-.718l.903-2.259a1.144 1.144 0 0 0-.038-.936L8.962 1.218a6.834 6.834 0 0 1 5.263 9.64H12c-.63 0-1.142.511-1.143 1.142v2.225a6.827 6.827 0 0 1-9.082-3.368zM12 13.558V12h1.558A6.9 6.9 0 0 1 12 13.558z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>국토관리/지역개발</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>경계 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_adsido" data-style="lt_c_adsido">광역시도</li>
												<li data-wms="lt_c_adsigg" data-style="lt_c_adsigg">시군구</li>
												<li data-wms="lt_c_ademd" data-style="lt_c_ademd">읍면동</li>
												<li data-wms="lt_c_adri" data-style="lt_c_adri">리</li>
											</ol>
										</dd>
										<dt>도시계획 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_upisuq171" data-style="lt_c_upisuq171">개발행위허가제한지역</li>
												<li data-wms="lt_c_upisuq174" data-style="lt_c_upisuq174">개발행위허가필지</li>
												<li data-wms="lt_c_upisuq173" data-style="lt_c_upisuq173">기반시설부담구역</li>
												<li data-wms="lt_c_upisuq153" data-style="lt_c_upisuq153">도시계획(공간시설)</li>
												<li data-wms="lt_c_upisuq155" data-style="lt_c_upisuq155">도시계획(공공문화체육시설)</li>
												<li data-wms="lt_c_upisuq152" data-style="lt_c_upisuq152">도시계획(교통시설)</li>
												<li data-wms="lt_c_upisuq159" data-style="lt_c_upisuq159">도시계획(기타기반시설)</li>
												<li data-wms="lt_c_upisuq151" data-style="lt_c_upisuq151">도시계획(도로)</li>
												<li data-wms="lt_c_upisuq156" data-style="lt_c_upisuq156">도시계획(방재시설)</li>
												<li data-wms="lt_c_upisuq157" data-style="lt_c_upisuq157">도시계획(보건위생시설)</li>
												<li data-wms="lt_c_upisuq154" data-style="lt_c_upisuq154">도시계획(유통공급시설)</li>
												<li data-wms="lt_c_upisuq158" data-style="lt_c_upisuq158">도시계획(환경기초시설)</li>
												<li data-wms="lt_c_upisuq161" data-style="lt_c_upisuq161">지구단위계획</li>
												<li data-wms="lt_c_upisuq175" data-style="lt_c_upisuq175">토지거래계약에관한허가구역</li>
												<li data-wms="lt_c_lhblpn" data-style="lt_c_lhblpn">토지이용계획도</li>
											</ol>
										</dd>
										<dt>산업단지 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_damdan" data-style="lt_c_damdan">단지경계</li>
												<li data-wms="lt_c_damyoj" data-style="lt_c_damyoj">단지시설용지</li>
												<li data-wms="lt_c_damyod" data-style="lt_c_damyod">단지용도지역</li>
												<li data-wms="lt_c_damyuch" data-style="lt_c_damyuch">단지유치업종</li>
											</ol>
										</dd>
										<dt>수자원 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_wkmbbsn" data-style="lt_c_wkmbbsn">대권역</li>
												<li data-wms="lt_c_wkmmbsn" data-style="lt_c_wkmmbsn">중권역</li>
												<li data-wms="lt_c_wkmsbsn" data-style="lt_c_wkmsbsn">표준권역</li>
												<li data-wms="lt_c_wkmstrm" data-style="lt_c_wkmstrm">하천망</li>
											</ol>
										</dd>
										<dt>용도지역지구 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_ud801" data-style="lt_c_ud801">개발제한구역</li>
												<li data-wms="lt_c_uq129" data-style="lt_c_uq129">개발진흥지구</li>
												<li data-wms="lt_c_uq121" data-style="lt_c_uq121">경관지구</li>
												<li data-wms="lt_c_uq123" data-style="lt_c_uq123">고도지구</li>
												<li data-wms="lt_c_uq112" data-style="lt_c_uq112">관리지역</li>
												<li data-wms="lt_c_uma100" data-style="lt_c_uma100">국립공원용도지구</li>
												<li data-wms="lt_c_uq141" data-style="lt_c_uq141">국토계획구역</li>
												<li data-wms="lt_c_uq113" data-style="lt_c_uq113">농림지역</li>
												<li data-wms="lt_c_uq162" data-style="lt_c_uq162">도시자연공원구역</li>
												<li data-wms="lt_c_uq111" data-style="lt_c_uq111">도시지역</li>
												<li data-wms="lt_c_uq125" data-style="lt_c_uq125">방재지구</li>
												<li data-wms="lt_c_uq124" data-style="lt_c_uq124">방화지구</li>
												<li data-wms="lt_c_uq126" data-style="lt_c_uq126">보호지구</li>
												<li data-wms="lt_c_uf602" data-style="lt_c_uf602">임업 및 산촌 진흥권역</li>
												<li data-wms="lt_c_uq114" data-style="lt_c_uq114">자연환경보전지역</li>
												<li data-wms="lt_c_uq128" data-style="lt_c_uq128">취락지구</li>
												<li data-wms="lt_c_uq130" data-style="lt_c_uq130">특정용도제한지구</li>
											</ol>
										</dd>
										<dt>용도지역지구(기타) <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_um000" data-style="lt_c_um000">가축사육제한구역</li>
												<li data-wms="lt_c_uo601" data-style="lt_c_uo601">관광지</li>
												<li data-wms="lt_c_uo101" data-style="lt_c_uo101">교육환경보호구역</li>
												<li data-wms="lt_c_ud610" data-style="lt_c_ud610">국민임대주택</li>
												<li data-wms="lt_c_up401" data-style="lt_c_up401">급경사재해예방지역</li>
												<li data-wms="lt_c_um301" data-style="lt_c_um301">대기환경규제지역</li>
												<li data-wms="lt_c_uf901" data-style="lt_c_uf901">백두대간보호지역</li>
												<li data-wms="lt_c_uh701" data-style="lt_c_uh701">벤처기업육성지역</li>
												<li data-wms="lt_c_ud620" data-style="lt_c_ud620">보금자리주택</li>
												<li data-wms="lt_c_uf151" data-style="lt_c_uf151">산림보호구역</li>
												<li data-wms="lt_c_um901" data-style="lt_c_um901">습지보호지역</li>
												<li data-wms="lt_c_ub901" data-style="lt_c_ub901">시장정비구역</li>
												<li data-wms="lt_c_um221" data-style="lt_c_um221">야생동식물보호</li>
												<li data-wms="lt_c_uj401" data-style="lt_c_uj401">온천지구</li>
												<li data-wms="lt_c_uh501" data-style="lt_c_uh501">유통단지</li>
												<li data-wms="lt_c_uh402" data-style="lt_c_uh402">자유무역지역지정및운영</li>
												<li data-wms="lt_c_ud601" data-style="lt_c_ud601">주거환경개선지구도</li>
											</ol>
										</dd>
										<dt>토지 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_lhzone" data-style="lt_c_lhzone">사업지구경계도</li>
												<li data-wms="lp_pa_cbnd_bubun,lp_pa_cbnd_bonbun" data-style="lp_pa_cbnd_bubun,lp_pa_cbnd_bonbun">연속지적도</li>
											</ol>
										</dd>
										<dt>국가지명 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_nsnmssitenm" data-style="lt_p_nsnmssitenm">국가지명</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M12.571 3.428a.571.571 0 1 0 0-1.142.571.571 0 0 0 0 1.142zM13.714 0a9.153 9.153 0 0 0-9.143 9.143v1.143h-4a.571.571 0 0 0-.404.975l4.572 4.572a.571.571 0 0 0 .975-.404v-4h1.143A9.153 9.153 0 0 0 16 2.286V0h-2.286zM4.571 14.05l-2.62-2.621h2.62v2.62zm1.143-3.764V9.143c0-2.063.8-4.046 2.233-5.53l4.44 4.44a7.966 7.966 0 0 1-5.53 2.233H5.714zm9.143-8c0 1.783-.6 3.515-1.703 4.917L8.797 2.846a7.952 7.952 0 0 1 4.917-1.703h1.143v1.143z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>농림/해양/수산</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>농업·농촌 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_agrixue101" data-style="lt_c_agrixue101">농업진흥지역도</li>
												<li data-wms="lt_p_rifct" data-style="lt_p_rifct">수리시설</li>
												<li data-wms="lt_c_agrixue102" data-style="lt_c_agrixue102">영농여건불리농지도</li>
												<li data-wms="lt_c_rirsv" data-style="lt_c_rirsv">저수지</li>
											</ol>
										</dd>
										<dt>임업·산촌 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_fsdifrsts" data-style="lt_c_fsdifrsts">산림입지도</li>
												<li data-wms="lt_c_flisfk300" data-style="lt_c_flisfk300">산지(보안림)</li>
												<li data-wms="lt_c_flisfk100" data-style="lt_c_flisfk100">산지(자연휴양림)</li>
												<li data-wms="lt_c_flisfk200" data-style="lt_c_flisfk200">산지(채종림)</li>
											</ol>
										</dd>
										<dt>해양·수산·어촌 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_wgispltalk" data-style="lt_c_wgispltalk">(1차) 개발유도연안</li>
												<li data-wms="lt_c_wgisplrow" data-style="lt_c_wgisplrow">(1차) 개발조정연안</li>
												<li data-wms="lt_c_wgispluse" data-style="lt_c_wgispluse">(1차) 이용연안</li>
												<li data-wms="lt_c_wgisplabs" data-style="lt_c_wgisplabs">(1차) 절대보전연안</li>
												<li data-wms="lt_c_wgispljun" data-style="lt_c_wgispljun">(1차) 준보전연안</li>
												<li data-wms="lt_c_wgispl2con" data-style="lt_c_wgispl2con">(2차) 관리연안해역</li>
												<li data-wms="lt_c_wgispl2abs" data-style="lt_c_wgispl2abs">(2차) 보전연안해역</li>
												<li data-wms="lt_c_wgispl2use" data-style="lt_c_wgispl2use">(2차) 이용연안해역</li>
												<li data-wms="lt_c_wgispl2spa" data-style="lt_c_wgispl2spa">(2차) 특수연안해역</li>
												<li data-wms="lt_c_tfistidaf,lt_p_tfistidafp" data-style="lt_c_tfistidaf,lt_p_tfistidafp">갯벌정보</li>
												<li data-wms="lt_c_wgisreresh" data-style="lt_c_wgisreresh">공유수면매립3차수요조사</li>
												<li data-wms="lt_c_wgisreplan" data-style="lt_c_wgisreplan">공유수면매립기본계획</li>
												<li data-wms="lt_c_wgisrecomp" data-style="lt_c_wgisrecomp">공유수면매립준공</li>
												<li data-wms="lt_c_wgisiegug" data-style="lt_c_wgisiegug">국가산업단지</li>
												<li data-wms="lt_c_wgisienong" data-style="lt_c_wgisienong">농공단지</li>
												<li data-wms="lt_c_wgistpnewp" data-style="lt_c_wgistpnewp">무역신항만</li>
												<li data-wms="lt_c_wgistpland" data-style="lt_c_wgistpland">무역항육상구역</li>
												<li data-wms="lt_c_wgistpsea" data-style="lt_c_wgistpsea">무역항해상구역</li>
												<li data-wms="lt_c_wgisareco" data-style="lt_c_wgisareco">생태계경관보전지역</li>
												<li data-wms="lt_c_wgisarfisher" data-style="lt_c_wgisarfisher">수산자원보호구역</li>
												<li data-wms="lt_c_wgisarwet" data-style="lt_c_wgisarwet">습지보호구역</li>
												<li data-wms="lt_c_wgiscpland" data-style="lt_c_wgiscpland">연안항육상구역</li>
												<li data-wms="lt_c_wgiscpsea" data-style="lt_c_wgiscpsea">연안항해상구역</li>
												<li data-wms="lt_c_wgisieilban" data-style="lt_c_wgisieilban">일반산업단지</li>
												<li data-wms="lt_c_wgisiedosi" data-style="lt_c_wgisiedosi">첨단산업단지</li>
												<li data-wms="lt_l_toisdepcntah" data-style="lt_l_toisdepcntah">해안선</li>
												<li data-wms="lt_c_tfismpa" data-style="lt_c_tfismpa">해양보호구역</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M5.143 10.857H8.57V12H5.143v-1.143zm7.569-7.428.98 3.428H16V5.714h-1.446l-.743-2.599a1.147 1.147 0 0 0-1.1-.83h-.77L11.525.83A1.147 1.147 0 0 0 10.426 0H3.288c-.51.002-.957.34-1.099.829l-.743 2.6H0V4.57h2.309l.98-3.428h7.137l.327 1.143h-5.18c-.509.001-.956.339-1.098.828l-.58 2.029h-.63c-.488 0-.923.31-1.08.772L1.468 8H0v1.143h1.143v4c0 .63.512 1.142 1.143 1.143V16h1.143v-1.714h6.857V16h1.143v-1.714c.63-.001 1.142-.512 1.142-1.143v-4h1.143V8h-1.469l-.715-2.084a1.142 1.142 0 0 0-1.081-.773H5.084l.49-1.714h7.138zm-1.283 6.285v1.143h-1.143V12h1.143v1.143H2.286V12h1.143v-1.143H2.286V9.714h9.143zm-.196-1.143H2.482l.783-2.285h7.184l.784 2.285z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>도로/교통/물류</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>교통 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_utiscctv" data-style="lt_p_utiscctv">교통CCTV</li>
												<li data-wms="lt_p_moctnode" data-style="lt_p_moctnode">교통노드</li>
												<li data-wms="lt_l_moctlink" data-style="lt_l_moctlink_color">교통링크</li>
											</ol>
										</dd>
										<dt>항공·공항 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_aisuac" data-style="lt_c_aisuac">(UA)초경량비행장치공역</li>
												<li data-wms="lt_c_aisaltc" data-style="lt_c_aisaltc">경계구역</li>
												<li data-wms="lt_c_aisfldc" data-style="lt_c_aisfldc">경량항공기이착륙장</li>
												<li data-wms="lt_c_aisrflc" data-style="lt_c_aisrflc">공중급유구역</li>
												<li data-wms="lt_c_aisacmc" data-style="lt_c_aisacmc">공중전투기동훈련장</li>
												<li data-wms="lt_c_aisctrc" data-style="lt_c_aisctrc">관제권</li>
												<li data-wms="lt_c_aismoac" data-style="lt_c_aismoac">군작전구역</li>
												<li data-wms="lt_c_aisadzc" data-style="lt_c_aisadzc">방공식별구역</li>
												<li data-wms="lt_c_aisprhc" data-style="lt_c_aisprhc">비행금지구역</li>
												<li data-wms="lt_c_aisatzc" data-style="lt_c_aisatzc">비행장교통구역</li>
												<li data-wms="lt_c_aisfirc" data-style="lt_c_aisfirc">비행정보구역</li>
												<li data-wms="lt_c_aisresc" data-style="lt_c_aisresc">비행제한구역</li>
												<li data-wms="lt_l_aissearchl,lt_p_aissearchp" data-style="lt_l_aissearchl,lt_p_aissearchp">수색비행장비행구역</li>
												<li data-wms="lt_l_aisvfrpath,lt_p_aisvfrpath" data-style="lt_l_aisvfrpath,lt_p_aisvfrpath">시계비행로</li>
												<li data-wms="lt_c_aisdngc" data-style="lt_c_aisdngc">위험구역</li>
												<li data-wms="lt_c_aistmac" data-style="lt_c_aistmac">접근관제구역</li>
												<li data-wms="lt_l_aisrouteu" data-style="lt_l_aisrouteu">제한고도</li>
												<li data-wms="lt_l_aiscorrid_ys,lt_l_aiscorrid_gj,lt_p_aiscorrid_ys,lt_p_aiscorrid_gj" data-style="lt_l_aiscorrid_ys,lt_l_aiscorrid_gj,lt_p_aiscorrid_ys,lt_p_aiscorrid_gj">한강회랑</li>
												<li data-wms="lt_l_aispath" data-style="lt_l_aispath">항공로</li>
												<li data-wms="lt_p_aishcstrip" data-style="lt_p_aishcstrip">헬기장</li>
												<li data-wms="lt_c_aiscatc" data-style="lt_c_aiscatc">훈련구역</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <g fill="none" fill-rule="evenodd">
										        <path d="M0 0h16v16H0z"/>
										        <path d="M12.608 8c.172 0 .286.057.458.114l2.579 1.543c.23.172.401.457.344.743v3.2c0 .343-.172.571-.401.743l-2.58 1.543a1.065 1.065 0 0 1-.4.114c-.115 0-.287-.057-.401-.114l-2.58-1.543c-.229-.172-.4-.457-.4-.743v-3.2c0-.343.171-.571.4-.743l2.58-1.543c.114-.057.229-.114.4-.114zm-9.17 0c.172 0 .287.057.459.114l2.579 1.543c.229.172.4.457.344.743v3.2c0 .343-.172.571-.402.743L3.84 15.886c-.115.057-.23.114-.402.114-.171 0-.286-.057-.458-.114L.401 14.343C.171 14.17 0 13.886 0 13.6v-3.2c0-.286.172-.571.458-.743l2.58-1.543c.114-.057.229-.114.4-.114zm9.17 1.2-2.293 1.371v2.858l2.293 1.371 2.292-1.371V10.57L12.608 9.2zm-9.17 0-2.292 1.371v2.858L3.438 14.8l2.293-1.371V10.57L3.438 9.2zM8.023 0c.172 0 .287.057.459.114l2.578 1.543c.23.172.402.457.287.743v3.2c0 .343-.172.571-.401.743l-2.58 1.543a1.065 1.065 0 0 1-.4.114c-.115 0-.287-.057-.401-.114l-2.58-1.543c-.228-.172-.4-.457-.4-.743V2.4c0-.286.172-.571.458-.743L7.622.114C7.737.057 7.852 0 8.023 0zm0 1.2L5.731 2.571V5.43L8.023 6.8l2.292-1.371V2.57L8.023 1.2z" fill="#727B90"/>
										    </g>
										</svg>
										<strong>문화/체육/관광</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>관광 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_dgtouristinfo" data-style="lt_p_dgtouristinfo">관광안내소</li>
												<li data-wms="lt_p_tradsijang" data-style="lt_p_tradsijang">전통시장현황</li>
											</ol>
										</dd>
										<dt>문화예술 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_smalllibrary" data-style="lt_p_smalllibrary">작은도서관</li>
											</ol>
										</dd>
										<dt>문화재 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_uo301" data-style="lt_c_uo301">문화재보호도</li>
												<li data-wms="lt_p_dgmuseumart" data-style="lt_p_dgmuseumart">박물관미술관</li>
												<li data-wms="lt_c_uo501" data-style="lt_c_uo501">전통사찰보존</li>
											</ol>
										</dd>
										<dt>체육 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_wgisnpgug" data-style="lt_c_wgisnpgug">국립자연공원</li>
												<li data-wms="lt_c_wgisnpgun" data-style="lt_c_wgisnpgun">군립자연공원</li>
												<li data-wms="lt_c_wgisnpdo" data-style="lt_c_wgisnpdo">도립자연공원</li>
												<li data-wms="lt_l_frstclimb,lt_p_climball" data-style="lt_l_frstclimb,lt_p_climball">등산로</li>
												<li data-wms="lt_l_trkroad,lt_p_trkroad" data-style="lt_l_trkroad,lt_p_trkroad">산책로</li>
												<li data-wms="lt_l_byclink" data-style="lt_l_byclink">자전거길</li>
												<li data-wms="lt_p_bycracks" data-style="lt_p_bycracks">자전거보관소</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M13.714 6.25C14.976 6.249 16 5.205 16 3.917v-1.75h-1.714a2.25 2.25 0 0 0-1.57.645A3.42 3.42 0 0 0 9.714 1H8v1.75c.002 1.932 1.536 3.498 3.429 3.5H12v7.583H5.143v-2.916h.571C6.976 10.915 8 9.87 8 8.583v-1.75H6.286a2.25 2.25 0 0 0-1.57.646 3.42 3.42 0 0 0-3.002-1.812H0v1.75c.002 1.932 1.536 3.498 3.429 3.5H4v2.916H0V15h16v-1.167h-2.857V6.25h.571zm-.571-1.75c0-.644.512-1.166 1.143-1.167h.571v.584c0 .644-.512 1.166-1.143 1.166h-.571V4.5zm-8 4.667C5.143 8.523 5.655 8 6.286 8h.571v.583c0 .644-.512 1.166-1.143 1.167h-.571v-.583zM4 9.75h-.571c-1.262-.001-2.285-1.045-2.286-2.333v-.584h.571C2.976 6.835 4 7.88 4 9.167v.583zm8-4.667h-.571c-1.262-.001-2.285-1.045-2.286-2.333v-.583h.571C10.976 2.168 12 3.212 12 4.5v.583z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>사회복지</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>사회복지 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_mgprtfd" data-style="lt_p_mgprtfd">기타보호시설</li>
												<li data-wms="lt_p_mgprtfb" data-style="lt_p_mgprtfb">노인복지시설</li>
												<li data-wms="lt_p_dgpostnatal" data-style="lt_p_dgpostnatal">산후조리원</li>
												<li data-wms="lt_p_mgprtfc" data-style="lt_p_mgprtfc">아동복지시설</li>
												<li data-wms="lt_p_mgprtfa" data-style="lt_p_mgprtfa">아동안전지킴이집</li>
												<li data-wms="lt_p_idolbomsites" data-style="lt_p_idolbomsites">아이돌봄서비스기관</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M14.857 0H8c-.63 0-1.142.512-1.143 1.143v5.714H1.143C.512 6.857 0 7.37 0 8v8h16V1.143C16 .512 15.488 0 14.857 0zM4 14.857v-4h2.286v4H4zm10.857 0H7.43v-4.571a.571.571 0 0 0-.572-.572H3.43a.571.571 0 0 0-.572.572v4.571H1.143V8H8V1.143h6.857v13.714zM9.143 3.43h1.143V4.57H9.143V3.43zm3.428 0h1.143V4.57h-1.143V3.43zM9.143 6.857h1.143V8H9.143V6.857zm3.428 0h1.143V8h-1.143V6.857zm-3.428 3.428h1.143v1.143H9.143v-1.143zm3.428 0h1.143v1.143h-1.143v-1.143zM0 4.572h2.857v1.142H0V4.572zM4.571 0h1.143v2.857H4.571V0zM1.143 1.95l.808-.807L4 3.192 3.192 4l-2.05-2.05z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>산업/중소기업</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>산업 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_dgmainbiz" data-style="lt_c_dgmainbiz">주요상권</li>
												<li data-wms="lt_p_busiincubator" data-style="lt_p_busiincubator">창업보육센터</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M10.286 10.154H5.714c-.63 0-1.143-.482-1.143-1.077V8c0-.595.512-1.077 1.143-1.077h4.572c.63 0 1.143.482 1.143 1.077v1.077c0 .595-.512 1.077-1.143 1.077zM5.714 8v1.077h4.572V8H5.714zm9.143-7H1.143C.512 1 0 1.482 0 2.077V4.23c0 .595.512 1.077 1.143 1.077v8.615c0 .595.512 1.077 1.143 1.077h11.428c.631 0 1.143-.482 1.143-1.077V5.308c.631 0 1.143-.482 1.143-1.077V2.077C16 1.482 15.488 1 14.857 1zm-1.143 12.923H2.286V5.308h11.428v8.615zm1.143-9.692H1.143V2.077h13.714V4.23z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>일반공공행정</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>일반행정 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_bldginfo" data-style="lt_c_bldginfo">건축물정보</li>
												<li data-wms="lt_c_spbd" data-style="lt_c_spbd">도로명주소건물</li>
												<li data-wms="lt_l_sprd" data-style="lt_l_sprd">도로명주소도로</li>
												<li data-wms="lt_p_dgmldispenser" data-style="lt_p_dgmldispenser">무인발급기정보</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M15.61 3.458 5.323.029A.571.571 0 0 0 4.8.114L1.143 2.857V0H0v16h1.143V5.143L4.8 7.886c.15.112.346.144.524.085l10.285-3.429a.571.571 0 0 0 0-1.084zM4.57 6.286 1.524 4 4.57 1.714v4.572zm2.286-.031-1.143.38v-5.27l1.143.38v4.51zm2.286-.762L8 5.873V2.127l1.143.381v2.986zm1.143-.381V2.888L13.622 4l-3.336 1.112zm0 6.317a2.286 2.286 0 1 0-4.572 0h1.143A1.143 1.143 0 1 1 8 12.57H3.429v1.143h4.57a2.288 2.288 0 0 0 2.287-2.285zm3.428 0a2.288 2.288 0 0 0-2.286 2.285h1.143a1.143 1.143 0 1 1 1.143 1.143h-8V16h8a2.286 2.286 0 0 0 0-4.571z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>재난방재/공공안전</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>공공안전 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_tdwarea" data-style="lt_c_tdwarea">보행우선구역</li>
											</ol>
										</dd>
										<dt>재난방재 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_c_kfdrssigugrade" data-style="lt_c_kfdrssigugrade">산불위험예측지도</li>
												<li data-wms="lt_c_usfsffb" data-style="lt_c_usfsffb">소방서관할구역</li>
												<li data-wms="lt_c_up201" data-style="lt_c_up201">재해위험지구</li>
											</ol>
										</dd>
									</dl>
								</li>
								<li>
									<label class="category">
										<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
										    <path d="M5.143 8V5.143h.571A2.288 2.288 0 0 0 8 2.857V1.143H6.285c-.585 0-1.147.227-1.57.632a3.43 3.43 0 0 0-3-1.775H0v1.714a3.432 3.432 0 0 0 3.428 3.429H4V8H0v1.143h8V8H5.143zm1.142-5.714h.572v.571C6.857 3.488 6.345 4 5.714 4h-.571v-.571c0-.631.512-1.143 1.142-1.143zM3.428 4a2.288 2.288 0 0 1-2.285-2.286v-.571h.571A2.288 2.288 0 0 1 4 3.429V4h-.572zM0 10.857h8V12H0v-1.143zm0 2.857h8v1.143H0v-1.143zM13.142 16a2.85 2.85 0 0 1-1.714-5.131v-3.44a1.714 1.714 0 1 1 3.429 0v3.44A2.85 2.85 0 0 1 13.142 16zm0-9.143a.572.572 0 0 0-.571.572v4.074l-.284.165c-.53.301-.859.865-.859 1.475a1.714 1.714 0 1 0 3.429 0c0-.61-.328-1.174-.86-1.475l-.283-.165V7.429a.572.572 0 0 0-.572-.572z" fill="#727B90" fill-rule="evenodd"/>
										</svg>
										<strong>환경/자연/기후</strong>
										<i class='bx bx-chevron-down'></i>
									</label>
									<dl>
										<dt>자연 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_l_gimsfault" data-style="lt_l_gimsfault">단층</li>
												<li data-wms="lt_c_asitsoildra" data-style="lt_c_asitsoildra">배수등급</li>
												<li data-wms="lt_c_gimshydro" data-style="lt_c_gimshydro">수문지질단위</li>
												<li data-wms="lt_c_gimsstiff" data-style="lt_c_gimsstiff">수질다이어그램</li>
												<li data-wms="lt_c_asitdeepsoil" data-style="lt_c_asitdeepsoil">심토토성</li>
												<li data-wms="lt_c_asitsoildep" data-style="lt_c_asitsoildep">유효토심</li>
												<li data-wms="lt_c_asitsurston" data-style="lt_c_asitsurston">자갈함량</li>
												<li data-wms="lt_l_gimsec" data-style="lt_l_gimsec">전기전도도</li>
												<li data-wms="lt_c_gimslinea" data-style="lt_c_gimslinea">지질구조밀도</li>
												<li data-wms="lt_l_gimslinea" data-style="lt_l_gimslinea">지질구조선</li>
												<li data-wms="lt_l_gimsdepth" data-style="lt_l_gimsdepth">지하수등수심선</li>
												<li data-wms="lt_l_gimspoten" data-style="lt_l_gimspoten">지하수등수위선</li>
												<li data-wms="lt_l_gimsdirec" data-style="lt_l_gimsdirec">지하수유동방향</li>
												<li data-wms="lt_c_gimsscs" data-style="lt_c_gimsscs">토양도</li>
											</ol>
										</dd>
										<dt>환경보호 <i class='bx bx-chevron-down'></i></dt>
										<dd>
											<ol>
												<li data-wms="lt_p_sgisgolf" data-style="lt_p_sgisgolf">골프장현황도</li>
												<li data-wms="lt_p_weisplaface" data-style="lt_p_weisplaface">기타공동처리시설</li>
												<li data-wms="lt_p_weisplafaca" data-style="lt_p_weisplafaca">농공단지처리시설</li>
												<li data-wms="lt_p_weisplafacv" data-style="lt_p_weisplafacv">마을하수도</li>
												<li data-wms="lt_p_weisplafacl" data-style="lt_p_weisplafacl">매립장침출수처리시설</li>
												<li data-wms="lt_c_um710" data-style="lt_c_um710">상수원보호</li>
												<li data-wms="lt_p_weistaccon" data-style="lt_p_weistaccon">수생태계조사지점</li>
												<li data-wms="lt_p_weissitetb" data-style="lt_p_weissitetb">수질자동측정망측정지점</li>
												<li data-wms="lt_p_weissiteme" data-style="lt_p_weissiteme">수질측정망공단배수지점</li>
												<li data-wms="lt_p_weissitemd" data-style="lt_p_weissitemd">수질측정망농업용수지점</li>
												<li data-wms="lt_p_weissitemf" data-style="lt_p_weissitemf">수질측정망도시관류지점</li>
												<li data-wms="lt_p_weissitema" data-style="lt_p_weissitema">수질측정망하천수지점</li>
												<li data-wms="lt_p_weissitemb" data-style="lt_p_weissitemb">수질측정망호소수지점</li>
												<li data-wms="lt_p_sgisgwchg" data-style="lt_p_sgisgwchg">지하수측정망(오염우려지역)</li>
												<li data-wms="lt_p_weisplafacs" data-style="lt_p_weisplafacs">축산폐수공공처리시설</li>
												<li data-wms="lt_p_weisplafacw" data-style="lt_p_weisplafacw">하수종말처리시설</li>
											</ol>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
						<h2>선택한 데이터<span class="selCnt"></span></h2>
						<div class="selectedLocationList">
							<ul></ul>
						</div>
					</div>
					<div id="map" class="map map-ov-lt map-location">
						<div class="map-ui map-ui-rt map-type">
							<button type="button" class="base active" data-map-action="map-base" title="일반지도">일반지도</button>
							<button type="button" class="satellite" data-map-action="map-satellite" title="위성지도">위성지도</button>
							<button type="button" class="hybrid" data-map-action="map-hybrid" title="하이브리드 지도">하이브리드 지도</button>
						</div>
						<div class="map-ui map-ui-rt">
							<div class="map-ui-group">
								<button type="button" data-map-action=":full-screen" title="전체 화면"><i class="fas fa-expand"></i></button>
							</div>
							<div class="map-ui-group">
								<button type="button" data-map-action="home" title="홈으로"><i class="fas fa-home"></i></button>
								<button type="button" data-map-action=":zoom-in" title="확대"><i class="fas fa-plus"></i></button>
								<button type="button" data-map-action=":zoom-out" title="축소"><i class="fas fa-minus"></i></button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="buttonBox mycmmntyButtonBox">
			<c:if test="${myDetail.temp_yn eq 'Y'}">
			    <button type="button" class="temporaryButton">임시저장</button>
			</c:if>
			
			<%-- 임시저장 or 진행중&&답변없는경우 --%>
			<c:if test="${myDetail.temp_yn eq 'Y' or (myDetail.temp_yn eq 'N' and (today <= myDetail.end_dt or empty myDetail.end_dt)) and myDetail.answer_cnt <= 0}">
				<button type="button" class="SaveButton">저장</button>
			</c:if>
			
			<%-- 임시저장 or 진행중 --%>
			<c:if test="${myDetail.temp_yn eq 'Y' or (myDetail.temp_yn eq 'N' and (today <= myDetail.end_dt or empty myDetail.end_dt))}">
				<button class="DeleteButton">삭제</button>
			</c:if>
			
				<button type="button" class="cancleButton">뒤로가기</button>
			</div>
		</div>
		</form>
		
	</div>
</t:subapp>