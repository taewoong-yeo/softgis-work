package softGis.cmmntyMap;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import softGis.admin.code.AdminCodeService;
import softGis.auth.UserVO;
import softGis.core.DateManager;
import softGis.core.Encrypter;
import softGis.core.Pagination;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Controller
@RequestMapping(value="/cmmntyMap")
public class CmmntyMapController {
	
	@Autowired
	ServletContext servletContext;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	@Resource(name="cmmntyMapService")
	public CmmntyMapService cmmntyMapService;
	
	@Resource(name="adminCodeService")
	public AdminCodeService adminCodeService;
	
	/** 커뮤니티매핑 > 목록 조회하기 **/
	@RequestMapping(value="/cmmnty-list.do")
	public String cmmntyList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return cmmntyMapService.getCmmntyMapList(paramMap, model);
	}
	
	/** 커뮤니티매핑 > 생성하기 **/
	@RequestMapping(value="/cmmnty-form.do")
	public String cmmntyForm(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return cmmntyMapService.cmmntyForm(request, paramMap, model);
	}
	
	/** 커뮤니티매핑 > 상세 조회하기 **/
	@RequestMapping(value="/cmmnty-detail.do")
	public String cmmntyDetail(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		String mapng_id = (String)paramMap.get("mapng_id");
		cmmntyMapService.updateViewCnt(paramMap);
		
		List<Object> list =cmmntyMapService.getCmmntyQuesList(paramMap);
		//추가함
		model.addAttribute("mapng_id", mapng_id);
		model.addAttribute("session", paramMap.get("session_usr_id"));
		model.addAttribute("paramMap", paramMap);
		model.addAttribute("mapng_ques", list);
		
		Object dataCatlogList = cmmntyMapService.getDataCatlog(paramMap);
		model.addAttribute("dataCatlogList", dataCatlogList);
		
		paramMap.put("grp_id", "REPORT_TYPE");
		model.addAttribute("report_type", adminCodeService.getCodeList(paramMap));
		
		return "cmmntyMap/cmmnty-detail";
	}
	
	/** 커뮤니티매핑 > 조회하기 **/
	@RequestMapping(value="/getCmmntyMapDetail.do")
	public String getCmmntyMapDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		Object result = cmmntyMapService.getCmmntyMapDetail(paramMap);
		Object mapData = cmmntyMapService.getCmmntyMapDataList(paramMap);
		
		model.addAttribute("result", result);
		model.addAttribute("mapData", mapData);
		
		return "jsonString";
	}
	
	/** 커뮤니티매핑 > 상세조회하기 > 의견 목록 조회하기 **/
	@RequestMapping(value="/getCmmntyDetailAnswerList.do")
	public String getCmmntyDetailAnswerList(@RequestParam Map<String, Object> paramMap, ModelMap model) {

		//System.out.println("::"+paramMap);
		SessionManager.getSessionInfo(paramMap);
		List<Object> list = cmmntyMapService.getCmmntyDetailAnswerList(paramMap);
		
		model.addAttribute("session", paramMap.get("session_usr_id"));
		model.addAttribute("result", list);
		model.addAttribute("search_answer_title",  paramMap.get("search_answer_title"));
		
		return "jsonString";
	}
	

	/** 커뮤니티매핑 > 조회하기(상세보기) **/
	@RequestMapping(value="/getCmmntyDetailAnswerDetail.do")
	public String getCmmntyDetailAnswerDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = cmmntyMapService.getCmmntyDetailAnswerDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}

	/** 커뮤니티매핑 > 의견보기 > 삭제하기 **/
	@RequestMapping(value="/deleteCmmntyAnswer.do")
	public String deleteCmmntyAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		paramMap.put("isAdmin", "0");	
		// 관리자 영부 재 확인.
		String mng_yn = (String) paramMap.get("mng_yn");
		boolean isAdmin = false;
		int result =0;
		if ( mng_yn.equals("1")) {
			UserVO user = (UserVO) request.getSession().getAttribute("user");
			if(user != null) {
				isAdmin = user.getUsr_auth().equals("01");
			}
		}else {
			// 패스워드 암호화 처리.
			paramMap.replace("answer_usr_pw", Encrypter.encrypt("SHA-256", (String) paramMap.get("answer_usr_pw")));
		}
		int session=Integer.parseInt((String) paramMap.get("session"));
		session = Integer.parseInt((String) paramMap.get("session"));	
		if (isAdmin || session == 1) {
			result = cmmntyMapService.deleteCmmntyAnswerByAdmin(paramMap);
		} else {
				result = cmmntyMapService.deleteCmmntyAnswer(paramMap);
		}
			model.addAttribute("result", result);
		
		return "jsonString"; 
	}	
	
	
	//getCheckAnswerIdPwd
	/** 커뮤니티매핑 > 의견보기 > 삭제하기 **/
	@RequestMapping(value="/getCheckAnswerIdPwd.do")
	public String getCheckAnswerIdPwd(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {

		paramMap.replace("answer_usr_pw", Encrypter.encrypt("SHA-256", (String) paramMap.get("answer_usr_pw")));

		int result = cmmntyMapService.getCheckAnswerIdPwd(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString"; 
		
	}	
	
	
	/** 커뮤니티매핑 > 의견 저장하기 **/
	@RequestMapping(value="/insertCmmntyAnswer.do")
	public String insertCmmntyAnswer(@RequestParam Map<String, Object> paramMap, @RequestParam("fileList") List<MultipartFile> files, ModelMap model, HttpServletRequest request) throws Exception {
		
		// 로그인 여부 판단
		UserVO user = (UserVO) request.getSession().getAttribute("user");
		if ( user == null) {
			paramMap.put("session_usr_id", paramMap.get("opinion_usr_id"));
			paramMap.put("answer_usr_id", paramMap.get("opinion_usr_id"));
			// 패스워드 암호화 처리.
			paramMap.put("answer_usr_pw", 	Encrypter.encrypt("SHA-256", (String) paramMap.get("opinion_usr_pwd")));
		}else {
			SessionManager.getSessionInfo(paramMap);
			paramMap.put("answer_usr_id", paramMap.get("session_usr_id"));
		}
		
		int fileNo = 0;
		if(files.get(0).getSize() > 0) {
			for(int i=0; i<files.size(); i++) {
				int seq = i+1;
				fileNo = fileGetService.fileInsertFile(files.get(i), FileGetService.UPLOAD_SUBPATH_CMMNTY);
				paramMap.put("img_file"+seq, fileNo);
			}
		} 
		
		int result = cmmntyMapService.insertCmmntyAnswer(paramMap, request);
 
		model.addAttribute("result", result);
		
		return "jsonString";
		
	}

	/** 커뮤니티매핑 > 의견 수정하기 **/
	@RequestMapping(value="/updateCmmntyAnswer.do")
	public String updateCmmntyAnswer(@RequestParam Map<String, Object> paramMap, @RequestParam("fileList") List<MultipartFile> files, ModelMap model, HttpServletRequest request) throws Exception {
		
		UserVO user = (UserVO) request.getSession().getAttribute("user");
		if ( user == null) {
			paramMap.put("session_usr_id", paramMap.get("answer_usr_id"));
		}else {
			SessionManager.getSessionInfo(paramMap);
		}
		
		int startSeq = 0;
		if(paramMap.get("imgList") != null && !"".equals(paramMap.get("imgList"))) {
			String[] imgList = paramMap.get("imgList").toString().split(",");
			if(imgList.length > 0) {
				for(int i=0; i<imgList.length; i++) {
					int seq = i+1;
					paramMap.put("img_file"+seq, imgList[i]);
					startSeq = seq;
				}
			}
		}
		
		int fileNo = 0;
		if(files.get(0).getSize() > 0) {
			for(int i=0; i<files.size(); i++) {
				int seq = i+1+startSeq;
				fileNo = fileGetService.fileInsertFile(files.get(i), FileGetService.UPLOAD_SUBPATH_CMMNTY);
				paramMap.put("img_file"+seq, fileNo);
			}
		} 
		
		int result = cmmntyMapService.updateCmmntyAnswer(paramMap, request);
 
		model.addAttribute("result", result);
		
		return "jsonString";
		
	}
	
	
	
	
	/** 커뮤니티매핑 > 저장하기 **/
	@RequestMapping(value="/insertCmmntyMap.do")
	public String insertCmmntyMap(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) throws Exception {
		return cmmntyMapService.insertCmmntyMap(paramMap, request);
	}
	
	/** 커뮤니티매핑 > 삭제하기 **/
	@RequestMapping(value="/deleteCmmntyMap.do")
	public String deleteCmmntyMap(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		cmmntyMapService.deleteCmmntyMap(paramMap);
		
		return "jsonString"; 
	}

	/** 커뮤니티매핑 > 신고하기 **/
	@RequestMapping(value="/reportCmmntyAnswer.do")
	public String reportCmmntyAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		SessionManager.getSessionInfo(paramMap);
		//System.out.println("::"+paramMap);
		if(paramMap.get("session_usr_id") != null) {
			String strReportAnswerId = ("".equals(paramMap.get("report_answer_id")) ? null : (String)paramMap.get("report_answer_id"));
			
			paramMap.put("answer_id", strReportAnswerId);
			paramMap.put("report_status", (strReportAnswerId == null ? "Y" : "N")); //Y : 맵핑 N : 의견
			
			int result = cmmntyMapService.getCheckReportCmmntyAnswer(paramMap);
			//System.out.println("result::"+result);
			if(result > 0) {
				response.setStatus(HttpServletResponse.SC_CONFLICT);
				model.addAttribute("error", "이미 신고한 의견입니다.");
			}else {
				model.addAttribute("result", cmmntyMapService.insertReportCmmntyAnswer(paramMap));
			}
		}else {
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			model.addAttribute("error", "로그인정보가 없습니다.");
		}
		
		return "jsonString"; 
	}	

	/** 커뮤니티매핑 > 신고취소하기 **/
	@RequestMapping(value="/reportCancelCmmntyAnswer.do")
	public String reportCancelCmmntyAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		SessionManager.getSessionInfo(paramMap);
		//System.out.println(": :"+paramMap);
		if(paramMap.get("session_usr_id") != null) {
			if("".equals(paramMap.get("report_answer_id"))) {
				paramMap.put("answer_id", null);
			}else {
				paramMap.put("answer_id", paramMap.get("report_answer_id"));
			}
			
			model.addAttribute("result", cmmntyMapService.deleteReportCmmntyAnswer(paramMap));
		}else {
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			model.addAttribute("error", "로그인정보가 없습니다.");
		}
		
		return "jsonString"; 
	}
	
	/** 커뮤니티매핑 > 지역목록 **/
	@RequestMapping(value="/getBndSggCdList.do")
	public String getBndSggCdList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return cmmntyMapService.getBndSggCdList(paramMap, model);
	}
	
	/** 마커 정보 조회 **/
	@RequestMapping(value="/getCmmntyMarker.do", method=RequestMethod.POST)
	public String getCmmntyMarker(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		List<String> marker = new ArrayList<>();
		
		File markerFile = new File(servletContext.getRealPath("/assets/images/marker/"));
		File[] markerList = markerFile.listFiles(File::isFile);

		for(File file : markerList) {
			marker.add(file.getName());
		}
		
		model.addAttribute("marker",marker);
		
		return "jsonString";
	}
	
	/** 커뮤니티매핑 > 통계그래프 **/
	@RequestMapping(value="/getCmmntyStats.do", method=RequestMethod.POST)
	public String getCmmntyStats(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyStats(paramMap, model);
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 대시보드 **/
	@RequestMapping(value="/cmmnty-dashboard.do")
	public String getCmmntyDashboard(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyDashboard(paramMap, model);
	}

	/** 커뮤니티매핑 > 매핑대시보드 > 대시보드 : 데이터조회 **/
	@RequestMapping(value="/getCmmntyDashboardData.do")
	public String getCmmntyDashboardData(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyDashboardData(paramMap, model);
	}

	/** 커뮤니티매핑 > 매핑대시보드 > 대시보드 : 시군구별 응답자수 통계 **/
	@RequestMapping(value="/getCmmntyGeomSggAnswerCount.do")
	public String getCmmntyGeomSggAnswerCount(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyGeomSggAnswerCount(paramMap, model);
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 매핑통계 **/
	@RequestMapping(value="/cmmnty-statistics.do")
	public String getCmmntyStatistics(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		model.addAttribute("year",DateManager.getNowYear());
		return "cmmntyMap/cmmnty-statistics";
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 매핑통계 : 데이터조회 **/
	@RequestMapping(value="/getCmmntyStatisticsData.do")
	public String getCmmntyStatisticsData(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyStatistics(paramMap, model);
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 매핑통계 > 날짜별 엑셀다운로드 **/
	@RequestMapping(value="/getAnswerCatStatsExcelDownload.do")
	public void getAnswerCatStatsExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		
		cmmntyMapService.getAnswerCatStatsExcelDownload(paramMap, response);
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 매핑통계 > 지역별 엑셀다운로드 **/
	@RequestMapping(value="/getAnswerGeomStatsExcelDownload.do")
	public void getAnswerGeomStatsExcelDownload(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		
		cmmntyMapService.getAnswerGeomStatsExcelDownload(paramMap, response);
	}
	
	/** 커뮤니티매핑 > 매핑대시보드 > 매핑개별통계 **/
	@RequestMapping(value="/cmmnty-statistics-each.do")
	public String getCmmntyStatisticsEach(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		
		return cmmntyMapService.getCmmntyStatisticsEach(paramMap, model);
	}

	/** 커뮤니티매핑 > 매핑대시보드 > 매핑개별통계 **/
	@RequestMapping(value="/getDataCatlogGeojson.do")
	public String getDataCatlogGeojson(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		return cmmntyMapService.getDataCatlogGeojson(paramMap, model);
	}
	
}