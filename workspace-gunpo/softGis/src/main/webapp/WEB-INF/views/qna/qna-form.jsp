<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<c:if test='${not empty qnaDetail.qna_id and qnaDetail.detail_yn eq "N"}'><c:redirect url="<c:url value='/qnaList.do?currentPage=${currentPage}'/>" /></c:if>
<t:subapp>
<div class="title_bg">
	<div class="title_container">
		<div class="title_wrap">
			<div class="title_menu">Q&A </div>
			<span>함께할지도의 Q&A입니다.</span>
		</div>
		<div class="title_btn">
			<a href="<c:url value='/qnaList.do?currentPage=${currentPage}&search_keyword=${serchvalue}'/>" class="icon_wrap">
				<img src="<c:url value='/assets/images/common/icon-list.png'/>"/>
			</a>
			<span>목록<br/>가기</span>
		</div>
	</div>
</div>
<div class="sub-main">
	<div class="sub-wrap">
	<form id="submitForm" method="post" enctype="multipart/form-data" action="<c:url value='/insertQna.do'/>">	
		<div class="sub-content">
			 <div class="sub-view">
				<div class="sub-title">
					<div class="title">
						<label for="qna_title" class="form-required">제목</label>
						<input type="hidden" name="qna_id" id="qna_id" value="${qnaDetail.qna_id}" />
						<input type="text" name="qna_title" id="qna_title" placeholder="제목을 입력해주세요." value="${qnaDetail.qna_title}" />	
					</div>
				</div>
				
				<div class="open_wrap">
					<input type="checkbox" id="open_yn" name="open_yn" <c:if test="${qnaDetail.open_yn ne 'Y'}">checked</c:if>>
					<label for="open_yn">비밀글 요청시 체크</label>
			   </div>
				
				<div class="sub-content">
					<label for="qna_title" class="form-required content">본문</label>
					<textarea id="qna_content" name="qna_content" rows="10" ><c:out value="${qnaDetail.qna_content}" escapeXml="false"/></textarea>
				</div>
				
				<div>
					<div class="attach"> 
						<label for="att_file" class="form-required" id="fileTitleDesc">첨부</label>
						<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
						<label for="att_file" class="file_btn">파일 선택</label>
						<span id="fileName">${qnaDetail.file_org_nm}</span>
						<a class="del_file"><img src="<c:url value='/assets/images/cmmnty/btn-close-dark.png'/>"/></a>
						<input type="hidden" name="file_id" id="file_id" value="${qnaDetail.file_id}" />
					</div>
				</div>
			</div>
		</div> 

		<div class="button_right">
			<a href="<c:url value='/qnaList.do?currentPage=${currentPage}&search_keyword=${serchvalue}'/>" class="cancel">취소</a>
			<c:if test="${empty qnaDetail.qna_id}">
				<a href="javascript:$('#submitForm').submit();" class="insert">등록</a>
			</c:if>
			<c:if test="${not empty qnaDetail.qna_id and empty qnaDetail.reply_content}">
				<a href="javascript:$('#submitForm').submit();" class="insert">수정</a>
			</c:if>
		</div>
	</form>	
	</div>
</div>
</t:subapp>