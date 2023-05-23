import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

function AdminCmmntyAnswerQuesRoute() {

	//img_blob은 필수가 안 될 수도 있음
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getCmmnty.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertFaq.do',
			update: Constant.CONTEXT_PATH + '/admin/updateCmmnty.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteCmmnty.do'
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
	}

}

export default AdminCmmntyAnswerQuesRoute;