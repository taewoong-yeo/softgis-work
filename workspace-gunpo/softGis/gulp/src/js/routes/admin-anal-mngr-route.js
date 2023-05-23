import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import Loading from '../modules/loading';

function AdminAnalMngrRoute() {
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getAnalList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertAnal.do',
			update: Constant.CONTEXT_PATH + '/admin/updateAnal.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteAnal.do'
		},
		validator: new Validator({
			anal_cd: { required: true, maxLength: 100 },
			anal_nm: { required: true, maxLength: 100 },
			anal_desc: { maxLength: 255 }
		})
	});
	
}

export default AdminAnalMngrRoute;