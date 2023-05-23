import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminDataBoardRoute() {
	// Defination
	const $editor = $('#data_content');
	const dataContentField = $('#data_content');
	const $attFile = $('#att_file');
	const $attFileCurrent = $('#file_local_nm');

	// Initalize Kendo UI
	
	$editor.kendoEditor({
		tools: [
			'fontName', 'fontSize', 'foreColor', 'backColor' , 
			'bold', 'italic', 'underline', 'strikethrough',
			'justifyLeft', 'justifyCenter', 'justifyRight'
		]
	});

	const editor = $editor.data('kendoEditor');
	const chkAttFile = [(v, ov) =>  v !== '' && v !== null && v !== undefined || manager.formMode !== 'insert' || $("#file_id").val() !== '' && $("#file_id").val() !== null && $("#file_id").val() !== undefined, ' 필수입니다.'];
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: { 
			get: Constant.CONTEXT_PATH + '/admin/getDataBoards.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertDataBoard.do',
			update: Constant.CONTEXT_PATH + '/admin/updateDataBoard.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteDataBoard.do'
		},
		validator: new Validator({
			data_title: { required: true, maxLength: 100 },
			data_content: { required: true, maxLength: 10000  },
			att_file: { function: chkAttFile }
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
			if(currentRowData.data_content) {
				editor.value(unescapeHTML(currentRowData.data_content));
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

export default AdminDataBoardRoute;