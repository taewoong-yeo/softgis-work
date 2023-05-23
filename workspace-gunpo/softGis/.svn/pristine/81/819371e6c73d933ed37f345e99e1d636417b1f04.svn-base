var SHP = {
	NULL: 0,
	POINT: 1,
	POLYLINE: 3,
	POLYGON: 5
};

function SHPParser() { }

function DBFParser() { }

SHP.getShapeName = function(id) {
	for (name in this) {
		if (id === this[name]) {
			return name;
		}
	}
};

SHPParser.load = function(src, callback, onerror) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', src);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() {
		console.log(xhr.response);
		var d = new SHPParser().parse(xhr.response,src);
		callback(d);
	};
	xhr.onerror = onerror;
	xhr.send(null);
};

SHPParser.prototype.parse = function(arrayBuffer,src) {
	var o = {};
	var dv = new DataView(arrayBuffer);
	var idx = 0;
	o.fileName = src;
	o.fileCode = dv.getInt32(idx, false);
	if (o.fileCode != 0x0000270a) {
		throw (new Error("Unknown file code: " + o.fileCode));
	}
	idx += 6*4;
	o.wordLength = dv.getInt32(idx, false);
	o.byteLength = o.wordLength * 2;
	idx += 4;
	o.version = dv.getInt32(idx, true);
	idx += 4;
	o.shapeType = dv.getInt32(idx, true);
	idx += 4;
	o.minX = dv.getFloat64(idx, true);
	o.minY = dv.getFloat64(idx+8, true);
	o.maxX = dv.getFloat64(idx+16, true);
	o.maxY = dv.getFloat64(idx+24, true);
	o.minZ = dv.getFloat64(idx+32, true);
	o.maxZ = dv.getFloat64(idx+40, true);
	o.minM = dv.getFloat64(idx+48, true);
	o.maxM = dv.getFloat64(idx+56, true);
	idx += 8*8;
	o.records = [];
	while (idx < o.byteLength) {
		var record = {};
		record.number = dv.getInt32(idx, false);
		idx += 4;
		record.length = dv.getInt32(idx, false);
		idx += 4;
		try {
			record.shape = this.parseShape(dv, idx, record.length);
		} catch(e) {
			console.log(e, record);
		}
		idx += record.length * 2;
		o.records.push(record);
	}
	return o;
};

SHPParser.prototype.parseShape = function(dv, idx, length) {
	var i=0, c=null;
	var shape = {};
	shape.type = dv.getInt32(idx, true);
	idx += 4;
	var byteLen = length * 2;
	switch (shape.type) {
		case SHP.NULL: // Null
			break;

		case SHP.POINT: // Point (x,y)
			shape.content = {
				x: dv.getFloat64(idx, true),
				y: dv.getFloat64(idx+8, true)
			};
			break;
		case SHP.POLYLINE: // Polyline (MBR, partCount, pointCount, parts, points)
		case SHP.POLYGON: // Polygon (MBR, partCount, pointCount, parts, points)
			c = shape.content = {
				minX: dv.getFloat64(idx, true),
				minY: dv.getFloat64(idx+8, true),
				maxX: dv.getFloat64(idx+16, true),
				maxY: dv.getFloat64(idx+24, true),
				parts: new Int32Array(dv.getInt32(idx+32, true)),
				points: new Float64Array(dv.getInt32(idx+36, true)*2)
			};
			idx += 40;
			for (i=0; i<c.parts.length; i++) {
				c.parts[i] = dv.getInt32(idx, true);
				idx += 4;
			}
			for (i=0; i<c.points.length; i++) {
				c.points[i] = dv.getFloat64(idx, true);
				idx += 8;
			}
			break;

		case 8: // MultiPoint (MBR, pointCount, points)
		case 11: // PointZ (X, Y, Z, M)
		case 13: // PolylineZ
		case 15: // PolygonZ
		case 18: // MultiPointZ
		case 21: // PointM (X, Y, M)
		case 23: // PolylineM
		case 25: // PolygonM
		case 28: // MultiPointM
		case 31: // MultiPatch
			throw new Error("Shape type not supported: "
											+ shape.type + ':' +
											+ SHP.getShapeName(shape.type));
		default:
			throw new Error("Unknown shape type at " + (idx-4) + ': ' + shape.type);
	}
	return shape;
};

DBFParser.load = function(url, callback, onerror) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function() {
		var d = new DBFParser().parse(xhr.response,url);
		callback(d);
	};
	xhr.onerror = onerror;
	xhr.send(null);
};

DBFParser.prototype.parse = function(arrayBuffer,src,encoding) {
	var o = {};
	var dv = new DataView(arrayBuffer);
	var idx = 0;
	o.fileName = src;
	o.version = dv.getInt8(idx, false);

	idx += 1;
	o.year = dv.getUint8(idx) + 1900;
	idx += 1;
	o.month = dv.getUint8(idx);
	idx += 1;
	o.day = dv.getUint8(idx);
	idx += 1;

	o.numberOfRecords = dv.getInt32(idx, true);
	idx += 4;
	o.bytesInHeader = dv.getInt16(idx, true);
	idx += 2;
	o.bytesInRecord = dv.getInt16(idx, true);
	idx += 2;
	//reserved bytes
	idx += 2;
	o.incompleteTransation = dv.getUint8(idx);
	idx += 1;
	o.encryptionFlag = dv.getUint8(idx);
	idx += 1;
	// skip free record thread for LAN only
	idx += 4;
	// reserved for multi-user dBASE in dBASE III+
	idx += 8;
	o.mdxFlag = dv.getUint8(idx);
	idx += 1;
	o.languageDriverId = dv.getUint8(idx);
	idx += 1;
	// reserved bytes
	idx += 2;

	o.fields = [];
	while (true) {
		var field = {};
		var nameArray = [];
		for (var i = 0; i < 10; i++) {
			var letter = dv.getUint8(idx);
			if (letter != 0) nameArray.push(String.fromCharCode(letter));
			idx += 1;
		}
		field.name = nameArray.join('');
		idx += 1;
		field.type = String.fromCharCode(dv.getUint8(idx));
		idx += 1;
		// Skip field data address
		idx += 4;
		field.fieldLength = dv.getUint8(idx);
		idx += 1;
		//field.decimalCount = dv.getUint8(idx);
		idx += 1;
		// Skip reserved bytes multi-user dBASE.
		idx += 2;
		field.workAreaId = dv.getUint8(idx);
		idx += 1;
		// Skip reserved bytes multi-user dBASE.
		idx += 2;
		field.setFieldFlag = dv.getUint8(idx);
		idx += 1;
		// Skip reserved bytes.
		idx += 7;
		field.indexFieldFlag = dv.getUint8(idx);
		idx += 1;
		o.fields.push(field);
		var test = dv.getUint8(idx);
		// Checks for end of field descriptor array. Valid .dbf files will have this
		// flag.
		if (dv.getUint8(idx) == 0x0D) break;
	}

	idx += 1;
	o.records = [];

	for (var i = 0; i < o.numberOfRecords; i++) {
		var record = {};
		// Skip record deleted flag.
		//record["recordDeleted"] = String.fromCharCode(dv.getUint8(idx));
		idx += 1;
		for (var j = 0; j < o.fields.length; j++) {
			var charString = [];
			for (var h = 0; h < o.fields[j].fieldLength; h++) {
				// charString.push(String.fromCharCode(dv.getUint8(idx)));
				charString.push(dv.getUint8(idx));
				idx += 1;
			}
			// record[o.fields[j].name] = charString.join('').trim();
			record[o.fields[j].name] = new Uint8Array(charString);

		}
		o.records.push(record);
	}

	return o;
};

function parseSHP(binaryFile, _opts) {
	var opts = _opts || {};

	var encoding = opts.encoding || 'utf-8';

	var inEPSG = opts.inEPSG || '5179';
	var outEPSG = opts.outEPSG || '5179';

	var onProgress = opts.progress;
	var onError = opts.error;
	var onComplete = opts.complete;

	var reader = new FileReader;

	function PromiseWrapper(resolve, reject) {
		reader.onload = function(e) {
			JSZip.loadAsync(binaryFile).then(function(result) {
				var zip = result;
				var shpFile = zip.file(/.shp$/i)[0];
				var dbfFile = zip.file(/.dbf$/i)[0];
				var prjFile = zip.file(/.prj$/i)[0];
				var prjEPSG = proj4('EPSG:' + inEPSG);

				var promises = [
					shpFile.async('arraybuffer', onUpdate.bind({ index: 0 })),
					dbfFile ? dbfFile.async('arraybuffer', onUpdate.bind({ index: 1 })) : null,
					prjFile ? prjFile.async('string', onUpdate.bind({ index: 2 })) : null
				];

				var progressionVaildCount = promises.filter(function(v) { return v !== null; }).length;
				var progression = promises.map(function(v) { return 0; });

				Promise.all(promises).then(function(results) {
					var shpResult, dbfResult, prjResult;
					var shpRecords, dbfRecords;

					var shp = results[0];
					var dbf = results[1];
					var prj = results[2];

					shpResult = new SHPParser().parse(shp, shpFile.name);
					shpRecords = shpResult.records;

					if(dbf !== null) {
						var decoder = new TextDecoder(encoding);

						dbfResult = new DBFParser().parse(dbf, dbfFile.name);
						dbfRecords = dbfResult.records;

						for(var i in dbfRecords) {
							for(var j in dbfRecords[i]) {
								var decodeVal = decoder.decode(dbfRecords[i][j]);
								decodeVal = decodeVal.trim();
								decodeVal = decodeVal.replace(/\0/g, '');

								dbfRecords[i][j] = decodeVal;
							}
						}
					}

					if(prj !== null) {
						proj4.defs('PRJ_EPSG', prj);

						prjEPSG = proj4('PRJ_EPSG');
					}

					var geojson = {
						type: 'FeatureCollection',
						bbox: transformCoordinate(shpResult.minX, shpResult.minY).concat(
							  transformCoordinate(shpResult.maxX, shpResult.maxY)),
						features: []
					};

					for(var i = 0; i < shpRecords.length; i++) {
						var feature = {
							type: 'Feature',
							geometry: {},
							properties: dbfRecords[i]
						};

						switch(shpRecords[i].shape.type) {
							case 1:
								feature.geometry.type = 'Point';
								feature.geometry.coordinates = transformCoordinate(
									shpRecords[i].shape.content.x,
									shpRecords[i].shape.content.y
								);
								break;
							case 3:
								feature.geometry.type = 'MultiLineString';
								feature.geometry.coordinates = [];
								for(var j = 0; j < shpRecords[i].shape.content.points.length; j += 2) {
									feature.geometry.coordinates.push(transformCoordinate(
										shpRecords[i].shape.content.points[j],
										shpRecords[i].shape.content.points[j + 1]
									));
								}
								feature.geometry.coordinates = [feature.geometry.coordinates];
								break;
							case 8:
								feature.geometry.type = 'MultiPoint';
								feature.geometry.coordinates = [];
								for(var j = 0; j < shpRecords[i].shape.content.points.length; j += 2) {
									feature.geometry.coordinates.push(transformCoordinate(
										shpRecords[i].shape.content.points[j],
										shpRecords[i].shape.content.points[j + 1]
									));
								}
								break;
							case 5:
								feature.geometry.type = 'Polygon';
								feature.geometry.coordinates = [];

								for(var p = 0; p < shpRecords[i].shape.content.parts.length; p++) {
									var partsIdx = shpRecords[i].shape.content.parts[p];
									var parts = [];

									for(var j = partsIdx * 2; j < (shpRecords[i].shape.content.parts[p + 1] * 2 || shpRecords[i].shape.content.points.length); j += 2) {
										parts.push(transformCoordinate(
											shpRecords[i].shape.content.points[j],
											shpRecords[i].shape.content.points[j + 1]
										));
									}

									feature.geometry.coordinates.push(parts);
								}
								break;
							default:
						}

						if('coordinates' in feature.geometry)
							geojson.features.push(feature);
					}

					resolve([geojson, zip]);

					if(onComplete !== undefined)
						onComplete(geojson, zip);
				}).catch(reject).catch(onError);

				function onUpdate(e) {
					var totalPercent;

					progression[this.index] = e.percent;

					totalPercent = progression.reduce(function(acc, v) {
						return acc + v;
					});

					if(onProgress !== undefined)
						onProgress(totalPercent / progressionVaildCount / 100);
				}

				function transformCoordinate(x, y) {
					return proj4(prjEPSG, proj4('EPSG:' + outEPSG), [parseFloat(x), parseFloat(y)]);
				}
			}).catch(reject).catch(onError);
		}

		reader.readAsArrayBuffer(binaryFile);
	}

	return new Promise(PromiseWrapper);
}

export {
	parseSHP as default,
	parseSHP,
	SHPParser,
	DBFParser
}