import { Validator, VALIDATOR_ID_REGEX_RULE, VALIDATOR_PW_REGEX_RULE, VALIDATOR_PHONE_REGEX_RULE } from '../shared/validator';
import FormSelectionDialog from '../shared/form-selection-dialog';
import { Loading } from '../modules/loading';

function RegisterRoute() {
	const $form = $('form');
	const $mailChk = $('#mail_chk');
	const $btnMailCert = $('#mail_cert_btn');
	const $empOnly = $('.emp-only');
	
	//서비스 약관 동의
	$(".next").on("click", () => {
		if($("input[name=agree_yn]:checked").val() != "Y"){
			alert("개인정보 수집 및 이용에 대한 안내에 동의해주세요.")
		}else{
			$form.show();
			$(".agree").hide();
		}
	});
	
	const checkUsrExist = async (v) => {
		const result = await $.post('mail/certCheck.do', {});
		return result.result;
	};

	const loading = new Loading();
	const validatorMail = new Validator({
		usr_nm: { required: true, maxLength: 50 },
		usr_id: { required: true, maxLength: 70, regex: VALIDATOR_ID_REGEX_RULE }
	}, {
		fieldNames: {
			usr_nm: '이름',
			usr_id: '아이디'
		}
	});
	
	// 메일 인증
	$btnMailCert.on('click', mailCert);
	async function mailCert(){
		const data = $form.serializeFlat();
		
		if(!await validatorMail.validateAllAsync(data))
			return;

		loading.show(true);
		$.post({
			url: '/mail/sendMail.do'
				, data: {newUserPatternKey: data.usr_id, user_nm: data.usr_nm, mail: data.usr_id }
				, dataType: 'json'
				, async: true
				, success: function(d) {
					loading.hide();
					if(!d.result ){
						alert(d.msg);
					}else{
						alert("인증메일이 전송되었습니다.");
					}
					
					if(data.usr_id.indexOf("lx.or.kr") > -1) {
						$empOnly.show();
						$("#usr_auth").val("03");
					}
				}
			});
	}

	const validator = new Validator({
		usr_nm: { required: true, maxLength: 50, regex: [/^.{2,}$/, '최소 2글자이상 입력가능 합니다.'] },
//		usr_id: { required: true, maxLength: 100, regex: VALIDATOR_ID_REGEX_RULE, function: [checkUsrExist, '메일인증이 필수입니다.'] },
		usr_pw: { required: true, maxLength: 20, regex: VALIDATOR_PW_REGEX_RULE, confirm: 'usr_pw_confirm' },
		usr_mobile: { maxLength: 20, regexNotEmpty: VALIDATOR_PHONE_REGEX_RULE },
		usr_dept: { maxLength: 50 },
		usr_tel: { maxLength: 20 }
	}, {
		fieldNames: {
			usr_nm: '이름',
//			usr_id: '아이디',
			usr_pw: '비밀번호',
			usr_mobile: '휴대전화번호',
			usr_dept: '부서명',
			usr_tel: '내선번호'
		}
	});

	$form.on('submit', async (e, d) => {
		if(d === true) return d;
		
		e.preventDefault();
		const data = $form.serializeFlat();

		if(!await validator.validateAllAsync(data))
			return;

		$form.trigger('submit', true);
	});
}

export default RegisterRoute;