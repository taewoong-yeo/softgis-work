import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminQnaRoute() {
	// Defination
	const $editor = $('#reply_content');
	const $attFileField = $('#att_file').closest('.form-field');

	const $attFile = $('#att_file');
	const $attFileCurrent = $('#file_local_nm');
	
	const $submitButton = $(".form-submit");
	$submitButton.hide();
/*
	$editor.kendoEditor({
		tools: [
			'fontName', 'fontSize', 'foreColor', 'backColor' , 
			'bold', 'italic', 'underline', 'strikethrough',
			'justifyLeft', 'justifyCenter', 'justifyRight'
		]
	});
	const editor = $editor.data('kendoEditor');
	
	//$editor.parent().css('height', $('.k-editable-area iframe').contents().height() + 30);
*/
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: { 
			get: Constant.CONTEXT_PATH + '/admin/getQna.do',
			insert: Constant.CONTEXT_PATH + '',
			update: Constant.CONTEXT_PATH + '/admin/updateQna.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteQna.do'
		},
		validator: new Validator({
			reply_content: { required: true, maxLength: 1000 }
		}),
		formAjaxOption: {
			valueMapping: {
				use_stat: 'YN'
				, open_yn: 'YN'
			}
		},
		overrideSubmitEvent: false
	});
	
	// Event Binding
	manager.grid.bind('change', onAdminDataManagerGridChange);
	manager.$form.on('submit', onAdminDataManagerSubmit);

	function onAdminDataManagerGridChange(e) {
		$submitButton.show();
		const currentRowData = manager.currentRowData;
		if(currentRowData) {
			if(currentRowData.reply_content) {
				//editor.value(unescapeHTML(currentRowData.reply_content));
				$editor.val(unescapeHTML(currentRowData.reply_content));
			}
		}else{
			//editor.value('');
			$editor.val("");
		}
	}


	async function onAdminDataManagerSubmit(e) {
		e.preventDefault();
		
		const formData = new FormData();

		const rawData = manager.$form.serializeFlat();
		const cvtData = manager.formAjax.getMappingFormData(rawData);
		const oldData = manager.formAjax.getMappingFormData(manager.formAjax.prependData);
		const mergedData =  $.extend({}, oldData, cvtData);
		
		for(const key in mergedData) {
			if(key !== 'img_blob_raw' && key !== 'att_file')
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
	
	function unescapeHTML(string) {
		const elt = document.createElement('span');
		elt.innerHTML = string;

		return elt.innerText;
	}

}

export default AdminQnaRoute;