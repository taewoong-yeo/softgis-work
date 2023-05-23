package softGis.mycmmntyMap;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import softGis.admin.code.AdminCodeDAO;
import softGis.admin.code.AdminCodeService;
import softGis.auth.UserVO;
import softGis.cmmntyMap.CmmntyMapService;
import softGis.core.CoreService;
import softGis.core.Encrypter;
import softGis.core.Pagination;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;


@Controller
@RequestMapping(value="/mycmmntyMap")
public class MyCmmntyMapController {

	@Autowired
	ServletContext servletContext;
	
	@Resource(name="myCmmntyMapService")
	public MyCmmntyMapService myCmmntyMapService;
	
	@Resource(name="cmmntyMapService")
	public CmmntyMapService cmmntyMapService;
	
	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	/** 커뮤니티 매핑 > 마이 커뮤니티매핑 목록 **/
	@RequestMapping(value="/mycmmnty-list.do")
	public String surveyMy(HttpServletRequest request, @RequestParam Map<String, Object> paramMap,@RequestParam(value="searchStat", required=false) List<String> arrStat, ModelMap model) {
		
		paramMap.put("arrStat", arrStat);
		model.addAttribute("paramMap", paramMap);
		
		SessionManager.getSessionInfo(paramMap);
		
		Map<String, Object> cnt = myCmmntyMapService.getMyCmmntyMapCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 16);
		List<Object> myCmmntyList = myCmmntyMapService.getMyCmmntyMapList(paramMap);	
		model.addAttribute("pagination", getPagination);
		model.addAttribute("list", myCmmntyList);
		
		return "cmmntyMap/mycmmnty-list";
	}
	
	/** 커뮤니티 매핑 > 마이 커뮤니티매핑 목록 > 상세화면 **/
	@RequestMapping(value="/mycmmnty-form.do")
	public String surveyMyForm(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		cmmntyMapService.cmmntyForm(request, paramMap, model);
		
		SessionManager.getSessionInfo(paramMap);
		Map<String, Object> myDetail = myCmmntyMapService.getMyCmmntyMapDetail(paramMap);
		if(myDetail != null && myDetail.get("area_cd") != null &&  !"".equals(myDetail.get("area_cd"))){
			cmmntyMapService.getBndSggCdList(myDetail, model);
		}
		
		model.addAttribute("myDetail", myDetail);
		model.addAttribute("myQuesList", myCmmntyMapService.getMyCmmntyMapQuesList(paramMap));
		model.addAttribute("myMapDataList", myCmmntyMapService.getMyCmmntyMapDataList(paramMap));
		
		return "cmmntyMap/mycmmnty-form";
	}

	/** 배경지도 목록 **/
	@RequestMapping(value="/getMyCmmntyMapDataList.do")
	public String getMyCmmntyMapDataList(@RequestParam Map<String, Object> paramMap, ModelMap model) {

		SessionManager.getSessionInfo(paramMap);
		model.addAttribute("myMapDataList", myCmmntyMapService.getMyCmmntyMapDataList(paramMap));

		return "jsonString";
	}
	
	/** 커뮤니티 매핑 > 마이 커뮤니티매핑 목록 > 저장(수정) **/
	@RequestMapping(value="/updateMyCmmntyMap.do")
	public String updateMyCmmntyMap(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) throws Exception {

		SessionManager.getSessionInfo(paramMap);
		//System.out.println(">>B::"+paramMap);

		int iCnt = myCmmntyMapService.getAnswerOfMyCmmntyCount(paramMap);
		if(iCnt > 0){ //답변존재 시 수정불가
			request.setAttribute("message", "참여이력이 존재하여 수정이 불가합니다.");
		}else {
			
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		    Iterator<String> iterator = multipartRequest.getFileNames();
	
		    int file_id = 0;
		    while (iterator.hasNext()) {
		        String key = (String) iterator.next();
	
		        for(MultipartFile files : multipartRequest.getFiles(key)){
		        	if(files.getSize() > 0) { //업로드
			        	file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_CMMNTY);
		        	}else { //기본이미지
		        	    if(!"".equals(paramMap.get("file_id")) && paramMap.get("file_id") != null) {
		        		    file_id = Integer.parseInt(paramMap.get("file_id").toString());
		        	    }
		        	}
		        }
		    }
		    
		    paramMap.put("file_id", (file_id > 0 ? file_id : null)); //file없는경우 변경없음
			
			myCmmntyMapService.updateMyCmmntyMap(paramMap);
		    
		    //질문추가 - 답변데이터여부에따른 처리 협의필요
    		myCmmntyMapService.deleteMyCmmntyMapQuesOption(paramMap);
			myCmmntyMapService.deleteMyCmmntyMapQues(paramMap);
			
			//System.out.println("::"+paramMap);
			String[] quesNmList = request.getParameterValues("ques_nm");
			String[] optionSelList = request.getParameterValues("sel_quest_opt");
			
			if(quesNmList != null && quesNmList.length>1) {
	        	for(int i=1; i<quesNmList.length; i++) {
	        		
	        		//System.out.println(i+":quesNmList:"+quesNmList[i]);
	        		//System.out.println(i+":optionSelList:"+optionSelList[i]);
	        		
	        		paramMap.put("ques_nm", quesNmList[i]);
	        		paramMap.put("ans_opt_cd", optionSelList[i]);
	        		myCmmntyMapService.insertMyCmmntyMapQues(paramMap);
	        		
	        		if("03".equals(optionSelList[i])) { //객관식
		        		//System.out.println(i+"_"+"ipt_quest_option"+i);
	        			String[] optionList = request.getParameterValues("ipt_quest_option"+i);
	        			if(optionList != null && optionList.length>0) {
	        	        	for(int j=0; j<optionList.length; j++) {
	        	        		//System.out.println(i+"_"+j+":optionList:"+optionList[j]);
	        	        		paramMap.put("opt_desc", optionList[j]);
	        	        		myCmmntyMapService.insertMyCmmntyMapQuesOption(paramMap);
	        	        	}
	        			}
	        		}
	        	}
			}
			
			//배경지도
			myCmmntyMapService.deleteMyCmmntyMapData(paramMap);
			if(paramMap.get("dataWmsList") != null && !"".equals(paramMap.get("dataWmsList"))) {
		        String[] dataWmsList = paramMap.get("dataWmsList").toString().split(",");
		        String[] dataStyleList = paramMap.get("dataStyleList").toString().split(",");
		        String[] dataNmList = paramMap.get("dataNmList").toString().split(",");
		        
		        if(dataWmsList.length > 0) {
		        	for(int i=0; i<dataWmsList.length; i++) {
		        		paramMap.put("data_wms", dataWmsList[i]);
		        		paramMap.put("data_style", dataStyleList[i]);
		        		paramMap.put("data_nm", dataNmList[i]);
		        		
		        		myCmmntyMapService.insertMyCmmntyMapData(paramMap);
		        	}
		        }
			}
			
			request.setAttribute("message", "수정되었습니다.");
		}
		
		request.setAttribute("url", "/mycmmntyMap/mycmmnty-list.do");
		//System.out.println(">>A::"+paramMap);
		
		return "forward:/redirect.do";
	}
	
	/** 커뮤니티 매핑 > 마이 커뮤니티매핑 목록 > 삭제 **/
	@RequestMapping(value="/deleteMyCmmntyMap.do")
	public String deleteMyCmmntyMap(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		SessionManager.getSessionInfo(paramMap);
		//System.out.println(":::"+paramMap);
		myCmmntyMapService.deleteMyCmmntyMap(paramMap);
		
		return "jsonString";
	}
}