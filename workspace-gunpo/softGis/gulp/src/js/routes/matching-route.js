import { Validator, VALIDATOR_DATE_REGEX_RULE, VALIDATOR_PHONE_REGEX_RULE } from '../shared/validator';
import FormSelectionDialog from '../shared/form-selection-dialog';

function MatchingRoute() {
	
	let dialog = null;
	
	$('#item_id_selection').on('click', (e) => {
		e.preventDefault();
		
		let data_tbl = $('#data_tbl').val();
		if (data_tbl == '') return;
		
		initDailog(data_tbl).done(function(result) {
			if(result != null) dialog.open();
		});
	});
	
	function initDailog(data_tbl) {
		var deferred = $.Deferred();
		
		dialog = new FormSelectionDialog({
			type: 'GET',
			url: encodeURI(Constant.CONTEXT_PATH + '/getMatchingItemList.do' + '?data_tbl=' + data_tbl),
			columnMapping: {
				'item_1': $('#item_1'),
				'item_2': $('#item_2'),
				'item_3': $('#item_3'),
			},
			kendoGridOption: {
				columns: [
					{ field: 'item_1', title: '항목1', attributes: { style: "text-align: center" } },
					{ field: 'item_2', title: '항목2' },
					{ field: 'item_3', title: '항목3' },
					{ field: 'item_4', title: '항목4' }
				],
				dataSource: {
					pageSize: 10
				}
			},
			kendoDialogOption: {
				title: '조사항목 찾기',
				width: '95%'
			}
		});
		
		deferred.resolve(dialog);
		
		return deferred.promise();
	}

	var $form = $('form');
	var cookieName = "dbmIdSave";
	var $dataCombo = $('#data_id');
	var $appExec = $('#app_exec');
	
	var androidAppLink = "landnavi://";
	var androidIntentUrl = "intent://scan/#Intent;scheme=redpigScheme;package=com.android.chrome;end";
	var iosAppLink = "landnavi://";
	var playStorePrefix = "market://details?id=com.infoseed.geopic&hl=ko";
	var appStorePrefix = "https://apps.apple.com/kr/app/geo-pic/id1510582820";
	var ua = navigator.userAgent;
	var supportDevicesRegEx = /Android|iPhone|iPad/i;
	var supportDevice = ua.match(supportDevicesRegEx);
	
	initCookie();
	
	$dataCombo.on('click', changeDataCombo);
	$appExec.on('click', appExec);
	
	
	function appExec(e) {
		e.preventDefault();
		
		setTimeout( function() { 
        	window.open("landnavi://survey?prj_cd=DV\&svy_id=1\&item_id=1\&usr_id=aaa@naver.com"); 
        }, 1000);
	}
	
	function changeDataCombo(e) {
		e.preventDefault();
		
		let key = this.value;
		if (key == '') {
			$('#data_tbl').val('');
			return;
		} else {
			$('#data_tbl').val($('#site_id').val() + '_' + this.value);
		}
	}
	
	function changeItemCombo(e) {
		e.preventDefault();
		
		let key = this.value;
		if (key == '') return;
	}
	
	$form.on('submit', (e, d) => {
		if (d === true) return d;
		e.preventDefault();
		
		const data = $form.serializeFlat();
		
		cookieSaveCheck();
		
		$form.trigger('submit', true);
	});
	
	function setCookie(cookieName, value, days) {
		const exdate = new Date();
		exdate.setDate(exdate.getDate() + days);
		const cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
		document.cookie = cookieName + '=' + cookie_value;
	}

	function initCookie() {
		if (getCookie(cookieName) != undefined){
			$("#id_save").prop("checked", "checked");
			$("#user_id").val(getCookie(cookieName));
		};
	}
	
	function cookieSaveCheck() {
		if ($("#id_save").is(":checked")) {
			setCookie(cookieName, $form.find("#user_id").val(), 30);
		}else{
			delCookie(cookieName);
		};
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

}

export default MatchingRoute;