package softGis.admin.notice;

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
public class AdminNoticeController {

	@Resource(name="AdminNoticeService")
	private AdminNoticeService service;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	@RequestMapping(value="/getNotices.do")
	public String getNotices(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getNotices(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertNotice.do")
	public String insertNotice(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file,@RequestParam(value="img_blob_raw", required=false) MultipartFile fileblob, ModelMap model, HttpSession session) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		if(file != null) {
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			paramMap.put("file_id", fileNo);
		} 
		
		
		Object result = service.insertNotice(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}

	@RequestMapping(value="/updateNotice.do")
	public String updateNotice(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model) throws Exception {
		//long filePk = Long.parseLong((String)paramMap.get("file_id"));
		if(file == null) {
			paramMap.replace("file_id", null);
		} else {
			int resultAttachment = service.deleteNoticeAttachment(paramMap);
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			
			paramMap.put("file_id", fileNo);
			
			model.addAttribute("resultAttachment", resultAttachment);
		}
		
		int result = service.updateNotice(paramMap);
		//fileGetService.fileDeleteFile(filePk);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteNotice.do")
	public String deleteNotice(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		int resultAttachment = service.deleteNoticeAttachment(paramMap);
		int result = 0;
		if(paramMap.get("file_id") != null) {
			fileGetService.fileDeleteFile(Long.parseLong((String)paramMap.get("file_id")));
		} 
			result = service.deleteNotice(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
}
