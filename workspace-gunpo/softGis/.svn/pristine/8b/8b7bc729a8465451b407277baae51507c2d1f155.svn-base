package softGis.fileGet;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FileGetController {
	
	private static final Log log = LogFactory.getLog(FileGetController.class);
	
	private final String resource = "globals.properties";
	private final Properties properties = new Properties();
	
	@Resource(name="FileGetService")
	public FileGetService fileGetService;
	
	@RequestMapping(value="/fileGet.do")
	@ResponseBody
	public void fileGet(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) throws Exception {
		int fileId = Integer.parseInt(paramMap.get("fileId").toString());
		
		if(fileId == 0)
			return;
		
		paramMap.put("file_id", fileId);
		Map<String, Object> file = fileGetService.fileGetFile(paramMap);
		
		if(file == null)
			return;
		
		String filePath = (String) file.get("file_path");
		String fileLocalNm = (String) file.get("file_local_nm");
		String fileNameOriginal = (String) file.get("file_org_nm");
		String fileMime = (String) file.get("file_mime");
		
		File fileObj = new File(filePath + "/" + fileLocalNm);
		
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(fileObj));
		
		response.setContentType(fileMime);
		response.setHeader("Content-Disposition", "attachment; Filename=" + URLEncoder.encode(fileNameOriginal, "UTF-8"));
		response.setContentLengthLong((long) file.get("file_size"));
		
		OutputStream out = response.getOutputStream();

		try {
			int read;
			
			while((read = in.read()) != -1) {
				out.write(read);
			}
		} finally {
			out.flush();
			out.close();
		}
	}
	
	@RequestMapping(value="/loadImage.do")
	public String loadImage(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) {

		if (!"".equals(paramMap.get("file_id")) && paramMap.get("file_id") != null) {
			Map<String, Object> file = fileGetService.fileGetFile(paramMap);
			response.setContentType("image/jpg");
			
			try {
			    ServletOutputStream bout = response.getOutputStream();
			    String img = file.get("file_path").toString() + "/" + file.get("file_local_nm");
			    
			    int length;
			    byte[] buffer = new byte[10];
			    FileInputStream f = new FileInputStream(img);
			    while((length = f.read(buffer)) != -1) {
			    	bout.write(buffer, 0, length);
			    }
			} catch (IOException e) {
				log.error("IOException : " + e.getMessage().toString());
			}
		}
		
	    return null;
	}
	
}