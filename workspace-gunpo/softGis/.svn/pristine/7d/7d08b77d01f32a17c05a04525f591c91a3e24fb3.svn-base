class ReafletDraw {
	Math.log10 = Math.log10 || function(x) {
		return Math.log(x) * Math.LOG10E;
	};
	
	
	
	function distMeasure(){
		if(distOnOff != 0){
			finishDist();
			map.off('click', measureDist);
			distOnOff = 0;
		}else{
			map.on('click', measureDist);
		}
	}
	
	function areaMeasure(){
		if(areaOnOff != 0){
			finishArea();
			map.off('click', measureArea);
			areaOnOff = 0;
		}else{
			map.on('click', measureArea);
		}
	}
	
	function radiusMeasure(){
		if(radiusOnOff != 0){
			finishRadius();
			map.off('click', measureRadius);
			radiusOnOff = 0;
		}else{
			map.on('click', measureRadius);
		}
	}
	
	function measureAllOff(){
		finishDist();
		map.off('click', measureDist);
		distOnOff = 0;
		
		finishArea();
		map.off('click', measureArea);
		areaOnOff = 0;
		
		finishRadius();
		map.off('click', measureRadius);
		radiusOnOff = 0;
	}
	
	function measureClear(){
		var measureLayer = new Array();
		map.eachLayer(function(layer){
			var chkMeasureLayer = layer.options.measure == 'true' ? true : false;
			if(chkMeasureLayer == true){
				measureLayer.push(layer);
			}
		});
		$.each(measureLayer, function(i, v){
			v.removeFrom(map);
		});
	}
	
	/* 거리 측정 ↓ */
	var distLastPointLatLng = null;
	var lineDist = null;
	var pointDist = null;
	var distLength = 0;
	var distOnOff = 0;
	var popupDist = null;
	function measureDist(e){
		distOnOff = 1;
		map.on("mousemove", moveLineDist);
		if(distLastPointLatLng != null){
			var linePoint = [distLastPointLatLng, e.latlng];
			map.addLayer(new L.polyline(linePoint, {
				color: 'green', 
				weight: 2, 
				opacity: 0.5,
				measure: 'true'
			}));
			
			lineDist.setLatLngs([e.latlng, e.latlng]);
			distLength = distLength + calculateDistance(linePoint);
			addPopup(distLength, e.latlng, 'create');
		}
		
		if(pointDist != null){
			pointDist.off('click', finishDist);			
		}
		
		distLastPointLatLng = e.latlng;		
		pointDist = new L.CircleMarker(distLastPointLatLng, {
			stroke: false,
			fillOpacity: 1,
			fillColor: '#000',
			radius: 3,
			measure: 'true'
		}).addTo(map);
		
		pointDist.on('click', finishDist);
	}
	
	function moveLineDist(e){
		if(distLastPointLatLng == null){
			return false;
		}
		var linePoint = [distLastPointLatLng, e.latlng];
		if(lineDist == null){
			lineDist = new L.Polyline(linePoint, {
				weight: 2,   //라인굵기
				color : "red",  // 라인컬러
				opacity : 0.8,   //투명도
				dashArray : "5,5",
				measure: 'true'
			}).addTo(map);
			var tmpDistLength = distLength + calculateDistance(linePoint);
			popupDist = addPopup(tmpDistLength, e.latlng, 'create');
		}else{
			lineDist.setLatLngs(linePoint);
			var tmpDistLength = distLength + calculateDistance(linePoint);
			addPopup(tmpDistLength, e.latlng, 'update', popupDist);
		}
	}
	
	function finishDist(e){
		e ? L.DomEvent.stopPropagation(e) : null; 
		distLastPointLatLng = null;
		map.off("mousemove", moveLineDist);
		if(popupDist != null){
			popupDist.removeFrom(map);
		}
		popupDist = null;
		if(lineDist != null){
			lineDist.removeFrom(map);
		}
		lineDist = null;
		distLength = 0;
	}
	/* 거리 측정 ↑ */
	
	
	/* 면적 측정 ↓ */
	var areaLastPointLatLng = null;
	var areaFirstPointLatLng = null;
	var firstLineArea = null;
	var lastLineArea = null;
	var lineArea = null;
	var areaPointArr = new Array();
	var areaPolygon = new Array();
	var areaLength = new Array();
	var pointArea = null;
	var areaSize = 0;
	var areaOnOff = 0;
	var popupAreaFirst = null;
	var popupAreaLast = null;
	var popupAreaMeasure = null;
	function measureArea(e){
		areaOnOff = 1;
		map.on("mousemove", moveLineArea);
		if(areaLastPointLatLng != null){
			var linePoint = [areaLastPointLatLng, e.latlng];
			map.addLayer(new L.polyline(linePoint, {
				color: 'green', 
				weight: 2, 
				opacity: 0.5,
				measure: 'true'
			}));
			
			lastLineArea.setLatLngs([e.latlng, e.latlng]);
			var lineLangth = calculateDistance(linePoint);
			areaLength.push(lineLangth);
			var tmpLatLng = new L.latLng(areaLastPointLatLng.lat + (e.latlng.lat-areaLastPointLatLng.lat)/2, areaLastPointLatLng.lng + (e.latlng.lng - areaLastPointLatLng.lng)/2);
			addPopup(lineLangth, tmpLatLng, 'create');
		}
		
		if(pointArea != null){
			pointArea.off('click', finishArea);			
		}
		if(areaFirstPointLatLng == null){
			areaFirstPointLatLng = e.latlng;
		}
		areaLastPointLatLng = e.latlng;
		areaPointArr.push(e.latlng);
		pointArea = new L.CircleMarker(areaLastPointLatLng, {
			stroke: false,
			fillOpacity: 1,
			fillColor: '#000',
			radius: 3,
			measure: 'true'
		}).addTo(map);
		
		pointArea.on('click', finishArea);
	}
	
	function moveLineArea(e){
		if(areaLastPointLatLng == null || areaFirstPointLatLng == null){
			return false;
		}
		var firstLinePoint = [areaFirstPointLatLng, e.latlng];
		var lastLinePoint = [areaLastPointLatLng, e.latlng];
		areaPolygon = areaPointArr.concat(e.latlng);
		if(lastLineArea == null){
			lastLineArea = new L.Polyline(lastLinePoint, {
				weight: 2,   //라인굵기
				color : "red",  // 라인컬러
				opacity : 0.8,   //투명도
				dashArray : "5,5",
				measure: 'true'
			}).addTo(map);
			var lineLangth = calculateDistance(lastLinePoint);
			var tmpLatLng = new L.latLng(areaLastPointLatLng.lat + (e.latlng.lat-areaLastPointLatLng.lat)/2, areaLastPointLatLng.lng + (e.latlng.lng - areaLastPointLatLng.lng)/2);
			popupAreaLast = addPopup(lineLangth, tmpLatLng, 'create');
		}else{
			lastLineArea.setLatLngs(lastLinePoint);
			var lineLangth = calculateDistance(lastLinePoint);
			var tmpLatLng = new L.latLng(areaLastPointLatLng.lat + (e.latlng.lat-areaLastPointLatLng.lat)/2, areaLastPointLatLng.lng + (e.latlng.lng - areaLastPointLatLng.lng)/2);
			addPopup(lineLangth, tmpLatLng, 'update', popupAreaLast);
		}
		
		if(firstLineArea == null){
			firstLineArea = new L.Polyline(firstLinePoint, {
				weight: 2,   //라인굵기
				color : "red",  // 라인컬러
				opacity : 0.8,   //투명도
				dashArray : "5,5",
				measure: 'true'
			}).addTo(map);
			var lineLangth = calculateDistance(firstLinePoint);
			var tmpLatLng = new L.latLng(areaFirstPointLatLng.lat + (e.latlng.lat-areaFirstPointLatLng.lat)/2, areaFirstPointLatLng.lng + (e.latlng.lng - areaFirstPointLatLng.lng)/2);
			popupAreaFirst = addPopup(lineLangth, tmpLatLng, 'create');
		}else{
			firstLineArea.setLatLngs(firstLinePoint);
			var lineLangth = calculateDistance(firstLinePoint);
			var tmpLatLng = new L.latLng(areaFirstPointLatLng.lat + (e.latlng.lat-areaFirstPointLatLng.lat)/2, areaFirstPointLatLng.lng + (e.latlng.lng - areaFirstPointLatLng.lng)/2);
			addPopup(lineLangth, tmpLatLng, 'update', popupAreaFirst);
		}
		
		if(areaFirstPointLatLng != areaLastPointLatLng){
			if(lineArea == null){
				lineArea = new L.Polygon(areaPolygon, {
					stroke: false,
					fillColor: '#00f',
					fillOpacity: 0.1,
					measure: 'true'
				}).addTo(map);
				
				var lineLangth = polygonArea(lineArea);
				popupAreaMeasure = addPopup(lineLangth, lineArea.getBounds().getCenter(), 'create');
			}else{
				lineArea.setLatLngs(areaPolygon);
				var lineLangth = polygonArea(lineArea);
				addPopup(lineLangth, lineArea.getBounds().getCenter(), 'update', popupAreaMeasure);
			}
		}
	}
	
	function finishArea(e){
		e ? L.DomEvent.stopPropagation(e) : null;
		if(areaPointArr.length > 0){
			var firstLineTmp = [areaPointArr[0], areaPointArr[areaPointArr.length - 1]];
			map.addLayer(new L.polyline(firstLineTmp, {
				color: 'green', 
				weight: 2, 
				opacity: 0.5,
				measure: 'true'
			}));
			var lineLangth = calculateDistance(firstLineTmp);
			var tmpLatLng = new L.latLng(firstLineTmp[0].lat + (firstLineTmp[1].lat-firstLineTmp[0].lat)/2, firstLineTmp[0].lng + (firstLineTmp[1].lng - firstLineTmp[0].lng)/2);
			addPopup(lineLangth, tmpLatLng, 'create');
			
			map.addLayer(new L.Polygon(areaPointArr, {
				stroke: false,
				fillColor: '#00f',
				fillOpacity: 0.1,
				measure: 'true'
			}));
		}
		areaFirstPointLatLng = null;
		areaLastPointLatLng = null;
		map.off("mousemove", moveLineArea);
		if(popupAreaFirst != null){
			popupAreaFirst.removeFrom(map);
		}
		popupAreaFirst = null;
		if(popupAreaLast != null){
			popupAreaLast.removeFrom(map);
		}
		popupAreaLast = null;
		if(firstLineArea != null){
			firstLineArea.removeFrom(map);
		}
		firstLineArea = null;
		if(lastLineArea != null){
			lastLineArea.removeFrom(map);
		}
		lastLineArea = null;
		if(lineArea != null){
			lineArea.removeFrom(map);
		}
		lineArea = null;
		
		areaPointArr = [];
		areaPolygon = [];
		areaSize = 0;
	}
	/* 면적 측정 ↑ */
	
	
	/* 반경 측정 ↓ */
	var radiusLastPointLatLng = null;
	var lineRadius = null;
	var pointRadius = null;
	var radiusLength = 0;
	var radiusOnOff = 0;
	var popupRadius = null;
	var radiusInputPopup = null;
	function measureRadius(e){
		radiusOnOff = 1;
		map.on("mousemove", moveLineRadius);
		if(radiusLastPointLatLng != null){
			var linePoint = [radiusLastPointLatLng, e.latlng];
			map.addLayer(new L.polyline(linePoint, {
				color: 'green', 
				weight: 2, 
				opacity: 0.3,
				measure: 'true'
			}));
			var radiusLength = calculateDistance(linePoint);
			
			createRadius(radiusLastPointLatLng, radiusLength);
			addPopup(radiusLength, e.latlng, 'create');
			finishRadius(e);
		}else{
			radiusLastPointLatLng = e.latlng;
			radiusCustomPopup(e.latlng);
		}
		pointRadius = new L.CircleMarker(e.latlng, {
			stroke: false,
			fillOpacity: 1,
			fillColor: '#000',
			radius: 3,
			measure: 'true'
		}).addTo(map);
	}
	
	function moveLineRadius(e){
		if(radiusLastPointLatLng == null){
			return false;
		}
		var linePoint = [radiusLastPointLatLng, e.latlng];
		if(lineRadius == null){
			lineRadius = new L.Polyline(linePoint, {
				weight: 2,   //라인굵기
				color : "red",  // 라인컬러
				opacity : 0.8,   //투명도
				dashArray : "5,5",
				measure: 'true'
			}).addTo(map);
			var tmpRadiusLength = calculateDistance(linePoint);
			popupRadius = addPopup(tmpRadiusLength, e.latlng, 'create');
		}else{
			lineRadius.setLatLngs(linePoint);
			var tmpRadiusLength = calculateDistance(linePoint);
			addPopup(tmpRadiusLength, e.latlng, 'update', popupRadius);
		}
	}
	
	function createRadius(centerLatLng, radiusLength){
		var circlePolygon = new L.Circle(centerLatLng, {
			weight: 2, 
			radius: radiusLength,
			color: "green",
			opacity: 0.5, 
			fillColor: "blue", 
			fillOpacity: 0.15,
			measure: 'true'
		}).addTo(map);

		var radiusFloor = radiusLength / 5; 
		var radiusFloorVal = Math.pow(10, Math.floor(Math.log10(radiusFloor))) * Math.floor(radiusFloor / Math.pow(10, Math.floor(Math.log10(radiusFloor))));
		var sumRadiusFloorVal = radiusFloorVal;
		while(sumRadiusFloorVal < radiusLength){
			map.addLayer(new L.Circle(centerLatLng, {
				weight: 1, 
				radius: sumRadiusFloorVal,
				color: "blue",
				opacity: 0.2,
				fill: false,
				measure: 'true'
			}));
			if(sumRadiusFloorVal == radiusFloorVal){
				addPopup(radiusFloorVal, centerLatLng, 'create');
			}
			sumRadiusFloorVal = sumRadiusFloorVal + radiusFloorVal;
		}
		
		return circlePolygon;
	}
	
	function radiusCustomPopup(latlng){
		radiusInputPopup = L.popup({
			offset:[0,0],          //오프셋
			keepInView:false,      //팝업이 열려 있는동안 지도 벗어나게 이동 막기
			autoPan:false,          //팝업창이 지도에서 안보일시 보이는 위치까지 자동 지도 이동
			closeButton:false,     //팝업 닫기 버튼 유,무
			closeOnClick:false,    //지도 클릭시 팝업 제거 안함
			'className':'tooltipTrans',    //팝업 테두리 없애기  (팝업 기본 테두리를 없애시려면 추가  중요:dw_popup.css 추가 시켜줘야 함.  테두리 제거 css가 들어있음)
			measure: 'true'
		});
		
		var popupContent = ""
		+ "<div class='radiusCustom'>"
		+ 	"<div class='radiusInputTitle'>반경을 입력하세요.</div>"
		+ 	"<div class='radiusInput'>반경 : <input type='number' id='radiusCustomVal' />m</div>"
		+ 	"<div class='radiusBtn'><span class='radiusSubmit'>적용</span></div>"
		+ "</div>";
		radiusInputPopup.setContent(popupContent);
		radiusInputPopup.setLatLng(latlng);
		radiusInputPopup.addTo(map);
		$(".radiusCustom .radiusInput #radiusCustomVal").focus();
		$(".radiusCustom .radiusBtn .radiusSubmit").on('click', function(e){
			var inputRadiusVal = $(".radiusCustom .radiusInput #radiusCustomVal").val();
			if(inputRadiusVal == "" || (inputRadiusVal*1)+"" == "0" || (inputRadiusVal*1) <= 0){
				alert('제대로된 값을 입력하세요.');
				return;
			}
			var resPoly = createRadius(latlng, inputRadiusVal);
			var tmpLatLng = new L.LatLng(resPoly.getBounds()._southWest.lat, latlng.lng);
			addPopup(inputRadiusVal, tmpLatLng, 'create');
			finishRadius(e);
		});
		$(".radiusCustom .radiusInput #radiusCustomVal").on('keypress', function(e){
			var keycode = e.keyCode ? e.keyCode : e.which;
            if (keycode == '13') {
            	$(".radiusCustom .radiusBtn .radiusSubmit").click();
            }
		});
	}
	
	function finishRadius(e){
		e ? L.DomEvent.stopPropagation(e) : null; 
		if(lineRadius != null){
			lineRadius.removeFrom(map);
		}
		map.off("mousemove", moveLineRadius);
		lineRadius = null;
		if(pointRadius != null && e == undefined){
			pointRadius.removeFrom(map);
		}
		pointRadius = null;
		if(popupRadius != null){
			popupRadius.removeFrom(map);
		}
		popupRadius = null;
		if(radiusInputPopup != null){
			radiusInputPopup.removeFrom(map);
		}
		radiusInputPopup = null;
		radiusLastPointLatLng = null;
	}
	/* 반경 측정 ↑ */
	
	
	
	
	/* 공통함수 ↓ */
	function addPopup(_dist, latlng, cu, popupObj){
		var str = _dist;
		if($.isNumeric(_dist) == true){
			str = jariAndComma(str);
		}
		
		var linePopup = popupObj ? popupObj : new L.popup({
			offset:[0,0],          //오프셋
			keepInView:false,      //팝업이 열려 있는동안 지도 벗어나게 이동 막기
			autoPan:false,          //팝업창이 지도에서 안보일시 보이는 위치까지 자동 지도 이동
			closeButton:false,     //팝업 닫기 버튼 유,무
			closeOnClick:false,    //지도 클릭시 팝업 제거 안함
			'className':'tooltipTrans',    //팝업 테두리 없애기  (팝업 기본 테두리를 없애시려면 추가  중요:dw_popup.css 추가 시켜줘야 함.  테두리 제거 css가 들어있음)
			measure: 'true'
		});
		if(cu == 'create'){
			linePopup.setContent(str);
			linePopup.setLatLng(latlng); //2번째 점에 반경 표시
			linePopup.addTo(map);
		}else if(cu == 'update'){
			linePopup.setContent(str);
			linePopup.setLatLng(latlng);
		}
		return linePopup;
	}
	
	function calculateDistance(line) {
		var lat1 = line[0].lat;
		var lng1 = line[0].lng;
		var lat2 = line[1].lat;
		var lng2 = line[1].lng;
		function deg2rad(deg) {
			return deg * (Math.PI/180);
		}

		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2-lat1);  // deg2rad below
		var dLon = deg2rad(lng2-lng1);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c * 1000; // Distance in m
		return d;
	}
	
	//면적 계산
	function polygonArea(_poly){
		var area = (LGeo.area(_poly));
		if (area < 1000000){
			area = commaSeparateNumber((area).toFixed(2)) + 'm<sup>2</sup>';	
		}
		else if(area >= 1000000){
			area = commaSeparateNumber((area/1000000).toFixed(2)) + 'km<sup>2</sup>';
		}
		return area;
	}
	
	function jariAndComma(_d){
		var _v = parseFloat(_d);
		var retV = 0;
		if(_v >= 1000){ //1Km 초과
			if(((_v / 1000)+'').split(".").length > 1){
				retV = commaSeparateNumber((_v / 1000).toFixed(2)) + "Km";
			}else{
				retV = commaSeparateNumber((_v / 1000).toFixed(0)) + "Km";
			}
		}else{ //1Km 미만
			retV = commaSeparateNumber(_v.toFixed(0)) + "m";
		}
		return retV;
	}
	
	function commaSeparateNumber(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		}
		return val;
	}
	/* 공통함수 ↑ */
}

export {
	ReafletDraw
}
