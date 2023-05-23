// Console Log Shortcut
window.dd = console.log.bind(console);

// Custom Lodash Utilities
window._ = {
	randomFloat: (min, max) => (Math.random() * (max - min) + min)
	, randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
	, queryString: (obj) => Object.entries(obj).map(d => { d[1] = encodeURIComponent(d[1]); return d.join('='); }).join('&')
	, currentLocation: () => (window.location.protocol + '//' + window.location.host + window.location.pathname).split('?')[0]
	, debugFormData: (formData) => { for(const p of formData.entries()) dd(p); }
};

// Constants
window.Constant = window.Constant || {};
window.Constant.GEOSERVER_URL = 'http://landnavi.com:9090/geoserver';
window.Constant.DOMAIN = 'https://landnavi.com';
window.Constant.VWORLD_APIKEY = '579521DF-B712-34B9-9CD6-68D3C371DFE3';
window.Constant.VWORLD_WMS_URL = 'http://api.vworld.kr/req/wms';
window.Constant.VWORLD_WFS_URL = 'http://api.vworld.kr/req/wfs';
window.Constant.VWORLD_GEOCODER_URL = 'http://api.vworld.kr/req/address';
window.Constant.VWORLD_CENTER = [126.9351741, 37.3616703];
window.Constant.VWORLD_LEGENDIMAGE_URL = 'http://apis.vworld.kr/legendImage.do';
window.Constant.LANDINFO_WMS_BASE_URL = 'http://openapi.nsdi.go.kr/nsdi/map/LandInfoBaseMapITRF2000BlueService';
window.Constant.LANDINFO_WMS_SATELLITE_URL = 'http://openapi.nsdi.go.kr/nsdi/map/LandInfoBaseMapUTMKService';
window.Constant.LANDINFO_WMS_BASE_KEY = 'fc259cde39327ccefd83ff';
window.Constant.LANDINFO_WMS_SATELLITE_KEY = '837e474c89d93a22bd5358';
window.Constant.KENDO_DEFAULT_GRID_OPTION = {
	noRecords: true,
	selectable: true,
	scrollable: false,
	sortable: false,
	toolbar: ['search'],
	pageable: {
		refresh: true,
		pageSizes: true,
		buttonCount: 5
	},
	dataSource: {
		pageSize: 10,
		transport: { read: { type: 'POST', dataType: 'json' } },
		schema: { data: 'result', total: (data) => data.result.length }
	},
	dataBound: function(e) {
		const $grid = e.sender.element.closest('.k-grid');
		const $table = $grid.find('table');
		const $noRecords = $grid.find('.k-grid-norecords');
		
		$table.unwrap('.k-grid-table');
		$table.wrap('<div class="k-grid-table"></div>');
		
		$noRecords.eq(0).siblings('.k-grid-norecords').remove();
		$noRecords.eq(0)[$table.find('td').length > 0 ? 'hide' : 'show']();

		for (let i = 0; i < this.columns.length; i++) {
			const col = this.columns[i];
			const $th = $grid.find(`th[data-field='${col.field}']`);
			
			if($th.is('[data-fit]')) {
				this.autoFitColumn(i);
			}
		}
	}
};
window.Constant.KENDO_DEFAULT_DIALOG_OPTION = {
	modal: true,
	visible: false,
	closable: true,
	width: 700,
	actions: [
		{ text: '닫기' },
		{ text: '선택', primary: true }
	]
};
window.Constant.KENDO_DEFAULT_DATEPICKER_OPTION = {
	format: 'yyyy-MM-dd'
};
window.Constant.KENDO_DEFAULT_CHART_COLORS = [
	'#0052cc',
	'#00a3bf',
	'#00875a',
	'#ff991f',
	'#de350b',
	'#5243aa',
	'#42526e',
	'#091e42'
];
window.Constant.USER_AGENT = window.navigator.userAgent;

// jQuery Extension
$.fn.extend({
	serializeFlat: function() {
		if(this.serializeArray === undefined)
			return null;
				
		let formData = $(this).serializeArray();
		
		this.find('[type="file"], select[multiple]').each((i, el)=>{
			const $el = $(el);			

			formData.push({
				name : $el.attr('name'),
				value: $el.val()
			});
		});
		
		this.find('select:not([multiple])').each((i, el) => {
			const $el = $(el);
			const val = $el.find('option:selected').attr('value');

			formData.push({
				name: $el.attr('name'),
				value: val
			});
		});
		
		this.find('[type="checkbox"]').each((i, el) => {
			const $el = $(el);
								
			formData.push({
				name: $el.attr('name'),
				value: $el.prop('checked')
			});
		});

		return formData.reduce((acc, v) => {
			acc[v.name] = v.value;

			return acc;
		}, {});
	},
	reset: function() {
		this.each(function() {
			this.reset();
		});
		
		this.find('option').prop('selected', function() {
			return this.defaultSelected;
		});
	}
});

//모달 닫기
$(".close_modal").on("click", () => $(".modal_wrap_back").removeClass("active"));

//input focus event 
$("input").on("focus", (e) => {
	console.log(e);
})