<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
	<div class="dbm">
		<div class="title">공공데이터 기업 매칭 지원사업</div>
		<div class="sub-title">${site_nm}</div>
		<div class="panel-inner">
			<input type="hidden" name="site_id" id="site_id" value="${site}">
			<input type="hidden" name="data_tbl" id="data_tbl" value="">
			<div class="row form-field">
				<label for="user_id">조사자 이름을 입력하세요.</label>
				<div class="col-8">
					<input type="text" name="user_id" id="user_id" placeholder="이름 입력" value="">
				</div>
				<div class="col-4 usr_info">
					<label for="id_save" class="switch">
						<em>기억하기</em>
						<input type="checkbox" id="id_save" name="id_save" checked>
						<span></span>
					</label>
				</div>
			</div>
			<div class="row form-field">
				<label for="data_id">조사 데이터를 선택하세요.</label>
				<select name="data_id" id="data_id">
					<option disabled selected value="">조사 데이터 선택</option>
					<t:code-as-option group="${site}" />
				</select>
			</div>
			<div class="row form-field">
				<label>조사 항목을 선택하세요.</label>
				<div class="col-2">
					<input type="text" name="item_1" id="item_1" placeholder="항목1" readonly>
				</div>
				<div class="col-3">
					<input type="text" name="item_2" id="item_2" placeholder="항목2" readonly>
				</div>
				<div class="col-4">
					<input type="text" name="item_3" id="item_3" placeholder="항목3" readonly>
				</div>
				<div class="col-3 item_id_selection">
					<button type="button" id="item_id_selection" class="btn btn-primary">찾기</button>
				</div>
			</div>
			<div class="row form-field">
				<label for="img_file">사진 파일</label>
				<button type="submit" id="app_exec" class="btn">어플리케이션 열기</button>
				<input type="file" name="img_file" id="img_file" placeholder="첨부파일" >
			</div>
			<div class="row form-field">
				<label for="item_remark">설명</label>
				<textarea id="item_remark" name="item_remark" rows="3"></textarea>
			</div>
			<button type="submit" class="form-submit">저장</button>
		</div>
	</div>

<link rel="stylesheet" type="text/css" href="<c:url value='/assets/css/dbm.css' />">

</t:base>
