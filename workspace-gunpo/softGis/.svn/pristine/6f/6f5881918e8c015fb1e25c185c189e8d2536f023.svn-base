import { Validator, VALIDATOR_ID_REGEX_RULE, VALIDATOR_PW_REGEX_RULE, VALIDATOR_PHONE_REGEX_RULE } from '../shared/validator';
import Loading from '../modules/loading';

function MypageRoute() {
	const $form = $("form"); 
	const $pwChange = $(".pwChange");

	const validator = new Validator({
		usr_pw: { required: true, maxLength: 20, regex: VALIDATOR_PW_REGEX_RULE, confirm: 'usr_pw_confirm' },
		usr_pw_confirm: { required: true, maxLength: 20, regex: VALIDATOR_PW_REGEX_RULE},
	}, {
		fieldNames: {
			usr_pw: '변경 비밀번호',
			usr_pw_confirm: '변경 비밀번호 확인'
		}
	});
	
	//비밀번호 변경하기 버튼 클릭
	$pwChange.find("button").on("click", updatePw ); 
	
	async function updatePw(){
		if(/active/i.test($pwChange.attr("class"))){
			const data = $form.serializeFlat();
			if(!await validator.validateAllAsync(data))
				return;
			$.post({
				url: '/updateUsrPassword.do'
				, data: $form.serialize()
				, dataType: 'json'
				, async: true
				, success: function(d) {
					if(d.msg == "success"){
						alert("변경되었습니다.");
						$(".pwWrap").removeClass("active");
						$(".correctionPwWrap").removeClass("active");
						$pwChange.removeClass("active");
						$("input").not("#usr_id").val("");
					}
				}
			});
		}else{
			$(".pwWrap").addClass("active");
			$(".correctionPwWrap").addClass("active");
			$pwChange.addClass("active");
		}
	}
	
	//로그아웃 버튼 클릭
	$(".logout").on("click", () => location.href=Constant.CONTEXT_PATH + "/logout.do");
	
	//회원탈퇴 버튼 클릭
	$(".leave").on("click", () => {
		if(confirm("탈퇴하시겠습니까?")){
			location.href=Constant.CONTEXT_PATH + "/leave.do";
		};
	});
	
	//나의 커뮤니티 버튼 클릭
	$(".myCmmnty").on("click", () => location.href=Constant.CONTEXT_PATH + '/mycmmntyMap/mycmmnty-list.do');
	
	//내가 작성한 의견 모달
	$(".myAnswer").on("click", getUsrAnswer);
	$(".close_button_wrap").on("click", ()=>$(".modal_wrap_back").removeClass("active"));
	
	function getUsrAnswer(){
		$(".modal_wrap_back").addClass("active");
	}
}

export default MypageRoute;