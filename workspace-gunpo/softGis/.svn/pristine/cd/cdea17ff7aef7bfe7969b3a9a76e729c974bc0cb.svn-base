<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ attribute name="extra_head" fragment="true" required="false" %>
<%@ attribute name="extra_body" fragment="true" required="false" %>
<%@ attribute name="extra_foot" fragment="true" required="false" %>
<%@ attribute name="navigation" fragment="true" required="false" %>
<t:base extra_head="${extra_head}" extra_body="${extra_body}">
	<div id="wrap">
		<c:if test="${__ISWEB__ }">
			<div class="topmenu">
				<div class="topmenu-logo">
					<a class="main-logo" href="<c:url value='/main.do'/>">
						
						<svg width="210" height="60" viewBox="0 0 210 60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="webLogo">
							<defs>
								<linearGradient x1="26.27%" y1="16.011%" x2="71.168%" y2="73.608%" id="7bvrg50phb">
									<stop stop-color="#36F0F5" offset="0%"/>
									<stop stop-color="#11C3C8" offset="16.585%"/>
									<stop stop-color="#0A85D0" offset="64.511%"/>
									<stop stop-color="#8E7EFB" offset="100%"/>
								</linearGradient>
								<path d="M23.5 0C10.528.016.016 10.56 0 23.571a23.38 23.38 0 0 0 4.735 14.143s.64.846.744.968L23.5 60l18.029-21.327c.095-.114.736-.96.736-.96l.003-.005A23.37 23.37 0 0 0 47 23.571C46.984 10.56 36.472.016 23.5 0z" id="mwhgf8fo2a"/>
							</defs>
							<g fill="none" fill-rule="evenodd">
								<g>
									<use fill="#369D85" xlink:href="#mwhgf8fo2a"/>
									<use fill-opacity=".5" fill="url(#7bvrg50phb)" xlink:href="#mwhgf8fo2a"/>
								</g>
								<path d="M33.114 37.5h-3.605v-3.494a2.35 2.35 0 0 0-2.35-2.35H19.84a2.35 2.35 0 0 0-2.35 2.35V37.5h-3.605v-4.675c.003-2.581 2.154-4.673 4.807-4.676h9.614c2.653.003 4.804 2.095 4.807 4.676V37.5zM30.71 18.799c0-3.873-3.228-7.013-7.21-7.013-3.982 0-7.21 3.14-7.21 7.013 0 3.873 3.228 7.013 7.21 7.013 3.98-.005 7.206-3.142 7.21-7.013zm-3.605 0c0 1.936-1.614 3.506-3.605 3.506-1.991 0-3.605-1.57-3.605-3.506 0-1.937 1.614-3.507 3.605-3.507 1.99.002 3.603 1.571 3.605 3.507z" fill="#FFF"/>
								<text font-family="SeoulNamsanEB, SeoulNamsan" font-size="26" font-weight="700" fill="#369D85">
											<tspan x="56" y="40">함께할지도</tspan>
										</text>
							</g>
						</svg>

						
						<svg width="30" height="52" viewBox="0 0 30 52" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="mobLogo">
							<defs>
								<linearGradient x1="25.25%" y1="16.011%" x2="72.078%" y2="73.608%" id="hm975hofib">
									<stop stop-color="#36F0F5" offset="0%"/>
									<stop stop-color="#11C3C8" offset="16.585%"/>
									<stop stop-color="#0A85D0" offset="64.511%"/>
									<stop stop-color="#8E7EFB" offset="100%"/>
								</linearGradient>
								<path d="M12 0C5.376.008.008 5.28 0 11.786a11.53 11.53 0 0 0 2.418 7.071s.327.423.38.484L12 30l9.206-10.663c.049-.058.376-.48.376-.48l.002-.003A11.527 11.527 0 0 0 24 11.786C23.992 5.28 18.624.008 12 0z" id="gqyurzrl5a"/>
							</defs>
							<g fill="none" fill-rule="evenodd">
								<g transform="translate(0 11)">
									<use fill="#369D85" xlink:href="#gqyurzrl5a"/>
									<use fill-opacity=".5" fill="url(#hm975hofib)" xlink:href="#gqyurzrl5a"/>
								</g>
								<path d="M16.91 29.75h-1.842v-1.747c0-.649-.526-1.175-1.175-1.175h-3.786c-.65 0-1.175.526-1.175 1.175v1.747H7.09v-2.338c.001-1.29 1.1-2.336 2.454-2.337h4.91c1.355.001 2.453 1.047 2.454 2.337v2.338zm-1.228-9.35c0-1.937-1.649-3.507-3.682-3.507s-3.682 1.57-3.682 3.506c0 1.937 1.649 3.507 3.682 3.507 2.032-.002 3.68-1.57 3.682-3.507zm-1.841 0c0 .968-.824 1.753-1.841 1.753s-1.84-.785-1.84-1.754c0-.968.823-1.753 1.84-1.753 1.016.001 1.84.785 1.84 1.753z" fill="#FFF"/>
							</g>
						</svg>
					</a>
					<span class="mobTitle"></span>
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
									<li><a href="<c:url value='/admin/admin-anal-mngr.do' />"><span>빅데이터분석 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-meta-mngr.do' />"><span>데이터 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-notice.do'/>"><span>알림마당 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-usr.do' />"><span>사용자 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-code.do' />"><span>코드 관리</span></a></li>
									<li><a href="<c:url value='/admin/admin-stopwords.do' />"><span>불용어 관리</span></a></li>
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
				<div class="topmenu-mobile">
				<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 22h21v-2H5v2zM5 8v2h21V8H5zm0 8h21v-2H5v2z" fill="#166F88" fill-rule="nonzero"/>
				</svg> 
				</div>
			
			</div>

				<div class="mobMenu">

					<div class="topMobMenu">					
						<svg width="60" height="75" viewBox="0 0 60 75" xmlns="http://www.w3.org/2000/svg">
							<path d="M40.91 45.536h-5.455v-5.357h-10.91v5.357h-5.454v-5.357c.003-2.958 2.443-5.354 5.454-5.358h10.91c3.01.004 5.45 2.4 5.454 5.358v5.357zM30 32.143c-4.519 0-8.182-3.598-8.182-8.036s3.663-8.036 8.182-8.036 8.182 3.598 8.182 8.036c-.005 4.436-3.665 8.031-8.182 8.036zm0-10.714c-1.506 0-2.727 1.199-2.727 2.678 0 1.48 1.22 2.679 2.727 2.679 1.506 0 2.727-1.2 2.727-2.679-.001-1.479-1.221-2.677-2.727-2.678zM30 75 6.994 48.352c-.13-.153-.95-1.21-.95-1.21A28.828 28.828 0 0 1 0 29.464C0 13.192 13.431 0 30 0c16.569 0 30 13.192 30 29.464a28.816 28.816 0 0 1-6.04 17.672l-.005.006s-.818 1.057-.94 1.199L30 75zM10.398 43.915c.002.002.636.826.781 1.003L30 66.718l18.845-21.83c.12-.149.76-.978.76-.98a23.565 23.565 0 0 0 4.94-14.444C54.545 16.15 43.556 5.357 30 5.357c-13.556 0-24.545 10.793-24.545 24.107a23.577 23.577 0 0 0 4.943 14.451z" fill="#FF9D42" fill-rule="evenodd"/>
						</svg>

						<div class="text-MobMenu">
							<p>함께할지도</p>
							<p>메인메뉴</p>
						</div>
					</div>

					<nav class="topmenu-nav">
					<ul>
						<li>
							<a class="topmenu-nav-menu" href="<c:url value='/main.do' />">
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.71 3.16a.757.757 0 0 0-.933 0L1 11.565l.932 1.178 1.318-1.027V21a1.503 1.503 0 0 0 1.5 1.5h15a1.503 1.503 0 0 0 1.5-1.5v-9.278l1.318 1.028.932-1.179-10.79-8.41zM13.75 21h-3v-6h3v6zm1.5 0v-6a1.502 1.502 0 0 0-1.5-1.5h-3c-.828 0-1.5.672-1.5 1.5v6h-4.5V10.546l7.5-5.842 7.5 5.85V21h-4.5z" fill="#727B90" fill-rule="nonzero"/>
							</svg>
							HOME</a>
						</li>
						<li>
							<a class="topmenu-nav-menu" href="<c:url value='/service.do' />">
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.278 2.553a10 10 0 0 1 6.718 9.148l.004.29v.715H9.15c.04 2.795.887 5.519 2.438 7.844.135.006.267.02.403.02a8.61 8.61 0 0 0 1.589-.147l.391-.083.33 1.391a10 10 0 1 1 .977-19.178zm-7.56 10.153H3.442a8.595 8.595 0 0 0 6.261 7.548 17.36 17.36 0 0 1-1.983-7.548zM19.14 17.71v1.43h-4.29v-1.43h4.29zM22 14.85v1.43h-7.15v-1.43H22zM14.28 3.727a17.36 17.36 0 0 1 1.96 7.056l.023.493h4.277a8.595 8.595 0 0 0-6.26-7.549zm-2.29-.315c-.135 0-.267.013-.402.02a14.515 14.515 0 0 0-2.426 7.425l-.012.419h5.682a14.515 14.515 0 0 0-2.439-7.845c-.134-.006-.266-.02-.402-.02zm-2.288.315a8.595 8.595 0 0 0-6.232 7.268l-.029.28H7.72a17.36 17.36 0 0 1 1.983-7.548z" fill="#727B90" fill-rule="nonzero"/>
							</svg>
							서비스 소개
							</a>
						</li>
						<li>
							<a class="topmenu-nav-menu" href="#">
							
								<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<defs>
										<path d="M12.833 13.6c2.302 0 4.167 1.79 4.167 4v1.6c0 .442-.373.8-.833.8-.46 0-.834-.358-.834-.8v-1.6c0-1.325-1.119-2.4-2.5-2.4H6.167c-1.381 0-2.5 1.075-2.5 2.4v1.6c0 .442-.373.8-.834.8-.46 0-.833-.358-.833-.8v-1.6c0-2.21 1.865-4 4.167-4zm5.027.704c.115-.428.57-.685 1.015-.575 1.839.456 3.124 2.048 3.125 3.871v1.6c0 .442-.373.8-.833.8-.46 0-.834-.358-.834-.8v-1.6c0-1.093-.772-2.048-1.875-2.321-.445-.11-.713-.547-.598-.975zM9.5 4c2.301 0 4.167 1.79 4.167 4S11.8 12 9.5 12c-2.301 0-4.167-1.79-4.167-4S7.2 4 9.5 4zm5.026.706c.114-.428.568-.687 1.014-.577 1.844.453 3.133 2.048 3.133 3.875s-1.29 3.422-3.133 3.875c-.446.11-.9-.149-1.014-.577-.114-.428.155-.863.6-.973 1.107-.272 1.88-1.229 1.88-2.325s-.773-2.053-1.88-2.325c-.445-.11-.714-.545-.6-.973zM9.5 5.6C8.12 5.6 7 6.675 7 8s1.12 2.4 2.5 2.4S12 9.325 12 8s-1.12-2.4-2.5-2.4z" id="sufpiqbzka"/>
									</defs>
									<use fill="#727B90" fill-rule="nonzero" xlink:href="#sufpiqbzka"/>
								</svg>함께할지도
							</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/cmmntyMap/cmmnty-list.do' />"><span>- 함께할지도</span></a></li>
									<li><a href="<c:url value='/mycmmntyMap/mycmmnty-list.do' />"><span>- 나의 함께할지도</span></a></li>
									<li><a href="<c:url value='/cmmntyMap/cmmnty-dashboard.do' />"><span>- 매핑대시보드</span></a></li>
								</ul>
							</div>
						</li>
						<li>
							<a class="topmenu-nav-menu" href="#">
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="M14.525 12.325a4.997 4.997 0 0 1 6.046 2.113v-1.724H22V17h-4.286v-1.429h1.84a3.571 3.571 0 1 0-3.268 5V22a4.997 4.997 0 0 1-1.761-9.675zM14.857 2c.743 0 1.353.567 1.422 1.291l.007.138v5.714H3.429v4.286h5.714v1.428H3.429v4.286h5.714v1.428H3.429a1.429 1.429 0 0 1-1.422-1.29L2 19.142V3.429c0-.743.567-1.353 1.291-1.422L3.429 2h11.428zM5.571 16.286a.714.714 0 1 1 0 1.428.714.714 0 0 1 0-1.428zm0-5.715a.714.714 0 1 1 0 1.429.714.714 0 0 1 0-1.429zm9.286-7.142H3.43v4.285h11.428V3.43zM5.571 4.857a.714.714 0 1 1 0 1.429.714.714 0 0 1 0-1.429z" fill="#727B90" fill-rule="nonzero"/>
							</svg>빅데이터 분석</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/data-catalog.do' />"><span>- 빅데이터 목록</span></a></li>
									<li><a href="<c:url value='/dashboard/db-ur.do' />"><span>- 분석 대시보드</span></a></li>
								</ul>
							</div>
						</li>

						<li>
							<a class="topmenu-nav-menu" href="#">
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path d="m13.695 4.424.377 1.393L1.75 11.626a1.317 1.317 0 0 0-.696 1.56l.754 2.784c.16.63.749 1.056 1.392 1.007l1.564-.174.598 2.207a1.333 1.333 0 0 0 1.622.946l5.095-1.35a1.315 1.315 0 0 0 .925-1.62l-.219-.809 4.011-.313.377 1.392 1.274-.337-3.477-12.832-1.274.337zM11.73 17.323l-5.095 1.35-.534-1.97 5.347-.42.282 1.04zm-8.656-1.716-.755-2.784 12.106-5.704 2.017 7.443-13.368 1.045zm15.907-2.119a4.645 4.645 0 0 0 .578-3.74 4.7 4.7 0 0 0-2.392-2.955l-.59 1.182a3.357 3.357 0 0 1 1.709 2.11 3.317 3.317 0 0 1-.414 2.672l1.109.731zm2.491 1.805a7.29 7.29 0 0 0 1.271-6.389A7.382 7.382 0 0 0 18.412 4l-.487 1.229a6.04 6.04 0 0 1 3.545 4.013 5.964 5.964 0 0 1-1.04 5.227l1.042.824z" fill="#727B90" fill-rule="nonzero"/>
							</svg>
							알림마당</a>
							<div class="topmenu-nav-depth2">
								<ul class="type01">
									<li><a href="<c:url value='/noticeList.do' />"><span>- 공지사항</span></a></li>
									<li><a href="<c:url value='/faqList.do' />"><span>- FAQ</span></a></li>
									<li><a href="<c:url value='/qnaList.do' />"><span>- QnA</span></a></li>
									<li><a href="<c:url value='/dataList.do' />"><span>- 자료실</span></a></li>
								</ul>
							</div>
						</li>

						
				
					</ul>
				</nav>
				<c:choose>
							<c:when test="${__USER__ ne null}">
								<a href="<c:url value='/mypage.do'/>" class="my-info" title="내정보 수정">
									
									<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<defs>
											<path d="M10 10.2c2.301 0 4.167 1.903 4.167 4.25v1.7c0 .47-.373.85-.834.85a.842.842 0 0 1-.833-.85v-1.7c0-1.408-1.12-2.55-2.5-2.55H4.167c-1.381 0-2.5 1.142-2.5 2.55v1.7c0 .47-.373.85-.834.85A.842.842 0 0 1 0 16.15v-1.7c0-2.347 1.865-4.25 4.167-4.25zm8.577-4.851a.822.822 0 0 1 1.179 0 .862.862 0 0 1 0 1.202l-3.333 3.4a.822.822 0 0 1-1.179 0l-1.667-1.7a.862.862 0 0 1 0-1.202.822.822 0 0 1 1.179 0l1.077 1.099zM7.083 0c2.302 0 4.167 1.903 4.167 4.25S9.385 8.5 7.083 8.5c-2.3 0-4.166-1.903-4.166-4.25S4.782 0 7.083 0zm0 1.7c-1.38 0-2.5 1.142-2.5 2.55s1.12 2.55 2.5 2.55c1.381 0 2.5-1.142 2.5-2.55S8.464 1.7 7.083 1.7z" id="tuccjiv2za"/>
										</defs>
										<use fill="#727B90" fill-rule="nonzero" xlink:href="#tuccjiv2za" transform="translate(2 3)"/>
									</svg> 마이페이지
								</a>
								<a href="<c:url value='/logout.do'/>" class="log-out" title="로그아웃">
									
									<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
										<defs>
											<path d="M15.3 0C16.791 0 18 1.221 18 2.727v14.546C18 18.779 16.791 20 15.3 20h-4.5a.905.905 0 0 1-.9-.91c0-.501.403-.908.9-.908h4.5c.497 0 .9-.407.9-.91V2.728a.905.905 0 0 0-.9-.909h-4.5A.905.905 0 0 1 9.9.91c0-.502.403-.909.9-.909zM7.464 5.72a.894.894 0 0 1 1.272 0l3.6 3.637a.922.922 0 0 1 .202.31.914.914 0 0 1-.202.976l.064-.071a.912.912 0 0 1-.045.052l-.019.019-3.6 3.636a.894.894 0 0 1-1.272 0 .916.916 0 0 1 0-1.285l2.063-2.085H.9a.903.903 0 0 1-.893-.795L0 10c0-.502.403-.91.9-.91h8.626L7.464 7.006a.916.916 0 0 1-.08-1.192z" id="pskl9c1aua"/>
										</defs>
										<use fill="#727B90" fill-rule="nonzero" xlink:href="#pskl9c1aua" transform="translate(3 2)"/>
									</svg> 로그아웃
								</a>
							</c:when>
							<c:otherwise>
								<a href="<c:url value='/login-sns.do'/>" class="log-in" title="로그인">
								
								<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<defs>
										<path d="M15.3 0C16.791 0 18 1.221 18 2.727v14.546C18 18.779 16.791 20 15.3 20h-4.5a.905.905 0 0 1-.9-.91c0-.501.403-.908.9-.908h4.5c.497 0 .9-.407.9-.91V2.728a.905.905 0 0 0-.9-.909h-4.5A.905.905 0 0 1 9.9.91c0-.502.403-.909.9-.909zM7.464 5.72a.894.894 0 0 1 1.272 0l3.6 3.637a.922.922 0 0 1 .202.31.914.914 0 0 1-.202.976l.064-.071a.912.912 0 0 1-.045.052l-.019.019-3.6 3.636a.894.894 0 0 1-1.272 0 .916.916 0 0 1 0-1.285l2.063-2.085H.9a.903.903 0 0 1-.893-.795L0 10c0-.502.403-.91.9-.91h8.626L7.464 7.006a.916.916 0 0 1-.08-1.192z" id="pskl9c1aua"/>
									</defs>
									<use fill="#727B90" fill-rule="nonzero" xlink:href="#pskl9c1aua" transform="translate(3 2)"/>
								</svg> 로그인</a>
							</c:otherwise>
						</c:choose>
				</div>
				
		</c:if>
		<div class="main">
			<jsp:invoke fragment="navigation" />
<!-- 			<div class="ctn"> -->
				<jsp:doBody />
<!-- 			</div> -->
		</div>
	</div>
	<c:if test='${fn:contains(__URI__, "/partcptnMap") ne true && fn:contains(__URI__, "/cmmnty-detail") ne true}'>
	<div class="ftr">
		<div class="footer_bottom">
			<div class="inner">
				<img class="f_logo" src="<c:url value='/assets/images/common/footer_logo.png'/>" alt="한국국토정보공사">
				<div class="footer_box">
					<div class="link_box">
						<ul>
							<li><a href="https://www.lx.or.kr/kor/sub08_03.do" target="_blank">개인정보처리방침</a></li>
							<li><a href="https://www.lx.or.kr/kor/sub08_04.do" target="_blank">영상정보처리기기 운영ㆍ관리 방침</a></li>
							<li><a href="https://www.lx.or.kr/kor/sub08_05.do" target="_blank">저작권보호정책</a></li>
						</ul>
					</div>
					<div class="address_box">
						<p>54870 전라북도 전주시 덕진구 기지로 120 (중동) 대표전화 : 063-713-1000 바로처리 콜센터 : 1588-7704</p>
						<p>COPYRIGHT(C) LX, ALL RIGHTS RESERVED.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	</c:if>
	<a href="#" class="top_btn">TOP</a>
</t:base>

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
	
		$(".main").click(function(e) {   
			if(!$('.mobMenu').has(e.target).length ) $('.mobMenu').removeClass("active");
		});
	});

	//모바일 동작
	$(".topmenu-mobile").on('click', function() {
		if($(".mobMenu").hasClass("active")){
			$(".mobMenu").removeClass("active");
		} else {
			$(".mobMenu").addClass("active");
			
		}

	});
</script>