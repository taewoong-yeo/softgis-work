<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ attribute name="extra_head" fragment="true" required="false" %>
<%@ attribute name="extra_body" fragment="true" required="false" %>

<t:app extra_head="${extra_head}" extra_body="${extra_body}">
	<jsp:attribute name="navigation">
		<c:if test="${__ADMINPAGE__}">
			<div class="nav">
				<div class="nav-path">
					<div class="nav-path-element">
						<span><i class='bx bxs-home'></i> 시스템 관리</span>
						<i class='bx bxs-chevron-right'></i>
					<c:if test='${__URI__.equals("/admin/admin-cmmnty.do")}'>
						<span><i class='bx bxs-data'></i> 함께할지도 관리</span>
					</c:if>
<%-- 					<c:if test='${__URI__.equals("/admin/admin-cmmnty-report.do")}'> --%>
<!-- 						<span><i class='bx bxs-data'></i> 함께할지도 관리</span> -->
<!-- 						<i class='bx bxs-chevron-right'></i> -->
<!-- 						<span><i class='bx bxs-data'></i> 함께할지도 신고 관리</span> -->
<%-- 					</c:if> --%>
					<c:if test='${__URI__.equals("/admin/admin-cmmnty-answer-report.do")}'>
						<span><i class='bx bxs-data'></i> 함께할지도 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-data'></i> 함께할지도 댓글 신고 관리</span>
					</c:if>
<%-- 					<c:if test='${__URI__.equals("/admin/admin-cmmnty-answer-ques.do")}'> --%>
<!-- 						<span><i class='bx bxs-data'></i> 함께할지도 관리</span> -->
<!-- 						<i class='bx bxs-chevron-right'></i> -->
<!-- 						<span><i class='bx bxs-data'></i> 질문 응답 조회</span> -->
<%-- 					</c:if> --%>
					<c:if test='${__URI__.equals("/admin/admin-code.do")}'>
						<span><i class='bx bx-code-alt'></i> 코드 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-usr.do")}'>
						<span><i class='bx bxs-user'></i> 사용자 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-survey.do")}'>
						<span><i class='bx bxs-notepad'></i> 설문 관리</span>
					</c:if>
					<c:if test='${fn:indexOf(__URI__, "/admin/admin-anal") > -1}'>
						<span><i class='bx bxs-analyse'></i> 분석 관리</span>
					</c:if>
					<c:if test='${fn:indexOf(__URI__, "/admin/admin-meta-mngr.do") > -1}'>
						<span><i class='bx bxs-data' ></i> 메타정보 관리</span>
					</c:if>
					<c:if test='${fn:indexOf(__URI__, "/admin/admin-meta-load.do") > -1}'>
						<span><i class='bx bxs-data'></i> 메타정보 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-data' ></i> 데이터 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-notice.do")}'>
						<span><i class='bx bxs-bell'></i> 알림마당 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-bell'></i> 공지사항 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-faq.do")}'>
						<span><i class='bx bxs-bell'></i> 알림마당 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-bell'></i> FAQ 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-qna.do")}'>
						<span><i class='bx bxs-bell'></i> 알림마당 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-bell'></i> Q&A 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-data-board.do")}'>
						<span><i class='bx bxs-bell'></i> 알림마당 관리</span>
						<i class='bx bxs-chevron-right'></i>
						<span><i class='bx bxs-bell'></i> 자료실 관리</span>
					</c:if>
					<c:if test='${__URI__.equals("/admin/admin-stopwords.do")}'>
						<span><i class='bx bxs-bell'></i> 불용어 관리</span>
					</c:if>
					
					</div>
				</div>
			</div>
			<div class="aside">
				<div class="aside-nav">
					<ul>
					<c:set var="uri" value="${__URI__}"/>
					<c:if test='${fn:indexOf(uri, "/admin/admin-anal") > -1}'>
						<li>
							<c:set var="analMngr" value="/admin/admin-anal-mngr.do"/>
							<a href="<c:url value='${analMngr}' />" <c:if test='${uri.equals(analMngr)}'>class="active"</c:if>>
								<i class='bx bxs-analyse'></i>분석 관리
							</a>
						</li>
						<li>
							<c:set var="analModel" value="/admin/admin-anal-model.do"/>
							<a href="<c:url value='${analModel}' />" <c:if test='${uri.equals(analModel)}'>class="active"</c:if>>
								<i class='bx bx-cube-alt'></i>분석모델 관리
							</a>
						</li>
						<li>
							<c:set var="analResult" value="/admin/admin-anal-result.do"/>
							<a href="<c:url value='${analResult}' />" <c:if test='${uri.equals(analResult)}'>class="active"</c:if>>
								<i class='bx bx-bug'></i>분석결과 관리
							</a> 
 						</li>
						<li>
							<c:set var="analData" value="/admin/admin-anal-data.do"/>
							<a href="<c:url value='${analData}' />" <c:if test='${uri.equals(analData)}'>class="active"</c:if>>
								<i class='bx bxs-data'></i>분석데이터 관리
							</a>
						</li>
					</c:if>
					<c:if test='${fn:indexOf(uri, "/admin/admin-meta") > -1}'>
						<li>
							<c:set var="dataMngr" value="/admin/admin-meta-mngr.do"/>
							<a href="<c:url value='${dataMngr}' />" <c:if test='${uri.equals(dataMngr)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>메타정보 관리
							</a>
						</li>
						<li>
							<c:set var="dataLoad" value="/admin/admin-meta-load.do"/>
							<a href="<c:url value='${dataLoad}' />" <c:if test='${uri.equals(dataLoad)}'>class="active"</c:if>>
								<i class='bx bxs-data' ></i>데이터 관리
							</a>
						</li>
					</c:if>
					<c:if test='${uri eq "/admin/admin-notice.do" or uri eq "/admin/admin-faq.do" or uri eq "/admin/admin-qna.do" or uri eq "/admin/admin-data-board.do" }'>
						<li>
							<c:set var="notice" value="/admin/admin-notice.do"/>
							<a href="<c:url value='${notice}' />" <c:if test='${uri.equals(notice)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>공지사항 관리
							</a>
						</li>
						<li>
							<c:set var="faq" value="/admin/admin-faq.do"/>
							<a href="<c:url value='${faq}' />" <c:if test='${uri.equals(faq)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>FAQ 관리
							</a>
						</li>
						<li>
							<c:set var="qna" value="/admin/admin-qna.do"/>
							<a href="<c:url value='${qna}' />" <c:if test='${uri.equals(qna)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>Q&A 관리
							</a>
						</li>
						<li>
							<c:set var="databoard" value="/admin/admin-data-board.do"/>
							<a href="<c:url value='${databoard}' />" <c:if test='${uri.equals(databoard)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>자료실 관리
							</a>
						</li>
					</c:if>
				
					
					<c:if test='${uri eq "/admin/admin-cmmnty.do" or uri eq "/admin/admin-cmmnty-report.do" or uri eq "/admin/admin-cmmnty-answer-report.do" or uri eq "/admin/admin-cmmnty-answer-ques.do"}'>
						<li>
							<c:set var="cmmnty" value="/admin/admin-cmmnty.do"/>
							<a href="<c:url value='${cmmnty}' />" <c:if test='${uri.equals(cmmnty)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>함께할지도관리
							</a>
						</li>
<!-- 						<li> -->
<%-- 							<c:set var="report" value="/admin/admin-cmmnty-report.do"/> --%>
<%-- 							<a href="<c:url value='${report}' />" <c:if test='${uri.equals(report)}'>class="active"</c:if>> --%>
<!-- 								<i class='bx bxs-info-square'></i>함께할지도 <br/>신고 관리 -->
<!-- 							</a> -->
<!-- 						</li> -->
						<li>
							<c:set var="report" value="/admin/admin-cmmnty-answer-report.do"/>
							<a href="<c:url value='${report}' />" <c:if test='${uri.equals(report)}'>class="active"</c:if>>
								<i class='bx bxs-info-square'></i>함께할지도 <br/> 댓글 신고 관리
							</a>
						</li>
<!-- 						<li> -->
<%-- 							<c:set var="ques" value="/admin/admin-cmmnty-answer-ques.do"/> --%>
<%-- 							<a href="<c:url value='${ques}' />" <c:if test='${uri.equals(ques)}'>class="active"</c:if>> --%>
<!-- 								<i class='bx bxs-info-square'></i> 질문 응답 조회 -->
<!-- 							</a> -->
<!-- 						</li> -->
					</c:if>
					</ul>
				</div>
			</div>
		</c:if>
	</jsp:attribute>
	<jsp:body>
		<jsp:doBody />
	</jsp:body>
</t:app>