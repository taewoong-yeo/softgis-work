
function NoticeListRoute() {
	$(".title_search div").on('click',function(n){
		if($(this).index() != 3) {
			$(".title_search div").removeClass("active");
			$(this).addClass("active");
			$(this).find("input").prop("checked", true);
		}
	});
}

export default NoticeListRoute;