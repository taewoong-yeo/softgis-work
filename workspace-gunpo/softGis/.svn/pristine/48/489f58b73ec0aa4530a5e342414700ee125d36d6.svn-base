<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<t:auth type="login">
	<form action="<c:url value='/login.do' />" method="POST" class="form">
		<h1 class="form-title">회원 로그인</h1>
		<div class="row row-hspace-1">
			<div class="col-8">
				<div class="form-field">
					<input type="text" name="usr_id" id="usr_id" placeholder="아이디">
				</div>
				<div class="form-field">
					<input type="password" name="usr_pw" id="usr_pw" placeholder="비밀번호">
				</div>
			</div>
			<div class="col-4">
				<button class="form-submit btn_login">로그인</button>
			</div>
		</div>
		<ul class="form-link">
			<li>
				<input type="checkbox" id="id_save" name="id_save" value="아이디 저장"/>
				<label for="id_save">아이디 저장</label>
<%-- 				<a class="join" href="<c:url value='/register.do' />">회원 가입</a> --%>
<!-- 				<a href="">비밀번호 찾기</a> -->
<!-- 				<a class="find-id" href="">아이디</a> -->
			</li>
		</ul>
	</form>
</t:auth>