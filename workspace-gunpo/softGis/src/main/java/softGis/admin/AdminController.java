 package softGis.admin;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.admin.anal.AdminAnalService;

@Controller
@RequestMapping(value="/admin")
public class AdminController {
	
	@Resource(name="AdminAnalService")
	private AdminAnalService analService;
	
	/** 시스템 관리 > 코드 관리 **/
	@RequestMapping(value="/admin-code.do")
	public String adminCode(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-code";
	}
	
	/** 시스템 관리 > 사용자 관리 **/
	@RequestMapping(value="/admin-usr.do")
	public String adminUsr(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-usr";
	}
	
	/** 시스템 관리  > 설문 관리 **/
	@RequestMapping(value="/admin-cmmnty.do")
	public String adminCmmnty(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-cmmnty";
	}
	
	/** 시스템 관리  > 커뮤니티 신고 관리 **/
	@RequestMapping(value="/admin-cmmnty-report.do")
	public String adminCmmntyReport(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-cmmnty-report";
	}
	
	/** 시스템 관리  > 커뮤니티 댓글 신고 관리 **/
	@RequestMapping(value="/admin-cmmnty-answer-report.do")
	public String adminCmmntyAnswerReport(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-cmmnty-answer-report";
	}
	
	/** 시스템 관리  > 함께할지도 질문 응답 조회 **/
	@RequestMapping(value="/admin-cmmnty-answer-ques.do")
	public String adminCmmntyAnswerQues(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-cmmnty-answer-ques";
	}
	
	/** 시스템 관리  > 분석 관리 > 분석 관리 **/
	@RequestMapping(value="/admin-anal-mngr.do")
	public String adminAnalMngr(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-anal-mngr";
	}
	
	/** 시스템 관리  > 분석 관리 > 분석모델 관리 **/
	@RequestMapping(value="/admin-anal-model.do")
	public String adminAnalModel(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = analService.getAnalList(paramMap);
		model.addAttribute("result", result);
		
		return "admin/admin-anal-model";
	}
	
	/** 시스템 관리  > 분석 관리 > 분석데이터 관리 **/
	@RequestMapping(value="/admin-anal-data.do")
	public String adminAnalData(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-anal-data";
	}
	
	/** 시스템 관리  > 분석 관리 > 분석결과 관리 **/
	@RequestMapping(value="/admin-anal-result.do")
	public String adminAnalResult(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-anal-result";
	}
	
	/** 시스템 관리  > 데이터 관리 > 메타정보관리 **/
	@RequestMapping(value="/admin-meta-mngr.do")
	public String adminMetaMngr(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-meta-mngr";
	}
	
	/** 시스템 관리  > 데이터 관리 > 데이터 관리 **/
	@RequestMapping(value="/admin-meta-load.do")
	public String adminMetaLoad(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-meta-load";
	}
	
	//** 시스템 관리  > 공지사항 관리 **//*
	@RequestMapping(value="/admin-notice.do")
	public String adminNotice(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-notice";
	}
	
	//** 시스템 관리  > FAQ 관리 **//*
	@RequestMapping(value="/admin-faq.do")
	public String adminFaq(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-faq";
	}
	
	//** 시스템 관리  > QNA 관리 **//*
	@RequestMapping(value="/admin-qna.do")
	public String adminQna(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-qna";
	}
	
	//** 시스템 관리  > 자료실 관리 **//*
	@RequestMapping(value="/admin-data-board.do")
	public String adminDataBoard(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-data-board";
	}
	
	/** 시스템 관리 > 불용어 관리 **/
	@RequestMapping(value="/admin-stopwords.do")
	public String adminStopwords(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "admin/admin-stopwords";
	}
	
}
