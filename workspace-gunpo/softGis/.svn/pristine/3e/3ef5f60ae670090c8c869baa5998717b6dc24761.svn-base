package softGis.admin.user;

import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.core.Encrypter;
import softGis.core.SessionManager;
import softGis.mail.MailService;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminUserController {

	@Resource(name="mailService")
	public MailService mailService;
	
	@Resource(name="adminUserService")
	private AdminUserService service;
	
	@RequestMapping(value="/getUserList.do")
	public String getUserList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getUserList(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertUser.do")
	public String insertUser(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.insertUser(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateUser.do")
	public String modifyUser(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		int result = service.updateUser(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/initUserPwd.do")
	public String initUserPwd(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		String tempUserPwd = createUserTempPwd();
		
		paramMap.put("usr_pw", tempUserPwd);

		boolean authResult = false;
		String resultMsg = "fail";
		// 사용자 비번 초기화(업데이트)
		int result = service.updateUserPwd(paramMap);
		if ( result >0) {	// 메일 전송.
			resultMsg = "success";

			String userNm = "";
			String toAddr = "";
			
			if(!(paramMap.containsKey("usr_id") && paramMap.containsKey("usr_nm"))) {
				authResult = false;
			}else {

				userNm = paramMap.get("usr_nm").toString();

				StringBuffer sb = new StringBuffer();
				sb.append("<div style=\"text-align:center; padding: 2rem; line-height:170%; font-family: Malgun Gothic;\">");
				sb.append("<div style=\"display:inline-block;width:500px;\">");
				sb.append("<div style=\"height: 57px; margin: 0.5rem 0 0.5rem 0; padding: 1.5rem;border-bottom:7px solid #00b8a3;display:flex;\">");
				sb.append("<img src=\"https://www.lx.or.kr/images/kor/content/cibi_slogan01.png\" height=100%;></img></div>");
				sb.append("<div style=\"background-color:#fff; padding: 2rem 1rem 1rem 1.5rem;\">");
				sb.append("<h3 style=\"padding-bottom: 0.5rem;font-size:21px;\">");
				sb.append("<img src=\"/togetherMap/assets/images/login/exp.png\" height=100%;></img></h3></div>");
				sb.append("<div style=\"margin-bottom: 50px; font-size: 25px;\"><span style=\"color:#00b8a3;\">비밀번호 초기화</span> 안내입니다.</div>");
				sb.append("<div style=\"text-align:left;font-size: 15px;\">");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">안녕하세요 <strong>"+userNm+"</strong>님</div>");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">비밀번호가 <span style=\"color:#00b8a3;\">"+tempUserPwd+"</span>로 초기화 되었습니다.</div>");
				sb.append("<div style=\"padding: 0.2rem 0 0.2rem 0;\">감사합니다.</div>");
				sb.append("</div>"); 
				sb.append("<div style=\"margin: 70px 0px;border-top: 1px solid #D5D5D5;padding-top: 10px;text-align: right;color: #8D8D8D;\">본 메일은 발신전용 입니다.</div></div>");

				String htmlStr = sb.toString(); 
				String mailSubject = "[ TO. " + userNm + " 님 ] LX softGIS 비밀번호 초기화 안내 메일";
				toAddr = paramMap.get("usr_id").toString();
				
				authResult = (boolean) mailService.sendMail(paramMap, toAddr, mailSubject, htmlStr);
				
			}
			
		}else {
			authResult = false;
		}
		
		model.addAttribute("result", authResult) ;
		
		return "jsonString";
	} 

	// 사용자 임시 비번
	private String createUserTempPwd() {
	    int leftLimit = 48; // numeral '0'
	    int rightLimit = 122; // letter 'z'
	    int targetStringLength = 10;
	    Random random = new Random();
	    String generatedPwd = random.ints(leftLimit, rightLimit + 1)
	                                   .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
	                                   .limit(targetStringLength)
	                                   .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
	                                   .toString();
		return generatedPwd;
	}
	
}
