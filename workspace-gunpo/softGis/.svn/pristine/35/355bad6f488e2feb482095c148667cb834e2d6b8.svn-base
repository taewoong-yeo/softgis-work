
function FaqListRoute() {
	$(".faq_list tbody tr").on('click', function(e){
		let id = $(this).data("id");
		const $tr = $(this);
		
		$(".faq_list").find("div").slideUp();
		$tr.last("td").find("img").attr("src",Constant.CONTEXT_PATH + "/assets/images/common/icon-arrow-dn-dark.png")
						
		if($tr.find("div").is(":hidden")){
			$tr.find("div").slideDown();
			$tr.last("td").find("img").attr("src",Constant.CONTEXT_PATH + "/assets/images/common/icon-arrow-up-dark.png")
		}
	});
	
}

export default FaqListRoute;