class Map {
	constructor($el, opts = {}) {
		this.$el = $($el);

		this.type = opts.type || 'base';

		this.urls = {
			// VWorld
			base: `http://api.vworld.kr/req/wmts/1.0.0/${Constant.VWORLD_APIKEY}/Base/{z}/{y}/{x}.png`,
			satellite: `http://api.vworld.kr/req/wmts/1.0.0/${Constant.VWORLD_APIKEY}/Satellite/{z}/{y}/{x}.jpeg`,
			hybrid: `http://api.vworld.kr/req/wmts/1.0.0/${Constant.VWORLD_APIKEY}/Hybrid/{z}/{y}/{x}.png`,
			gray: `http://api.vworld.kr/req/wmts/1.0.0/${Constant.VWORLD_APIKEY}/gray/{z}/{y}/{x}.png`,
			midnight: `http://api.vworld.kr/req/wmts/1.0.0/${Constant.VWORLD_APIKEY}/midnight/{z}/{y}/{x}.png`
		};

		this.defaultZoom = opts.defaultZoom || 14;
		this.defaultMinZoom = opts.defaultMinZoom || 6;
		this.defaultMaxZoom = opts.defaultMaxZoom || 22;
		this.defaultProjection = opts.defaultProjection || 'EPSG:3857';
		this.defaultExtentLimit = opts.defaultExtentLimit;

		this.centerCoord = opts.centerCoord || ol.proj.transform(Constant.VWORLD_CENTER, 'EPSG:4326', this.defaultProjection);

		this.measureLayers = [];
		this.measureInteraction = null;
		this.measureStyle = new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				lineDash: [10, 10],
				width: 2
			}),
			image: new ol.style.Circle({
				stroke: new ol.style.Stroke({ color: 'rgba(0, 0, 0, 0.7)' }),
				fill: new ol.style.Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
				radius: 5
			})
		});

		this.tooltip = null;

		this.messages = {
			drawCursor: '시작위치를 선택하세요.',
			drawCursorPolygon: '클릭으로 지점을 추가하세요.<br>더블클릭으로 종료하세요.',
			drawCursorLineString: '더블클릭으로 종료하세요.',
			drawCursorCircle: '클릭으로 종료하세요.'
		};

		this.init();
	}

	init() {
		const controls = [
			new ol.control.OverviewMap({
				layers: [this.getMapLayer()]
			}),
			new ol.control.Attribution(),
			new ol.control.FullScreen(),
			new ol.control.Zoom()
		];

		const interactions = [
			new ol.interaction.DragPan(),
			new ol.interaction.MouseWheelZoom()
		];

		const view = new ol.View({
			center: this.centerCoord,
			zoom: this.defaultZoom,
			minZoom: this.defaultMinZoom,
			maxZoom: this.defaultMaxZoom,
			projection: this.defaultProjection,
			extent: this.defaultExtentLimit
		});
		
		this.map = new ol.Map({
			target: this.$el.get(0),
			layers: [this.getMapLayer()],
			controls: controls,
			interactions: interactions,
			view: view
		});

		this.viewport = $(this.map.getViewport());

		this.convertControls();
	}

	convertControls() {
		this.$el.find('[data-map-action]').each((i, el) => {
			let $el = $(el);
			let action = $el.data('map-action');

			if(action.indexOf(':') === 0) {
				let $control = this.$el.find('.ol-' + action.slice(1));

				if(!$control.is('button')) {
					$control = $control.find('button');
				}

				$el.on('click', () => $control.click());
			} else {
				let func = () => dd(action);

				switch(action) {
					case 'home':
						func = () => this.map.getView().animate({
							center: this.centerCoord,
							zoom: this.defaultZoom,
							duration: 200
						});
						break;
					
					case 'measure-exit': func = () => this.removeMeasure(); break;
					case 'measure-line': func = () => this.addMeasure('LineString'); break;
					case 'measure-polygon': func = () => this.addMeasure('Polygon'); break;
					case 'measure-radius': func = () => this.addMeasure('Circle'); break;
					case 'measure-reset': func = () => this.removeMeasureAll(); break;
					case 'ui-visible': func = () => this.onUIVisible($el); break;
					case 'capture': func = _ => this.capture(); break;
				}

				$el.on('click', func);
			}
		});
	}

	formatMeasure(geom) {
		let v = '0';

		if(geom instanceof ol.geom.Polygon) {
			v = geom.getArea();
			if(v > 1e4) v = (Math.round(v / 1e4) / 1e2) + ' km<sup>2</sup>';
			else v = (Math.round(v * 1e2) / 1e2) + ' m<sup>2</sup>';
		} else if(geom instanceof ol.geom.LineString) {
			v = Math.round(geom.getLength() * 1e2) / 1e2;
			if(v > 100) v = (Math.round(v / 10) / 1e2) + ' km';
			else v = (Math.round(v * 1e2) / 1e2) + ' m';
		} else if(geom instanceof ol.geom.Circle) {
			v = Math.round(geom.getRadius() * 1e2) / 1e2;
			if(v > 100) v = (Math.round(v / 10) / 1e2) + ' km';
			else v = (Math.round(v * 1e2) / 1e2) + ' m';
		}

		return v;
	}
	
	getGeometryTypeName(geom) {
		if(geom instanceof ol.geom.Polygon) {
			return 'Polygon';
		} else if(geom instanceof ol.geom.LineString) {
			return 'LineString';
		} else if(geom instanceof ol.geom.Circle) {
			return 'Circle';
		}

		return null;
	}

	addMeasure(type) {
		this.removeMeasure();

		let source = new ol.source.Vector();

		let layer = new ol.layer.Vector({
			zIndex: 2,
			source: source,
			style: this.measureStyle
		});

		let interaction = new ol.interaction.Draw({
			source: source,
			type: type,
			style: this.measureStyle
		});

		this.map.addLayer(layer);
		this.map.addInteraction(interaction);

		this.measureInteraction = interaction;
		this.measureLayers.push(layer);

		this.addMeasureTooltip();
	}

	removeMeasure() {
		this.removeMeasureTooltip();

		this.map.removeInteraction(this.measureInteraction);
	}

	removeMeasureAll() {
		this.removeMeasure();

		this.map.getOverlays().clear();

		this.measureLayers.forEach(v => {
			this.map.removeLayer(v);
		});
	}
	
	onUIVisible(el) {
		const icon = el.find('i');
		if (icon.hasClass('fa-eye-slash')) {
			$('.map-ui').children().hide();
			
			icon.removeClass('fa-eye-slash');
			icon.addClass('fa-eye');
			el.parent().show();
			
			//화면별 설정
			$('.policy-map-menu').hide();
			$('.map-anal').hide();
		} else {
			$('.map-ui').children().show();
			
			icon.removeClass('fa-eye');
			icon.addClass('fa-eye-slash');
			
			//화면별 설정
			$('.policy-map-menu').show();
			$('.map-anal').show();
		}
	}
	
	capture() {
		this.map.once('rendercomplete', function () {
			const mapCanvas = document.createElement('canvas');
			const size = this.getSize();
			mapCanvas.id = 'canvas';
			mapCanvas.width = size[0];
			mapCanvas.height = size[1];
			const mapContext = mapCanvas.getContext('2d');
			Array.prototype.forEach.call(
				document.querySelectorAll('.ol-layer canvas'),
				
				function (canvas) {
					if (canvas.width > 0) {
						const opacity = canvas.parentNode.style.opacity;
						mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
						const transform = canvas.style.transform;
						const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
						CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
						mapContext.drawImage(canvas, 0, 0);
					}
				}
			);
			
			$('#canvas-warp').append(mapCanvas);

			var image = mapCanvas.toDataURL("image/jpg");
			
			const download = document.createElement('a');
			download.setAttribute('target', '_blank');
			download.href = image;
			$(download).triggerClick();
  				
			/*
			html2canvas(mapCanvas, {
				
			}).then(function(canvas) {
				canvas.toBlob(function(blob) {
					saveAs(blob, `test.png`);
				});
			}).catch(function(error) {
				console.log(1);
			});
			*/
			
			/*
			if (navigator.msSaveBlob) {
				navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
			} else {
				mapCanvas.toBlob(function(blob) {
					saveAs(blob, 'map.png');
				});
			}
			*/
		});
		
		this.map.renderSync();
	}

	addMeasureTooltip() {
		const eventPointerMove = e => {
			if(e.dragging) return;

			let cursorMessage = this.messages.drawCursor;

			if(sketch) {
				let geom = sketch.getGeometry();

				cursorMessage = this.messages['drawCursor' + geom.getType()];
			}

			$cursorTooltip.html(cursorMessage);
			$cursorTooltip.removeClass('hidden');

			cursorTooltip.setPosition(e.coordinate);
		};

		const eventPointerOut = () => {
			$cursorTooltip.addClass('hidden');
		};

		const eventDrawStart = e => {
			sketch = e.feature;

			let tooltipCoord = e.coordinate;

			listener = sketch.getGeometry().on('change', e => {
				let geom = e.target;
				let geomType = geom.getType();
				let message = this.formatMeasure(geom);

				if(geomType === 'Polygon') {
					tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if(geomType === 'LineString' || geomType === 'Circle') {
					tooltipCoord = geom.getLastCoordinate();
				}

				$measureTooltip.html(message);

				measureTooltip.setPosition(tooltipCoord);
			});
		};

		const eventDrawEnd = () => {
			$measureTooltip.attr('class', 'ol-tooltip ol-tooltip-static');
			measureTooltip.setOffset([0, -7]);

			[$measureTooltip, measureTooltip] = createTooltip('measure');

			this.tooltip.$measureTooltip = $measureTooltip;
			this.tooltip.measureTooltip = measureTooltip;

			sketch = null;

			ol.Observable.unByKey(listener);
		};

		const createTooltip = (type) => {
			const [cls, offset, positioning] = type === 'cursor' ?
					['ol-tooltip-cursor hidden', [15, 0], 'center-left'] :
					['ol-tooltip-measure', [0, -15], 'bottom-center'];

			let $tooltip = $(`<div class="ol-tooltip ${cls}" />`);
			let tooltip = new ol.Overlay({
				element: $tooltip.get(0),
				offset: offset,
				positioning: positioning
			});

			this.map.addOverlay(tooltip);

			return [$tooltip, tooltip];
		};
		
		let sketch, listener;

		let [$cursorTooltip, cursorTooltip] = createTooltip('cursor');
		let [$measureTooltip, measureTooltip] = createTooltip('measure');

		this.map.on('pointermove', eventPointerMove);
		this.viewport.on('mouseout', eventPointerOut);
		this.measureInteraction.on('drawstart', eventDrawStart);
		this.measureInteraction.on('drawend', eventDrawEnd);
		
		this.tooltip = {
			$cursorTooltip, cursorTooltip,
			$measureTooltip, measureTooltip,
			eventPointerMove,
			eventPointerOut,
			eventDrawStart,
			eventDrawEnd
		}
	}

	removeMeasureTooltip() {
		if(this.tooltip === null) return;

		this.map.removeOverlay(this.tooltip.cursorTooltip);
		this.map.removeOverlay(this.tooltip.measureTooltip);

		this.map.un('pointermove', this.tooltip.eventPointerMove);
		this.measureInteraction.un('drawstart', this.tooltip.eventDrawStart);
		this.measureInteraction.un('drawend', this.tooltip.eventDrawEnd);

		this.viewport.off('mouseout');
	}

	getMapSource(type = this.type) {
		const source = new ol.source.XYZ({
			url: this.urls[type],
			crossOrigin: 'anonymous'
		});

		return source;
	}

	getMapLayer(type = this.type) {
		const layer = new ol.layer.Tile({
			name: 'Map',
			source: this.getMapSource(type)
		});

		return layer;
	}

	setMapLayer(type) {
		const newLayer = this.getMapLayer(type);
		newLayer.setZIndex(-1);

		this.removeLayerByName('Map');
		this.map.addLayer(newLayer);
		
	}

	getLayerByName(name) {
		let layer;

		this.map.getLayers().forEach(v => {
			if(name == v.get('name'))
				layer = v;
		});

		return layer;
	}

	removeLayerByName(name) {
		const layer = this.getLayerByName(name);

		this.map.removeLayer(layer);
	}
}

class MapDataVisualizer {
	constructor(map, dataset = {}, opts = {}) {
		this.map = map;

		this.$grid = map.$el.find('.map-grid');
		this.$legend = map.$el.find('.map-legend');
		this.$legendTitle = this.$legend.find('h6');
		this.$legendInner = this.$legend.find('ul');

		this.useLegend = opts.useLegend || false;
		this.useGrid = opts.useGrid || false;

		this.dataset = dataset;
		this.dataCache = {};
		this.dataFormat = opts.dataFormat;

		this.currentDataset = null;

		this.stylerArgs = opts.stylerArgs || {};
		this.style = opts.style || new ol.style.Style({
			fill: new ol.style.Fill({ color: 'rgba(255,255,255,.5)' }),
			stroke: new ol.style.Stroke({ color: '#000', width: 1 })
		});

		this.selectInteraction = null;
		this.selectedStyle = opts.selectedStyle || new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: '#006bd8',
				width: 2
			}),
			fill: new ol.style.Fill({
				color: 'rgba(60,141,188,0.7)'
			})
		});
		
		this.mapStyler = opts.mapStyler;
		this.legendStyler = opts.legendStyler;
		this.legendTitleStyler = opts.legendTitleStyler;
		
		this.kendoGrid = opts.kendoGrid || {};

		this.init();
	}

	init() {
		if(this.$legend.length > 0) {
			if(this.$legendTitle.length < 1)
				this.$legendTitle = $('<h6 />').appendTo(this.$legend);

			if(this.$legendInner.length < 1)
				this.$legendInner = $('<ul />').appendTo(this.$legend);
		}

		this.styleFn = feature => {
			if(this.mapStyler) this.mapStyler(feature, this.style, this.stylerArgs);

			return this.style;
		};

		this.layer = new ol.layer.VectorImage({
			name: 'MapDataVisualizer',
			zIndex: 1,
			imageRatio: 1,
			source: new ol.source.Vector(),
			style: this.styleFn
		});

		this.map.map.addLayer(this.layer);
	}

	async modifyStylerArgs(fn) {
		fn(this.stylerArgs);

		this.layer.setStyle(this.styleFn);

		if(this.currentDataset !== null) {
			const data = await this.readDataset(this.currentDataset);
			
			this.drawLegend(data.legend);
		}
	}

	async readDataset(name) {
		let data = this.dataCache[name];

		if(!data) {
			let result = await $.ajax(this.dataset[name]);
			let [d, l] = this.dataFormat(result);
			
			data = this.dataCache[name] = {
				data: this.constructor.convertDataToFeatures(d),
				legend: l,
				rawData: d,
				rawResult: result
			};
		}

		return data;
	}

	async showDataset(name) {
		const data = await this.readDataset(name);

		this.currentDataset = name;

		const source = this.layer.getSource();
		source.clear(true);
		source.addFeatures(data.data);

		this.drawLegend(data.legend);
		this.drawGrid(data.rawData);
		
		this.layer.setVisible(true);

		this.displayLegend(this.useLegend ? true : false);
		this.displayGrid(this.useGrid ? true : false);
	}

	hideDataset() {
		this.layer.setVisible(false);

		this.displayLegend(false);
		this.displayGrid(false);
	}

	drawLegend(legends) {
		if(!this.useLegend)
			return;

		let title;
		
		if(typeof this.legendTitleStyler === 'function') {
			title = this.legendTitleStyler(this.stylerArgs);
		} else if(typeof this.legendTitleStyler === 'string') {
			title = this.legendTitleStyler;
		} else {
			title = this.currentDataset;
		}

		this.$legendTitle.html(title);
		this.$legendInner.html('');

		legends.some(v => {
			let color, text;

			if(typeof this.legendStyler === 'function') {
				[color, text] = this.legendStyler(v, this.stylerArgs);
			} else {
				color = '#000';
				text = v;
			}

			const $row = $(`<li><span></span>${text}</li>`);
			const $icon = $row.find('span');

			$icon.css('background-color', color);

			this.$legendInner.append($row);
		});
	}

	drawGrid(data) {
		if(!this.useGrid)
			return;

		const $grid = $('<div class="map-grid-inner" />');

		$grid.kendoGrid($.extend({}, Constant.KENDO_DEFAULT_GRID_OPTION, {
			dataSource: {
				data: data,
				pageSize: 5
			},
			pageable: {
				refresh: false,
				pageSizes: false,
				buttonCount: 5
			}
		}, this.kendoGrid));

		this.$grid.html($grid);
	}

	displayLegend(isShow) {
		this.$legend[isShow ? 'show' : 'hide']();
	}

	displayGrid(isShow) {
		this.$grid[isShow ? 'show' : 'hide']();
	}

	addSelect(type = 'click', onSelect) {
		this.removeSelect();

		this.selectInteraction = new ol.interaction.Select({
			condition: ol.events.condition[type],
			toggleCondition: ol.events.condition.never,
			style: () => this.selectedStyle,
			layers: [this.layer],
			multi: false
		});

		this.selectInteraction.on('select', onSelect);

		this.map.map.addInteraction(this.selectInteraction);
	}
	
	addSelectFeature(features, coordinate) {
		this.map.removeLayerByName('selecStyle');
		
		if (features == undefined) {
			return;
		}
		
		const vectorSource = new ol.source.Vector({
			features: new ol.format.GeoJSON().readFeatures(features.geometry)
		});
		
		const vectorLayer = new ol.layer.Vector({
			name: 'selecStyle',
			source: vectorSource,
			style: this.styleFunction,
			zIndex: 1
		});
		
		this.map.map.addLayer(vectorLayer);
	}
	
	removeSelect() {
		this.map.map.removeInteraction(this.selectInteraction);
	}

	static convertDataToFeatures(data, fn = null) {
		const geoJSON = {
			type: 'FeatureCollection',
			features: data.map(fn || (v => {
				return {
					type: 'Feature',
					properties: v,
					geometry: JSON.parse(v.geom)
				};
			}))
		}

		return this.convertGeoJSONToFeatures(geoJSON);
	}

	static convertGeoJSONToFeatures(geoJSON) {
		return new ol.format.GeoJSON().readFeatures(geoJSON);
	}

	static convertGeoJSONToGeometry(geoJSON) {
		return new ol.format.GeoJSON().readGeometry(geoJSON);
	}
	
	styleFunction (feature) {
		const styles = {
			'Point': new ol.style.Style({
				image: new ol.style.Circle({
					radius: 7,
					stroke: new ol.style.Stroke({ color: '#006bd8', width: 3 })
				})
			}),
			'LineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'green', width: 1
				})
			}),
			'MultiLineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'green', width: 1
				})
			}),
			'MultiPoint': new ol.style.Style({
				image: new ol.style.Circle({
					radius: 5, fill: null,
					stroke: new ol.style.Stroke({
						color: 'red', width: 1
					})
				})
			}),
			'MultiPolygon': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: '#006bd8', width: 3
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 0, 0.1)'
				})
			}),
			'Polygon': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'blue', lineDash: [4], width: 3
				}),
				fill: new ol.style.Fill({
					color: 'rgba(0, 0, 255, 0.1)'
				})
			}),
			'GeometryCollection': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'magenta', width: 2
				}),
				fill: new ol.style.Fill({
					color: 'magenta'
				}),
				image: new ol.style.Circle({
					radius: 10, fill: null,
					stroke: new ol.style.Stroke({
						color: 'magenta'
					})
				}),
			}),
			'Circle': new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'red', width: 2
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255,0,0,0.2)'
				})
			})
		};
		
		return styles[feature.getGeometry().getType()];
	}
}

export {
	Map as default,
	Map,
	MapDataVisualizer
};