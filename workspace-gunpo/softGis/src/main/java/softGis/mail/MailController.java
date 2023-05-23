package softGis.mail;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.auth.AuthService;
import softGis.auth.UserVO;
import softGis.core.Encrypter;


@Controller
@RequestMapping(value="/mail")
public class MailController {
	
	@Resource(name="mailService")
	public MailService mailService;
	
	@Resource(name="authService")
	public AuthService authService;
	
	private final String URI_1 = "/mail";
	private final String URI_2 = "/mailAuthentication.do";
	
	public String getMailUri(int depth) {
		String uri = "";
		switch(depth) {
		case 1: uri = URI_1;
			break;
		case 2: uri = URI_2;
			break;
		default:
			break;
		}
		return uri;
	}
	
	@RequestMapping(value=URI_2)
	public String mailAuthentication(HttpServletRequest request, @RequestParam Map<String, Object> paramMap) {
		
		String icon = "info";
		String type = "close";
		String title = null, msg = null;
		
		boolean has_key = (boolean)paramMap.containsKey("key");
		
		if( !has_key ) {
			msg = "메일 인증 진행 중 장애가 발생했습니다.\\n시스템 관리자에게 문의바랍니다.";
		}else {
			
			icon = "success";
			msg = "인증이 완료되었습니다.\\n회원가입을 계속 진행해주세요.";
    		//인증 완료 세션 처리
    		request.getSession().setAttribute("key", paramMap.get("key"));
		}
		
		request.setAttribute("icon", icon);
		request.setAttribute("message", msg);
		request.setAttribute("type", type);
		
		return "forward:/redirect.do";
	}
	
	@RequestMapping(value="/sendMail.do", method=RequestMethod.POST)
	public String sendMail(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {

		UserVO user = (UserVO) authService.registerCollisionCheck(paramMap);
		
		if(user != null) {
			request.getSession().invalidate();
			model.addAttribute("result", false);
			model.addAttribute("msg", "이미 가입된 계정입니다.");
		}else {
			
			boolean authResult = false;
			String authParams = "";
			String userNm = "";
			String toAddr = "";
			
			String key = Encrypter.encrypt("MD5", paramMap.get("newUserPatternKey").toString());	// user id
			if(!(paramMap.containsKey("newUserPatternKey") && paramMap.containsKey("mail") && paramMap.containsKey("user_nm"))) {
//				return false;
				authResult = false;
			}else {
				
				userNm = paramMap.get("user_nm").toString();
				toAddr = paramMap.get("mail").toString();
				authParams = URI_1 + URI_2 + "?key=" + key+"&mail="+paramMap.get("mail"); 

				String fullURL = request.getRequestURL().toString();
				String contextPath = request.getContextPath();
				String URLexceptURI = fullURL.replace(request.getRequestURI(), "");
				String url = URLexceptURI+contextPath+authParams;
				
				StringBuffer sb = new StringBuffer();
				sb.append("<div style=\"text-align:center; padding: 2rem; line-height:170%; font-family: Malgun Gothic;\">");
				sb.append("<div style=\"display:inline-block;width:500px;\">");
				sb.append("<div style=\"height: 57px; margin: 0.5rem 0 0.5rem 0; padding: 1.5rem;border-bottom:7px solid #00b8a3;display:flex;\">");
				sb.append("<img src=\"https://www.lx.or.kr/images/kor/content/cibi_slogan01.png\" height=100%;></img></div>");
				sb.append("<div style=\"background-color:#fff; padding: 2rem 1rem 1rem 1.5rem;\">");
				sb.append("<h3 style=\"padding-bottom: 0.5rem;font-size:21px;\">");
				sb.append("<img src=\"/togetherMap/assets/images/login/exp.png\" height=100%;></img></h3></div>");
				sb.append("<div style=\"margin-bottom: 50px; font-size: 25px;\"><span style=\"color:#00b8a3;\">메일인증</span> 안내입니다.</div>");
				sb.append("<div style=\"text-align:left;font-size: 15px;\">");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">안녕하세요 <strong>"+userNm+"</strong>님</div>");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">LX softGIS 플랫폼을 이용해 주셔서 감사합니다.</div>");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\"><span style=\"color:#00b8a3;\">이메일 인증</span>을 하시려는 경우, 아래 버튼을 클릭해주세요.</div>");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">감사합니다.</div>");
				sb.append("</div>");
				sb.append("<a href=\""+url+"\"");
				sb.append("style=\"text-decoration: none; background-color: #00b8a3; color:white;");
				sb.append("padding:10px 20px 10px 20px;");
				sb.append("margin: 1rem 0 0 0; display:inline-block; border-radius: 10px; transition:all 0.1s;");
				sb.append("font-weight: 700; font-size: 15px; width: 250px;\">회원 가입 인증</a>");
				sb.append("<div style=\"margin: 70px 0px;border-top: 1px solid #D5D5D5;padding-top: 10px;text-align: right;color: #8D8D8D;\">본 메일은 발신전용 입니다.</div></div>");
				
				String htmlStr = sb.toString(); 
				String mailSubject = "[ TO. " + userNm + " 님 ] LX softGIS 회원 가입 인증 메일";
				
				authResult = (boolean) mailService.sendMail(paramMap, toAddr, mailSubject, htmlStr);
			}
			
//			boolean authResult = (boolean) mailService.sendMail(paramMap, htmlStr);
			model.addAttribute("result", authResult);
		}
		
		return "jsonString";
	}
	
	@RequestMapping(value="/certCheck.do", method=RequestMethod.POST)
	public String certCheck(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		String key = (String) request.getSession().getAttribute("key");
		boolean certYn = key != null && !"".equals("key") ? true : false;
		model.addAttribute("result", certYn);
		
		return "jsonString";
	}

}