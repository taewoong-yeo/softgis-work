package softGis.admin.cmmnty;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.fileGet.FileGetService;

@Service("AdminCmmntyService")
public class AdminCmmntyService extends EgovAbstractServiceImpl {

	@Resource(name="AdminCmmntyDAO")
	private AdminCmmntyDAO dao;

	public List<Object> getCmmnty(Map<String, Object> paramMap) {
		return dao.getCmmnty(paramMap);
	}
	
	public int updateCmmnty(Map<String, Object> paramMap) {
		return dao.updateCmmnty(paramMap);
	}
	
	public List<Object> getCmmntyReport(Map<String, Object> paramMap) {
		return dao.getCmmntyReport(paramMap);
	}

	public List<Object> getCmmntyAnswerReport(Map<String, Object> paramMap) {
		return dao.getCmmntyAnswerReport(paramMap);
	}

	public int updateCmmntyReport(Map<String, Object> paramMap) {
		return dao.updateCmmntyReport(paramMap);
	}

	public List<Object> getCmmntyMapngAnswer(Map<String, Object> paramMap) {
		return dao.getCmmntyMapngAnswer(paramMap);
	}

	public List<Object> getCmmntyMapngAnswerReport(Map<String, Object> paramMap) {
		return dao.getCmmntyMapngAnswerReport(paramMap);
	}

	public int deleteCmmntyMapngAnswer(Map<String, Object> paramMap) {

		dao.deleteCmmntyMapngAnswerReport(paramMap);
		
		return dao.deleteCmmntyMapngAnswer(paramMap);
	}

	public int deleteCmmntyMapngAnswerReport(Map<String, Object> paramMap) {
		return dao.deleteCmmntyMapngAnswerReport(paramMap);
	}
	
}
