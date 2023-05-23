import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminNoticeRoute() {
	// Defination
	const $datepicker = $('#start_dt');
	const $datepickerend = $('#end_dt');
	const $editor = $('#noti_content');

	const $notiContentField = $('#noti_content').closest('.form-field');
	const $imgBlobField = $('#img_blob_raw').closest('.form-field');
	const $imgPreviewField = $('.img-preview').closest('.form-field');
	const $attFileField = $('#att_file').closest('.form-field');

	const $notiType = $('#noti_type');
	const $imgBlob = $('#img_blob_raw');
	const $imgPreview = $('.img-preview img');
	const $imgPreviewPlaceholder = $('.img-preview-placeholder');
	const $attFile = $('#att_file');
	const $attFileCurrent = $('#file_local_nm');
	const $noDt = $('#no_dt');

	// Initalize Kendo UI
	$datepicker.kendoDatePicker(Constant.KENDO_DEFAULT_DATEPICKER_OPTION);
	$datepickerend.kendoDatePicker(Constant.KENDO_DEFAULT_DATEPICKER_OPTION);

	
	$editor.kendoEditor({
		tools: [
			'fontName', 'fontSize', 'foreColor', 'backColor' , 
			'bold', 'italic', 'underline', 'strikethrough',
			'justifyLeft', 'justifyCenter', 'justifyRight'
		]
	});

	const datepicker = $datepicker.data('kendoDatePicker');
	const datepickerend = $datepickerend.data('kendoDatePicker');
	const editor = $editor.data('kendoEditor');

	// Initalize Admin Data Manager
	const validatorNotiContent = [(v, ov) => !['GNR', 'FIX'].includes($notiType.val()) || (v !== '' && v !== null && v !== undefined), '은(는) 필수 입력 값입니다.'];
	const validatorImgBlob = [(v, ov) => $notiType.val() !== 'POP' || (ov !== '' && ov !== null && ov !== undefined), '은(는) 필수 입력 값입니다.'];
	
	//img_blob은 필수가 안 될 수도 있음

	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getNotices.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertNotice.do',
			update: Constant.CONTEXT_PATH + '/admin/updateNotice.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteNotice.do'
		},
		validator: new Validator({
			noti_type: { required: true, maxLength: 10 },
			noti_title: { required: true, maxLength: 100 },
			noti_content: { function: validatorNotiContent },
			img_blob: { function: validatorImgBlob }
		}),
		formAjaxOption: {
			fieldNames: {
				img_blob: '이미지'
			}
		},
		overrideSubmitEvent: false
	});

	// Event Binding
	manager.grid.bind('change', onAdminDataManagerGridChange);
	manager.$form.on('submit', onAdminDataManagerSubmit);
	$notiType.on('change', onNoticeTypeChange);
	$imgBlob.on('change', onImageInputChange);
	$noDt.on('change', onNoticeDtChange.bind(this));
	
	// Run Once
	setState();

	function onAdminDataManagerGridChange(e) {
		const currentRowData = manager.currentRowData;

		$imgPreview.hide();
		$imgPreviewPlaceholder.show();
		
		$attFileCurrent.hide();
		
		if(currentRowData) {
			if(currentRowData.noti_content) {
				editor.value(unescapeHTML(currentRowData.noti_content));
			}
			
			if(currentRowData.img_blob) {
				$imgPreview.attr('src', currentRowData.img_blob);
				$imgPreview.show();
				$imgPreviewPlaceholder.hide();
			}
			if(currentRowData.file_local_nm) {
				$attFileCurrent.attr('href', Constant.CONTEXT_PATH + '/fileGet.do?fileId=' + currentRowData.file_id);
				$attFileCurrent.show();
			}
			
			if(!currentRowData.start_dt || !currentRowData.end_dt){
				$noDt.prop("checked","checked");
				initNotiDt(false);
			}else{
				initNotiDt(true);
			}
			datepicker.value(new Date(currentRowData.start_dt));
			datepickerend.value(new Date(currentRowData.end_dt));
			
			setState(currentRowData.noti_type);
		} else {
			editor.value('');
			initNotiDt(true);
			
			setState();
		}
	}

	async function onAdminDataManagerSubmit(e) {
		e.preventDefault();
		
		if(!validatorNotiDt()){
			return;
		}
		
		const formData = new FormData();

		const rawData = manager.$form.serializeFlat();
		const cvtData = manager.formAjax.getMappingFormData(rawData);
		const oldData = manager.formAjax.getMappingFormData(manager.formAjax.prependData);
		const mergedData =  $.extend({}, oldData, cvtData);
		
		for(const key in mergedData) {
			if(key !== 'img_blob_raw' && key !== 'att_file' && !($noDt.is(":checked") && (key == 'start_dt' || key == 'end_dt')))
				formData.append(key, mergedData[key]);
		}

		if(mergedData.att_file) {
			formData.append('att_file', $attFile.get(0).files[0]);
		}

		manager.formAjax.ajaxOption = {
			data: formData,
			contentType: false,
			processData: false
		};

		const result = await manager.formAjax.submit();

		if(result !== false) {
			manager.$form.trigger('submitAjax', [result]);
		}
	}

	function onNoticeTypeChange(e) {
		setState($notiType.val());
	}

	async function onImageInputChange(e) {
		const files = $imgBlob.get(0).files;
		
		if(files.length > 0) {
			Loading.show();
			
			try {
				const reader = new FileReaderAsync();
				const result = await reader.readAsDataURL(files[0]);
				
				$imgPreviewPlaceholder.hide();

				$imgPreview.attr('src', result);
				$imgPreview.show();
				
				manager.formAjax.prependData['img_blob'] = result;
			} finally {
				Loading.hide();
			}
		}
	}
	
	function setState(type) {
		switch(type) {
			case 'POP':
				$notiContentField.hide();
				$imgBlobField.show();
				$imgPreviewField.show();
				$attFileField.hide();
				break;
			case 'GNR':
			case 'FIX':
				$notiContentField.show();
				$imgBlobField.hide();
				$imgPreviewField.hide();
				$attFileField.show();
				break;
			default:
				$notiContentField.hide();
				$imgBlobField.hide();
				$imgPreviewField.hide();
				$attFileField.hide();
				break;
		}
	}

	function unescapeHTML(string) {
		const elt = document.createElement('span');
		elt.innerHTML = string;

		return elt.innerText;
	}
	
	//상시 선택
	function onNoticeDtChange(e){
		e.preventDefault();

		const $this = $(e.currentTarget);
		initNotiDt(!$this.is(":checked"));
	}
	
	function validatorNotiDt(){
		if(!$noDt.is(":checked")){
			if($('#start_dt').val() == null || $('#end_dt').val() == null){
				alert("게시일자를 선택/입력 하세요.");
				return false;
			}else if($('#start_dt').val().length != 10 || $('#end_dt').val().length != 10){
				alert("게시일자를 입력 하세요.");
				return false;
			}else{
				var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
				
				if(!regex.test($('#start_dt').val()) || !regex.test($('#end_dt').val())){
					alert("게시일자의 유형이 맞지않습니다.");
					return false;
				}
			}
		}
		return true;
	}
	
	function initNotiDt(bStat){
		//datepicker.value(null);
		//datepickerend.value(null);
		$('#start_dt').val(null);
		$('#end_dt').val(null);
		datepicker.enable(bStat);
    	datepickerend.enable(bStat);
    	$noDt.prop("checked", !bStat);
	}
}

export default AdminNoticeRoute;