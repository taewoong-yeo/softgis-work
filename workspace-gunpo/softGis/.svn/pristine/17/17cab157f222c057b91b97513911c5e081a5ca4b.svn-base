package softGis.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.web.filter.OncePerRequestFilter;

import softGis.auth.UserVO;

@Order(3)
public class AuthFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
		String contextPath = request.getContextPath();
		
		String requestURI = request.getRequestURI();
		requestURI = requestURI.substring(contextPath.length());
		requestURI = requestURI.trim();
		
		UserVO user = (UserVO) request.getSession().getAttribute("user");
		
		String[] exceptlist = {
			 "/mypage.do"
			, "/cmmntyMap/cmmnty-form.do"
			, "/qnaForm.do"
			, "/dataForm.do"
		};
		
		if(user == null) {
			boolean allowed = false;
			if(requestURI.startsWith("/assets")) {
				allowed = true;
			} else {
				 
				if(!(requestURI.indexOf("/admin/") > -1 )) {
					allowed = true;
				}
				
 				for(String uri : exceptlist) {
					if(requestURI.equals(uri))
						allowed = false;
				}
			}
			
			if(allowed == false) {
				request.setAttribute("message", "로그인이 필요한 서비스입니다.");
				request.setAttribute("url", "/login-sns.do");
				request.getRequestDispatcher("/redirect.do").forward(request, response);
				return;
			}
		} else {
			boolean isEmpl = user.getUsr_auth().equals("01") || user.getUsr_auth().equals("03");
			boolean isAdmin = user.getUsr_auth().equals("01");
			boolean isAdminPage = requestURI.startsWith("/admin/");
			
			if(requestURI.equals("/login-sns.do") || requestURI.equals("/register.do")) {
				if(request.getHeader("User-Agent").indexOf("isApp") > -1) {
					response.sendRedirect(contextPath + "/mypage.do");
				} else {
					response.sendRedirect(contextPath + "/main.do");
				}
				return;
			}
			
			request.setAttribute("__USER__", user);
			request.setAttribute("__ADMIN__", isAdmin);
			request.setAttribute("__EMPL__", isEmpl);
			request.setAttribute("__ADMINPAGE__", isAdminPage);
			request.setAttribute("__NAME__", user.getUsr_nm());
		}
		
		request.setAttribute("__URI__", requestURI);
		
		chain.doFilter(request, response);
	}
	
}
