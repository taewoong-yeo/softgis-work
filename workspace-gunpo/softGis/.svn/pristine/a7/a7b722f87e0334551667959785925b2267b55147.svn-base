<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
	<div class="admin-wrap" style="margin: 0;">
		<h1>2022년 공공데이터 기업 매칭</h1>
		<div class="admin">
			<div class="admin-panel admin-form">
				<div class="admin-panel-inner">
					<form method="POST" class="form admin-form-el">
						<div class="form-field" style="margin: 0;">
							<label for="user_id">아이디를 입력하세요.</label>
							<input type="text" name="user_id" id="user_id" placeholder="사용자아이디" value="">
						</div>
						<div class="form-field" style="margin: 0;">
							<label for="id_save" class="switch" style="line-height: 33px;">
								<em style="font-style: inherit;">아이디 저장</em>
								<input type="checkbox" id="id_save" name="id_save" checked>
								<span style="margin-left: 10px;"></span>
							</label>
						</div>
						<div class="form-field">
							<label for="prj_cd">프로젝트를 선택하세요.</label>
							<select name="prj_cd" id="prj_cd" onChange="javascript:setPrjCombo(this.value);">
								<option disabled selected>프로젝트 선택</option>
								<t:code-as-option group="DBM" />
							</select>
						</div>
						<div class="form-field">
							<label for="svy_id">데이터를 선택하세요.</label>
							<select name="svy_id" id="svy_id" onChange="javascript:setSvyCombo(this.value);">
								<option disabled selected>데이터 선택</option>
								<t:code-as-option group="A130" />
							</select>
						</div>
						<div class="form-field">
							<label for="item_id">항목을 선택하세요.</label>
							<select name="item_id" id="item_id" onChange="javascript:setItemCombo(this.value);">
								<option disabled selected>항목 선택</option>
								<t:code-as-option group="A130" />
							</select>
						</div>
						<div class="form-field">
							<label for="img_file">사진 파일</label>
							<button>어플리케이션 열기</button>
							<input type="file" name="img_file" id="img_file" placeholder="첨부파일" >
						</div>
						<div class="form-field">
							<label for="item_remark">설명</label>
							<textarea id="item_remark" name="item_remark" rows="3"></textarea>
						</div>
						<button type="submit" class="form-submit">저장</button>
					</form>
				</div>
			</div>
		</div>
	</div>

<script type="text/javascript">

	const $form = $('form');
	let cookieName = "dbmIdSave";
	
	if (getCookie(cookieName) != undefined){
		$("#id_save").prop("checked", "checked");
		$("#user_id").val(getCookie(cookieName));
	};
	
	$form.on('submit', async (e, d) => {
		if (d === true) return d;
		e.preventDefault();
		
		const data = $form.serializeFlat();

		if ($("#id_save").is(":checked")){
			setCookie(cookieName,$form.find("#user_id").val(), 30);
		}else{
			delCookie(cookieName);
		};

		$form.trigger('submit', true);
	});
	
	function setPrjCombo(key) {
		clearOption();
		
		$.ajax({
			type: 'GET',
			url: Constant.CONTEXT_PATH + '/getCodes.do',
			data: {col: 'a.grp_id', con: key},
			success: function(data) {
				console.log(data);
				$.each(data.result, function(idx, item) {
					$('#svy_id').append('<option value="' + item.cd_id + '">' + item.cd_nm + '</option>');
				});
			}
		});
	}
	
	function setSvyCombo(key) {
		
	}
	
	function setItemCombo(key) {
		
	}
		    
	function clearOption() {
		$('#svy_id').html('<option disabled selected>데이터 선택</option>');
		$('#item_id').html('<option disabled selected>항목 선택</option>');
	}
	
	function setCookie(cookieName, value, days) {
		const exdate = new Date();
		exdate.setDate(exdate.getDate() + days);
		const cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
		document.cookie = cookieName + '=' + cookie_value;
	}

	function getCookie(cookieName) {
		const v = document.cookie.split(';');
		let x, y;
		for (let i = 0; i < v.length; i++) {
			x = v[i].substr(0, v[i].indexOf('='));
			y = v[i].substr(v[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, '');
			if (x == cookieName) return unescape(y);
		}
		return undefined;
	}
	
	function delCookie(cookieName) {
		 document.cookie = cookieName + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
	}
	
</script>

</t:base>
