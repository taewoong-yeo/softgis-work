import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminCmmntyListRoute() {
	// Defination
	const $datepicker = $('#start_dt');
	const $editor = $('#faq_content'); 
	const faqContentField = $('#faq_content');
	// Initalize Kendo UI

	const datepicker = $datepicker.data('kendoDatePicker');
	const editor = $editor.data('kendoEditor'); 

	//img_blob은 필수가 안 될 수도 있음 admin_admin-cmmnty-answer-report
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'), 
		$form: $('.admin-form-el'), 
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getCmmntyReport.do', 
			insert: Constant.CONTEXT_PATH + '/admin/insertFaq.do',
			update: Constant.CONTEXT_PATH + '/admin/updateCmmntyReport.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteCmmnty.do'
		},
	/*	validator: new Validator({
			faq_title: { required: true, maxLength: 100 },
			faq_content: { required: true, maxLength: 10000  },
			start_dt: { required: true, maxLength: 14, regex: VALIDATOR_DATE_REGEX_RULE },
		}),*/ 

		validator: { 
			'update': new Validator({
				report_cont: { required: true }
			}),
		},
		messages: {
			updateConfirm: '신고사유를 입력하시겠습니까?'
		},
		formAjaxOption: {
			valueMapping: {
				use_stat: 'YN'
				, mapng_use_stat: 'YN'
			}
		},
		overrideSubmitEvent: false
	});
 
	// Event Binding
	manager.grid.bind('change', onAdminDataManagerGridChange);
	manager.$form.on('submit', onAdminDataManagerSubmit); 

	function onAdminDataManagerGridChange(e) { 
		const currentRowData = manager.currentRowData;
		  
		if (currentRowData !=undefined){

			try{

				let mapng_id = currentRowData.mapng_id;
				
				$(".report-content").empty(); 

				$.post({
					url: Constant.CONTEXT_PATH + '/admin/getCmmntyAnswerReport.do'
					, data: {mapng_id: mapng_id } 
					, dataType: 'json'   
					, async: true
					, success: function(d) {
						let report_html="";
						for(let i=0;i<d.result.length; i++ ){
							let report_cont = d.result[i].report_cont;
							let reg_usr_id = d.result[i].reg_usr_id;
							let reg_dt = d.result[i].reg_dt;
							report_html = report_html + '<div class="report-content-row"><p class="width70">'+report_cont+'</p><p class="width15">'+reg_dt+'</p><p class="width15">'+reg_usr_id+'</p></div>';
						}
						
						$(".report-content").html(report_html);
					}
				});
			}catch (error) {
				  console.error(error);
			}
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

export default AdminCmmntyListRoute;