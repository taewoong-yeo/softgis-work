package softGis.auth;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.core.SessionManager;

@Controller
public class AuthController {
	
	@Resource(name="authService")
	private AuthService authService;
	
	
	@RequestMapping(value="/login.do", method=RequestMethod.GET)
	public String loginGet(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("loginGb","web");
		return "login";
	}
	
	@RequestMapping(value="/login-sns.do", method=RequestMethod.GET)
	public String loginSns(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "login-sns";
	}
	
	@RequestMapping(value="/mobile_login.do", method=RequestMethod.GET)
	public String loginMobile(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("loginGb","mobile");
		return "login";
	}
	
	@RequestMapping(value="/login.do", method=RequestMethod.POST)
	public String loginPost(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		UserVO user = authService.getUser(paramMap);
		String returnUrl = "/main.do";
		if(request.getHeader("User-Agent").indexOf("isApp") > -1) {
			returnUrl = "/mypage.do";
		};
		
		boolean isNotExist = user == null;
		
		if(isNotExist) request.setAttribute("message", "아이디 또는 비밀번호가 일치하지 않습니다.");

		if(isNotExist) {
			request.setAttribute("url", "/login.do");
			
			return "forward:/redirect.do";
		}

		Cookie cookie = new Cookie("login", "in"); 
	    cookie.setMaxAge(24*60*60); 
	    response.addCookie(cookie); 
		request.getSession().setAttribute("user", user);

		return "redirect:"+returnUrl;
	}
	
	@RequestMapping(value="/register.do", method=RequestMethod.GET)
	public String registerGet(@RequestParam Map<String, Object> paramMap, ModelMap model) {		
		return "register";
	}
	
	@RequestMapping(value="/register.do", method=RequestMethod.POST)
	public String registerPost(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		int result = authService.insertUser(paramMap);
		 
		request.setAttribute("message", "회원가입이 완료되었습니다.");
		request.setAttribute("url", "/login.do");
		request.getSession().invalidate();
		
		return "forward:/redirect.do";
	}
	
	@RequestMapping(value="/logout.do", method=RequestMethod.GET)
	public String logout(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		request.getSession().invalidate();
		String returnUrl = "/main.do";
		if(request.getHeader("User-Agent").indexOf("isApp") > -1) {
			returnUrl = "/login-sns.do";
		};
		Cookie cookie = new Cookie("login", "out"); 
	    cookie.setMaxAge(24*60*60); 
	    response.addCookie(cookie); 
	    
	    Cookie cookie2 = new Cookie("alarm_time", "");
	    cookie2.setMaxAge(0);
	    response.addCookie(cookie2);
	    
		request.setAttribute("message", "로그아웃이 완료되었습니다.");
		request.setAttribute("url", returnUrl);
		
		return "forward:/redirect.do";
	}
	
	@RequestMapping(value="/getUser.do", method=RequestMethod.POST)
	public String getUser(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		UserVO user = (UserVO) request.getSession().getAttribute("user");

		model.addAttribute("usrNm", user.getUsr_nm());
		model.addAttribute("usrDept", user.getUsr_dept());
		model.addAttribute("usrMobile", user.getUsr_mobile());

		return "jsonString";
	}
	
	@RequestMapping(value="/loginKakaoPage.do", method=RequestMethod.GET)
	public String loginKakaoPage(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getKakaoLoginPage(paramMap, request);
	}
	
	@RequestMapping(value="/loginKakao.do", method=RequestMethod.GET)
	public String loginKakao(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getKakaoUserInfo(paramMap, request);
	}
	
	@RequestMapping(value="/loginNaverPage.do", method=RequestMethod.GET)
	public String loginNaverPage(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getNaverLoginPage(paramMap, request);
	}
	
	@RequestMapping(value="/loginNaver.do", method=RequestMethod.GET)
	public String loginNaver(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getNaverUserInfo(paramMap, request);
	}
	
	@RequestMapping(value="/loginGooglePage.do", method=RequestMethod.GET)
	public String loginGooglePage(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getGoogleLoginPage(paramMap, request);
	}
	
	@RequestMapping(value="/loginGoogle.do", method=RequestMethod.GET)
	public String loginGoogle(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {		
		
		return authService.getGoogleUserInfo(paramMap, request);
	}
	
	@RequestMapping(value="/leave.do", method=RequestMethod.GET)
	public String leave(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {	
		
		return authService.leave(paramMap, request);
	}
	
	
}