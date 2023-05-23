<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>QNA 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="qna_id" data-fit>번호</th>
								<th data-field="qna_title">제목</th>
								<th data-field="reg_dt" data-fit>등록일시</th>
								<th data-field="reply_yn" data-fit>답변여부</th>
								<th data-field="use_stat" data-fit>사용 여부</th>
								<th data-field="open_yn" data-fit>공개 여부</th>
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
							<label for="qna_title" class="form-required">제목</label>
							<input name="qna_title" id="qna_title" placeholder="제목" readonly="readonly">	
						</div>
						<div class="form-field">
							<label for="qna_content" class="form-required">내용</label>
							<textarea id="qna_content" name="qna_content" rows="10" style="width:100%; height:150px" readonly="readonly"></textarea>
						</div>
						
						<!-- <div class="form-field">
							<label for="att_file">첨부파일</label>
							<span class="form-only-update u-margin-top-1 u-text-primary">
								<a id="file_local_nm" class="u-text-underline">(사용자 업로드한 된 첨부파일)</a>
							</span>
						</div>
						 -->
						
						<div class="form-field">
							<label for="reply_content" class="form-required">내용</label>
							<textarea id="reply_content" name="reply_content" rows="10" style="width:100%; height:150px"></textarea>
						</div>
						
						<!-- <div class="form-field">
							<label for="att_file">첨부파일</label>
							<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
							<span class="form-only-update u-margin-top-1 u-text-primary">
								※ 첨부파일을 수정할 때에만 선택하세요.
								<a id="file_local_nm" class="u-text-underline">(현재 업로드 된 첨부파일)</a>
							</span>
						</div>
						 -->
						<!-- 
						<div class="form-field">
							<label for="att_file">첨부파일</label>
							<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
							<span class="form-only-update u-margin-top-1 u-text-primary">
								※ 첨부파일을 수정할 때에만 선택하세요.
								<a id="file_local_nm" class="u-text-underline">(현재 업로드 된 첨부파일)</a>
							</span>
						</div> -->
						<div class="form-field form-field-inline">
							<label for="use_stat">사용여부</label>
							<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
						</div>
						
						<div class="form-field form-field-inline">
							<label for="open_yn">공개 여부</label>
							<label for="open_yn" class="switch"><input type="checkbox" id="open_yn" name="open_yn" checked disabled /><span></span></label>
						</div>
						
						<button type="submit" class="form-submit">수정</button>
						<button type="button" class="form-delete">삭제</button>
					<!-- 	<button type="reset" class="form-reset">신규 입력</button> -->
					</form>
				</div>
			</div>
		</div>
	</div>
</t:subapp>