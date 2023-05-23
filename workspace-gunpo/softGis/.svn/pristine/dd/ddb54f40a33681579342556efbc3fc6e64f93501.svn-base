<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
	<div class="search_title_wrap">
		<div class="search">
			<div class="search-menu">
				<h1 class="search-title">빅데이터 목록</h1>
				<h2>홈 / 빅데이터 분석 / 빅데이터 목록</h2>
				<div class="search-filter-wrap">
					<form class="search-filter">
						<div class="search-filter-title">카테고리</div>
						<div class="search-filter-field">
							<label class="all active">
								<input type="checkbox" name="category" id="category_all" ${empty category ? 'checked' : ''}> 전체 선택
							</label>
							<c:forEach var="item" items="${__CODES__}">
								<c:if test="${item.grp_id eq 'DATA_CATE'}">
									<label><input type="checkbox" name="category" value="${item.cd_nm}"> ${item.cd_nm}</label>
								</c:if>
							</c:forEach>
						</div>
					</form>
					<form class="search-filter inactive">
						<div class="search-filter-title">수집형태</div>
						<div class="search-filter-field">
							<label class="all active"><input type="checkbox" name="gather" id="gather_all" ${empty gather ? 'checked' : ''}> 전체 선택</label>
							<c:forEach var="item" items="${__CODES__}">
								<c:if test="${item.grp_id eq 'DATA_GTHER'}">
									<label>
										<input type="checkbox" name="gather" value="${item.cd_nm}">
										<c:choose>
											<c:when test="${item.cod_cd eq 'DG_SHP'}">SHP (지도)</c:when>
											<c:otherwise><c:out value="${item.cd_nm}" /></c:otherwise>
										</c:choose>
								    </label>
								</c:if>
							</c:forEach>
						</div>
					</form>
					<form class="search-filter inactive">
						<div class="search-filter-title">수집주기</div>
						<div class="search-filter-field">
							<label class="all active"><input type="checkbox" name="cycle" id="cycle_all" ${empty cycle ? 'checked' : ''}> 전체 선택</label>
							<c:forEach var="item" items="${__CODES__}">
								<c:if test="${item.grp_id eq 'DATA_FCLY'}">
									<label><input type="checkbox" name="cycle" value="${item.cd_nm}"> ${item.cd_nm}</label>
								</c:if>
							</c:forEach>
						</div>
					</form>
					<form class="search-filter inactive">
						<div class="search-filter-title">출처</div>
						<div class="search-filter-field">
							<label class="all active"><input type="checkbox" name="source" id="source_all" ${empty source ? 'checked' : ''}> 전체 선택</label>
							<c:forEach var="item" items="${sources}">
								<label><input type="checkbox" name="source" value="${item.mta_src}"> ${item.mta_src}</label>
							</c:forEach>
						</div>
					</form>
					<div class="keyword">
						<div class="title_search">
							<div class="searchBar">
								<input type="text" placeholder="검색어를 입력하세요" id="search_keyword" name="search_keyword" value="${search_keyword}" onkeypress="">
								<button class="searchButton" type="button">
									<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
									</svg>
								</button>	
							</div>
							<span>총 <strong class="u-text-secondary"><c:out value="${metadatas.size()}" /></strong>건의 데이터가 검색되었습니다.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="search">
		<div class="search-result">
			<div class="search-result-header" style="display: none;">
				<form action="<c:url value="/dataCatalog.do" />" method="GET" class="search-field">
					<input type="text" name="query" id="query">
				</form>
				
			</div>
			<div class="search-result-list" style="display: none;">
				<div class="search-result-empty">
					<i class='bx bx-x-circle'></i><br>
					요청하신 조건에 일치하는 데이터가 없습니다.
				</div>
				<div class="search-result-paginate"></div>
			</div>
		</div>
	</div>
</t:subapp>