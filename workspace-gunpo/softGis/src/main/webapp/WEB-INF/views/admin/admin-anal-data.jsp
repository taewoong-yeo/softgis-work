<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:subapp>
	<div class="admin-wrap">
		<h1>분석데이터 관리</h1>
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
			</div>
		</div>
	</div>
</t:subapp>