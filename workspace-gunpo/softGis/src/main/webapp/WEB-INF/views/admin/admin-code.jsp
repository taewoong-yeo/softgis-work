<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="admin-wrap">
		<h1>코드 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el-group">
						<thead>
							<tr>
								<th data-field="grp_id">그룹코드</th>
								<th data-field="grp_nm">그룹코드명</th>
								<th data-field="grp_desc">그룹코드설명</th>
								<th data-field="use_stat" data-fit>사용유무</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="grp_id">그룹코드</th>
								<th data-field="cd_id">코드</th>
								<th data-field="cd_nm">코드명</th>
								<th data-field="cd_desc">코드설명</th>
								<th data-field="ord">코드순번</th>
								<th data-field="use_stat" data-fit>사용유무</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
			<div class="admin-panel admin-form">
				<div class="admin-button-array">
					<button type="button" id="btn_group" class="btn btn-primary">그룹코드</button>
					<button type="button" id="btn_code" class="btn btn-primary-border left">코드</button>
				</div>
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el group">
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="grp_id" class="form-required">그룹코드</label>
								<div class="form-inline form-readonly-update">
									<input type="text" name="grp_id" id="grp_id" placeholder="그룹코드">
								</div>
							</div>
							<div class="form-field col-6">
								<label for="grp_nm" class="form-required">그룹코드명</label>
								<input type="text" name="grp_nm" id="grp_nm" placeholder="그룹코드명">
							</div>
						</div>
						<div class="form-field">
							<label for="grp_desc">그룹코드 설명</label>
							<textarea name="grp_desc" id="grp_desc" placeholder="그룹코드 설명" rows="3"></textarea>
						</div>
						<div class="form-field form-field-inline">
							<label for="use_stat">사용여부</label>
							<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
						</div>
						<button type="submit" class="form-submit">등록</button>
						<button type="button" class="form-delete">삭제</button>
						<button type="reset" class="form-reset">신규 입력</button>
					</form>
					
					<form method="POST" class="form admin-form-el code">
						<div class="form-field">
							<label for="grp_id2" class="form-required">그룹코드</label>
							<div class="form-inline">
								<input type="text" name="grp_id" id="grp_id2" placeholder="그룹코드" readonly>
								<button type="button" id="grp_id_selection" class="btn btn-primary">찾기</button>
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field form-readonly-update col-6">
								<label for="cd_id" class="form-required">코드</label>
								<input type="text" name="cd_id" id="cd_id" placeholder="코드">
							</div>
							<div class="form-field col-6">
								<label for="cd_nm" class="form-required">코드명</label>
								<input type="text" name="cd_nm" id="cd_nm" placeholder="코드명">
							</div>
						</div>
						<div class="form-field">
							<label for="cd_desc" class="form-required">코드 설명</label>
							<textarea name="cd_desc" id="cd_desc" placeholder="코드 설명" rows="3"></textarea>
						</div>
						<div class="form-field">
							<label for="ord" class="form-required">코드 순서</label>
							<input type="text" name="ord" id="ord" placeholder="코드 순서">
						</div>
						<div class="form-field form-field-inline">
							<label for="use_stat1">사용여부</label>
							<label for="use_stat1" class="switch"><input type="checkbox" id="use_stat1" name="use_stat" checked><span></span></label>
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