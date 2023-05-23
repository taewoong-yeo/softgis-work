<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
<div class="title_bg">
	<div class="title_container">
		<div class="title_wrap">
			<div class="title_menu">자료실 </div>
			<span>함께할지도의 자료실입니다.</span>
		</div>
		<form action="<c:url value="/dataList.do" />" method="GET" id="searchForm">
		 	<input type="hidden" id="currentPage" name="currentPage" value="1"/>
		<div class="title_search">
			<div class="<c:if test="${paramMap.searchOption eq 'all' }">active</c:if>">
				<input name="searchOption" id="all" value="all" type="radio" placeholder="제목 + 내용"<c:if test="${paramMap.searchOption eq 'all' }">checked</c:if>>
				<label for="all">제목 + 내용</label>
			</div>
			<div class="<c:if test="${paramMap.searchOption eq 'title' }">active</c:if>">
				<input name="searchOption" id="title" value="title" type="radio"<c:if test="${paramMap.searchOption eq 'title' }">checked</c:if>>
				<label for="title">제목</label>
			</div>
			<div class="<c:if test="${paramMap.searchOption eq 'content' }">active</c:if>">
				<input name="searchOption" id="content" value="content" type="radio"<c:if test="${paramMap.searchOption eq 'content' }">checked</c:if>>
				<label for="content">내용</label>
			</div>
	
			<div class="searchBar">
				<input type="text" placeholder="검색어를 입력하세요" name="search_keyword" value="${search_keyword}" onkeypress="">
				<button class="searchButton" type="submit">
					<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-1.07 5.793a7 7 0 1 1 1.482-1.354l5.264 4.824a1 1 0 0 1-1.352 1.474l-5.393-4.944z" fill="#727B90" fill-rule="evenodd"/>
					</svg>
				</button>	
			</div>
		</div>
		</form>
		<div class="title_btn">
			<a href="<c:url value='/dataForm.do?page=${pagination.currentPage}&serchvalue=${search_keyword}'/>" class="icon_wrap">
				<img src="<c:url value='/assets/images/common/icon-edit.png'/>"/>
			</a>
			<span>등록<br/>하기</span>
		</div>
	</div>
</div>
<div class="sub-main">
	<div class="sub-wrap">
		<table class="sub-table">
			<thead>
				<tr>
			  		<th>NO</th>
			  		<th>제목</th>
			  		<th>등록일</th>
				</tr>
			</thead>
			<tbody>
			<c:forEach items="${dataList}" var="item">
				<tr>
					<td>${item.rnum}</td>
					<td><a href="<c:url value='/dataDetail.do?data_id=${item.data_id}&page=${pagination.currentPage}&serchvalue=${search_keyword}' />"> ${item.data_title}</td>
					<td>${item.reg_dt}</td>
				</tr>
			</c:forEach>
			</tbody>	
		</table>		 
		 <%@ include file="/WEB-INF/views/common/pager.jsp" %>
	</div>
</div>
</t:subapp>