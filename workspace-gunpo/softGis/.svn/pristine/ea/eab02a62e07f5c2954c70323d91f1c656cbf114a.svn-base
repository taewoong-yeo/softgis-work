<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:subapp>
<div class="sub-main">
	<div class="sub-wrap">
		<h2>설문 그룹</h2>
		 <form action="<c:url value="/survey/survey-group-list.do" />" method="GET" class="search-field">
			<label>
				<input name="searchOption" value="all" type="radio">
				<span>제목 + 내용</span>
			</label>
			<label>
				<input name="searchOption" value="title" type="radio">
				<span>제목</span>
			</label>
			<label>
				<input name="searchOption" value="content" type="radio">
				<span>내용</span>
			</label>
			<input type="text" placeholder="검색어를 입력하세요" name="search_keyword" value="${search_keyword}" onkeypress="">
			<button type="submit" class="btn btn-primary">검색</button>
		</form>
		<table class="sub-table">
			<thead>
				<tr>
			  		<th>NO</th>
			  		<th>설문그룹명</th>
			  		<th>그룹설명</th>
				</tr>
			</thead>
			<tbody>
			<c:forEach items="${result}" var="item">
				<tr>
					<td>${item.grp_id }</td>
					<td><a href="<c:url value='/noticeDetail.do?noti_id=${item.grp_id}' />">${item.grp_nm }</a></td>
					<td>${item.grp_desc}</td>
				</tr>
			</c:forEach>
			</tbody>
		</table>
		<div class="search-result-paginate"></div>
		<div class="button">
			<a href="/main.do">홈으로 이동</a>
		</div> 
	</div>
</div>
</t:subapp>