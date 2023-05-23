import { Map, MapDataVisualizer } from '../modules/map';
import Chart from '../modules/chart';
import FileReaderAsync from '../shared/file-reader-async';
import Loading from '../modules/loading';

const HEIGHT = 600;
const HTML = {
	MAP: `
		<div class="map map-ov-lt">
			<div class="map-ui map-ui-rt map-type">
				<button class="base active" data-map-action="map-base">일반지도</button>
				<button class="satellite" data-map-action="map-satellite">위성지도</button>
				<button class="hybrid" data-map-action="map-hybrid">하이브리드 지도</button>
				<button class="gray" data-map-action="map-gray">흑백 지도</button>
				<button class="midnight" data-map-action="map-midnight">어두운 지도</button>
			</div>
			<div class="map-ui map-ui-lt">
			</div>
			<div class="map-ui map-ui-rt catalog-download-map-wrap">
				<a class="catalog-download-map"><i class='bx bx-cloud-download'></i> SHP 파일 다운로드</a>
			</div>
			<div class="map-ui map-ui-lb">
				<button class="map-slider-toggler active"><i class='bx bxs-color-fill'></i></button>
				<div class="map-slider map-slider-r map-opacity">
					<h6>투명도 조절</h6>
					<input value="50">
				</div>
			</div>
			<div class="map-ui map-ui-rt">
				<div class="map-ui-group">
					<button data-map-action="home"><i class="fas fa-home"></i></button>
				</div>
				<div class="map-ui-group">
					<button data-map-action=":full-screen"><i class="fas fa-expand"></i></button>
					<button data-map-action=":zoom-in"><i class="fas fa-plus"></i></button>
					<button data-map-action=":zoom-out"><i class="fas fa-minus"></i></button>
				</div>
				<div class="map-ui-group">
					<button data-map-action="measure-exit"><i class="fas fa-mouse-pointer"></i></button>
					<button data-map-action="measure-line"><i class="fas fa-ruler-horizontal"></i></button>
					<button data-map-action="measure-polygon"><i class="fas fa-ruler-combined"></i></button>
					<button data-map-action="measure-radius"><i class="fas fa-circle-notch"></i></button>
					<button data-map-action="measure-reset"><i class="fas fa-eraser"></i></button>
				</div>
				<div class="map-ui-group">
					<button data-map-action="ui-visible"><i class="fas fa-eye-slash"></i></button>
					<button data-map-action="capture"><i class="fas fa-download"></i></button>
					<div id="canvas-warp" style="display: none;">
						<a id="image-download" target="_blank">Click Here</a>
					</div>
				</div>
			</div>
			<div class="map-legend map-legend-rb">
				<h6>범례</h6>
			</div>
			<div class="map-popup">
				<a href="#" class="map-popup-closer"></a>
				<div class="map-popup-content"></div>
			</div>
		</div>
	`,
	EMPTY: `
		<div class="catalog-preview-empty">
			<i class='bx bx-x-circle'></i><br>
			해당 데이터에 등록된 차트 시각화가 존재하지 않습니다.
		</div>
	`,
	LIST_DOWNLOAD_BUTTON: `
		<a class="catalog-download-list"><i class='bx bx-cloud-download'></i> 전체 데이터 다운로드</a>
	`,
	CHART_DOWNLOAD_BUTTON: `
		<a class="catalog-download-chart"><i class='bx bx-download'></i> 차트 이미지 저장</a>
	`
};

function DataCatalogDetailRoute() {
	const $previewDate = $('#catalog_preview_date');
	const $previewType = $('#catalog_preview_type');
	const $preview = $('.catalog-preview-visualize');

	const previewClasses = {
		list: 'catalog-preview-list',
		chart: 'catalog-preview-chart',
		map: 'catalog-preview-map'
	};

	let previewTable, previewType;

	$previewDate.on('change', onPreviewDateChange);
	$previewType.on('click', 'a', onPreviewTypeClick);

	$preview.on('click', '.catalog-download-list', onDownloadListClick);
	$preview.on('click', '.catalog-download-chart', onDownloadChartClick);
	$preview.on('click', '.catalog-download-map', onDownloadMapClick);

	previewType = $previewType.find('.active').attr('href').slice(1);

	$previewDate.trigger('change');

	function onPreviewDateChange(e) {
		e.preventDefault();

		const $this = $(this);

		previewTable = $this.val();

		loadPreview();
	}

	function onPreviewTypeClick(e) {
		e.preventDefault();

		const $this = $(this);

		$this.siblings().removeClass('active');
		$this.addClass('active');

		previewType = $this.attr('href').slice(1);

		loadPreview();
	}

	function onDownloadListClick(e) {
		e.preventDefault();
		
		if ($('#usr_perm').val() != 'SMGR') {
			if ($('#download_stat').val() == 'N') {
				alert('다운로드가 불가능한 데이터 입니다.\n데이터가 필요하신 경우 담당자에게 문의하시기 바랍니다.');
				return;
			}
		}
		
		Loading.show();
		var excelUrl = Constant.CONTEXT_PATH + '/getDataCatalogExcelDownload.do';
		var request = new XMLHttpRequest();
		request.open('POST', excelUrl, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		request.responseType = 'blob';

		request.onload = function(e) {
			//$("#div_load_image").hide();

			var filename = "";
			var disposition = request.getResponseHeader('Content-Disposition');
			
			if (disposition && disposition.indexOf('attachment') !== -1) {
				var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
				var matches = filenameRegex.exec(disposition);
				if (matches != null && matches[1]) {
					filename = decodeURIComponent(matches[1] || '').replace(/\+/g, ' ');
                }
			}
			
			if (this.status === 200) {
				var blob = this.response;
				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var downloadLink = window.document.createElement('a');
					var contentTypeHeader = request.getResponseHeader("Content-Type");
					downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
					downloadLink.download = filename;
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
				}
			}

			Loading.hide();
		};
		
		request.send('data_tbl=' + previewTable);
	}

	async function onDownloadChartClick(e) {
		e.preventDefault();

		const $this = $(this);
		const $chart = $this.siblings('.k-chart');
		const $chartSVG = $chart.find('svg');

		const chart = $chart.data('kendoChart');
		const chartTitle = chart.options.title.text.split('\n').shift();

		const canvas = await html2canvas($chart.get(0));

		kendo.saveAs({
			dataURI: canvas.toDataURL(),
			fileName: chartTitle + '.png'
		});
	}

	async function onDownloadMapClick(e) {
		e.preventDefault();

		const $this = $(this);

		//Geoserver.downloadShapeFile(previewTable);
	}

	async function loadPreview() {
		const $el = $('<div/>');

		$preview.html($el);
		$preview.removeClass(Object.values(previewClasses));
		$preview.addClass(previewClasses[previewType]);

		switch(previewType) {
			case 'list': await loadList($el); break;
			case 'chart': await loadChart($el); break;
			case 'map': await loadMap($el); break;
		}
		
		return $el;
	}

	async function loadList($el) {
		let grid;

		$el.kendoGrid($.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, {
			scrollable: true,
			height: HEIGHT,
			toolbar: [
				'search',
				{ template: HTML.LIST_DOWNLOAD_BUTTON }
			],
			dataSource: {
				transport: {
					read: {
						url: Constant.CONTEXT_PATH + '/getDataCatalogList.do',
						data: { data_tbl: previewTable,  mta_tbl: $('#mta_tbl').html()}
					}
				},
				schema: {
					total: (d) => d.data.length,
					data: (d) => {
						const columns = d.columns.filter(v => v.col_nm_org !== 'geom').map(v => {
							return {
								field: `["${v.col_nm_org}"]`,
								title: v.col_nm_alias + ` <small class='u-text-lightgray'>${v.col_nm_org}</small>`
							};
						});

						grid.setOptions({ columns });
						
						return d.data;
					}
				}
			},
			dataBound: function(e) {
				if(this.columns.length > 10) {
					for (let i = 0; i < this.columns.length; i++) {
						this.autoFitColumn(i);
					}
				}
			}
		}));

		grid = $el.data('kendoGrid');
	}

	async function loadChart($el) {
		kendo.ui.progress($el, true);

		try {
			const result = await $.post(Constant.CONTEXT_PATH + '/getDataCatalogChart.do', { data_tbl: previewTable });

			if(result.charts.length < 1) {	
				$el.before($(HTML.EMPTY));
				
				return;
			}

			const columns = result.columns.reduce((acc, column) => {
				acc[column.col_nm_org] = column.col_nm_alias;

				return acc;
			}, {})

			for(const i in result.charts) {
				const chart = result.charts[i];
				const chartData = result.datas[i];
				const $chart = $el.clone();

				$el.before($chart);

				if (chartData.length > 50) {
					$chart.css('width', chartData.length * 40 + 'px');
					$chart.parent().css('overflow-x', 'scroll');
					$chart.parent().css('overflow-y', 'hidden');
				}
			
				$chart.css('height', HEIGHT);
				$chart.wrap('<div class="catalog-preview-chart-wrap" />');

				const _chart = new Chart($chart, {
					title: chart.vis_nm,
					desc: chart.vis_desc,
					x: chart.vis_x,
					y: chart.vis_y,
					type: chart.vis_type,
					data: chartData,
					yNames: columns
				});
			}
			
			$preview.find('.catalog-preview-chart-wrap').prepend(HTML.CHART_DOWNLOAD_BUTTON);
		} finally {
			kendo.ui.progress($el, false);
		}
	}

	async function loadMap($el) {
		const $map = $(HTML.MAP).css('height', HEIGHT);
		$el.replaceWith($map);

		const map = new Map($map);
		$map.on('click', '.map-type [data-map-action]', onMapTypeChange);
		
		/*
		const layer = Geoserver.getWMSLayer(previewTable);
		layer.setOpacity(.5);
		map.map.addLayer(layer);
		
		const $legend = $map.find('.map-legend');
		const legend = Geoserver.getWMSLegend(previewTable);
		$legend.find('img').remove();
		$legend.append(legend);
		$legend.show();
		*/
		
		const container = $map.find('.map-popup');
		const content = $map.find('.map-popup-content');
		const closer = $map.find('.map-popup-closer');
		const overlay = new ol.Overlay({
			element: container.get(0)
		});
		map.map.addOverlay(overlay);
		
		closer.on('click', function () {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		});
		
		$map.on('pointermove', function (evt) {
			if (evt.dragging) return;
			
			const pixel = map.map.getEventPixel(evt.originalEvent);
			const hit = map.map.forEachLayerAtPixel(pixel, function () {
				return true;
			});
			
			map.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
		});
		
		map.map.on('singleclick', function (evt) {
			const coordinate = evt.coordinate;
			
			onFeatureInfoPopup(coordinate);
		});
		
		function onFeatureInfoPopup(coordinate) {
			const viewResolution = /** @type {number} */ (map.map.getView().getResolution());
			const url = layer.getSource().getFeatureInfoUrl(
				coordinate,
				viewResolution,
				'EPSG:5181',
				{'INFO_FORMAT': 'application/json'}
			);
			
			if (url) {
				fetch(url)
				.then((response) => response.text())
				.then((html) => {
					const features = $.parseJSON(html).features[0];
					
					if (features != undefined) {
						onFeaturePopup(features, coordinate);
					}
				});
			}
		}
		
		async function onFeaturePopup(features, coordinate) {
			content.html('');
			
			if (features != undefined) {
  				try {
	  				const geometry = features.geometry;
					const properties = features.properties;
					const result = await $.post(Constant.CONTEXT_PATH + '/getDataCatalogColumns.do', { data_tbl: previewTable });
					
					let col, val, HTML = '';
					$.each(properties, function(a, b) {
						col = a, val = b;
						$.each(result.dataColumns, function(a, b) {
							if (b.col_nm_org === col) {
								HTML += '<tr><th>' + b.col_nm_alias + '</th><td>' + (val==null ? '':val) + '</td></tr>';
							}
						});
					});
					
					content.html(
						'<h3 class="title">' + $('.catalog-basic-title h2').html() + '</h3>' +
						'<div class="warp">' +
							'<table>' + HTML + '</table>' +
						'</div>'
					);
					
					const vis = new MapDataVisualizer(map, {}, {});
					vis.addSelectFeature(features, coordinate);
					
  					overlay.setPosition(coordinate);
  					$('.map-popup').show();
				} catch(e) {
					console.log(e);
				}
			}
		}
		
		const $mapOpacity = $map.find('.map-opacity input');
		$mapOpacity.kendoSlider({
			dragHandleTitle: '드레그',
			showButtons: false,
			tooltip: { enabled: false },
			min: 0,
			max: 100,
			largeStep: 50,
			smallStep: 10
		});

		const mapOpacity = $mapOpacity.data('kendoSlider');
		$map.on('click', '.map-slider-toggler', onMapSliderTogglerClick);
		mapOpacity.bind('change', onMapOpacityChange);

		function onMapSliderTogglerClick(e) {
			e.preventDefault();

			$(e.currentTarget).toggleClass('active');
		}

		function onMapOpacityChange(e) {
			layer.setOpacity(mapOpacity.value() / 100);
		}
		
		function onMapTypeChange(e) {
			e.preventDefault();
	
			const $this = $(e.currentTarget);
	
			const action = $this.data('map-action');
	
			switch(action) {
				case 'map-base': map.setMapLayer('base'); break;
				case 'map-satellite': map.setMapLayer('satellite'); break;
				case 'map-hybrid': map.setMapLayer('hybrid'); break;
				case 'map-gray': map.setMapLayer('gray'); break;
				case 'map-midnight': map.setMapLayer('midnight'); break;
			}
	
			$this.siblings().removeClass('active');
			$this.addClass('active');
		}
		
	}
	
}

export default DataCatalogDetailRoute;