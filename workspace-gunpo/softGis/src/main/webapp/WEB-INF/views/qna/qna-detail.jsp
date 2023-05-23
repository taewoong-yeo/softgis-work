<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<c:if test='${qnaDetail.detail_yn eq "N"}'><c:redirect url="/qnaList.do?currentPage=${currentPage}" /></c:if>
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
		<div class="sub-content">
			 <div class="sub-view">
				<div class="sub-title">
					<span>${qnaDetail.qna_title}</span>
					<input type="hidden" id="qna_id" value="${qnaDetail.qna_id}" />
				</div>
				<div class="sub-info">
					<p>
						<strong>등록일&emsp;:&emsp;</strong>
						<span>${qnaDetail.reg_dt}</span>
					</p>
				</div>
				
				<div class="sub-cont">
					<textarea id="qna_content" rows="10" style="display: none;"><c:out value='${qnaDetail.qna_content}' escapeXml="false"/></textarea>
				</div>
				
				<c:if test="${not empty qnaDetail.file_id}">
					<div class="sub-file">
						<div class="file">
							<span>첨부파일</span>
							<a href="<c:url value='/fileGet.do?fileId=${qnaDetail.file_id}&fileFolder=BOARD'/>">
							${qnaDetail.file_org_nm}</a>
						</div>
					</div>
				</c:if>
				
				<div class="sub-cont reply">
				<c:choose>
					<c:when test="${not empty qnaDetail.reply_content}">
						<p>답변</p>
						<textarea id="reply_content" rows="10" style="display: none;"><c:out value='${qnaDetail.reply_content}' escapeXml="false"/></textarea>
						<c:if test="${not empty qnaDetail.reply_file_id}">
							<div class="sub-file">
								<div class="file">
									<strong>첨부파일&ensp;&ensp;</strong>
									<a href="<c:url value='/fileGet.do?fileId=${qnaDetail.reply_file_id}&fileFolder=BOARD'/>">
									<i class='bx bx-file' style="color:green"></i>${qnaDetail.reply_file_org_nm}</a>
								</div>
							</div>
						</c:if>
					</c:when>
					<c:otherwise>
						<div>
							<svg width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
							    <g fill="none" fill-rule="evenodd">
							        <circle fill="#43D0AF" cx="27" cy="27" r="27"/>
							        <path d="M30 16h-5l.77 15.848h3.236L30 16zm-.32 18.173h-4.552V38h4.551v-3.827z" fill="#FFF" fill-rule="nonzero"/>
							    </g>
							</svg>
							<p>답변 대기중 입니다.</p>
						</div>
					</c:otherwise>
				</c:choose>
				</div>
				
			</div>
		</div>
		<div class="buttonWrap">
			 
		<div class="button">
		<c:if test="${empty qnaDetail.reply_content and __USER__.usr_id eq qnaDetail.reg_usr_id }">
			<a class="update" href="<c:url value='/qnaForm.do?qna_id=${qnaDetail.qna_id}&currentPage=${currentPage}'/>">수정</a> <!-- qna_content가 내용이 있다면 수정 버튼 hidden처리 -->
			<a class="delete" href="javascript:;" id="btnDelQna">삭제</a>
		</c:if>
			<a href="<c:url value='/qnaList.do?currentPage=${currentPage}&search_keyword=${serchvalue}'/>" id="btnList">목록</a>
		</div>
	</div>
</div>
</div>
</t:subapp>