package softGis.core;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import softGis.auth.UserVO;

public class SessionManager {
	
	private static final Log log = LogFactory.getLog(SessionManager.class);	
	
	public static void getSessionInfo(Map<String, Object> paramMap) {
		ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		HttpServletRequest request = sra.getRequest();
		HttpSession session = request.getSession();
		
		if(session.getAttribute("user") != null) {
			UserVO user = (UserVO) session.getAttribute("user");
			
			paramMap.put("session_usr_id", user.getUsr_id());
		}
		
	}
}