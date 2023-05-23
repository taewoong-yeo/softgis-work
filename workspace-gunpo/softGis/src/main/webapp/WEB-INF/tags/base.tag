<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
	<title>${empty title ? "LX softGis" : title}</title>
	<link rel="shortcut icon" href="<c:url value='/assets/images/common/favicon.ico' />" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/fontawesome.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/notosanskr.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/boxicons.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/boxicons.animations.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/boxicons.transformations.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/ol.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/kendo.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/kendo/kendo.bootstrap-v4.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery-ui.min.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/slick.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/slick-theme.css' />">
	<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/app.bundle.css' />">
	
	<script type="text/javascript" src="<c:url value='/assets/js/jquery-3.5.1.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/jquery-ui.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/jquery.ui.monthpicker.js' />"></script>
	
	<jsp:invoke fragment="extra_head" />
</head>
<body id="<%=pageId%>" class="no-js">
	<jsp:doBody />
	<script>
		window.Constant = {};
		window.Constant.SYSTEM_NAME = '${systemName}';
		window.Constant.CONTEXT_PATH = '${pageContext.request.contextPath}';
	</script>
	
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/ol.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/kendo.all.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/kendo.culture.ko-KR.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/kendo.messages.ko-KR.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/highcharts.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/highcharts-more.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/wordcloud.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/exporting.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/accessibility.js' /> "></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/treemap.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/heatmap.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/module/no-data-to-display.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/chartFunction.js'/>"></script>  
	<script type="text/javascript" src="<c:url value='/assets/js/core/perfect-scrollbar.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/smooth-scrollbar.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/popper.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/common.js' />" ></script>
	<script type="text/javascript" src="<c:url value='/assets/js/chart/chartFunction.js'/>"></script>  
	<script type="text/javascript" src="<c:url value='/assets/js/core/soft-ui-dashboard.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/core/bootstrap.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/jszip.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/proj4.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/proj4.epsg.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/canvas-toBlob.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/FileSaver1.3.3.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/html2canvas.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/slick.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/bootstrap.bundle.min.js' />"></script>
	<script type="text/javascript" src="<c:url value='/assets/js/app.bundle.js' />"></script>
	<jsp:invoke fragment="extra_body" />
	
</body>
</html>