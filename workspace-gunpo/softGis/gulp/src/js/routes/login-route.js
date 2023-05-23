import { Validator } from '../shared/validator';
import { Cookie } from '../shared/cookie-manage';

function LoginRoute() {
	const cookie = new Cookie();
	const $form = $('form');
	let cookieName = "idSave";
	
	if(cookie.getCookie(cookieName) != undefined){
		$("#id_save").prop("checked","checked");
		$("#usr_id").val(cookie.getCookie(cookieName));
	};

	const validator = new Validator({
		usr_id: { required: true },
		usr_pw: { required: true }
	}, {
		fieldNames: {
			usr_id: '아이디',
			usr_pw: '비밀번호'
		}
	});

	$form.on('submit', async (e, d) => {
		if(d === true) return d;
		
		e.preventDefault();
		const data = $form.serializeFlat();

		if(!await validator.validateAllAsync(data))
			return;
		
		if($("#id_save").is(":checked")){
			cookie.setCookie(cookieName,$form.find("#usr_id").val(),30);
		}else{
			cookie.delCookie(cookieName);
		};

		const today = new Date();
		let year = today.getFullYear();
		let month = ('0' + (today.getMonth() + 1)).slice(-2);
		let day = ('0' + today.getDate()).slice(-2);
		let hours = ('0' + today.getHours()).slice(-2); 
		let minutes = ('0' + today.getMinutes()).slice(-2);
		let seconds = ('0' + today.getSeconds()).slice(-2); 
		let cookieDate = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+ seconds;
		cookie.setCookie("alarm_time",cookieDate,1);
		$form.trigger('submit', true);
	});
	
}

export default LoginRoute;