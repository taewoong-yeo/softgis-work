import { Validator } from '../shared/validator';

function QnaFormRoute() {
/*	
	const $editor = $('#qna_content');
	$editor.kendoEditor({
		tools: [
			'fontName', 'fontSize', 'foreColor', 'backColor' , 
			'bold', 'italic', 'underline', 'strikethrough',
			'justifyLeft', 'justifyCenter', 'justifyRight'
		]
	});

	const editor = $editor.data('kendoEditor');
*/
	
	document.getElementById('att_file').addEventListener('change', function(){
		var filename = document.getElementById('fileName');
		if(this.files[0] == undefined){
			filename.innerText = '선택된 파일없음';
			return;
		}
		filename.innerText = this.files[0].name;
	});
	
	$(".sub-content table tr[role=presentation]").show(); //임시처리
	
	const $form = $('#submitForm'); 
	const validator = new Validator({
		qna_title: { required: true, maxLength: 50 },
		qna_content: { required: true, maxLength: 10000 }
	}, {
		fieldNames: {
			qna_title: '제목',
			qna_content: '내용'
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

	let file_id = $("#file_id").val();
	if ( file_id === '' || file_id === null || file_id === undefined){
		$("#fileName").text("선택된 파일없음");
		$(".del_file").hide();
	}
	
	/*
	$('#fileDelButton').on('click', function (e) {
		e.preventDefault();
		$(".sub-file").remove();
		$("#file_id").val("");
	});
	*/
	
	$('#btnDelQna').on('click', async (e, d) => {
		e.preventDefault();
		
		if(!confirm('삭제하시겠습니까?')) 
			return;
			
		try {
			const result = await $.post(Constant.CONTEXT_PATH + '/deleteQna.do', {qna_id: $("#qna_id").val()});

			alert('삭제가 완료되었습니다.');
			$("#btnList").get(0).click();

		}catch(e) {
			console.log(e);
		} finally {
			
		}
	});
}

export default QnaFormRoute;