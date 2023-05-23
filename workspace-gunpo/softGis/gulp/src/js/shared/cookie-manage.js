class Cookie {
	constructor() {
		
	}

	setCookie(cookieName, value, days) {
		const exdate = new Date();
		exdate.setDate(exdate.getDate() + days);

		const cookie_value = escape(value) + ((days == null) ? '' : '; path=/; expires=' + exdate.toUTCString());

		document.cookie = cookieName + '=' + cookie_value;
	}

	getCookie(cookieName) {
		const v = document.cookie.split(';');

		let x, y;

		for (let i = 0; i < v.length; i++) {
			x = v[i].substr(0, v[i].indexOf('='));
			y = v[i].substr(v[i].indexOf('=') + 1);
			x = x.replace(/^\s+|\s+$/g, '');

			if (x == cookieName) {
				return unescape(y);
			}
		}

		return undefined;
	}
	
	delCookie(cookieName) {
		 document.cookie = cookieName + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
	}
}
 
export {
	Cookie as default,
	Cookie};