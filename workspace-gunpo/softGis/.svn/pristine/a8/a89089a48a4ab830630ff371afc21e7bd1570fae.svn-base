<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>데이터 관리</h1>
		<form action="<c:url value="/reloadTest.do" />" method="POST" id="RELOAD" style="position: fixed; right: 1.42857rem;">
			<button class="btn btn-dark">지오서버 리로드</button>
		</form>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="mta_cat_nm">카테고리</th>
								<th data-field="mta_nm">메타데이터명</th>
								<th data-field="mta_upt_date">데이터 갱신일</th>
								<th data-field="mta_fcly_nm" data-fit>수집주기</th>
								<th data-field="mta_tbl" data-fit>테이블 이름</th>
								<th data-field="use_stat" data-fit>사용여부</th>
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
							<div class="form-field col-6">
								<label for="mta_nm" class="form-required">메타데이터명</label>
								<input type="text" name="mta_nm" id="mta_nm" placeholder="메타데이터명" readonly>
							</div>
							<div class="form-field col-6">
								<label for="mta_tbl" class="form-required">테이블명</label>
								<input type="text" name="mta_tbl" id="mta_tbl" placeholder="테이블명" readonly>
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6 form-readonly-insert form-readonly-update">
								<label for="mta_fcly" class="form-required">수집주기</label>
								<select name="mta_fcly" id="mta_fcly">
									<option disabled selected>수집주기 선택</option>
									<t:code-as-option group="DATA_FCLY" />
								</select>
							</div>
							<div class="form-field col-6 form-readonly-insert form-readonly-update">
								<label for="mta_gther" class="form-required">수집형태</label>
								<select name="mta_gther" id="mta_gther">
									<option disabled selected>수집형태 선택</option>
									<t:code-as-option group="DATA_GTHER" />
								</select>
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="mta_url" class="form-required">수집 URL</label>
								<input type="text" name="mta_url" id="mta_url" placeholder="수집 URL" onClick="this.setSelectionRange(0, this.value.length);" readonly>
							</div>
							<div class="form-field col-6">
								<label for="mta_apikey">API Key</label>
								<input type="text" name="mta_apikey" id="mta_apikey" placeholder="API Key" readonly>
							</div>
						</div>
						<div class="form-field">
							<label class="form-required">데이터 목록</label>
							<div class="admin-loader"></div>
						</div>
						<button type="reset" class="form-reset">선택 해제</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>