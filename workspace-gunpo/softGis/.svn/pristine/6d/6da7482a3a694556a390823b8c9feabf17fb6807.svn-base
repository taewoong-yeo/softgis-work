<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>함께할지도 의견 신고 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="answer_id" data-fit>번호</th><!-- 게시글 순서에 상관없이  1.2.3.4.5 번으로 표출 부탁드립니다. -->
								<th name="test" style="overflow:hidden;" data-field="answer_title">의견내용</th>
								<th data-field="report_cnt" data-fit>의견 신고횟수</th>
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
							<label for="answer_title" class="form-required">의견내용</label>
							<input type="text" name="answer_title" id="answer_title" placeholder="의견내용" readonly="readonly">	
						</div>
					 
						<div class="form-field">
							<label for="report_cont" class="form-required">신고내용</label>
							<div class="report-content">
<!--  								<div class="report-content-row">  -->
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
<!-- 									<p class="width15">아이디</p>  -->
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
							</div>
						</div>
<!-- 						<button type="submit" class="form-submit">확인</button> 확인 입력시  해당되는 신고 테이블 전부 삭제 -->
<!-- 			 			<button type="submit" class="form-submit">삭제</button> 삭제 입력시  댓글 -->
			 			
			 			
						<button type="submit" class="form-submit">신고내용삭제</button>
						<button type="button" class="form-delete">의견삭제</button>
<!-- 						<button type="reset" class="form-reset">신규 입력</button> -->
						
						
			 		</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>