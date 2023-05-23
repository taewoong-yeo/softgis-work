<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
<div class="title_bg">
	<div class="title_container">
		<div class="title_wrap">
			<div class="title_menu">공지사항 </div>
			<span>함께할지도의 공지사항을 알려드립니다.</span>
		</div>
		<div class="title_btn">
			<a href="<c:url value='/noticeList.do?currentPage=${page}&search_keyword=${serchvalue}'/>" class="icon_wrap">
				<img src="<c:url value='/assets/images/common/icon-list.png'/>"/>
			</a>
			<span>목록<br/>가기</span>
		</div>
	</div>
</div>
<div class="sub-main">
	<div class="sub-wrap">
		<div class="sub-content">
			<div class="sub-view">
				<div class="sub-title">
					<span>${noticeDetail.noti_title}</span>
				</div>
				<div class="sub-info">
					<p>
						<strong>등록일 :&emsp;</strong>
						<span>${noticeDetail.reg_dt}</span>
					</p>
				</div>
				<div class="sub-cont">
					<textarea id="noti_content" style="display: none;"><c:out value="${noticeDetail.noti_content}" escapeXml="false"/></textarea>
					<c:if test="${not empty noticeDetail.img_blob}">
						<img src="<c:out value="${noticeDetail.img_blob}" />">
					</c:if>
				</div>
			
			<c:if test="${not empty noticeDetail.file_id}">
				<div class="sub-file">
					<div class="file">
						<span>첨부파일</span>
						<img src="<c:url value='/assets/images/common/icon-attach.png'/>"/>
						<a href="<c:url value='/fileGet.do?fileId=${noticeDetail.file_id}&fileFolder=NOTICE'/>">
						${noticeDetail.file_org_nm}
						</a>
					</div>
				</div>
			</c:if>
			</div>
		</div>
		<div class="button">
			<a href="<c:url value='/noticeList.do?currentPage=${page}&search_keyword=${serchvalue}'/>">목록</a>
		</div>
	</div>
</div>
</t:subapp>