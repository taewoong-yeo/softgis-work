package softGis.main;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections4.IteratorUtils;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.admin.user.AdminUserService;
import softGis.auth.UserVO;
import softGis.cmmntyMap.CmmntyMapDAO;
import softGis.core.CoreDAO;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Service("mainService")
public class MainService extends EgovAbstractServiceImpl {
	
	@Resource(name="mainDAO")
	public MainDAO mainDAO;
	
	@Resource(name="coreDAO")
	public CoreDAO coreDAO;
	
	@Resource(name="cmmntyMapDAO")
	public CmmntyMapDAO cmmntyMapDAO;
	
	@Resource(name="adminUserService")
	private AdminUserService adminUserService;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	public String main(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {

		paramMap.put("noti_type", "'POP'");
		List<Object> noticeListPop = mainDAO.getNoticeListMain(paramMap);
		model.addAttribute("noticeListPop", noticeListPop);  //최대 5개 까지만 표출되도록 

		paramMap.put("noti_type", "'FIX', 'GNR'");
		List<Object> noticeListMain = mainDAO.getNoticeListMain(paramMap);
		model.addAttribute("noticeListMain", noticeListMain);  //최대 5개 까지만 표출되도록 
		
		paramMap.put("main_gb", "Y");
		List<Object> cmmntyMapListMain = cmmntyMapDAO.getCmmntyMapList(paramMap);
		model.addAttribute("cmmntyMapListMain", cmmntyMapListMain);  //최대 20개 까지만 표출되도록 
		
		List<Object> faqListMain = mainDAO.getFaqListMain(paramMap);
		model.addAttribute("faqListMain", faqListMain);  //최대 20개 까지만 표출되도록 
		
		return "main";
	}
	
	public String mypage(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		HttpSession session = request.getSession();
		UserVO user = (UserVO) session.getAttribute("user");
		paramMap.put("answer_usr_id", user.getUsr_id());
		model.addAttribute("answer_list",cmmntyMapDAO.getUsrAnswerList(paramMap));
		return "mypage";
	}

	public List<Object> getDataCatlog() {
		return mainDAO.getDataCatlog();
	}
	
	public List<Object> getDashboard() {
		return mainDAO.getDashboard();
	}
	
	public Object getAdmDong(Map<String, Object> paramMap) {
		return mainDAO.getAdmDong(paramMap);
	}
	
	public Object getEmdDong(Map<String, Object> paramMap) {
		return mainDAO.getEmdDong(paramMap);
	}

	public List<Object> getMainNoticeList(Map<String, Object> paramMap) {
		return mainDAO.getMainNoticeList(paramMap);
	}
	
	public List<Object> getNoticeList(Map<String, Object> paramMap) {
		return mainDAO.getNoticeList(paramMap);
	}
	
	public Map<String, Object> getNoticeCount(Map<String, Object> paramMap) {
		return mainDAO.getNoticeCount(paramMap);
	}
	
	public Map<String, Object> getNoticeDetail(Map<String, Object> paramMap) {
		return mainDAO.getNoticeDetail(paramMap);
	}
	
	public List<Object> getNoticeListMain(Map<String, Object> paramMap) {
		return mainDAO.getNoticeListMain(paramMap);
	}
	
	public List<Object> getMainAnalResultList(Map<String, Object> paramMap) {
		return mainDAO.getAnalResultList(paramMap);
	}
	
	public List<Object> getAnalResultList(Map<String, Object> paramMap) {
		return mainDAO.getAnalResultList(paramMap);
	}
	
	public Map<String, Object> getAnalResultDetail(Map<String, Object> paramMap) {
		return mainDAO.getAnalResultDetail(paramMap);
	}

	public List<Object> getMainSearchResult(Map<String, Object> paramMap) {
		return mainDAO.getMainSearchResult(paramMap);
	}
	
	public List<Object> getFaqList(Map<String, Object> paramMap) {
		return mainDAO.getFaqList(paramMap);
	}
	
	public Map<String, Object> getFaqCount(Map<String, Object> paramMap) {
		return mainDAO.getFaqCount(paramMap);
	}
	
	public Map<String, Object> getFaqDetail(Map<String, Object> paramMap) {
		return mainDAO.getFaqDetail(paramMap);
	}
	
	

	public Map<String, Object> getDataCount(Map<String, Object> paramMap) {
		return mainDAO.getDataCount(paramMap);
	}

	public List<Object> getDataList(Map<String, Object> paramMap) {
		return mainDAO.getDataList(paramMap);
	}
	
	public List<Object> getQnaList(Map<String, Object> paramMap) {
		return mainDAO.getQnaList(paramMap);
	}
	
	public Map<String, Object> getQnaCount(Map<String, Object> paramMap) {
		return mainDAO.getQnaCount(paramMap);
	}
	
	public Map<String, Object> getQnaDetail(Map<String, Object> paramMap) {
		return mainDAO.getQnaDetail(paramMap);
	}

	public String insertQna(Map<String, Object> paramMap, HttpServletRequest request) {
		SessionManager.getSessionInfo(paramMap);
		System.out.println(":::"+paramMap);
		int file_id = 0;

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	    Iterator<String> iterator = multipartRequest.getFileNames();

	    while (iterator.hasNext()) {
	        String key = (String) iterator.next();

	        for(MultipartFile files : multipartRequest.getFiles(key)){
	        	try {
	        		System.out.println("::key::"+files);
					file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_BOARD);
				} catch (Exception e) {
					e.printStackTrace();
				}
	        }
	    }

	    paramMap.put("file_id", file_id);
	    paramMap.put("open_yn", "on".equals(paramMap.get("open_yn")) ? "N" : "Y"); //임시처리 수정예정
	    
		
		mainDAO.insertQna(paramMap);

		request.setAttribute("message", "등록되었습니다.");
		request.setAttribute("url", "/qnaList.do");
		return "forward:/redirect.do";
		
	}

	public String updateQna(Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		
		int file_id = 0;
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
	    Iterator<String> iterator = multipartRequest.getFileNames();

	    while (iterator.hasNext()) {
	        String key = (String) iterator.next();

	        for(MultipartFile files : multipartRequest.getFiles(key)){
	        	try {
	        		//System.out.println(files.isEmpty()+"::key::"+files);
	        		if(files != null && !files.isEmpty())
	        			file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_BOARD);
				} catch (Exception e) {
					e.printStackTrace();
				}
	        }
	    }
	    
		if("on".equals(paramMap.get("file_del_yn")) || file_id > 0) {
			if(paramMap.get("file_id") != null && !"".equals(paramMap.get("file_id"))){
				fileGetService.fileDeleteFile(Long.parseLong(paramMap.get("file_id").toString()));
			}
		    paramMap.put("file_id", file_id);
		}else if(paramMap.get("file_id") == null || "".equals(paramMap.get("file_id"))){
		    paramMap.put("file_id", 0);
		}
		
	    paramMap.put("open_yn", "on".equals(paramMap.get("open_yn")) ? "N" : "Y"); //임시처리 수정예정

		//System.out.println(":uu::"+paramMap);
		
		mainDAO.updateQna(paramMap);

		request.setAttribute("message", "수정되었습니다.");
		request.setAttribute("url", "/qnaList.do");
		return "forward:/redirect.do";
		
	}
	
	public int deleteQna(Map<String, Object> paramMap) {
		return mainDAO.deleteQna(paramMap);
	}
	
	public String getSiteName(String site) {
		return mainDAO.getSiteName(site);
	}
	
	public List<Object> getCodes(Map<String, Object> paramMap) {
		return coreDAO.getCodesForInterceptor(paramMap);
	}
	
	public String updateUsrPassword(Map<String, Object> paramMap, ModelMap model) {
		adminUserService.updateUserPwd(paramMap);
		
		model.addAttribute("msg","success");
		return "jsonString";
	}
	
	public String getAnswerTime(Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		String exist = mainDAO.getAnswerTime(paramMap); 
		
		if(!"".equals(exist) && exist != null) {
			model.addAttribute("answer_time", exist);
		}
		return "jsonString";
	}

	public String insertData(Map<String, Object> paramMap, HttpServletRequest request) {
		SessionManager.getSessionInfo(paramMap);
		int file_id = 0;

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

	    Iterator<String> iterator = multipartRequest.getFileNames();

	    while (iterator.hasNext()) {
	        String key = (String) iterator.next();

	        for(MultipartFile files : multipartRequest.getFiles(key)){
	        	try {
					file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_BOARD);
				} catch (Exception e) {
					e.printStackTrace();
				}
	        }
	    }

	    paramMap.put("file_id", file_id);
		
		mainDAO.insertData(paramMap);

		request.setAttribute("message", "등록되었습니다.");
		request.setAttribute("url", "/dataList.do");
		return "forward:/redirect.do";
		
	}

	public Map<String, Object> getDataDetail(Map<String, Object> paramMap) {
		return mainDAO.getDataDetail(paramMap);
	}

	public String updateData(Map<String, Object> paramMap, HttpServletRequest request) {
		
		SessionManager.getSessionInfo(paramMap);
		int file_id = 0;
		int attFileSize = Integer.parseInt(String.valueOf(paramMap.get("attFileSize"))); 

		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;

	    Iterator<String> iterator = multipartRequest.getFileNames();
	    
	    System.out.println(">>>>>>>>>>>>>>attFileSize:"+ attFileSize);
	    
	    // 첨부된 파일이 있다면 기존 file_id 삭제 처리...
	    if (attFileSize>0) {

			try {
				if(paramMap.get("file_id") != null && !"".equals(paramMap.get("file_id"))){
					fileGetService.fileDeleteFile(Long.parseLong(paramMap.get("file_id").toString()));
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			
			System.out.println("++++++++++++1");
		    while (iterator.hasNext()) {

				System.out.println("++++++++++++2");
				
		        String key = (String) iterator.next();

		        for(MultipartFile files : multipartRequest.getFiles(key)){
		        	try {
						file_id = fileGetService.fileInsertFile(files, FileGetService.UPLOAD_SUBPATH_BOARD);
					} catch (Exception e) {
						e.printStackTrace();
					}
		        }
		    }
		    
	    }else {
	    	file_id = Integer.parseInt(String.valueOf(paramMap.get("file_id"))); 
	    }
	    System.out.println(">>>>>>>>>>>>>>file_id:"+ file_id);
	    

	    paramMap.put("file_id", file_id);
		
		mainDAO.updateData(paramMap);

		request.setAttribute("message", "수정되었습니다.");
		request.setAttribute("url", "/dataDetail.do?data_id="+ paramMap.get("data_id")+"&page=" + paramMap.get("page")+"&serchvalue=" + paramMap.get("serchvalue"));
		return "forward:/redirect.do";
		
	}

	public boolean deleteDataFile(Map<String, Object> paramMap, HttpServletRequest request) {
		boolean result = false;
		
		try {
			result = fileGetService.fileDeleteFile(Long.parseLong(paramMap.get("file_id").toString()));
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		if (result) {
			System.out.println(">>>>>>>>>>>>>>>>>>>>>>> 파일 삭제...");
		}else {
			System.out.println(">>>>>>>>>>>>>>>>>>>>>>> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx 파일 삭제...");
		}
		
		return result;
		
	}
}