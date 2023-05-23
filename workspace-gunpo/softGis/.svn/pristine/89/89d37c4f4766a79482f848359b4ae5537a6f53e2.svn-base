import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminFaqRoute() {
	// Defination
//	const $editor = $('#faq_content');
	const faqContentField = $('#faq_content');
	const $attFile = $('#att_file');
	const $attFileCurrent = $('#file_local_nm');

	// Initalize Kendo UI
	
//	$editor.kendoEditor({
//		tools: [
//			'fontName', 'fontSize', 'foreColor', 'backColor' , 
//			'bold', 'italic', 'underline', 'strikethrough',
//			'justifyLeft', 'justifyCenter', 'justifyRight'
//		]
//	});

//	const editor = $editor.data('kendoEditor');

	//img_blob은 필수가 안 될 수도 있음
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: { 
			get: Constant.CONTEXT_PATH + '/admin/getfaq.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertFaq.do',
			update: Constant.CONTEXT_PATH + '/admin/updateFaq.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteFaq.do'
		},
		validator: new Validator({
			faq_title: { required: true, maxLength: 100 },
			faq_content: { required: true, maxLength: 10000  }
		}),
		overrideSubmitEvent: false
	});

	// Event Binding
	manager.grid.bind('change', onAdminDataManagerGridChange);
	manager.$form.on('submit', onAdminDataManagerSubmit); 

	function onAdminDataManagerGridChange(e) {
		const currentRowData = manager.currentRowData;

		$attFileCurrent.hide();

		if(currentRowData) {
			if(currentRowData.faq_content) {
				editor.value(unescapeHTML(currentRowData.faq_content));
			}

			if(currentRowData.file_local_nm) {
				$attFileCurrent.attr('href', Constant.CONTEXT_PATH + '/fileGet.do?fileId=' + currentRowData.file_id);
				$attFileCurrent.show();
			}
			
		} else {
			editor.value('');
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

export default AdminFaqRoute;