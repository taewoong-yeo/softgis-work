<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
<div class="title_bg">
	<div class="title_container">
		<div class="title_wrap">
			<div class="title_menu">FAQ </div>
			<span>함께할지도의 자주묻는질문입니다.</span>
		</div>
	</div>
</div>
<div class="sub-main">
	<div class="sub-wrap">
		<table class="sub-table faq_list">
			<colgroup>
				<col width="14%"/>
				<col/>
			</colgroup>
			<thead>
				<tr>
			  		<th>카테고리</th>
			  		<th>제목</th>
				</tr>
			</thead>
			<tbody>
	 	<c:forEach items="${faqList}" var="item">
				<tr data-id="${item.faq_id }">
					<td>${item.faq_cat}</td>
					<td><span>${item.faq_title}</span><img src="<c:url value='/assets/images/common/icon-arrow-dn-dark.png'/>"/>
						<div style="display:none">${item.faq_content }</div>
					</td>
				</tr>
			</c:forEach>
			</tbody>
		</table>		 
		 <%@ include file="/WEB-INF/views/common/pager.jsp" %>
<!-- 		 <div class="button"> -->
<!-- 			<a href="/main.do">홈으로 이동</a> -->
<!-- 		</div>  -->

	</div>
</div>
</t:subapp>