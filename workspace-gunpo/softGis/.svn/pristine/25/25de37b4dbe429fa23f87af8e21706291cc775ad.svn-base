package softGis.admin.faq;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.fileGet.FileGetService;

@Service("AdminFaqService")
public class AdminFaqService extends EgovAbstractServiceImpl {

	@Resource(name="AdminFaqDAO")
	private AdminFaqDAO dao;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;

	public List<Object> getFaq(Map<String, Object> paramMap) {
		return dao.getFaq(paramMap);
	}
	
	public int insertFaq(Map<String, Object> paramMap) {
		return dao.insertFaq(paramMap);
	}
	
	public int deleteFaq(Map<String, Object> paramMap) {
		return dao.deleteFaq(paramMap);
	}
	
	public int updateFaq(Map<String, Object> paramMap) {
		return dao.updateFaq(paramMap);
	}
	
	public Map<String, Object> getFaqById(Map<String, Object> paramMap) {
		return dao.getFaqById(paramMap);
	}
	
	public int deleteFaqAttachment(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> faq = this.getFaqById(paramMap);
		
		if(faq.get("faq_id") != null) {
			long attFileNo = (long) faq.get("faq_id");
			
			dao.deleteFaqAttachment(paramMap);

			if(fileGetService.fileDeleteFile(attFileNo));
				return 1;
		}
		
		return 0;
	}
	
	
}
