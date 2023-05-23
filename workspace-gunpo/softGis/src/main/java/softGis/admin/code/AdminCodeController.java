package softGis.admin.code;

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
public class AdminCodeController {
	
	@Resource(name="adminCodeService")
	private AdminCodeService service;
	
	@RequestMapping(value="/getGroupCodeList.do")
	public String getGroupCodeList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getGroupCodeList(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getGroupCodeDetail.do")
	public String getGroupCodeDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = service.getGroupCodeDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getGroupCodeExist.do")
	public String getGroupCodeExist(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		String result = service.getGroupCodeExist(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertGroupCode.do")
	public String insertGroupCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.insertGroupCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateGroupCode.do")
	public String updateGroupCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateGroupCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteGroupCode.do")
	public String deleteGroupCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteGroupCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getCodeList.do")
	public String getCodeList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getCodeList(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getCodeDetail.do")
	public String getCodeDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = service.getCodeDetail(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getCodeExist.do")
	public String getCodeExist(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		String result = service.getCodeExist(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertCode.do")
	public String insertCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.insertCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateCode.do")
	public String updateCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteCode.do")
	public String deleteCode(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteCode(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
}
