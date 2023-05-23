<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>

<div class="login_wrap">	
	<div class="login_form mypage">
		<div class="mypage_title">
			<div>
				<img src="<c:url value='/assets/images/common/icon-log-white.png'/>"/>
				<span>마이페이지</span>
				<p>함께할지도<br/>마이페이지</p>
			</div>
		</div>
		
		<div class="mypage_form">
			<form method="POST" >
				<input type="hidden" id="usr_id" name="usr_id" value="${__USER__.usr_id }"/>
				<div class="mypage_form_wrap">
					<div>
						<span class="tit">아이디</span>
						<span>
							<c:choose>
								<c:when test="${__USER__.usr_login_type eq null }">
									<c:out value="${__USER__.usr_id }"/> 
								</c:when>
								<c:otherwise>
									<c:out value="${__USER__.usr_login_type }"/>에서 로그인 
								</c:otherwise>
							</c:choose>
						</span>
					</div>
					<div>
						<span class="tit">이름</span>
						<span><c:out value="${__USER__.usr_nm }"/></span>
					</div>
				
					<div>
						<div>
							<span class="tit">로그아웃</span>
							<button type="button" class="logout">로그아웃</button>
						</div>
						<div>
							<span class="tit">회원탈퇴</span>
							<button type="button" class="leave">탈퇴하기</button>
						</div>
					</div>
			
					<%-- <c:if test="${__USER__.usr_login_type eq '' or __USER__.usr_login_type eq null}">
						<div>
							<span class="tit">변경 비밀번호</span>
							<input type="password" name="usr_pw" id="usr_pw" placeholder="영문, 숫자, 특수문자 조합 9~20자">
						</div>
				
						<div>
							<span class="tit">비밀번호 확인</span>
							<input type="password" name="usr_pw_confirm" id="usr_pw_confirm">
						</div>
						<div class="changeButtonWrap pwChange">
							<span class="tit">비밀번호 변경</span>
							<button type="button">변경하기</button>
						</div>
					</c:if> --%>
					<div class="mypage_btn_wrap">
						<div>
							<button type="button" class="myCmmnty"><img src="<c:url value='/assets/images/common/icon-my-01.png'/>"/><span>나의 함께할지도</span></button>
						</div>
						<div>
							<button type="button" class="myAnswer"><img src="<c:url value='/assets/images/common/icon-my-02.png'/>"/><span>나의 의견목록</span></button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

</div>

<div class="modal_wrap_back">
	<div class="modal_wrap">
	
		<div class="title_wrap">
			<div>
				<img src="<c:url value='/assets/images/common/icon-my-02.png'/>"/>
				<span>나의 의견 목록</span>
			</div>
			<div class="close_button_wrap">
				<img src="<c:url value='/assets/images/common/btn-close.png'/>"/>
			</div>
		</div>
	
		<div class="table_wrap">
			<div>
			
				<table>
					<colgroup>
						<col width="40%"/>
						<col width="20%"/>
						<col width="40%"/>
					</colgroup>
					<thead>
					<tr>
						<th>의견 제목</th>
						<th>작성일자</th>
						<th>매핑 제목</th>
					</tr>
					</thead>
		
					<tbody>
					<c:forEach items="${answer_list }" var="item">
						<tr onclick="javascript:location.href=Constant.CONTEXT_PATH + '/cmmntyMap/cmmnty-detail.do?mapng_id=${item.mapng_id }'">
							<td>${item.answer_title }</td>
							<td>${item.reg_dt }</td>
							<td>${item.mapng_title }</td>
						</tr>
					</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	
	</div>
</div>

</t:subapp>