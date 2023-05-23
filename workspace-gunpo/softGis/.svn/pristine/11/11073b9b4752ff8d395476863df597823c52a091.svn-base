<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:dashboard>
 <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 my-3 fixed-start" id="sidenav-main">
<!--  	<div class="sidenav-header"> -->
<!--  		<i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i> -->
<!-- 		<a class="navbar-brand m-0" href="../main.do"> -->
<!-- 			<img src="/assets/images/common/logo.png" class="navbar-brand-img h-100" alt="main_logo"> -->
<!-- 		</a> -->
<!-- 	</div> -->
	<div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link" href="cmmnty-dashboard.do">
					<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
					    <path d="M21 18.375h1.75v4.375H21v-4.375zM17.5 14h1.75v8.75H17.5V14zm-7.875 8.75a4.38 4.38 0 0 1-4.375-4.375H7a2.625 2.625 0 1 0 2.625-2.625V14a4.375 4.375 0 1 1 0 8.75zm14.875-21h-21A1.752 1.752 0 0 0 1.75 3.5v21a1.752 1.752 0 0 0 1.75 1.75h21a1.752 1.752 0 0 0 1.75-1.75v-21a1.752 1.752 0 0 0-1.75-1.75zm0 7.875H12.25V3.5H24.5v6.125zM10.5 3.5v6.125h-7V3.5h7zm-7 21V11.375h21l.002 13.125H3.5z" fill="#CFD4DD" fill-rule="evenodd"/>
					</svg>
					<span class="nav-link-text ms-1">대시보드</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link  " href="cmmnty-statistics.do">
					<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
					    <path d="M10.763 3.952a1.05 1.05 0 0 1-.542 1.382 9.453 9.453 0 0 0 2.558 18.036 9.45 9.45 0 0 0 9.924-5.691 1.05 1.05 0 1 1 1.935.817A11.55 11.55 0 0 1 2.565 15.62 11.553 11.553 0 0 1 9.381 3.41a1.05 1.05 0 0 1 1.382.542zM14 2.45a11.548 11.548 0 0 1 11.55 11.552c0 .58-.47 1.05-1.05 1.05H14c-.58 0-1.05-.47-1.05-1.05V3.5c0-.58.47-1.05 1.05-1.05zm1.05 2.158v8.343h8.34l-.05-.388a9.454 9.454 0 0 0-2.41-4.987l-.248-.258a9.449 9.449 0 0 0-5.615-2.708l-.017-.002z" fill="#CFD4DD" fill-rule="evenodd"/>
					</svg>
					<span class="nav-link-text ms-1">이용현황</span>
				</a>
			</li>
			<li class="nav-item" style="display: none;">
				<a class="nav-link active" href="cmmnty-statistics-each.do">
					<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
					    <path d="M10.763 3.952a1.05 1.05 0 0 1-.542 1.382 9.453 9.453 0 0 0 2.558 18.036 9.45 9.45 0 0 0 9.924-5.691 1.05 1.05 0 1 1 1.935.817A11.55 11.55 0 0 1 2.565 15.62 11.553 11.553 0 0 1 9.381 3.41a1.05 1.05 0 0 1 1.382.542zM14 2.45a11.548 11.548 0 0 1 11.55 11.552c0 .58-.47 1.05-1.05 1.05H14c-.58 0-1.05-.47-1.05-1.05V3.5c0-.58.47-1.05 1.05-1.05zm1.05 2.158v8.343h8.34l-.05-.388a9.454 9.454 0 0 0-2.41-4.987l-.248-.258a9.449 9.449 0 0 0-5.615-2.708l-.017-.002z" fill="#CFD4DD" fill-rule="evenodd"/>
					</svg>
					<span class="nav-link-text ms-1">개별통계</span>
				</a>
			</li>
		</ul>
	</div>
</aside> 
  
<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
	<!-- Navbar -->
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
    	<div class="container-fluid py-1 px-3">
    		<nav aria-label="breadcrumb"></nav>
    		<ul class="navbar-nav  justify-content-end">
    			<li class="nav-item d-xl-none ps-3 d-flex align-items-center">
    				<a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
    					<div class="sidenav-toggler-inner">
							<i class="sidenav-toggler-line"></i>
							<i class="sidenav-toggler-line"></i>
							<i class="sidenav-toggler-line"></i>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</nav>
    <!-- End Navbar -->
    <div class="container-fluid py-4" style="padding-left: 0;">
		<!-- <h3>대시보드명</h3> -->
		<div id="container"></div>
		<div class="dashboard-header">
			<div class="dashboard-title">
				<i class='bx bxs-no-entry'></i>
				<h2>함께할지도 개별통계</h2>
				<span>홈  /  함께할지도  /  함께할지도 개별통계</span>
			</div>
			<div class="dashboard-opt">
				<input type="hidden" name="nmSgg" id="nmSgg" />
				<div class="adm-cd">
					<select name="yyyy" id="yyyy">
						<option value="">년도별 검색</option>
					<c:forEach var="i" begin="2015" end="${year }" step="1">
						<option value="${i }" <c:if test="${i eq year }">selected</c:if>>${i }년</option>
					</c:forEach>
					</select>
				</div>
<!-- 				<div class="adm-cd"> -->
<!-- 					<select name="catSelect" id="catSelect"> -->
<!-- 						<option value="">카테고리별 검색</option> -->
<%-- 						<t:code-as-option group="DATA_CATE" /> --%>
<!-- 					</select> -->
<!-- 				</div> -->
			</div>
		</div>
		<!-- 드롭박스 끝 -->
		<div class="mt-4 p-3 card stats-list" style="width:300px;">
			<div>
				<span>목록</span>
			</div>
			<div class="row col-lg-8 cmmnty-dashboard-wrap mt-4">
				<div class="tableWrap stats1">
					<div class="data-wrap">
						<c:forEach items="${list }" var="item">							
							<div data-id="${item.mapng_id }">${item.mapng_title }</div>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-4 p-3 card">
			<ul class="navbar-nav">
				<li class="markerGraph">
					<h2>마커별 통계</h2>
					<div class="card-content">
						<div id="pointStats" style="height:100%;"></div>
					</div>
				</li>
				<li class="locationGraph">
					<h2>지역별 통계</h2>
					<div class="card-content">
						<div id="geomStats" style="height:100%;"></div>
					</div>
				</li>
				<li class="answerGraph">
					<h2>Hot 키워드</h2>
					<div class="card-content">
						<div id="cmmntyAnswerWordCloud" style="height:100%;"></div>
					</div>
				</li> 
			</ul>
		</div>
	</div>
</main>
  
</t:dashboard>