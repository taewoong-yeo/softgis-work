function DataDetailRoute() {

	const $form = $('form');
//	const $editor = $('#data_content'); 
//	const editor = $editor.data('kendoEditor');
	const data_id = $("#data_id").val();
	
//	$editor.kendoEditor({
//		tools: [] 
//	});
//	
//	$editor.parent().css('height', $('.k-editable-area iframe').contents().height() + 30);
	
	
	//등록하기. 버튼 클릭
	$(".dataUpdtBtn").on("click", () => {
		chnDataRegForm();
	}); 
	
	
	function chnDataRegForm(){

		// 수정 모드로 변환. 
		$("#job_mode").val('UPDATE');

		// 폼 전송.
		$form.submit();
		
	}
	

	//등록 폼이 전송될때 호출
	$form.on('submit', async (e, d) => {
		if(d === true) return d;

		e.preventDefault();

		const data = $form.serializeFlat();
 
		$form.trigger('submit', true);
	});
	
	
	
}

export default DataDetailRoute;