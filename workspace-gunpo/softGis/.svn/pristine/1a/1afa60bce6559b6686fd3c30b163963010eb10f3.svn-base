
function QnaDetailRoute() {

	const $editor = $('#qna_content');
	const $editor2 = $('#reply_content');
	const editor = $editor.data('kendoEditor');
	$editor.kendoEditor({
		tools: []
	});
	const editor2 = $editor2.data('kendoEditor');
	$editor2.kendoEditor({
		tools: []
	});
	
	$editor.parent().css('height', $('.k-editable-area iframe').contents().height());
	$editor2.parent().css('height', $('.k-editable-area iframe').contents().height());
	
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

export default QnaDetailRoute;