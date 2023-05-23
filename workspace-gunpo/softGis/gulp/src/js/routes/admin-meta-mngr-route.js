import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';

function AdminMetaMngrRoute() {

	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getMetadatas.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertMetadata.do',
			update: Constant.CONTEXT_PATH + '/admin/updateMetadata.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteMetadata.do'
		},
		validator: new Validator({
			mta_cat: { required: true },
			mta_nm: { required: true, maxLength: 50, collision: Constant.CONTEXT_PATH + '/admin/checkMetadataNameCollision.do' },
			mta_desc : {maxLength: 255},
			mta_tbl: { required: true, maxLength: 63, collision: Constant.CONTEXT_PATH + '/admin/checkMetadataTableCollision.do' },
			mta_src: { required: true, maxLength: 100 },
			mta_gther: { required: true },
			mta_url: { maxLength: 255 },
			mta_fcly: { required: true },
			mta_dept: { maxLength: 50 },
			remark: { maxLength: 255 }
		}),
		formAjaxOption: {
			valueMapping: {
				use_stat: 'YN'
				, open_in_stat: 'YN'
				, open_out_stat: 'YN'
				, down_stat: 'YN'
			}
		},
		overrideSubmitEvent: true
	});
	
	$('.mta-tbl-edit').on('click', async function(e) {
		if (manager.currentRowData != null) {
			let mta_cd = manager.currentRowData.mta_cd;
			
			const result1 = await $.post('/admin/checkMetaTableUsed.do', {mta_cd : mta_cd});
			
			if (result1.result == 'success') {
				$('#mta_tbl').removeAttr('readonly');
			} else {
				alert(result1.error);
			}
		}
	});
	
	$('.mta-gther-edit').on('click', async function(e) {
		const cls = e.currentTarget.className;
	
		if (manager.currentRowData != null) {
			let mta_cd = manager.currentRowData.mta_cd;
			
			const result1 = await $.post('/admin/checkMetaTableUsed.do', {mta_cd : mta_cd});
			
			if (result1.result == 'success') {
				$('#mta_gther').removeClass('readonly');
				$('#mta_gther option').removeAttr('disabled');
			} else {
				alert(result1.error);
			}
		}
	});
	
	$('.mta-fcly-edit').on('click', async function(e) {
		const cls = e.currentTarget.className;
	
		if (manager.currentRowData != null) {
			let mta_cd = manager.currentRowData.mta_cd;
			
			const result1 = await $.post('/admin/checkMetaTableUsed.do', {mta_cd : mta_cd});
			
			if (result1.result == 'success') {
				$('#mta_fcly').removeClass('readonly');
				$('#mta_fcly option').removeAttr('disabled');
			} else {
				alert(result1.error);
			}
		}
	});
	
}

export default AdminMetaMngrRoute;