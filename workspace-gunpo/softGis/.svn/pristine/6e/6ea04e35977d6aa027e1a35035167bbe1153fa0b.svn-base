import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import Loading from '../modules/loading';

function AdminAnalDataRoute() {
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getMetadatas.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertAnalData.do',
			update: Constant.CONTEXT_PATH + '/admin/updateAnalData.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteAnalData.do'
		},
		validator: new Validator({
			
		})
	});
}

export default AdminAnalDataRoute;