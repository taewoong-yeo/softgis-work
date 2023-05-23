package softGis.file;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import softGis.core.ErrorCodeMsg;

@Controller
public class FileController {

	private static final Log log = LogFactory.getLog(FileController.class);
	
	@Resource(name="fileService")
	public FileService fileService;
	private BufferedInputStream in = null;
	
	@RequestMapping(value="/file.do")
	@ResponseBody
	public void file(@RequestParam Map<String, Object> paramMap, HttpServletResponse response) {
		OutputStream out = null;
		FileInputStream fis = null;
		
		try {
			Object fileNameRaw = paramMap.get("name");
			
			if(fileNameRaw == null) return;
			
			paramMap.put("file_nm_local", fileNameRaw);
			
			Map<String, Object> file = fileService.getFile(paramMap);
			
			if (file == null) return;
			
			String fileName = (String) fileNameRaw;
			String fileNameOriginal = (String) file.get("file_nm_org");
			String fileMime = (String) file.get("file_mime");
			
			File fileObj = fileService.getFileObject(fileName, "", "");
			response.setContentType(fileMime);
			response.setHeader("Content-Disposition", "attachment; Filename=" + URLEncoder.encode(fileNameOriginal, "UTF-8").replaceAll("\\+", "%20"));
			response.setContentLengthLong((long) file.get("file_size"));
			
			out = response.getOutputStream();
			fis = new FileInputStream(fileObj);
			in = new BufferedInputStream(fis);
			
			if (in != null) {
				int read;
				while((read = in.read()) != -1) {
					out.write(read);
				}
			}
		} catch (FileNotFoundException e) {
			log.error(ErrorCodeMsg.ERR_FILE);
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		} finally {
			try {
				if (out != null) out.close();
				if (fis != null) fis.close();
				if (in != null) in.close();
			} catch (IOException e) {
				log.error(ErrorCodeMsg.ERR_IO);
			}
		}
	}
	
}