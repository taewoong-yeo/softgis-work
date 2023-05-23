import Loading from '../modules/loading';

function MainRoute() {
	
	$(".sliderWrap").slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: true,
	});
	
	$(".survey_slide").slick({
		infinite: true,
		slidesToShow: 10,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
		variableWidth: true,
	});
	
	$('.slider-track').slick('goTo', 1);
	
	$('.slider').fadeIn('slow');
	
	const $popup = $('.main-popup').detach();
	const popups = [];
	
	$popup.find('img').each((i, el) => {
		const $img = $(el);

		const title = $img.attr('title');
		const notiNo = $img.data('noti');

		const cookieName = 'NOTI_' + notiNo;
		const cookie = cookie.getCookie(cookieName);
		
		if(cookie === undefined) {
			try {
				const _window = window.open('', '', `width=${el.width}, height=${el.height+40}, left=${i*50+100}, top=${i*50+100}, resizable=no`);

				_window.document.title = title;
				
				const $document = $(_window.document);
				const $body = $document.find('body');
				
				$body.html(el.outerHTML)
				$body.css({ overflow: 'hidden', margin: '0' })
				$body.append(`
					<div style='background: #1a3777; color: #fff; padding: 10px;'>
						<label><input type="checkbox" name="close" value="OK" /> 일주일간 보지 않기</label>
						<button style='float: right; padding: 0 15px;'>닫기</button>
					</div>
				`);

				$body.on('click', 'button', e => {
					e.preventDefault();

					const $checkbox = $body.find('input[type="checkbox"]');

					if($checkbox.is(':checked')) {
						cookie.setCookie(cookieName, '', 7);
					}

					_window.close();
				});
				
				popups.push(_window);
			} catch(e) { }
		}
	});

	$('.app_execute').on('click', function(e) {
		e.preventDefault();
		
		let openAt = new Date;
		let uagentLow = navigator.userAgent.toLocaleLowerCase();
		let chrome25;
		let kitkatWebview;
	
		$("body").append("<iframe id='iframeField'></iframe>");
		$("#iframeField").hide();
		
		let userAgent = navigator.userAgent.toLowerCase();
		
		setTimeout(function() {
			if (new Date - openAt < 4000) {
				if (uagentLow.search("android") > -1) {
					$("#iframeField").attr("src", "market://details?id=com.infoseed.geopic");
				} else if (userAgent.match('iphone') || userAgent.match('ipad') || userAgent.match('ipod')) {
					location.replace("https://apps.apple.com/kr/app/geo-pic/id1510582820");
				} else if (uagentLow.search("chrome")) {
					const market = document.createElement('a');
					$(market).attr('target', '_blank');
					$(market).attr('href', "https://play.google.com/store/apps/details?id=com.infoseed.geopic");
					$(market).trigger('click');
				} else {
					alert("안드로이드 또는 IOS에서 실행 가능합니다.");
				}
			}
		}, 1000);
	});
	
	/*
	if (uagentLow.search("android") > -1) {
		chrome25 = uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25;
		kitkatWebview = uagentLow.indexOf("naver") != -1  uagentLow.indexOf("daum") != -1;
		
		if (chrome25 && !kitkatWebview) {
			document.location.href = "intent://scan/#Intent;scheme=nhn;package=com.naver.nhn;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.naver.nhn;end";
		} else {
			$(body).append(chrome25);
			$("#iframeField").attr("src", 'nhn://applink?param=value');
		}
	} else if(uagentLow.search("iphone") > -1) {
		//$("#iframeField").attr("src", 'nhn://applink?param=value');
	}
	*/
	
	$(".button-wrap").children("div").on("mouseover", (e) => {
		$(e.currentTarget).css("border", "1px solid #166f88");
	});
	$(".button-wrap").children("div").on("mouseout", (e) => {
		$(e.currentTarget).css("border", "1px solid #cfd2d7");
	});
	

	$(window).on('beforeunload', e => {
		for(const popup of popups) {
			popup.close();
		}
	});
}

export default MainRoute;