let __instance__;


class Geoserver {
	constructor() {
		if(__instance__) return __instance__;

		__instance__ = this;
	}

	getWMSLayer(layerName) {
		const layer = new ol.layer.Tile({
			source: new ol.source.TileWMS({
				url: Constant.GEOSERVER_URL + '/wms',
				params: {
					FORMAT: 'image/png',
					VERSION: '1.1.1',
					TILED: true,
					STYLES: '',
					LAYERS: 'softgis:' + layerName,
					EXCEPTIONS: 'application/vnd.ogc.se_inimage'
				}
			})
		});

		return layer;
	}

	getWMSLegend(layerName) {
		const legend = new Image;

		legend.src = Constant.GEOSERVER_URL + '/wms?' + _.queryString({
			SERVICE: 'WMS',
			REQUEST: 'GetLegendGraphic',
			VERSION: '1.0.0',
			FORMAT: 'image/png',
			LAYER: Constant.GEOSERVER_WORKSPACE + ':' + layerName,
			LEGEND_OPTIONS: 'fontAntiAliasing:true;fontSize:10;dpi:100;fontName:SansSerif.plain'
		});

		return legend;
	}

	async getWFSFeatures(layerName, dataProjection = 'EPSG:5179', featureProjection = 'EPSG:4326') {
		const geojson = await $.get(Constant.GEOSERVER_URL + '/ows?' + _.queryString({
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: Constant.GEOSERVER_WORKSPACE + ':' + layerName,
			outputFormat: 'application/json'
		}));

		return new ol.format.GeoJSON().readFeatures(geojson, {
			dataProjection: dataProjection,
			featureProjection: featureProjection,
		});
	}

	async getGeometryType(layerName) {
		const result = await $.get(Constant.GEOSERVER_URL + '/ows?' + _.queryString({
			service: 'WFS',
			version: '1.1.0',
			request: 'DescribeFeatureType',
			typeName: Constant.GEOSERVER_WORKSPACE + ':' + layerName,
			outputFormat: 'application/json'
		}));

		const featureType = result.featureTypes.pop();

		for(const i in featureType.properties) {
			const prop = featureType.properties[i];

			if(prop.name === 'geom') {
				return prop.localType.toUpperCase();
			}
		}

		return null;
	}

	downloadShapeFile(layerName) {
		const properties = {
			service: 'WFS',
			version: '1.0.0',
			request: 'GetFeature',
			typeName: Constant.GEOSERVER_WORKSPACE + ':' + layerName,
			outputFormat: 'SHAPE-ZIP'
		};

		const a = document.createElement('a');
		a.href = Constant.GEOSERVER_URL + '/ows?' + _.queryString(properties);
		a.target = '_blank';
		a.click();
	}
}

const GeoserverInstance = new Geoserver();

export {
	GeoserverInstance as default,
	GeoserverInstance,
	Geoserver
};