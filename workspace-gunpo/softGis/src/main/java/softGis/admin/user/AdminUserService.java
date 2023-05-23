package softGis.admin.user;

import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.Encrypter;

@Service("adminUserService")
public class AdminUserService extends EgovAbstractServiceImpl {

	@Resource(name="adminUserDAO")
	private AdminUserDAO dao;
	
	public List<Object> getUserList(Map<String, Object> paramMap) {
		return dao.getUserList(paramMap);
	}

	public int insertUser(Map<String, Object> paramMap) {
		Encrypter.encrypt(paramMap);
		
		return dao.insertUser(paramMap);
	}
	
	public int updateUser(Map<String, Object> paramMap) {
		/*if(paramMap.get("usr_pw") != null && !paramMap.get("usr_pw").equals(""))
			Encrypter.encrypt(paramMap);
		비밀번호 초기화로 대체 */ 
		return dao.updateUser(paramMap);
	}

	public int updateUserPwd(Map<String, Object> paramMap) {

		Encrypter.encrypt(paramMap);
		
		return dao.updateUserPwd(paramMap);
	}

}
