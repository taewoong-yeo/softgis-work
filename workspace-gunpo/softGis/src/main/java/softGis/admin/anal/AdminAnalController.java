package softGis.admin.anal;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminAnalController {

	@Resource(name="AdminAnalService")
	private AdminAnalService service;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	
	@RequestMapping(value="/getAnalList.do")
	public String getAnalList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getAnalList(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertAnal.do")
	public String insertModel(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpSession session) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		Object result = service.insertAnal(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateAnal.do")
	public String updateAnal(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateAnal(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteAnal.do")
	public String deleteAnal(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteAnal(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getModelList.do")
	public String getModelList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getModelList(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertModel.do")
	public String insertModel(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model, HttpSession session) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		if (file != null) {
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_ANAL);
			paramMap.put("file_id", fileNo);
		} 
		
		Object result = service.insertModel(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}

	@RequestMapping(value="/updateModel.do")
	public String updateModel(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model) throws Exception {
		if(file == null) {
			paramMap.replace("file_id", null);
		} else {
			//int resultAttachment = service.deleteModelAttachment(paramMap);
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_ANAL);
			paramMap.put("file_id", fileNo);
			
			//model.addAttribute("resultAttachment", resultAttachment);
		}
		
		int result = service.updateModel(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteModel.do")
	public String deleteModel(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		int resultAttachment = service.deleteModelAttachment(paramMap);
		int result = 0;
		if(paramMap.get("file_id") != null) {
			fileGetService.fileDeleteFile(Long.parseLong((String)paramMap.get("file_id")));
		} 
			result = service.deleteModel(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getAnalMetadatas.do")
	public String getAnalMetadatas(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getAnalMetadatas(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getAnalAvailableMetadatas.do")
	public String getAnalAvailableMetadatas(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getAnalAvailableMetadatas(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertAnalMetadata.do")
	public String insertAnalMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		SessionManager.getSessionInfo(paramMap);
		
		if(service.checkAnalMetadataCollision(paramMap)) {
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			
			model.addAttribute("error", "이미 추가된 데이터입니다.");
			
			return "jsonString";
		}
		
		int result = service.insertAnalMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateAnalMetadata.do")
	public String updateAnalMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateAnalMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteAnalMetadata.do")
	public String deleteAnalMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.deleteAnalMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
}
