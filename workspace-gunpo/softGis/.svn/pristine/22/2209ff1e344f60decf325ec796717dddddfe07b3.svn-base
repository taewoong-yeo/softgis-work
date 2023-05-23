package softGis.admin.databoard;

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
import softGis.admin.databoard.AdminDataBoardService;
import softGis.core.SessionManager;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminDataBoardController {

	@Resource(name="AdminDataBoardService")
	private AdminDataBoardService service;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	@RequestMapping(value="/getDataBoards.do")
	public String getDataBoards(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getDataBoards(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertDataBoard.do")
	public String insertDataBoard(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file,@RequestParam(value="img_blob_raw", required=false) MultipartFile fileblob, ModelMap model, HttpSession session) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		if(file != null) {
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			paramMap.put("file_id", fileNo);
		} 
		
		
		Object result = service.insertDataBoard(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}

	@RequestMapping(value="/updateDataBoard.do")
	public String updateDataBoard(@RequestParam Map<String, Object> paramMap, @RequestParam(value="att_file", required=false) MultipartFile file, ModelMap model) throws Exception {
		
		if(file == null) {
			paramMap.replace("file_id", null);
		} else {
			int resultAttachment = service.deleteDataBoardAttachment(paramMap);
			int fileNo = fileGetService.fileInsertFile(file, FileGetService.UPLOAD_SUBPATH_BOARD);
			
			paramMap.put("file_id", fileNo);
			
			model.addAttribute("resultAttachment", resultAttachment);
		}
		
		int result = service.updateDataBoard(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteDataBoard.do")
	public String deleteDataBoard(@RequestParam Map<String, Object> paramMap, ModelMap model) throws Exception {
		service.deleteDataBoardAttachment(paramMap);
		int result = service.deleteDataBoard(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	
}
