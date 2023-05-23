<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
	<div class="admin-wrap dbm" style="margin: 0;">
		<img class="logo" alt="로고" src="<c:url value='/assets/images/dbm/a130-logo.jpg'/>">
		<div class="title">공공데이터 기업 매칭 지원사업</div>
		<div class="sub-title">사람과 동물이 함께 행복한 펫 프렌들리 반려동물 생활동반지도 개방데이터 구축</div>
		<div class="admin">
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el">
						<input type="hidden" name="prj_cd" id="prj_cd" value="A130">
						<div class="form-field">
							<label for="user_id">조사자 이름을 입력하세요.</label>
							<div class="usr_info">
								<input type="text" name="user_id" id="user_id" placeholder="이름 입력" value="">
								<label for="id_save" class="switch">
									<em>이름 저장</em>
									<input type="checkbox" id="id_save" name="id_save" checked>
									<span></span>
								</label>
							</div>
						</div>
						<div class="form-field">
							<label for="svy_id">조사 데이터를 선택하세요.</label>
							<select name="svy_id" id="svy_id">
								<option disabled selected value="">조사 데이터 선택</option>
								<t:code-as-option group="A130" />
							</select>
						</div>
						<div class="form-field">
							<label for="item_id">조사 항목을 선택하세요.</label>
							<select name="item_id" id="item_id" onChange="javascript:setItemCombo(this.value);">
								<option disabled selected>조사 항목 선택</option>
							</select>
						</div>
						<div class="form-field">
							<label for="img_file">사진 파일</label>
							<button class="app_exec">어플리케이션 열기</button>
							<input type="file" name="img_file" id="img_file" placeholder="첨부파일" >
						</div>
						<div class="form-field">
							<label for="item_remark">설명</label>
							<textarea id="item_remark" name="item_remark" rows="3"></textarea>
						</div>
						<button type="submit" class="form-submit">저장</button>
					</form>
				</div>
			</div>
		</div>
	</div>

<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dbm.css' />">
<script type="text/javascript" src="<c:url value='/assets/js/dbm.js' />"></script>

</t:base>
