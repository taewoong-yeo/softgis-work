package softGis.survey;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/survey")
public class SurveyController {
	
	@Resource(name="surveyService")
	public SurveyService surveyService;
	
	/** 설문 만들기 > 설문 만들기 **/
	@RequestMapping(value="/survey-create.do")
	public String surveyCreate(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "survey/survey-create";
	}
	
	/** 설문 만들기 > 설문 그룹 목록 **/
	@RequestMapping(value="/survey-group-list.do")
	public String surveyGroupList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = surveyService.getSurveyGroupList(paramMap);
		model.addAttribute("result", result);
		return "survey/survey-group-list";
	}
	
	/** 설문 만들기 > 설문 그룹 목록 **/
	@RequestMapping(value="/survey-group-create.do")
	public String surveyGroupCreate(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "survey/survey-group-create";
	}
	
	/** 설문 만들기 > My 설문함 **/
	@RequestMapping(value="/survey-my.do")
	public String surveyMy(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "survey/survey-my";
	}
	
	/** 설문 만들기 > 설문 서식 **/
	@RequestMapping(value="/survey-format.do")
	public String surveyFormat(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "survey/survey-format";
	}
	
	/** 설문 참여하기 **/
	@RequestMapping(value="/survey-join.do")
	public String surveyJoin(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "survey/survey-join";
	}
	
	@RequestMapping(value="/getSurveyGroupDetail.do")
	public String getSurveyGroupDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = surveyService.getSurveyGroupDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertSurveyGroup.do")
	public String insertSurveyGroup(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		surveyService.insertSurveyGroup(paramMap);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateSurveyGroup.do")
	public String updateSurveyGroup(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		surveyService.updateSurveyGroup(paramMap);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteSurveyGroup.do")
	public String deleteSurveyGroup(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		surveyService.deleteSurveyGroup(paramMap);
		
		return "jsonString";
	}
	
	/** 설문 목록 > 설문 목록 **/
	@RequestMapping(value="/survey-list.do")
	public String getSurveyList(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = surveyService.getSurveyList(paramMap);
		model.addAttribute("result", result);
		return "survey/survey-list";
	}
	
	@RequestMapping(value="/getSurveyDetail.do")
	public String getSurveyDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = surveyService.getSurveyDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertSurvey.do")
	public String insertSurvey(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		surveyService.insertSurvey(paramMap);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateSurvey.do")
	public String updateSurvey(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		surveyService.updateSurvey(paramMap);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteSurvey.do")
	public String deleteSurvey(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		surveyService.deleteSurvey(paramMap);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertSurveyAnswer.do")
	public String insertSurveyAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		surveyService.insertSurveyAnswer(paramMap);
		
		return "jsonString";
	}
}