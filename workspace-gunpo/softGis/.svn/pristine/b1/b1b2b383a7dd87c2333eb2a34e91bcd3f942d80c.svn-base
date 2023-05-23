<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="title_bg">
		<div class="title_container">
			<div class="title_wrap">
				<div class="title_menu">함께할지도 </div>
				<span>함께할지도 목록입니다.</span>
			</div>
			<form action="<c:url value="/cmmntyMap/cmmnty-list.do" />" method="GET" id="searchForm">
		 		<input type="hidden" id="currentPage" name="currentPage" value="1"/>
		 		<input type="hidden" id="mapng_id" name="mapng_id" value=""/>
			<div class="title_search">
				<span>카테고리</span>
				<select id="searchCatCd" name="searchCatCd" onChange="form.submit();">
					<option value="">선택</option>
					<t:code-as-option group="DATA_CATE" selValue="${paramMap.searchCatCd}" />
				</select>
				
				<span>제목</span>
				<div class="searchBar">
					<input type="text" placeholder="검색어를 입력하세요" name="searchMapngTitle" value="${paramMap.searchMapngTitle}" onkeypress="if(event.keyCode==13){form.submit();}">
					<button class="searchButton" type="submit">
						<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
						</svg>
					</button>	
				</div>
			</div>
			</form>
			<div class="title_btn">
				<a href="<c:url value='/cmmntyMap/cmmnty-form.do'/>" class="icon_wrap">
					<img src="<c:url value='/assets/images/common/icon-edit.png'/>"/>
				</a>
				<span>등록<br>하기</span>
			</div>
		</div>
	</div>
	<div class="sub-main cmmntyList">
		<div class="sub-wrap">
			<div class="itemList">
			<c:forEach items="${list}" var="item">
				<div class="item" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-detail.do?mapng_id=${item.mapng_id}&searchCatCd=${paramMap.searchCatCd}&searchMapngTitle=${paramMap.searchMapngTitle}'">
					<div>
						<div class="categorySituationWrap">
							<div class="itemCategory cmmnty-tag" data-category="${item.cat_cd }">${item.cat_nm}</div>
		 					<c:choose>
		 						<c:when test='${item.end_yn eq \"Y\"}'>
									<div class="itemSituation endSituation">완료</div>
		 						</c:when>
		 						<c:otherwise>
									<div class="itemSituation">진행중</div>
		 						</c:otherwise>
		 					</c:choose>
						</div>
					</div>
						
					<div class="itemImg">
						<c:choose>
						<c:when test="${item.file_id eq null or item.file_id eq ''}">
							<div class="NoImg">
								<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 14C8.5 15.5 9.79086 17 12 17C14.2091 17 15.5 15.5 16 14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="14;0"/></path></g><g fill="currentColor" fill-opacity="0"><ellipse cx="9" cy="9.5" rx="1" ry="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.2s" values="0;1"/></ellipse><ellipse cx="15" cy="9.5" rx="1" ry="1.5"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.2s" values="0;1"/></ellipse></g></svg>
								이미지가 없습니다.
							</div>
						</c:when>
						<c:otherwise>
							<img src="<c:url value='/loadImage.do?file_id=${item.file_id}'/>" onerror="this.style.display='none';"/>
						</c:otherwise>
						</c:choose>
					</div>
					<div class="itemInfo">
						<p class="mappingName">${item.mapng_title}</p>
					</div>
					<div class="itemInfo">
						<p class="mappingDesc">${item.mapng_desc}</p>
					</div>
					<div class="itemInfo">
						<div class="itemInfoPeriod"><p class="category">기간</p><p>${item.mapng_dt}</p></div>
						<div class="itemInfoViews"><p class="category">조회수</p><p>${item.view_cnt}</p></div>
						<div class="itemInfoParticipation"><p class="category">참여수</p><p>${item.answer_cnt}</p></div>
					</div>
				</div>
			</c:forEach>
			</div>

		</div>
		
		<%@ include file="/WEB-INF/views/common/pager.jsp" %>
	</div>
	<div>

		
	</div>
</t:subapp>