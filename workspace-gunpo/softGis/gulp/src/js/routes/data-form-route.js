//data-list-route.js 자료실 폼  .js
function DataFormRoute() {
 
	const $form = $('form'); 
	let file_id = $("#file_id").val();

	// 수정 모드일 경우 버튼 TEXT 변경 
	if ($("#job_mode").val() == "UPDATE"){
		$(".dataRegBtn").text('수정');	 
		$("#fileTitleDesc").text('첨부');
	} 

	// 등록된 파일이 없다면..
	if ( file_id === '' || file_id === null || file_id === undefined){
		$("#fileName").text("선택된 파일없음");
		$(".del_file").hide();
	}
	
	$(".del_file").on("click", delDataFile);
	
	document.getElementById('att_file').addEventListener('change', function(){
		var filename = document.getElementById('fileName');
		if(this.files[0] == undefined){
			filename.innerText = '선택된 파일없음';
			return;
		}
		filename.innerText = this.files[0].name;
	});
	
	function delDataFile(){
		
//		alert(">>file_id:" + file_id);
		let data_id = $("#data_id").val();
		if(!confirm('정말 삭제하시겠습니까?')) 
			return;
		 
		$.post({
			url: Constant.CONTEXT_PATH + '/deleteDataFile.do'
				, data: {data_id:data_id, file_id:file_id } 
				, dataType: 'json'
				, async: true
				, success: function(d) {   
					let result = d.result;  
					
					if (result ==1){	// 성공적인 삭제인 경우
						$("#fileName").text("선택된 파일없음");
						$(".del_file").hide();
					}
					
//					callCmmntyView();
//					$(".opinionList ul li").removeClass("active");
//					$(".opinionItem").removeClass("active");
//					$(".mapngInfo").css("display", "");
//					$(".partiButtonWrap").eq(0).find("button").text("참여하기");
//					$(".join").text("참여하기");
//					callOpinionList();
//
//					// 아이디 확인하기 팝업 폼 내용 초기화
//					$(".IdConfirmWrap").removeClass("active");
//					$("#del_answer_user_id").val('');
//					$("#del_answer_user_pwd").val('');	
			} 
		});
		
		
	}
	
	//등록하기. 버튼 클릭
	$(".dataRegBtn").on("click", () => {
		checkDataRegForm();  
	}); 
	
	//등록 폼이 전송될때 호출
	$form.on('submit', async (e, d) => {
		if(d === true) return d;

		e.preventDefault();

		const data = $form.serializeFlat();
 
		$form.trigger('submit', true);
	}); 

	//등록 폼 Validation  
	function checkDataRegForm(){ 

		let data_title = $.trim($("#data_title").val());
		
		if ( data_title === '' || data_title === null || data_title === undefined){
			alert('제목을 입력해주세요.');
			document.getElementById("data_title").focus();
			return;
		}    
		
		let data_content = $.trim($("#data_content").val()); 
		
		if ( data_content === '' || data_content === null || data_content === undefined){
			alert('내용을 입력해주세요.');
			document.getElementById("data_content").focus();
			return;
		}  
   
		let att_file = $("#att_file").val(); 

		if ($("#job_mode").val() == "UPDATE"){ 

			// 등록된 파일이 없다면..
			if ( file_id === '' || file_id === null || file_id === undefined){

				if(!att_file){
			        alert("파일을 첨부해 주세요");
			        return;
			    }
			}
		}else{
			if(!att_file){
		        alert("파일을 첨부해 주세요");
		        return;
		    }			
		}

		// 첨부파일이 있다면 1 처리
		if(att_file){
			$("#attFileSize").val(1);
		}
		
		// 폼 전송.
		if ($("#job_mode").val() == "UPDATE"){
			$form.attr("action", Constant.CONTEXT_PATH + "/updateData.do");
		}else{
			$form.attr("action", Constant.CONTEXT_PATH + "/insertData.do");
		}
		
		$form.submit();
		
	}
	
}

export default DataFormRoute;