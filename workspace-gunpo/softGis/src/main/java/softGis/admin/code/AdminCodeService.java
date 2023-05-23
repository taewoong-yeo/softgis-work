package softGis.admin.code;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.SessionManager;

@Service("adminCodeService")
public class AdminCodeService extends EgovAbstractServiceImpl {

	@Resource(name="adminCodeDAO")
	private AdminCodeDAO dao;
	
	public List<Object> getGroupCodeList(Map<String, Object> paramMap) {
		return dao.getGroupCodeList(paramMap);
	}
	
	public Object getGroupCodeDetail(Map<String, Object> paramMap) {
		return dao.getGroupCodeDetail(paramMap);
	}
	
	public String getGroupCodeExist(Map<String, Object> paramMap) {
		return dao.getGroupCodeExist(paramMap);
	}
	
	public int insertGroupCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.insertGroupCode(paramMap);
	}
	
	public int updateGroupCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.updateGroupCode(paramMap);
	}
	
	public int deleteGroupCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		
		return dao.deleteGroupCode(paramMap) & 
				dao.deleteCode(paramMap);
	}
	
	public List<Object> getCodeList(Map<String, Object> paramMap) {
		return dao.getCodeList(paramMap);
	}

	public Object getCodeDetail(Map<String, Object> paramMap) {
		return dao.getCodeDetail(paramMap);
	}
	
	public String getCodeExist(Map<String, Object> paramMap) {
		return dao.getCodeExist(paramMap);
	}
	
	public int insertCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		// 숫자형으로 형변환
		if(paramMap.get("ord") != null && !"".equals(paramMap.get("ord"))) {
			paramMap.put("ord", Integer.parseInt(paramMap.get("ord").toString()));
		}else { paramMap.put("ord",null); }
		
		return dao.insertCode(paramMap);
	}
	
	public int updateCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		// 숫자형으로 형변환
		if(paramMap.get("ord") != null && !"".equals(paramMap.get("ord"))) {
			paramMap.put("ord", Integer.parseInt(paramMap.get("ord").toString()));
		}else { paramMap.put("ord",null); }
		return dao.updateCode(paramMap);
	}
	
	public int deleteCode(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.deleteCode(paramMap);
	}
	
}
