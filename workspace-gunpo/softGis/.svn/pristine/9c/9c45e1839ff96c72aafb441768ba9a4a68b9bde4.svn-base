<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
<div class="title_bg">
	<h1><span>FAQ <div class="underline"></div> </span></h1>
</div>
<div class="sub-main">
	<div class="sub-wrap">
		<div class="sub-content">
			 <div class="sub-view">
				<div class="sub-title">
					<div class="title">
						<strong>제목&emsp;:&emsp;</strong>
						<span>${faqList.faq_title}</span>
					</div>
				</div>
				<div class="sub-info">
					<p>
						<strong>등록일&emsp;:&emsp;</strong>
						<span>${faqList.reg_dt}</span>
					</p>
				</div>
				
				<div class="sub-content">
					<textarea id="faq_content" style="display: none;"><c:out value="${faqList.faq_content}" escapeXml="false"/></textarea>
				</div>
				
				<c:if test="${not empty faqList.file_id}">
				<div class="sub-file">
					<div class="file">
						<strong>첨부파일&ensp;&ensp;</strong>
						<a href="<c:url value='/fileGet.do?fileId=${faqList.file_id}&fileFolder=FAQ'/>">
						<i class='bx bx-file' style="color:green"></i>${faqList.file_org_nm}</a>
					</div>
				</div>
			</c:if>
			</div>
		</div> 
		<div class="button">
			<a href="<c:url value='/faqList.do?currentPage=${page}&search_keyword=${serchvalue}'/>">목록으로 돌아가기</a>
		</div>
	</div>
</div>
</t:subapp>