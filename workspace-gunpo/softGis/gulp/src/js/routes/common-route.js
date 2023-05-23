import { Validator, VALIDATOR_PW_REGEX_RULE, VALIDATOR_PHONE_REGEX_RULE } from '../shared/validator';
import Aside from '../modules/aside';
import Nav from '../modules/nav';
import { Cookie } from '../shared/cookie-manage';

const HTML = {
	NAV_AUTH_DIALOG: `
		<div class="auth-dialog">
			<form action="${Constant.CONTEXT_PATH}/modifyUser.do" method="POST" class="form u-padding-4">
				<div class="form-field">
					<label for="auth_usr_nm" class="form-required">이름</label>
					<input type="text" id="auth_usr_nm" name="usr_nm" placeholder="이름" value="" readonly>
					<span class="u-display-block u-margin-top-1 u-text-primary">※ 이름 수정은 관리자에게 문의해주세요.</span>
				</div>
				<div class="form-field">
					<label for="auth_usr_phone">핸드폰번호</label>
					<input type="text" id="auth_usr_phone" name="usr_phone" placeholder="핸드폰번호" value="">
				</div>
			</form>
		</div>
	`
};

function CommonRoute() {
	const cookie = new Cookie();
	
	// 답변 알람
//	setInterval(alarm, 500);
	
	function alarm(){
		if(cookie.getCookie("alarm_time") != undefined){
			const start_time = performance.now();
			$.post({
				url: '/getAnswerTime.do'
				, data: {alarm_time: cookie.getCookie("alarm_time") }
				, dataType: 'json'
				, async: true
				, success: function(d) {
					if(d.answer_time != undefined){
						Swal.fire({
							position: 'bottom-end',
							html: '내가 등록한 커뮤니티 매핑에<br/>새로운 의견이 달렸습니다.',
							showConfirmButton: false,
							timer: 1500,
							backdrop: false,
							width: 250
						});
						
						cookie.setCookie("alarm_time",d.answer_time,1);
						const end_time = performance.now();
						console.log("notification 응답속도 : " + (end_time - start_time) + 'ms');
					}
				}
			});
		}
	}
	
	// Initalize UI Components
	Aside.init();
	Nav.init();
	
	// Navigator log out
	const $logOut = $('.nav-log-out');
	

	// Kendo Resizing
	let timer;

	$(window).on('resize', _ => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			$('.k-chart').each((i, el) => {
				$(el).data('kendoChart').redraw()
			});
			
			$(window).trigger('resizeEnd');
		}, 100);
	});
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) $('.top_btn').fadeIn(200);
		else $('.top_btn').fadeOut(200);
	});

	$('.top_btn').click(function (event) {
		event.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 300);
	});

	if(cookie.getCookie("login") != "in") cookie.setCookie("login","out",1);

}

export default CommonRoute;