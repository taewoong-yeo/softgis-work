<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>함께할지도 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="mapng_id" data-fit>번호</th>
								<th data-field="cd_nm" data-fit>카테고리 유형</th>
								<th name="test" style="overflow:hidden;" data-field="mapng_title">제목</th>
								<th data-field="start_dt" data-fit>시작일자</th>
								<th data-field="end_dt" data-fit>마감일자</th>
								<th data-field="use_stat" data-fit>사용여부</th>
								<th data-field="mapng_use_stat" data-fit>지도여부</th>
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
							<label for="cat_cd" class="form-required">카테고리</label>
							<select name="cat_cd" id="cat_cd" readonly="readonly">
								<option disabled selected>카테고리 유형 선택</option>
								<t:code-as-option group="DATA_CATE"/>
							</select>
						</div>
					 
						<div class="form-field">
							<label for="noti_title" class="form-required">제목</label>
							<input type="text" name="mapng_title" id="mapng_title" placeholder="공지제목" readonly="readonly">	
							<input type="hidden" name="mapng_id" id="mapng_id" placeholder="공지번호" readonly="readonly">	
						</div>
						<div class="form-field form-field-inline">
							<label for="use_stat">사용여부</label>
							<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
						</div>
						
							<button type="submit" class="form-submit">수정</button>
			 		</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>