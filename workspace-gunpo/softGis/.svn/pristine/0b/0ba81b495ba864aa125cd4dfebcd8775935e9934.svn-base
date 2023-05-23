package softGis.admin.cmmnty;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mapstruct.Mapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import softGis.fileGet.FileGetService;
import softGis.core.SessionManager;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminCmmntyController {

	@Resource(name="AdminCmmntyService")
	private AdminCmmntyService service;
	
	@RequestMapping(value="/getCmmnty.do")
	public String getCmmnty(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCmmnty(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateCmmnty.do")
	public String updateCmmnty(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateCmmnty(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getCmmntyReport.do")
	public String getCmmntyReport(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCmmntyReport(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getCmmntyAnswerReport.do")
	public String getCmmntyAnswerReport(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCmmntyAnswerReport(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	
	@RequestMapping(value="/updateCmmntyReport.do")
	public String updateCmmntyReport(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateCmmntyReport(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	

	// 커뮤니티 의견 신고
	@RequestMapping(value="/getCmmntyMapngAnswer.do")
	public String getCmmntyMapngAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCmmntyMapngAnswer(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}

	@RequestMapping(value="/getCmmntyMapngAnswerReport.do")
	public String getCmmntyMapngAnswerReport(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCmmntyMapngAnswerReport(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	

	@RequestMapping(value="/updateCmmntyMapngAnswer.do")
	public String updateCmmntyMapngAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteCmmntyMapngAnswerReport(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteCmmntyMapngAnswer.do")
	public String deleteCmmntyMapngAnswer(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteCmmntyMapngAnswer(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
}
