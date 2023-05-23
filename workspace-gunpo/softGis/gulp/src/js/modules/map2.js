class Map2 {

	constructor($el) {
		this.$el = $($el);
		this.name = 'base';
		this.urls = {
			base: 'map_2d/2205pfk',
			skyview: 'map_skyview',
			hybrid: 'map_hybrid/1912uow',
			none: ''
		};
		this.projection = new ol.proj.Projection({
	        code: 'EPSG:5181',
	        extent: [-30000, -60000, 494288, 988576],
	        units: 'm'
	    });
		this.resolutions = [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25];
		this.extent = [-30000, -60000, 494288, 988576];
		this.centerCoord = [203690, 450216];
		this.defaultZoom = 8;
		this.defaultMinZoom = 6;
		this.defaultMaxZoom = 13;
		this.measureLayers = [];
		this.measureInteraction = null;
		this.measureStyle = new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(4, 117, 244, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(4, 117, 244, 0.7)',
				lineDash: [5, 5],
				width: 3
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
		proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
		proj4.defs("EPSG:5174", "+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs");
		proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
		proj4.defs("EPSG:5181", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
		proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
	    ol.proj.setProj4 = proj4;
	    
	    ol.proj.addProjection(new ol.proj.Projection({
	    	code: "EPSG:5181",
	    	units: "m"
	    }));
	    
		const controls = [
			//new ol.control.OverviewMap({
			//	layers: [this.getMapLayer()]
			//}),
			//new ol.control.MousePosition({
            //    coordinateFormat: ol.coordinate.createStringXY(2)
            //}),
			new ol.control.FullScreen(),
			new ol.control.Zoom()
		];
		
		const view = new ol.View({
			projection: this.projection,
            extent: this.extent,
            resolutions: this.resolutions,
            maxResolution: this.resolutions[0],
            zoomFactor: 1,
            center : this.centerCoord,
            zoom : this.defaultZoom,
            minZoom: this.defaultMinZoom,
            maxZoom: this.defaultMaxZoom,
		    constrainOnlyCenter: true
		});
		
		this.map = new ol.Map({
			target: this.$el.get(0),
			renderer: 'canvas',
			layers: [this.getMapLayer('base')],
			/*
			layers: [
				new ol.layer.Group({
                    title: 'Base Maps',
                    name: 'Daum Map',
                    layers: [ this.getMapLayer('base') ]
				})
			],
			*/
			url: this.urls['base'],
			controls: controls,
			renderer: 'canvas',
            //interactions : ol.interaction.defaults({
            //    shiftDragZoom : true
            //}),
			view: view
		});

		this.viewport = $(this.map.getViewport());
		this.convertControls();
		this.centerAnimation();
	}
	
	convertControls() {
		this.$el.find('[data-map-action]').each((i, el) => {
			let $el = $(el);
			let action = $el.data('map-action');

			if (action.indexOf(':') === 0) {
				let $control = this.$el.find('.ol-' + action.slice(1));

				if (!$control.is('button')) {
					$control = $control.find('button');
				}

				$el.on('click', _ => $control.click());
			} else {
				let func = _ => dd(action);
				
				switch(action) {
					case 'home':
						func = _ => this.centerAnimation();
						break;
					case 'my-location':
						func = _ => this.myLocation();
						break;
					case 'vworld-wms': func = _ => this.addVworldWms(el); break;
					case 'map-base': func = _ => this.setMapSource('base'); break;
					case 'map-skyview': func = _ => this.setMapSource('skyview'); break;
					case 'map-none': func = _ => this.setMapSource('none'); break;
					case 'map-gray': func = _ => this.setMapSource('gray'); break;
					case 'map-midnight': func = _ => this.setMapSource('midnight'); break;
					case 'measure-exit': func = _ => this.removeMeasure(); break;
					case 'measure-line': func = _ => this.addMeasure('LineString', el); break;
					case 'measure-polygon': func = _ => this.addMeasure('Polygon', el); break;
					case 'measure-radius': func = _ => this.addMeasure('Circle', el); break;
					case 'measure-reset': func = _ => this.removeMeasureAll(); break;
					case 'address': func = _ => this.getAddress(); break;
					case 'capture': func = _ => this.capture(); break;
					case 'download': func = _ => this.download(); break;
				}

				$el.on('click', func);
			}
		});
	}
	
	formatMeasure(geom) {
		let v = '0';

		if (geom instanceof ol.geom.Polygon) {
			v = geom.getArea();
			if (v > 1e4) v = (Math.round(v / 1e4) / 1e2) + ' km<sup>2</sup>';
			else v = (Math.round(v * 1e2) / 1e2) + ' m<sup>2</sup>';
		} else if (geom instanceof ol.geom.LineString) {
			v = Math.round(geom.getLength() * 1e2) / 1e2;
			if (v > 100) v = (Math.round(v / 10) / 1e2) + ' km';
			else v = (Math.round(v * 1e2) / 1e2) + ' m';
		} else if (geom instanceof ol.geom.Circle) {
			v = Math.round(geom.getRadius() * 1e2) / 1e2;
			if (v > 100) v = (Math.round(v / 10) / 1e2) + ' km';
			else v = (Math.round(v * 1e2) / 1e2) + ' m';
		}

		return v;
	}

	getGeometryTypeName(geom) {
		if (geom instanceof ol.geom.Polygon) {
			return 'Polygon';
		} else if (geom instanceof ol.geom.LineString) {
			return 'LineString';
		} else if (geom instanceof ol.geom.Circle) {
			return 'Circle';
		}

		return null;
	}

	addMeasure(type, el) {
		this.removeMeasure();
		
		if ($(el).hasClass("active")) {
			 $(el).removeClass("active");
			 return;
		} else {
			$(el).addClass("active");
		}

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
	
	capture() {
		let layer = this.getTopLayer();
		let layerName = layer.get("layerName");
		let schema = layerName.split(":")[0];
		let table = layerName.split(":")[1];
		var href = codroe.util.wmsUrl + "?service=WMS&version=1.1.0&request=GetMap&layers=" + layerName + "&maxFeatures=50&outputFormat=SHAPE-ZIP";
		var link = document.getElementById('image-download');
		$(link).attr("href", href);
		$(link).get(0).click();
	}
	
	//shp download
	download() {
		let layerId = $(event.target).data("id");
		let layerName = $(event.target).data("name");
		
		let url, schema, table;
		if (layerId == undefined) {
			layerId = this.getTopLayer().get("layerName");
			schema = layerId.split(":")[0];
			table = layerId.split(":")[1];
		} else {
			schema = layerId.split(".")[0];
			table = layerId.split(".")[1];
		}
		
		if (schema == "mdl_raster") {
			layerId = schema + "%3A" + table;
			url = codroe.util.rasterUrl + "?service=WMS&version=1.1.0&request=GetMap&layers=" + layerId + "&bbox=200846.4364%2C448300.465859123%2C206502.91522628075%2C452544.0&width=768&height=576&srs=EPSG%3A5181&format=image%2Ftiff";
		} else if (schema == "mdl_result") {
			layerId = schema + "%3A" + table;
			url = codroe.util.shpUrl.replace("new_sdgis", schema) + "?service=WMS&version=1.1.0&request=GetMap&layers=" + layerId + "&bbox=200846.4364%2C448300.465859123%2C206502.91522628075%2C452544.0&width=768&height=576&srs=EPSG%3A5181&format=image%2Fpng";
		} else {
			layerId = "new_sdgis:" + table;
			url = codroe.util.shpUrl + "?service=WFS&version=1.0.0&request=GetFeature&typeName=" + layerId + "&maxFeatures=50&outputFormat=SHAPE-ZIP";
		}
		
		const link = document.createElement('a');
		link.style.display = 'none';
		link.href = url;
		link.target = "_blank";
	    document.body.appendChild(link);
	    link.click();
	    window.URL.revokeObjectURL(url);
	    link.remove();
	}
	
	addMeasureTooltip() {
		const eventPointerMove = e => {
			if (e.dragging) return;

			let cursorMessage = this.messages.drawCursor;

			if (sketch) {
				let geom = sketch.getGeometry();

				cursorMessage = this.messages['drawCursor' + geom.getType()];
			}

			$cursorTooltip.html(cursorMessage);
			$cursorTooltip.removeClass('hidden');

			cursorTooltip.setPosition(e.coordinate);
		};

		const eventPointerOut = _ => {
			$cursorTooltip.addClass('hidden');
		};

		const eventDrawStart = e => {
			sketch = e.feature;

			let tooltipCoord = e.coordinate;

			listener = sketch.getGeometry().on('change', e => {
				let geom = e.target;
				let geomType = geom.getType();
				let message = this.formatMeasure(geom);

				if (geomType === 'Polygon') {
					tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if (geomType === 'LineString' || geomType === 'Circle') {
					tooltipCoord = geom.getLastCoordinate();
				}

				$measureTooltip.html(message);

				measureTooltip.setPosition(tooltipCoord);
			});
		};

		const eventDrawEnd = _ => {
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
		if (this.tooltip === null) return;

		this.map.removeOverlay(this.tooltip.cursorTooltip);
		this.map.removeOverlay(this.tooltip.measureTooltip);

		this.map.un('pointermove', this.tooltip.eventPointerMove);
		this.measureInteraction.un('drawstart', this.tooltip.eventDrawStart);
		this.measureInteraction.un('drawend', this.tooltip.eventDrawEnd);

		this.viewport.off('mouseout');
	}

	getMapSource(type = this.type) {
		const source = new ol.source.XYZ({
			projection: 'EPSG:5181',
			url: this.urls[type],
            tileSize: 256,
            zoom: this.defaultZoom,
            minZoom: this.defaultMinZoom,
            maxZoom: this.defaultMaxZoom,
            tileGrid: new ol.tilegrid.TileGrid({
                origin: [this.extent[0], this.extent[1]],
                resolutions: this.resolutions
            }),
            tileUrlFunction: function (tileCoord, pixelRatio, projection) {
                if (tileCoord == null) return undefined;
                var s = Math.floor(Math.random() * 4);
                var z = this.getResolutions().length - tileCoord[0];
                var x = Math.abs(tileCoord[1]);
                var y = Math.abs(tileCoord[2]) - 1;
                
                if (this.urls == null) {
                	return '';
                } else if (this.urls[0] == 'map_skyview') {
                	return 'http://map' + s + '.daumcdn.net/' + this.urls[0] + '/L' + z + '/' + y + '/' + x + '.jpg?v=160114';
            	} else {
                	return 'http://map' + s + '.daumcdn.net/' + this.urls[0] + '/L' + z + '/' + y + '/' + x + '.png';
                }
            }
        });
		
		return source;
	}
	
	setMapSource(type = this.type) {
		let layers = [];
		this.map.getLayers().forEach(layer => {
			let type = layer.get('title');
			if (type == 'base' || type == "hybrid" || type == 'skyview' || type == 'none') layers.push(layer);
		});
		
		layers.forEach(layer => {
			this.map.removeLayer(layer);}
		);
		
		let activeBtn = $('.map-type.active');
		//활성화 버튼 클릭시 배경 지움 
		if (activeBtn.length > 0 && $(activeBtn).attr('data-map-action').indexOf(type) > -1) {
			const noneLayer = this.getMapLayer('none');
			this.map.addLayer(noneLayer);
		} else {
			if (type == 'skyview') {
				//스카이뷰의 경우 배경과 정보 레이어 두개를 불러옴
				const skyviewLayer = this.getMapLayer('skyview');
				this.map.addLayer(skyviewLayer);
				const hybridLayer = this.getMapLayer('hybrid');
				this.map.addLayer(hybridLayer);
			} else if (type == 'none') {
				const noneLayer = this.getMapLayer('none');
				this.map.addLayer(noneLayer);
			} else {
				const baseLayer = this.getMapLayer('base');
				this.map.addLayer(baseLayer);
			}
		}
	}

	getMapLayer(type = this.type) {
		const layer = new ol.layer.Tile({
			title: type,
            visible : true,
            name: 'base',
            crossOrigin: 'anonymous',
			source: this.getMapSource(type)
		});

		return layer;
	}

	setMapLayer(type) {
		const newLayer = this.getMapLayer(type);
		this.removeLayerByName('Map');
		this.map.addLayer(newLayer);
	}

	getLayerByTypeAndLayerName(type, layerName) {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get('type') != undefined && v.get('layerName') != undefined) {
				if (type == v.get('type') && layerName == v.get('layerName').replace(':', '.')) layer = v;
			}
		});
		return layer;
	}
	
	getLayerByTypeNameLayerName(type, layerName, name) {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get('type') != undefined && v.get('name') != undefined && v.get('layerName') != undefined) {
				if (type == v.get('type') && name == v.get('name') && layerName == v.get('layerName').replace(':', '.')) layer = v;
			}
		});
		return layer;
	}
	
	getLayerByName(name) {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get('name') != undefined) {
				if (name == v.get('name').replace(':', '.')) layer = v;
			}
		});
		return layer;
	}
	
	getLayerByLayerName(layerName) {
		let layer;
		this.map.getLayers().forEach(v => {
			
			if (v.get('layerName') != undefined) {
				if (layerName === v.get('layerName').replace(':', '.')) layer = v;
			}
		});
		return layer;
	}
	
	getTopLayer() {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get("name") != "base" && v.get("layerName").replace(':', '.').indexOf("adong_bndry_") == -1) layer = v;
		});
		return layer;
	}

	removeLayerByName(name) {
		const layer = this.getLayerByName(name);
		this.map.removeLayer(layer);
	}
	
	removeAllLayerByLayerName(layerName) {
		let layers = [];
		this.map.getLayers().forEach(v => {
			if (v.get('layerName') != undefined) {
				if (layerName == v.get('layerName').replace(':', '.') || layerName == v.get('layerName').replace('.', ':')) layers.push(v);
			}
		});
		
		layers.forEach(v => {
			this.map.removeLayer(v);
		});
	}
	
	removeLayerByLayerName(layerName) {
		const layer = this.getLayerByLayerName(layerName);
		this.map.removeLayer(layer);
	}
	
	removeLayerByTypeAndLayerName(type, layerName) {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get('type') != undefined && v.get('layerName') != undefined) {
				if (type == v.get('type') && layerName == v.get('layerName').replace(':', '.')) layer = v;
			}
		});
		this.map.removeLayer(layer);
	}
	
	removeLayerByTypeNameLayerName(type, layerName, name) {
		let layer;
		this.map.getLayers().forEach(v => {
			if (v.get('type') != undefined && v.get('name') != undefined && v.get('layerName') != undefined) {
				if (type == v.get('type') && name == v.get('name') && layerName == v.get('layerName').replace(':', '.')) layer = v;
			}
		});
		this.map.removeLayer(layer);
	}
	
	removeAllLayer() {
		let layers = [];
		this.map.getLayers().forEach(v => {
			if (v != undefined && v.get("title") != "base") layers.push(v);
		});
		
		layers.forEach(v => {
			this.map.removeLayer(v);
		});
	}
	
	centerAnimation() {
		this.map.getView().animate({
			center: this.centerCoord,
			zoom: this.defaultZoom,
			duration: 200
		});
	}
	
	myLocation() {
		const _view = this.map.getView();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				_view.animate({
					//center: [pos.coords.longitude, pos.coords.latitude],
					center: ol.proj.transform([pos.coords.longitude, pos.coords.latitude], 'EPSG:4326', 'EPSG:5181'),
					duration: 500
				});
			});
		}
	}
	
}

class Map2DataVisualizer {
	constructor(map, dataset = {}, opts = {}) {
		this.map = map;

		this.$grid = map.$el.siblings('.map-grid');
		this.$legend = map.$el.find('.map-legend');
		this.$legendTitle = this.$legend.find('h6');
		this.$legendInner = this.$legend.find('ul');

		if (this.$legend.length > 0) {
			if (this.$legendTitle.length < 1)
				this.$legendTitle = $('<h6 />').appendTo(this.$legend);

			if (this.$legendInner.length < 1)
				this.$legendInner = $('<ul />').appendTo(this.$legend);
		}

		this.useGrid = opts.useGrid || false;

		this.dataset = dataset;
		this.dataCache = {};
		this.dataFormat = opts.dataFormat;

		this.currentDataset = null;

		this.style = opts.style || new ol.style.Style({
			fill : new ol.style.Fill({ color : 'rgba(255,255,255,.3)' }),
			stroke : new ol.style.Stroke({ color : '#000', width : .2 })
		});
		this.stylerArgs = opts.stylerArgs || {};
		this.mapStyler = opts.mapStyler;
		this.legendStyler = opts.legendStyler;
		this.legendTitleStyler = opts.legendTitleStyler;

		this.selectInteraction = null;
		this.selectedStyle = opts.selectedStyle || new ol.style.Style({
			stroke : new ol.style.Stroke({
				color : '#3c8dbc',
				width : 2
			}),
			fill : new ol.style.Fill({
				color : 'rgba(60,141,188,0.7)'
			})
		});

		this.kendoGrid = opts.kendoGrid || {};

		this.init();
	}

	init() {
		this.styleFn = feature => {
			if (this.mapStyler) this.mapStyler(feature, this.style, this.stylerArgs);

			return this.style;
		};

		this.layer = new ol.layer.VectorImage({
			name: 'Map2DataVisualizer',
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

		const data = this.dataCache[this.currentDataset];
		
		this.drawLegend(data.legend);
	}

	async readDataset(name) {
		let data = this.dataCache[name];

		if (!data) {
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

	async showDataset(name, isOverlap = false) {
		const data = await this.readDataset(name);

		if (!isOverlap) {
			this.hideAllDataset();
		}

		this.currentDataset = name;
		
		this.layer.setVisible(true);
		this.displayLegend(true);
		this.displayGrid(true);

		const source = this.layer.getSource();
		source.clear(true);
		source.addFeatures(data.data);

		if (this.useGrid) {
			const $grid = $('<div class="map-grid-inner" />');

			$grid.kendoGrid($.extend(KENDO_GRID_OPTS, {
				dataSource: {
					data: data.rawData,
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

		this.drawLegend(data.legend);
	}

	hideDataset() {
		this.layer.setVisible(false);
		this.displayLegend(false);
		this.displayGrid(false);
	}

	hideAllDataset() {
		this.map.map.getLayers().getArray().forEach(v => {
			if (v.get('name') === this.layer.get('name'))
				v.setVisible(false);
		});
	}

	drawLegend(legends) {
		let title;
		
		if (typeof this.legendTitleStyler === 'function') {
			title = this.legendTitleStyler(this.stylerArgs);
		} else if (typeof this.legendTitleStyler === 'string') {
			title = this.legendTitleStyler;
		}

		this.$legendTitle.html(title);
		this.$legendInner.html('');

		legends.some(v => {
			const [color, text] = this.legendStyler(v, this.stylerArgs);
			const $row = $(`<li><span></span>${text}</li>`);
			const $icon = $row.find('span');

			$icon.css('background-color', color);

			this.$legendInner.append($row);
		});
	}

	displayLegend(isShow) {
		this.$legend[isShow ? 'show' : 'hide']();
	}

	displayGrid(isShow) {
		this.$grid[isShow ? 'show' : 'hide']();
	}

	addSelect(type='click', onSelect) {
		this.removeSelect();

		this.selectInteraction = new ol.interaction.Select({
			condition: ol.events.condition[type],
			style: _ => this.selectedStyle
		});

		this.selectInteraction.on('select', onSelect);

		this.map.map.addInteraction(this.selectInteraction);
	}

	removeSelect() {
		this.map.map.removeInteraction(this.selectInteraction);
	}
	
	addHighlightOLayer() {
		
	}
	
	removeHighlightLayer() {
		
	}

	static convertDataToFeatures(data, fn = null) {
		const formatter = new ol.format.GeoJSON;

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

		return formatter.readFeatures(geoJSON);
	}
}

export {
	Map2 as default,
	Map2,
	Map2DataVisualizer
};