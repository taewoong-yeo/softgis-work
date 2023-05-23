package softGis.dashboard;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("dashboardDAO")
public interface DashboardDAO {
	
	public Object dashboardSeoulMap(Map<String, Object> paramMap);

	/** 도시재생 **/
	//전체 빈집 가구수
	public List<Object> yearEmptyHouseCount(Map<String, Object> paramMap);
	
	//거주형태별 빈집 가구수
	public List<Object> yearStleEmptyHouseCount(Map<String, Object> paramMap);
	
	//거주형태별 빈집 비율
	public List<Object> stleEmptyHouseRate(Map<String, Object> paramMap);
	
	//지역별 빈집 현황
	public List<Map<String,Object>> areaEmptyHouseCount(Map<String, Object> paramMap);
	
	//거주형태별 빈집 증감 현황
	public List<Object> stleEmptyHouseIncrease(Map<String, Object> paramMap);
	
	//지역별 노후건물 현황
	public List<Object> areaOldBuildingHouseCount(Map<String, Object> paramMap);
	
	/** 자원순환 **/ 
	//년도별 폐기물 현황
	public List<Object> yearWasteCount(Map<String, Object> paramMap);

	//지역별 폐기물 현황
	public List<Object> areaWasteCount(Map<String, Object> paramMap);
	
	//년도별 폐기물 증감
	public List<Object> yearWasteIncrease(Map<String, Object> paramMap);
	
	//지역별 인구수
	public List<Object> areaPopltnCount(Map<String, Object> paramMap);
	
	/** 재난안전 **/
	//일별 코로나 확진자 수
	public List<Object> dayCoronaCount(Map<String, Object> paramMap);

	//구별 코로나 확진자 수
	public List<Object> areaCoronaCount(Map<String, Object> paramMap);
	
	//테이블 조회
	public String selectDataTbl(Map<String, Object> paramMap);
	
	//분석결과 테이블 조회
	public String getTableName(Map<String, Object> paramMap);

	//분석결과 조회
	public List<Object> getResultData(Map<String, Object> paramMap);
	
}