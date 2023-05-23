import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminCmmntyListRoute() {

	const $submitButton = $(".form-submit");
	$submitButton.hide();
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'), 
		$form: $('.admin-form-el'), 
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getCmmntyMapngAnswer.do', 
			insert: Constant.CONTEXT_PATH + '/admin/insertCmmntyMapngAnswer______.do',
			update: Constant.CONTEXT_PATH + '/admin/updateCmmntyMapngAnswer.do', 
			delete: Constant.CONTEXT_PATH + '/admin/deleteCmmntyMapngAnswer.do'	//추후 변동 예정
		},
	/*	validator: new Validator({
			faq_title: { required: true, maxLength: 100 },
			faq_content: { required: true, maxLength: 10000  },
			start_dt: { required: true, maxLength: 14, regex: VALIDATOR_DATE_REGEX_RULE },
		}),*/ 

//		validator: { 
//			'update': new Validator({
//				report_cont: { required: true }
//			}),
//		},
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
		$submitButton.show();
		const currentRowData = manager.currentRowData;
		  
		if (currentRowData !=undefined){

			try{

				let answer_id = currentRowData.answer_id;
//				let mapng_id = currentRowData.mapng_id;
				
				$(".report-content").empty(); 

				$.post({
					url: Constant.CONTEXT_PATH + '/admin/getCmmntyMapngAnswerReport.do'
					, data: {answer_id: answer_id } 
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
			
			
			$submitButton.text('신고내용삭제'); 
			
		}
	}


	async function onAdminDataManagerSubmit(e) { 
		e.preventDefault();
		

		if(!confirm('신고내용을 삭제하시겠습니까?'))
			return;
		  
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
			

			$(".report-content").empty(); 
			
		}
	}
	
	function unescapeHTML(string) {
		const elt = document.createElement('span');
		elt.innerHTML = string;

		return elt.innerText;
	}

}

export default AdminCmmntyListRoute;