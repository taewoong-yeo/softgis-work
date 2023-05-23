package softGis.core; 

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CodeInjectInterceptor extends HandlerInterceptorAdapter {

	@Resource(name="coreService")
	public CoreService coreService;
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		if("GET".equals(request.getMethod())) {
			List<Object> codes = coreService.getCodesForInterceptor(paramMap);

			boolean isWeb = true;
			if(request.getHeader("User-Agent").indexOf("isApp") >-1) {
				isWeb = false;
			};
			
			request.setAttribute("__CODES__", codes);
			request.setAttribute("__ISWEB__", isWeb);
		}
		
		return super.preHandle(request, response, handler);
	}
	
}
