import AdminDataManager from '../shared/admin-data-manager';
import { Validator, VALIDATOR_DATE_REGEX_RULE, VALIDATOR_PHONE_REGEX_RULE } from '../shared/validator';

function AdminUserRoute() {

	// const $btnInitUsrPwd = $("#init_usr_pwd_btn");
	const manager = new AdminDataManager({
		
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getUserList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertUser.do',
			update: Constant.CONTEXT_PATH + '/admin/updateUser.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteUser.do',
			initpwd: Constant.CONTEXT_PATH + '/admin/initUserPwd.do',
		},
		validator: {
			'insert': new Validator({
				usr_id: { required: true, maxLength: 50},
				usr_nm: { required: true, maxLength: 50 },
				usr_auth: { required: true, maxLength: 50 },/*
				usr_perm: { required: true, maxLength: 20 },*/
				usr_mobile: { regexNotEmpty: VALIDATOR_PHONE_REGEX_RULE, maxLength: 20 },
				use_stat: { required: true }
			}),
			'update': new Validator({
				usr_id: { required: true, maxLength: 50},
				usr_nm: { required: true, maxLength: 50 },
				usr_auth: { required: true, maxLength: 50 },/*
				usr_perm: { required: true, maxLength: 20 },*/
				usr_mobile: { regexNotEmpty: VALIDATOR_PHONE_REGEX_RULE, maxLength: 20 },
				use_stat: { required: true }
			}),
		},
		messages: {
			initpwdConfirm: '비밀번호를 정말 초기화하시겠습니까?'
		}
	});

	
	// $btnInitUsrPwd.on('click', initUsrPwd);

	// function initUsrPwd(){
	// 	// if(confirm('초기화 하시겠습니까?')
	// }

}

export default AdminUserRoute;