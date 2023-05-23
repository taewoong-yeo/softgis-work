<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>자료실 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="data_id" data-fit>번호</th>
								<th data-field="data_title">제목</th>
								<th data-field="use_stat" data-fit>사용여부</th>
								<th data-field="reg_usr_id" data-fit>작성자</th>
								<th data-field="reg_dt" data-fit>등록일시</th>
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
							<label for="data_title" class="form-required">제목</label>
							<input name="data_title" id="data_title" placeholder="제목" >	
						</div>
						<div class="form-field">
							<label for="data_content" class="form-required">내용</label>
							<textarea id="data_content" name="data_content" rows="10" style="width:100%; height:250px"></textarea>
						</div>
						
						<div class="form-field">
							<label for="att_file" class="form-required">첨부파일</label>
							<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
							<span class="form-only-update u-margin-top-1 u-text-primary">
								※ 첨부파일을 수정할 때에만 선택하세요.
								<a id="file_local_nm" class="u-text-underline">(현재 업로드 된 첨부파일)</a>
							</span>
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