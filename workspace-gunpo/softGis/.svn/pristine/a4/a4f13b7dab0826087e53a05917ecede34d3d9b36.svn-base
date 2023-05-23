<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="admin-wrap">
		<h1>분석 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="anal_cd_nm" data-fit>분석 카테고리</th>
								<th data-field="anal_nm">분석명</th>
								<th data-field="anal_desc">분석 설명</th>
								<th data-field="use_stat" data-fit>사용유무</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el group">
						<div class="form-field">
							<label for="anal_cd" class="form-required">카테고리</label>
							<select name="anal_cd" id="anal_cd">
								<option disabled selected>분석 카테고리 선택</option>
								<t:code-as-option group="ANAL" />
							</select>
						</div>
						<div class="form-field">
							<label for="anal_nm" class="form-required">분석명</label>
							<div class="form-inline">
								<input type="text" name="anal_nm" id="anal_nm" placeholder="분석명">
							</div>
						</div>
						<div class="form-field">
							<label for="anal_desc">분석 설명</label>
							<textarea name="anal_desc" id="anal_desc" placeholder="분석 설명" rows="3"></textarea>
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