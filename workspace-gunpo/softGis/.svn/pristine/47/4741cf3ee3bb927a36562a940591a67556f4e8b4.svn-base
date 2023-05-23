package softGis.cmmntyMap;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.admin.code.AdminCodeDAO;
import softGis.core.CoreDAO;
import softGis.core.DateManager;
import softGis.core.ExcelManager;
import softGis.core.Pagination;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Service("cmmntyMapService")
public class CmmntyMapService extends EgovAbstractServiceImpl {
	
	@Resource(name="cmmntyMapDAO")
	public CmmntyMapDAO cmmntyMapDAO;
	
	@Resource(name="adminCodeDAO")
	public AdminCodeDAO adminCodeDAO;
	
	@Resource(name="coreDAO")
	public CoreDAO coreDAO;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;

	public String cmmntyForm(HttpServletRequest request, Map<String, Object> paramMap, ModelMap model) {
		paramMap.put("grp_id", "ANSWER_TYPE");
		model.addAttribute("answer_type",adminCodeDAO.getCodeList(paramMap));
		model.addAttribute("bnd_sd_list",coreDAO.getBndSdCdList(paramMap));
		return "cmmntyMap/cmmnty-form";
	}
	

	public String getCmmntyMapList(Map<String, Object> paramMap, ModelMap model) {
		Map<String, Object> cnt = cmmntyMapDAO.getCmmntyMapCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 16);
		model.addAttribute("list", cmmntyMapDAO.getCmmntyMapList(paramMap));
		model.addAttribute("pagination", getPagination);
		model.addAttribute("paramMap", paramMap);
		return "cmmntyMap/cmmnty-list";
	};
	
	public Map<String, Object> getCmmntyMapCount(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyMapCount(paramMap);
	};
	
	public Object getCmmntyMapDetail(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyMapDetail(paramMap);
	};
	
	public int updateViewCnt(Map<String, Object> paramMap) {
		return cmmntyMapDAO.updateViewCnt(paramMap);
	};
	
	public String insertCmmntyMap(Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		
		int file_id = 0;
	    if(!"".equals(paramMap.get("file_id")) && paramMap.get("file_id") != null) {
		    file_id = Integer.parseInt(paramMap.get("file_id").toString());
	    }else {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	
		    Iterator<String> iterator = multipartRequest.getFileNames();
	
		    while (iterator.hasNext()) {
		        String key = (String) iterator.next();
	
		        for(MultipartFile files : multipartRequest.getFiles(key)){
		        	file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_CMMNTY);
		        }
		    }
	    }
	    
	    paramMap.put("file_id", file_id);
	    
		cmmntyMapDAO.insertCmmntyMap(paramMap);

		//System.out.println("::"+paramMap);
		String[] quesNmList = request.getParameterValues("ques_nm");
		String[] optionSelList = request.getParameterValues("sel_quest_opt");
		
		if(quesNmList != null && quesNmList.length>1) {
        	for(int i=1; i<quesNmList.length; i++) {
        		
        		//System.out.println(i+":quesNmList:"+quesNmList[i]);
        		//System.out.println(i+":optionSelList:"+optionSelList[i]);
        		
        		paramMap.put("ques_nm", quesNmList[i]);
        		paramMap.put("ans_opt_cd", optionSelList[i]);
        		cmmntyMapDAO.insertCmmntyMapQues(paramMap);
        		
        		if("03".equals(optionSelList[i])) { //객관식
	        		//System.out.println(i+"_"+"ipt_quest_option"+i);
        			String[] optionList = request.getParameterValues("ipt_quest_option"+i);
        			if(optionList != null && optionList.length>0) {
        	        	for(int j=0; j<optionList.length; j++) {
        	        		//System.out.println(i+"_"+j+":optionList:"+optionList[j]);
        	        		paramMap.put("opt_desc", optionList[j]);
        	        		cmmntyMapDAO.insertCmmntyMapQuesOption(paramMap);
        	        	}
        			}
        		}
        	}
		}

		if(paramMap.get("dataWmsList") != null && !"".equals(paramMap.get("dataWmsList"))) {
	        String[] dataWmsList = paramMap.get("dataWmsList").toString().split(",");
	        String[] dataStyleList = paramMap.get("dataStyleList").toString().split(",");
	        String[] dataNmList = paramMap.get("dataNmList").toString().split(",");
	        
	        if(dataWmsList.length > 0) {
	        	for(int i=0; i<dataWmsList.length; i++) {
	        		paramMap.put("data_wms", dataWmsList[i]);
	        		paramMap.put("data_style", dataStyleList[i]);
	        		paramMap.put("data_nm", dataNmList[i]);
	        		
	        		cmmntyMapDAO.insertCmmntyMapData(paramMap);
	        	}
	        }
		}
		
	
		if("N".equals(paramMap.get("temp_yn"))) {
			request.setAttribute("message", "등록되었습니다.");
		}else {
			request.setAttribute("message", "임시저장되었습니다.");
		}
		request.setAttribute("url", "/cmmntyMap/cmmnty-list.do");
		return "forward:/redirect.do";
	};
	
	public void deleteCmmntyMap(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		cmmntyMapDAO.deleteCmmntyMap(paramMap);
		cmmntyMapDAO.deleteCmmntyMapQues(paramMap);
	};
	
	public String getBndSggCdList(Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("result", coreDAO.getBndSggCdList(paramMap));
		
		return "jsonString";
	}


	public List<Object> getCmmntyDetailAnswerList(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyDetailAnswerList(paramMap);
	}


	public Object getCmmntyDetailAnswerDetail(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyDetailAnswerDetail(paramMap);
	}


	public int deleteCmmntyAnswer(Map<String, Object> paramMap) {
		return cmmntyMapDAO.deleteCmmntyAnswer(paramMap);
	}


	public int insertCmmntyAnswer(Map<String, Object> paramMap, HttpServletRequest request) {
		return cmmntyMapDAO.insertCmmntyAnswer(paramMap);
	}


	public int deleteCmmntyAnswerByAdmin(Map<String, Object> paramMap) {
		return cmmntyMapDAO.deleteCmmntyAnswerByAdmin(paramMap);
	}


	public int getCheckAnswerIdPwd(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCheckAnswerIdPwd(paramMap);
	}


	public int updateCmmntyAnswer(Map<String, Object> paramMap, HttpServletRequest request) {
		return cmmntyMapDAO.updateCmmntyAnswer(paramMap);
	};

	public int getCheckReportCmmntyAnswer(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCheckReportCmmntyAnswer(paramMap);
	};
	
	public int insertReportCmmntyAnswer(Map<String, Object> paramMap) {
		return cmmntyMapDAO.insertReportCmmntyAnswer(paramMap);
	};
	
	public int deleteReportCmmntyAnswer(Map<String, Object> paramMap) {
		return cmmntyMapDAO.deleteReportCmmntyAnswer(paramMap);
	};
	
	public List<Object> getCmmntyMapDataList(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyMapDataList(paramMap);
	}
	
	public List<Object> getDataCatlog(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getDataCatlog(paramMap);
	}
	
	public List<Object> getCmmntyQuesList(Map<String, Object> paramMap) {
		return cmmntyMapDAO.getCmmntyQuesList(paramMap);
	};
	
	public String getCmmntyStats(Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("pointStats", cmmntyMapDAO.getCmmntyPointStats(paramMap));
		
		List<Object> geomStatsList = cmmntyMapDAO.getCmmntyGeomStats(paramMap);
		//2개 시도 이하일때 상세 조회
		if (geomStatsList.size() < 3) geomStatsList = cmmntyMapDAO.getCmmntyGeomStatsDetail(paramMap);
		model.addAttribute("geomStats", geomStatsList);
		//응답 워드클라우드
		model.addAttribute("cmmntyAnswerWordCloud", cmmntyMapDAO.getCmmntyAnswerWordCloud(paramMap));

		model.addAttribute("cmmntyQuesStats1", cmmntyMapDAO.getCmmntyQuesStats1(paramMap));
		model.addAttribute("cmmntyQuesStats2", cmmntyMapDAO.getCmmntyQuesStats2(paramMap));
		model.addAttribute("cmmntyQuesStats3", cmmntyMapDAO.getCmmntyQuesStats3(paramMap));
		model.addAttribute("cmmntyQuesStats4", cmmntyMapDAO.getCmmntyQuesStats4(paramMap));
		model.addAttribute("cmmntyQuesStats5", cmmntyMapDAO.getCmmntyQuesStats5(paramMap));
		model.addAttribute("cmmntyQuesStats6", cmmntyMapDAO.getCmmntyQuesStats6(paramMap));
		model.addAttribute("cmmntyQuesStats7", cmmntyMapDAO.getCmmntyQuesStats7(paramMap));
		model.addAttribute("cmmntyQuesStats8", cmmntyMapDAO.getCmmntyQuesStats8(paramMap));
		model.addAttribute("cmmntyQuesStats9", cmmntyMapDAO.getCmmntyQuesStats9(paramMap));
		model.addAttribute("cmmntyQuesStats10", cmmntyMapDAO.getCmmntyQuesStats10(paramMap));
		return "jsonString";
	};
	
	public String getCmmntyDashboard(Map<String, Object> paramMap, ModelMap model) {

		model.addAttribute("year",DateManager.getNowYear());
		
		//개별통계
		Map<String, Object> cnt = cmmntyMapDAO.getCmmntyMapCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 100);
		model.addAttribute("list", cmmntyMapDAO.getCmmntyMapList(paramMap));
		model.addAttribute("pagination", getPagination);
		return "cmmntyMap/cmmnty-dashboard";
		
	}
	
	public String getCmmntyDashboardData(Map<String, Object> paramMap, ModelMap model) {
		
		//카테고리별 매핑수
		model.addAttribute("cmmntyCatCount", cmmntyMapDAO.getCmmntyCatCount(paramMap));
		//카테고리별 응답자수
		model.addAttribute("cmmntyAnswerCatCount", cmmntyMapDAO.getCmmntyAnswerCatCount(paramMap));
		//기간별 매핑등록건수
		model.addAttribute("cmmntyMonthCount", cmmntyMapDAO.getCmmntyMonthCount(paramMap));
		//기간별 응답자수
		model.addAttribute("cmmntyAnswerMonthCount", cmmntyMapDAO.getCmmntyAnswerMonthCount(paramMap));
		//응답 워드클라우드
		model.addAttribute("cmmntyAnswerWordCloud", cmmntyMapDAO.getCmmntyAnswerWordCloud(paramMap));
		//지역별 응답자 수 
		model.addAttribute("cmmntyGeomTotAnswerCount", cmmntyMapDAO.getCmmntyGeomTotAnswerCount(paramMap));
		//인기 커뮤니티매핑 (의견수)
		model.addAttribute("cmmntyMostAnswerRank", cmmntyMapDAO.getCmmntyMostAnswerRank(paramMap));
		//인기 커뮤니티매핑 (조회수)
		model.addAttribute("cmmntyMostViewRank", cmmntyMapDAO.getCmmntyMostViewRank(paramMap));
				
		return "jsonString";
	};
	
	public String getCmmntyGeomSggAnswerCount(Map<String, Object> paramMap, ModelMap model) {
		//시군구별 응답자 수
		model.addAttribute("cmmntyGeomSggAnswerCount", cmmntyMapDAO.getCmmntyGeomSggAnswerCount(paramMap));
		return "jsonString";
	};
	
	public String getCmmntyStatistics(Map<String, Object> paramMap, ModelMap model) {
		paramMap.put("grp_id", "DATA_CATE");
		model.addAttribute("dataCateCodeList",adminCodeDAO.getCodeList(paramMap));
		model.addAttribute("answerCatStatistics", cmmntyMapDAO.getCmmntyAnswerCatStatistics(paramMap));
		model.addAttribute("cmmntyAnswerGeomStatistics", cmmntyMapDAO.getCmmntyAnswerGeomStatistics(paramMap));
		return "jsonString";
	};

	public void getAnswerCatStatsExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {

		List<Object> data = cmmntyMapDAO.getCmmntyAnswerCatStatistics(paramMap);
		String[] columns = paramMap.get("columns").toString().split(",");
		String[] keys = {"yyyymm","tot","brm01","brm02","brm03","brm04","brm05","brm06","brm07","brm08","brm09","brm10","brm11","brm12","brm13","brm14","brm15","brm16"};
		ExcelManager.getExcelDownload(data, columns, keys, "날짜별 응답자 수 통계", response);
	}

	public void getAnswerGeomStatsExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {

		List<Object> data = cmmntyMapDAO.getCmmntyAnswerGeomStatistics(paramMap);
		String[] columns = paramMap.get("columns").toString().split(",");
		String[] keys = {"name","tot","brm01","brm02","brm03","brm04","brm05","brm06","brm07","brm08","brm09","brm10","brm11","brm12","brm13","brm14","brm15","brm16"};
		ExcelManager.getExcelDownload(data, columns, keys, "지역별 응답자 수 통계", response);
	}
	
	public String getCmmntyStatisticsEach(Map<String, Object> paramMap, ModelMap model) {
		Map<String, Object> cnt = cmmntyMapDAO.getCmmntyMapCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 100);
		model.addAttribute("list", cmmntyMapDAO.getCmmntyMapList(paramMap));
		model.addAttribute("pagination", getPagination);
		model.addAttribute("year",DateManager.getNowYear());
		return "cmmntyMap/cmmnty-statistics-each";
	};
	
	public String getDataCatlogGeojson(Map<String, Object> paramMap, ModelMap model) {
		String result = cmmntyMapDAO.getDataCatlogGeojson(paramMap);
		model.addAttribute("result", result);
		return "jsonString";
	};
	
}