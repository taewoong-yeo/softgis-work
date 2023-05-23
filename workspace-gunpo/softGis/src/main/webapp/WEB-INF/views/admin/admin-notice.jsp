<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>

<t:subapp>
	<div class="admin-wrap">
		<h1>공지사항 관리</h1>
		<div class="admin">
			<div class="admin-panel admin-grid">
				<div class="admin-panel-inner">
					<table class="admin-grid-el">
						<thead>
							<tr>
								<th data-field="noti_id" data-fit>공지번호</th>
								<th data-field="noti_type_nm" data-fit>공지유형</th>
								<th data-field="noti_title">공지제목</th>
								<th data-field="use_stat" data-fit>사용여부</th>
								<th data-field="noti_dt" data-fit>게시일자</th>
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
							<label for="noti_type" class="form-required">공지유형</label>
							<select name="noti_type" id="noti_type">
								<option disabled selected>공지유형 선택</option>
								<t:code-as-option group="NOTICE" />
							</select>
						</div>
						<div class="form-field">
							<label for="noti_title" class="form-required">공지제목</label>
							<input type="text" name="noti_title" id="noti_title" placeholder="공지제목" >	
						</div>
						<div class="form-field">
							<label for="noti_content" class="form-required">공지내용</label>
							<textarea id="noti_content" name="noti_content" rows="10" style="width:100%; height:250px"></textarea>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-6">
								<label for="img_blob_raw" class="form-required">이미지</label>
								<input type="file" name="img_blob_raw" id="img_blob_raw" placeholder="이미지" >
								<span class="form-only-update u-margin-top-1 u-text-primary">※ 이미지는 수정할 때에만 선택하세요.</span>
							</div>
							<div class="form-field col-6">
								<label>이미지 미리보기</label>
								<div class="img-preview">
									<div class="img-preview-placeholder">이미지를 선택하시면 미리보기가 표시됩니다.</div>
									<img alt="이미지 미리보기">
								</div>
							</div>
						</div>
						<div class="form-field">
							<label for="att_file">첨부파일</label>
							<input type="file" name="att_file" id="att_file" placeholder="첨부파일" >
							<span class="form-only-update u-margin-top-1 u-text-primary">
								※ 첨부파일을 수정할 때에만 선택하세요.
								<a id="file_local_nm" class="u-text-underline">(현재 업로드 된 첨부파일)</a>
							</span>
						</div>
						<div class="form-field form-field-inline">
							<label for="no_dt" class="form-required">게시일자</label>
						</div>
						<div class="row row-hspace-1">
							<div class="form-field col-2 form-field-inline">
								<label for="no_dt" class="switch">상시 <input type="checkbox" id="no_dt" name="no_dt"><span></span></label>
							</div>
							<div class="form-field col-5 form-field-inline">
								<label for="start_dt">시작일</label>
								<input id="start_dt" name="start_dt" placeholder="시작일" />
							</div>
							<div class="form-field col-5 form-field-inline">
								<label for="end_dt">종료일</label>
								<input id="end_dt" name="end_dt" placeholder="종료일 "/>
							</div>
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