package softGis.file;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.io.Resources;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.Encrypter;
import softGis.core.ErrorCodeMsg;

@Service("fileService")
public class FileService extends EgovAbstractServiceImpl {

	private static final Log log = LogFactory.getLog(FileService.class);
	
	@Resource(name="fileDAO")
	public FileDAO fileDAO;
	
	private final String resource = "globals.properties";
	private final Properties properties = new Properties();
	private final int uploadMaxLoop = 10;
	
	public Map<String, Object> getFile(Map<String, Object> paramMap) {
		Map<String, Object> file = fileDAO.getFile(paramMap);
		
		String prj_cd = (String) paramMap.get("prj_cd");
		String svy_id = (String) paramMap.get("svy_id");
		String subFolder = String.format("%d", Integer.parseInt(svy_id) / 1000) + "000";
		
		if(file != null) {
			file.put("file_nm_local", this.getUploadFolderPath(prj_cd, subFolder) + "/" + file.get("file_nm_local"));
		}
		
		return file;
	}
	
	public boolean deleteFile(long fileNo) {
		Map<String, Object> paramMap = null;
		Map<String, Object> file = null;
		
		paramMap = new HashMap<>();
		paramMap.put("file_no", fileNo);
		
		file = fileDAO.deleteFile(paramMap);
		
		if(file != null) {
			String fileLocalName = (String) file.get("file_nm_local");
			
			if (fileLocalName != null && !"".equals(fileLocalName)) {
				fileLocalName = fileLocalName.replaceAll("^\"|\"$", "");
				
				String prj_cd = (String) paramMap.get("prj_cd");
				String svy_id = (String) paramMap.get("svy_id");
				String subFolder = String.format("%d", Integer.parseInt(svy_id) / 1000) + "000";
				
				String path = this.getUploadFolderPath(prj_cd, subFolder);
				if (path != null && !"".equals(path)) {
					path = path.replaceAll("^\"|\"$", "");
					
					File targetFile = new File(path + "/" + fileLocalName);
					if (targetFile != null) targetFile.delete();
				}
				
				return true;
			}
		}
		
		return false;
	}
	
	public Map<String, Object> insertFile(MultipartFile file, Map<String, Object> request) {
		File targetFile = null;
		
		try {
			Map<String, Object> paramMap = new HashMap<>();
			
			String fileOriginalName = file.getOriginalFilename();
			String fileLocalName = null;
			String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
			String fileMimeType = file.getContentType();
			
			long fileSize = file.getSize();
			
			int i = 0;
			
			do {
				if(i >= uploadMaxLoop) {
					targetFile = null;
				}
				
				String prj_cd = (String) request.get("prj_cd");
				String svy_id = (String) request.get("svy_id");
				String item_id = (String) request.get("item_id");
				String usr_id = (String) request.get("usr_id");
				
				fileLocalName = prj_cd + "_" + svy_id + "_A" + item_id + "_" + usr_id + "_" + (new SimpleDateFormat("YYYYMMDDHHmmss")).format(System.currentTimeMillis());
				
				if (fileLocalName != null && !"".equals(fileLocalName)) {
					fileLocalName = fileLocalName.replaceAll("^\"|\"$", "");
				}
				
				String subFolder = String.format("%d", Integer.parseInt(svy_id) / 1000) + "000";
				String path = this.getUploadFolderPath(prj_cd, subFolder);
				
				if (path != null && !"".equals(path)) {
					targetFile = new File(path + "/" + fileLocalName + "." + fileExtension);
					
					paramMap.put("file_org_nm", fileOriginalName);
					paramMap.put("file_local_nm", targetFile.getName());
					paramMap.put("file_ext", fileExtension);
					paramMap.put("file_mime", fileMimeType);
					paramMap.put("file_size", fileSize);
					paramMap.put("usr_id", usr_id);
				}
				
				i++;
			}
			
			while(targetFile.exists());
			
			file.transferTo(targetFile);
			fileDAO.insertFile(paramMap);
			
			return paramMap;
		} catch (IOException e) {
			if (targetFile != null) targetFile.delete();
			
			return null;
		}
	}
	
	public File getFileObject(String fileName, String prj_cd, String subFolder) {
		String path = this.getUploadFolderPath(prj_cd, subFolder);
		
		if (path != null && !"".equals(path)) {
			path = path.replaceAll("^\"|\"$", "");
		}
		
		return new File(path + "/" + fileName);
	}
	
	private String getUploadFolderPath(String prj_cd, String subFolder) {
		String path = "";
		String uploadPath = "";
		
		try {
			if (System.getProperty("os.name") != null) {
				String os = System.getProperty("os.name").toLowerCase();
				properties.load(Resources.getResourceAsReader(resource));
				
				if (os.indexOf("window") > -1)  uploadPath = properties.getProperty("sys.upload_win");
				else uploadPath = properties.getProperty("sys.upload");
				
				if (uploadPath != null && !"".equals(uploadPath)) {
					uploadPath = uploadPath.replaceAll("^\"|\"$", "");
				}
				
				path = getUploadFolder(uploadPath, prj_cd, subFolder);
			}
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		}
		
		return path;
	}
	
	private String getUploadFolder(String uploadPath, String prj_cd, String subFolder) {
		boolean success = false;
		
		uploadPath += "/" + prj_cd;
		File Folder = new File(uploadPath);
		if (!Folder.exists()) {
			Folder.setExecutable(false, true);
			Folder.setReadable(true);
			Folder.setWritable(false, true);
			success = Folder.mkdir();
			
			if (success) uploadPath = Folder.getPath();
			else return uploadPath = null;
		}
		
		uploadPath += "/" + subFolder;
		File Folder2 = new File(uploadPath);
		if (!Folder2.exists()) {
			Folder2.setExecutable(false, true);
			Folder2.setReadable(true);
			Folder2.setWritable(false, true);
			
			success = Folder2.mkdir();
			
			if (success) uploadPath = Folder2.getPath();
			else return uploadPath = null;
		}
		
		return uploadPath;
	}
	
	private String getRandomFileName(String salt) {
		String timestamp = Long.toString(new Timestamp(System.currentTimeMillis()).getTime());
		java.security.SecureRandom random = new java.security.SecureRandom();
		String hash = Encrypter.encrypt("MD5", (salt + timestamp + Integer.toString(random.nextInt(10000))));
		
		return timestamp + "_" + hash;
	}
	
}