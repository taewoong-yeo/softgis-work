package softGis.main;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.auth.UserVO;
import softGis.core.CoreService;
import softGis.core.Encrypter;
import softGis.core.Pagination;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;
	
@Controller
public class MainController {
	
	@Resource(name="mainService")
	public MainService mainService;
	
	@Resource(name="coreService")
	public CoreService coreService;
	
	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	/** 메인 **/
	@RequestMapping(value="/main.do")
	public String main(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return mainService.main(request, paramMap, model);
	}
	
	/** 마이페이지 **/
	@RequestMapping(value="/mypage.do")
	public String mypage(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		return mainService.mypage(request, paramMap, model);
	}
	
	/** 서비스 소개 **/
	@RequestMapping(value="/service.do")
	public String service(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "service";
	}
	
	/** 빅데이터 분석 **/
	@RequestMapping(value="analysis.do")
	public String analysis(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "analysis";
	}
	
	/** 공지사항 **/
	@RequestMapping(value="/noticeList.do")
	public String getNoticeList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		LocalDate now = LocalDate.now();             //현재 시간 구해오기     
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");                 
		String nowDate = now.format(formatter);             
		
		String search_keyword = (String) paramMap.get("search_keyword");
		paramMap.put("nowDate", nowDate);
		
		Map<String, Object> cnt = mainService.getNoticeCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 10);

		List<Object> noticeList = mainService.getNoticeList(paramMap);
	
		model.addAttribute("search_keyword", search_keyword);
		model.addAttribute("pagination", getPagination);
		model.addAttribute("noticeList", noticeList);
		model.addAttribute("paramMap", paramMap);
			
		return "notice/notice-list";
	}

	/** 공지사항 상세 **/
	@RequestMapping(value="/noticeDetail.do")
	public String getNoticeDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		Map<String, Object> noticeDetail = mainService.getNoticeDetail(paramMap);
		if(noticeDetail.get("img_blob")!=null) {
			byte[] arr = (byte[]) noticeDetail.get("img_blob");
			noticeDetail.put("img_blob", new String(arr));
		}
		model.addAttribute("serchvalue", paramMap.get("serchvalue"));
		model.addAttribute("noticeDetail", noticeDetail);
		model.addAttribute("page", paramMap.get("page"));
		return "notice/notice-detail";
	}	
	
	/** FAQ **/
	@RequestMapping(value="/faqList.do")
	public String faqList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		LocalDate now = LocalDate.now();             //현재 시간 구해오기     
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");                 
		String nowDate = now.format(formatter);             
		
		String search_keyword = (String) paramMap.get("search_keyword");
		paramMap.put("nowDate", nowDate);
		
		Map<String, Object> cnt = mainService.getFaqCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 10);

		List<Object> faqList = mainService.getFaqList(paramMap);
	
		model.addAttribute("search_keyword", search_keyword);
		model.addAttribute("pagination", getPagination);
		model.addAttribute("faqList", faqList);
		
		return "faq/faq-list";
	}
	
	/** FAQ 상세 **/
	@RequestMapping(value="/faqDetail.do")
	public String getFaqDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		Map<String, Object> detail = mainService.getFaqDetail(paramMap);
		model.addAttribute("detail", detail);
		model.addAttribute("page", paramMap.get("page"));
		return "jsonString";
	}	
	
	/** QnA **/
	@RequestMapping(value="/qnaList.do")
	public String qnaList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {		
		SessionManager.getSessionInfo(paramMap);		
		LocalDate now = LocalDate.now();             //현재 시간 구해오기     
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");                 
		String nowDate = now.format(formatter);             

		System.out.println("::"+paramMap); 
		String search_keyword = (String) paramMap.get("search_keyword");

		if(search_keyword != null && search_keyword.trim().length()==0) {		
			//System.out.println(search_keyword.trim().length()+"search_keyword:"+search_keyword); 
			paramMap.put("search_keyword", null);
		}
		paramMap.put("nowDate", nowDate);
		
		Map<String, Object> cnt = mainService.getQnaCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 10);

		List<Object> qnaList = mainService.getQnaList(paramMap);

		model.addAttribute("searchOption", paramMap.get("searchOption"));
		model.addAttribute("search_keyword", search_keyword);
		model.addAttribute("pagination", getPagination);
		model.addAttribute("qnaList", qnaList);
		
		return "qna/qna-list";
	}
	
	/** QnA 등록 **/
	@RequestMapping(value="/qnaForm.do")
	public String getQnaForm(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		if(paramMap.get("qna_id") != null && !"".equals(paramMap.get("qna_id"))){	
			SessionManager.getSessionInfo(paramMap);		
			Map<String, Object> qnaDetail = mainService.getQnaDetail(paramMap);
			model.addAttribute("qnaDetail", qnaDetail);
		}
		model.addAttribute("serchvalue", paramMap.get("serchvalue"));
		model.addAttribute("currentPage", paramMap.get("currentPage"));
		return "qna/qna-form";
	}	
	
	/** QnA 상세 **/
	@RequestMapping(value="/qnaDetail.do")
	public String getQnaDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		//System.out.println("::"+paramMap); 	
		SessionManager.getSessionInfo(paramMap);		
		Map<String, Object> qnaDetail = mainService.getQnaDetail(paramMap);
		model.addAttribute("qnaDetail", qnaDetail);
		model.addAttribute("serchvalue", paramMap.get("serchvalue"));
		model.addAttribute("currentPage", paramMap.get("currentPage"));
		return "qna/qna-detail";
	}	
	
	/** QnA > 저장하기 **/
	@RequestMapping(value="/insertQna.do")
	public String insertQna(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) throws Exception {
		if(paramMap.get("qna_id") != null && !"".equals(paramMap.get("qna_id"))){
			return mainService.updateQna(paramMap, request);
		}else {
			return mainService.insertQna(paramMap, request);
		}
	}
	
	/** QnA > 삭제하기 **/
	@RequestMapping(value="/deleteQna.do")
	public String deleteQna(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) throws Exception {
		SessionManager.getSessionInfo(paramMap);

		Map<String, Object> qnaDetail = mainService.getQnaDetail(paramMap);
		if(qnaDetail == null){ 
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			model.addAttribute("error",  "삭제할 데이터가 없습니다.");
		}else if(qnaDetail.get("reply_content") != null && !"".equals(qnaDetail.get("reply_content"))){ //답변존재 시 수정불가
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			model.addAttribute("error",  "답변이 존재하여 삭제할 수 없습니다.");
		}else {
			if(qnaDetail.get("file_id") != null && !"".equals(qnaDetail.get("file_id"))){
				fileGetService.fileDeleteFile((long) qnaDetail.get("file_id"));
			}
			mainService.deleteQna(paramMap);
		}
		
		return "jsonString";
	}
	
	
	@RequestMapping(value="/redirect.do")
	public String redirect(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAllAttributes(paramMap);
		
		return "redirect";
	}
	
	@RequestMapping(value="/getCodes.do")
	public String getCodes(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = mainService.getCodes(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateUsrPassword.do")
	public String updateUsrPassword(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		return mainService.updateUsrPassword(paramMap, model);
	}
	
	@RequestMapping(value="/getAnswerTime.do")
	public String getAnswerTime(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		return mainService.getAnswerTime(paramMap, model);
	}
	

	/** 자료실 **/
	@RequestMapping(value="/dataList.do")
	public String dataList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		String search_keyword = (String) paramMap.get("search_keyword");
		
		Map<String, Object> cnt = mainService.getDataCount(paramMap);
		Map<String, Object> getPagination = Pagination.getPagination(paramMap, cnt, 10);

		List<Object> dataList = mainService.getDataList(paramMap);
	
		model.addAttribute("search_keyword", search_keyword);
		model.addAttribute("pagination", getPagination);
		model.addAttribute("dataList", dataList);
		model.addAttribute("paramMap", paramMap);
		
		return "data/data-list";
	}
	

	/** 자료실 > 등록폼**/
	@RequestMapping(value="/dataForm.do")
	public String dataForm(@RequestParam Map<String, Object> paramMap, ModelMap model) {

		String jobMode1="INSERT";
		
		if ( paramMap.get("job_mode") != null) {
			jobMode1 = (String) paramMap.get("job_mode");
		}
		
		if(jobMode1.equals("UPDATE")) {

			Map<String, Object> dataLisDetail = mainService.getDataDetail(paramMap);
			model.addAttribute("dataList", dataLisDetail);
		}
		
		model.addAttribute("data_id", paramMap.get("data_id"));
		model.addAttribute("job_mode", jobMode1);
		model.addAttribute("serchvalue", paramMap.get("serchvalue"));
		model.addAttribute("page", paramMap.get("page"));
		
		return "data/data-form";
	}

	/** 자료실 > 저장하기 **/
	@RequestMapping(value="/insertData.do")
	public String insertData(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) throws Exception {
		return mainService.insertData(paramMap, request);
	}
	

	/** 자료실 > 수정하기 **/
	@RequestMapping(value="/updateData.do")
	public String updateData(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) throws Exception {
		return mainService.updateData(paramMap, request);
	}
	

	/** 자료실 상세 **/
	@RequestMapping(value="/dataDetail.do")
	public String dataDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		SessionManager.getSessionInfo(paramMap);

		Map<String, Object> dataLisDetail = mainService.getDataDetail(paramMap);
		model.addAttribute("session", paramMap.get("session_usr_id"));
		model.addAttribute("dataList", dataLisDetail);
		model.addAttribute("serchvalue", paramMap.get("serchvalue"));
		model.addAttribute("page", paramMap.get("page"));
		
		return "data/data-detail";
	}
	

	/** 자료실 첨부파일 삭제 **/
	@RequestMapping(value="/deleteDataFile.do")
	public String deleteCmmntyAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		int isDel=0;
		boolean result = mainService.deleteDataFile(paramMap, request);
		if (result) {
			isDel=1;
		}
		model.addAttribute("result", isDel);
		
		return "jsonString"; 
	}	
	
}