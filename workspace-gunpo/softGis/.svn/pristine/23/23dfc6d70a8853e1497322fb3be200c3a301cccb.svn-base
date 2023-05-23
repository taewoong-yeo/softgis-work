package softGis.admin.faq;

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
public class AdminFaqController {

	@Resource(name="AdminFaqService")
	private AdminFaqService service;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	@RequestMapping(value="/getfaq.do")
	public String getFaqs(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getFaq(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertFaq.do")
	public String insertFaq(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model, HttpSession session) throws Exception {
		SessionManager.getSessionInfo(paramMap);

		if(file != null) {
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			paramMap.put("file_id", fileNo);
		} 
		
		Object result = service.insertFaq(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteFaq.do")
	public String deleteFaq(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {

		int resultAttachment = service.deleteFaqAttachment(paramMap);
		int result = 0;
		if(paramMap.get("file_id") != null) {
			fileGetService.fileDeleteFile(Long.parseLong((String)paramMap.get("file_id")));
		} 
		
		result = service.deleteFaq(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateFaq.do")
	public String updateFaq(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model) throws Exception {

		SessionManager.getSessionInfo(paramMap);
		
		if(file == null) {
			paramMap.replace("file_id", null);
		} else {
			int resultAttachment = service.deleteFaqAttachment(paramMap);
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			
			paramMap.put("file_id", fileNo);
			
			model.addAttribute("resultAttachment", resultAttachment);
		}
		
		int result = service.updateFaq(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
}
