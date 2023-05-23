import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminStopwordsRoute() {

	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getStopwordsList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertStopwords.do',
			update: Constant.CONTEXT_PATH + '/admin/updateStopwords.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteStopwords.do'
		},
		validator: new Validator({
			word: { required: true, maxLength: 80, collision: Constant.CONTEXT_PATH + '/admin/getStopwordsExist.do' },
		}),
		overrideSubmitEvent: false
	});

	// Event Binding
//	manager.grid.bind('change', onAdminDataManagerGridChange);
	manager.$form.on('submit', onAdminDataManagerSubmit);
	

	async function onAdminDataManagerSubmit(e) {
		e.preventDefault();
		
		const formData = new FormData();

		const rawData = manager.$form.serializeFlat();
		const cvtData = manager.formAjax.getMappingFormData(rawData);
		const oldData = manager.formAjax.getMappingFormData(manager.formAjax.prependData);
		const mergedData =  $.extend({}, oldData, cvtData);
		
		const result = await manager.formAjax.submit();

		if(result !== false) {
			manager.$form.trigger('submitAjax', [result]);
		}
	}
}

export default AdminStopwordsRoute;