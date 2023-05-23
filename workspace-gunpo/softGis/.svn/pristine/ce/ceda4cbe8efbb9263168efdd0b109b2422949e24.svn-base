package softGis.admin.stopwords;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.SessionManager;

@Service("adminStopwordsService")
public class AdminStopwordsService extends EgovAbstractServiceImpl {

	@Resource(name="adminStopwordsDAO")
	private AdminStopwordsDAO dao;
	
	public List<Object> getStopwordsList(Map<String, Object> paramMap) {
		return dao.getStopwordsList(paramMap);
	}
	
	public Object getStopwordsDetail(Map<String, Object> paramMap) {
		return dao.getStopwordsDetail(paramMap);
	}
	
	public String getStopwordsExist(Map<String, Object> paramMap) {
		return dao.getStopwordsExist(paramMap);
	}
	
	public int insertStopwords(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.insertStopwords(paramMap);
	}
	
	public int updateStopwords(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.updateStopwords(paramMap);
	}
	
	public int deleteStopwords(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		
		return dao.deleteStopwords(paramMap);
	}
	
}
