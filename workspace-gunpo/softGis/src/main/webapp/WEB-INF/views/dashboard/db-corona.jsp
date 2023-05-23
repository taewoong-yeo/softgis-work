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
<!--     <div class="sidenav-header"> -->
<!--       <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i> -->
<!--       <a class="navbar-brand m-0" href="../main.do " > -->
<!--         <img src="/assets/images/common/logo.png" class="navbar-brand-img h-100" alt="main_logo"> -->
<!--       </a> -->
<!--     </div> -->
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="db-ur.do">
						<svg width="28" height="29" viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg">
						    <path d="M25.083 2.388h-10.5a1.753 1.753 0 0 0-1.75 1.753v8.763h-8.75a1.753 1.753 0 0 0-1.75 1.753v12.268h24.5V4.141a1.753 1.753 0 0 0-1.75-1.753zM8.458 25.172v-6.134h3.5v6.134h-3.5zm16.625 0H13.708v-7.01a.876.876 0 0 0-.875-.876h-5.25a.876.876 0 0 0-.875.876v7.01H4.083V14.657h10.5V4.14h10.5v21.031zm-8.75-17.526h1.75V9.4h-1.75V7.646zm5.25 0h1.75V9.4h-1.75V7.646zm-5.25 5.258h1.75v1.753h-1.75v-1.753zm5.25 0h1.75v1.753h-1.75v-1.753zm-5.25 5.258h1.75v1.752h-1.75v-1.752zm5.25 0h1.75v1.752h-1.75v-1.752zM2.333 9.399h4.375v1.752H2.333V9.4zm7-7.01h1.75v4.38h-1.75V2.39zM4.083 5.38l1.238-1.24 3.137 3.143-1.237 1.24L4.083 5.38z" fill="#CFD4DD" fill-rule="evenodd"/>
						</svg>
						<span class="nav-link-text ms-1">도시재생</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="db-waste.do">
						<svg width="28" height="29" viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg">
						    <path d="M22.75 16.415c0 4.895-3.918 8.864-8.75 8.864s-8.75-3.969-8.75-8.864c0-4.895 3.918-8.864 8.75-8.864h3.5v4.432l5.25-5.318-5.25-5.319v4.432H14c-5.799 0-10.5 4.763-10.5 10.637 0 5.875 4.701 10.637 10.5 10.637s10.5-4.762 10.5-10.637h-1.75zM12.687 22.62c.725 0 1.313-.595 1.313-1.33 0-.734-.588-1.33-1.313-1.33-.724 0-1.312.596-1.312 1.33 0 .735.588 1.33 1.313 1.33zm-2.624-3.546c.724 0 1.312-.595 1.312-1.33 0-.734-.588-1.329-1.313-1.329-.724 0-1.312.595-1.312 1.33 0 .734.588 1.33 1.313 1.33zm5.25 0c.724 0 1.312-.595 1.312-1.33 0-.734-.588-1.329-1.313-1.329-.724 0-1.312.595-1.312 1.33 0 .734.588 1.33 1.313 1.33zm-3.938-3.912 3.138-3.179 1.237 1.253-3.138 3.179-1.237-1.253zm5.25 0 3.138-3.18L21 13.237l-3.138 3.179-1.237-1.253z" fill="#CFD4DD" fill-rule="evenodd"/>
						</svg>
						<span class="nav-link-text ms-1">자원순환</span>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link active"  href="db-corona.do">
						<svg width="28" height="29" viewBox="0 0 28 29" xmlns="http://www.w3.org/2000/svg">
						    <path d="M25.948 24.257c-.302 0-.602-.054-.885-.159v-.005a3.315 3.315 0 0 1-1.817-1.87.859.859 0 0 0-.838-.595.89.89 0 0 0-.84.6 3.038 3.038 0 0 1-2.7 2.03 3.04 3.04 0 0 1-2.702-2.035.875.875 0 0 0-.838-.595.89.89 0 0 0-.84.6 3.038 3.038 0 0 1-2.7 2.03 3.04 3.04 0 0 1-2.703-2.035.884.884 0 0 0-.84-.595.884.884 0 0 0-.838.6 3.038 3.038 0 0 1-2.7 2.03H2.052v1.752h2.655a4.38 4.38 0 0 0 3.54-1.742 4.458 4.458 0 0 0 3.54 1.742c1.39 0 2.7-.645 3.54-1.742a4.458 4.458 0 0 0 3.54 1.742c1.391 0 2.701-.645 3.541-1.742a4.548 4.548 0 0 0 1.892 1.42 4.319 4.319 0 0 0 1.648.322h.885v-1.753h-.885zm.807-11.448-5.56-10.135a.637.637 0 0 0-1.113 0L14.52 12.81a.626.626 0 0 0 .011.623.639.639 0 0 0 .548.31h11.116a.639.639 0 0 0 .548-.31.626.626 0 0 0 .011-.623zm-6.78-6.954h1.327V9.36h-1.328V5.855zm.663 6.134a.88.88 0 0 1-.885-.876.88.88 0 0 1 .885-.877.88.88 0 0 1 .885.877.88.88 0 0 1-.885.876zm4.425 6.134v-2.629h-1.77v2.63h-.885a3.038 3.038 0 0 1-2.7-2.03.884.884 0 0 0-.838-.6.884.884 0 0 0-.84.595 3.04 3.04 0 0 1-2.702 2.034 3.038 3.038 0 0 1-2.701-2.03.89.89 0 0 0-.84-.599.875.875 0 0 0-.838.595 3.04 3.04 0 0 1-2.702 2.034 2.977 2.977 0 0 1-2.655-1.915V10.29l8.85-6.826 2.242 1.73.857-1.56-2.557-1.973a.9.9 0 0 0-1.1 0L1.168 11.48l1.1 1.376 1.555-1.2v4.546a3.25 3.25 0 0 1-1.77 1.756v1.826a4.427 4.427 0 0 0 2.655-1.65 4.458 4.458 0 0 0 3.54 1.74c1.39 0 2.7-.644 3.54-1.74a4.458 4.458 0 0 0 3.54 1.74c1.39 0 2.701-.644 3.54-1.74a4.38 4.38 0 0 0 3.541 1.74h4.425v-1.752h-1.77z" fill="#CFD4DD" fill-rule="evenodd"/>
						</svg>
						<span class="nav-link-text ms-1">재난안전</span>
					</a>
				</li>
      </ul>
    </div>
   
  </aside> 
  
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
	<!-- 반응형 nav -->
	<div class="mob-dashboard-nav">
		<ul>
			<li>
				<a class="" href="db-ur.do">
					<svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <defs>
					        <rect id="9ne7bq69ba" x="0" y="0" width="46" height="46" rx="23"/>
					    </defs>
					    <g fill="none" fill-rule="evenodd">
					        <g>
					            <use fill="#5B5AB6" xlink:href="#9ne7bq69ba"/>
					            <use fill="#166F88" xlink:href="#9ne7bq69ba"/>
					        </g>
					        <path d="M32.5 13h-9c-.828 0-1.5.672-1.5 1.5V22h-7.5c-.828 0-1.5.672-1.5 1.5V34h21V14.5a1.502 1.502 0 0 0-1.5-1.5zM18.25 32.5v-5.25h3v5.25h-3zm14.25 0h-9.75v-6a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75v6H14.5v-9h9v-9h9v18zm-7.5-15h1.5V19H25v-1.5zm4.5 0H31V19h-1.5v-1.5zM25 22h1.5v1.5H25V22zm4.5 0H31v1.5h-1.5V22zM25 26.5h1.5V28H25v-1.5zm4.5 0H31V28h-1.5v-1.5zM13 19h3.75v1.5H13V19zm6-6h1.5v3.75H19V13zm-4.5 2.56 1.06-1.06 2.69 2.69-1.06 1.06-2.69-2.69z" fill="#FFF"/>
					    </g>
					</svg>
					<span class="nav-link-text ms-1">도시재생</span>
				</a>
			</li>
			<li>
				<a class="" href="db-waste.do">
					<svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <defs>
					        <rect id="vtcclclw2a" x="0" y="0" width="46" height="46" rx="23"/>
					    </defs>
					    <g fill="none" fill-rule="evenodd">
					        <g>
					            <use fill="#5B5AB6" xlink:href="#vtcclclw2a"/>
					            <use fill="#166F88" xlink:href="#vtcclclw2a"/>
					        </g>
					        <path d="M30.5 24.897c0 4.19-3.358 7.586-7.5 7.586-4.142 0-7.5-3.397-7.5-7.586 0-4.19 3.358-7.587 7.5-7.587h3v3.793l4.5-4.551L26 12v3.793h-3c-4.97 0-9 4.076-9 9.104C14 29.924 18.03 34 23 34s9-4.076 9-9.103h-1.5zm-8.625 5.31c.621 0 1.125-.51 1.125-1.138 0-.628-.504-1.138-1.125-1.138s-1.125.51-1.125 1.138c0 .628.504 1.138 1.125 1.138zm-2.25-3.035c.621 0 1.125-.51 1.125-1.138 0-.628-.504-1.137-1.125-1.137s-1.125.509-1.125 1.137c0 .629.504 1.138 1.125 1.138zm4.5 0c.621 0 1.125-.51 1.125-1.138 0-.628-.504-1.137-1.125-1.137S23 25.406 23 26.034c0 .629.504 1.138 1.125 1.138zm-3.375-3.348 2.69-2.72 1.06 1.072-2.69 2.72-1.06-1.072zm4.5 0 2.69-2.72L29 22.175l-2.69 2.72-1.06-1.072z" fill="#FFF"/>
					    </g>
					</svg>
					<span class="nav-link-text ms-1">자원순환</span>
				</a>
			</li>
			<li>
				<a class="active" href="db-corona.do">
					<svg width="46" height="46" viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <defs>
					        <rect id="kc581p01xa" x="0" y="0" width="46" height="46" rx="23"/>
					    </defs>
					    <g fill="none" fill-rule="evenodd">
					        <g>
					            <use fill="#5B5AB6" xlink:href="#kc581p01xa"/>
					            <use fill="#166F88" xlink:href="#kc581p01xa"/>
					        </g>
					        <path d="M33.241 31.5a2.21 2.21 0 0 1-.758-.136v-.005a2.84 2.84 0 0 1-1.558-1.6.736.736 0 0 0-.718-.51.763.763 0 0 0-.72.514 2.604 2.604 0 0 1-2.315 1.737 2.606 2.606 0 0 1-2.316-1.741.75.75 0 0 0-.718-.51.763.763 0 0 0-.72.514 2.604 2.604 0 0 1-2.315 1.737 2.606 2.606 0 0 1-2.316-1.741.758.758 0 0 0-.72-.509.758.758 0 0 0-.718.513 2.604 2.604 0 0 1-2.315 1.737H12.76V33h2.275a3.756 3.756 0 0 0 3.035-1.49A3.823 3.823 0 0 0 21.103 33a3.823 3.823 0 0 0 3.035-1.49A3.823 3.823 0 0 0 27.172 33a3.823 3.823 0 0 0 3.035-1.49A3.898 3.898 0 0 0 33.24 33H34v-1.5h-.759zm.692-9.798-4.767-8.674a.546.546 0 0 0-.953 0l-4.767 8.674a.535.535 0 0 0 .01.533.547.547 0 0 0 .47.265h9.528c.192 0 .37-.1.469-.265a.535.535 0 0 0 .01-.533zM28.12 15.75h1.138v3H28.12v-3zM28.69 21a.754.754 0 0 1-.759-.75c0-.414.34-.75.759-.75s.758.336.758.75-.34.75-.758.75zm3.793 5.25V24h-1.517v2.25h-.76a2.604 2.604 0 0 1-2.314-1.737.758.758 0 0 0-.718-.513.758.758 0 0 0-.72.509 2.606 2.606 0 0 1-2.316 1.74 2.604 2.604 0 0 1-2.315-1.736.763.763 0 0 0-.72-.513.75.75 0 0 0-.718.509 2.606 2.606 0 0 1-2.316 1.74 2.551 2.551 0 0 1-2.276-1.638v-5.065l7.586-5.842 1.922 1.481.734-1.336-2.191-1.689a.773.773 0 0 0-.943 0L12 20.564l.943 1.18 1.333-1.028v3.89a2.783 2.783 0 0 1-1.517 1.503v1.563a3.796 3.796 0 0 0 2.275-1.413 3.823 3.823 0 0 0 3.035 1.491 3.823 3.823 0 0 0 3.034-1.49 3.823 3.823 0 0 0 3.035 1.49 3.823 3.823 0 0 0 3.034-1.49c.713.947 1.84 1.5 3.035 1.49H34v-1.5h-1.517z" fill="#FFF"/>
					    </g>
					</svg>
					<span class="nav-link-text ms-1">재난안전</span>
				</a>
			</li>
		</ul>
	</div>
	<!-- 반응형 nav 끝 -->
    
    <div class="container-fluid py-4" style="padding-left: 0;">
      <!-- <h3>대시보드명</h3> -->
      <div class="dashboard-header">
		<div class="dashboard-title">
			<h2>재난안전 대시보드</h2>
			<span>홈  /  빅데이터 분석  /  재난안전 대시보드</span>
		</div>
		<div class="dashboard-opt">
			<input type="hidden" name="nmAdm" id="nmAdm" />
			<div class="datepicker-box">
				<span>
					<input type="date" class="datepicker-input" id="base_date" placeholder="조회일" value="2022-08-17"/>
				</span>
			</div>
			<div class="adm-cd">
				<select name="sggSelect" id="sggSelect">
					<option value="">행정동별 검색</option>
					<t:code-as-option group="SEOUL_ATDRC" />
				</select>
			</div>
		</div>
	</div>
      <!-- 드롭박스 끝 -->
       <div class="row">
        <div class="row col-lg-8">
       
        <div class="col-lg-12">
          <div class="card p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" >
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
				<div class="items" data-sort="4">
	                <div class="card-box" data-div-name="dayCoronaCount" data-chart="dayCoronaCount" >
						<div class="card-title">
							<h3><span class="cht-title"></span> </h3>
						</div>
						<div class="card-content">
							<div id="dayCoronaCount" style="height:150px"></div>
						</div>
					</div>
				</div>
              </div>
            </div>
          </div>
        </div>
        
         <div class="col-lg-12 mt-4 p-4" style="padding-right: 0;">
          <div class="card p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <div class="items" data-sort="4">
	                <div class="card-box" data-div-name="areaCoronaCount" data-chart="areaCoronaCount" >
						<div class="card-title">
							<h3><span class="cht-title"></span> </h3>
						</div>
						<div class="card-content">
							<div id="areaCoronaCount" style="height:150px"></div>
						</div>
					</div>
				</div>
              </div>
            </div>
          </div>
        </div>
        
         <div class="row mt-4">
          <div class="card p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" >
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
				<div class="items" data-sort="4">
	                <div class="card-box" data-div-name="resultData" data-chart="resultData" >
						<div class="card-title">
							<h3><span class="cht-title"></span> </h3>
						</div>
						<div class="card-content">
							<div id="resultData" style="height:300px"></div>
						</div>
					</div>
				</div>
              </div>
            </div>
          </div>
        </div>
              
       
       </div>
        
        <div class="row col-lg-4">
        
          <div class="card p-3">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100">
              <div class="card-body position-relative z-index-1 d-flex flex-column h-100 p-3">
                <div class="card-content" style="height:600px;">
					<div id="MAP" class="map" style="height: 100%; background: #e9ecef;">
						<div class="map-ui map-ui-lt">
							<button data-map-action="home"><i class="fas fa-home"></i></button>
						</div>
						<div class="map-ui map-ui-rt">
							<div class="map-ui-group">
								<button data-map-action=":full-screen"><i class="fas fa-expand"></i></button>
							</div>
							<div class="map-ui-group">
								<button data-map-action=":zoom-in"><i class="fas fa-plus"></i></button>
								<button data-map-action=":zoom-out"><i class="fas fa-minus"></i></button>
							</div>
						</div>
						<div class="map-legend map-legend-rb"></div>
						<div class="map-grid map-grid-lb"></div>
					</div>
				</div>
              </div>
            </div>
          </div>
        </div>
       </div>
      

    </div>
  </main>
  
</t:app>