<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<t:subapp>
	<div class="admin-wrap">
		<h1>사용자 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
							<th data-field="usr_nm">이름</th>
							<th data-field="usr_id">아이디</th>
							<th data-field="use_stat">사용여부</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el">
						<div class="row row-hspace-1">
							<div class="form-field form-readonly-update col-6">
								<label for="usr_id" class="form-required">사용자ID</label>
								<input type="text" name="usr_id" id="usr_id" placeholder="사용자ID">
							</div>
							<div class="form-field col-6">
								<label for="usr_nm" class="form-required">사용자명</label>
								<input type="text" name="usr_nm" id="usr_nm"  placeholder="사용자명">
							</div>
							
							<div class="form-field col-6 just-right form-field-inline">
								<label for="use_stat">사용여부</label>
								<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
							</div>
							<div class="form-field col-6 text-right" id="usr_login_type">
								
								<button type="button" id="init_usr_pwd_btn" name="init_usr_pwd_btn" class="btn btn-primary">비밀번호 초기화</button>
								
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for=usr_auth class="form-required">사용자권한</label>
								<select name="usr_auth" id="usr_auth">
									<option disabled selected>사용자권한 선택</option>
									<t:code-as-option group="USER_GROUP" />
								</select>
							</div>
							<div class="form-field col-6">
								<label for="usr_mobile">핸드폰 번호</label>
								<input type="text" name="usr_mobile" id="usr_mobile" placeholder="핸드폰 번호">
							</div>
						</div>
						
				   		<button type="submit" class="form-submit">등록</button>
			   	   <!-- <button type="button" class="form-delete">삭제</button> -->
					</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>