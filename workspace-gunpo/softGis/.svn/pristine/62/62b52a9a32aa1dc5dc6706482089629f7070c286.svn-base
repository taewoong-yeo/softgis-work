package softGis.admin.qna;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.fileGet.FileGetService;

@Service("AdminQnaService")
public class AdminQnaService extends EgovAbstractServiceImpl {

	@Resource(name="AdminQnaDAO")
	private AdminQnaDAO dao;

	
	
	public List<Object> getQna(Map<String, Object> paramMap) {
		return dao.getQna(paramMap);
	}
	
	public int updateQna(Map<String, Object> paramMap) {
		return dao.updateQna(paramMap);
	}
	
	public int deleteQna(Map<String, Object> paramMap) {
		return dao.deleteQna(paramMap);
	}
}
