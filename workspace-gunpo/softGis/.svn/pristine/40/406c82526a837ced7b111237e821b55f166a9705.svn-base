package softGis.admin.qna;

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
public class AdminQnaController {

	@Resource(name="AdminQnaService")
	private AdminQnaService service;


	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	@RequestMapping(value="/getQna.do")
	public String getQna(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getQna(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	
	@RequestMapping(value="/updateQna.do")
	public String updateQna(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		int result = service.updateQna(paramMap);
		model.addAttribute("result", result);
		/* 파일관련 임시 주석 처리
		if(file == null) {
			paramMap.replace("file_id", null);
		} else {
			int resultAttachment = service.deleteFaq(paramMap);
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			
			paramMap.put("file_id", fileNo);
			
			model.addAttribute("resultAttachment", resultAttachment);
		}*/
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteQna.do")
	public String deleteNotice(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		int result = service.deleteQna(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	
}
