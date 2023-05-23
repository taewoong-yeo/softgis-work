package softGis.scheduler;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

@Component
public class Scheduler {
	
	@Resource(name="schedulerService")
	SchedulerService service;
	
	@Value("${api.encod.serv.key}") 
	private String apiEncodServKey;
	
	// 초  분  시  일  월  요일
	
	//하루
	/*@Scheduled(cron = "0 18 11 * * *")
	public void scheduledDay() {
		scheduledTest();
	}*/
	
	public final int numOfRows = 100;
	
	String TN_PUBR_PUBLIC_VILAGE_ENTRPRS = "http://api.data.go.kr/openapi/tn_pubr_public_vilage_entrprs_api";						//전국마을기업표준데이터
	String TN_PUBR_PUBLIC_TOWNG_VHCLE_DPSTRY = "http://api.data.go.kr/openapi/tn_pubr_public_towng_vhcle_dpstry_api";				//전국견인차량보관소표준데이터
	String TN_PUBR_PUBLIC_PBLFCLT_OPN_INFO = "http://api.data.go.kr/openapi/tn_pubr_public_pblfclt_opn_info_api";					//전국공공시설개방정보표준데이터
	String TN_PUBR_PUBLIC_LBRRY = "http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api";											//전국도서관표준데이터
	String TN_PUBR_PUBLIC_BRIDGE = "http://api.data.go.kr/openapi/tn_pubr_public_bridge_api";										//전국교량표준데이터
	String TN_PUBR_PUBLIC_TRAFFIC_LIGHT = "http://api.data.go.kr/openapi/tn_pubr_public_traffic_light_api";							//전국신호등표준데이터
	String TN_PUBR_PUBLIC_CROSSWALK = "http://api.data.go.kr/openapi/tn_pubr_public_crosswalk_api";									//전국횡단보도표준데이터
	String TN_PUBR_PUBLIC_DROWSY_SHELTER = "http://api.data.go.kr/openapi/tn_pubr_public_drowsy_shelter_api";						//전국졸음쉼터표준데이터
	String TN_PUBR_PRKPLCE_INFO = "http://api.data.go.kr/openapi/tn_pubr_prkplce_info_api";											//전국주차장정보표준데이터
	String TN_PUBR_PUBLIC_BCYCL_LEND = "http://api.data.go.kr/openapi/tn_pubr_public_bcycl_lend_api";								//전국자전거대여소표준데이터
	String TN_PUBR_PUBLIC_CAR_INSPOFC = "http://api.data.go.kr/openapi/tn_pubr_public_car_inspofc_api";								//전국자동차검사소표준데이터
	String TN_PUBR_PUBLIC_TUNNEL = "http://api.data.go.kr/openapi/tn_pubr_public_tunnel_api";										//전국도로터널정보표준데이터
	String TN_PUBR_PUBLIC_CAR_RENTAL = "http://api.data.go.kr/openapi/tn_pubr_public_car_rental_api";								//전국렌터카업체정보표준데이터
	String TN_PUBR_PUBLIC_ROAD_DRCBRD_EXAMIN = "http://api.data.go.kr/openapi/tn_pubr_public_road_drcbrd_examin_api";				//전국도로안내표지표준데이터
	String TN_PUBR_PUBLIC_ONE_WAY_STREET = "http://api.data.go.kr/openapi/tn_pubr_public_one_way_street_api";						//전국일방통행도로표준데이터
	String TN_PUBR_PUBLIC_UNMANNED_TRAFFIC_CAMERA = "http://api.data.go.kr/openapi/tn_pubr_public_unmanned_traffic_camera_api";		//전국무인교통단속카메라표준데이터
	String TN_PUBR_PUBLIC_PEDESTRIAN_PRIORITY_ROAD = "http://api.data.go.kr/openapi/tn_pubr_public_pedestrian_priority_road_api";	//전국보행자우선도로표준데이터
	String TN_PUBR_PUBLIC_AUTO_MAINTENANCE_COMPANY = "http://api.data.go.kr/openapi/tn_pubr_public_auto_maintenance_company_api";	//전국자동차정비업체표준데이터
	//String CRDNTPRXMTSTTNLIST = "http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList";	//전국버스정류소표준데이터	//데이터 없음
	String TN_PUBR_PUBLIC_BIKE_ROAD = "http://api.data.go.kr/openapi/tn_pubr_public_bike_road_api";									//전국자전거도로표준데이터
	String TN_PUBR_PUBLIC_PEDESTRIAN_ROAD = "http://api.data.go.kr/openapi/tn_pubr_public_pedestrian_road_api";						//전국보행자전용도로표준데이터
	String TN_PUBR_PUBLIC_RESIDNT_PRIOR_PARKNG = "http://api.data.go.kr/openapi/tn_pubr_public_residnt_prior_parkng_api";			//전국거주자우선주차정보표준데이터
	String TN_PUBR_PUBLIC_BY_BUS_ONLY = "http://api.data.go.kr/openapi/tn_pubr_public_by_bus_only_api";								//전국버스전용차로정보표준데이터
	String TN_PUBR_PUBLIC_SMART_STREETLIGHT = "http://api.data.go.kr/openapi/tn_pubr_public_smart_streetlight_api";					//전국스마트가로등표준데이터
	//String TN_PUBR_PUBLIC_LOCAL_FOOD = "http://api.data.go.kr/openapi/tn_pubr_public_local_food_api";								//전국로컬푸드인증정보표준데이터 //위치 데이터 없음
	String TN_PUBR_PUBLIC_FRCN_RENT_INFO = "http://api.data.go.kr/openapi/tn_pubr_public_frcn_rent_info_api";						//전국농기계임대정보표준데이터
	String TN_PUBR_PUBLIC_TRDIT_MRKT = "http://api.data.go.kr/openapi/tn_pubr_public_trdit_mrkt_api";								//전국전통시장표준데이터
	String TN_PUBR_PUBLIC_RCRFRST = "http://api.data.go.kr/openapi/tn_pubr_public_rcrfrst_api";										//전국휴양림표준데이터
	String TN_PUBR_PUBLIC_TRRSRT = "http://api.data.go.kr/openapi/tn_pubr_public_trrsrt_api";										//전국관광지정보표준데이터
	String TN_PUBR_PUBLIC_CTY_PARK_INFO = "http://api.data.go.kr/openapi/tn_pubr_public_cty_park_info_api";							//전국도시공원정보표준데이터
	String TN_PUBR_PUBLIC_PBLPRFR_EVENT_INFO = "http://api.data.go.kr/openapi/tn_pubr_public_pblprfr_event_info_api";				//전국공연행사정보표준데이터
	String TN_PUBR_PUBLIC_TRSMIC = "http://api.data.go.kr/openapi/tn_pubr_public_trsmic_api";										//전국관광안내소표준데이터
	String TN_PUBR_PUBLIC_AREA_SPCLIZ_STRET = "http://api.data.go.kr/openapi/tn_pubr_public_area_spcliz_stret_api";					//전국지역특화거리표준데이터
	String TN_PUBR_PUBLIC_STTREE_STRET = "http://api.data.go.kr/openapi/tn_pubr_public_sttree_stret_api";							//전국가로수길정보표준데이터
	String TN_PUBR_PUBLIC_FRHL_EXPRN_VILAGE = "http://api.data.go.kr/openapi/tn_pubr_public_frhl_exprn_vilage_api";					//전국농어촌체험휴양마을표준데이터
	String TN_PUBR_PUBLIC_MUSEUM_ARTGR_INFO = "http://api.data.go.kr/openapi/tn_pubr_public_museum_artgr_info_api";					//전국박물관미술관정보표준데이터
	String TN_PUBR_PUBLIC_IMBCLTY_CNTER = "http://api.data.go.kr/openapi/tn_pubr_public_imbclty_cnter_api";							//전국치매센터표준데이터
	String TN_PUBR_PUBLIC_HP_CNTER = "http://api.data.go.kr/openapi/tn_pubr_public_hp_cnter_api";							 		//전국건강증진센터표준데이터
	//String HEATWAVESHELTERLIST2 = "http://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2";						//전국무더위쉼터표준데이터  //데이터 없음
	//String TN_PUBR_PUBLIC_HL_CNTER = "http://api.data.go.kr/openapi/tn_pubr_public_hl_cnter_api";									//전국건강생활지원센터표준데이터  //데이터 없음
	String TN_PUBR_PUBLIC_CHILD_PRTC_ZN = "http://api.data.go.kr/openapi/tn_pubr_public_child_prtc_zn_api";							//전국어린이보호구역표준데이터
	String TN_PUBR_PUBLIC_PRHSMK_ZN = "http://api.data.go.kr/openapi/tn_pubr_public_prhsmk_zn_api";									//전국금연구역표준데이터
	String TN_PUBR_PUBLIC_RUSE_CNTER = "http://api.data.go.kr/openapi/tn_pubr_public_ruse_cnter_api";								//전국재활용센터표준데이터
	String TN_PUBR_PUBLIC_FREE_MLSV = "http://api.data.go.kr/openapi/tn_pubr_public_free_mlsv_api";									//전국무료급식소표준데이터
	String TN_PUBR_PUBLIC_ODSNPVLTRTSLCTN_OFFIC = "http://api.data.go.kr/openapi/tn_pubr_public_odsnpvltrtslctn_offic_api";			//전국경로우대지정업소표준데이터
	String TN_PUBR_PUBLIC_CHIL_WLFARE_MLSV = "http://api.data.go.kr/openapi/tn_pubr_public_chil_wlfare_mlsv_api";					//전국아동복지급식정보표준데이터
	String TN_PUBR_PUBLIC_OLDNDDSPSNPRT_CAREA = "http://api.data.go.kr/openapi/tn_pubr_public_oldnddspsnprt_carea_api";				//전국노인장애인보호구역표준데이터
	String TN_PUBR_PUBLIC_ELECTR_WHLCHAIRHGH_SPDCHRGR = "http://api.data.go.kr/openapi/tn_pubr_public_electr_whlchairhgh_spdchrgr_api";		//전국전동휠체어급속충전기표준데이터
	String TN_PUBR_PUBLIC_FOOD_TRUCK_PERMIT_AREA = "http://api.data.go.kr/openapi/tn_pubr_public_food_truck_permit_area_api";				//전국푸드트럭허가구역표준데이터
	//String TN_PUBR_PUBLIC_FFUS_WTRCNS = "http://api.data.go.kr/openapi/tn_pubr_public_ffus_wtrcns_api";							//전국소방용수시설표준데이터	//데이터 없음
	String TN_PUBR_PUBLIC_SCRTY_LMP = "http://api.data.go.kr/openapi/tn_pubr_public_scrty_lmp_api";				    				//전국보안등정보표준데이터
	String UNDERGROUNDSAFETYINFO = "http://apis.data.go.kr/1611000/undergroundsafetyinfo";											//전국지반침하정보표준데이터
	String TN_PUBR_PUBLIC_FEMALE_SAFETY_HDRYCSTDYPLACE = "http://api.data.go.kr/openapi/tn_pubr_public_female_safety_hdrycstdyplace_api";	//전국여성안심택배함표준데이터
	//String TSUNAMISHELTER1LIST = "http://apis.data.go.kr/1741000/TsunamiShelter3/getTsunamiShelter1List";							//전국지진해일긴급대피장소표준데이터 //데이터 없음
	String TN_PUBR_PUBLIC_FEMALE_SAFETY_PRTCHOUSE = "http://api.data.go.kr/openapi/tn_pubr_public_female_safety_prtchouse_api";		//전국여성안심지킴이집표준데이터
	String TN_PUBR_PUBLIC_FGTCAR_PRKAREA = "http://api.data.go.kr/openapi/tn_pubr_public_fgtcar_prkarea_api";						//전국소방자동차전용구역표준데이터
	//String AREA1LIST = "http://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake2/getArea1List";							//전국지진옥외대피장소표준데이터 //데이터 없음
	String TN_PUBR_PUBLIC_SMALL_PBLFCLT_RISK_APPN = "http://api.data.go.kr/openapi/tn_pubr_public_small_pblfclt_risk_appn_api";		//전국소규모공공시설위험지정정보표준데이터
	String SHELTERINFO = "http://apis.data.go.kr/1543061/animalShelterSrvc/shelterInfo";											//전국동물보호센터정보표준데이터
	String TN_PUBR_PUBLIC_WLRES_CNTER = "http://api.data.go.kr/openapi/tn_pubr_public_wlres_cnter_api";			    				//전국야생동물구조센터정보표준데이터

	//테스트용
	//@Scheduled(cron = "0 0 0 1 * *")	//매월 1일
	@Scheduled(cron = "30 26 21 * * *")
	                // 초    시  일  월  요일
	public void scheduledTest() {
		try {
			/*
			getScheduleData(TN_PUBR_PUBLIC_VILAGE_ENTRPRS);
			getScheduleData(TN_PUBR_PUBLIC_TOWNG_VHCLE_DPSTRY);
			getScheduleData(TN_PUBR_PUBLIC_PBLFCLT_OPN_INFO);
			getScheduleData(TN_PUBR_PUBLIC_LBRRY);
			getScheduleData(TN_PUBR_PUBLIC_BRIDGE);
			getScheduleData(TN_PUBR_PUBLIC_TRAFFIC_LIGHT);
			getScheduleData(TN_PUBR_PUBLIC_CROSSWALK);
			getScheduleData(TN_PUBR_PUBLIC_DROWSY_SHELTER);
			getScheduleData(TN_PUBR_PRKPLCE_INFO);
			getScheduleData(TN_PUBR_PUBLIC_BCYCL_LEND);
			getScheduleData(TN_PUBR_PUBLIC_CAR_INSPOFC);
			getScheduleData(TN_PUBR_PUBLIC_TUNNEL);
			getScheduleData(TN_PUBR_PUBLIC_CAR_RENTAL);
			getScheduleData(TN_PUBR_PUBLIC_ROAD_DRCBRD_EXAMIN);
			getScheduleData(TN_PUBR_PUBLIC_ONE_WAY_STREET);
			getScheduleData(TN_PUBR_PUBLIC_UNMANNED_TRAFFIC_CAMERA);
			getScheduleData(TN_PUBR_PUBLIC_PEDESTRIAN_PRIORITY_ROAD);
			getScheduleData(TN_PUBR_PUBLIC_AUTO_MAINTENANCE_COMPANY);
			//getScheduleData(CRDNTPRXMTSTTNLIST);							//데이터 없음
			getScheduleData(TN_PUBR_PUBLIC_BIKE_ROAD);
			getScheduleData(TN_PUBR_PUBLIC_PEDESTRIAN_ROAD);
			getScheduleData(TN_PUBR_PUBLIC_RESIDNT_PRIOR_PARKNG);
			getScheduleData(TN_PUBR_PUBLIC_BY_BUS_ONLY);			
			getScheduleData(TN_PUBR_PUBLIC_SMART_STREETLIGHT);
			//getScheduleData(TN_PUBR_PUBLIC_LOCAL_FOOD); 					//위치 데이터 없음
			getScheduleData(TN_PUBR_PUBLIC_FRCN_RENT_INFO);
			getScheduleData(TN_PUBR_PUBLIC_TRDIT_MRKT);
			getScheduleData(TN_PUBR_PUBLIC_RCRFRST);
			getScheduleData(TN_PUBR_PUBLIC_TRRSRT);
			getScheduleData(TN_PUBR_PUBLIC_CTY_PARK_INFO);
			getScheduleData(TN_PUBR_PUBLIC_PBLPRFR_EVENT_INFO);
			getScheduleData(TN_PUBR_PUBLIC_TRSMIC);
			getScheduleData(TN_PUBR_PUBLIC_AREA_SPCLIZ_STRET);
			getScheduleData(TN_PUBR_PUBLIC_STTREE_STRET);
			getScheduleData(TN_PUBR_PUBLIC_FRHL_EXPRN_VILAGE);
			getScheduleData(TN_PUBR_PUBLIC_MUSEUM_ARTGR_INFO);
			getScheduleData(TN_PUBR_PUBLIC_IMBCLTY_CNTER);
			getScheduleData(TN_PUBR_PUBLIC_HP_CNTER);						//hardness 컬럼 추가됨 추가함
			//getScheduleData(HEATWAVESHELTERLIST2);    					//데이터 없음
			//getScheduleData(TN_PUBR_PUBLIC_HL_CNTER); 					//데이터 없음
			getScheduleData(TN_PUBR_PUBLIC_CHILD_PRTC_ZN);
			********getScheduleData(TN_PUBR_PUBLIC_PRHSMK_ZN); 				//나중에 돌리자 너무많다
			getScheduleData(TN_PUBR_PUBLIC_RUSE_CNTER);		
			getScheduleData(TN_PUBR_PUBLIC_FREE_MLSV);
			getScheduleData(TN_PUBR_PUBLIC_ODSNPVLTRTSLCTN_OFFIC);
			getScheduleData(TN_PUBR_PUBLIC_CHIL_WLFARE_MLSV);
			getScheduleData(TN_PUBR_PUBLIC_OLDNDDSPSNPRT_CAREA);
			getScheduleData(TN_PUBR_PUBLIC_ELECTR_WHLCHAIRHGH_SPDCHRGR);
			getScheduleData(TN_PUBR_PUBLIC_FOOD_TRUCK_PERMIT_AREA);
			//getScheduleData(TN_PUBR_PUBLIC_FFUS_WTRCNS);					//데이터 없음
			
			**********getScheduleData(TN_PUBR_PUBLIC_SCRTY_LMP); 			//나중에 돌리자 너무많다
			// getScheduleData(UNDERGROUNDSAFETYINFO);                      //데이터 없음 
			getScheduleData(TN_PUBR_PUBLIC_FEMALE_SAFETY_HDRYCSTDYPLACE);  
			// getScheduleData(TSUNAMISHELTER1LIST);						//데이터 없음
			getScheduleData(TN_PUBR_PUBLIC_FEMALE_SAFETY_PRTCHOUSE);
			
			getScheduleData(AREA1LIST);										//데이터 없음
			getScheduleData(TN_PUBR_PUBLIC_SMALL_PBLFCLT_RISK_APPN);
			
			
			*/
			//getScheduleData(SHELTERINFO);									//데이터 확인 필요
			getScheduleData(TN_PUBR_PUBLIC_FGTCAR_PRKAREA);					//hardness 컬럼 추가됨 추가함
			
			//
			//getScheduleData(TN_PUBR_PUBLIC_WLRES_CNTER);	
			
			/*
			
			*/
		} catch (UnsupportedEncodingException e) {
			System.out.println(e.getMessage());
		} catch (IOException e) {
			System.out.println(e.getMessage());
		} catch (org.json.simple.parser.ParseException e) {
			System.out.println(e.getMessage());
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	
	public void getScheduleData(String url) throws UnsupportedEncodingException, IOException, org.json.simple.parser.ParseException {
		int pageNo = 1;
		String table_nm = url.split("/")[url.split("/").length - 1].replace("get", "").replace("_api", "").toLowerCase();
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("serviceKey", apiEncodServKey);
		if(url==SHELTERINFO) { 
			paramMap.put("_type", "json");
		} else {paramMap.put("type", "json");}
		paramMap.put("pageNo", Integer.toString(pageNo));
		paramMap.put("numOfRows", Integer.toString(numOfRows));
		
		System.out.println(paramMap.get("type"));
		System.out.println(paramMap.get("_type"));
		System.out.println(url);
		System.out.println(paramMap);
		
		
		JSONObject jsonObject = getJsonResponse(paramMap, url);
		JSONObject response = (JSONObject) jsonObject.get("response");
		JSONObject header = (JSONObject) response.get("header");
		
    	if (header.get("resultCode").equals("00")) {
    		paramMap.put("table_nm", table_nm);
    		service.trancateApiTable(paramMap);	//기존 데이터 삭제
    		
    		JSONArray insertItem = null;
    		JSONObject body = (JSONObject) response.get("body");
    		if (url.equals(SHELTERINFO)) {
    			JSONObject items = (JSONObject) body.get("items");
    			JSONArray item = (JSONArray) items.get("item");
    			insertItem = item;
    		} else {
    			JSONArray items = (JSONArray) body.get("items");
    			insertItem = items;
    		}
    		
    		insertData(insertItem, paramMap);	//1페이지
    		
    		int total = Integer.parseInt((String) body.get("totalCount"));
			for (int i=0; i<(total/numOfRows); i++) {
				pageNo++;	//2페이지 부터
				
				paramMap = new HashMap<String, Object>();
				paramMap.put("serviceKey", apiEncodServKey);
				if(url==SHELTERINFO) { 
					paramMap.put("_type", "json");
				} else {paramMap.put("type", "json");}
				paramMap.put("pageNo", Integer.toString(pageNo));
				paramMap.put("numOfRows", Integer.toString(numOfRows));
				
				jsonObject = getJsonResponse(paramMap, url);
				response = (JSONObject) jsonObject.get("response");
		    	header = (JSONObject) response.get("header");
		    	body = (JSONObject) response.get("body");
		    	
		    	
		    	insertItem = (JSONArray) body.get("items");
		    	
	    		paramMap.put("table_nm", table_nm);
    			insertData(insertItem, paramMap);
			}
    	} else {
    		System.out.println("resultCode ERROR ======> " + table_nm);
    	}
	}
	
	public void insertData(JSONArray items, Map<String, Object> paramMap) {
		List<Map<String, String>> datas = new ArrayList<>();
		Map<String, String> map = null;
		String[] columns = null;
		
		for (int i=0; i<items.size(); i++) {
			JSONObject obj = (JSONObject) items.get(i);
			Set<Map.Entry<String, String>> entrySet = obj.entrySet();
			map = new HashMap<String, String>();
			
			int j = 0;
			if (i == 0) {
				columns = new String[entrySet.size()];
				for(Map.Entry<String, String> entry : entrySet) {
					columns[j] = entry.getKey().toLowerCase();
					j++;
				}
			}
			
			j = 0;
			for(Map.Entry<String, String> entry : entrySet) {
				String val = entry.getValue();
				if (val.indexOf("'") > -1) val = val.replace("'", "''");
				map.put(columns[j], val);
				j++;
    		}
			
			datas.add(map);
		}
		
		paramMap.put("columns", columns);
		paramMap.put("datas", datas);
		
		service.insertApiData(paramMap);
	}
	
	public JSONObject getJsonResponse(Map<String, Object> paramMap, String url) throws UnsupportedEncodingException, IOException, org.json.simple.parser.ParseException {
		URL apiUrl = getUrl(url, paramMap);
		BufferedReader bf = new BufferedReader(new InputStreamReader(apiUrl.openStream(), "UTF-8"));
		
		JSONParser jsonParser = new JSONParser();
    	JSONObject jsonObject = (JSONObject) jsonParser.parse(bf.readLine());
    	
    	return jsonObject;
	}
		
	public URL getUrl(String Url, Map<String, Object> paramMap) throws MalformedURLException {
		String sUrl = Url + "?";
		
		if (paramMap.size() > 0) {
			for (Entry<String, Object> entrySet : paramMap.entrySet()) {
				sUrl += entrySet.getKey() + "=" + entrySet.getValue() + "&";
			}
		} else return null;
		
		return new URL(sUrl);
	}
	
	public Document requestProcess(StringBuilder urlBuilder) throws IOException {
		BufferedReader rd = null;
		HttpURLConnection conn = null;
		URL url = null;
		Document document = null;
				
		try {
			url = new URL(urlBuilder.toString());
			conn = (HttpURLConnection) url.openConnection();
			
			if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
			    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			
			String xmlString = sb.toString();
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	        DocumentBuilder db = dbf.newDocumentBuilder();
	        InputStream is = new ByteArrayInputStream(xmlString.getBytes());
	        document = db.parse(is);
	        
	        if (document != null) {
	        	document.getDocumentElement().normalize();
	        	return document;
	        }
		} catch (ParserConfigurationException e) {
			//log.error(ErrorCodeMsg.ERR_PARSE);
		} catch (SAXException e) {
			//log.error(ErrorCodeMsg.ERR_SAX);
		} catch (MalformedURLException e) {
			//log.error(ErrorCodeMsg.ERR_URL);
		} catch (IOException e) {
			//log.error(ErrorCodeMsg.ERR_IO);
		} finally {
			if (rd != null) rd.close();
			if (conn != null) conn.disconnect();
		}
		return document;
	}

	public String getNowDate(String format) {
		if("".equals(format) || format == null) { format = "yyyyMMdd"; }
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
		String nowDate = LocalDate.now().format(formatter);
		
		return nowDate;
	}
	
	public String minusDay(String date, String format, int minusV) {
		if("".equals(format) || format == null) { format = "yyyyMMdd"; }
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
		String resultDay = LocalDate.parse(date, formatter).minusDays(minusV).format(formatter);
		
		return resultDay;
	}
	
	public String changeForm(String date, String curForm, String chaForm) throws ParseException{
		SimpleDateFormat dtFormat = new SimpleDateFormat(curForm); 
        SimpleDateFormat newDtFormat = new SimpleDateFormat(chaForm); 
        String dt = newDtFormat.format(dtFormat.parse(date));
        
        return dt;
	}
	
	
}