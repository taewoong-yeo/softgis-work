<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/nucleo-icons.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/nucleo-svg.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dashboard/soft-ui-dashboard.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/jquery-ui.min.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/bootstrap.min.css' />">

<t:app>
 <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 my-3 fixed-start" id="sidenav-main">
	<div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
		<ul class="navbar-nav">
			<li class="nav-item">
				<a class="nav-link  active" href="cmmnty-dashboard.do">
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
				<a class="nav-link" href="cmmnty-statistics-each.do">
					<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
					    <path d="M10.763 3.952a1.05 1.05 0 0 1-.542 1.382 9.453 9.453 0 0 0 2.558 18.036 9.45 9.45 0 0 0 9.924-5.691 1.05 1.05 0 1 1 1.935.817A11.55 11.55 0 0 1 2.565 15.62 11.553 11.553 0 0 1 9.381 3.41a1.05 1.05 0 0 1 1.382.542zM14 2.45a11.548 11.548 0 0 1 11.55 11.552c0 .58-.47 1.05-1.05 1.05H14c-.58 0-1.05-.47-1.05-1.05V3.5c0-.58.47-1.05 1.05-1.05zm1.05 2.158v8.343h8.34l-.05-.388a9.454 9.454 0 0 0-2.41-4.987l-.248-.258a9.449 9.449 0 0 0-5.615-2.708l-.017-.002z" fill="#CFD4DD" fill-rule="evenodd"/>
					</svg>
					<span class="nav-link-text ms-1">개별통계</span>
				</a>
			</li>
		</ul>
	</div>
</aside> 
  
<main class="main-content position-relative max-height-vh-100 h-100 ">
	<!-- 반응형 nav -->
	<div class="mob-dashboard-nav">
		<ul>
			<li>
				<a class="active" href="cmmnty-dashboard.do">
					<svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <defs>
					        <rect id="284a2wb1za" x="0" y="0" width="46" height="46" rx="23"/>
					    </defs>
					    <g fill="none" fill-rule="evenodd">
					        <g>
					            <use fill="#5B5AB6" xlink:href="#284a2wb1za"/>
					            <use fill="#166F88" xlink:href="#284a2wb1za"/>
					        </g>
					        <path d="M29 26.75h1.5v3.75H29v-3.75zM26 23h1.5v7.5H26V23zm-6.75 7.5a3.754 3.754 0 0 1-3.75-3.75H17a2.25 2.25 0 1 0 2.25-2.25V23a3.75 3.75 0 0 1 0 7.5zM32 12.5H14c-.828 0-1.5.672-1.5 1.5v18a1.502 1.502 0 0 0 1.5 1.5h18a1.502 1.502 0 0 0 1.5-1.5V14a1.502 1.502 0 0 0-1.5-1.5zm0 6.75H21.5V14H32v5.25zM20 14v5.25h-6V14h6zm-6 18V20.75h18L32.003 32H14z" fill="#FFF"/>
					    </g>
					</svg>
					<span class="nav-link-text ms-1">대시보드</span>
				</a>
			</li>
			<li>
				<a class="" href="cmmnty-statistics.do">
					<svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <defs>
					        <rect id="q8790e6sqa" x="0" y="0" width="46" height="46" rx="23"/>
					    </defs>
					    <g fill="none" fill-rule="evenodd">
					        <g>
					            <use fill="#5B5AB6" xlink:href="#q8790e6sqa"/>
					            <use fill="#166F88" xlink:href="#q8790e6sqa"/>
					        </g>
					        <path d="M20.225 14.387a.9.9 0 0 1-.464 1.185 8.102 8.102 0 0 0 2.193 15.46 8.1 8.1 0 0 0 8.506-4.879.9.9 0 0 1 1.658.701 9.9 9.9 0 0 1-18.92-2.465 9.902 9.902 0 0 1 5.843-10.467.9.9 0 0 1 1.184.465zM23 13.1a9.898 9.898 0 0 1 9.9 9.902.9.9 0 0 1-.9.9h-9a.9.9 0 0 1-.9-.9V14a.9.9 0 0 1 .9-.9zm.9 1.85v7.151h7.149l-.043-.333a8.103 8.103 0 0 0-2.066-4.274l-.212-.221a8.099 8.099 0 0 0-4.814-2.321l-.014-.002z" fill="#FFF"/>
					    </g>
					</svg>
					<span class="nav-link-text ms-1">이용현황</span>
				</a>
			</li>
		</ul>
	</div>
	<!-- 반응형 nav 끝 -->
    <div class="container-fluid py-4" style="padding-left: 0;">
    	<input type="hidden" id="sd_cd" name="sd_cd"/>
		<!-- <h3>대시보드명</h3> -->
		<div id="container"></div>
		<div class="dashboard-header">
			<div class="dashboard-title">
				<h2>함께할지도 대시보드</h2>
				<span>홈  /  함께할지도  /  함께할지도 대시보드</span>
			</div>
			<div class="dashboard-opt">
				<div class="datepicker-box">
					<p>조회일</p>
					<div class="calendar-box">
						<span>
							<input type="text" class="datepicker-input" id="eDate" placeholder="조회일" readonly />
							<label for="eDate"><i class='bx bx-calendar'></i></label>
						</span>
					</div>
				</div>
				<div class="adm-cd">
					<select name="cat_cd" id="cat_cd">
						<option value="">카테고리별 검색</option>
						<t:code-as-option group="DATA_CATE" />
					</select>
				</div>
			</div>
		</div>
		<!-- 드롭박스 끝 -->
		<div class="row">
			<div class="row col-lg-8 cmmnty-dashboard-wrap">
				<div class="group-title">전체 통계</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
									<div class="card-box" data-div-name="cmmntyGeomTotAnswerCount" data-chart="cmmntyGeomTotAnswerCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyGeomTotAnswerCount" style="height:210px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
									<div class="card-box" data-div-name="cmmntyGeomSggAnswerCount" data-chart="cmmntyGeomSggAnswerCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyGeomSggAnswerCount" style="height:210px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" >
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
									<div class="card-box" data-div-name="cmmntyCatCount" data-chart="cmmntyCatCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyCatCount" style="height:150px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
									<div class="card-box" data-div-name="cmmntyMonthCount" data-chart="cmmntyMonthCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyMonthCount" style="height:150px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" >
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
									<div class="card-box" data-div-name="cmmntyAnswerCatCount" data-chart="cmmntyAnswerCatCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyAnswerCatCount" style="height:150px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mt-4">
					<div class="card p-2">
						<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
							<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
								<div class="items" data-sort="4">
					                <div class="card-box" data-div-name="cmmntyAnswerMonthCount" data-chart="cmmntyAnswerMonthCount" >
										<div class="card-title">
											<h3><span class="cht-title"></span> </h3>
										</div>
										<div class="card-content">
											<div id="cmmntyAnswerMonthCount" style="height:150px"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		        <div class="col-lg-12 mt-4" style="display: none;">
		        	<div class="mb-4">
		        		<div class="card p-2">
		        			<div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
		        				<div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-2">
									<div class="items" data-sort="4">
						                <div class="card-box" data-div-name="cmmntyAnswerWordCloud" data-chart="cmmntyAnswerWordCloud" >
											<div class="card-title">
												<h3><span class="cht-title"></span> </h3>
											</div>
											<div class="card-content">
												<div id="cmmntyAnswerWordCloud" style="height:210px"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	        	<div class="col-lg-12">
					<div class="answer-stats mt-4 p-2 card active">
						<span class="rank-title">응답자수 상위 매핑 15건</span>
						<div class="tableWrap stats2">
							<div class="title-wrap">
								<div>순번</div>
								<div>카테고리</div>
								<div style="width: 250px;max-width: 250px;">매핑제목</div>
								<div>응답자수</div>
							</div>
							<div class="data-wrap"></div>
						</div>
					</div>
				</div>
				<div class="col-lg-12">
					<div class="answer-stats mt-4 p-2 card active">
						<span class="rank-title">조회수 상위 매핑 15건</span>
						<div class="tableWrap stats3">
							<div class="title-wrap">
								<div>순번</div>
								<div>카테고리</div>
								<div style="width: 250px;max-width: 250px;">매핑제목</div>
								<div>조회수</div>
							</div>
							<div class="data-wrap"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="row col-lg-8 cmmnty-dashboard-wrap">
				<div class="group-title-odd">개별 통계</div>
				<div class="mt-4 p-3 card stats-list">
					<div class="answer-stats row col-lg-8 cmmnty-dashboard-wrap active" style="width: 100%">
						<div class="tableWrap stats1">
							<div class="title-wrap">
								<div>카테고리</div>
								<div style="width:700px">제목</div>
							</div>
							<div class="data-wrap">
								<c:forEach items="${list }" var="item">			
									<div>		
										<div>${item.cat_nm }</div>		
										<div style="width:700px" data-id="${item.mapng_id}">${item.mapng_title }</div>
									</div>
								</c:forEach>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-4 p-3 card">
					<ul class="navbar-nav">
						<li class="markerGraph">
							<h2>유형별 통계</h2>
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
					</ul>
				</div>
		</div>
</main>
  
</t:app>