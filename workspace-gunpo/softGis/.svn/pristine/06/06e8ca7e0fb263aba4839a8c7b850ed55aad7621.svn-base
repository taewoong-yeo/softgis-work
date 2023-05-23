package softGis.fileGet;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.apache.ibatis.io.Resources;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.Encrypter;
import softGis.core.SessionManager;

@Service("FileGetService")
public class FileGetService extends EgovAbstractServiceImpl {
	
	@Resource(name="fileGetDAO")
	public FileGetDAO fileGetDAO;
	
	private final String resource = "globals.properties";
	private final Properties properties = new Properties();
	private final int uploadMaxLoop = 10;
	
	public static final String UPLOAD_SUBPATH_ANAL = "ANAL";
	public static final String UPLOAD_SUBPATH_BOARD = "BOARD";
	public static final String UPLOAD_SUBPATH_CMMNTY = "CMMNTY";
	public static final String UPLOAD_SUBPATH_QNA = "QNA";
	public static final String UPLOAD_SUBPATH_PARTCPTN = "PARTCPTN";
	
	public Map<String, Object> fileGetFile(Map<String, Object> paramMap) {
		Map<String, Object> file = fileGetDAO.fileGetFile(paramMap);							
		
		return file;
	}
	
	public boolean fileDeleteFile(long fileid) {
		Map<String, Object> paramMap = new HashMap<>();
		Map<String, Object> file = null;
		
		paramMap.put("file_id", fileid);
		
		file = fileGetDAO.fileDeleteFile(paramMap);
		
		if (file != null) {
			String fileLocalName = (String) file.get("file_local_nm");
			String filePath = (String) file.get("file_path");
			String fileLocalPath = filePath + "/" + fileLocalName;
			
			File targetFile = new File(fileLocalPath);
			
			targetFile.delete();
			
			return true;
		}
		
		return false;
	}
	
	public int fileInsertFile(MultipartFile file, String subPath) throws IOException, URISyntaxException {
		Map<String, Object> paramMap = new HashMap<>();
		
		File targetFile = null;
		
		try {
			String fileOriginalName = file.getOriginalFilename();
			String fileLocalName = null;
			String filePath = this.fileGetUploadFolderPath(subPath);
			String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
			String fileMimeType = file.getContentType();
			SessionManager.getSessionInfo(paramMap);
			long fileSize = file.getSize();
			
			int i = 0;
			
			do {
				if (i >= uploadMaxLoop) targetFile = null;
				
				fileLocalName = this.fileGetRandomFileName(fileOriginalName);
				targetFile = new File(filePath + "/" + fileLocalName + "." + fileExtension);
				
				i++;
			} while(targetFile.exists());
			
			file.transferTo(targetFile);
			
			paramMap.put("file_org_nm", fileOriginalName);
			paramMap.put("file_local_nm", fileLocalName + "." + fileExtension);
			paramMap.put("file_ext", fileExtension);
			paramMap.put("file_mime", fileMimeType);
			paramMap.put("file_size", fileSize);
			paramMap.put("file_path", filePath);
			
			fileGetDAO.fileInsertFile(paramMap);
			
			return (int) paramMap.get("file_id");
		} catch (Exception e) {
			if(targetFile != null) targetFile.delete();
			throw e;
		}
		
	}
	
	public String fileGetUploadFolderPath(String subPath) throws IOException, URISyntaxException  {
		String os = "";
		String path = "";
		
		if (System.getProperty("os.name") != null) {
			os = System.getProperty("os.name").toLowerCase();
			properties.load(Resources.getResourceAsReader(resource));
			String uploadPath = properties.getProperty("sys.upload");
			
			if (os.indexOf("window") > -1) {
				uploadPath = properties.getProperty("sys.upload_win");
				if (uploadPath != null && !"".equals(uploadPath)) {
					uploadPath = uploadPath.replaceAll("^\"|\"$", "");
				}
				
			} else {
				if (uploadPath != null && !"".equals(uploadPath)) {
					uploadPath = uploadPath.replaceAll("^\"|\"$", "");
				}
			}
			uploadPath += "/" + subPath;
			File Folder = new File(uploadPath);
			if (!Folder.exists()) {
				Folder.setExecutable(false, true);
				Folder.setReadable(true);
				Folder.setWritable(false, true);
				
				boolean success = Folder.mkdir();
				if (success) path = Folder.getPath(); 
			}

			path = ResourceUtils.getURL(uploadPath).toURI().getPath();
		}
		
		return path;
	}
	
	private String fileGetRandomFileName(String salt) {
		String timestamp = Long.toString(new Timestamp(System.currentTimeMillis()).getTime());
		String hash = Encrypter.encrypt("MD5", (salt + timestamp + Double.toString(Math.random())));
		
		return timestamp + "_" + hash;
	}

}