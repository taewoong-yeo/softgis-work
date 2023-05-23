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
		<div class="title_btn">
			<a href="<c:url value='/dataList.do?currentPage=${page}&search_keyword=${serchvalue}'/>" class="icon_wrap">
				<img src="<c:url value='/assets/images/common/icon-list.png'/>"/>
			</a>
			<span>목록<br/>가기</span>
		</div>
	</div>
</div>
<div class="sub-main inputData">
	<div class="sub-wrap"> 
<!-- 		<form method="POST" class="dataForm"> -->
		<form id="submitForm" method="post" enctype="multipart/form-data" >
		<input type="hidden" name="job_mode" id="job_mode" value="${job_mode }">
		<input type="hidden" name="serchvalue" id="serchvalue" value="${serchvalue }">
		<input type="hidden" name="page" id="page" value="${page }">
		<input type="hidden" name="data_id" id="data_id" value="${data_id }">
		<input type="hidden" name="file_id" id="file_id" value="${dataList.file_id }">
		<input type="hidden" name="attFileSize" id="attFileSize" value="0">
		
		<div class="sub-content">
			 <div class="sub-view">
				<div class="sub-title">
					<div class="title">
						<label for="data_title" class="form-required">제목</label>
						<input type="text" name="data_title" id="data_title" placeholder="제목을 입력해주세요" value="${dataList.data_title}">	
					</div>
					<div class="content">
						<label for="data_content" class="form-required content">내용</label>
						<textarea id="data_content" name="data_content" rows="20" >${dataList.data_content}</textarea>
					</div>
	 			
					<div class="attach"> 
						<label for="att_file" class="form-required" id="fileTitleDesc">첨부</label>
						<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
						<label for="att_file" class="file_btn">파일 선택</label>
						<span id="fileName">${dataList.file_org_nm}</span>
						<a class="del_file"><img src="<c:url value='/assets/images/cmmnty/btn-close-dark.png'/>"/></a>
					</div>
				</div>
			</div>
		</div>
		</form>

		<div class="button_right">
			<a href="<c:url value='/dataList.do?currentPage=${page}&search_keyword=${serchvalue}'/>" class="cancel primary2">취소</a>
			<a class="dataRegBtn insert">등록</a>
		</div>
	</div>
</div>
</t:subapp>