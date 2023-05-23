<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:app>
	<div class="admin-wrap">
		<h1>업로드 테스트</h1>
		<div class="admin">
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el">
						<div class="form-field">
							<label for="prj_cd" class="form-required">프로젝트 코드</label>
							<select name="prj_cd" id="prj_cd">
								<option disabled selected>프로젝트 선택</option>
								<t:code-as-option group="PROJECT" />
							</select>
						</div>
						<div class="form-field">
							<label for="svy_id" class="form-required">설문아이디</label>
							<input type="text" name="svy_id" id="svy_id" placeholder="설문아이디" >
						</div>
						<div class="form-field">
							<label for="item_id" class="form-required">항목아이디</label>
							<input type="text" name="item_id" id="item_id" placeholder="항목아이디" >
						</div>
						<div class="form-field">
							<label for="lon" class="form-required">경도</label>
							<input type="text" name="lon" id="lon" placeholder="경도" >
						</div>
						<div class="form-field">
							<label for="lat" class="form-required">위도</label>
							<input type="text" name="lat" id="lat" placeholder="위도" >
						</div>
						<div class="form-field">
							<label for="img_file">첨부파일</label>
							<input type="file" name="img_file" id="img_file" placeholder="첨부파일" >
						</div>
						<div class="form-field">
							<label for="user_id" class="form-required">사용자아이디</label>
							<input type="text" name="user_id" id="user_id" placeholder="사용자아이디" value="${__USER__.getUsr_id()}">
						</div>
						<button type="submit" class="form-submit">전소</button>
						<button type="button" class="form-delete">삭제</button>
						<button type="reset" class="form-reset">신규 입력</button>
					</form>
				</div>
			</div>
			<div class="admin-panel"></div>
		</div>
	</div>
	<script type="text/javascript">
		
	</script>
</t:app>