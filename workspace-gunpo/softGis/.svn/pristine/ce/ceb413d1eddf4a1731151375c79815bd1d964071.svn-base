<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ attribute name="title" required="false" %>
<%@ attribute name="extra_head" fragment="true" required="false" %>
<%@ attribute name="extra_body" fragment="true" required="false" %>
<spring:eval expression="@globals.getProperty('sys.name')" var="systemName" />
<%
	String url = request.getAttribute("javax.servlet.forward.request_uri").toString().substring(request.getContextPath().length());
	String pageId = url.substring(1).replace(".do", "").replace("/", "_").replaceAll("([a-z])([A-Z]+)", "$1_$2").toLowerCase();
	if(url.substring(1).replace(".do", "").equals("dashboard")){pageId = request.getParameter("category");}
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<title>${empty title ? "softGis" : title}</title>
	<link rel="shortcut icon" href="<c:url value='/assets/images/common/favicon.ico' />" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/nucleo-icons.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/nucleo-svg.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/soft-ui-dashboard.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery-ui.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/bootstrap.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/app.bundle.css' />">
	<jsp:invoke fragment="extra_head" />
</head>
<body id="<%=pageId%>" class="no-js g-sidenav-show bg-gray-100">

	<div id="wrap">
			<div class="topmenu">
				<div class="topmenu-logo">
					<a class="main-logo" href="<c:url value='/main.do'/>">
						<img src="<c:url value='/assets/images/common/logo.png'/>" alt="함께할지도">
					</a>
					<%--<svg class="mobile-nav active" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M2 10V9h12v1H2zm0-4h12v1H2V6zm12-3v1H2V3h12zM2 12v1h12v-1H2z"/></svg> --%>
				</div>
				<nav class="topmenu-nav">
					<ul>
						<li>
							<a class="topmenu-nav-menu" href="<c:url value='/service.do' />">서비스 소개</a>
						</li>
						<li>
							<a class="topmenu-nav-menu" href="#">함께할지도</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/cmmntyMap/cmmnty-list.do' />"><span>함께할지도</span></a></li>
								<%--<li><a href="<c:url value='/survey/survey-create.do' />"><span>커뮤니티 매핑 만들기</span></a></li>--%>
								<%--<li><a href="<c:url value='/survey/survey-everyone.do' />"><span>함께할 지도</span></a></li>--%>
									<c:if test="${__USER__ ne null}">
									<li><a href="<c:url value='/mycmmntyMap/mycmmnty-list.do' />"><span>나의 함께할지도</span></a></li>
									</c:if>
								<%--<li><a href="<c:url value='/survey/survey-format.do' />"><span>커뮤니티 매핑 서식</span></a></li>--%>						
								</ul>
							</div>
						</li>
						<li>
							<a class="topmenu-nav-menu" href="<c:url value='/cmmntyMap/cmmnty-dashboard.do' />">함께할지도 통계</a>
						</li>
					<c:if test="${__ADMIN__}">
						<li>
							<a class="topmenu-nav-menu" href="#">빅데이터 분석</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/data-catalog.do' />"><span>빅데이터 목록</span></a></li>
									<li><a href="<c:url value='/dashboard/db-ur.do' />"><span>분석 대시보드</span></a></li>
								</ul>
							</div>
						</li>
					</c:if>
						<li>
							<a class="topmenu-nav-menu" href="#">알림마당</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/noticeList.do' />"><span>공지사항</span></a></li>
									<li><a href="<c:url value='/faqList.do' />"><span>FAQ</span></a></li>
									<li><a href="<c:url value='/qnaList.do' />"><span>QnA</span></a></li>
									<li><a href="<c:url value='/dataList.do' />"><span>자료실</span></a></li>
								</ul>
							</div>
						</li>
					<c:if test="${__ADMIN__}">
						<li>
							<a class="topmenu-nav-menu" href="#">시스템 관리</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/admin/admin-cmmnty.do' />"><span>함께할지도 관리</span></a></li>
									<%--<li><a href="<c:url value='/admin/admin-anal-mngr.do' />"><span>빅데이터분석 관리</span></a></li> --%>
									<li><a href="<c:url value='/admin/admin-meta-mngr.do' />"><span>데이터 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-notice.do'/>"><span>알림마당 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-usr.do' />"><span>사용자 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-code.do' />"><span>코드 관리</span></a></li>
								</ul>
							</div>
						</li>
					</c:if>
					</ul>
				</nav>
				<div class="topmenu-auth">
			<c:choose>
				<c:when test="${__USER__ ne null}">
					<a href="<c:url value='/mypage.do'/>" class="my-info" title="내정보 수정">
						<i class="bx bxs-user-circle"></i>관리자
					</a>
					<a href="<c:url value='/logout.do'/>" class="log-out" title="로그아웃">
						<i class="bx bxs-log-out"></i>로그아웃
					</a>
				</c:when>
				<c:otherwise>
					<a href="<c:url value='/login-sns.do'/>" class="log-in" title="로그인">LOGIN</a>
				</c:otherwise>
			</c:choose>
				</div>
				
				<div class="topmenu-overlay"></div>
			</div>
	
		<div class="main">
			<jsp:doBody />
		</div>
	<script>
		window.Constant = {};
		window.Constant.SYSTEM_NAME = '${systemName}';
		window.Constant.CONTEXT_PATH = '${pageContext.request.contextPath}';
	</script>
	<script type="text/javascript" src="<c:url value='/assets/js/jquery-3.5.1.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/highcharts.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/highcharts-more.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/wordcloud.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/exporting.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/accessibility.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/treemap.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/heatmap.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/no-data-to-display.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/jquery-ui.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/jquery.ui.monthpicker.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/perfect-scrollbar.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/smooth-scrollbar.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/ol.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/proj4.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/proj4.epsg.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/kendo.all.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/popper.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/common.js' />" ></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/chartFunction.js'/>"></script>  
	<script type="text/javascript" src="<c:url value='/assets/js/core/soft-ui-dashboard.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='https://kit.fontawesome.com/42d5adcbca.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/bootstrap.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/bootstrap.bundle.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/app.bundle.js' />"></script>
	
	<script type="text/javascript">
		let menu = $('.topmenu-nav-menu');
		let gnb = $('.topmenu-nav-depth2');
	
	  	$(menu).each(function (e) {
			$(this).on('click', function openGnb(e) {
				let targetMenu = $(this);
				let targetGnb = $(this).next();
		
				if ($(targetGnb).hasClass('active')) {
					$(targetGnb).removeClass('active');
					$(targetMenu).removeClass('active');
				} else {
					$(menu).each(function(e) {
						$(this).removeClass('active');
		
						$(gnb).each(function (e) {
							$(this).removeClass('active');
						});
					});
					
					$(targetGnb).addClass('active');
					$(targetMenu).addClass('active');
				}
			});
			
			//모바일 동작
			$(".mobile-nav").on('click', function() {
				$(".topmenu").addClass("active");
			});
		
			$(".main").click(function(e) {   
				if(!$('.topmenu').has(e.target).length ) $('.topmenu').removeClass("active");
			});
		});
	</script>
	<jsp:invoke fragment="extra_body" />
	
</body>
</html>