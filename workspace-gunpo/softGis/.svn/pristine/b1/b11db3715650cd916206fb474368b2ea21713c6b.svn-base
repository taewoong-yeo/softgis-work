<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<t:auth type="register">
	<div class="agree">
		<h1 class="form-title">서비스 약관 동의</h1>
			<div class="form-field">
				<label for="">개인정보 수집·이용 동의서</label>
				<div style="border: 1px solid #888;padding: 8px;line-height: 18px;">
				개인정보 파일의 처리 목적은 다음과 같습니다.
					<table style="border:1px solid #999">
						<thead>
							<tr style="border:1px solid #999">
								<th style="border:1px solid #999">개인정보 파일 명칭</th>
								<th style="border:1px solid #999">운영근거/처리목적</th>
								<th style="border:1px solid #999">파일에 기록되는 항목</th>
								<th style="border:1px solid #999">보유기간</th>
							</tr>
						</thead>
						<tbody>
							<tr style="border:1px solid #999">
								<td style="border:1px solid #999">정보주체의 동의</td>
								<td style="border:1px solid #999">정보주체의 동의<br/> 회원가입자 정보관리</td>
								<td style="border:1px solid #999">필수: 이름, 아이디, 비밀번호 <br/>선택: 휴대전화번호   </td>
								<td style="border:1px solid #999">회원탈퇴 시</td>
							</tr>
						</tbody>
	                </table>
			                     개인정보의 제3자 제공 : 해당사항 없음
					개인정보처리의 위탁 : 해당사항 없음
				</div>
				<span>개인정보 수집 및 이용에 동의</span> <input type="checkbox" name="agree_yn" value="Y">
			</div>
			
			<button type="button" class="form-submit next">다음</button>
			<ul class="form-link">
				
				<li><a href="<c:url value='/login.do' />">뒤로 가기</a></li>
			</ul>
	</div>
	<form action="<c:url value='/register.do' />" method="POST" class="form form-compact" style="display:none">
		<h1 class="form-title">회원가입</h1>
		<div class="form-field">
			<label for="usr_nm" class="form-required">이름</label>
			<input type="text" name="usr_nm" id="usr_nm" placeholder="이름">
		</div>
		
		<div class="form-field">
			<label for="usr_id" class="form-required">아이디</label>
			<div class="form-box">
				<input type="hidden" id="mail_chk" value=""/>
				<input type="text" name="usr_id" id="usr_id" placeholder="이메일로 가입해주세요"><br>
				<button type="button" id="mail_cert_btn" class="btn btn-primary">메일인증</button>
			</div>
		</div>
	
		<div class="form-field">
			<label for="usr_pwd" class="form-required">비밀번호</label>
			<input type="password" name="usr_pw" id="usr_pw" placeholder="비밀번호 (영문, 숫자, 특수문자 조합 9~20자)">
			<input type="password" name="usr_pw_confirm" placeholder="비밀번호 확인">
		</div>
				
		<div class="form-field">
			<label for="usr_phone" class="">휴대전화번호</label>
			<input type="text" name="usr_mobile" id="usr_mobile" placeholder="010-0000-0000 형식으로 입력 해주세요">
		</div>
		
		<div class="form-field emp-only">
			<label for="usr_dpt" class="">부서명</label>
			<input type="text" name="usr_dept" id="usr_dept" placeholder="부서명">
		</div>
				
		<div class="form-field emp-only">
			<label for="usr_phone" class="">내선번호</label>
			<input type="text" name="usr_tel" id="usr_tel" placeholder="내선번호">
		</div>
		

		
		<br><br>
		
		<button class="form-submit">회원 가입</button>
		<ul class="form-link">
			
			<li><span class="u-text-primary">*</span> 항목은 필수 입력 사항입니다.<a href="<c:url value='/login.do' />">뒤로 가기</a></li>
		</ul>
	</form>
</t:auth>