<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<% pageContext.setAttribute("newLineChar", "\n"); %>
<t:subapp>
<div class="title_bg">
	<div class="title_container">
		<div class="title_wrap">
			<div class="title_menu">자료실 </div>
			<span>함께할지도의 자료실입니다.</span>
		</div>
		<div class="title_btn">
			<a href="<c:url value='/dataList.do?currentPage=${page}&search_keyword=${serchvalue}'/>" class="icon_wrap">
				<img src="<c:url value='/assets/images/common/icon-list.png'/>"/>
			</a>
			<span>목록<br/>가기</span>
		</div>
	</div>
</div>
<div class="sub-main dataDetail">

	<form id="submitForm" action="<c:url value='/dataForm.do'/>">
		<input type="hidden" name="data_id" id="data_id" value="<c:url value='${dataList.data_id}' />">
		<input type="hidden" name="job_mode" id="job_mode" value="">
		<input type="hidden" name="page" id="page" value="${page}">
		<input type="hidden" name="serchvalue" id="serchvalue" value="${serchvalue }">
	</form>
	
	<div class="sub-wrap">
		<div class="sub-content">
			 <div class="sub-view">
				<div class="sub-title">
					<div class="title">
						<span>${dataList.data_title}</span>
					</div>
				</div>
				<div class="sub-info">
					<p>
						<strong>등록일 :&emsp;</strong>
						<span>${dataList.reg_dt}</span>
					</p>
				</div>
				
				<div class="sub-cont">
					${fn:replace(dataList.data_content,newLineChar,'<br/>')}
				</div>
				
				<div class="sub-file">
					<div class="file">
						<span>첨부파일</span>
						<img src="<c:url value='/assets/images/common/icon-attach.png'/>"/>
						<c:if test="${!empty dataList.file_id}">
							<a href="<c:url value='/fileGet.do?fileId=${dataList.file_id}&fileFolder=FAQ'/>">
							${dataList.file_org_nm}</a>
						</c:if>
					</div>
				</div>
			</div>
		</div> 
		<div class="buttonWrap">

			<div class="button">
			<c:choose>
				<c:when test="${__USER__.getUsr_id() eq dataList.reg_usr_id }">
						<a class="dataUpdtBtn update">수정</a>
				</c:when>
			</c:choose>
				<a href="<c:url value='/dataList.do?currentPage=${page}&search_keyword=${serchvalue}'/>">목록</a>
			</div>

		</div>
	</div>
</div>
</t:subapp>