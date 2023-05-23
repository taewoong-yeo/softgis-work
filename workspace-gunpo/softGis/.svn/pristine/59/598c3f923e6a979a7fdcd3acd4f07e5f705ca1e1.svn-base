import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import Loading from '../modules/loading';

function AdminAnalResultRoute() {
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getAnalResultList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertAnalResult.do',
			update: Constant.CONTEXT_PATH + '/admin/updateAnalResult.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteAnalResult.do'
		},
		validator: new Validator({
			
		})
	});
}

export default AdminAnalResultRoute;