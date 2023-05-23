package softGis.dashboard;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("dashboardService")
public class DashboardService extends EgovAbstractServiceImpl {
	
	@Resource(name="dashboardDAO")
	public DashboardDAO dashboardDAO;
	
	public String dashboardDataUr(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		Map<String, Object> chart = new HashMap<String, Object>();
		
		//전체 빈집 가구수
		List<Object> yearEmptyHouseCount = dashboardDAO.yearEmptyHouseCount(paramMap);
		chart.put("yearEmptyHouseCount",yearEmptyHouseCount);
		
		//거주형태별 빈집 가구수
		List<Object> yearStleEmptyHouseCount = dashboardDAO.yearStleEmptyHouseCount(paramMap);
		chart.put("yearStleEmptyHouseCount",yearStleEmptyHouseCount);
		
		//거주형태별 빈집 비율
		List<Object> stleEmptyHouseRate = dashboardDAO.stleEmptyHouseRate(paramMap);
		chart.put("stleEmptyHouseRate",stleEmptyHouseRate);
		
		//지역별 빈집 현황
		List<Map<String,Object>> areaEmptyHouseCount = dashboardDAO.areaEmptyHouseCount(paramMap);
		ArrayList<Integer> list = new ArrayList<>();
		for(int i=0; i<areaEmptyHouseCount.size(); i++) {
			list.add(Integer.parseInt(areaEmptyHouseCount.get(i).get("max").toString()));
		}
		list.sort(Comparator.reverseOrder());
		if(list.size() > 0) chart.put("areaEmptyHouseMax", list.get(0));
		chart.put("areaEmptyHouseCount",areaEmptyHouseCount);
		
		//거주형태별 빈집 증감 현황
		List<Object> stleEmptyHouseIncrease = dashboardDAO.stleEmptyHouseIncrease(paramMap);
		chart.put("stleEmptyHouseIncrease",stleEmptyHouseIncrease);
		

		paramMap.put("mta_cd", "seoul_old_building");
		String tableName = dashboardDAO.selectDataTbl(paramMap);
		if(tableName != null) {
			paramMap.put("tableName", tableName);
			//거주형태별 노후건물 현황
			List<Object> areaOldBuildingHouseCount = dashboardDAO.areaOldBuildingHouseCount(paramMap);
			chart.put("areaOldBuildingHouseCount",areaOldBuildingHouseCount);
		}
		
		//분석결과
		paramMap.put("table_name", "seoul_empty_house");
		String relname = dashboardDAO.getTableName(paramMap);
		if(relname != null && !"".equals(relname)) {
			paramMap.put("relname", relname);
			List<Object> resultData = dashboardDAO.getResultData(paramMap);
			chart.put("resultData", resultData);
		}
		
		
		model.addAttribute("result",chart);
		return "jsonString";
	}
	
	public String dashboardDataWaste(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		Map<String, Object> chart = new HashMap<String, Object>();
		
		//년도별 폐기물 현황
		List<Object> yearWasteCount = dashboardDAO.yearWasteCount(paramMap);
		chart.put("yearWasteCount",yearWasteCount);
		
		//지역별 폐기물 현황
		List<Object> areaWasteCount = dashboardDAO.areaWasteCount(paramMap);
		chart.put("areaWasteCount",areaWasteCount);
		
		//년도별 폐기물 증감
		List<Object> yearWasteIncrease = dashboardDAO.yearWasteIncrease(paramMap);
		chart.put("yearWasteIncrease",yearWasteIncrease);
		
		paramMap.put("mta_cd", "seoul_population");
		String tableName = dashboardDAO.selectDataTbl(paramMap);
		if(tableName != null) {
			paramMap.put("tableName", tableName);
			//지역별 인구수
			List<Object> areaPopltnCount = dashboardDAO.areaPopltnCount(paramMap);
			chart.put("areaPopltnCount",areaPopltnCount);
		}
		
		//분석결과
		paramMap.put("table_name", "seoul_waste");
		String relname = dashboardDAO.getTableName(paramMap);
		if(relname != null && !"".equals(relname)) {
			paramMap.put("relname", relname);
			List<Object> resultData = dashboardDAO.getResultData(paramMap);
			chart.put("resultData", resultData);
		}
		
		model.addAttribute("result",chart);
		return "jsonString";
	}
	
	public String dashboardDataCorona(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		Map<String, Object> chart = new HashMap<String, Object>();
		
		//일별 코로나 확진자 수
		List<Object> dayCoronaCount = dashboardDAO.dayCoronaCount(paramMap);
		chart.put("dayCoronaCount",dayCoronaCount);
		
		//구별 코로나 확진자 수
		List<Object> areaCoronaCount = dashboardDAO.areaCoronaCount(paramMap);
		chart.put("areaCoronaCount",areaCoronaCount);
		
		//분석결과
		paramMap.put("table_name", "seoul_covid");
		paramMap.put("yyyy", paramMap.get("base_date"));
		String relname = dashboardDAO.getTableName(paramMap);
		if(relname != null && !"".equals(relname)) {
			paramMap.put("relname", relname);
			List<Object> resultData = dashboardDAO.getResultData(paramMap);
			chart.put("resultData", resultData);
		}
		
		model.addAttribute("result",chart);
		return "jsonString";
	}
	
	public Object dashboardSeoulMap(Map<String, Object> paramMap) {
		return dashboardDAO.dashboardSeoulMap(paramMap);
	}
	
}