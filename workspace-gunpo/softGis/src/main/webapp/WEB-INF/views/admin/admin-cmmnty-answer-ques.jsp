<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>질문 응답 조회</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="mapng_id" data-fit>번호</th>
								<th style="overflow:hidden;" data-field="mapng_title">함께할지도 제목</th>
								<th data-field="answer_cnt" data-fit>응답수</th>
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
							<label for="mapng_title" class="form-required">제목</label>
							<input type="text" name="mapng_title" id="mapng_title" placeholder="의견내용" readonly="readonly">	
						</div>
					 
						<div class="form-field">
							<label for="report_cont" class="form-required"></label>
							<div class="report-content">
							</div>
						</div>
			 		</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>