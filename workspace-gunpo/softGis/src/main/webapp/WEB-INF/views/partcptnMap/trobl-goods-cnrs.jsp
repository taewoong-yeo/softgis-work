<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<t:app>
	<div id="map" class="map map-ov-lt">
		<div class="map-ui map-ui-rt map-type">
			<button class="base active" data-map-action="map-base" title="일반지도">일반지도</button>
			<button class="satellite" data-map-action="map-satellite" title="위성지도">위성지도</button>
			<button class="hybrid" data-map-action="map-hybrid" title="하이브리드 지도">하이브리드 지도</button>
		</div>
		<div class="map-ui map-ui-rt map-action">
			<div class="map-ui-group">
				<button data-map-action=":full-screen" title="전체 화면"><i class="fas fa-expand"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="home" title="홈으로"><i class="fas fa-home"></i></button>
				<button data-map-action=":zoom-in" title="확대"><i class="fas fa-plus"></i></button>
				<button data-map-action=":zoom-out" title="축소"><i class="fas fa-minus"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="measure-exit" title="취소"><i class="fas fa-mouse-pointer"></i></button>
				<button data-map-action="measure-line" title="거리재기"><i class="fas fa-ruler-horizontal"></i></button>
				<button data-map-action="measure-polygon" title="면적재기"><i class="fas fa-ruler-combined"></i></button>
				<button data-map-action="measure-radius" title="반경재기"><i class="fas fa-circle-notch"></i></button>
				<button data-map-action="measure-reset" title="초기화"><i class="fas fa-eraser"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="ui-visible" title="UI 표시"><i class="fas fa-eye-slash"></i></button>
			</div>
			<div class="map-ui-group">
				<button data-map-action="capture" title="이미지 저장"><i class='bx bxs-download'></i></button>
			</div>
			<div class="map-ui-group u-margin-bottom-0">
				<button class="map-layer-toggler" title="레이어 목록"><i class="bx bxs-layer"></i></button>
			</div>
			<div class="map-layer">
				<h6>레이어 목록</h6>
				<div class="map-layer-inner"></div>
			</div>
		</div>
	</div>

	<div class="contents partcptnMap">
		<div class="itemPopup">
			<div class="itemPopupClose"><a><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"/><path fill="currentColor" d="M14.71 9.29a1 1 0 0 0-1.42 0L12 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg></a></div>
			<div class="popupDetail">
			<input type="hidden" id="rsv_goods_id"/>
				<h3>
					내용
				</h3>
				<div class="titleUnderLine"></div>
				<div class="popupItemName">
					<p class="category">물품명</p>
					<p class="name"></p>
				</div>

				<div class="popupRentDuration">
					<p class="category">대여가능기간</p>
					<div class="popupDurationWrap"><p class="popupDurationOne"></p> - <p class="popupDurationTwo"></p></div>
				</div>

				<div class="popupItemLocation">
					<p class="category">위치</p>
					<p class="location"></p>
				</div>

				<span>*사용 신청은 신청 댓글을 이용해주세요.</span>

			</div>

			<div class="popupPic">

				<h3>
					물품 사진
				</h3>

				<div class="titleUnderLine"></div>

				<div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}' class="slider">
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
					<div><h3>5</h3></div>
					<div><h3>6</h3></div>
				</div>

			</div>

			<div class="popupReply">

				<h3>
					신청 댓글
				</h3>

				<div class="titleUnderLine"></div>
				
				<div class="replyBox">
					<input type="text" name="reply_cont" id="reply_cont">
					<button class="replyCommit">등록</button>
				</div>

				<div class="replyListBox">
				</div>
				
			</div>
			
		</div>

		<div class="itemAddPopup">
			<form id="submitForm" method="post" enctype="multipart/form-data" action="/partcptnMap/insertTroblGoods.do">
			<input type="hidden" name="goods_id" id="goods_id">
			<div class="itemAddPopupClose"><a><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"/><path fill="currentColor" d="M14.71 9.29a1 1 0 0 0-1.42 0L12 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg></a></div>
			<div class="popupDetail">
				<h3>
					물품 등록
				</h3>
				<div class="titleUnderLine"></div>
				<div class="popupItemName">
					<p class="category">물품명</p>
					<input type="text" name="goods_nm" id="goods_nm">
				</div>

				<div class="popupRentDuration">
					<p class="category">대여가능기간</p>

					<div class="popupInputBox">
						<input type="date" name="rental_start_dt" id="rental_start_dt">
						-
						<input type="date" name="rental_end_dt" id="rental_end_dt">
					</div>

					<div class="popupCheckBox">
						<input type="checkbox" name="" id="dontCareCheck">
						<label for="dontCareCheck">상시</label> 
					</div>
				</div>

				<div class="popupItemLocation">
					<p class="category">위치</p>
					<input type="text" name="goods_addr" id="goods_addr" readonly>
					<button type="button" class="popupMapSearch">찾기</button>
				</div>
				

			</div>

			<div class="popupPic">

				<h3>
					사진 첨부
				</h3>

				<div class="titleUnderLine"></div>

				<div class="addButtonBox">
<!-- 					<input type="file" class="popupPicAddButton" id="picFiles" name="picFiles" multiple> -->
					<input type="file" name="fileList" id="fileList" multiple>
					<input type="file" name="picFiles" id="picFiles" multiple>
					<label for="picFiles" class="popupPicAddButton">업로드</label>
				</div>

				<div class="addPicTableBox">
					<table class="addPicList">
					</table>
				</div>
			</div>
			
			<div class="popupSaveButtonBox">
				<button class="saveButton">저장하기</button>
			</div>
			</form>
		</div>
		
		<div class="partcptnMapSidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#" class="nav-link active">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
							<div class="icon">
								<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
							</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

				<li class="nav-item">
					<a href="" class="nav-link">
						<div class="icon">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"/></svg>
						</div>
						<span>카테고리1</span>
					</a>
				</li>

			</ul>
		</div>
		
		<div class="partcptnMapSidenavTwoDept">
			<div class="closeButton"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"/><path fill="currentColor" d="M14.71 9.29a1 1 0 0 0-1.42 0L12 10.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29l-1.3 1.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l1.29-1.3l1.29 1.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l1.3-1.29a1 1 0 0 0 0-1.42Z"/></svg></div>
			<div class="partcptnSearch">
				<input type="search" name="search_keyword" id="search_keyword" placeholder="검색어를 입력해주세요">
				<button type="button">검색</button>
			</div>
			<div class="partcptnList">
				<div class="partcptnAddList">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
					<p>추가하기</p>
				</div>

				<div class="partcptnReturnList">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M1 12v-1h9v1H1zm0-5h14v1H1V7zm11-4v1H1V3h11z"/></svg>
					<p>목록으로</p>
				</div>

				<p class="addNotice">※ 본인이 작성한 게시물이 노출됩니다.</p>
				
				<div class="list"></div>
				
			</div>

		</div>
	</div>
	
</t:app>