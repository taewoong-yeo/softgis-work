package softGis.mycmmntyMap;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.admin.code.AdminCodeDAO;
import softGis.cmmntyMap.CmmntyMapDAO;
import softGis.core.CoreDAO;
import softGis.core.Pagination;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Service("myCmmntyMapService")
public class MyCmmntyMapService extends EgovAbstractServiceImpl {
	
	@Resource(name="mycmmntyMapDAO")
	public MyCmmntyMapDAO mycmmntyMapDAO;
	
	@Resource(name="cmmntyMapDAO")
	public CmmntyMapDAO cmmntyMapDAO;
	
	
	public List<Object> getMyCmmntyMapList(Map<String, Object> paramMap) {
		return mycmmntyMapDAO.getMyCmmntyMapList(paramMap);
	};
	
	public Map<String, Object> getMyCmmntyMapCount(Map<String, Object> paramMap) {
		return mycmmntyMapDAO.getMyCmmntyMapCount(paramMap);
	};

	public Map<String, Object> getMyCmmntyMapDetail(Map<String, Object> paramMap) {
		return mycmmntyMapDAO.getMyCmmntyMapDetail(paramMap);
	};
	
	public List<Object> getMyCmmntyMapQuesList(Map<String, Object> paramMap) {
		return mycmmntyMapDAO.getMyCmmntyMapQuesList(paramMap);
	};
	
	public List<Object> getMyCmmntyMapDataList(Map<String, Object> paramMap) {
		return mycmmntyMapDAO.getMyCmmntyMapDataList(paramMap);
	};
	
	public int updateMyCmmntyMap(Map<String, Object> paramMap){
		return mycmmntyMapDAO.updateMyCmmntyMap(paramMap);
	}
	
	public int insertMyCmmntyMapQues(Map<String, Object> paramMap){
		return cmmntyMapDAO.insertCmmntyMapQues(paramMap);
	}
	
	public int insertMyCmmntyMapQuesOption(Map<String, Object> paramMap){
		return cmmntyMapDAO.insertCmmntyMapQuesOption(paramMap);
	}
	
	public int deleteMyCmmntyMapQues(Map<String, Object> paramMap){
		return mycmmntyMapDAO.deleteMyCmmntyMapQues(paramMap);
	}
	
	public int deleteMyCmmntyMapQuesOption(Map<String, Object> paramMap){
		return mycmmntyMapDAO.deleteMyCmmntyMapQuesOption(paramMap);
	}
	
	public int insertMyCmmntyMapData(Map<String, Object> paramMap){
		return mycmmntyMapDAO.insertMyCmmntyMapData(paramMap);
	}
	
	public int deleteMyCmmntyMapData(Map<String, Object> paramMap){
		return mycmmntyMapDAO.deleteMyCmmntyMapData(paramMap);
	}
	
	public void deleteMyCmmntyMap(Map<String, Object> paramMap) {		
		mycmmntyMapDAO.updateStatMyCmmntyMapQuesOption(paramMap);	
		mycmmntyMapDAO.updateStatMyCmmntyMapQues(paramMap);
		mycmmntyMapDAO.updateStatMyCmmntyMap(paramMap);
	};
	
	public int getAnswerOfMyCmmntyCount(Map<String, Object> paramMap){
		return mycmmntyMapDAO.getAnswerOfMyCmmntyCount(paramMap);
	}
}