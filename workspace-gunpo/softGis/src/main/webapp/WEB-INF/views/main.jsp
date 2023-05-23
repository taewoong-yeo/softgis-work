<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:app>
	<div class="contents">

		<section class="sec1">
			<div class="container">
				<div class="main-title">
					<div class="title-svg">
						<div class="title-wrap">
							<p>국민의 참여로 <br> 만들어지는</p>
							<h2>함께할지도</h2>
						</div>
						<div class="svg-wrap">
							<svg width="100" height="126" viewBox="0 0 100 126" xmlns="http://www.w3.org/2000/svg">
    							<path d="M68.182 76.5H59.09v-9H40.909v9h-9.09v-9c.004-4.968 4.072-8.995 9.09-9h18.182c5.018.005 9.086 4.032 9.09 9v9zM50 54c-7.531 0-13.636-6.044-13.636-13.5S42.469 27 50 27c7.531 0 13.636 6.044 13.636 13.5C63.628 47.952 57.528 53.992 50 54zm0-18c-2.51 0-4.545 2.015-4.545 4.5S47.49 45 50 45s4.545-2.015 4.545-4.5C54.543 38.016 52.51 36.003 50 36zm0 90L11.657 81.23a158.041 158.041 0 0 1-1.583-2.03A48.68 48.68 0 0 1 0 49.5C0 22.162 22.386 0 50 0s50 22.162 50 49.5a48.66 48.66 0 0 1-10.067 29.688l-.007.011s-1.364 1.775-1.567 2.013L50 126zM17.33 73.777c.004.004 1.06 1.387 1.302 1.685L50 112.086 81.409 75.41c.2-.249 1.265-1.643 1.267-1.646A39.793 39.793 0 0 0 90.91 49.5C90.909 27.132 72.593 9 50 9S9.091 27.132 9.091 49.5a39.813 39.813 0 0 0 8.239 24.277z" fill="#FB9A4E" fill-rule="evenodd"/>
							</svg>
						</div>
					</div>
					<p class="p-hidden">구성원들이 함께 관심 있는 정보를 수집하고 지도를 만들어 정보를 공유하고 소통할 수 있습니다.</p>
					<p class="color888">사회·문화나 지역의 이슈와 같은 특정 주제에 대한 시민 중심의 경험 지식을 수집해서 지도로 만들어 정보를 공유하고 이를 이용하여 연구 및 정책 활용 위한 참여형 공간정보 플랫폼입니다.</p>
				</div>

				<div class="button-wrap">
					
					<div class="button1" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-list.do'">
						
					<div class="button-row1">
						<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    						<g fill="none" fill-rule="evenodd">
        					<path d="M52 28.571h-4V32.5h4c3.312.004 5.996 2.64 6 5.893v7.857h4v-7.857c-.006-5.422-4.48-9.815-10-9.822zM48 8.93c3.314 0 6 2.638 6 5.892 0 3.255-2.686 5.893-6 5.893s-6-2.638-6-5.893c0-3.254 2.686-5.892 6-5.892M48 5c-5.523 0-10 4.397-10 9.821 0 5.425 4.477 9.822 10 9.822s10-4.397 10-9.822a9.733 9.733 0 0 0-2.929-6.944A10.093 10.093 0 0 0 48 5zm-2 55h-4v-3.929c-.004-3.253-2.688-5.889-6-5.892h-8c-3.312.003-5.996 2.64-6 5.892V60h-4v-3.929c.007-5.421 4.48-9.815 10-9.821h8c5.52.006 9.993 4.4 10 9.821V60zM32 26.607c3.314 0 6 2.638 6 5.893s-2.686 5.893-6 5.893-6-2.638-6-5.893 2.686-5.893 6-5.893m0-3.928c-5.523 0-10 4.397-10 9.821 0 5.424 4.477 9.821 10 9.821s10-4.397 10-9.821a9.733 9.733 0 0 0-2.929-6.945A10.093 10.093 0 0 0 32 22.68zM16 28.57h-4c-5.52.007-9.993 4.4-10 9.822v7.857h4v-7.857c.004-3.253 2.688-5.89 6-5.893h4v-3.929zM16 8.93c3.314 0 6 2.638 6 5.892 0 3.255-2.686 5.893-6 5.893s-6-2.638-6-5.893c0-3.254 2.686-5.892 6-5.892M16 5C10.477 5 6 9.397 6 14.821c0 5.425 4.477 9.822 10 9.822s10-4.397 10-9.822a9.733 9.733 0 0 0-2.929-6.944A10.093 10.093 0 0 0 16 5z" fill="#D8D8D8"/>
        					<path d="M46 60h-4v-3.929c-.004-3.253-2.688-5.889-6-5.892h-8c-3.312.003-5.996 2.64-6 5.892V60h-4v-3.929c.007-5.421 4.48-9.815 10-9.821h8c5.52.006 9.993 4.4 10 9.821V60zM32 26.607c3.314 0 6 2.638 6 5.893s-2.686 5.893-6 5.893-6-2.638-6-5.893 2.686-5.893 6-5.893m0-3.928c-5.523 0-10 4.397-10 9.821 0 5.424 4.477 9.821 10 9.821s10-4.397 10-9.821a9.733 9.733 0 0 0-2.929-6.945A10.093 10.093 0 0 0 32 22.68z" fill="#1E9893"/>
    						</g>
						</svg>

						<div class="button-text-wrap">
							<p>함께할지도</p>
							<span>참여하기</span>
						</div>
					</div>

					<div class="button-row2">
						<p>다양한 함께할지도를 살펴볼 수 있으며, 직접 참여하여 나만의 정보를 공유할 수 있습니다.</p>
					</div>

					<div class="button-row3">
						<a>바로가기
							<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
								<path stroke="#333" stroke-width="1.6" stroke-linejoin="round" d="m6 4 5 4.5L6 13" fill="none" fill-rule="evenodd"/>
							</svg>
						</a>
					</div>

					</div>

					<div class="button2" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-form.do'">

						<div class="button-row1">
							<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd">
									<path d="M10.571 42.714v-2.143H6.286v2.143c0 8.285 6.715 15 15 15h6.428V53.43h-6.428c-5.918 0-10.715-4.797-10.715-10.715zm38.572-21.428v2.143h4.286v-2.143c0-8.285-6.716-15-15-15H32v4.285h6.429a10.714 10.714 0 0 1 10.714 10.715zm-27.857 0H8.429A6.429 6.429 0 0 0 2 27.714V32h4.286v-4.286c0-1.183.96-2.143 2.143-2.143h12.857c1.183 0 2.143.96 2.143 2.143V32h4.285v-4.286a6.429 6.429 0 0 0-6.428-6.428zm-6.429-2.143a8.571 8.571 0 1 0 0-17.143 8.571 8.571 0 0 0 0 17.143zm0-12.857a4.286 4.286 0 1 1 0 8.571 4.286 4.286 0 0 1 0-8.571zm40.714 45H42.714a6.429 6.429 0 0 0-6.428 6.428V62h4.285v-4.286c0-1.183.96-2.143 2.143-2.143h12.857c1.184 0 2.143.96 2.143 2.143V62H62v-4.286a6.429 6.429 0 0 0-6.429-6.428zm-15-10.715a8.571 8.571 0 1 0 17.143 0 8.571 8.571 0 0 0-17.143 0zm12.858 0a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0z" fill="#D8D8D8"/>
									<path d="M55.571 51.286H42.714a6.429 6.429 0 0 0-6.428 6.428V62h4.285v-4.286c0-1.183.96-2.143 2.143-2.143h12.857c1.184 0 2.143.96 2.143 2.143V62H62v-4.286a6.429 6.429 0 0 0-6.429-6.428zm-15-10.715a8.571 8.571 0 1 0 17.143 0 8.571 8.571 0 0 0-17.143 0zm12.858 0a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0z" fill="#1E9893"/>
								</g>
							</svg>
	
							<div class="button-text-wrap">
								<p>함께할지도</p>
								<span>개설하기</span>
							</div>
						</div>
	
						<div class="button-row2">
							<p>함께할지도를 개설하여 지역 현안 정보를 들을 수 있고 지도제작을 할 수 있습니다.</p>
						</div>
	
						<div class="button-row3">
							<a>바로가기
								<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
									<path stroke="#333" stroke-width="1.6" stroke-linejoin="round" d="m6 4 5 4.5L6 13" fill="none" fill-rule="evenodd"/>
								</svg>
							</a>
						</div>
					</div>
					<div class="button3" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-dashboard.do'">

						<div class="button-row1">
							<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd">
									<path d="M30.5 56h-3.786V44.48c-.003-3.18-2.544-5.757-5.678-5.76h-7.572c-3.134.003-5.675 2.58-5.678 5.76V56H4V44.48c.006-5.3 4.24-9.594 9.464-9.6h7.572c5.224.006 9.458 4.3 9.464 9.6V56zM17.25 15.68c3.136 0 5.679 2.579 5.679 5.76 0 3.181-2.543 5.76-5.679 5.76s-5.679-2.579-5.679-5.76c0-3.181 2.543-5.76 5.679-5.76m0-3.84c-5.227 0-9.464 4.298-9.464 9.6s4.237 9.6 9.464 9.6 9.464-4.298 9.464-9.6a9.67 9.67 0 0 0-2.772-6.788 9.397 9.397 0 0 0-6.692-2.812z" fill="#FFF"/>
									<path d="M53.214 15.124H57V34.12h-3.786V15.124zM43.75 8h3.786v26.12H43.75V8zm-9.464 11.873h3.785V34.12h-3.785V19.873z" fill="#42DFD9"/>
								</g>
							</svg>
							 	
							<div class="button-text-wrap">
								<p>함께할지도</p>
								<span>통계</span>
							</div>
						</div>
	
						<div class="button-row2">
							<p>다양한 함께할지도를 대시보드를 통해 통계 정보를 확인할 수 있습니다.</p>
						</div>
	
						<div class="button-row3">
							<a>바로가기
								<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
									<path stroke="#333" stroke-width="1.6" stroke-linejoin="round" d="m6 4 5 4.5L6 13" fill="none" fill-rule="evenodd"/>
								</svg>
							</a>
						</div>

					</div>
					<div class="button4" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/noticeList.do'">

						<div class="button-row1">
							<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
								<g fill="none" fill-rule="evenodd">
									<path d="m36.546 11.97.955 3.563-31.268 14.89c-1.42.678-2.167 2.266-1.817 3.809l1.957 7.311c.404 1.613 1.897 2.702 3.53 2.575l3.967-.447 1.513 5.648c.486 1.814 2.327 2.897 4.112 2.419l12.925-3.464c1.785-.478 2.838-2.336 2.352-4.15l-.554-2.069 10.173-.808.955 3.564 3.232-.866-8.8-32.842-3.232.866zM31.54 44.99l-12.925 3.463-1.351-5.04 13.564-1.083.712 2.66zM9.587 40.612l-1.91-7.127 30.717-14.62 5.104 19.049-33.911 2.698zm40.353-5.45a11.988 11.988 0 0 0 1.473-9.577 11.988 11.988 0 0 0-6.064-7.557l-1.5 3.024a8.562 8.562 0 0 1 4.333 5.398 8.562 8.562 0 0 1-1.053 6.842l2.811 1.87zm6.316 4.615c3.56-4.611 4.76-10.67 3.236-16.355-1.523-5.686-5.591-10.334-10.98-12.547l-1.236 3.147c4.41 1.81 7.74 5.613 8.986 10.265 1.246 4.653.265 9.61-2.65 13.383l2.644 2.107z" fill="#D8D8D8"/>
									<path d="M49.94 35.161a11.988 11.988 0 0 0 1.473-9.576 11.988 11.988 0 0 0-6.064-7.557l-1.5 3.024a8.562 8.562 0 0 1 4.333 5.398 8.562 8.562 0 0 1-1.053 6.842l2.811 1.87zm6.316 4.616c3.56-4.611 4.76-10.67 3.236-16.355-1.523-5.686-5.591-10.334-10.98-12.547l-1.236 3.147c4.41 1.81 7.74 5.613 8.986 10.265 1.246 4.653.265 9.61-2.65 13.383l2.644 2.107z" fill="#1E9893"/>
								</g>
							</svg>
	
							<div class="button-text-wrap">
								<p>알림</p>
								<span>마당</span>
							</div>
						</div>
						<div class="button-row2">
							<p>함께할지도의 공지사항과 자주묻는질문과 QnA 및 각종 자료를 공유할 수 있습니다.</p>
						</div>
	
						<div class="button-row3">
							<a>바로가기
								<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
									<path stroke="#333" stroke-width="1.6" stroke-linejoin="round" d="m6 4 5 4.5L6 13" fill="none" fill-rule="evenodd"/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="sec03">
			<div class="container">
				<div class="text-wrap">	
					<p>국민의 참여로 만들어지는</p>
					<h2>함께할지도</h2>
				</div>
			</div>

			<section class="variable slider data-category-theme slick-initialized slick-slider" id="variable">
				   <div class="slick-list">
					<div class="survey_slide">
						<c:forEach items="${cmmntyMapListMain }" var="item">
						<div class="variableSlider slick-slide" onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-detail.do?mapng_id=${item.mapng_id}'">
							<div class="sliderImg" style="background-image: url(/togetherMap/loadImage.do?file_id=${item.file_id}">
								<div class="sliderText1">${item.cat_nm }</div>
								<div class="sliderText2">
			 					<c:choose>
			 						<c:when test='${item.end_yn eq \"Y\"}'>
										완료
			 						</c:when>
			 						<c:otherwise>
										진행중
			 						</c:otherwise>
			 					</c:choose>
								</div>
							</div>
							<div class="sliderTitle">
								<div class="title-wrap">
									<span>${item.mapng_title } </span>
									<p>${item.mapng_desc }</p>
							
								</div>
							</div>

							<div class="sliderBottom">
								<div class="title-wrap">
									<p class="sliderPeriod">기&nbsp;&nbsp;&nbsp;간 <span>${item.mapng_dt }</span></p>
									<p class="sliderWriter">조회수  <span>${item.view_cnt }</span></p>
									<p class="sliderCandidate">참여수  <span>${item.answer_cnt}</span></p>
								</div>	
							</div>
						</div>
						</c:forEach>
					</div>
			   </div>
			   

			</section>
		</section>
	</div>
	
	<div class="main-popup" style="display: none;"> 
		<c:forEach var="item" items="${popup}">
			<img src="<c:url value='${item.img_blob}' />" title="${item.noti_title}" data-noti="${item.noti_no}"/>
		</c:forEach>
	</div>
</t:app>