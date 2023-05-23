package softGis.admin.stopwords;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminStopwordsController {
	
	@Resource(name="adminStopwordsService")
	private AdminStopwordsService service;
	
	@RequestMapping(value="/getStopwordsList.do")
	public String getStopwordsList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getStopwordsList(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getStopwordsDetail.do")
	public String getStopwordsDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = service.getStopwordsDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getStopwordsExist.do")
	public String getStopwordsExist(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		String result = service.getStopwordsExist(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertStopwords.do")
	public String insertStopwords(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.insertStopwords(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateStopwords.do")
	public String updateStopwords(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateStopwords(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteStopwords.do")
	public String deleteStopwords(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteStopwords(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
}
