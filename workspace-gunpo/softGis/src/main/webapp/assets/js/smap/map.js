proxyUrl =   '';
jsDomain =   'https://map.seoul.go.kr/smgis';

jsCscsjs =  jsDomain + '/js/map/coord/cscs.js';
jsGeocent = jsDomain + '/js/map/coord/geocent.js';
jsKorea =   jsDomain + '/js/map/coord/KOREA_CENTER_TM_3param.js';
jsKatech =  jsDomain + '/js/map/coord/TM128_katech_3param.js';
jsGoogle =  jsDomain + '/js/map/coord/GOOGLE_WGS84.js';
jsKorea =   jsDomain + '/js/map/coord/GRS80_TM.js';
jsTmerc =   jsDomain + '/js/map/coord/tmerc.js';
jsResource = jsDomain + '/js/map/';

jsMapUrl = jsDomain + '/apps/mapsvr.do?cmd=getTileMap&key=';


var mapLayerCount = 0;

function JScriptTag(src)
{
    //document.write('<'+'script src="' + src + '"' +' type="text/javascript"><'+'/script>');
}

function setObjectWidth(dest, src){
    if(src!=null){
        dest.style.width = src.style.width + 'px';
    }
}

JScriptTag(jsCscsjs);
JScriptTag(jsGeocent);
JScriptTag(jsKorea);
JScriptTag(jsKatech);
JScriptTag(jsGoogle);
JScriptTag(jsTmerc);

window.nullFunc = function nullFunc() {};
window.falseFunc = function falseFunc() {return false;};
window.trueFunc = function trueFunc() {return true;};

function eventOverlap(e) {
    if (enum_BrowserType.IE) {
        window.event.cancelBubble = true;
        window.event.returnValue = false
    } else {
        if (e) {
            e.cancelBubble = true;
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

var enum_BrowserType = {
    IE :!!(window.attachEvent && !window.opera),
    IE6 :navigator.userAgent.match('MSIE 5\.5|MSIE 6'),
    IE7 :navigator.userAgent.match('MSIE 7'),
    IE8 :navigator.userAgent.match('MSIE 8'),
    IE9 :navigator.userAgent.match('MSIE 9'),
    Opera :!!window.opera,
    FF :navigator.userAgent.indexOf('Firefox') > -1,
    Chrome :navigator.userAgent.indexOf('Chrome') > -1,
    IPhone : (navigator.platform.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf('iPod') !=-1),      // iPhone 추가...
    Safari :navigator.userAgent.indexOf('Safari') > -1 && !this.Chrome,
    Android : (navigator.platform.indexOf("Android") != -1) || (navigator.userAgent.indexOf('Android') !=-1)      // Android 추가...
};

function Map() {
    var ResourceUrl = jsResource;

    function _SCommon(){
        this.SMousePos;
        this.SMapEle;
    }

    function SSpec() {
        this.init_requestURI = true;
        this.tileInfo = null;
    }

    SSpec.prototype.coordInterval = 25600;
    SSpec.prototype.tileSize = 256;
    SSpec.prototype.minLevel = 1;
    SSpec.prototype.maxLevel = 12;
    SSpec.prototype.levelIntervalScale = 0.5;
    SSpec.prototype.GeoSystm = 'TMM';
    SSpec.prototype.emptyTileUrl = jsResource + 'img/mapbg_sea.png';
    SSpec.prototype.preTileUrl = jsResource + 'img/mapbg.png';
    SSpec.prototype.baseMapUrl = '';
    SSpec.prototype.resourceURL = jsResource + '/Resource/';
    SSpec.prototype.mapName = 'kor_normal';
    SSpec.prototype.scaleInfo = new Object;

    // daniel
    SSpec.prototype.setMapName = function(mapName){
    	SSpec.prototype.mapName = mapName;
    	//var tileInfo = tileMapInfo.tileMapsInfos[mapName];
    	this.tileInfo = tileMapInfo.tileMapsInfos[mapName];
    	
    	this.minLevel = this.tileInfo.levelInfos[this.tileInfo.levelInfos.length-1].levelId;
    	this.maxLevel = this.tileInfo.levelInfos[0].levelId;
    	this.tileSize = this.tileInfo.imageSize;
    	this.baseMapUrl = this.tileInfo.url;
    	
    	this.mapAreaExternalInfo = new MapAreaExternalInfo(mapName);
    	
    	// scale 구성 
    	for(var i=0; i<this.tileInfo.levelInfos.length; i++){
    		var levelInfo = this.tileInfo.levelInfos[i];
    		this.scaleInfo[levelInfo.levelId] = levelInfo.scale;
    	}
    };
    SSpec.prototype.setConstant = function (c){
        this.constant = c;
    };
    SSpec.prototype.distancePerPixel =function (level){
        //return this.tileInfo.levelInfos[level].scale;
        return this.scaleInfo[level];
    	//return Math.pow(2, level-1) * this.levelIntervalScale;
    };
    SSpec.prototype.getRowCount =function (level){
    	var dp = this.distancePerPixel(level);
    	//var dp = this.distancePerPixel(level);
        var rowImageCount = Math.floor((this.mapAreaExternalInfo.getBaseMaxX() - this.mapAreaExternalInfo.getBaseMinX())  / (dp * this.tileSize));
        return rowImageCount;
    };
    SSpec.prototype.getColCount =function (level){
    	var dp = this.distancePerPixel(level);
        var colImageCount = Math.floor((this.mapAreaExternalInfo.getBaseMaxY() - this.mapAreaExternalInfo.getBaseMinY()) / (dp * this.tileSize));
        return colImageCount;
    };
    SSpec.prototype.getTileUrl =function(xIndex, yIndex, level){
        var rowImageCount = this.getRowCount(level);
        var colImageCount = this.getColCount(level);

        if (xIndex<0 || yIndex<0 || xIndex > rowImageCount || yIndex > colImageCount){
            return this.emptyTileUrl;
        }

        var imageIndex = yIndex * rowImageCount + xIndex;
        var dir = Math.floor(imageIndex / 1000)*1000;

        var dp =    this.distancePerPixel(level);
        //var currentX =  this.mapAreaExternalInfo.getBaseMinX()+ xIndex*(dp*this.tileSize);
        //var currentY =  this.mapAreaExternalInfo.getBaseMinY()+ yIndex*(dp*this.tileSize);
        var mapUrl = this.getMapUrl('');

        var XPath = Math.floor(xIndex/50);
        var YPath = Math.floor(yIndex/50);
                //return mapUrl + level + "/" + XPath + "/" + YPath + "/" + xIndex + "_" + yIndex + ".png";
        
        var tempMapUrl = mapUrl + level + "/" + XPath + "/" + YPath + "/" + xIndex + "_" + yIndex + ".png";
        
        return jsMapUrl + tempMapUrl;
                
                
                
       };
    SSpec.prototype.getOverlayUrl =function (xIndex,yIndex,level){
        return "";
    };
    SSpec.prototype.point2pixel =function (point,level,pixel){
        if (!pixel)
        {
            pixel = new SPoint();
        }
        var dp =    this.distancePerPixel(level);
        pixel.set(Math.round((point.x - this.getMinX())/dp),Math.round((point.y - this.getMinY())/dp));
        return pixel;
    };
    SSpec.prototype.pixel2point =function (pixel,level,point){
        if (!point){
            point = new SPoint();
        }
        var dp = this.distancePerPixel(level);
        point.set(Math.round(pixel.x*dp)+this.getMinX(),Math.round(pixel.y*dp)+this.getMinY());
        return point;
    };
    SSpec.prototype.getMapUrl = function(_area){
        return this.mapAreaExternalInfo.getMapUrl(_area);
    };
    SSpec.prototype.getMapUrl = function(_area, _lv){
        return this.mapAreaExternalInfo.getMapUrl(_area, _lv);
    };
    SSpec.prototype.getMinX = function(){
        return this.mapAreaExternalInfo.getBaseMinX();
    };
    SSpec.prototype.getMaxX = function(){
        return this.mapAreaExternalInfo.getBaseMaxX();
    };
    SSpec.prototype.getMinY = function(){
        return this.mapAreaExternalInfo.getBaseMinY();
    };
    SSpec.prototype.getMaxY = function(){
        return this.mapAreaExternalInfo.getBaseMaxY();
    };
    SSpec.prototype.hasOverlay = falseFunc;

    MapAreaExternalInfo = function(mapName){
        this.spec= null;
        this.areaCode= mapName;
        this.baseIdx = 0;
        this.areaInfo = tileMapInfo.tileMapsInfos[mapName];
        /*this.areaInfo = {"info":
               {
                 "ko":{"baseMapUrl":proxyUrl +"/korMap/",
                            "levelInfo":[
                                {"level":1, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":2, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":3, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":4, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":5, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":6, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":7, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":8, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":9, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":10, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":11, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":12, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000}
                            ]

                },
                "en":  {"baseMapUrl":proxyUrl +"/engMap/",
                            "levelInfo":[
                                {"level":1, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":2, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":3, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":4, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":5, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":6, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":7, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":8, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":9, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":10, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":11, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000},
                                {"level":12, "minx":0,"miny":-262144,"maxx":600000,"maxy":600000}
                        ]
                },
                "ja":  {"baseMapUrl":proxyUrl +"/janMap/",
                            "levelInfo":[
                                {"level":1, "minx":75776,"miny":373760,"maxx":278016,"maxy":538112},
                                {"level":2, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":3, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":4, "minx":75776,"miny":373760,"maxx":278528,"maxy":540672},
                                {"level":5, "minx":75776,"miny":368640,"maxx":278528,"maxy":540672},
                                {"level":6, "minx":65536,"miny":360448,"maxx":278528,"maxy":540672},
                                {"level":7, "minx":65536,"miny":360448,"maxx":294912,"maxy":557056},
                                {"level":8, "minx":65536,"miny":327680,"maxx":327680,"maxy":589824},
                                {"level":9, "minx":0,"miny":262144,"maxx":393216,"maxy":655360},
                                {"level":10, "minx":0,"miny":262144,"maxx":524288,"maxy":600000},
                                {"level":11, "minx":0,"miny":-262144,"maxx":524288,"maxy":1048576},
                                {"level":12, "minx":0,"miny":-262144,"maxx":1048576,"maxy":1048576}
                        ]
                },
                "zh-CN":  {"baseMapUrl":proxyUrl +"/china_gMap/",
                            "levelInfo":[
                                {"level":1, "minx":75776,"miny":373760,"maxx":278016,"maxy":538112},
                                {"level":2, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":3, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":4, "minx":75776,"miny":373760,"maxx":278528,"maxy":540672},
                                {"level":5, "minx":75776,"miny":368640,"maxx":278528,"maxy":540672},
                                {"level":6, "minx":65536,"miny":360448,"maxx":278528,"maxy":540672},
                                {"level":7, "minx":65536,"miny":360448,"maxx":294912,"maxy":557056},
                                {"level":8, "minx":65536,"miny":327680,"maxx":327680,"maxy":589824},
                                {"level":9, "minx":0,"miny":262144,"maxx":393216,"maxy":655360},
                                {"level":10, "minx":0,"miny":262144,"maxx":524288,"maxy":600000},
                                {"level":11, "minx":0,"miny":-262144,"maxx":524288,"maxy":1048576},
                                {"level":12, "minx":0,"miny":-262144,"maxx":1048576,"maxy":1048576}
                        ]
                },
                "zh-TW":  {"baseMapUrl":proxyUrl +"/china_bMap/",
                            "levelInfo":[
                                {"level":1, "minx":75776,"miny":373760,"maxx":278016,"maxy":538112},
                                {"level":2, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":3, "minx":75776,"miny":373760,"maxx":278528,"maxy":538624},
                                {"level":4, "minx":75776,"miny":373760,"maxx":278528,"maxy":540672},
                                {"level":5, "minx":75776,"miny":368640,"maxx":278528,"maxy":540672},
                                {"level":6, "minx":65536,"miny":360448,"maxx":278528,"maxy":540672},
                                {"level":7, "minx":65536,"miny":360448,"maxx":294912,"maxy":557056},
                                {"level":8, "minx":65536,"miny":327680,"maxx":327680,"maxy":589824},
                                {"level":9, "minx":0,"miny":262144,"maxx":393216,"maxy":655360},
                                {"level":10, "minx":0,"miny":262144,"maxx":524288,"maxy":600000},
                                {"level":11, "minx":0,"miny":-262144,"maxx":524288,"maxy":1048576},
                                {"level":12, "minx":0,"miny":-262144,"maxx":1048576,"maxy":1048576}
                    ]
                }
            }
        };*/
    };

    MapAreaExternalInfo.prototype = {
        getMapUrl: function(_area, _lv){
        	
        	return this.areaInfo.url;
        	
            /*var mapUrl = null;
            var CoordDetailInfo = this.areaInfo.info[this.areaCode].levelInfo[_lv-1];
            if(!CoordDetailInfo)
                return '';

            if ((_area.x>= CoordDetailInfo.minx && _area.x< CoordDetailInfo.maxx) &&
                (_area.y>= CoordDetailInfo.miny && _area.y< CoordDetailInfo.maxy)){
                mapUrl = this.areaInfo.info[this.areaCode].baseMapUrl;
            }

            if (!mapUrl)
                mapUrl = this.areaInfo.info["en"].baseMapUrl;

            return mapUrl;*/
        },
        getBaseMinX:function(){
        	return this.areaInfo.mbr.minx;
            //return this.areaInfo.info["en"].levelInfo[0].minx;
        },
        getBaseMaxX:function(){
        	return this.areaInfo.mbr.maxx;
            //return this.areaInfo.info["en"].levelInfo[0].maxx;
        },
        getBaseMinY:function(){
            //return this.areaInfo.info["en"].levelInfo[0].miny;
        	return this.areaInfo.mbr.miny;
        },
        getBaseMaxY:function(){
            //return this.areaInfo.info["en"].levelInfo[0].maxy;
        	return this.areaInfo.mbr.maxy;
        },
        setAreaCode:function(mapName){
            this.areaCode = mapName;
        },
        getAreaCode:function(){
            return this.areaCode;
        }
    };


    function setCursor(obj, type) {
        var current = obj.style.cursor;
        obj.style.cursor = type;
        if (type == "point") {
            obj.style.cursor = "hand";
        }
        return current;
    }

    if (window.Node && Node.prototype && !Node.prototype.contains) {
        Node.prototype.contains = function(arg) {
            try {
                return ((this.compareDocumentPosition(arg) & 16) != 0 || (this == arg));
            } catch (e) {
            }
        }
    }

    function isDefined(_obj) {
        if (_obj == null)
            return false;
        return (typeof (_obj) != "undefined");
    }

    function m4(name, eventFunc) {
        if (enum_BrowserType.IE) {
            var script = document.createElement("script");
            script.type = "text/vbscript";
            script.text = 'On Error Resume Next\n' + 'Sub ' + name
                    + '_FSCommand(ByVal command, ByVal args)\n' + ' Call '
                    + name + '_DoFSCommand(command, args)\n' + 'End Sub\n';
            (document.getElementsByTagName("head")[0]).appendChild(script);
        }
        eval('window.' + name + '_DoFSCommand = eventFunc;');
    }
    function removeChild(_obj) {
        while (_obj && _obj.childNodes.length > 0) {
            if (_obj.childNodes[0].childNodes.length > 0) {
                removeChild(_obj.childNodes[0]);
            }
            _obj.removeChild(_obj.childNodes[0]);
        }
    }
    function getTimeout(a, b, c) {
        var d = window.setTimeout( function() {
            b.apply(a)
        }, c);
        return d;
    }
    function _Size(width, height) {
        this.set(width, height);
    }
    _Size.prototype.set = function(width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    _Size.prototype.setWidth = function(width) {
        this.width = width;
        return this;
    };
    _Size.prototype.setHeight = function(height) {
        this.height = height;
        return this;
    };
    _Size.prototype.getWidth = function() {
        return this.width;
    };
    _Size.prototype.getHeight = function() {
        return this.height;
    };
    _Size.prototype.add = function(width, height) {
        return this.set(this.width + width, this.height + height);
    };
    _Size.prototype.copy = function(_obj) {
        if (_obj) {
            _obj.set(this.width, this.height);
            return _obj;
        } else {
            return new _Size(this.width, this.height);
        }
    };
    _Size.prototype.equals = function(target) {
        return ((this.width == target.width) && (this.height == target.height));
    };
    _Size.prototype.toString = function() {
        return this.width + "," + this.height;
    };
    function _SPoint(x, y, type) {
        this.set(x, y, type);
    }

    _SPoint.prototype.set = function(x, y, type) {
        if(!type)
        {
            this.x = x;
            this.y = y;
        }
        else{
            if (type=='WGS84_Degree') {
                var tempCoord = WGS84toTM(x, y);
                this.x = tempCoord.x;
                this.y = tempCoord.y;
            }
            else {
              this.x = x;
              this.y = y;
            }
        }

        return this;
    };
    _SPoint.prototype.setX = function(x) {
        this.x = x;
        return this;
    };
    _SPoint.prototype.setY = function(y) {
        this.y = y;
        return this;
    };
    _SPoint.prototype.setType = function(type) {
        this.type = type;
        return this;
    };
    _SPoint.prototype.getX = function() {
        return this.x;
    };
    _SPoint.prototype.getY = function() {
        return this.y;
    };
    _SPoint.prototype.getType = function() {
        return this.type;
    };
    _SPoint.prototype.add = function(x, y) {

        return this.set(this.x + x, this.y + y);
    };
    _SPoint.prototype.distance = function(point) {
        if (!point) {
            return null;
        } else {
            return Math.sqrt((this.x - point.x) * (this.x - point.x)
                    + (this.y - point.y) * (this.y - point.y));
        }
    };
    _SPoint.prototype.copy = function(_obj) {
        if (_obj) {
            _obj.set(this.x, this.y);
            return _obj;
        } else {
            return new _SPoint(this.x, this.y);
        }
    };
    _SPoint.prototype.equals = function(target) {
        return ((this.x == target.x) && (this.y == target.y));
    };
    _SPoint.prototype.toString = function() {
        return this.x + "," + this.y;
    };

    function _Event() {
        this.mapEventArray = new Array();
    };
    _Event.prototype.attachEvent = function(eventSrc, eventName, eventFunc, type) {
        type = type || false;

        if(enum_BrowserType.IE || enum_BrowserType.Opera){
            eventSrc.attachEvent("on" + eventName, eventFunc);
        }
        else if(enum_BrowserType.FF){
            eventName = (eventName=='mousewheel') ? 'DOMMouseScroll' : eventName;
            eventSrc.addEventListener(eventName, eventFunc, type);
        }
        else if(enum_BrowserType.Chrome || enum_BrowserType.Safari || enum_BrowserType.IPhone){
            try {
                eventSrc.addEventListener(eventName, eventFunc);
            } catch (e) {
                 alert('event exception ' + e);

               }
        }
        else{
            try {
                eventSrc.attachEvent("on" + eventName, eventFunc);
            } catch (e) {
            }
        }
    };

    _Event.prototype.detachEvent = function(eventSrc, eventName, eventFunc) {
    	if (eventSrc.detachEvent) {
            try {
                eventSrc.detachEvent("on" + eventName, eventFunc);
            } catch (e) {
            }
        }
    	else if (eventSrc.removeEventListener) {
            if(enum_BrowserType.FF){
                eventName = (eventName=='mousewheel') ? 'DOMMouseScroll' : eventName;
            }
            eventSrc.removeEventListener(eventName, eventFunc, false);
        } 
    };
    _Event.prototype.createAdapter = function(_obj, eventFunc) {
        return function(c) {
            if (!c)
                c = window.event;
            if (c && !c.target)
                c.target = c.srcElement;
            eventFunc.call(_obj, c);
        }
    };
    _Event.prototype.createCallback = function(_obj, eventFunc) {
        var gc7 = function() {
            eventFunc.apply(_obj, arguments)
        };
        return gc7;
    };
    _Event.prototype.attachDom = function(eventSrc, eventName, _obj, dom) {
        var helperFunc;
        helperFunc = this.createAdapter(_obj, dom);
        this.attachEvent(eventSrc, eventName, helperFunc);
        return;
    };
    _Event.prototype.removeListener = function(eventSrc, eventName, eventFunc) {
        this.detachEvent(eventSrc, eventName, eventFunc);
    };
    _Event.prototype.addListener = function(eventSrc, eventName, eventFunc) {
        if (!eventName || !eventSrc.content)
          return;
        if (enum_BrowserType.IPhone || enum_BrowserType.Android)
            eventName = (eventName=='click') ?  'touchstart' : eventName;
        if ((eventName=='click') || (eventName=='touchstart')){
            setCursor(eventSrc.content, "point");
            eventSrc.content.style.cursor = "hand";
        }

        this.attachEvent(eventSrc.content, eventName, eventFunc);
    };
    _Event.prototype.addListenerPool = function(eventSrc, eventName, eventFunc) {
        var sysEventName = this.getPropertyName(eventName);
        if (eventSrc[sysEventName])
            eventSrc[sysEventName].push(eventFunc);
        else
            eventSrc[sysEventName] = new Array(eventFunc);
    };
    _Event.prototype.bind = function(eventSrc, eventName, targetObj, eventFunc) {
        var helperFunc = this.createCallback(targetObj, eventFunc);
        this.addListenerPool(eventSrc, eventName, helperFunc);
        return helperFunc;
    };
    _Event.prototype.removeListener = function(eventSrc, eventName, eventFunc) {
        var sysEventName = this.getPropertyName(eventName);
        var eventFunclist = eventSrc[sysEventName];
        if (eventFunclist && eventFunclist.length > 0) {
            var flag = false;
            for ( var i = 0; i < eventFunclist.length; i++) {
                if (eventFunclist[i] == eventFunc) {
                    flag = true;
                }
                if (flag && i != (eventFunclist.length - 1)) {
                    eventFunclist[i] = eventFunclist[i + 1];
                }
            }
            if (flag) {
                eventFunclist.pop();
            }
        }
    };
    _Event.prototype.trigger = function(eventSrc, eventName) {
        var sysEventName = this.getPropertyName(eventName);
        var eventFunclist = eventSrc[sysEventName];
        if (eventFunclist && eventFunclist.length > 0) {
            var arr = new Array();
            for ( var i = 2; i < arguments.length; i++) {
                arr.push(arguments[i]);
            }
            arr.push(eventSrc);
            for ( var i = 0; i < eventFunclist.length; i++) {
                var eventFunc = eventFunclist[i];
                if (eventFunc) {
                    try {
                        eventFunc.apply(eventSrc, arr)
                    } catch (g) {
                    }
                }
            }
        }
    };
    _Event.prototype.mapEventHandler = function(event_name, event_func, event_context)
    {
        if(!this.mapEventArray)
            this.mapEventArray = new Array();

        if (!this.mapEventArray[event_name])
            this.mapEventArray[event_name] = new Array();

        var actUnit = function(){};
        actUnit.id = event_func;
        actUnit.act = event_func;
        actUnit.context = event_context;
        this.mapEventArray[event_name].push(actUnit);
    };
    _Event.prototype.mapEventRemoveById = function(event_name, event_func)
    {
        if(!event_name)
            return false;

        if(!event_func)
            return false;

        if ((!this.mapEventArray[event_name]) || (this.mapEventArray[event_name].length==0))
            return false;

        for(var i = 0; i < this.mapEventArray[event_name].length; i++)
        {
            if(this.mapEventArray[event_name][i].id == event_func.valueOf()){
                this.mapEventArray[event_name].splice(i,1);
            }
        }
    };
    _Event.prototype.mapEventHandlerAct = function(event_name, arg1, arg2)
    {
        if(!event_name)
            return false;

        if ((!this.mapEventArray[event_name]) || (this.mapEventArray[event_name].length==0))
            return false;

        for(var i = 0; i < this.mapEventArray[event_name].length; i++)
        {
            if (!this.mapEventArray[event_name][i].context){
                this.mapEventArray[event_name][i].act(arg1, arg2);
            }
            else{
                this.mapEventArray[event_name][i].act.apply(
                        this.mapEventArray[event_name][i].context, arguments);
            }

        }
    };
    _Event.prototype.getPropertyName = function(name) {
        return "_Event__" + name;
    };
    _Event.prototype.getOffset = function(evt, _obj) {
        var pos = new _SPoint(0, 0);


        if (enum_BrowserType.IPhone || enum_BrowserType.Android) {
            var touch = event.touches[0];

            if (event.touches.length == 1) {
                if (isDefined(touch.offsetX)) {
                    var c = evt.target || evt.srcElement;
                    while (c && c != _obj) {
                        pos.add(c.offsetLeft, c.offsetTop);
                        try {
                            c = c.offsetParent;
                        }
                        catch (e) {
                            c = _obj;
                        }
                    }
                    pos.add(touch.offsetX, touch.offsetY);
                }
                else
                    if (isDefined(touch.pageX)) {

                        if (SCommon.SMousePos) {
                            SCommon.SMousePos.setEventText = 'pageXY(x,y):' + touch.pageX + ',' + touch.pageY;
                            SCommon.SMousePos.refresh();
                        }


                        pos.set(touch.pageX, touch.pageY);
                        while (_obj) {
                            pos.add(-_obj.offsetLeft, -_obj.offsetTop);
                            _obj = _obj.offsetParent;
                        }
                    }
            }
        }
        else {
            if (isDefined(evt.offsetX)) {
                var c = evt.target || evt.srcElement;
                while (c && c != _obj) {
                    pos.add(c.offsetLeft, c.offsetTop);
                    try {
                        c = c.offsetParent;
                    }
                    catch (e) {
                        c = _obj;
                    }
                }
                pos.add(evt.offsetX, evt.offsetY);
            }
            else
                if (isDefined(evt.pageX)) {
                    if (SCommon.SMousePos) {
                        SCommon.SMousePos.setEventText = 'isDefined(x,y):' + evt.pageX + ',' + evt.pageY;
                        SCommon.SMousePos.refresh();

                    }
                    pos.set(evt.pageX, evt.pageY);
                    while (_obj) {
                        pos.add(-_obj.offsetLeft, -_obj.offsetTop);
                        _obj = _obj.offsetParent;
                    }
                }
        }
        return pos;
    };
    _Event.prototype.stopEvent = function(e) {
        if (!e) {
            e = window.event;
        }
        if (enum_BrowserType.IE) {
            window.event.cancelBubble = true;
        } else {
            if (e) {
                e.cancelBubble = true;
            }
        }
    };
    function _DragObject(src) {
        this.src = src;
        this.cursor = "default";
        setCursor(this.src, this.cursor);
        this.offsetPos = new _Size(0, 0);
        this.viewSize = new _Size(this.src.offsetWidth, this.src.offsetHeight);
        this.dgPoint = new _SPoint(0, 0);
        this.eventSrc = this.src.setCapture ? this.src : window;
        this.mousemove = SEvent.createAdapter(this, this.drag);
        this.mouseup = SEvent.createAdapter(this, this.end);
        this.onmouseout = SEvent.createAdapter(this, this.mouseout);
        this.startPoint = new _SPoint(0, 0);

        if (!enum_BrowserType.IE) {
            SEvent.attachEvent(window, "mouseout", this.onmouseout);
        }
    };
    _DragObject.prototype.setDefaultCursor = function(cur) {
        this.cursor = cur;
        setCursor(this.src, this.cursor);
    };
    _DragObject.prototype.start = function(a) {

        if( enum_BrowserType.IPhone || enum_BrowserType.Android )
        {

            var touch = a.touches[0];

            if(a.touches.length == 1)
            {
                this.dgPoint.set(touch.clientX, touch.clientY);
                this.startPoint = this.dgPoint.copy();
            }

            SEvent.attachEvent(this.eventSrc, "touchmove", this.mousemove);
            SEvent.attachEvent(this.eventSrc, "touchend", this.mouseup);

            if (this.src.setCapture) {
                this.src.setCapture();
            }


            eventOverlap(a);
        }
        else
        {
            if (!a)
                a = window.event;

            this.dgPoint.set(a.clientX, a.clientY);
            this.startPoint = this.dgPoint.copy();

            SEvent.attachEvent(this.eventSrc, "mousemove", this.mousemove);
            SEvent.attachEvent(this.eventSrc, "mouseup", this.mouseup);

            if (this.src.setCapture) {
                this.src.setCapture();
            }

            eventOverlap(a);
        }

        SEvent.trigger(this, "startDrag");
    };
    _DragObject.prototype.end = function(a) {
        if (!a)
            a = window.event;


        if( enum_BrowserType.IPhone || enum_BrowserType.Android )
        {
            a.preventDefault();

            SEvent.detachEvent(this.eventSrc, "touchmove", this.mousemove);
            SEvent.detachEvent(this.eventSrc, "touchend", this.mouseup);
        }
        else
        {

            SEvent.detachEvent(this.eventSrc, "mousemove", this.mousemove);
            SEvent.detachEvent(this.eventSrc, "mouseup", this.mouseup);
        }


        this.ylzr7(a);
        if (document.releaseCapture) {
            document.releaseCapture();
        }

        if (!this.startPoint.equals(this.dgPoint)) {
            SEvent.trigger(this, "endDrag");
        }
    };
    _DragObject.prototype.drag = function(a) {
        if (!a)
            a = window.event;
        this.ylzr7(a);
        SEvent.trigger(this, "drag");
    };
    _DragObject.prototype.ylzr7 = function(a) {

        if (enum_BrowserType.IPhone || enum_BrowserType.Android) {

            a.preventDefault();

            if (a.touches.length == 1) {

                var touch = a.touches[0];

                var offset = new _Size(this.offsetPos.width +
                (touch.clientX - this.dgPoint.x), this.offsetPos.height +
                (touch.clientY - this.dgPoint.y));
                this.move(offset);
                this.dgPoint.set(touch.clientX, touch.clientY);
                offset = null;
            }
        }
        else{

            if (!a)
                a = window.event;
            var offset = new _Size(this.offsetPos.width
                    + (a.clientX - this.dgPoint.x), this.offsetPos.height
                    + (a.clientY - this.dgPoint.y));
            this.move(offset);
            this.dgPoint.set(a.clientX, a.clientY);
            offset = null;

        }

    };
    _DragObject.prototype.mouseout = function(a) {
        if (enum_BrowserType.IPhone || enum_BrowserType.Android) {

            a.preventDefault();

            SEvent.detachEvent(this.eventSrc, "touchmove", this.mousemove);
            SEvent.detachEvent(this.eventSrc, "touchend", this.mouseup);
        }
        else{
            if (!a)
                a = window.event;
            if (!a.relatedTarget) {
                SEvent.detachEvent(this.eventSrc, "mousemove", this.mousemove);
                SEvent.detachEvent(this.eventSrc, "mouseup", this.mouseup);
            }
        }
    };
    _DragObject.prototype.move = function(offset, NoEventTrigger) {
        this.offsetPos.set(offset.width, offset.height);
        this.src.style.left = offset.width + 'px';
        this.src.style.top = offset.height + 'px';
        if (!NoEventTrigger)
            SEvent.trigger(this, "move");
    };
    function _MovingTick(amount) {
        this.ticks = amount;
        this.tick = 0;
    };
    _MovingTick.prototype.InitTick = function() {
        this.tick = 0;
    };
    _MovingTick.prototype.getFactor = function() {
        this.tick++;
        var a = Math.PI * (this.tick / this.ticks - 0.5);
        return (Math.sin(a) + 1) / 2;
    };
    _MovingTick.prototype.IsMoving = function() {
        return this.tick < this.ticks
    };
    function _SMap(container, width, height) {

        if (!isDefined(container)) {
            alert('container는 div객체이어야 합니다.');
            for ( var a in _SMap.prototype) {
                this[a] = nullFunc;
            }
            return;
        }

        mapLayerCount++;
        this.map_window = container;

        this.map_window.style.overflow = "hidden";
        if (this.map_window.style.position != "absolute"
                && this.map_window.style.position != "relative") {
            this.map_window.style.position = "relative";
        }

        if (!isDefined(width)) {
            width = this.map_window.offsetWidth;
        } else {
            this.map_window.style.width = width  + 'px';
        }
        if (!isDefined(height)) {
            height = this.map_window.offsetHeight;
        } else {
            this.map_window.style.height = height  + 'px';;
        }
        this.viewSize = new _Size(width, height);
        this.downpos = new _Size(0, 0);
        this.mapEventList = new Array();
        this.usedbclick = true;
        this.centerCross;
        this.setMapName = 'kor_normal';
        /*this.makeCenterCross();*/

        SCommon.SMapEle = this;
    };
    _SMap.prototype.setMap = function(mapName){
    	this.spec = new SSpec();
    	
    	this.setMapName = mapName;
    	this.spec.setMapName(mapName);
    	
    	this.init();
    };
    _SMap.prototype.makeGhostMap = function(){

        var _ghostMap = this.mkDiv(0);

        _ghostMap.id = '__ghostMap';
        _ghostMap.style.width = this.map_window.offsetWidth  + 'px';;
        _ghostMap.style.height = this.map_window.offsetWidth  + 'px';;
        _ghostMap.style.left = this.map_window.offsetWidth  + 'px';;
        _ghostMap.style.top = this.map_window.offsetHeight  + 'px';;
        _ghostMap.style.zIndex = 100;
        this.map_window.appendChild(_ghostMap);
    };
    _SMap.prototype.makeCenterCross = function(){
        var centerCross = this.mkDiv(0);

        centerCross.id = '__centerCross';
        centerCross.style.position = 'absolute';
        centerCross.style.width = '10px';;
        centerCross.style.height = '10px';;
        centerCross.style.left = parseInt((this.map_window.offsetWidth)/2)  + 'px';
        centerCross.style.top = parseInt((this.map_window.offsetHeight)/2)  + 'px';
        centerCross.style.zIndex = 110;
        centerCross.innerHTML = "<v:line from='-10',0 to= 10,0 strokecolor= #ff0000 strokeweight= 0.5></v:line>"+
                                "<v:line from=0,'-10' to= 0,10 strokecolor= #ff0000 strokeweight= 0.5></v:line>";
        this.map_window.appendChild(centerCross);
                SEvent.bind(this.map_window, "redraw", this, this.makeCenterCrossRedraw);
    };
    _SMap.prototype.makeCenterCrossRedraw = function(){
        var centerCross = document.getElementById('__centerCross');

        centerCross.style.left = parseInt((this.map_window.offsetWidth)/2) + 'px';
        centerCross.style.top = parseInt((this.map_window.offsetHeight)/2) + 'px';
    };
    _SMap.prototype.init = function() {
        this.center_p = new _SPoint(0, 0);
        this.b7 = new _SPoint(0, 0);
        this.mapIndex = new _SPoint(0, 0);
        this.rotateNum = new _SPoint(0, 0);
        this.overlays = [];
        this.controls = [];
        this.marks = [];
        this.center = new _SPoint(0.5, 0.5);
        this.gz1 = null;
        this.userOverlays = [];
        this.bound = null;
        this.edy7 = false;
        this.hjfz0();
        this.settingLayers();
        this.swo8();
        this.dragobj = new _DragObject(this.div);
        this.resizeType = new _SPoint(0, 0);
        this.boundary = new Array(0, 0, 0, 0);

        this.wheelAdapter = SEvent.createAdapter(this, this.u0);

        this.infowin = new _infowindow();
        this.addOverlay(this.infowin);
        this.historyIndex = -1;
        this.history = new Array();

        this.dragTimeOut = null;
        


        SEvent.bind(this.dragobj, "drag", this, this.onDrag);
        SEvent.bind(this.dragobj, "startDrag", this, this.onStartDrag);
        SEvent.bind(this.dragobj, "endDrag", this, this.onEndDrag);
        SEvent.bind(this.dragobj, "move", this, this.onMove);
        
        // <-----------------------------
        // christian, 2013.7.13
        // 서울시 Logo 생성
        // <-----------------------------  
        this.seoulLogo = new SSeoulLogo('logo'); 
    	this.seoulLogo.init(this);
    	// <-----------------------------
        var cbFunc;

        if(enum_BrowserType.IPhone || enum_BrowserType.Android)
        {
            cbFunc = SEvent.attachDom(this.div, "click", this, this.click);
                this.mapEventList.push( {
                src : this.div,
                eventName : "click",
                cbFunc : cbFunc
            });

            cbFunc = SEvent.attachDom(this.div, "touchstart", this,
                this.mousedown);
                this.mapEventList.push( {
                    src : this.div,
                    eventName : "mousedown",
                    cbFunc : cbFunc
                });

            this.div.addEventListener("touchend", this.getGesture(), false);

        }
        else
        {
            cbFunc = SEvent.attachDom(this.div, "click", this, this.click);
            this.mapEventList.push( {
                src : this.div,
                eventName : "click",
                cbFunc : cbFunc
            });

            cbFunc = SEvent.attachDom(this.div, "mousedown", this,
                this.mousedown);
                this.mapEventList.push( {
                    src : this.div,
                    eventName : "mousedown",
                    cbFunc : cbFunc
                });
            cbFunc = SEvent
                .attachDom(this.div, "mouseup", this, this.mouseup);
                this.mapEventList.push( {
                src : this.div,
                eventName : "mouseup",
                cbFunc : cbFunc
            });
            cbFunc = SEvent
                .attachDom(this.div, "mousemove", this, this.mousemove);
                this.mapEventList.push( {
                src : this.div,
                eventName : "mousemove",
                cbFunc : cbFunc
            });
        }

        cbFunc = SEvent.attachDom(window, "resize", this, this.resize);
        this.mapEventList.push( {
            src : window,
            eventName : "resize",
            cbFunc : cbFunc
        });
        cbFunc = SEvent
                .attachDom(window, "beforeprint", this, this.beforeprint);
        this.mapEventList.push( {
            src : window,
            eventName : "beforeprint",
            cbFunc : cbFunc
        });
        cbFunc = SEvent.attachDom(window, "afterprint", this, this.afterprint);
        this.mapEventList.push( {
            src : window,
            eventName : "afterprint",
            cbFunc : cbFunc
        });
        cbFunc = SEvent.attachDom(this.div, "dblclick", this,
                this.dblclick);
        this.mapEventList.push( {
            src : this.div,
            eventName : "dblclick",
            cbFunc : cbFunc
        });
        cbFunc = SEvent.attachDom(this.div, "contextmenu", this,
                this.contextmenu);
        this.mapEventList.push( {
            src : this.div,
            eventName : "contextmenu",
            cbFunc : cbFunc
        });
        cbFunc = SEvent.attachDom(window, "unload", this, this.unload);
        this.mapEventList.push( {
            src : window,
            eventName : "unload",
            cbFunc : cbFunc
        });

        if(enum_BrowserType.IPhone || enum_BrowserType.Android)
        {
            this.div.addEventListener("guestureend", this.getGesture(), false);
        }

        SEvent.trigger(this.div, "ready");
    };
    _SMap.prototype.addHistory = function(hPoint, hLevel) {
        if (this.historyIndex >= 0) {
            prevPt = this.history[this.historyIndex];
            if (prevPt.x == hPoint.x && prevPt.y == hPoint.y
                    && prevPt.level == hLevel)
                return;
        }
        this.history.push( {
            x : hPoint.x,
            y : hPoint.y,
            level : hLevel
        });
        this.historyIndex += 1;
    };
    _SMap.prototype.prev = function() {
        if (this.historyIndex > 0) {
            this.historyIndex -= 1;
            hPoint = this.history[this.historyIndex];
            this.setMoveAndZoom(new SPoint(hPoint.x, hPoint.y), hPoint.level);
        } else {
            alert("No preview page !!!");
        }
    };
    _SMap.prototype.next = function() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex += 1;
            hPoint = this.history[this.historyIndex];
            this.setMoveAndZoom(new SPoint(hPoint.x, hPoint.y), hPoint.level);
        } else {
            alert("No next page !!!");
        }
    };
    _SMap.prototype.setMapCursor = function(cur) {
        this.dragobj.setDefaultCursor(cur);
    };
    _SMap.prototype.beforeprint = function() {
        SEvent.trigger(this, "beforePrint");
    };
    _SMap.prototype.afterprint = function() {
        SEvent.trigger(this, "afterPrint");
    };
    _SMap.prototype.unload = function() {
        if (this.mapEventList != null) {
            for ( var i = 0; i < this.mapEventList.length; i++) {
                SEvent.detachEvent(this.mapEventList[i].src,
                        this.mapEventList[i].eventName,
                        this.mapEventList[i].cbFunc);
                this.mapEventList[i] = null;
            }
            this.mapEventList = null;
        }

        this.removeImages(this.mapImages);
        SEvent.trigger(this, "unload");
        this.spec = null;
        this.center_p = null;
        this.b7 = null;
        this.mapIndex = null;
        this.rotateNum = null;
        this.overlays = null;
        this.marks = null;
        this.center = null;
        this.edy7 = false;
        this.bound = null;
        this.wheelAdapter = null;
        this.infowin = null;
        this.overlay = null;
        this.infoLayer = null;
        this.markLayer = null;
        this.pathLayer = null;
        this.mapLayer = null;
        this.div = null;
        this.staticLayer = null;
        this.checkLayer = null;
        this.checkContainer = null;
        this.userOverlays = null;
        this.dragobj = null;
        removeChild(this.map_window);
        this.map_window = null;
    };
    _SMap.prototype.hjfz0 = function() {
        this.mapLevel = 2;
        this.mapMode = 0;
        this._enabledrag = true;
        this.minlevel = this.spec.minLevel;
        this.maxlevel = this.spec.maxLevel;
    };
    _SMap.prototype.setMapmode = function(mode) {
        this.mapMode = mode;
    };
    _SMap.prototype.mkDiv = function(zIndex) {
        var b = document.createElement("div");
        b.style.position = "absolute";
        b.style.top = '0px';
        b.style.left = '0px';
        b.style.zIndex = zIndex;
        if (enum_BrowserType.IE) {
            b.unselectable = "on";
            b.onselectstart = falseFunc;
        } else {
            b.style.MozUserSelect = "none"
        }
        return b;
    };
    _SMap.prototype.settingLayers = function() {
        this.div = this.mkDiv(0);
        this.map_window.appendChild(this.div);
        this.div.id = 'mapLayer' + mapLayerCount;
        this.staticLayer = this.mkDiv(10);
        this.map_window.appendChild(this.staticLayer);
        this.mapLayer = this.mkDiv(10);
        this.div.appendChild(this.mapLayer);
        this.pathLayer = this.mkDiv(15);
        this.div.appendChild(this.pathLayer);
        this.markLayer = this.mkDiv(20);
        this.div.appendChild(this.markLayer);
        this.infoLayer = this.mkDiv(30);
        this.div.appendChild(this.infoLayer);
        this.overlay = this.mkDiv(100);
        this.div.appendChild(this.overlay);
        this.checkContainer = this.mkDiv(-1000);
        this.checkContainer.style.width = "10000px";
        this.checkContainer.style.height = "10000px";
        this.checkContainer.style.left = "-10000px";
        this.checkContainer.style.top = "-10000px";
        this.map_window.appendChild(this.checkContainer);
        this.checkLayer = this.mkDiv(0);
        this.checkContainer.appendChild(this.checkLayer);
    };
    _SMap.prototype.createOverlayPane = function(zIndex) {
        var overlay = this.mkDiv(zIndex);
        this.div.appendChild(overlay);
        this.userOverlays.push(overlay);
        return overlay;
    };
    _SMap.prototype.getHTMLSize = function(html) {
        this.checkLayer.innerHTML = html;
        var size = new _Size(this.checkLayer.offsetWidth,
                this.checkLayer.offsetHeight);
        this.checkLayer.innerHTML = '';
        return size;
    };
    _SMap.prototype.getDomSize = function(dom) {

        var parent = null;
        var orgPos = dom.style.position;

        if (dom.parentNode) {
            parent = dom.parentNode;
            parent.removeChild(dom);
        }

        dom.style.position = "";
        this.checkLayer.appendChild(dom);
        var size = new _Size(this.checkLayer.offsetWidth, this.checkLayer.offsetHeight);
        this.checkLayer.removeChild(dom);
        if (parent != null) {
            dom.style.position = orgPos;
            parent.appendChild(dom);
        }

        parent = null;
        orgPos = null;
        return size;
    };
    _SMap.prototype.swo8 = function() {
        if(!this.mapImages)
            this.mapImages = [];

        if(!this.overlayImages)
            this.overlayImages = [];

        this.sizeSetting();
        this.mzbe4();
    };
    _SMap.prototype.onDrag = function(a){
          if (SCommon.SMousePos)
               SCommon.SMousePos.setEventText = 'onDrag Event';

        SEvent.trigger(this, "drag");
        SEvent.mapEventHandlerAct("drag", this.currentMousePoint(a));
    };
    _SMap.prototype.onStartDrag = function(a) {
        if (!a) {
            a = window.event;
        }

        if (SCommon.SMousePos)
            SCommon.SMousePos.setEventText = 'startDrag Event';

        SEvent.trigger(this, "startDrag", this.getBound());
        SEvent.mapEventHandlerAct("startDrag", this.currentMousePoint(a));
    };
    _SMap.prototype.onEndDrag = function(a) {
        if (!a) {
            a = window.event;
        }

        if (SCommon.SMousePos)
            SCommon.SMousePos.setEventText = 'endDrag Event';

        SEvent.trigger(this, "endDrag", this.getBound());
        SEvent.mapEventHandlerAct("endDrag", this.currentMousePoint(a));
        this.addHistory(this.getCenter(), this.getZoom());
    };
    _SMap.prototype.onMove = function(a) {
        if (!a) {
            a = window.event;
        }

                if (SCommon.SMousePos)
                    SCommon.SMousePos.setEventText = 'move Event';



        this.MovingFill();
        SEvent.trigger(this, "move", this.dragobj.offsetPos);
        SEvent.mapEventHandlerAct("move", this.currentMousePoint(a));
    };

    _SMap.prototype.getGesture = function()
    {
        var obj = this;
        return function (e) {
        e.preventDefault();

        if (e.scale > 1 /*&& e.scale != obj.scale*/) {
        	obj.zoomOut();
        } else {
            if (e.scale < 1/* && e.scale != obj.scale*/) {
            	obj.zoomIn();
            }
        }};
        if (SCommon.SMousePos)
            {
                   SCommon.SMousePos.setEventText = 'getGesture Event';
                   SCommon.SMousePos.refresh();
        }

        e.preventDefault();

        if (e.scale > 1) {
            this.zoomIn();
        } else {
            if (e.scale < 1) {
                this.zoomOut();
            }
        }
    };
    _SMap.prototype.onfocus = function() {
        if (!a){
            a = window.event;
        }

        if (SCommon.SMousePos)
        {
            SCommon.SMousePos.setEventText = 'onfocus Event';
            SCommon.SMousePos.refresh(this.currentMousePoint(a));

        }
    };
    _SMap.prototype.tau4 = function(a) {
        var b = SEvent.getOffset(a, this.map_window);
        b.add(-Math.round((this.boundary[0] - this.boundary[2]) / 2),
                    -Math.round((this.boundary[1] - this.boundary[3]) / 2));
        return new _SPoint(b.x - Math.floor(this.viewSize.width / 2),
                    Math.floor(this.viewSize.height / 2)- b.y);
    };
    _SMap.prototype.fwob2 = function(a) {
        var diff = this.tau4(a);
        var wa4 = this.w8();
        wa4.add(diff.x, diff.y);
        return wa4;
    };
    _SMap.prototype.currentMousePoint = function(a) {
        if (a && this.spec) {
            return this.spec.pixel2point(this.fwob2(a), this.mapLevel);
        }
    };
    _SMap.prototype.click = function(a) {
        if (!a) {
            a = window.event;
        }
        if (SCommon.SMousePos)
        {
            SCommon.SMousePos.setEventText = 'click Event';
            SCommon.SMousePos.refresh(this.currentMousePoint(a));
        }

        if (Math.pow((this.dragobj.offsetPos.width - this.downpos.width), 2)
                + Math.pow(
                        (this.dragobj.offsetPos.height - this.downpos.height),
                        2) < 100) {
            SEvent.trigger(this, "click", this.currentMousePoint(a));
            SEvent.mapEventHandlerAct("click", this.currentMousePoint(a));
        }

        SEvent.stopEvent(a);
    };
    _SMap.prototype.contextmenu = function(a) {
        if (!a) {
            a = window.event;
        }
        SEvent.trigger(this, "contextmenu", this.currentMousePoint(a));
        SEvent.mapEventHandlerAct("rclick", this.currentMousePoint(a));
        SEvent.stopEvent(a);
    };
    _SMap.prototype.dblclick = function(a) {
        if (SCommon.SMousePos)
               SCommon.SMousePos.setEventText = 'dblclick Event';

        if (!a) {
            a = window.event;
        }
        if (this._enabledrag && this.usedbclick) {
            var diff = this.tau4(a);
            this.pan(diff.x, diff.y);
            diff = null;
        }
        SEvent.trigger(this, "dblclick", this.currentMousePoint(a));
        SEvent.mapEventHandlerAct("dblclick", this.currentMousePoint(a));
        if (SCommon.SMousePos)
            SCommon.SMousePos.refresh(this.currentMousePoint(a));
    };
    _SMap.prototype.u0 = function(a) {
        var delta = 0;
        if (!a) {
            a = window.event;
        }
        SEvent.stopEvent(a);
        eventOverlap(a);

        delta = (a.wheelDelta) ? a.wheelDelta/120 : (-a.detail/3);
        if (delta > 0) {
            this.zoomOut();
        } else if (delta < 0) {
            this.zoomIn();
        }
        return false;
    };
    _SMap.prototype.move = function(x, y) {
        if (this._enabledrag) {
            var offset = this.dragobj.offsetPos.copy();
            offset.add(x, y);
            this.dragobj.move(offset);
        }
    };
    _SMap.prototype.pan = function(x, y, noEvt) {
        if (this._enabledrag) {
            this.g2 = new _Size(-x, y);
            this.p1 = this.dragobj.offsetPos.copy();
            this.mTick = new _MovingTick(Math.max(20, Math.floor(Math.sqrt(x * x + y * y) / 20)));
            this.panloop(noEvt);
        }
    };
    _SMap.prototype.panloop = function(noEvt) {
        if (this._enabledrag) {
            var factor = this.mTick.getFactor();
            this.dragobj.move(new _Size(this.p1.width + this.g2.width * factor,
                    this.p1.height + this.g2.height * factor));
            this.onDrag();
            if (this.mTick.IsMoving()) {
                this.timer = getTimeout(this, function() {
                    this.panloop(noEvt)
                }, 10);
            }
        }
    };
    _SMap.prototype.IsMoving = function() {
        if (this.mTick)
            return this.mTick.IsMoving();
        else
            return false;
    };
    _SMap.prototype.setBoundOffset = function(left, top, right, bottom) {
        if (left instanceof Array) {
            this.boundary = left;
        } else {
            this.boundary = new Array(left, top, right, bottom);
        }
        SEvent.trigger(this, "redraw");
        SEvent.mapEventHandlerAct("redraw");
    };
    _SMap.prototype.getBoundOffset = function() {
        return this.boundary;
    };
    _SMap.prototype.getMapSize = function() {
        return this.viewSize;
    };
    _SMap.prototype.getBnd = function() {
        var left = this.mapIndex.x * this.spec.tileSize + this.panMargin.width
                - this.dragobj.offsetPos.width + this.boundary[0];
        var right = this.mapIndex.x * this.spec.tileSize + this.panMargin.width
                + this.viewSize.width - this.dragobj.offsetPos.width
                + this.boundary[2];
        var top = (this.mapIndex.y + 1) * this.spec.tileSize
                - this.panMargin.height + this.dragobj.offsetPos.height
                - this.boundary[1];
        var bottom = (this.mapIndex.y + 1) * this.spec.tileSize
                - this.panMargin.height - this.viewSize.height
                + this.dragobj.offsetPos.height - this.boundary[3];
        return Array(left, top, right, bottom);
    };
    _SMap.prototype.getBound = function() {
        var distancePerPixel = this.spec.distancePerPixel(this.mapLevel);
        var mapBound_Info = this.getBnd();
        return Array(mapBound_Info[0] * distancePerPixel + this.spec.getMinX(), mapBound_Info[1]
                * distancePerPixel + this.spec.getMinY(), mapBound_Info[2] * distancePerPixel
                + this.spec.getMinX(), mapBound_Info[3] * distancePerPixel + this.spec.getMinY());
    };
    _SMap.prototype.setBound = function(left, top, right, bottom) {
        if (left instanceof Array) {
            top = left[1];
            right = left[2];
            bottom = left[3];
            left = left[0];
        }
        left = Math.round(left);
        top = Math.round(top);
        right = Math.round(right);
        bottom = Math.round(bottom);
        var pt = new _SPoint(Math.round((left + right) / 2), Math
                .round((top + bottom) / 2));
        var width = right - left;
        var height = top - bottom;
        var lv = this.maxlevel;
        var distancePerPixel;
        for ( var i = this.minlevel; i <= this.maxlevel; i++) {
            distancePerPixel = this.spec.distancePerPixel(i);
            if ((this.viewSize.width - this.boundary[0] - this.boundary[2])
                    * distancePerPixel > width
                    && (this.viewSize.height - (-this.boundary[1] - this.boundary[3]))
                            * distancePerPixel > height) {
                lv = i;
                break;
            }
        }
        this.setCenterAndZoom(pt, lv);
        this.bound = new Array(left, top, right, bottom);
    };
    _SMap.prototype._getCenterPx = function(type) {
        if (!type)
            type = 'TMM';

        var ret = new _SPoint(0, 0);
        var tmp = this.spec.pixel2point(this.w8(), this.mapLevel);

        if (type=='WGS84_Degree') {
            var tempCoord = TMtoWGS84(tmp.x, tmp.y);
            ret.set(tempCoord.x, tempCoord.y);
        }
        else {
            ret.set(tmp.x, tmp.y);
        }

        tmp = null;
        return ret;
    };
    _SMap.prototype.getCenter = function(type) {
        if (!type)
            type = 'TMM';

        var ret = new _SPoint(0, 0);
        var tmp = this.center_p;

        if (type=='WGS84_Degree') {
            var tempCoord = TMtoWGS84(tmp.x, tmp.y);
            ret.set(tempCoord.x, tempCoord.y);
        }
        else {
            ret.set(tmp.x, tmp.y);
        }

        tmp = null;
        return ret;
    };
    _SMap.prototype.w8 = function(ym9) {
        if (!(ym9 instanceof _SPoint)) {
            ym9 = new _SPoint(0, 0);
        }
        ym9.set(this.b7.x
                + Math.round((this.boundary[0] - this.boundary[2]) / 2)
                + this.center.x * this.viewSize.width + this.panMargin.width
                - this.dragobj.offsetPos.width, this.b7.y
                - Math.round((this.boundary[1] - this.boundary[3]) / 2)
                - this.center.y * this.viewSize.height - this.panMargin.height
                + this.dragobj.offsetPos.height);
        return ym9;
    };
    _SMap.prototype.MovingFill = function() {
        var offsetPos = this.dragobj.offsetPos;
        var dje1 = new _Size(this.rotateNum.x * this.spec.tileSize
                + offsetPos.width, -this.rotateNum.y * this.spec.tileSize
                + offsetPos.height);
        if (dje1.width < -this.panMargin.width / 2) {
            this.idru1(this.mapImages, false);
            if (this.spec.hasOverlay()) {
                this.idru1(this.overlayImages, true);
            }
        } else if (dje1.width > this.panMargin.width / 2) {
            this.msx7(this.mapImages, false);
            if (this.spec.hasOverlay()) {
                this.msx7(this.overlayImages, true);
            }
        }
        if (dje1.height < -this.panMargin.height / 2) {
            this.uds2(this.mapImages, false);
            if (this.spec.hasOverlay()) {
                this.uds2(this.overlayImages, true);
            }
        } else if (dje1.height > this.panMargin.height / 2) {
            this.nfdm4(this.mapImages, false);
            if (this.spec.hasOverlay()) {
                this.nfdm4(this.overlayImages, true);
            }
        }
    };
    _SMap.prototype.idru1 = function(mapImages, u4) {
        if (!u4) {
            this.rotateNum.x++;
        }
        var c = mapImages.shift();
        mapImages.push(c);
        var e = mapImages.length - 1;
        for ( var d = 0; d < c.length; d++) {
            this.loadImage(c[d], e, d, u4);
        }
    };
    _SMap.prototype.msx7 = function(mapImages, u4) {
        if (!u4) {
            this.rotateNum.x--;
        }
        var c = mapImages.pop();
        if (c) {
            mapImages.unshift(c);
            for ( var d = 0; d < c.length; d++) {
                this.loadImage(c[d], 0, d, u4);
            }
        }
    };
    _SMap.prototype.nfdm4 = function(mapImages, u4) {
        if (!u4) {
            this.rotateNum.y++;
        }
        for ( var c = 0; c < mapImages.length; c++) {
            var d = mapImages[c].pop();
            mapImages[c].unshift(d);
            this.loadImage(d, c, 0, u4);
        }
    };
    _SMap.prototype.uds2 = function(mapImages, u4) {
        if (!u4) {
            this.rotateNum.y--;
        }
        var b = mapImages[0].length - 1;
        for ( var c = 0; c < mapImages.length; c++) {
            var d = mapImages[c].shift();
            mapImages[c].push(d);
            this.loadImage(d, c, b, u4);
        }
    };
    _SMap.prototype.resize = function() {

         if (SCommon.SMousePos)
               SCommon.SMousePos.setEventText = 'resize Event';


        if (this.viewSize.width != this.map_window.offsetWidth
                || this.viewSize.height != this.map_window.offsetHeight) {
            var ym9 = this.w8();
            ym9.add((this.map_window.offsetWidth - this.viewSize.width)
                    * this.center.x * this.resizeType.x,
                    (this.map_window.offsetHeight - this.viewSize.height)
                            * this.center.y * this.resizeType.y);
            this.viewSize.width = this.map_window.offsetWidth;
            this.viewSize.height = this.map_window.offsetHeight;
            this.sizeSetting();

            this.mzbe4();
            this.l3(ym9);
            ym9 = null;
            SEvent.trigger(this, "resize");
        }
    };
    _SMap.prototype.mousemove = function(a) {
        if (!a) {
            a = window.event;
        }
        SEvent.trigger(this, "mousemove", this.currentMousePoint(a));
        SEvent.mapEventHandlerAct("mousemove", this.currentMousePoint(a));
        if (SCommon.SMousePos)
            SCommon.SMousePos.refresh(this.currentMousePoint(a));
    };
    _SMap.prototype.mousedown = function(a) {

        if (enum_BrowserType.IPhone || enum_BrowserType.Android)
        {
            a.preventDefault();
            var touch = a.touches[0];


            if (a.touches.length == 1) {

                 if (touch.target.width === 128) {
                    return null;
                }

                if (SCommon.SMousePos)
                {
                   SCommon.SMousePos.setEventText = 'mousedown Event';
                   SCommon.SMousePos.refresh(this.currentMousePoint(a));
                }

                window.clearTimeout(this.timer);

                if (this._enabledrag) {
                    this.dragobj.start(a);
                }

                this.dragobj.offsetPos.copy(this.downpos);
                SEvent.trigger(this, "mousedown", this.currentMousePoint(a));
            }
            return null;
        }
        else{
            if (SCommon.SMousePos)
            {
               SCommon.SMousePos.setEventText = 'mousedown Event';
               SCommon.SMousePos.refresh(this.currentMousePoint(a));
            }

            window.clearTimeout(this.timer);

            if (this._enabledrag) {
                this.dragobj.start(a);
            }

            this.dragobj.offsetPos.copy(this.downpos);
            SEvent.trigger(this, "mousedown", this.currentMousePoint(a));
        }

        SEvent.mapEventHandlerAct("mousedown", this.currentMousePoint(a));
    };
    _SMap.prototype.mouseup = function(a)
    {
        if (SCommon.SMousePos)
        {
            SCommon.SMousePos.setEventText = 'mouseup Event';
            SCommon.SMousePos.refresh(this.currentMousePoint(a));
        }

        var tempCenterPos = this._getCenterPx();
        this.center_p.set(tempCenterPos.x, tempCenterPos.y);
        SEvent.trigger(this, "mouseup", this.currentMousePoint(a));
        SEvent.mapEventHandlerAct("mouseup", this.currentMousePoint(a));
    };
    _SMap.prototype.mzbe4 = function() {
        this.createTile(this.mapImages);
    };
    _SMap.prototype.setZoom = function(lv) {
        if (SCommon.SMousePos)
               SCommon.SMousePos.setEventText = 'setZoom Event';

        if(lv > this.maxlevel || lv < this.minlevel)
            return;

        if (this.mapLevel != lv) {
            this.bound = null;
            var prevLv = this.mapLevel;
            this.mapLevel = lv;

            var pt = this.getCenter();
            this.setCenter(pt);

            SEvent.trigger(this, "zoom", this.mapLevel, prevLv);
            SEvent.mapEventHandlerAct("zoom", this.mapLevel, prevLv);
            this.addHistory(this.getCenter(), this.getZoom());
        }
    };
    _SMap.prototype.getZoom = function() {
        return this.mapLevel;
    };
    _SMap.prototype.setMinLevel = function(lv) {
        if(lv >= this.spec.minLevel && lv <= this.spec.maxLevel)
            this.minlevel = lv;
    };
    _SMap.prototype.setMaxLevel = function(lv) {
        if(lv >= this.spec.minLevel && lv <= this.spec.maxLevel)
            this.maxlevel = lv;
    };
    _SMap.prototype.zoomIn = function() {
        if (this.mapLevel > this.minlevel) {
            this.setZoom(this.mapLevel - 1);
        }
    };
    _SMap.prototype.zoomOut = function() {
        if (this.mapLevel < this.maxlevel) {
            this.setZoom(this.mapLevel + 1);
        }
    };
    _SMap.prototype.setDrag = function(onoff) {
        if(onoff)
            this.enableDrag();
        else
            this.disableDrag();
    };
    _SMap.prototype.enableDrag = function() {
        this._enabledrag = true;
    };
    _SMap.prototype.disableDrag = function() {
        this._enabledrag = false;
    };
    _SMap.prototype.ZoomWheel = function(onoff) {
        if(onoff)
            this.enableWheelZoom();
        else
            this.disableWheelZoom();
    };
    _SMap.prototype.enableWheelZoom = function() {
        this.map_window.onmousewheel = falseFunc;
        SEvent.attachEvent(this.map_window, "mousewheel", this.wheelAdapter)
    };
    _SMap.prototype.disableWheelZoom = function() {
        this.map_window.onmousewheel = '';
        SEvent.detachEvent(this.map_window, "mousewheel", this.wheelAdapter)
    };
    _SMap.prototype.setMoveAndZoom = function(point, mapLevel) {
        var prevLv = -1;
        mapLevel = parseInt(mapLevel);
        if (mapLevel != this.mapLevel) {
            prevLv = this.mapLevel;
            this.mapLevel = mapLevel;
        }
        this.setCenter(point);
        if (prevLv != -1) {
            SEvent.trigger(this, "zoom", this.mapLevel, prevLv);
        }
        SEvent.trigger(this, "moved");
    };
    _SMap.prototype.setCenterAndZoom = function(point, mapLevel) {
        this.setMoveAndZoom(point, mapLevel);
        this.addHistory(this.getCenter(), this.getZoom());
    };
    _SMap.prototype.initPoint = function() {
        this.l3(this.spec.point2pixel(this.center_p, this.mapLevel));
        this.setZoom(this.mapLevel);
        this.mapMode = 0;
    };
    _SMap.prototype.SetMoveXY = function(x, y) {
         this.setCenter(new SPoint(x, y), false);
     };
    _SMap.prototype.setCenter = function(point, enableAutoPan) {
        var center_px;
        var prevCenter_px;

        if (!enableAutoPan) {
            enableAutoPan = false;
        }
        if (point.x == null || point.x == '' || point.y == null || point.y == '') {
            return;
        }

        /*if (this.mapLevel == 0) {
            this.mapLevel = 2;
            SEvent.trigger(this, "zoom", this.mapLevel, 0);
        }*/

        if (enableAutoPan)
            prevCenter_px = this.spec.point2pixel(this.center_p, this.mapLevel);
        this.center_p.set(point.x, point.y);

        center_px = this.spec.point2pixel(this.center_p, this.mapLevel);

        if (enableAutoPan) {
            var v = new _SPoint(prevCenter_px.x - center_px.x, prevCenter_px.y- center_px.y);
            if (Math.abs(v.x) <= this.viewSize.width
                    && Math.abs(v.y) <= this.viewSize.height)
                this.pan(-v.x, -v.y);
            else
                this.l3(center_px);
        } else
            this.l3(center_px);

        this.addHistory(this.getCenter(), this.getZoom());
    };
    _SMap.prototype.l3 = function(center_px) {
        this.b7.set(center_px.x - this.center.x * this.viewSize.width - this.panMargin.width,
                    center_px.y+ this.center.y * this.viewSize.height + this.panMargin.height);

        this.mapIndex.set(Math.floor(this.b7.x / this.spec.tileSize), Math
                .floor(this.b7.y / this.spec.tileSize));
        this.rotateNum.set(0, 0);

        var csc6 = new _Size(this.mapIndex.x * this.spec.tileSize - this.b7.x,
                this.b7.y - (this.mapIndex.y + 1) * this.spec.tileSize);

        if (csc6.width < -this.panMargin.width / 2) {
            this.mapIndex.x++;
            csc6.width += this.spec.tileSize;
        } else if (csc6.width > this.panMargin.width / 2) {
            this.mapIndex.x--;
            csc6.width -= this.spec.tileSize;
        }
        if (csc6.height < -this.panMargin.height / 2) {
            this.mapIndex.y--;
            csc6.height += this.spec.tileSize;
        } else if (csc6.height > this.panMargin.height / 2) {
            this.mapIndex.y++;
            csc6.height -= this.spec.tileSize;
        }
        var h = screen.updateInterval || 0;
        screen.updateInterval = 1000;
        this.dragobj.move(csc6, true);
        this.b7.add(csc6.width, -csc6.height);
        this.loadImages();
        SEvent.trigger(this, "redraw");
        SEvent.mapEventHandlerAct("redraw");
        screen.updateInterval = h;
    };
    _SMap.prototype.sizeSetting = function() {
        this.mapFragSize = new _Size(Math.ceil(this.viewSize.width
                / this.spec.tileSize) + 2, Math.ceil(this.viewSize.height
                / this.spec.tileSize) + 2);
        this.panMargin = new _Size(

                Math
                        .round((this.mapFragSize.width * this.spec.tileSize - this.viewSize.width) / 2),
                Math
                        .round((this.mapFragSize.height * this.spec.tileSize - this.viewSize.height) / 2));
    };
    _SMap.prototype.y2 = function() {
        return new Array(this.mapIndex.x + this.rotateNum.x, this.mapIndex.y
                + this.rotateNum.y, this.mapIndex.x + this.mapFragSize.width
                + this.rotateNum.x, this.mapIndex.y - this.mapFragSize.height
                + this.rotateNum.y);
    };
    _SMap.prototype.createTile = function(mapImages) {

        var tileImg;
        while (mapImages.length > this.mapFragSize.width) {
            var column = mapImages.pop();
            for ( var i = 0; i < column.length; i++) {
                this.mapLayer.removeChild(column[i]);
                delete column[i];
            }
        }
        for ( var i = mapImages.length; i < this.mapFragSize.width; i++) {
            mapImages.push( []);
        }
        for ( var i = 0; i < this.mapFragSize.width; i++) {
            while (mapImages[i].length > this.mapFragSize.height) {
                var e = mapImages[i].pop();
                this.mapLayer.removeChild(e);
            }
            for ( var j = mapImages[i].length; j < this.mapFragSize.height; j++) {
                tileImg = _Image.create(null, this.spec.tileSize,
                        this.spec.tileSize, 0, 0, 0, this.mapLayer);
                tileImg.cb7 = -1;
                tileImg.ukhh3 = -1;
                mapImages[i].push(tileImg);
            }
        }
    };
    _SMap.prototype.removeImages = function(mapImages) {
        if (mapImages != null && this.mapLayer != null) {
            for ( var i = 0; i < mapImages.length; i++) {
                for ( var j = 0; j < mapImages[i].length; j++) {
                    try {
                        this.mapLayer.removeChild(mapImages[i][j]);
                        mapImages[i][j] = null;
                    } catch (e) {
                    }
                }
            }
        }
    };
    _SMap.prototype.sortTileFromCenter = function(arr) {
        var b = new Array();
        for ( var i = 0; i < arr.length; i++) {
            for ( var j = 0; j < arr[i].length; j++) {
                var e = arr[i][j];
                e.xpos = i;
                e.ypos = j;
                var c = Math.min(i, arr.length - i - 1);
                var d = Math.min(j, arr[i].length - j - 1);
                if (c == 0 || d == 0) {
                    e.priority = 0;
                } else {
                    e.priority = c + d;
                }
                b.push(e);
            }
        }
        b.sort( function(g, h) {
            return h.priority - g.priority
        });
        return b;
    };
    _SMap.prototype.loadImages = function() {
        var k0 = this.sortTileFromCenter(this.mapImages);
        for ( var i = 0; i < k0.length; i++) {
            this.loadImage(this.mapImages[k0[i].xpos][k0[i].ypos], k0[i].xpos,
                    k0[i].ypos, false);
        }
    };
    _SMap.prototype.loadImage = function(tileImg, cb7, ukhh3, u4) {
        var mapLevel = this.getZoom();
        var tileSrc = this.spec.getTileUrl(this.mapIndex.x + cb7+ this.rotateNum.x,
                            this.mapIndex.y - ukhh3 + this.rotateNum.y, this.mapLevel);
        var emptyTileUrl = this.spec.emptyTileUrl;

          if (tileSrc != tileImg.src) {
            tileImg.onload = falseFunc;
            /*tileImg.onerror = function(){
                tileImg.onerror = falseFunc;
                tileImg.src = emptyTileUrl;
            };*/
            tileImg.src = tileSrc;
        }

        tileImg.style.left = ((cb7 + this.rotateNum.x) * this.spec.tileSize
                            - this.panMargin.width) + 'px';
        tileImg.style.top = ((ukhh3 - this.rotateNum.y) * this.spec.tileSize
                            - this.panMargin.height) + 'px';

        if (tileImg.cb7 != -1 && tileImg.ukhh3 != -1) {
            SEvent.trigger(this, "removeTile", mapLevel, tileImg.cb7, tileImg.ukhh3);
        }

        tileImg.cb7 = this.mapIndex.x + cb7 + this.rotateNum.x;
        tileImg.ukhh3 = this.mapIndex.y - ukhh3 + this.rotateNum.y;

        SEvent.trigger(this, "drawTile", mapLevel, tileImg.cb7, tileImg.ukhh3);
    };
    _SMap.prototype.setPng = function(element, source) {
        var style = element.style;
        style.visibility = 'hidden';
        style.width = element.clientWidth + 'px';
        style.height = element.clientHeight + 'px';
        var dotImg = this.spec.preTileUrl;

        var setOnerror = function() {
            if (element.removeEventListener) {
                element.removeEventListener('onerror', setOnerror, false);
                element.removeEventListener('onload', setOnload, false);
            } else if (element.detachEvent) {
                try {
                    element.detachEvent('onerror', setOnerror);
                    element.detachEvent('onload', setOnload);
                } catch (e) {
                }
            }
            element.setAttribute('src', dotImg);
        };
        var setOnload = function() {
            if (element.removeEventListener) {
                element.removeEventListener('onerror', setOnerror, false);
                element.removeEventListener('onload', setOnload, false);
            } else if (element.detachEvent) {
                try {
                    element.detachEvent('onerror', setOnerror);
                    element.detachEvent('onload', setOnload);
                } catch (e) {
                }
            }
            element.style.visibility = 'visible';
            style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
                    + source + "',sizingMethod='scale')";
            element.setAttribute('src', dotImg);
        };

        if (element.addEventListener) {
            element.addEventListener('onerror', setOnerror, false);
            element.addEventListener('onload', setOnload, false);
        } else if (element.attachEvent) {
            element.attachEvent("onerror", setOnerror);
            element.attachEvent("onload", setOnload);
        }

        element.setAttribute('src', source);
    };
    _SMap.prototype.getPos = function(px, coord) {
        if (!coord)
            coord = new _SPoint(0, 0);

        coord.set(px.x - this.mapIndex.x * this.spec.tileSize
                - this.panMargin.width, (this.mapIndex.y + 1)
                * this.spec.tileSize - this.panMargin.height - px.y);
        return coord;

    };
    _SMap.prototype.addOverlay = function(_obj, showFlag, dis, key) {

        this.overlays.push(Array(_obj, key));
        _obj.init(this);
        _obj.redraw(this);
    };
    _SMap.prototype.addOverlay2 = function(_obj, key, parentLayer) {
        this.overlays.push(Array(_obj, key));
        _obj.init(this, parentLayer);
        _obj.redraw(this);
    };
    _SMap.prototype.removeOverlay = function(_obj) {
        for ( var i = 0; (this.overlays && i < this.overlays.length); i++) {
            if (_obj == this.overlays[i][0]) {
                _obj.unload();
                this.overlays.splice(i, 1);
                break;
            }
        }
    };
    _SMap.prototype.clearOverlays = function(key) {
        var g7 = new Array();
        var cnt = 0;
        for ( var i = 0; this.overlays && i < this.overlays.length; i++) {
            if (!(key && key != this.overlays[i][1])) {
                this.overlays[i][0].SMark.unload();
                this.overlays[i] = null;
            } else {
                g7[cnt] = this.overlays[i];
                cnt++;
            }
        }
        this.overlays = g7;
    };
    _SMap.prototype.clearOverlay = _SMap.prototype.clearOverlays;
    _SMap.prototype.addControler = function(_obj) {
        this.controls.push(_obj);
        _obj.init(this);
        _obj.redraw(this);
    };
    _SMap.prototype.removeControl = function(_obj) {
        for ( var i = 0; i < this.controls.length; i++) {
            if (_obj == this.controls[i]) {
                _obj.unload();
                this.controls.splice(i, 1);
                break;
            }
        }
    };
    _SMap.prototype.markShift = function(_obj) {
        var MarksPos = new Array();
        var xx;
        var yy;
        for ( var i = 0; i < this.marks.length; i++) {
            MarksPos[i] = this.marks[i].getPos();
            for ( var j = 0; j < i; j++) {
                xx = (MarksPos[j].x - MarksPos[i].x)
                        * (MarksPos[j].x - MarksPos[i].x);
                yy = (MarksPos[j].y - MarksPos[i].y)
                        * (MarksPos[j].y - MarksPos[i].y);
                if ((xx < 3) && (yy < 3)) {
                    MarksPos[i].add(2, 2);
                }
            }
            if (_obj == this.marks[i]) {
                return MarksPos[i];
            }
        }
    };
    _SMap.prototype.addMark = function(_obj) {
        this.marks.push(_obj);
    };
    _SMap.prototype.removeMark = function(_obj) {
        for ( var i = 0; i < this.marks.length; i++) {
            if (this.marks[i] == _obj) {
                this.marks.splice(i, 1);
                break;
            }
        }
    };
    _SMap.prototype.linkInfoWin = function(infowin) {
        this.removeOverlay(this.infowin);
        this.infowin = infowin;
        this.addOverlay2(this.infowin);
    };
    _SMap.prototype.setInfoWin = function(point, content) {
        this.infowin.set(point, content);
    };
    _SMap.prototype.showInfoWin = function() {
        this.infowin.showWindow();
    };
    _SMap.prototype.hideInfoWin = function(delay) {
        if (delay) {
            this.infowin.delayHideWindow(delay);
        } else {
            this.infowin.hideWindow();
        }
    };
    _SMap.prototype.setI18N = function(_i18N) {
        this.spec.mapAreaExternalInfo.setAreaCode(_i18N);
        this.setCenter(this.getCenter());
    };

    _SMap.prototype.getI18N = function() {
        return this.spec.mapAreaExternalInfo.getAreaCode();
    };

    function _Flash() {
    };
    _Flash.getFlash = function(src, name, width, height) {
        var obj;
        if (enum_BrowserType.IE) {
            obj = document.createElement('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/pvc8/swflash.cab#version=7,0,0,0" width="'
                            + width
                            + '" height="'
                            + height
                            + '" align="middle"/>');
            obj.id = name;
            obj.appendChild(document.createElement('<param NAME="allowScriptAccess" value="always" />'));
            obj.appendChild(document.createElement('<param NAME="quality" VALUE="high" />'));
            obj.appendChild(document.createElement('<param NAME="bgcolor" VALUE="#ffffff" />'));
            obj.appendChild(document.createElement('<param NAME="wmode" VALUE="transparent" />'));
            obj.appendChild(document.createElement('<param NAME="movie" VALUE="' + src + '" />'));
        } else {
            obj = document.createElement('embed');
            obj.setAttribute("name", name);
            obj.setAttribute("src", src);
            obj.setAttribute("width", width);
            obj.setAttribute("height", height);
            obj.setAttribute("align", "middle");
            obj.pluginspage = "http://www.macromedia.com/go/getflashplayer";
            obj.setAttribute("swLiveConnect", true);
            obj.setAttribute("quality", "high");
            obj.setAttribute("bgcolor", "#ffffff");
            obj.setAttribute("wmode", "transparent");
            obj.setAttribute("allowScriptAccess", "always");
            obj.setAttribute("TYPE", "application/x-shockwave-flash");
        }

        return obj;
    };
    _Flash.getFlashMovieObject = function(movieName) {
        if (window.document[movieName]) {
            return window.document[movieName];
        } else if (enum_BrowserType.IE) {
            return document.getElementById(movieName);
        } else {
            if (document.embeds && document.embeds[movieName])
                return document.embeds[movieName];
        }
    };

    function _Image() {
    };
    _Image.f3 = ResourceUrl + 'img/mapbg.png';
    _Image.lmw7 = function(width, height, left, top, zIndex, parent, parentDiv) {
        var n;
        if (parentDiv) {
            n = parentDiv.createElement("div");
        } else {
            n = document.createElement("div");
        }
        if (parent) {
            parent.appendChild(n);
        }
        n.style.position = "absolute";
        n.oncontextmenu = falseFunc;
        if (!zIndex)
            zIndex = 0;
        n.style.zIndex = zIndex;
        if (isDefined(width)) {
            n.style.width = width + 'px';
            n.width = width;
        }
        if (isDefined(height)) {
            n.style.height = height + 'px';
            n.height = height;
        }
        if (isDefined(left)) {
            n.style.left = left + 'px';
        }
        if (isDefined(top)) {
            n.style.top = top + 'px';
        }
        return n;
    };
    _Image.fro7 = function(src, width, height, left, top, zIndex, parent,
            parentDiv) {
        if (enum_BrowserType.IE) {
            var n = _Image.lmw7(width, height, left, top, zIndex, parent,
                    parentDiv);
            n.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
                    + src + "',sizingMethod='image')";
        } else {
            var n = _Image.create(src, width, height, left, top, zIndex,
                    parent, parentDiv);
        }
        return n;
    };
    _Image.create = function(src, width, height, left, top, zIndex, parent,
            parentDiv) {
        var n;
        if (parentDiv) {
            n = parentDiv.createElement("img");
        } else {
            n = document.createElement("img");
        }
        if (parent) {
            parent.appendChild(n);
        }
        n.style.position = "absolute";
        if (enum_BrowserType.IE) {
            n.galleryImg = "no";
            n.unselectable = "on";
            n.onselectstart = falseFunc;
        } else {
            n.style.MozUserSelect = "none";
        }
        n.oncontextmenu = falseFunc;
        if (!zIndex)
            zIndex = 0;
        n.style.zIndex = zIndex;
        if (src)
            n.src = src;
        else
            n.src = _Image.f3;
        if (isDefined(width)) {
            n.style.width = width + 'px';
            n.width = width;
        }
        if (isDefined(height)) {
            n.style.height = height + 'px';
            n.height = height;
        }
        if (isDefined(left)) {
            n.style.left = left + 'px';
        }
        if (isDefined(top)) {
            n.style.top = top + 'px';
        }
        return n;
    };
    function _staticOverlay(size, pos) {
        this.align = "left";
        this.valign = "top";
        this.map = null;
        this.mainLayer = null;
        this.content = null;
        this.opacity = 1;
        this.zIndex = 0;
        if (size) {
            this.setSize(size);
        } else {
            this.size = new _Size(0, 0);
        }
        if (pos) {
            this.setPos(pos);
        } else {
            this.pos = new _SPoint(0, 0);
        }
    }
    _staticOverlay.prototype.init = function(map) {
        this.map = map;
        this.mainLayer = this.map.mkDiv(0);
        setCursor(this.mainLayer, 'default');
        this.map.staticLayer.appendChild(this.mainLayer);
        this.mainLayer.style.overflow = 'hidden';
        SEvent.bind(this.map, "redraw", this, this.redraw);
        SEvent.bind(this.map, "unload", this, this.unload);
        SEvent.attachDom(this.mainLayer, "contextmenu", this, this.contextmenu);
    };
    _staticOverlay.prototype.enableEventBubble = function(eventName) {
        SEvent.detachEvent(this.mainLayer, eventName, SEvent.stopEvent);
    };
    _staticOverlay.prototype.disableEventBubble = function(eventName) {
        SEvent.attachEvent(this.mainLayer, eventName, SEvent.stopEvent);
    };
    _staticOverlay.prototype.mousedown = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "mousedown");
        eventOverlap(a);
    };
    _staticOverlay.prototype.mouseUp = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "mouseup");
    };
    _staticOverlay.prototype.click = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "click");
        SEvent.stopEvent(a);
    };
    _staticOverlay.prototype.contextmenu = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "contextmenu");
        eventOverlap(a);
    };
    _staticOverlay.prototype.dblclick = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "dblclick");
        eventOverlap(a);
    };
    _staticOverlay.prototype.unload = function() {
        this.map.staticLayer.removeChild(this.mainLayer);
        this.mainLayer = null;
        this.map = null;
    };
    _staticOverlay.prototype.setSize = function(size) {
        this.size = size;
        if (this.mainLayer != null) {
            this.mainLayer.style.width = size.width+ 'px';
            this.mainLayer.style.height = size.height+ 'px';
        }
        this.redraw();
    };
    _staticOverlay.prototype.setPos = function(pos) {
        this.pos = pos;
        this.redraw();
    };
    _staticOverlay.prototype.setZIndex = function(index) {
        this.zIndex = index;
        this.redraw();
    };
    _staticOverlay.prototype.setOpacity = function(opacity) {
        this.opacity = opacity;
        this.redraw();
    };
    _staticOverlay.prototype.setAlign = function(align) {
        this.align = align;
        this.redraw();
    };
    _staticOverlay.prototype.setValign = function(valign) {
        this.valign = valign;
        this.redraw();
    };
    _staticOverlay.prototype.setContent = function(content) {
        if (this.mainLayer) {
            this.mainLayer.innerHTML = content;
        }
    };
    _staticOverlay.prototype.appendChild = function(dom) {
        this.mainLayer.appendChild(dom);
    };
    _staticOverlay.prototype.removeChild = function(dom) {
        this.mainLayer.removeChild(dom);
    };
    _staticOverlay.prototype.redraw = function() {
        if (this.map == null) {
            return;
        }
        var pos = this.getPos();
        if (this.opacity != 1) {
            this.mainLayer.style.opacity = this.opacity;
            this.mainLayer.style.filter = 'alpha(opacity = ' + (this.opacity * 100) + ')';
        }
        this.mainLayer.style.left = pos.x + 'px';
        this.mainLayer.style.top = pos.y + 'px';
        this.mainLayer.style.width = this.size.width + 'px';
        this.mainLayer.style.height = this.size.height + 'px';
        this.mainLayer.style.zIndex = this.zIndex;
    };
    _staticOverlay.prototype.show = function() {
        if (this.mainLayer == null) {
            return;
        }
        this.mainLayer.style.display = '';
    };
    _staticOverlay.prototype.hide = function() {
        if (this.mainLayer == null) {
            return;
        }
        this.mainLayer.style.display = 'none';
    };
    _staticOverlay.prototype.getPos = function() {
        var left, top;
        var boundary = this.map.getBoundOffset();
        switch (this.align) {
        case "left":
            left = this.pos.x + boundary[0];
            break;
        case "center":
            left = Math
                    .round((this.pos.x
                            + (this.map.viewSize.width - boundary[0] - boundary[2]) - this.size.width) / 2)
                    + boundary[0];
            break;
        case "right":
            left = this.map.viewSize.width - this.size.width - this.pos.x
                    - boundary[2];
            break;
        }
        switch (this.valign) {
        case "top":
            top = this.pos.y + boundary[1];
            break;
        case "center":
            top = Math
                    .round((this.pos.y
                            + (this.map.viewSize.height - boundary[1] - boundary[3]) - this.size.height) / 2)
                    + boundary[1];
            break;
        case "bottom":
            top = this.map.viewSize.height - this.size.height - this.pos.y
                    - boundary[3];
            break;
        }
        return new _SPoint(left, top);
    };
    function _nScale() {
        this.setAlign("left");
        this.setValign("bottom");
        this.scale = null;
    }
    ;
    _nScale.prototype = new _staticOverlay(new _Size(96, 16), new _SPoint(75, 5));
    _nScale.prototype.init = function(map) {
        _staticOverlay.prototype.init.call(this, map);
        var mark = _Image.create("img/bg_SMapscale.gif", 96, 11, 0, 5, 0);
        this.appendChild(mark);
        this.scaleLayer = this.map.mkDiv(0);
        this.scaleLayer.style.width = '42px';
        this.scaleLayer.style.ixrb4 = '0 0 0 4px';
        this.scaleLayer.style.padding = '0';
        this.scaleLayer.style.color = '#000';
        this.scaleLayer.style.font = '9px verdana';
        this.scaleLayer.style.textAlign = 'center';
        this.scaleLayer.style.letterSpacing = '-1px';
        this.scale = this.scaleLayer.innerText;
        this.calc(map.getZoom());
        this.appendChild(this.scaleLayer);
        SEvent.bind(this.map, "zoom", this, this.calc);
    };
    _nScale.prototype.calc = function(lv) {
        var scale = (Math.pow(2, (lv - 1)) * 48);
        if (scale > 1000) {
            scale = (Math.round(scale / 10) / 100) + 'km';
        } else {
            scale = scale + 'm';
        }
        this.scaleLayer.innerHTML = scale;
    };
    _nScale.prototype.unload = function() {
        _staticOverlay.prototype.unload.call(this);
        this.scaleLayer = null;
    };

    function _zoomcontrol() {
        this.setAlign("right");
        this.setValign("top");
    };
    _zoomcontrol.prototype = new _staticOverlay(new _Size(40, 191), new _SPoint(20, 7));
    _zoomcontrol.prototype.init = function(map) {
        _staticOverlay.prototype.init.call(this, map);
        this.setZIndex(1);

        this.zoomInner = this.map.mkDiv(0);
        this.zoomInner.style.width   = "22px";
        this.zoomInner.style.height  = "20px";
        this.zoomInner.style.left    = "17px";
        this.zoomInner.style.top     = "0px";
        this.appendChild(this.zoomInner);

        this.zoomOuter = this.map.mkDiv(0);
        this.zoomOuter.style.width = "22px";
        this.zoomOuter.style.height = "20px";
        this.zoomOuter.style.left = "17px";
        this.zoomOuter.style.top = "171px";
        this.appendChild(this.zoomOuter);

        this.zoomPannel = this.map.mkDiv(0);
        this.zoomPannel.style.width = "6px";
        this.zoomPannel.style.height = "151px";
        this.zoomPannel.style.left = "25px";
        this.zoomPannel.style.top = "20px";

        this.appendChild(this.zoomPannel);
        this.zoomPannel.style.backgroundImage = 'url(' + ResourceUrl + 'img/zoom/zoom_bg.png)';

        this.zoomPannelBar = this.map.mkDiv(0);
        this.zoomPannelBar.style.width = "22px";
        this.zoomPannelBar.style.height = "15px";
        this.zoomPannelBar.style.left = "17px";
        this.zoomPannelBar.style.top = "0px";
        this.zoomPannel.appendChild(this.zoomPannelBar);

        this.zoomGuideBar = this.map.mkDiv(99);
        this.zoomGuideBar.style.width = "25px";
        this.zoomGuideBar.style.height = "115px";
        this.zoomGuideBar.style.left = "0px";
        this.zoomGuideBar.style.top = "51px";
        this.zoomGuideBar.style.display = "none";
        this.appendChild(this.zoomGuideBar);

        this.arr_guide = new Array();

        if (this.map.getI18N()=="ko"){
            this.arr_guide[0] = _Image.create(ResourceUrl + 'img/zoom/distance.png', 25, 13, 0, 1, 0);
            this.arr_guide[1] = _Image.create(ResourceUrl + 'img/zoom/dong.png', 25, 13, 0, 23, 0);
            this.arr_guide[2] = _Image.create(ResourceUrl + 'img/zoom/gu.png', 25, 13, 0, 55, 0);
            this.arr_guide[3] = _Image.create(ResourceUrl + 'img/zoom/si.png', 25, 13, 0, 77, 0);
            this.arr_guide[4] = _Image.create(ResourceUrl + 'img/zoom/nation.png', 25, 13, 0, 98, 0);
        }
        else{
            this.arr_guide[0] = _Image.create(ResourceUrl + 'img/zoom/distance_eng.png', 25, 13, 0, 1, 0);
            this.arr_guide[1] = _Image.create(ResourceUrl + 'img/zoom/dong_eng.png', 25, 13, 0, 23, 0);
            this.arr_guide[2] = _Image.create(ResourceUrl + 'img/zoom/gu_eng.png', 25, 13, 0, 55, 0);
            this.arr_guide[3] = _Image.create(ResourceUrl + 'img/zoom/si_eng.png', 25, 13, 0, 77, 0);
            this.arr_guide[4] = _Image.create(ResourceUrl + 'img/zoom/nation_eng.png', 25, 13, 0, 98, 0);
        }


        for ( var i = 0; i < 5; i++) {
            this.zoomGuideBar.appendChild(this.arr_guide[i]);
        }

        this.bar = _Image.create(ResourceUrl + 'img/zoom/upover.png', 22, 15, 17, 40, 0);
        this.appendChild(this.bar);

        var zoomLevelPoint = 0;
        this.arr_g = new Array(this.map.spec.maxLevel+2);
        this.arr_g[zoomLevelPoint] = _Image.create(ResourceUrl + 'img/zoom/zoom_bg_top.png', 6, 15, 0, 0, 0);
        for (zoomLevelPoint++; zoomLevelPoint < this.map.spec.maxLevel; zoomLevelPoint++) {
            this.arr_g[zoomLevelPoint] = _Image.create(ResourceUrl + 'img/zoom/zoom_bg_divide.png',
                    6, 11, 0, 15 + ((zoomLevelPoint-1) * 11), 0);
        }
        this.arr_g[zoomLevelPoint] = _Image.create(ResourceUrl + 'img/zoom/zoom_bg_bottom.png',
                6, 15, 0, 15 + ((zoomLevelPoint-1) * 11), 0);

        for (var i=0; i<=this.map.spec.maxLevel; i++) {
            this.zoomPannel.appendChild(this.arr_g[i]);
        }

        setCursor(this.zoomPannel, "pointer");
        setCursor(this.bar, "pointer");

        this.btnPlus = _Image.create(ResourceUrl + 'img/zoom/up_btn.png', 22, 20, 0, 0, 0);
        setCursor(this.btnPlus, "pointer");
        this.zoomInner.appendChild(this.btnPlus);

        this.btnMinus = _Image.create(ResourceUrl + 'img/zoom/down_btn.png', 22, 20 , 0, 0, 0);
        setCursor(this.btnMinus, "pointer");
        this.zoomOuter.appendChild(this.btnMinus);

        this.startAdapter = SEvent.createAdapter(this, this.start);
        this.moveAdapter = SEvent.createAdapter(this, this.move);
        this.endAdapter = SEvent.createAdapter(this, this.end);

        this.setZoomBar(this.map.getZoom());

        SEvent.attachDom(this.btnPlus, "click", this, this.zoomIn);
        SEvent.attachDom(this.btnMinus, "click", this, this.zoomOut);

        SEvent.attachDom(this.btnPlus, "mouseover", this, this.zoomInMouseOver);
        SEvent.attachDom(this.btnMinus, "mouseover", this, this.zoomOutMouseOver);

        SEvent.attachDom(this.btnPlus, "mouseout", this, this.zoomInEnd);
        SEvent.attachDom(this.btnMinus, "mouseout", this, this.zoomOutEnd);

        SEvent.attachEvent(this.bar, "mousedown", this.startAdapter);

        SEvent.bind(this.map, "redraw", this, this.redraw);
        SEvent.bind(this.map, "zoom", this, this.setZoomBar);

        SEvent.attachDom(this.zoomPannel, "mouseover", this, this.zoomPannelMouseOver);
        SEvent.attachDom(this.zoomPannel, "mouseout", this, this.zoomPannelMouseOut);
        SEvent.attachDom(this.bar, "mouseover", this, this.zoomPannelMouseOver);
        SEvent.attachDom(this.bar, "mouseout", this, this.zoomPannelMouseOut);

        SEvent.attachDom(this.arr_g[0], "click", this, this.zoomClick1);
        SEvent.attachDom(this.arr_g[1], "click", this, this.zoomClick2);
        SEvent.attachDom(this.arr_g[2], "click", this, this.zoomClick3);
        SEvent.attachDom(this.arr_g[3], "click", this, this.zoomClick4);
        SEvent.attachDom(this.arr_g[4], "click", this, this.zoomClick5);
        SEvent.attachDom(this.arr_g[5], "click", this, this.zoomClick6);
        SEvent.attachDom(this.arr_g[6], "click", this, this.zoomClick7);
        SEvent.attachDom(this.arr_g[7], "click", this, this.zoomClick8);
        SEvent.attachDom(this.arr_g[8], "click", this, this.zoomClick9);
        SEvent.attachDom(this.arr_g[9], "click", this, this.zoomClick10);
        SEvent.attachDom(this.arr_g[10], "click", this, this.zoomClick11);
        SEvent.attachDom(this.arr_g[11], "click", this, this.zoomClick12);
        SEvent.attachDom(this.arr_g[12], "click", this, this.zoomClick12);

        this.setZoomBar(this.map.getZoom());
    };
   _zoomcontrol.prototype.zoomClick1 = function() {
        this.map.setZoom(1);
    };
    _zoomcontrol.prototype.zoomClick2 = function() {
        this.map.setZoom(2);
    };
    _zoomcontrol.prototype.zoomClick3 = function() {
        this.map.setZoom(3);
    };
    _zoomcontrol.prototype.zoomClick4 = function() {
        this.map.setZoom(4);
    };
    _zoomcontrol.prototype.zoomClick5 = function() {
        this.map.setZoom(5);
    };
    _zoomcontrol.prototype.zoomClick6 = function() {
        this.map.setZoom(6);
    };
    _zoomcontrol.prototype.zoomClick7 = function() {
        this.map.setZoom(7);
    };
    _zoomcontrol.prototype.zoomClick8 = function() {
        this.map.setZoom(8);
    };
    _zoomcontrol.prototype.zoomClick9 = function() {
        this.map.setZoom(9);
    };
    _zoomcontrol.prototype.zoomClick10 = function() {
        this.map.setZoom(10);
    };
    _zoomcontrol.prototype.zoomClick11 = function() {
        this.map.setZoom(11);
    };
    _zoomcontrol.prototype.zoomClick12 = function() {
        this.map.setZoom(12);
    };

    _zoomcontrol.prototype.zoomIn = function() {
        this.map.zoomIn();
    };
    _zoomcontrol.prototype.zoomInEnd = function() {
        this.btnPlus.src =ResourceUrl + 'img/zoom/up_btn.png';
        this.zoomPannelMouseOut();
    };
    _zoomcontrol.prototype.zoomOutEnd = function() {
        this.btnMinus.src =ResourceUrl + 'img/zoom/down_btn.png';
        this.zoomPannelMouseOut();
    };
    _zoomcontrol.prototype.zoomOut = function() {
        this.map.zoomOut();
    };
     _zoomcontrol.prototype.zoomOutMouseOver = function() {
        this.btnMinus.src =ResourceUrl + 'img/zoom/down_btn_p.png';
        this.zoomPannelMouseOver();
    };
    _zoomcontrol.prototype.zoomInMouseOver = function() {
        this.btnPlus.src =ResourceUrl + 'img/zoom/up_btn_p.png';
        this.zoomPannelMouseOver();
    };
    _zoomcontrol.prototype.start = function(e) {
        if(this.moveflag) return;
        this.moveFlag = true;


        var evt = e || window.event;

        this.bar_c_y = evt.clientY;
        this.bar_s_y = evt.screenY;

        this.bar_top = parseInt(this.bar.style.top);

        if(isNaN(window.scrollX))
            this.cursorStartPos = e.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        else
            this.cursorStartPos = e.clientY + window.scrollY;

        this.pannel_top = parseInt(this.bar.style.top);

        SEvent.attachEvent(document, "mousemove", this.moveAdapter);
        SEvent.attachEvent(document, "mouseup", this.endAdapter);

        cancelEvent(e);
    };
     _zoomcontrol.prototype.move = function(e) {


        if(!this.moveFlag) return;

        var event = e || window.event;
        var newPos = 0;

        if(isNaN(window.scrollX))
            newPos = e.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        else
            newPos = e.clientY + window.scrollY;

        newPos += this.pannel_top;
        newPos -= this.cursorStartPos;

        if (newPos < 25) {
            newPos = 25;
        }
         if (newPos > 150) {
            newPos = 150;
        }

        this.bar.style.top = newPos + 'px';
        cancelEvent(e)
    };
    _zoomcontrol.prototype.end = function() {
        if(!this.moveFlag) return;

        SEvent.detachEvent(document, "mousemove", this.moveAdapter);
        SEvent.detachEvent(document, "mouseup", this.endAdapter);

        var yPos = parseInt(this.bar.style.top);
        var yMoveLevel = Math.floor((yPos-14)/11);

        if(yMoveLevel<this.map.minlevel)
            yMoveLevel = this.map.minlevel;
        else if(yMoveLevel>this.map.maxlevel)
            yMoveLevel = this.map.maxlevel;

        this.map.setZoom(yMoveLevel);
        this.setZoomBar(yMoveLevel);

        if (document.releaseCapture) {
            document.releaseCapture();
        }

        this.moveflag=false;
    };
    _zoomcontrol.prototype.setZoomBar = function(lv){

        if (!this.arr_g) return;

        for ( var i = 1; i < this.map.spec.maxLevel; i++){
          if (lv > i)
              this.arr_g[i].src = ResourceUrl + 'img/zoom/zoom_bg_divide.png';
          else
              this.arr_g[i].src = ResourceUrl + 'img/zoom/zoom_bg_divide_p.png'
        }

        var pos = (lv - 1) * 11;
        this.bar.style.top = 28 + pos + 'px';
    };
    _zoomcontrol.prototype.unload = function() {
        this.removeChild(this.bar);
        this.bar = null;
        _staticOverlay.prototype.unload.call(this);
    };
    _zoomcontrol.prototype.zoomPannelMouseOver = function(){
        this.zoomGuideBar.style.display = "";
    };

    _zoomcontrol.prototype.zoomPannelMouseOut = function(){
        this.zoomGuideBar.style.display = "none";
    };
    _zoomcontrol.prototype.click = function(i) {
        alert(i);
    };


    function _mousePointerPos() {
        this.setAlign("left");
        this.setValign("top");
    };
    _mousePointerPos.prototype = new _staticOverlay(new _Size(130, 150), new _SPoint(300,300));
    _mousePointerPos.prototype.init = function(map) {
        SCommon.SMousePos = this;
        _staticOverlay.prototype.init.call(this, map);

        this.mousePointerPos = this.map.mkDiv(0);
        this.appendChild(this.mousePointerPos);


        this.mousePointerPos.style.position = 'relative';
        this.mousePointerPos.id = 'mousePoiner';
        this.mousePointerPos.style.left = '10px';
        this.mousePointerPos.style.top = '10px';
        this.mousePointerPos.style.display = "";
        this.mousePointerPos.style.backgroundColor = '#ffffff';
        this.mousePointerPos.style.width = "120px";
        this.mousePointerPos.style.height = "29px";
        this.mousePointerPos.style.border="1 solid #999999";
        this.mousePointerPos.zIndex = 0;

        this.font = document.createElement('font');
        this.mousePointerPos.appendChild(this.font);
        this.font.size = 1;
        this.font.face = '굴림';

        this.text = document.createElement('text');
        this.font.appendChild(this.text);
        this.refresh(SCommon.SMapEle.getCenter());

        this.setEventText = '';
    };
    _mousePointerPos.prototype.refresh = function(a)
    {
        if (!a)
            a = window.event;

        if (a!=null){
            var wgs84 = TMtoWGS84(a.x, a.y);
            var coordi = '<font size="1" face="굴림">'+ wgs84.x+' ,<br> '+wgs84.y+'<br>' +
                        a.x+' ,<br> '+a.y+ '</font><br>'+ this.setEventText;
        }

        var center_p = SCommon.SMapEle.getCenter();
        this.text.innerHTML = coordi;
    };

    function _dynamicOverlay(point, size) {
        this.hideTimeout = null;
        this.map = null;
        this.mainLayer = null;
        this.opacity = 1;
        this.zIndex = 0;
        this.show = true;
        this.ixrb4 = 0;
        this.content = '';
        this.point = (isDefined(point)) ? point : null;
        this.size = (isDefined(size)) ? size : null;
        this.bound = null;
        this.parent = null;
    };
    _dynamicOverlay.prototype.init = function(map, parent) {
        this.map = map;
        this.mainLayer = this.map.mkDiv(0);
        this.mainLayer.style.padding = this.ixrb4 + 'px ' + this.ixrb4 + 'px '
                + this.ixrb4 + 'px ' + this.ixrb4 + 'px ';
        this.mainLayer.oncontextmenu = falseFunc;
        this.mainLayer.onselectstart = falseFunc;
        this.mainLayer.ondragstart = falseFunc;
        if (isDefined(parent)) {
            this.parent = parent;
        } else {
            this.parent = this.map.infoLayer;
        }
        this.parent.appendChild(this.mainLayer);
        this.show = true;
        this.redrawCallback = SEvent
                .bind(this.map, "redraw", this, this.redraw);
        SEvent.bind(this.map, "unload", this, this.unload);
        SEvent.bind(this.map, "zoom", this, this.calcSize);
        SEvent.attachDom(this.mainLayer, "mousedown", this, this.mousedown);
        SEvent.attachDom(this.mainLayer, "mouseup", this, this.mouseUp);
        SEvent.attachDom(this.mainLayer, "mouseover", this, this.mouseover);
        SEvent.attachDom(this.mainLayer, "mouseout", this, this.mouseout);
        SEvent.attachDom(this.mainLayer, "click", this, this.click);
    };
    _dynamicOverlay.prototype.mousedown = function(a) {
        if (!a)
            a = window.event;
        //this.mapClickFlag = true;
        SEvent.trigger(this, "mousedown");
    };
    _dynamicOverlay.prototype.mouseUp = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "mouseup");
    };
    _dynamicOverlay.prototype.mouseover = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "mouseover");
    };
    _dynamicOverlay.prototype.mouseout = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "mouseout");
    };
    _dynamicOverlay.prototype.click = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "click");
    };
    _dynamicOverlay.prototype.setCenter = function(point) {
        if (this.bound != null) {
            var dx = point.x - this.point.x;
            var dy = point.y - this.point.y;
            this.bound[0] += dx;
            this.bound[1] += dy;
            this.bound[2] += dx;
            this.bound[3] += dy;
        }
        this.point = point;
        this.redraw();
    };
    _dynamicOverlay.prototype.setSize = function(size) {
        this.bound = null;
        this.size = size;
        this.redraw();
    };
    _dynamicOverlay.prototype.setBound = function(bound) {
        this.bound = bound;
        this.size = null;
        this.point = new _SPoint(Math.round((bound[0] + bound[2]) / 2), Math
                .round((bound[1] + bound[3]) / 2));
    };
    _dynamicOverlay.prototype.setContent = function(content) {
        this.content = content;
        this.redraw();
    };
    _dynamicOverlay.prototype.setOpacity = function(opacity) {
        this.opacity = opacity;
        this.redraw();
    };
    _dynamicOverlay.prototype.getPos = function() {
        return this.map.getPos(this.map.spec.point2pixel(this.point,
                this.map.mapLevel));
    };
    _dynamicOverlay.prototype.draw = function(left, top, width, height) {
        this.mainLayer.style.width = width + "px";
        this.mainLayer.style.height = height + "px";
        this.mainLayer.style.left = left + "px";
        this.mainLayer.style.top = top + "px";
        this.mainLayer.innerHTML = this.content;
        this.mainLayer.style.opacity = this.opacity;
        this.mainLayer.style.filter = 'alpha(opacity = ' + (this.opacity * 100) + ')';
    };
    _dynamicOverlay.prototype.redraw = function() {
        if (this.map == null) {
            return;
        }
        if (this.bound != null) {
            var left = this.bound[0];
            var top = this.bound[1];
            var right = this.bound[2];
            var bottom = this.bound[3];
            var pixel1 = this.map.getPos(this.map.spec.point2pixel(new _SPoint(
                    left, top), this.map.mapLevel));
            var pixel2 = this.map.getPos(this.map.spec.point2pixel(new _SPoint(
                    right, bottom), this.map.mapLevel));
            this.draw(pixel1.x, pixel1.y, (pixel2.x - pixel1.x),
                    (pixel2.y - pixel1.y));
        } else if (this.size != null) {
            var px = this.getPos();
            this.draw((px.x - Math.round(this.size.width / 2)), (px.y - Math
                    .round(this.size.height / 2)), this.size.width,
                    this.size.height);
        } else {
            return;
        }
    };
    _dynamicOverlay.prototype.showWindow = function() {
        if (this.hideTimeout != null) {
            window.clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        if (!this.show) {
            this.show = true;
            SEvent.addListenerPool(this.map, "redraw", this.redrawCallback);
            this.mainLayer.style.display = '';
            this.redraw();
        }
    };
    _dynamicOverlay.prototype.hideWindow = function() {
        if (this.show) {
            this.show = false;
            SEvent.removeListener(this.map, "redraw", this.redrawCallback);
            this.mainLayer.style.display = 'none';
        }
    };
    _dynamicOverlay.prototype.delayHideWindow = function(yo5) {
        if (!yo5) {
            yo5 = 500;
        }
        if (this.hideTimeout != null) {
            window.clearTimeout(this.hideTimeout);
        }
        this.hideTimeout = getTimeout(this, function() {
            this.hideWindow()
        }, yo5);
    };
    _dynamicOverlay.prototype.unload = function() {
        this.hideWindow();
        this.mainLayer.innerHTML = '';
        this.parent.removeChild(this.mainLayer);
        this.parent = null;
        this.mainLayer = null;
        this.pos = null;
        this.redrawCallback = null;
        this.map = null;
    };
    function _shapeObject() {
        this.lineWeight = 1;
        this.lineColor = 'red';
        this.fillColor = null;
    };

    _shapeObject.prototype = new _dynamicOverlay();
    _shapeObject.prototype.setLineWeight = function(Weight) {
        this.lineWeight = Weight;
        this.redraw();
    };
    _shapeObject.prototype.setLineColor = function(color) {
        this.lineColor = color;
        this.redraw();
    };
    _shapeObject.prototype.setFillColor = function(color) {
        this.fillColor = color;
        this.redraw();
    };


    function _SCircle(opt){
        this.point = opt._point;
        this.size = opt._size;
    };
    function _rectangle(point, size) {
        this.point = point;
        this.size = size;
    };
    _rectangle.prototype = new _shapeObject();
    _rectangle.prototype.init = function(map, parent) {
        _shapeObject.prototype.init.call(this, map, parent);
        this.innerLayer = this.map.mkDiv(0);
        this.innerLayer.style.overflow = "hidden";
        this.mainLayer.appendChild(this.innerLayer);
    };
    _rectangle.prototype.draw = function(left, top, width, height) {
        if (enum_BrowserType.IE) {
            this.mainLayer.style.width = (width + this.lineWeight) + "px";
            this.mainLayer.style.height = (height + this.lineWeight) + "px";
            this.mainLayer.style.left = (left - this.lineWeight / 2) + "px";
            this.mainLayer.style.top = (top - this.lineWeight / 2) + "px";
        } else {
            this.mainLayer.style.width = (width - this.lineWeight) + "px";
            this.mainLayer.style.height = (height - this.lineWeight) + "px";
            this.mainLayer.style.left = (left - this.lineWeight / 2) + "px";
            this.mainLayer.style.top = (top - this.lineWeight / 2) + "px";
        }
        if (isDefined(this.fillColor) && (width - this.lineWeight) > 0
                && (height - this.lineWeight) > 0) {
            this.innerLayer.style.width = (width - this.lineWeight) + "px";
            this.innerLayer.style.height = (height - this.lineWeight) + "px";
            this.innerLayer.style.backgroundColor = this.fillColor;
            this.innerLayer.style.opacity = this.opacity;
            this.innerLayer.style.filter = 'alpha(opacity = ' + (this.opacity * 100) + ')';
        } else {
            this.mainLayer.style.opacity = this.opacity;
            this.mainLayer.style.filter = 'alpha(opacity = ' + (this.opacity * 100) + ')';
        }
        this.mainLayer.style.border = this.lineWeight + 'px ' + this.lineColor
                + ' solid';
    };
    function _circle(point, size) {
        this.point = point;
        this.size = new _Size(size, size);
        this.f0 = null;
    };
    _circle.prototype = new _shapeObject();
    _circle.prototype.init = function(map, parent) {
        _shapeObject.prototype.init.call(this, map, parent);
    };
    _circle.prototype.draw = function(left, top, width, height) {
        this.mainLayer.style.width = width + "px";
        this.mainLayer.style.height = height + "px";
        this.mainLayer.style.left = left + "px";
        this.mainLayer.style.top = top + "px";
        if (enum_BrowserType.IE) {
            this.drawIE(width, height);
        } else {
            this.drawFF(width, height);
        }
    };
    _circle.prototype.drawIE = function(width, height) {
        if (this.f0 == null) {
            this.f0 = document.createElement("oval");
            this.f0.style.position = "absolute";
            this.mainLayer.appendChild(this.f0);
            this.f0.unselectable = "on";
            this.f0.filled = "False";
            this.f0.style.behavior = 'url(#default#VML);';
            this.a8 = document.createElement("stroke");
            this.f0.appendChild(this.a8);
            this.a8.style.behavior = 'url(#default#VML);';
        }

        if(isDefined(this.fillColor)){7
            this.f0.setAttribute('filled', 'True');
            this.f0.setAttribute('fillcolor', this.fillColor);
        }

        var size = Math.max(Math.min(width, height), 3);
        this.f0.style.left = Math.round((width - size) / 2) + 'px';
        this.f0.style.top = Math.round((height - size) / 2) + 'px';
        this.f0.style.width = (size - 3) + 'px';
        this.f0.style.height = (size - 3) + 'px';
        this.f0.strokeweight = this.lineWeight;
        this.f0.strokecolor = this.lineColor;
        this.a8.opacity = this.opacity;
    };
    _circle.prototype.drawFF = function(width, height) {
        if (this.f0 == null) {
            this.f0 = document.createElement("canvas");
            this.f0.style.position = "absolute";
            this.mainLayer.appendChild(this.f0);
        }
        if (width * height > (1200 * 1200)) {
            this.mainLayer.style.display = "none";
            return;
        }
        this.mainLayer.style.display = "";
        var size = Math.min(width, height) + this.lineWeight;
        width += this.lineWeight * 2;
        height += this.lineWeight * 2;
        this.f0.style.left = Math.round((-this.lineWeight)) + 'px';
        this.f0.style.top = Math.round((-this.lineWeight)) + 'px';
        this.f0.width = width;
        this.f0.height = height;
        var ctx;
        try {
            ctx = this.f0.getContext("2d");
        } catch (e) {
            ctx = null;
        }
        if (ctx) {
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = this.lineColor;
            ctx.lineWidth = this.lineWeight;
            ctx.scale(1, 1);
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, (size - this.lineWeight) / 2, 0,
                    Math.PI * 2, true);
            ctx.stroke();

            if(isDefined(this.fillColor)){
                ctx.fillStyle = this.fillColor;
                ctx.fill();
            }
        }
    };
    function _infowindow() {
        this.hideTimeout = null;
        this.map = null;
        this.content = '';
        this.infoDiv = null;
        this.opacity = 1;
        this.className = '';
        this.size = null;
        this.autoPosX = false;
        this.autoPosY = false;
        this.pos = new _SPoint(1, -1);
        this.currentPos = null;
        this.currentSize = null;
        this.offset = new _Size(0, 0);
        this.ixrb4 = 10;
        this.zIndex = 0;
        this.parent = null;
    };
    _infowindow.prototype.init = function(map, parent) {
        this.redrawCallback = SEvent.createCallback(this, this.redraw);
        this.map = map;
        this.infoDiv = this.map.mkDiv(0);
        if (isDefined(parent)) {
            this.parent = parent;
        } else {
            this.parent = this.map.infoLayer;
        }
        this.parent.appendChild(this.infoDiv);
        this.initWin();
        SEvent.attachDom(this.infoDiv, "mouseout", this, this.mouseout);
        SEvent.attachDom(this.infoDiv, "mouseover", this, this.mouseover);
        this.disableEventBubble("mousedown");
        SEvent.attachDom(this.infoDiv, "click", this, this.click);
        this.disableEventBubble("dblclick");
        SEvent.attachDom(this.infoDiv, "contextmenu", this, this.contextmenu);
    };
    _infowindow.prototype.enableEventBubble = function(eventName) {
        SEvent.detachEvent(this.infoDiv, eventName, SEvent.stopEvent);
    };
    _infowindow.prototype.disableEventBubble = function(eventName) {
        SEvent.attachEvent(this.infoDiv, eventName, SEvent.stopEvent);
    };
    _infowindow.prototype.setPos = function(value) {
        this.pos = value;
    };
    _infowindow.prototype.setZIndex = function(zIndex) {
        this.zIndex = zIndex;
        if (this.currentPos) {
            this.redraw();
        }
    };
    _infowindow.prototype.setAutoPosX = function(value) {
        this.autoPosX = value;
    };
    _infowindow.prototype.setAutoPosY = function(value) {
        this.autoPosY = value;
    };
    _infowindow.prototype.setOffset = function(offset) {
        this.offset = offset;
    };
    _infowindow.prototype.initWin = function() {
        this.infoDiv.style.padding = '0px 0px 0px 0px';
        this.infoDiv.style.display = "none";
        this.infoSubDiv = this.map.mkDiv(0);
        this.infoDiv.appendChild(this.infoSubDiv);
        this.infoSubDiv.style.position = 'relative';
        this.infoSubDiv.noWrap = true;
    };
    _infowindow.prototype.setOpacity = function(opacity) {
        if (this.opacity != opacity) {
            this.opacity = opacity;
            this.redraw();
        }
    };
    _infowindow.prototype.setSize = function(size) {
        this.size = size;
        if (this.currentPos) {
            this.redraw();
        }
    };
    _infowindow.prototype.setPoint = function(point) {
        this.point = point;
        if (this.currentPos) {
            this.redraw();
        }
    };
    _infowindow.prototype.setContent = function(content) {
        this.content = content;
        if (this.currentPos) {
            this.redraw();
        }
    };
    _infowindow.prototype.set = function(point, content) {
        this.point = point;
        this.content = content;
        if (this.currentPos) {
            this.redraw();
        }
    };
    _infowindow.prototype.setClassName = function(className) {
        this.className = className;
        if (this.currentPos) {
            this.currentSize = null;
            this.redraw();
        }
    };
    _infowindow.prototype.autoLoc = function() {
        var c = this.map.getPos(this.map.spec.point2pixel(this.point,
                this.map.mapLevel));
        var top, left;
        var hWidth, hHeight;
        if (this.size != null) {
            hWidth = this.size.width / 2;
            hHeight = this.size.height / 2;
        } else {
            hWidth = this.infoDiv.offsetWidth / 2;
            hHeight = this.infoDiv.offsetHeight + (this.offset.height*1.2);
        }
        var xPos, yPos;
        xPos = this.map.dragobj.offsetPos.width + c.x;
        yPos = this.map.dragobj.offsetPos.height + c.y;
        var leftPos = xPos - hWidth + hWidth * this.currentPos.x;
        var rightPos = leftPos + hWidth * 2;
        var topPos = yPos - hHeight + hHeight * this.currentPos.y;
        var bottomPos = topPos + hHeight * 2;
        var cond1 = (rightPos - (this.map.viewSize.width - this.map.boundary[2]));
        var cond2 = ((this.map.boundary[0]) - leftPos);
        var cond3 = ((this.map.boundary[1]) - topPos);
        var cond4 = (bottomPos - (this.map.viewSize.height - this.map.boundary[3]));
        if (this.autoPosX) {
            if ((this.currentPos.x == 1 && cond1 > 0 && xPos > (this.map.viewSize.width
                    - xPos + this.ixrb4))
                    || (this.currentPos.x == -1 && cond2 > 0 && (this.map.viewSize.width - xPos) > (xPos + this.ixrb4))) {
                this.currentPos.x = this.currentPos.x * (-1);
            }
        }
        if (this.autoPosY) {
            if ((this.currentPos.y == 1 && cond4 > 0 && cond4 > Math.max(cond3,
                    this.ixrb4))
                    || (this.currentPos.y == -1 && cond3 > 0 && cond3 > Math
                            .max(cond4, this.ixrb4))) {
                this.currentPos.y = this.currentPos.y * (-1);
            }
        }
        left = xPos - hWidth - 10;
        top = yPos - hHeight;

        this.infoDiv.style.left = left - this.map.dragobj.offsetPos.width + 'px';
        this.infoDiv.style.top = top - this.map.dragobj.offsetPos.height+ 'px';
    };
    _infowindow.prototype.getSizeX = function() {
       return   this.infoSubDiv.style.width;
    };
    _infowindow.prototype.getSizeY = function() {
       return   this.infoSubDiv.style.height;
    };
    _infowindow.prototype.redraw = function(recalc) {
        if (this.map == null) {
            return;
        }
        if (this.point == null) {
            return;
        }
        if (this.infoDiv.style.display == "none") {
            return;
        }

        if (this.content != null) {
            this.infoSubDiv.innerHTML = this.content;
            this.infoSubDiv.className = this.className;
            this.infoDiv.style.zIndex = this.zIndex;
            this.content = null;
            this.currentSize = null;
        }
        if ((this.currentSize == null) || (recalc == true)) {
            this.infoSubDiv.style.width = '';
            this.infoSubDiv.style.height = '';
            if (!enum_BrowserType.IE) {
                this.infoSubDiv.style.paddingLeft = '6px';
                this.infoSubDiv.style.paddingTop = '1px';
            } else {
                this.infoSubDiv.style.paddingLeft = '6px';
                this.infoSubDiv.style.paddingRight = '5px';
                this.infoSubDiv.style.paddingTop = '2px';
            }
            this.currentSize = this.map.getDomSize(this.infoSubDiv);
            this.infoSubDiv.style.width = this.currentSize.width + 'px';
            this.infoSubDiv.style.height = this.currentSize.height + 'px';
            if (!enum_BrowserType.IE) {
                this.infoDiv.style.width = this.currentSize.width + 'px';
                this.infoDiv.style.height = this.currentSize.height + 'px';
                if (this.opacity != 1) {
                    this.infoSubDiv.style.opacity = this.opacity;
                }
            } else if (this.opacity != 1) {
                this.infoDiv.style.filter = 'alpha(opacity = ' + (this.opacity * 100) + ')';
            }
        }
        if (this.size != null) {
            this.infoDiv.style.width = this.size.width+ 'px';
            this.infoDiv.style.height = this.size.height+ 'px';
            this.infoSubDiv.style.width = this.size.width+ 'px';
            this.infoSubDiv.style.height = this.size.height+ 'px';
        }
        this.autoLoc();
    };
    _infowindow.prototype.contentResize = function() {
    };
    _infowindow.prototype.pan = function(noEvt) {
        var c = this.map.getPos(this.map.spec.point2pixel(this.point,
                this.map.mapLevel));
        var xPos = this.map.dragobj.offsetPos.width + c.x;
        var yPos = this.map.dragobj.offsetPos.height + c.y - 40;
        var xPan = Math
                .min(
                        Math.max(0, 10 - xPos),
                        (this.map.viewSize.width - 10 - (xPos + this.infoDiv.clientWidth)));
        var yPan = Math.min(Math
                .max(0, 10 - (yPos - this.infoDiv.clientHeight)),
                (this.map.viewSize.height - 10 - yPos));
        this.map.pan(xPan, yPan, noEvt);
    };
    _infowindow.prototype.contextmenu = function(a) {
        if (!a)
            a = window.event;
        SEvent.trigger(this, "contextmenu");
        eventOverlap(a);
    };
    _infowindow.prototype.mouseover = function(a) {
        if (!a)
            a = window.event;
        if (a) {
            eventOverlap(a);
        }
        SEvent.trigger(this, "mouseover");
    };
    _infowindow.prototype.mouseout = function(a) {
        if (!a)
            a = window.event;
        if (a) {
            eventOverlap(a);
        }
        if (!this.infoDiv.contains(a.relatedTarget || a.toElement)) {
            SEvent.trigger(this, "mouseout");
        }
    };
    _infowindow.prototype.click = function(a) {
        if (!a)
            a = window.event;
        if (a) {
            eventOverlap(a);
        }
        SEvent.trigger(this, "click");
    };
    _infowindow.prototype.showWindow = function() {
        if (this.hideTimeout != null) {
            window.clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        if (this.currentPos != null) {
            return;
        }
        this.currentPos = this.pos.copy();
        SEvent.addListenerPool(this.map, "redraw", this.redrawCallback);
        SEvent.addListenerPool(this.map, "endDrag", this.redrawCallback);
        SEvent.addListenerPool(this.map, "zoom", this.redrawCallback);
        this.infoDiv.style.display = '';
        this.redraw();
    };
    _infowindow.prototype.hideWindow = function() {
        if (this.currentPos == null) {
            return;
        }
        this.currentPos = null;
        SEvent.removeListener(this.map, "redraw", this.redrawCallback);
        SEvent.removeListener(this.map, "endDrag", this.redrawCallback);
        SEvent.removeListener(this.map, "zoom", this.redrawCallback);
        this.infoDiv.style.display = 'none';
    };
    _infowindow.prototype.delayHideWindow = function(yo5) {
        if (!yo5) {
            yo5 = 500;
        }
        if (this.hideTimeout != null) {
            window.clearTimeout(this.hideTimeout);
        }
        this.hideTimeout = getTimeout(this, function() {
            this.hideWindow()
        }, yo5);
    };
    _infowindow.prototype.unload = function() {
        this.infoDiv.removeChild(this.infoSubDiv);
        this.infoSubDiv = null;
        this.parent.removeChild(this.infoDiv);
        this.infoDiv.innerHTML = '';
        this.infoDiv = null;
        this.parent = null;
        this.pos = null;
        this.redrawCallback = null;
        this.map = null;
    };
    function _Content(src, type, point, size, varSize, align, mouseoverLock){
        var _size;
        var _src;
        var _type;
        if(!src)
        {
            _src = ResourceUrl + 'img/point.png';
            _type = 'image';
            _size = new SSize(12, 20);
        }
        else
        {
            if(!point)
                return 0;
            if(!size)
                return 0;

            _size = size;
            _src = src;
            _type = type;
        }
        if(!varSize)
          varSize = false;
        if(!align)
          align = 'center';
        if(!mouseoverLock)
          mouseoverLock = false;

        var offset = null;
        if (align=='top')
            offset = new _SPoint(Math.round(size.width / 2), size.height);
        else if(align=='center')
            offset = new _SPoint(Math.round(size.width / 2), Math.round(size.height / 2));
        else
            offset = new _SPoint(Math.round(size.width / 2), 0);

        this.SMark = new SMark(point, new SIcon(_src, _size, type, offset));
    };
    _Content.prototype.init = function(obj){
        this.SMark.init(obj);

        if (this.SMark.isDiv){
          this.content = this.SMark.markDiv;
        }else{
          this.content = this.SMark.img;
        }
    };
    _Content.prototype.redraw = function(){
        this.SMark.redraw();
    };
    _Content.prototype.setTargetUrl = function(url){
        this.SMark.setTargeturl(url);
    };
    _Content.prototype.setDraggable = function(draggable, cbFunc, targetObject){
        this.SMark.setDraggable(draggable, cbFunc, targetObject);
    };
    _Content.prototype.unsetTargetUrl = function(){
        this.SMark.unsetTargeturl();
    };
    _Content.prototype.setInforWindow = function(_inforwindow){
        this.SMark.setInforWindow();
    };
    _Content.prototype.setInfoContent = function(_content){
        this.SMark.setContent(_content);
    };
    _Content.prototype.showInfoContent = function(){
        this.SMark.showInfoWin();
    };
    function _icon(src, size, type, offset) {
        this.src = src;
        this.size = size;
        this.type = type;
        if (offset) {
            this.offset = offset;
        } else {
            this.offset = new _SPoint(Math.round(size.width / 2), Math
                    .round(size.height / 2));
        }
        this.zIndex = 0;
    };
    _icon.prototype.getOffset = function() {
        return this.offset;
    };
    _icon.prototype.getSize = function() {
        return this.size;
    };
    _icon.prototype.createObj = function() {
        var img;
        if(this.type == 'image')
        {
            img = _Image.create(this.src, this.size.width, this.size.height, 0,0, 0);
            setCursor(img, "pointer");
            return img;
        }
        else {
            img = _Flash.getFlash(this.src, 'mark', this.size.width, this.size.height);
        }

        return img;
    };
    function _mark(point, _icon, pk) {
        this.isDiv = true;
        this.map = null;
        this.point = point;
        this._icon = _icon;
        this.pk = pk;
        this.isPropagationEvt = false;
        this.url = null;
        this.img = this._icon.createObj();
        this.yqqb3 = new _Size(1, 1);
        this.shift = false;
        this.text = null;
        this.textL = null;
        this.textS = null;
        this.style = null;
        this.label = null;
        this.parent = null;
        this.draggable = false;
        this.startPos = null;
        this.dragObj = null;
        this.prevPositon = new SPoint(0,0);
    };
    _mark.prototype.init = function(map, parent) {
        this.map = map;
        if (isDefined(parent)) {
            this.parent = parent;
        } else {
            this.parent = this.map.markLayer;
        }

        this.markDiv = this.map.mkDiv(0);
        this.markDiv.realWidth = this._icon.size.width;
        this.markDiv.realHeight = this._icon.size.height;
        this.markDiv.style.position = 'absolute';
        this.markDiv.appendChild(this.img);

        this.parent.appendChild(this.markDiv);

        SEvent.attachDom(this.markDiv, "mouseover", this, this.mouseover);
        SEvent.attachDom(this.markDiv, "mouseout", this, this.mouseout);
        SEvent.attachDom(this.markDiv, "click", this, this.click);
        SEvent.attachDom(this.markDiv, "touchstart", this, this.click);
        SEvent.bind(this.map, "unload", this, this.unload);
        this.redrawCallback = SEvent.bind(this.map, "redraw", this, this.redraw);

        this.setPoint(this.point);
    };
    _mark.prototype.setDraggable = function(drag, cbFunc, targetObject){
        this.draggable = drag;
        if (drag){
            if (!this.dragObj){
                this.dragObj = new dragObject(this.markDiv, this.markDiv, null, null, null, null, this._endDragSetPoint, null, this);
            }

            if (!this.dragObj.IsListening()) {
                this.dragObj.StartListening();
            }

            if(cbFunc!=null){
                if(!targetObject) {
                    this.dragCbFunc = cbFunc;
                }
                else{
                    this.dragCbFunc = cbFunc;
                    this.dragTargetObject = targetObject;
                }
            }
        }
        else{
            if (this.dragObj!=null){
                if (this.dragObj.IsListening()) {
                    this.dragObj.StopListening();
                }
                this.dragObj = null;
            }

            if(this.dragCbFunc!=null){
                this.dragCbFunc = null;

                if(this.dragTargetObject!=null) {
                    this.dragTargetObject = null;
                }
            }
        }
    };
    _mark.prototype._endDragSetPoint = function(element) {
        var dp = element.map.spec.distancePerPixel(element.map.mapLevel);
        var afterPosition = new SPoint(element.markDiv.offsetLeft-element.markDiv.prevLeft, element.markDiv.prevTop-element.markDiv.offsetTop);

        element.markDiv.prevLeft=element.markDiv.offsetLeft;
        element.markDiv.prevTop=element.markDiv.offsetTop;

        element.point.x = element.point.x + (afterPosition.x*dp);
        element.point.y = element.point.y + (afterPosition.y*dp);

        if (element.content != null) {
            element.hideInfoWin();
        }

        element.redraw();

        if(element.dragCbFunc!=null){
            if(!element.dragTargetObject) {
                element.dragCbFunc(new SPoint(element.point.x, element.point.y));
            }
            else{
                element.dragCbFunc.call(element.dragTargetObject, new SPoint(element.point.x, element.point.y));
            }
        }
    };
    _mark.prototype.setZindex = function(zIndex) {
        this.img.style.zIndex = zIndex;

         if (isDiv!=null){
            this.markDiv.style.zIndex = zIndex;
         }
    };
    _mark.prototype.redrawText = function(useLongText) {
        if (useLongText){
            this.text = this.textL;
        }
        else{
            this.text = this.textS;
        }
        if (this.label != null){
            this.label.setContent(this.text);
        }
    };
    _mark.prototype.setText = function(text, style, textL) {
        if (this.label != null) {
            this.label.unload();
            this.label = null;
        }
        this.text = text;
        this.textS = text;
        this.textL = textL;
        this.style = style;
        this.redraw();
    };
    _mark.prototype.getText = function() {
        return this.text;
    };
    _mark.prototype.setContent = function(content) {
        this.content = content;
    };
    _mark.prototype.setTargeturl = function(url) {
        this.url = url;

        this.img.onclick = function() {
            window.open(url, "_blank");
        };
    };
    _mark.prototype.unsetTargeturl = function() {
        this.url = null;
        this.img.onclick = null;
    };
    _mark.prototype.setPropagationEvent = function(flag) {
        this.isPropagationEvt = flag;
    };
    _mark.prototype.setPoint = function(point) {
        this.point = point;
        this.redraw();
    };
    _mark.prototype.getPk = function() {
        return this.pk;
    };
    _mark.prototype.setPk = function(p) {
        this.pk = p;
    };
    _mark.prototype.getPoint = function(point) {
        if (!point) {
            point = this.point.copy();
        } else {
            point.set(this.point.x, this.point.y);
        }
        return point;
    };
    _mark.prototype.getPos = function() {
        var c = this.map.getPos(this.map.spec.point2pixel(this.point,
                this.map.mapLevel));
        var offset = this._icon.getOffset();

        var x = c.x - offset.x;
        var y = c.y - offset.y;
        return new _SPoint(x, y);
    };
    _mark.prototype.unload = function() {
        this.hideInfoWin();
        SEvent.removeListener(this.map, "redraw", this.redrawCallback);
        if (this.label != null) {
            this.label.unload();
        }
        if (this.map && this.parent) {
            this.markDiv.removeChild(this.img);
            this.map.removeMark(this);
            this.parent = null;
        }
        this.img = null;
        this.content = null;
        this._icon = null;
        this.pk = null;
        this.url = null;
        this.yqqb3 = null;
        this.text = null;
        this.textL = null;
        this.textS = null;
        this.style = null;
        this.label = null;
        this.startPos = null;
    };
    _mark.prototype.enableShift = function() {
        this.shift = true;
        this.map.addMark(this);
        this.redraw();
    };
    _mark.prototype.disableShift = function() {
        this.shift = false;
        this.map.removeMark(this);
        this.redraw();
    };
    _mark.prototype.redraw = function(recalc) {
        var pos;
        if (!isDefined(recalc)) {
            recalc = false;
        }
        if (this.map == null) {
            return;
        }

        if (this.shift) {
            pos = this.map.markShift(this);
        } else {
            pos = this.getPos();
        }

        this.img.pos = pos;
        this.prevPositon = pos;

        this.markDiv.style.left = pos.x + 'px';
        this.markDiv.style.top = pos.y + 'px';

        this.markDiv.prevLeft = this.markDiv.offsetLeft;
        this.markDiv.prevTop = this.markDiv.offsetTop;

        if (this.markDiv!=null)
        {
            if (this.label == null) {
                this.label = new _infowindow();
                this.label.init(this.map, this.parent);
                this.label.set(this.point, this.text);
                if (this.style){
                    this.label.setClassName(this.style);
                }
                this.label.setPos(new SPoint(1, 1));
                var size = this._icon.getSize();
                var offset = this._icon.getOffset();

                this.markDiv.style.left = (pos.x - parseInt(this.label.getSizeX()/2) + offset.x) +  'px';
                this.markDiv.style.top = (pos.y - parseInt(this.label.getSizeY()/2) + offset.y) + 'px';

                this.label.setOpacity(0.7);
                this.label.setZIndex(999);
                this.label.showWindow();

            } else {
                this.label.redraw(recalc);
            }
        } else {
            if (this.label != null) {
                this.label.unload();
                this.label = null;
            }
        }
    };
    _mark.prototype.show = function() {
        if ((this.map && this.img) == null) {
            return;
        }
        this.img.style.display = '';
        if (this.label != null) {
            this.label.showWindow();
        }
    };
    _mark.prototype.hide = function() {
        if ((this.map && this.img) == null) {
            return;
        }
        this.img.style.display = 'none';
        if (this.label != null) {
            this.label.hideWindow();
        }
    };
    _mark.prototype.isShow = function() {
        return this.img.style.display == '';
    };
    _mark.prototype.showInfoWin = function(content) {
        if (content == null){
            content = this.content;
        }
        this.map.setInfoWin(this.getPoint(), content);

        var iconSize = this._icon.getSize();
        this.map.infowin.setOffset(iconSize);

        if (this.pk != null) {
            try {
                this.map.infowin.setPk(this.pk);
            } catch (e) {
            }
        }
        this.map.showInfoWin();
    };
    _mark.prototype.hideInfoWin = function(yo5) {
        this.map.hideInfoWin(yo5);
    };
    _mark.prototype.click = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }
        if (this.content != null) {
            this.hideInfoWin();
            this.showInfoWin();
        }
        SEvent.trigger(this, "click", this.getPoint(), this);
    };
    _mark.prototype.mousedown = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }

        this.startPos = new SPoint(a.clientX, a.clientY);
        SEvent.attachDom(this.markDiv, "mousemove", this, this.mousemove);
        SEvent.attachDom(this.markDiv, "mouseup", this, this.mouseup);

        SEvent.trigger(this, "mousedown", this);
    };
    _mark.prototype.mousemove = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }

        var markDivPos = new SSize();


        var offset = new _Size(this.markDiv.offsetLeft
                + (a.clientX-this.startPos.x), this.markDiv.offsetTop
                + (a.clientY-this.startPos.y));

        this.move(offset);
        SEvent.trigger(this, "mousemove", this);
    };
    _mark.prototype.mouseup = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }

        var offset = new _Size(this.markDiv.offsetLeft
                + (a.clientX - this.markDragPoint.x), this.markDiv.offsetTop
                + (a.clientY - this.markDragPoint.y));

        SEvent.detachEvent(this.markDiv, "mousemove", this.mousemove);
        SEvent.detachEvent(this.markDiv, "mouseup", this.mouseup);

        SEvent.trigger(this, "mouseup", this);

        if (this.markDiv.releaseCapture) {
            this.markDiv.releaseCapture();
        }
    };
    _mark.prototype.move = function(offset){
        this.markDiv.style.left = offset.width + 'px';
        this.markDiv.style.top = offset.height + 'px';
    };
    _mark.prototype.mouseover = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }

        this.imgZIndex = this.img.style.zIndex;
        this.img.style.zIndex = 998;

        if (this.markDiv != null){
            this.markDiv.style.zIndex = 998;
            var iconOffsetSize = this._icon.getOffset();
            var iconSize = this._icon.getSize();
            this.markDiv.style.top = parseInt(this.markDiv.style.top + this.yqqb3.height) + 'px';
        }

        this.redrawText(true);
        SEvent.trigger(this, "mouseover", this.getPoint(), this);
    };
    _mark.prototype.setOverAmt = function(x, y) {
        this.yqqb3.set(x, y);
    };
    _mark.prototype.mouseout = function(a) {
        if (!a){
            a = window.event;
        }
        if (!this.isPropagationEvt && a) {
            eventOverlap(a);
        }
        this.img.style.zIndex = this.imgZIndex;

        if (this.markDiv != null){
            this.markDiv.style.zIndex = this.imgZIndex;
        }
        this.redrawText(false);
        SEvent.trigger(this, "mouseout", this);
    };
    _mark.prototype.setInforWindow = function(_inforWindow){
        if(!_inforWindow){
            return
        }
        this.label = _inforWindow;
    };

    function me3(width, height, ixrb4, parent) {
        this.map = null;
        this.mainLayer = null;
        this.yn9 = [];
        this.width = width;
        this.height = height;
        this.ixrb4 = ixrb4;
        this.txow3 = new _SPoint(-1000, -1000);
        this.g6 = false;
        this.parent = parent;
        this.leftTopPoint = new _SPoint(0, 0);
        this.weight = 10;
        this.color = "#FF0000";
        this.opacity = 0.5;
        this.a9 = null;
        this.f0 = null;
        this.uz2 = null;
        this.l4 = true;
        this.pj6 = false;

        this.ak = null;
    };
    me3.prototype.init = function(map) {
        this.map = map;
        if (!this.parent) {
            this.parent = this.map.pathLayer;
        }
        SEvent.bind(this.map, "unload", this, this.unload);
    };
    me3.prototype.wrrx9 = function(x, y) {
        this.leftTopPoint.set(x, y);
    };
    me3.prototype.setWeight = function(weight) {
        this.weight = weight;
        if (this.a9 != null) {
            if (enum_BrowserType.IE) {
                this.a9.weight = Math.round(this.getWeight() / 1.3);
            } else {
                this.a9.lineWidth = weight;
            }
        }
    };
    me3.prototype.getWeight = function() {
        return this.weight;
    };
    me3.prototype.setColor = function(color) {
        this.color = color;
        if (this.a9 != null) {
            if (enum_BrowserType.IE) {
                this.a9.color = color;
            } else {
                this.a9.strokeStyle = color;
            }
        }
    };
    me3.prototype.getColor = function() {
        return this.color;
    };
    me3.prototype.setOpacity = function(opacity) {
        this.opacity = opacity;
        if (this.a9 != null) {
            if (enum_BrowserType.IE) {
                this.a9.opacity = opacity;
            } else {
                this.a9.globalAlpha = opacity;
            }
        }
    };
    me3.prototype.getOpacity = function() {
        return this.opacity;
    };
    me3.prototype.redraw = function() {
        if (this.mainLayer == null) {
            this.mainLayer = this.p6();
        }
        this.polyline(this.mainLayer);
        this.l4 = false;
    };
    me3.prototype.show = function() {
        if (this.l4) {
            this.redraw();
        }
        if (!this.n8()) {
            this.parent.appendChild(this.mainLayer);
            this.g6 = true;
        }
    };
    me3.prototype.hide = function() {
        if (this.n8()) {
            this.parent.removeChild(this.mainLayer);
            this.g6 = false;
        }
    };
    me3.prototype.p6 = function() {
        var mainLayer = document.createElement("div");
        mainLayer.style.position = "absolute";
        mainLayer.style.width = (this.width + this.ixrb4 * 2) + 'px';
        mainLayer.style.height = (this.height + this.ixrb4 * 2) + 'px';
        mainLayer.style.overflow = 'hidden';
        return mainLayer;
    };
    me3.prototype.n8 = function() {
        return this.g6;
    };
    me3.prototype.setPos = function(left, top) {
        this.mainLayer.style.left = (left - this.ixrb4)+ 'px';
        this.mainLayer.style.top = (top - this.ixrb4)+ 'px';
    };
    me3.prototype.moveTo = function(point) {
        this.yn9.push(this.txow3);
        this.lineTo(point);
    };
    me3.prototype.lineTo = function(point) {
        var px = new _SPoint(point.x - this.leftTopPoint.x + this.ixrb4,
                this.leftTopPoint.y - point.y + this.ixrb4);
        this.pj6 = true;
        this.yn9.push(px);
    };
    me3.prototype.fix = function() {
        if (this.pj6) {
            for ( var i = this.yn9.length - 1; i > 1; i--) {
                if (this.yn9[i - 1].equals(this.txow3)) {
                    if (this.yn9[i].equals(this.yn9[i - 2])) {
                        this.yn9.splice(i - 1, 2);
                    }
                } else {
                    if (this.yn9[i].equals(this.yn9[i - 1])) {
                        this.yn9.splice(i, 1);
                    }
                }
            }
            this.pj6 = false;
        }
    };
    me3.prototype.polyline = function(mainLayer) {
        if (this.f0 != null) {
            mainLayer.removeChild(this.f0);
        }

        if (enum_BrowserType.IE) {
            if (!document.namespaces.v) {
                document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                document.createStyleSheet().addRule("v\\:*", "behavior: url(#default#VML);");
            }

            this.f0 = this.xvea6(mainLayer);
        } else {
            this.f0 = this.ky2(mainLayer);
        }
    };
    me3.prototype.xvea6 = function(mainLayer) {
        var f0, a8;
        f0 = document.createElement("v:shape");
        f0.fill = false;
        f0.filled = false;
        f0.style.position = "absolute";
        a8 = document.createElement("v:stroke");
        f0.appendChild(a8);
        a8.endcap = "flat";
        a8.joinstyle = "round";
        a8.opacity = this.getOpacity();
        a8.color = this.getColor();

        f0.style.width = this.width + this.ixrb4 * 2;
        f0.style.height = this.height + this.ixrb4 * 2;
        f0.coordorigin = "0 0";
        f0.coordsize = (this.width + this.ixrb4 * 2) + " "
                + (this.height + this.ixrb4 * 2);

        var path = [];
        var h5 = false;
        this.fix();

        for ( var i = 0; i < this.yn9.length; i++) {
            if (this.yn9[i].equals(this.txow3)) {
                i++;
                if (i < (this.yn9.length - 1)) {
                    path.push(" M " + this.yn9[i] + " L ");
                    h5 = true;
                }
            }
            else {
                if (h5) {
                    h5 = false;
                    path.push(this.yn9[i]);
                } else {
                    path.push("," + this.yn9[i]);
                }
            }
        }

        path.push(" E");
        f0.path = path.join("");
        path = null;
        a8.weight = Math.round(this.getWeight() / 1.3);
        f0.style.left = 0;
        f0.style.top = 0;
        this.a9 = a8;
        mainLayer.appendChild(f0);
        return f0;
    };
    me3.prototype.ky2 = function(mainLayer) {
        var f0 = document.createElement("canvas");
        mainLayer.appendChild(f0);
        f0.oncontextmenu = falseFunc;
        f0.style.position = "absolute";
        f0.width = this.width + this.ixrb4 * 2;
        f0.height = this.height + this.ixrb4 * 2;
        f0.style.left = '0px';
        f0.style.top = '0px';
        if (f0.getContext) {
            var ctx = f0.getContext('2d');
            ctx.lineWidth = this.getWeight();
            ctx.globalAlpha = this.getOpacity();
            ctx.lineCap = "butt";
            ctx.lineJoin = "round";
            ctx.translate(0, 0);
            ctx.beginPath();
            ctx.strokeStyle = this.getColor();
            for ( var i = 0; i < this.yn9.length; i++) {
                if (this.yn9[i].equals(this.txow3)) {
                    i++;
                    ctx.moveTo(this.yn9[i].x, (this.yn9[i].y));
                } else {
                    ctx.lineTo(this.yn9[i].x, (this.yn9[i].y));
                }
                if ((i % 40) == 0)
                    ctx.stroke();
            }
            ctx.stroke();
            this.a9 = ctx;
        }
        return f0;
    };
    me3.prototype.unload = function() {
        if (this.map && this.parent) {
            if (this.mainLayer != null) {
                if (this.mainLayer.parentNode == this.parent) {
                    this.parent.removeChild(this.mainLayer);
                }
                this.mainLayer = null;
            }
            this.map = null;
            this.parent = null;
        }
        this.yn9 = null;
        this.txow3 = null;
        this.leftTopPoint = null;
        this.a9 = null;
    };
    function _polyline() {
        this.map = null;
        this.points = [];
        this.p = {};
        this.weight = 10;
        this.minWeight = 3;
        this.maxWeight = 20;
        this.color = "#FF0000";
        this.opacity = 0.5;

        this.left = 999999;
        this.top = 0;
        this.right = 0;
        this.bottom = 999999;
        this.turnOnList = [];
        this.enable = false;
        this.addPoints.apply(this, arguments);

        this.autoWeight = false;
        this.arrow = 0;
        this.enable = false;
        this.startArrow = null;
        this.endArrow = null;

        this.parent = null;
    };
    _polyline.prototype.init = function(map, parent) {
        this.map = map;
        this.mainLayer = this.map.mkDiv(0);
        if (isDefined(parent)) {
            this.parent = parent;
        } else {
            this.parent = this.map.pathLayer;
        }

        this.parent.appendChild(this.mainLayer);
        this.redrawCallback = SEvent.bind(this.map, "redraw", this, this.redraw);
        this.zoomCallback = SEvent.bind(this.map, "zoom", this, this.vrr6);
        this.turnOnCallback = SEvent.bind(this.map, "drawTile", this, this.g6);
        this.turnOffCallback = SEvent.bind(this.map, "removeTile", this,this.kel8);
        SEvent.bind(this.map, "unload", this, this.unload);
        this.enable = true;
        this.vrr6(this.map.getZoom());
    };
    _polyline.prototype.setArrow = function(value) {
        this.arrow = value;
        this.drawArrow();
    };
    _polyline.prototype.drawArrowIE = function(parent, poinMap, point2) {
        var arrow, a8;
        var pixel1 = this.map.getPos(this.map.spec.point2pixel(poinMap,
                this.map.getZoom()));
        var pixel2 = this.map.getPos(this.map.spec.point2pixel(point2, this.map
                .getZoom()));
        var c, d;
        c = (this.getWeight() + 3) * 2;
        d = this.getWeight() + 3;
        var dist = Math.pow(Math.pow(pixel1.x - pixel2.x, 2)+ Math.pow(pixel1.y - pixel2.y, 2), 0.5);

        var cos = (pixel2.x - pixel1.x) / dist;
        var sin = (pixel2.y - pixel1.y) / dist;
        var arrow1X = pixel1.x + Math.round(c * cos + d * sin);
        var arrow1Y = pixel1.y + Math.round(c * sin - d * cos);
        var arrow2X = pixel1.x + Math.round(c * cos - d * sin);
        var arrow2Y = pixel1.y + Math.round(c * sin + d * cos);
        var leftA = Math.min(pixel1.x, arrow1X, arrow2X);
        var topA = Math.min(pixel1.y, arrow1Y, arrow2Y);
        var rightA = Math.max(pixel1.x, arrow1X, arrow2X);
        var bottomA = Math.max(pixel1.y, arrow1Y, arrow2Y);
        var widthA = (rightA - leftA);
        var heightA = (bottomA - topA);
        arrow = document.createElement("shape");
        parent.appendChild(arrow);
        arrow.unselectable = "on";
        arrow.style.position = "absolute";
        arrow.style.behavior = 'url(#default#VML);';
        a8 = document.createElement("stroke");
        arrow.appendChild(a8);
        a8.endcap = "flat";
        a8.joinstyle = "miter";
        a8.opacity = this.getOpacity();
        a8.color = this.getColor();
        a8.style.behavior = 'url(#default#VML);';
        fillProperty = document.createElement("fill");
        arrow.appendChild(fillProperty);
        fillProperty.opacity = this.getOpacity();
        fillProperty.color = this.getColor();
        fillProperty.style.behavior = 'url(#default#VML);';
        arrow.style.width = widthA+ 'px';
        arrow.style.height = heightA+ 'px';
        arrow.style.left = leftA+ 'px';
        arrow.style.top = topA+ 'px';
        arrow.coordorigin = leftA + " " + topA;
        arrow.coordsize = widthA + " " + heightA;
        arrow.path = "m " + pixel1 + " l " + arrow1X + "," + arrow1Y + ", "
                + arrow2X + "," + arrow2Y + " x e";
        return arrow;
    };
    _polyline.prototype.drawArrowFF = function(parent, poinMap, point2) {
        var arrow, a8;
        var pixel1 = this.map.getPos(this.map.spec.point2pixel(poinMap,this.map.getZoom()));
        var pixel2 = this.map.getPos(this.map.spec.point2pixel(point2, this.map.getZoom()));
        var c, d;
        c = (this.getWeight() + 3) * 2;
        d = this.getWeight() + 3;
        var dist = Math.pow(Math.pow(pixel1.x - pixel2.x, 2)+ Math.pow(pixel1.y - pixel2.y, 2), 0.5);
        var cos = (pixel2.x - pixel1.x) / dist;
        var sin = (pixel2.y - pixel1.y) / dist;
        var arrow1Y = pixel1.y + Math.round(c * sin - d * cos);
        var arrow2X = pixel1.x + Math.round(c * cos - d * sin);
        var arrow2Y = pixel1.y + Math.round(c * sin + d * cos);
        var leftA = Math.min(pixel1.x, arrow1X, arrow2X);
        var topA = Math.min(pixel1.y, arrow1Y, arrow2Y);
        var rightA = Math.max(pixel1.x, arrow1X, arrow2X);
        var bottomA = Math.max(pixel1.y, arrow1Y, arrow2Y);
        var widthA = (rightA - leftA);
        var heightA = (bottomA - topA);
        arrow = document.createElement("canvas");
        arrow.width = widthA;
        arrow.height = heightA;
        parent.appendChild(arrow);
        arrow.style.position = "absolute";
        var ctx;
        try {
            ctx = arrow.getContext("2d");
        } catch (e) {
            ctx = null;
        }
        if (ctx) {
            ctx.globalAlpha = this.getOpacity();
            ctx.strokeStyle = this.getColor();
            ctx.fillStyle = this.getColor();
            ctx.scale(1, 1);
            ctx.translate(-leftA, -topA);
            ctx.beginPath();
            ctx.moveTo(pixel1.x, pixel1.y);
            ctx.lineTo(arrow1X, arrow1Y);
            ctx.lineTo(arrow2X, arrow2Y);
            ctx.lineTo(pixel1.x, pixel1.y);
            ctx.fill();
            ctx.stroke();
        }
        arrow.style.left = leftA+ 'px';
        arrow.style.top = topA+ 'px';
        return arrow;
    };
    _polyline.prototype.drawArrow = function() {
        if (this.map == null) {
            return;
        }
        if (this.startArrow != null) {
            this.mainLayer.removeChild(this.startArrow);
        }
        if (this.endArrow != null) {
            this.mainLayer.removeChild(this.endArrow);
        }
        if (this.points.length < 2) {
            return;
        }
        if ((this.arrow % 2) == 1) {
            if (enum_BrowserType.IE) {
                this.startArrow = this.drawArrowIE(this.mainLayer,
                        this.points[0], this.points[1]);
            } else {
                this.startArrow = this.drawArrowFF(this.mainLayer,
                        this.points[0], this.points[1]);
            }
        }
        if (this.arrow > 1) {
            if (enum_BrowserType.IE) {
                this.endArrow = this.drawArrowIE(this.mainLayer,
                        this.points[this.points.length - 1],
                        this.points[this.points.length - 2]);
            } else {
                this.endArrow = this.drawArrowFF(this.mainLayer,
                        this.points[this.points.length - 1],
                        this.points[this.points.length - 2]);
            }
        }
    };
    _polyline.prototype.fgnz6 = function(lv, uwa0) {
        if (!this.p[lv]) {
            this.p[lv] = {};
            this.turnOnList[lv] = [];
        }
        if (!this.p[lv][uwa0.x]) {
            this.p[lv][uwa0.x] = {};
        }
        if (!this.p[lv][uwa0.x][uwa0.y]) {
            var polylinePixel = new me3(this.map.spec.tileSize,
                    this.map.spec.tileSize, 20, this.mainLayer);
            polylinePixel.init(this.map);
            polylinePixel.wrrx9(uwa0.x * this.map.spec.tileSize, (uwa0.y + 1)
                    * this.map.spec.tileSize);
            polylinePixel.uwa0 = uwa0.copy();
            this.p[lv][uwa0.x][uwa0.y] = polylinePixel;
        }
        return this.p[lv][uwa0.x][uwa0.y];
    };
    _polyline.prototype.g6 = function(lv, cb7, ukhh3) {
        if (this.p[lv] && this.p[lv][cb7] && this.p[lv][cb7][ukhh3]
                && this.enable) {
            var sztw2 = this.p[lv][cb7][ukhh3];
            sztw2.setWeight(this.getWeight());
            sztw2.setColor(this.getColor());
            sztw2.setOpacity(this.getOpacity());
            sztw2.show();
            sztw2.setPos((cb7 - this.map.mapIndex.x) * this.map.spec.tileSize
                    - this.map.panMargin.width, (this.map.mapIndex.y - ukhh3)
                    * this.map.spec.tileSize - this.map.panMargin.height);
            this.turnOnList[lv].push(sztw2);
        }
    };
    _polyline.prototype.kel8 = function(lv, cb7, ukhh3) {
        if (this.p[lv] && this.p[lv][cb7] && this.p[lv][cb7][ukhh3]
                && this.enable) {
            var sztw2 = this.p[lv][cb7][ukhh3];
            sztw2.hide();
            for ( var i = 0; i < this.turnOnList[lv].length; i++) {
                if (sztw2 == this.turnOnList[lv][i]) {
                    this.turnOnList[lv].splice(i, 1);
                    break;
                }
            }
        }
    };

    _polyline.prototype.hhvo6 = function() {
        if (this.map != null && this.enable && this.p[this.xlp1]) {
            var ccb4 = this.map.y2();
            for ( var i = ccb4[0]; i < ccb4[2]; i++) {
                for ( var j = ccb4[1]; j > ccb4[3]; j--) {
                    this.g6(this.xlp1, i, j);
                }
            }
        }
    };
    _polyline.prototype.hidePolyline = function(lv) {
        if (this.map != null && this.enable) {
            while (this.turnOnList[lv].length > 0) {
                this.turnOnList[lv].pop().hide();
            }
        }
    };
    _polyline.prototype.ma1 = function(lv, from, to) {
        if(from.equals(to)){
            return;
        }

        var ki2, cx, cy;
        var left, top, right, bottom;
        var hpoint, vpoint;

        var dx = (to.x > from.x) ? 1 : -1;
        var dy = (to.y > from.y) ? 1 : -1;
        var eva3 = this.map.spec.tileSize;

        var fromIndex = new _SPoint(Math.floor((from.x) / eva3), Math.floor((from.y) / eva3));
        var toIndex = new _SPoint(Math.floor((to.x) / eva3), Math.floor((to.y)/ eva3));
        var partLine = this.fgnz6(lv, fromIndex);

        while (!toIndex.equals(fromIndex)) {
            var ddx = dx;
            var ddy = dy;
            left = fromIndex.x * eva3;
            top = (fromIndex.y + 1) * eva3;
            right = (fromIndex.x + 1) * eva3;
            bottom = (fromIndex.y) * eva3;
            hpoint = (to.x > from.x) ? right : left;
            vpoint = (to.y > from.y) ? top : bottom;

            if (from.y == to.y || from.x == to.x) {
                if (from.y == to.y && from.x == to.x) {
                    ddy = 0;
                    ddx = 0;
                    cx = from.x;
                    cy = from.y;
                }
                else
                    if (from.y == to.y) {
                        ddy = 0;
                        cx = hpoint;
                        cy = from.y;
                    }
                    else
                        if (from.x == to.x) {
                            ddx = 0;
                            cx = from.x;
                            cy = vpoint;
                        }
            }
            else{
                var ratio = (to.y - from.y) / (to.x - from.x);
                cy = from.y + (hpoint - from.x) * ratio;
                cx = from.x + (vpoint - from.y) / ratio;
                if ((to.y - from.y) * (vpoint - cy) > 0) {
                    ddy = 0;
                    cx = hpoint;
                } else if ((to.y - from.y) * (vpoint - cy) < 0) {
                    if ((hpoint - cx) != 0) {
                        ddx = 0;
                    }
                    cy = vpoint;
                }
            }

            ki2 = new _SPoint(Math.round(cx), Math.round(cy));
            from.set(cx, cy);
            partLine = this.fgnz6(lv, fromIndex);
            partLine.lineTo(ki2);
            fromIndex.set(Math.floor((from.x + ddx) / eva3), Math
                    .floor((from.y + ddy) / eva3));
            partLine = this.fgnz6(lv, fromIndex);
            partLine.moveTo(ki2);
        }

        partLine.lineTo(to);
    };
    _polyline.prototype.prus1 = function(lv, pixp1, index) {
        var px;
        var tempPixel = this.map.spec.point2pixel(pixp1[index], lv);

        if (index == 0) {
            this.fgnz6(lv,
                    new _SPoint(Math.floor(tempPixel.x / this.map.spec.tileSize), Math
                            .floor(tempPixel.y / this.map.spec.tileSize))).moveTo(tempPixel);
        }
        for ( var i = index + 1; i < pixp1.length; i++) {
            px = this.map.spec.point2pixel(pixp1[i], lv);

            if (!(Math.abs(tempPixel.x - px.x) < 3 && Math.abs(tempPixel.x - px.x) < 3
                        && i < (pixp1.length - 1)) || (pixp1[i + 1] && pixp1[i + 1].cX))
            {
                if (pixp1[i].cX)
                    this.fgnz6(lv,
                        new _SPoint(Math.floor(px.x/this.map.spec.tileSize),
                                        Math.floor(px.y/this.map.spec.tileSize)));
                else
                    this.ma1(lv, tempPixel, px);


                tempPixel = px;
            }
        }
    };
    _polyline.prototype.vrr6 = function(lv, xg6) {
        this.xlp1 = lv;
        if (!this.enable) {
            return;
        }
        if (this.points.length < 2) {
            return;
        }

        if (xg6) {
            this.hidePolyline(xg6);
        }

        if (this.p[this.xlp1] && this.p[this.xlp1] != null) {
            this.hhvo6();
            return;
        }

        this.prus1(lv, this.points, 0);
        this.hhvo6();
    };
    _polyline.prototype.setWeight = function(weight) {
        this.weight = weight;
        this.hhvo6();
    };
    _polyline.prototype.getWeight = function(weight) {
        var weight;
        if (this.autoWeight) {
            weight = Math.min(Math.max(Math.round(this.weight / this.xlp1),
                    this.minWeight), this.maxWeight);
        } else {
            weight = Math.min(Math.max(this.weight, this.minWeight),
                    this.maxWeight);
        }
        return weight;
    };
    _polyline.prototype.setAutoWeight = function(flag) {
        this.autoWeight = flag;
    };
    _polyline.prototype.setMinWeight = function(weight) {
        this.minWeight = weight;
    };
    _polyline.prototype.setMaxWeight = function(weight) {
        this.maxWeight = weight;
    };
    _polyline.prototype.setOpacity = function(opacity) {
        this.opacity = opacity;
        this.hhvo6();
    };
    _polyline.prototype.getOpacity = function() {
        return this.opacity;
    };
    _polyline.prototype.setColor = function(color) {
        this.color = color;
        this.hhvo6();
    };
    _polyline.prototype.getColor = function() {
        return this.color;
    };
    _polyline.prototype.addPoints = function() {
        for ( var i = 0; i < arguments.length; i++) {
            this.left = Math.min(this.left, arguments[i].x);
            this.top = Math.max(this.top, arguments[i].y);
            this.right = Math.max(this.right, arguments[i].x);
            this.bottom = Math.min(this.bottom, arguments[i].y);
            this.points.push(arguments[i]);
        }
        if (this.map != null) {
            var startIndex = this.points.length - arguments.length - 1;
            if (startIndex >= 0) {
                if (!this.p[this.xlp1]) {
                    this.p[this.xlp1] = {};
                    this.turnOnList[this.xlp1] = [];
                }
                for ( var lv in this.p) {
                    this.prus1(lv, this.points, startIndex);
                }
                this.allMustRedraw();
                this.enable = true;
                this.hhvo6();
            }
        }
    };
    _polyline.prototype.getBound = function() {
        return Array(this.left, this.top, this.right, this.bottom);
    };
    _polyline.prototype.getPoints = function() {
        return this.points;
    };
    _polyline.prototype.getPoint = function(index) {
        return this.points[index];
    };
    _polyline.prototype.setPoint = function(index, point) {
        if (this.points[index] instanceof _SPoint) {
            this.points[index].set(point.x, point.y);
            this.akt5();
        }
    };
    _polyline.prototype.akt5 = function() {
        this.hn2();
        this.vrr6(this.xlp1);
        //this.redraw();
    };
    _polyline.prototype.redraw = function() {
        if (this.map == null) {
            return;
        }
        this.hhvo6();
    };
    _polyline.prototype.show = function() {
        this.enable = true;
        this.vrr6(this.xlp1);
    };
    _polyline.prototype.hide = function() {
        this.hidePolyline(this.xlp1);
        this.enable = false;
    };
    _polyline.prototype.allMustRedraw = function() {
        for ( var lv in this.p) {
            for ( var cb7 in this.p[lv]) {
                for ( var ukhh3 in this.p[lv][cb7]) {
                    this.p[lv][cb7][ukhh3].l4 = true;
                }
            }
        }
    };
    _polyline.prototype.hn2 = function() {
        for ( var lv in this.p) {
            for ( var cb7 in this.p[lv]) {
                for ( var ukhh3 in this.p[lv][cb7]) {
                    this.p[lv][cb7][ukhh3].unload();
                    delete this.p[lv][cb7][ukhh3];
                    this.p[lv][cb7][ukhh3] = null;
                }
                this.p[lv][cb7] = null;
            }
            this.p[lv] = null;
        }
    };
    _polyline.prototype.unload = function() {
        if (this.map && this.parent) {
            SEvent.removeListener(this.map, "zoom", this.zoomCallback);
            this.parent.removeChild(this.mainLayer);
            this.parent = null;
        }
        this.hn2();
        this.p = null;
    };
    function _simpleMap(container, x, y, lv, width, height, url, targetWin) {
        var spec = new SSpec();
        container.style.position = 'relative';
        container.style.width = width + "px";
        container.style.height = height + "px";
        container.style.overflow = 'hidden';
        container.oncontextmenu = falseFunc;
        container.onselectstart = falseFunc;
        container.ondragstart = falseFunc;
        var px = spec.point2pixel(new _SPoint(x, y), lv);
        var left = Math.round(px.x - width / 2);
        var top = Math.round(px.y + height / 2);
        var right = Math.round(px.x + width / 2);
        var bottom = Math.round(px.y - height / 2);
        var tileSize = spec.tileSize;
        var xOffset = left % tileSize;
        var yOffset = tileSize - top % tileSize;
        if (isDefined(url) && url != '') {
            var link;
            link = document.createElement("A");
            link.href = url;
            container.appendChild(link);
            container = link;
            if (isDefined(targetWin) && targetWin != '') {
                link.target = targetWin;
            }
        }
        for ( var i = Math.floor(left / tileSize); i <= Math.floor(right
                / tileSize); i++) {
            for (j = Math.floor(top / tileSize); j >= Math.floor(bottom
                    / tileSize); j--) {
                var tileImg = _Image.create(spec.getTileUrl(i, j, lv),
                        tileSize, tileSize, (i - Math.floor(left / tileSize))
                                * tileSize - xOffset, (Math.floor(top
                                / tileSize) - j)
                                * tileSize - yOffset, 0, container);
                tileImg.border = 0;
            }
        }
    };
    function SSelectArea() {
        this.setAlign("right");
        this.setValign("top");
        this.bShow = false;
    };

    if(enum_BrowserType.IE){
        SSelectArea.prototype = new _staticOverlay(new _Size(170, 420), new _SPoint(78, 31));
    }
    else{
        SSelectArea.prototype = new _staticOverlay(new _Size(170, 440), new _SPoint(78, 31));
    }

    SSelectArea.prototype.init = function(map) {
        var _AreaInfo_;
        this.mainMap = map;

        if (!_AreaInfo_) {
            _AreaInfo_  = {"info":[
                             {"lang":"ko" , "info":
                                 [
                                    {"AREA" : "광화문", "PTR" : [197887, 452631] },
                                    {"AREA" : "남대문시장", "PTR" : [197990, 450811] },
                                    {"AREA" : "남산일대", "PTR" : [198315, 450157] },
                                    {"AREA" : "대학로", "PTR" : [200175, 453137] },
                                    {"AREA" : "동대문시장", "PTR" : [200288, 452002] },
                                    {"AREA" : "명동", "PTR" : [198683, 450988] },
                                    {"AREA" : "무교동", "PTR" : [198060, 451754] },
                                    {"AREA" : "북촌&삼청동", "PTR" : [198332, 453620] },
                                    {"AREA" : "삼성동", "PTR" : [204812, 445480] },
                                    {"AREA" : "시청", "PTR" : [197990, 451590] },
                                    {"AREA" : "신사동&압구정&청담동", "PTR" : [202354, 447094] },
                                    {"AREA" : "신촌&이대", "PTR" : [194582, 450480] },
                                    {"AREA" : "강남역", "PTR" : [202250, 444360] },
                                    {"AREA" : "여의도", "PTR" : [193348, 447736] },
                                    {"AREA" : "이태원&용산", "PTR" : [199362, 447980] },
                                    {"AREA" : "인사동", "PTR" : [198618, 452397] },
                                    {"AREA" : "잠실", "PTR" : [208712, 445622] },
                                    {"AREA" : "정동&덕수궁", "PTR" : [197417, 451732] },
                                    {"AREA" : "종로&청계천", "PTR" : [198126, 452304] },
                                    {"AREA" : "홍대", "PTR" : [193118, 450392] }
                                ]
                             },
                             {"lang":"en" , "info":
                                 [
                                    {"AREA" : "Gwanghwamun", "PTR" : [197887, 452631] },
                                    {"AREA" : "Namdaemun Market", "PTR" : [197990, 450811] },
                                    {"AREA" : "Namsan District", "PTR" : [198315, 450157] },
                                    {"AREA" : "Daehangno", "PTR" : [200175, 453137] },
                                    {"AREA" : "Dongdaemun Market", "PTR" : [200288, 452002] },
                                    {"AREA" : "Myeongdong", "PTR" : [198683, 450988] },
                                    {"AREA" : "Mugyodong", "PTR" : [198060, 451754] },
                                    {"AREA" : "Bukchon & Samcheongdong", "PTR" : [198332, 453620] },
                                    {"AREA" : "Samseongdong", "PTR" : [204812, 445480] },
                                    {"AREA" : "City Hall", "PTR" : [197990, 451590] },
                                    {"AREA" : "Sinsa & Apgujeong & Cheongdam", "PTR" : [202354, 447094] },
                                    {"AREA" : "Sinchon & Edae", "PTR" : [194582, 450480] },
                                    {"AREA" : "Gangnam Station", "PTR" : [202250, 444360] },
                                    {"AREA" : "Yeouido", "PTR" : [193348, 447736] },
                                    {"AREA" : "Itaewon & Yongsan", "PTR" : [199362, 447980] },
                                    {"AREA" : "Insadong", "PTR" : [198618, 452397] },
                                    {"AREA" : "Jamsil", "PTR" : [208712, 445622] },
                                    {"AREA" : "Jeongdong & Deoksugung", "PTR" : [197417, 451732] },
                                    {"AREA" : "Jongno & Cheonggyecheon", "PTR" : [198126, 452304] },
                                    {"AREA" : "Hongdae", "PTR" : [193118, 450392] }
                                ]
                             },
                            {"lang":"ja" , "info":
                                 [
                                    {"AREA" : "光化門", "PTR" : [197887, 452631] },
                                    {"AREA" : "南大門市場", "PTR" : [197990, 450811] },
                                    {"AREA" : "南山一帯", "PTR" : [198315, 450157] },
                                    {"AREA" : "大学路", "PTR" : [200175, 453137] },
                                    {"AREA" : "東大門市場", "PTR" : [200288, 452002] },
                                    {"AREA" : "明洞", "PTR" : [198683, 450988] },
                                    {"AREA" : "武橋洞", "PTR" : [198060, 451754] },
                                    {"AREA" : "北村＆三清洞", "PTR" : [198332, 453620] },
                                    {"AREA" : "三成洞", "PTR" : [204812, 445480] },
                                    {"AREA" : "市庁", "PTR" : [197990, 451590] },
                                    {"AREA" : "新沙＆狎鴎亭＆清潭", "PTR" : [202354, 447094] },
                                    {"AREA" : "新村＆梨大", "PTR" : [194582, 450480] },
                                    {"AREA" : "江南駅", "PTR" : [202250, 444360] },
                                    {"AREA" : "汝矣島", "PTR" : [193348, 447736] },
                                    {"AREA" : "梨泰院＆龍山", "PTR" : [199362, 447980] },
                                    {"AREA" : "仁寺洞", "PTR" : [198618, 452397] },
                                    {"AREA" : "蚕室", "PTR" : [208712, 445622] },
                                    {"AREA" : "貞洞＆徳寿宮", "PTR" : [197417, 451732] },
                                    {"AREA" : "鍾路＆清渓川", "PTR" : [198126, 452304] },
                                    {"AREA" : "弘大", "PTR" : [193118, 450392] }
                                ]
                             },
                             {"lang":"zh-CN" , "info":
                                 [
                                   {"AREA" : "光化门", "PTR" : [197887, 452631] },
                                    {"AREA" : "南大门市场", "PTR" : [197990, 450811] },
                                    {"AREA" : "南山一带", "PTR" : [198315, 450157] },
                                    {"AREA" : "大学路", "PTR" : [200175, 453137] },
                                    {"AREA" : "东大门市场", "PTR" : [200288, 452002] },
                                    {"AREA" : "明洞", "PTR" : [198683, 450988] },
                                    {"AREA" : "武桥洞", "PTR" : [198060, 451754] },
                                    {"AREA" : "北村&三清洞", "PTR" : [198332, 453620] },
                                    {"AREA" : "三成洞", "PTR" : [204812, 445480] },
                                    {"AREA" : "市政府", "PTR" : [197990, 451590] },
                                    {"AREA" : "新沙 &狎鸥亭&清潭", "PTR" : [202354, 447094] },
                                    {"AREA" : "新村&梨大", "PTR" : [194582, 450480] },
                                    {"AREA" : "江南站", "PTR" : [202250, 444360] },
                                    {"AREA" : "汝矣岛", "PTR" : [193348, 447736] },
                                    {"AREA" : "梨泰院&龙山", "PTR" : [199362, 447980] },
                                    {"AREA" : "仁寺洞", "PTR" : [198618, 452397] },
                                    {"AREA" : "蚕室", "PTR" : [208712, 445622] },
                                    {"AREA" : "贞洞&德寿宫", "PTR" : [197417, 451732] },
                                    {"AREA" : "钟路&清溪川", "PTR" : [198126, 452304] },
                                    {"AREA" : "弘大", "PTR" : [193118, 450392] }
                                ]
                             },
                             {"lang":"zh-TW" , "info":
                                 [
                                   {"AREA" : "光化門", "PTR" : [197887, 452631] },
                                    {"AREA" : "南大門市場", "PTR" : [197990, 450811] },
                                    {"AREA" : "南山一帶", "PTR" : [198315, 450157] },
                                    {"AREA" : "大學路", "PTR" : [200175, 453137] },
                                    {"AREA" : "東大門市場", "PTR" : [200288, 452002] },
                                    {"AREA" : "明洞", "PTR" : [198683, 450988] },
                                    {"AREA" : "武橋洞", "PTR" : [198060, 451754] },
                                    {"AREA" : "北村&三清洞", "PTR" : [198332, 453620] },
                                    {"AREA" : "三成洞", "PTR" : [204812, 445480] },
                                    {"AREA" : "市政府", "PTR" : [197990, 451590] },
                                    {"AREA" : "新沙&狎鷗亭&清潭", "PTR" : [202354, 447094] },
                                    {"AREA" : "新村&梨大", "PTR" : [194582, 450480] },
                                    {"AREA" : "江南站", "PTR" : [202250, 444360] },
                                    {"AREA" : "汝矣島", "PTR" : [193348, 447736] },
                                    {"AREA" : "梨泰院&龍山", "PTR" : [199362, 447980] },
                                    {"AREA" : "仁寺洞", "PTR" : [198618, 452397] },
                                    {"AREA" : "蠶室", "PTR" : [208712, 445622] },
                                    {"AREA" : "貞洞&德壽宮", "PTR" : [197417, 451732] },
                                    {"AREA" : "鐘路&清溪川", "PTR" : [198126, 452304] },
                                    {"AREA" : "弘大", "PTR" : [193118, 450392] }
                                ]
                             }
                         ]};
        }

        _staticOverlay.prototype.init.call(this, map);
        this.over = false;
        this.setZIndex(99);
        this.map.staticLayer.appendChild(this.mainLayer);
        this.mainLayer.style.border = "1px solid rgb(153, 153, 153)";
        this.mainLayer.style.backgroundColor = "white";
        this.selectAreaText = '';

        var matchingIndex = 0;
        for (var searchIdx = 0; searchIdx < _AreaInfo_.info.length; searchIdx++) {
            if (_AreaInfo_.info[searchIdx].lang == map.getI18N()){
                matchingIndex = searchIdx;
                break;
            }
        }
        for ( var loop = 0; loop < _AreaInfo_.info[matchingIndex].info.length; loop++) {
            var li_area = document.createElement("p");
            li_area.mainMap = this.map;
            li_area.selectArea = this;

            if(enum_BrowserType.IE){
                //li_area.style.cssText = "padding:3px 0px 3px 2px;margin:0px;height:19;font-size:12px;";
                li_area.style.cssText = "padding:3px 0px 3px 2px;margin:0px;font-size:12px;";
            }else{
                //li_area.style.cssText = "padding:1px 0px 2px 2px;margin:0px;height:17;font-size:12px;";
                li_area.style.cssText = "padding:2px 0px 5px 2px;margin:0px;font-size:12px;";
            }

            li_area.innerHTML = _AreaInfo_.info[matchingIndex].info[loop].AREA;
            li_area.ptr = _AreaInfo_.info[matchingIndex].info[loop].PTR;

            li_area.onclick = function(){
                this.mainMap.setCenterAndZoom(new SPoint(this.ptr[0], this.ptr[1]) , 2);
                this.selectArea.hide();
                this.selectAreaText=li_area.area;
            };
            li_area.onmouseover = function() {
                this.style.color="blue";
            };
            li_area.onmouseout = function() {
                this.style.color="black";
            };

            setCursor(li_area, "pointer");
            this.mainLayer.appendChild(li_area);
        }
    };
    SSelectArea.prototype.redraw = function() {
        if (this.map != null) {
            var pos = this.getPos();
            this.mainLayer.style.left = pos.x+ 'px';
            this.mainLayer.style.top = pos.y+ 'px';
            this.mainLayer.style.width = this.size.width+ 'px';
            this.mainLayer.style.height = this.size.height+ 'px';
            this.mainLayer.style.zIndex = this.zIndex;
        }
    };
    SSelectArea.prototype.show = function() {
        this.mainLayer.style.display = '';
        this.bShow = true;
    };
    SSelectArea.prototype.hide = function() {
        this.mainLayer.style.display = 'none';
        this.bShow = false;
    };
    SSelectArea.prototype.mouseout = function() {
        if (this.over) {
            this.hide();
            this.over = false;
        }
    };
    SSelectArea.prototype.mouseover = function() {
        this.over = true;
    };
    
    function _miniMap() {
        this.setAlign("right");
        this.setValign("top");
        this.bShowMiniMap = true;
    };
    _miniMap.prototype = new _staticOverlay(new _Size(21, 21), new _SPoint(47, 7));
    _miniMap.prototype.init = function(map) {
        _staticOverlay.prototype.init.call(this, map);
        this.setZIndex(1);

        this.selectArea = new SSelectArea();
        this.map.addControler(this.selectArea);
        this.selectArea.hide();

        this.startAdapter = SEvent.createAdapter(this, this.start);
        this.moveAdapter = SEvent.createAdapter(this, this.move);
        this.endAdapter = SEvent.createAdapter(this, this.end);

        this.leftLayer = this.map.mkDiv(0);
        this.btn = SImage.create(ResourceUrl + 'img/minimap/miniMap_btn.png',20, 20, 0, 0, 0);
        setCursor(this.btn, "pointer");
        this.leftLayer.appendChild(this.btn);
        this.appendChild(this.leftLayer);
        SEvent.attachDom(this.btn, "click", this, this.ShowMiniMap);

        this.miniMapLayer = this.map.mkDiv(0);
        setCursor(this.miniMapLayer, "pointer");
        this.miniMapLayer.style.backgroundImage = 'url(' + ResourceUrl + 'img/minimap/minimap_bg.png)';
        this.miniMapLayer.style.width = "190px";
        this.miniMapLayer.style.height = "192px";
        this.miniMapLayer.style.left = "15px";
        this.miniMapLayer.style.top = "0px";
        this.appendChild(this.miniMapLayer);

        SEvent.bind(this.map, "redraw", this, this.redrawMap);
        SEvent.bind(this.miniMapLayer, "click", this, function(event){return false;});

        var nav_combo = this.map.mkDiv(10);
        nav_combo.style.left = '9px';
        nav_combo.style.top = '5px';
        setCursor(nav_combo, "pointer");

        nav_combo.style.backgroundImage = 'url(' + ResourceUrl + 'img/minimap/btn_loca.png)';
        nav_combo.style.width = "170px";
        nav_combo.style.height = "20px";


        var nav_area = document.createElement("p");
        if(enum_BrowserType.IE){
            nav_area.style.cssText = "padding:3px 0px 3px 2px;margin:0px;height:19;font-size:12px;";
        }else{
            nav_area.style.cssText = "padding:1px 0px 2px 2px;margin:0px;height:17;font-size:12px;";
        }

        switch(this.map.getI18N()){
            case "ko":
                nav_area.innerHTML = '지역으로 설정';
                break;
            case "ja":
                nav_area.innerHTML = 'エリアを設定';
                break;
            case "en":
                nav_area.innerHTML = 'Setting your area to ~area';
                break;
            case "zh-CN":
                nav_area.innerHTML = '以地区设置';
                break;
            case "zh-TW":
                nav_area.innerHTML = '設定區域';
                break;
        };

        nav_combo.appendChild(nav_area);

        SEvent.attachDom(nav_combo, "click", this, this.navComboClick);
        this.miniMapLayer.appendChild(nav_combo);

        var minidiv = this.map.mkDiv(0);
        minidiv.style.left = '9px';
        minidiv.style.top = '27px';
        minidiv.style.border = '1px #999999 solid';

        setCursor(minidiv, "pointer");
        SEvent.bind(minidiv, "click", this, function(event){return false;});
        this.miniMapLayer.appendChild(minidiv);

        if (!enum_BrowserType.IE)
            this.miniMap = new _SMap(minidiv, 169, 158, false);
        else
            this.miniMap = new _SMap(minidiv, 169, 158, false);

        this.fillRect = new SRectangle();
        this.emptyRect = new SRectangle();
        this.fillRect.setLineWeight(1);
        this.fillRect.setLineColor("#ff9e9b");
        this.fillRect.setFillColor("gray");
        this.fillRect.setOpacity(0.15);
        this.emptyRect.setLineWeight(1);
        this.emptyRect.setLineColor("#ff9e9b");
        this.miniMap.addOverlay2(this.fillRect);
        this.miniMap.addOverlay2(this.emptyRect);
        this.MapBound2Mini();

        SEvent.attachEvent(this.miniMapLayer, "mousewheel", SEvent.stopEvent);
        SEvent.bind(this.map, "zoom", this, this.MapBound2Mini);
        SEvent.bind(this.map, "resize", this, this.MapBound2Mini);
        SEvent.bind(this.map, "move", this, this.MapCenter2Mini);
        SEvent.bind(this.map, "endDrag", this, this.MapCenter2Mini2);
        SEvent.bind(this.map, "moved", this, this.MapCenter2Mini0);
        SEvent.bind(this.miniMap, "move", this, this.emptyRectCenter);
        SEvent.bind(this.miniMap, "click", this, function(event){return false;});
        SEvent.bind(this.miniMap, "mouseup", this, function(event){eventOverlap(event);return false;});
        SEvent.bind(this.miniMap, "endDrag", this, this.miniCenter2Map);

        this.bShowMiniMap = true;
        this.ShowMiniMap();
    };
    _miniMap.prototype.navComboClick = function() {
        if (this.selectArea.bShow)
            this.selectArea.hide();
        else
            this.selectArea.show();
    };
    _miniMap.prototype.ShowMiniMap = function() {
        if (this.bShowMiniMap) {
            this.setSize(new SSize("21", "21"));
            this.miniMapLayer.style.display = "none";
            this.leftLayer.style.left = "0px";
            this.btn.src = ResourceUrl + 'img/minimap/miniMap_btn.png';
            this.btn.style.width = "20px";
            this.btn.style.height = "20px";
            this.bShowMiniMap = false;
            this.selectArea.hide();
        } else {
            this.setSize(new SSize("226", "192"));
            this.miniMapLayer.style.display = "";
            this.leftLayer.style.left = "0px";
            this.btn.src = ResourceUrl + 'img/minimap/miniMap_btn2.png';
            this.btn.style.width = "15px";
            this.btn.style.height = "25px";
            this.bShowMiniMap = true;
            this.selectArea.hide();
        }
    };
    _miniMap.prototype.unload = function() {
        this.removeChild(this.bar);
        this.bar = null;
        JStaticOverlay.prototype.unload.call(this);
    };
    _miniMap.prototype.MapCenter2Mini0 = function() {
        this.MapCenter2Mini();
        this.MapCenter2Mini2();
    };
    _miniMap.prototype.MapCenter2Mini = function() {
        if (this.dragd)
            this.dragd = false;
        else {
            this.fillRect.setCenter(this.map.getCenter());
        }
    };
    _miniMap.prototype.MapCenter2Mini2 = function() {
        this.miniMap.setI18N(this.map.getI18N());
        this.miniMap.setCenter(this.map.getCenter());
        this.emptyRect.setCenter(this.map.getCenter());
    };
    _miniMap.prototype.emptyRectCenter = function() {
        this.emptyRect.setCenter(this.miniMap.getCenter());
    };
    _miniMap.prototype.miniCenter2Map = function() {
        this.map.setCenter(this.miniMap.getCenter(), false);
        this.fillRect.setCenter(this.miniMap.getCenter());
        SEvent.trigger(this.map, "endDragMini");
    };
    _miniMap.prototype.MapBound2Mini = function() {
        var bound = this.map.getBound();
        var dx = Math.round((bound[2] - bound[0]) * 0.6);
        var dy = Math.round((bound[3] - bound[1]) * 0.6);
        this.fillRect.setBound(this.map.getBound());
        this.emptyRect.setBound(this.map.getBound());
        bound[0] = bound[0] - dx;
        bound[1] = bound[1] - dy;
        bound[2] = bound[2] + dx;
        bound[3] = bound[3] + dy;
        this.miniMap.setBound(bound);
        this.miniMap.setI18N(this.map.getI18N());
        this.emptyRect.setCenter(this.miniMap.getCenter());
        this.fillRect.setCenter(this.miniMap.getCenter());
    };
    _miniMap.prototype.redrawMap = function() {
        this.miniMap.setI18N(this.map.getI18N());
    };

    function _MapControl(obj) {
        this._BTN_UP_ = 0;
        this._BTN_DOWN_ = 1;
        this._BTN_LEFT_ = 2;
        this._BTN_RIGHT_ = 3;
        this._BTN_ZOOMIN_ = 4;
        this._BTN_ZOOMOUT_ = 5;
        this._MAP_MOVE_RATIO_ = 0.3;
        this.map = null;
        this.divCount = 6;
        this.serviceObj = {
                Control:{
                    up:{
                        url: jsResource + "img/mobile/arrow_top.png",
                        sizeX:22,
                        sizeY:20,
                        posX:0,
                        posY:0
                    },
                    down:{
                        url: jsResource + "img/mobile/arrow_bottom.png",
                        sizeX:22,
                        sizeY:20,
                        posX:0,
                        posY:0
                    },
                    left:{
                        url: jsResource + "img/mobile/arrow_left.png",
                        sizeX:20,
                        sizeY:23,
                        posX:0,
                        posY:0
                    },
                    right:{
                        url: jsResource + "img/mobile/arrow_right.png",
                        sizeX:20,
                        sizeY:23,
                        posX:0,
                        posY:0
                    },
                    zoomIn:{
                        url: jsResource + "img/mobile/upsize.png",
                        push_url: jsResource + "img/mobile/upsize_p.png",
                        sizeX:48,
                        sizeY:29,
                        posX:0,
                        posY:0
                    },
                    zoomOut:{
                        url: jsResource + "img/mobile/downsize.png",
                        push_url: jsResource + "img/mobile/downsize_p.png",
                        sizeX:48,
                        sizeY:29,
                        posX:0,
                        posY:0
                    }
                }
        };

        this._compareData(obj);
    };
    _MapControl.prototype._compareData = function(obj){

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);
            if(!obj.Control[indexName]) continue;

            this.serviceObj.Control[indexName].url = obj.Control[indexName].url;
            this.serviceObj.Control[indexName].sizeX = obj.Control[indexName].sizeX;
            this.serviceObj.Control[indexName].sizeY = obj.Control[indexName].sizeY;
        }
    };
    _MapControl.prototype.init = function(map) {
        if(!map) return;

        this.map = map;

        this._positionSetting();
        this._layerSetting();
        this._eventSetting();
    };
    _MapControl.prototype._positionSetting = function() {
        this.centerPos = new SSize(Math.floor(this.map.viewSize.width/2), Math.floor(this.map.viewSize.height/2));

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);
            var objTarget = this.serviceObj.Control[indexName];

            switch(i){
                case this._BTN_UP_:
                    this.serviceObj.Control[indexName].posX = this.centerPos.width - Math.floor(objTarget.sizeX/2);
                    break;
                case this._BTN_DOWN_:
                    this.serviceObj.Control[indexName].posX = this.centerPos.width - Math.floor(objTarget.sizeX/2);
                    this.serviceObj.Control[indexName].posY = this.map.viewSize.height - objTarget.sizeY;
                    break;
                case this._BTN_LEFT_:
                    this.serviceObj.Control[indexName].posY = this.centerPos.height - Math.floor(objTarget.sizeY/2);
                    break;
                case this._BTN_RIGHT_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - objTarget.sizeX;
                    this.serviceObj.Control[indexName].posY = this.centerPos.height - Math.floor(objTarget.sizeY/2);
                    break;
                case this._BTN_ZOOMIN_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - (objTarget.sizeX+this.serviceObj.Control[this.getIndexName(i)].sizeX);
                    this.serviceObj.Control[indexName].posY = 0;
                    break;
                case this._BTN_ZOOMOUT_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - objTarget.sizeX;
                    this.serviceObj.Control[indexName].posY = 0;
                    break;
            }
        }
    };
    _MapControl.prototype._layerSetting = function() {
        this.divArray = new Array();
        this.buttonArray = new Array();

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);

            this.divArray.push(this.map.mkDiv(0));
            this.map.staticLayer.appendChild(this.divArray[i]);

            this.divArray[i].style.width = this.serviceObj.Control[indexName].sizeX + 'px';
            this.divArray[i].style.height = this.serviceObj.Control[indexName].sizeY + 'px';
            this.divArray[i].style.left = this.serviceObj.Control[indexName].posX + 'px';
            this.divArray[i].style.top = this.serviceObj.Control[indexName].posY + 'px';

            this.buttonArray.push(
                        _Image.create(
                                this.serviceObj.Control[indexName].url,
                                this.serviceObj.Control[indexName].sizeX,
                                this.serviceObj.Control[indexName].sizeY, 0, 0, 0
                        ));

            this.divArray[i].appendChild(this.buttonArray[i]);
            setCursor(this.buttonArray[i], "pointer");
        }
    };
    _MapControl.prototype._eventSetting = function() {
        var eventName = '';

        if (enum_BrowserType.IPhone || enum_BrowserType.Android) {
            eventName = "touchstart"
        }else{
            eventName = "click";
        }

        SEvent.attachDom(this.divArray[this._BTN_UP_],eventName,this,function(a){
            if (!a) a = window.event;

            this._mapTop();eventOverlap(a);
        });
        SEvent.attachDom(this.divArray[this._BTN_DOWN_],eventName,this,function(a){
            if (!a) a = window.event;
            this._mapDown();eventOverlap(a);
        });
        SEvent.attachDom(this.divArray[this._BTN_LEFT_],eventName,this,function(a){
            if (!a) a = window.event;
            this._mapLeft();eventOverlap(a);
        });
        SEvent.attachDom(this.divArray[this._BTN_RIGHT_],eventName,this,function(a){
            if (!a) a = window.event;
            this._mapRight();eventOverlap(a);
        });
        SEvent.attachDom(this.divArray[this._BTN_ZOOMIN_],eventName,this,function(a){
            if (!a) a = window.event;
            this._mapZoomIn();eventOverlap(a);
        });
        SEvent.attachDom(this.divArray[this._BTN_ZOOMOUT_],eventName,this,function(a){
            if (!a) a = window.event;
            this._mapZoomOut();eventOverlap(a);
        });
        SEvent.bind(this.map, "resize", this, this._resize);
    };
    _MapControl.prototype._resize = function() {
        this._positionSetting();

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);

            this.divArray[i].style.width = this.serviceObj.Control[indexName].sizeX + 'px';
            this.divArray[i].style.height = this.serviceObj.Control[indexName].sizeY + 'px';
            this.divArray[i].style.left = this.serviceObj.Control[indexName].posX + 'px';
            this.divArray[i].style.top = this.serviceObj.Control[indexName].posY + 'px';
        }
    };
    _MapControl.prototype._mapLeft = function() {
        var movePoint = this._moveRationX();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.x -= movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _MapControl.prototype._mapRight = function() {
        var movePoint = this._moveRationX();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.x += movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _MapControl.prototype._mapTop = function() {
        var movePoint = this._moveRationY();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.y += movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _MapControl.prototype._mapDown = function() {
        var movePoint = this._moveRationY();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.y -= movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _MapControl.prototype._mapZoomIn = function() {
        this.map.zoomIn();
        return false;
    };
    _MapControl.prototype._mapZoomOut = function() {
        this.map.zoomOut();
        return false;
    };
    _MapControl.prototype._moveRationX = function(){
        var pixelToCoordX = this.map.spec.distancePerPixel(this.map.getZoom())
                              * Math.floor(this.map.viewSize.width*this._MAP_MOVE_RATIO_);
        return pixelToCoordX;
    };
    _MapControl.prototype._moveRationY = function(){
        var pixelToCoordY = this.map.spec.distancePerPixel(this.map.getZoom())
                              * Math.floor(this.map.viewSize.height*this._MAP_MOVE_RATIO_);
        return pixelToCoordY;
    };
    _MapControl.prototype.getIndexName = function(index) {
        var indexName = '';

        switch(index){
        case this._BTN_UP_:
            indexName = 'up';
            break;
        case this._BTN_DOWN_:
            indexName = 'down';
            break;
        case this._BTN_LEFT_:
            indexName = 'left';
            break;
        case this._BTN_RIGHT_:
            indexName = 'right';
            break;
        case this._BTN_ZOOMIN_:
            indexName = 'zoomIn';
            break;
        case this._BTN_ZOOMOUT_:
            indexName = 'zoomOut';
            break;
        }
        return indexName
    };
    
    
    function _SeoulLogo(obj) {
        this._BTN_UP_ = 0;
        this._BTN_DOWN_ = 1;
        this._BTN_LEFT_ = 2;
        this._BTN_RIGHT_ = 3;
        this._BTN_ZOOMIN_ = 4;
        this._BTN_ZOOMOUT_ = 5;
        this._MAP_MOVE_RATIO_ = 0.3;
        this.map = null;
        this.divCount = 1;
        this.serviceObj = {
                Control:{
                    up:{
                       url: jsResource + "resource/staticLogo.png",
                       //url: "http://localhost:8081/smgis/js/map/resource/staticLogo.png",
                        sizeX:131,
                        sizeY:50,
                        posX:0,
                        posY:0
                    },
                    down:{
                        url: jsResource + "img/mobile/arrow_bottom.png",
                        sizeX:22,
                        sizeY:20,
                        posX:0,
                        posY:0
                    },
                    left:{
                        url: jsResource + "img/mobile/arrow_left.png",
                        sizeX:20,
                        sizeY:23,
                        posX:0,
                        posY:0
                    },
                    right:{
                        url: jsResource + "img/mobile/arrow_right.png",
                        sizeX:20,
                        sizeY:23,
                        posX:0,
                        posY:0
                    },
                    zoomIn:{
                        url: jsResource + "img/mobile/upsize.png",
                        push_url: jsResource + "img/mobile/upsize_p.png",
                        sizeX:48,
                        sizeY:29,
                        posX:0,
                        posY:0
                    },
                    zoomOut:{
                        url: jsResource + "img/mobile/downsize.png",
                        push_url: jsResource + "img/mobile/downsize_p.png",
                        sizeX:48,
                        sizeY:29,
                        posX:0,
                        posY:0
                    }
                }
        };

        //this._compareData(obj);
    };
    _SeoulLogo.prototype._compareData = function(obj){

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);
            //if(!obj.Control[indexName]) continue;

            this.serviceObj.Control[indexName].url = obj.Control[indexName].url;
            this.serviceObj.Control[indexName].sizeX = obj.Control[indexName].sizeX;
            this.serviceObj.Control[indexName].sizeY = obj.Control[indexName].sizeY;
        }
    };
    _SeoulLogo.prototype.init = function(map) {
        if(!map) return;

        this.map = map;

        this._positionSetting();
        this._layerSetting();
        //this._eventSetting();
    };
    _SeoulLogo.prototype._positionSetting = function() {
        this.centerPos = new SSize(Math.floor(this.map.viewSize.width/2), Math.floor(this.map.viewSize.height/2));

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);
            var objTarget = this.serviceObj.Control[indexName];

            switch(i){
                case this._BTN_UP_:
                    //this.serviceObj.Control[indexName].posX = this.centerPos.width - Math.floor(objTarget.sizeX/2);
                	this.serviceObj.Control[indexName].posX = 0;
                    break;
                case this._BTN_DOWN_:
                    this.serviceObj.Control[indexName].posX = this.centerPos.width - Math.floor(objTarget.sizeX/2);
                    this.serviceObj.Control[indexName].posY = this.map.viewSize.height - objTarget.sizeY;
                    break;
                case this._BTN_LEFT_:
                    this.serviceObj.Control[indexName].posY = this.centerPos.height - Math.floor(objTarget.sizeY/2);
                    break;
                case this._BTN_RIGHT_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - objTarget.sizeX;
                    this.serviceObj.Control[indexName].posY = this.centerPos.height - Math.floor(objTarget.sizeY/2);
                    break;
                case this._BTN_ZOOMIN_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - (objTarget.sizeX+this.serviceObj.Control[this.getIndexName(i)].sizeX);
                    this.serviceObj.Control[indexName].posY = 0;
                    break;
                case this._BTN_ZOOMOUT_:
                    this.serviceObj.Control[indexName].posX = this.map.viewSize.width - objTarget.sizeX;
                    this.serviceObj.Control[indexName].posY = 0;
                    break;
            }
        }
    };
    _SeoulLogo.prototype._layerSetting = function() {
        this.divArray = new Array();
        this.buttonArray = new Array();

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);

            this.divArray.push(this.map.mkDiv(0));
            this.map.staticLayer.appendChild(this.divArray[i]);

            this.divArray[i].style.width = this.serviceObj.Control[indexName].sizeX + 'px';
            this.divArray[i].style.height = this.serviceObj.Control[indexName].sizeY + 'px';
            this.divArray[i].style.left = this.serviceObj.Control[indexName].posX + 'px';
            this.divArray[i].style.top = this.serviceObj.Control[indexName].posY + 'px';

            this.buttonArray.push(
                        _Image.create(
                                this.serviceObj.Control[indexName].url,
                                this.serviceObj.Control[indexName].sizeX,
                                this.serviceObj.Control[indexName].sizeY, 0, 0, 0
                        ));

            this.divArray[i].appendChild(this.buttonArray[i]);
            setCursor(this.buttonArray[i], "pointer");
        }
    };
    _SeoulLogo.prototype._resize = function() {
        this._positionSetting();

        for(var i=0; i<this.divCount; i++){
            var indexName = this.getIndexName(i);

            this.divArray[i].style.width = this.serviceObj.Control[indexName].sizeX + 'px';
            this.divArray[i].style.height = this.serviceObj.Control[indexName].sizeY + 'px';
            this.divArray[i].style.left = this.serviceObj.Control[indexName].posX + 'px';
            this.divArray[i].style.top = this.serviceObj.Control[indexName].posY + 'px';
        }
    };
    _SeoulLogo.prototype._mapLeft = function() {
        var movePoint = this._moveRationX();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.x -= movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _SeoulLogo.prototype._mapRight = function() {
        var movePoint = this._moveRationX();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.x += movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _SeoulLogo.prototype._mapTop = function() {
        var movePoint = this._moveRationY();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.y += movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _SeoulLogo.prototype._mapDown = function() {
        var movePoint = this._moveRationY();
        var mapMovePoint = this.map.getCenter();
        mapMovePoint.y -= movePoint;
        this.map.setCenter(mapMovePoint);
        return false;
    };
    _SeoulLogo.prototype._mapZoomIn = function() {
        this.map.zoomIn();
        return false;
    };
    _SeoulLogo.prototype._mapZoomOut = function() {
        this.map.zoomOut();
        return false;
    };
    _SeoulLogo.prototype._moveRationX = function(){
        var pixelToCoordX = this.map.spec.distancePerPixel(this.map.getZoom())
                              * Math.floor(this.map.viewSize.width*this._MAP_MOVE_RATIO_);
        return pixelToCoordX;
    };
    _SeoulLogo.prototype._moveRationY = function(){
        var pixelToCoordY = this.map.spec.distancePerPixel(this.map.getZoom())
                              * Math.floor(this.map.viewSize.height*this._MAP_MOVE_RATIO_);
        return pixelToCoordY;
    };
    _SeoulLogo.prototype.getIndexName = function(index) {
        var indexName = '';

        switch(index){
        case this._BTN_UP_:
            indexName = 'up';
            break;
        case this._BTN_DOWN_:
            indexName = 'down';
            break;
        case this._BTN_LEFT_:
            indexName = 'left';
            break;
        case this._BTN_RIGHT_:
            indexName = 'right';
            break;
        case this._BTN_ZOOMIN_:
            indexName = 'zoomIn';
            break;
        case this._BTN_ZOOMOUT_:
            indexName = 'zoomOut';
            break;
        }
        return indexName
    };
    

    window.SMap = _SMap;
    window.SImage = _Image;
    window.SEvent = new _Event;
    window.SPoint = _SPoint;
    window.SSize = _Size;
    window.SIcon = _icon;
    window.SMark = _mark;
    window.SContent = _Content;
    window.SPolyline = _polyline;
    window.SScale = _nScale;
    window.SZoomControl = _zoomcontrol;
    window.MiniMap = _miniMap;
    window.SInfoWindow = _infowindow;
    window.SStaticOverlay = _staticOverlay;
    window.SDynamicOverlay = _dynamicOverlay;
    window.SRectangle = _rectangle;
    window.SCircle = _circle;
    window.SSCircle = _SCircle;
    window.SSimpleMap = _simpleMap;
    window.SMiniMap = _miniMap;
    window.SMousePointer = _mousePointerPos;
    window.SCommon = _SCommon;
    window.SMapControl = _MapControl;
    window.SSeoulLogo = _SeoulLogo;

    function GeoExtendedAPI(){
        this.openApiUrl = null;
        this.isExecute = true;
        this.callBackFuncName = null;
    };

    GeoExtendedAPI.prototype = {
        setOpenApiURL:function(_openApiUrl){
            this.openApiUrl = _openApiUrl;
        },
        execute: function(){
            if (this.isExecute) {
                var head_id = document.getElementsByTagName("head").item(0);
                var script_id = document.createElement("script");
                script_id.setAttribute("type", "text/javascript");
                script_id.setAttribute("id", "__GeoExtededApi");
                script_id.setAttribute("src", this.openApiUrl + '&cbf=' + this.callBackFuncName);
                head_id.appendChild(script_id);
            }
        }
    };

    function PoiSearch(_openApiUrl){
        this.callBackFuncName = 'returnPoiSearch';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    PoiSearch.prototype = new GeoExtendedAPI();

    function Poicategory(_openApiUrl){
        this.callBackFuncName = 'returnPoicategory';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    Poicategory.prototype = new GeoExtendedAPI();

    function Administration(_openApiUrl){
        this.callBackFuncName = 'returnAdministration';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    Administration.prototype = new GeoExtendedAPI();

    function Geocoding(_openApiUrl){
        this.callBackFuncName = 'returnGeocoding';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    Geocoding.prototype = new GeoExtendedAPI();

    function ReverseGeocoding(_openApiUrl){
        this.callBackFuncName = 'returnReverseGeocoding';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    ReverseGeocoding.prototype = new GeoExtendedAPI();

    function PathSearch(_openApiUrl){
        this.callBackFuncName = 'returnPathSearch';

        if(_openApiUrl!=null && _openApiUrl!=''){
            this.openApiUrl = _openApiUrl;
            this.isExecute = true;
        }
        else{
            this.openApiUrl = '';
            this.isExecute = false;
        }
    };
    PathSearch.prototype = new GeoExtendedAPI();

    window.GeoExtendedAPI = GeoExtendedAPI;
    window.GeoExtendedAPI.PoiSearch = PoiSearch;
    window.GeoExtendedAPI.Poicategory = Poicategory;
    window.GeoExtendedAPI.Administration = Administration;
    window.GeoExtendedAPI.Geocoding = Geocoding;
    window.GeoExtendedAPI.ReverseGeocoding = ReverseGeocoding;
    window.GeoExtendedAPI.PathSearch = PathSearch;
};

Map();

function SXmlhttp() {
    this.type = 'xml';
    this.callback = nullFunc;
    this.aysnc = false;
};
function SXmlhttp(async) {
    this.type = 'xml';
    this.callback = nullFunc;
    this.async = async;

    this.nocache = 0;
};
SXmlhttp.prototype.setType = function(type) {
    if (type == 'xml') {
        this.type = 'xml';
    } else {
        this.type = 'text';
    }
};
SXmlhttp.prototype.setCacheAction = function(nocache) {
    this.nocache = nocache;
};
SXmlhttp.prototype.loadhttp = function(url, CallbackFunc)
{
    try
    {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e)
    {
        try
        {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E)
        {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest!='undefined')
    {
        xmlhttp = new XMLHttpRequest();
    }

    var respons = this.respons;
    var arr = new Array();
    arr.push(xmlhttp);
    arr.push(this.type);
    arr.push(CallbackFunc);

    for ( var i = 2; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }

    xmlhttp.open('GET', url, this.async);
    xmlhttp.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");

    if (this.nocache) {
        xmlhttp.setRequestHeader("If-Modified-Since", "0");
    }

    if (this.async)
    {
        xmlhttp.onreadystatechange = function() {
            respons.apply(this, arr);
        };
    }

    xmlhttp.send(null);

    if (this.async == false) {
        return ((this.type == 'text') ? xmlhttp.responseText : xmlhttp.responseXML);
    }
};
SXmlhttp.prototype.respons = function(_httpObj, resType, CallbackFunc) {
    if (_httpObj == null || _httpObj.readyState != 4)
        return;
    if (_httpObj.responseText.length == 0)
        return;

    var arr = new Array();
    if (resType == 'text') {
        arr.push(_httpObj.responseText);
    } else {
        arr.push(_httpObj.responseXML);
    }

    for ( var i = 3; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }

    if (_httpObj.status != 200) {
        arr[0] = null;
    }

    CallbackFunc.apply(this, arr);
};
function hookEvent(element, eventName, callback)
{
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener){
    element.addEventListener(eventName, callback, false);
  }
  else if(element.attachEvent)
    element.attachEvent("on" + eventName, callback);
};
function unhookEvent(element, eventName, callback){
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.removeEventListener)
    element.removeEventListener(eventName, callback, false);
  else if(element.detachEvent)
    element.detachEvent("on" + eventName, callback);
};
function cancelEvent(e){
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
};
function Position(x, y){
  this.X = x;
  this.Y = y;

    this.Add = function(val){
        var newPos = new Position(this.X, this.Y);
        if(val != null){
              if(!isNaN(val.X))
                newPos.X += val.X;
              if(!isNaN(val.Y))
                newPos.Y += val.Y
            }
        return newPos;
      };

    this.Subtract = function(val){
        var newPos = new Position(this.X, this.Y);
        if(val != null){
              if(!isNaN(val.X))
                newPos.X -= val.X;
              if(!isNaN(val.Y))
                newPos.Y -= val.Y
        }
        return newPos;
      };

      this.Min = function(val){
        var newPos = new Position(this.X, this.Y);
        if(val == null)
              return newPos;

        if(!isNaN(val.X) && this.X > val.X)
              newPos.X = val.X;
        if(!isNaN(val.Y) && this.Y > val.Y)
              newPos.Y = val.Y;
        return newPos;
    };

      this.Max = function(val){
        var newPos = new Position(this.X, this.Y);
        if(val == null)
              return newPos;

        if(!isNaN(val.X) && this.X < val.X)
              newPos.X = val.X;
        if(!isNaN(val.Y) && this.Y < val.Y)
              newPos.Y = val.Y;

        return newPos;
      };

      this.Bound = function(lower, upper){
        var newPos = this.Max(lower);
        return newPos.Min(upper);
      };

      this.Check = function(){
        var newPos = new Position(this.X, this.Y);
        if(isNaN(newPos.X))
              newPos.X = 0;
        if(isNaN(newPos.Y))
              newPos.Y = 0;
        return newPos;
      };

      this.Apply = function(element){
        if(typeof(element) == "string")
              element = document.getElementById(element);
        if(element == null)
              return;
        if(!isNaN(this.X))
              element.style.left = this.X + 'px';
        if(!isNaN(this.Y))
              element.style.top = this.Y + 'px';
      };
};

function absoluteCursorPostion(eventObj){
    eventObj = eventObj ? eventObj : window.event;

      if(isNaN(window.scrollX)){
        return new Position(eventObj.clientX + document.documentElement.scrollLeft + document.body.scrollLeft,
              eventObj.clientY + document.documentElement.scrollTop + document.body.scrollTop);
      }else{
        return new Position(eventObj.clientX + window.scrollX, eventObj.clientY + window.scrollY);
      }
};

function dragObject(element, attachElement, lowerBound, upperBound, startCallback, moveCallback, endCallback, attachLater, applyObj){
    if(typeof(element) == "string"){
        element = document.getElementById(element);
    }

    if(element == null){
        return;
    }

    if(lowerBound != null && upperBound != null){
        var temp = lowerBound.Min(upperBound);
        upperBound = lowerBound.Max(upperBound);
        lowerBound = temp;
    }

    var cursorStartPos = null;
    var elementStartPos = null;
    var dragging = false;
    var listening = false;
    var disposed = false;

    function dragStart(eventObj){
        if(dragging || !listening || disposed) return;
        dragging = true;

        if(startCallback != null){
            startCallback.apply(applyObj, new Array(eventObj, element));
        }

        cursorStartPos = absoluteCursorPostion(eventObj);
        elementStartPos = new Position(parseInt(element.style.left), parseInt(element.style.top));

        elementStartPos = elementStartPos.Check();

        hookEvent(document, "mousemove", dragGo);
        hookEvent(document, "mouseup", dragStopHook);

        return cancelEvent(eventObj);
    };

      function dragGo(eventObj){
        if(!dragging || disposed) return;

        var newPos = absoluteCursorPostion(eventObj);
        newPos = newPos.Add(elementStartPos).Subtract(cursorStartPos);
        newPos = newPos.Bound(lowerBound, upperBound);
        newPos.Apply(element);
        if(moveCallback != null){
            moveCallback.apply(applyObj, new Array(newPos, element));
        }

        return cancelEvent(eventObj);
    };

    function dragStopHook(eventObj){
        dragStop();
        return cancelEvent(eventObj);
    };

    function dragStop(){
        if(!dragging || disposed){
            return;
        }
        unhookEvent(document, "mousemove", dragGo);
        unhookEvent(document, "mouseup", dragStopHook);
        cursorStartPos = null;
        elementStartPos = null;

        if(endCallback != null){
            endCallback(applyObj);
        }

        dragging = false;
    };

    this.Dispose = function(){
        if(disposed) return;
        this.StopListening(true);
        element = null;
        attachElement = null;
        lowerBound = null;
        upperBound = null;
        startCallback = null;
        moveCallback = null;
        endCallback = null;
        disposed = true;
      };

    this.StartListening = function(){
        if(listening || disposed) return;
        listening = true;
        hookEvent(attachElement, "mousedown", dragStart);
      };

      this.StopListening = function(stopCurrentDragging){
        if(!listening || disposed){
            return;
        }
        unhookEvent(attachElement, "mousedown", dragStart);
        listening = false;

        if(stopCurrentDragging && dragging){
            dragStop();
        }
    };

    this.IsDragging = function(){ return dragging; };
    this.IsListening = function() { return listening; };
    this.IsDisposed = function() { return disposed; };

    if(typeof(attachElement) == "string"){
            attachElement = document.getElementById(attachElement);
        }
        if(attachElement == null){
            attachElement = element;
        }

        if(!attachLater){
            this.StartListening();
        }
};

Map = function(){
	this.map = new Object();
};   
	
Map.prototype = {   
		put : function(key, value){   
			this.map[key] = value;
		},   
		get : function(key){   
			return this.map[key];
		},
		containsKey : function(key){    
			return key in this.map;
		},
		containsValue : function(value){    
			for(var prop in this.map){
				if(this.map[prop] == value) return true;
			}
			return false;
		},
		isEmpty : function(key){    
			return (this.size() == 0);
		},
		clear : function(){   
			for(var prop in this.map){
				delete this.map[prop];
			}
		},
		remove : function(key){    
			delete this.map[key];
		},
		keys : function(){   
			var keys = new Array();   
			for(var prop in this.map){   
				keys.push(prop);
			}   
			return keys;
		},
		values : function(){   
			var values = new Array();   
			for(var prop in this.map){   
				values.push(this.map[prop]);
			}   
			return values;
		},
		size : function(){
			var count = 0;
			for (var prop in this.map) {
				count++;
			}
			return count;
		}
};

TileMapInfos = function(apiKey){
	this.apiKey = apiKey;
	this.tileMapsInfos = new Object; 
	this.init();
	this.mapLoadFunc = null;
	
	if (!this.apiKey)
		SMap = null;
	
	jsMapUrl = jsMapUrl + this.apiKey + '&URL=';
};

TileMapInfos.prototype = {
		init: function(reqTileMapInfoName, funcMapLoad){
			/*var url = 'http://14.63.217.215:8080/MapServer/Service?req='
		    var param = "{'header':{'code':100,'serviceName':'TileMapInfos','format':'JSON'},'tileMapInfosReq':{'tileMapInfoName':['kor_normal','eng_normal']}}";
		    var encodeUrl = url + escape(param) + '&callback=callBackUrl';
			
		    var script= document.createElement('script');
		    script.type= 'text/javascript';
		    script.src= encodeUrl;

		    //document.writeln("<script language='javascript' src=\"" + encodeUrl + "\">");
		    document.getElementsByTagName('head')[0].appendChild(script);
		    this.mapLoadFunc = funcMapLoad;*/
			this.cbLoadInfo({"header":{"code":100,"serviceName":"TileMapInfos","format":"JSON"},"tileMapInfos":{"tileMapInfo":[{"name":"kor_normal","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=kor_normal/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":10,"scale":0.264583862501058},{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"eng_normal","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=eng_normal/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":10,"scale":0.264583862501058},{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"jan_normal","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=jan_normal/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":10,"scale":0.264583862501058},{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"chinag_normal","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=chinag_normal/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":10,"scale":0.264583862501058},{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"chinab_normal","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=chinab_normal/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":10,"scale":0.264583862501058},{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"kor_air","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=kor_air/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"eng_air","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=eng_air/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"jan_air","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=jan_air/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"chinag_air","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=chinag_air/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]},{"name":"chinab_air","url":"http://98.33.0.82:5556/MapAppServer/Service?timg=chinab_air/","mbr":{"minx":95646.1421300001,"miny":354131.618785,"maxx":287635.88007,"maxy":541839.321715},"imageSize":256,"originX":95646.1421300001,"originY":354131.618785,"levelInfos":[{"levelId":9,"scale":0.661459656252646},{"levelId":8,"scale":1.32291931250529},{"levelId":7,"scale":2.64583862501058},{"levelId":6,"scale":3.96875793751588},{"levelId":5,"scale":7.93751587503175},{"levelId":4,"scale":13.2291931250529},{"levelId":3,"scale":26.4583862501058},{"levelId":2,"scale":39.6875793751588},{"levelId":1,"scale":79.3751587503175},{"levelId":0,"scale":198.437896875794}]}]}} );
		},
	    cbLoadInfo: function(data){
	    	var rtnTileMapInfos = data.tileMapInfos;
	    	
	    	if(!rtnTileMapInfos.tileMapInfo || rtnTileMapInfos.tileMapInfo.length == 0)
	    		return;
	    	
	    	for(var i=0; i<rtnTileMapInfos.tileMapInfo.length; i++){
	    		var tileName = rtnTileMapInfos.tileMapInfo[i].name;
	    		
	    		//this.tileMapsInfos.put(tileName, rtnTileMapInfos.tileMapInfo[i]); 
	    		this.tileMapsInfos[tileName] = rtnTileMapInfos.tileMapInfo[i];
	    	}
	    	
	    	//this.mapLoadFunc();
	    },
	    executeBatch: function(){
	    	var url = "/admin/config/course_batch_step1_exceuteBatch_ajax.do";
            executeAjaxArgument(url, 'json', true, null, this._responseBatchExecuteAjax, null, this);
	    },
	    _responseBatchExecuteAjax: function(data){
	    	location.href='/admin/config/course_batch_step2.do';	    	
	    }
};
/*


function callBackUrl(data){
	tileMapInfo.cbLoadInfo(data);
}*/

/*var url = 'http://14.63.217.215:8080/MapServer/Service?req='
var param = "{'header':{'code':100,'serviceName':'TileMapInfos','format':'JSON'},'tileMapInfosReq':{'tileMapInfoName':['kor_normal','eng_normal']}}";
var encodeUrl = url + escape(param) + '&callback=callBackUrl';

var script= document.createElement('script');
script.type= 'text/javascript';
script.src= encodeUrl;*/

//document.writeln("<script language='javascript' src=\"" + encodeUrl + "\">");
//document.getElementsByTagName('head')[0].appendChild(script);

