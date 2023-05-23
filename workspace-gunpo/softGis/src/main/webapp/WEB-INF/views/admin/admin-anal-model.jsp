<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="admin-wrap">
		<h1>분석모델 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="anal_cate">카테고리</th>
								<th data-field="anal_nm">분석명</th>
								<th data-field="model_nm">분석모델명</th>
								<th data-field="exe_dt" data-fit>실행일</th>
								<th data-field="use_stat" data-fit>사용유무</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el">
						<div class="form-field">
							<label for="anal_id" class="form-required form-readonly-update">분석명</label>
							<select name="anal_id" id="anal_id">
								<option disabled selected>분석 선택</option>
							<c:forEach items="${result}" var="item">
								<option value="${item.anal_id}">[${item.anal_cd_nm}] ${item.anal_nm}</option>
							</c:forEach>
							</select>
						</div>
						<div class="form-field">
							<label for="model_nm" class="form-required">분석모델명</label>
							<div class="form-inline">
								<input type="text" name="model_nm" id="model_nm" placeholder="분석모델명">
							</div>
						</div>
						<div class="form-field">
							<label for="model_desc">분석모델 설명</label>
							<textarea name="model_desc" id="model_desc" placeholder="분석 분석모델" rows="3"></textarea>
						</div>
						<div class="form-field">
							<label for="att_file">분석모델 실행 파일</label>
							<div class="sub-file">
								<input type="file" name="att_file" id="sub-file" placeholder="파일 선택" >
							</div>
							<div class="sub-file-download"></div>
							<button class="sub-file-btn">X</button>
							<p class="u-margin-top-1 u-text-primary">※ 분석모델 실행 파일은 파이썬 프로그램(.py)만 업로드 가능합니다.</p>
						</div>
						<div class="form-field">
							<label>활용 데이터</label>
							<div class="admin-anal-catalog-manager">
							</div>
						</div>
						<div class="form-field form-field-inline">
							<label for="use_stat">사용여부</label>
							<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
						</div>
						<button type="submit" class="form-submit">등록</button>
						<button type="button" class="form-delete">삭제</button>
						<button type="reset" class="form-reset">신규 입력</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>