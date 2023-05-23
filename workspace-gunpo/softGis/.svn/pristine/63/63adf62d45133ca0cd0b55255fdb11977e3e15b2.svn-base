<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>함께할지도 신고 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="mapng_id" data-fit>번호</th>
								<th data-field="cd_nm" data-fit>카테고리</th>
								<th name="test" style="overflow:hidden;" data-field="mapng_title">매핑제목</th>
								<th data-field="report_cnt" data-fit>신고횟수</th>
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
<!-- 							<input type="text" name="mapng_title" id="mapng_title" placeholder="카테고리" readonly="readonly">	 -->
							
							<select name="cat_cd" id="cat_cd" readonly="readonly">
								<option disabled selected>카테고리 유형 선택</option>
								<t:code-as-option group="DATA_CATE"/>
							</select>
							
						</div>
						<div class="form-field">
<!-- 							<label for="cat_cd" class="form-required">매핑제목</label> -->
<!-- 							<input type="text" name="mapng_title" id="mapng_title" placeholder="매핑제목" readonly="readonly">	 -->
							
							
							<label for="mapng_title" class="form-required">매핑제목</label>
							<input type="text" name="mapng_title" id="mapng_title" placeholder="매핑제목" readonly="readonly">	
							<!-- <input type="text" name="mapng_id" id="mapng_id" placeholder="매핑번호" readonly="readonly">	-->
						</div>
					 
						<div class="form-field">
							<label for="report_cont" class="form-required">신고내용</label>
							<div class="report-content">
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">신고이유여유</p> -->
<!-- 									<p class="width15">2022.11.03</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div> -->
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">다른문장이면</p> -->
<!-- 									<p class="width15">2022.11.02</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div> -->
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">이렇게 된답니다.</p> -->
<!-- 									<p class="width15">2022.11.02</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div> -->
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">참</p> -->
<!-- 									<p class="width15">2022.11.01</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div>  -->
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">쉽죠?</p> -->
<!-- 									<p class="width15">2022.10.31</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div> -->
<!-- 								<div class="report-content-row"> -->
<!-- 									<p class="width70">글이 길어지는게 걱정되신다구요? 이렇게 됩니다! 걱정끝! 스트레스 노!</p> -->
<!-- 									<p class="width15">2022.10.31</p> -->
<!-- 									<p class="width15">아이디</p> -->
<!-- 								</div> -->
							</div>
						</div>
						
						<div class="form-field">
							<label for="report_cont" class="form-required">신고사유</label>
							<input type="text" name="report_cont" id="report_cont" placeholder="신고사유">	
						</div>
						
						<button type="submit" class="form-submit">삭제</button>
			 		</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>