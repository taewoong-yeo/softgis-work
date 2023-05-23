<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="admin-wrap">
		<h1>메타정보 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="mta_cat_nm">카테고리</th>
								<th data-field="mta_nm">데이터명</th>
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
						<div class="form-field">
							<label for="mta_cat" class="form-required">카테고리</label>
							<select name="mta_cat" id="mta_cat">
								<option disabled selected>카테고리 선택</option>
								<t:code-as-option group="DATA_CATE" />
							</select>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="mta_nm" class="form-required">메타데이터명</label>
								<input type="text" name="mta_nm" id="mta_nm" placeholder="메타데이터명">
							</div>
							<div class="form-field col-5 form-readonly-update">
								<label for="mta_tbl" class="form-required">테이블영문명</label>
								<input type="text" name="mta_tbl" id="mta_tbl" placeholder="테이블영문명">
							</div>
							<div class="form-field col-1">
								<label>&nbsp;</label>
								<input type="button" class="mta-tbl-edit" value="수정" >
							</div>
						</div>
						<div class="form-field">
							<label for="mta_desc" class="form-required">메타데이터 설명</label>
							<textarea name="mta_desc" id="mta_desc" placeholder="메타데이터 설명" rows="3"></textarea>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="mta_src" class="form-required">출처</label>
								<input type="text" name="mta_src" id="mta_src" placeholder="출처">
							</div>
							<div class="form-field col-5 form-readonly-update">
								<label for="mta_gther" class="form-required">수집형태</label>
								<select name="mta_gther" id="mta_gther">
									<option disabled selected>수집형태 선택</option>
									<t:code-as-option group="DATA_GTHER" />
								</select>
							</div>
							<div class="form-field col-1">
								<label>&nbsp;</label>
								<input type="button" class="mta-gther-edit" value="수정" >
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="mta_url">수집 URL</label>
								<input type="text" name="mta_url" id="mta_url" placeholder="수집 URL">
							</div>
							<div class="form-field col-6">
								<label for="mta_apikey">API Key</label>
								<input type="text" name="mta_apikey" id="mta_apikey" placeholder="API Key">
							</div>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="mta_dept">담당부서</label>
								<input type="text" name="mta_dept" id="mta_dept" placeholder="담당부서">
							</div>
							<div class="form-field col-5 form-readonly-update">
								<label for="mta_fcly" class="form-required">수집주기</label>
								<select name="mta_fcly" id="mta_fcly">
									<option disabled selected>수집주기 선택</option>
									<t:code-as-option group="DATA_FCLY" />
								</select>
							</div>
							<div class="form-field col-1">
								<label>&nbsp;</label>
								<input type="button" class="mta-fcly-edit" value="수정" >
							</div>
						</div>
						<div class="form-field">
							<label for="remark">비고</label>
							<input type="text" name="remark" id="remark" placeholder="비고">
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-2">
								<label for="use_stat">사용여부</label>
								<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
							</div>
							<div class="form-field col-2">
								<label for="open_in_stat">내부공개 여부</label>
								<label for="open_in_stat" class="switch"><input type="checkbox" id="open_in_stat" name="open_in_stat" checked><span></span></label>
							</div>
							<div class="form-field col-2">
								<label for="open_out_stat">외부공개 여부</label>
								<label for="open_out_stat" class="switch"><input type="checkbox" id="open_out_stat" name="open_out_stat" checked><span></span></label>
							</div>
							<div class="form-field col-2">
								<label for="down_stat">다운로드 여부</label>
								<label for="down_stat" class="switch"><input type="checkbox" id="down_stat" name="down_stat" checked><span></span></label>
							</div>
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