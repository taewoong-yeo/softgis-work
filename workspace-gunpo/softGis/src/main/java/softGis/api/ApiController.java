package softGis.api;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.ser.ToXmlGenerator;

import softGis.core.Encrypter;
import softGis.core.ErrorCodeMsg;
import softGis.file.FileService;

@Controller
@RequestMapping(value="/api")
public class ApiController {
	
	private static final Log log = LogFactory.getLog(ApiController.class);
	
	@Resource(name="fileService")
	private FileService fileService;
	
	public enum ApiParameters {
		prj_cd(""), svy_id(""), item_id(""), lon(""), lat(""), img_file(""), user_id("");
		
		private final String label;

		ApiParameters(String label) {
	        this.label = label;
	    }

	    public String label() {
	        return label;
	    }

	}
	
	@RequestMapping(value="/upload_img.do", method=RequestMethod.POST)
	public ResponseEntity<String> upload_img(@RequestParam Map<String, Object> paramMap, MultipartHttpServletRequest request, ModelMap model) throws IOException {
		Map<String, Object> resultMap = null;
		
		String prj_cd = (String) paramMap.get("prj_cd");
		String svy_id = (String) paramMap.get("svy_id");
		String item_id = (String) paramMap.get("item_id");
		String lon = (String) paramMap.get("item_id");
		String lat = (String) paramMap.get("item_id");
		String usr_id = (String) paramMap.get("usr_id");
		
		//필수 요청 변수 확인
		if (prj_cd == null) return getError(ErrorCodeMsg.ERR_401);
		if (svy_id == null) return getError(ErrorCodeMsg.ERR_402);
		if (item_id == null) return getError(ErrorCodeMsg.ERR_403);
		if (lon == null) return getError(ErrorCodeMsg.ERR_404);
		if (lat == null) return getError(ErrorCodeMsg.ERR_405);
		if (usr_id == null) return getError(ErrorCodeMsg.ERR_406);
		
		//필수 요청 변수 값 확인
		if (prj_cd.equals("")) return getError(ErrorCodeMsg.ERR_401);
		if (svy_id.equals("")) return getError(ErrorCodeMsg.ERR_402);
		if (item_id.equals("")) return getError(ErrorCodeMsg.ERR_403);
		if (lon.equals("")) return getError(ErrorCodeMsg.ERR_404);
		if (lat.equals("")) return getError(ErrorCodeMsg.ERR_405);
		if (usr_id.equals("")) return getError(ErrorCodeMsg.ERR_406);

		Iterator<String> itr = request.getFileNames();
		if (itr != null) {
			while (itr.hasNext()) {
				MultipartFile mpf = request.getFile((String) itr.next());
				
				if (mpf.isEmpty()) {
					return getError(ErrorCodeMsg.ERR_407);
				} else {
					resultMap = fileService.insertFile(mpf, paramMap);
				}
			}
		}
		
		paramMap.put("type", "xml");
		
		return getResult(paramMap, resultMap);
	}
	
	public static Map<String, Object> getConvertMapParameters(Map<String, String[]> map) throws UnsupportedEncodingException {
		Map<String, Object> resultMap = new HashMap<>();
		
		for (Map.Entry<String, String[]> mapEntry : map.entrySet()) {
			for (String value : mapEntry.getValue()) {
				resultMap.put(mapEntry.getKey(), URLEncoder.encode(value, "UTF-8"));
			}
		}
		
		return resultMap;
	}
	
	public ResponseEntity<String> getResult(@RequestParam Map<String, Object> paramMap, Map<String, Object> resultMap) throws IOException {
		String reqType = paramMap.get("type").toString();
		HttpHeaders httpHeaders = new HttpHeaders();
		
		if ("xml".equals(reqType)) {
			Response response = new Response();
			Header header = new Header();
			header.setResultCode("200");
			header.setResultMsg("성공");
			header.setFile_id(getEncryptFileId((int) resultMap.get("file_id")));
			header.setFile_org_nm((String) resultMap.get("file_local_nm"));
			response.setHeader(header);

			XmlMapper xmlMapper = new XmlMapper();
			xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true);
			String xml = xmlMapper.writerWithDefaultPrettyPrinter().writeValueAsString(response);

			httpHeaders.add("Content-Type", "application/xml; charset=utf-8");
			return new ResponseEntity<String>(xml, httpHeaders, HttpStatus.OK);
		} else if ("json".equals(reqType)) {
			ObjectMapper mapper = new ObjectMapper();
			ArrayList<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>(); 
		        
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("resultCode", "200");
			map.put("resultMsg", "성공");
			map.put("file_id", getEncryptFileId((int) resultMap.get("file_id")));
			map.put("file_org_nm", (String) resultMap.get("file_local_nm"));
			list.add(map);
			
			String jsonList = "";
			String info = mapper.writeValueAsString(list);
			jsonList = "[" + jsonList.substring(1, jsonList.length() -1) + "," + info.substring(1, info.length() -1) + "]";
			
			httpHeaders.add("Content-Type", "application/json; charset=utf-8");
			return new ResponseEntity<String>(jsonList, httpHeaders, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("N/A", httpHeaders, HttpStatus.OK);
		}
	}
	
	public ResponseEntity<String> getError(ErrorCodeMsg  err) throws IOException {
		HttpHeaders httpHeaders = new HttpHeaders();
		ErrHeader errHeader = new ErrHeader();
		errHeader.setErrCode(err.getCode());
		errHeader.setErrMessage(err.getMessage());
		errHeader.setErrReason(err.getReason());
		errHeader.setErrDetail(err.getDetail());

		ErrResponse errResponse = new ErrResponse();
		errResponse.setHeader(errHeader);

		XmlMapper xmlMapper = new XmlMapper();
		xmlMapper.configure(ToXmlGenerator.Feature.WRITE_XML_DECLARATION, true);

		String xml = xmlMapper.writer().withDefaultPrettyPrinter().writeValueAsString(errResponse);

		httpHeaders.add("Content-Type", "application/xml; charset=utf-8");
		return new ResponseEntity<String>(xml, httpHeaders, HttpStatus.OK);
	}
	
	private String getEncryptFileId(int file_id) {
		String salt = "softGis";
		String hash = Encrypter.encrypt("MD5", (salt + Integer.toString(file_id)));
		
		return hash;
	}
	
	
}