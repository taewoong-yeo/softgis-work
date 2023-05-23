package softGis.test;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

//import bigdataplatform.core.ErrorCodeMsg;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("testService")
public class TestService extends EgovAbstractServiceImpl {
	
	private static final Log log = LogFactory.getLog(TestService.class);
	
	@Resource(name="testDAO")
	public TestDAO testDAO;
//
//	public List<Object> getMainAnalResultList(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultList(paramMap);
//	}
//	
//	public List<Object> getAnalResultList(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultList(paramMap);
//	}
//	
//	public Map<String, Object> getAnalResultDetail(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultDetail(paramMap);
//	}
//	
//	public List<Object> getAnalResultMetadatas(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultMetadatas(paramMap);
//	}
//	
//	public List<Object> getStatsGrpList(Map<String, Object> paramMap) {
//		return analResultDAO.getStatsGrpList(paramMap);
//	}
//	
//	public List<Object> getResultGrpList(Map<String, Object> paramMap) {
//		return analResultDAO.getResultGrpList(paramMap);
//	}
//	
//	public List<Object> getStatsDetail(Map<String, Object> paramMap) {
//		return analResultDAO.getStatsDetail(paramMap);
//	}
//	
//	public List<Object> getResultDetail(Map<String, Object> paramMap) {
//		return analResultDAO.getResultDetail(paramMap);
//	}
//	
//	public List<Object> getAnalResultCharts(Map<String, Object> paramMap) {
//		List<Object> result = analResultDAO.getAnalResultCharts(paramMap);
//		
//		for(Object itemObj : result) {
//			@SuppressWarnings("unchecked")
//			Map<String, Object> item = (Map<String, Object>) itemObj;
//			
//			try {
//				item.put("vis_y", ((PgArray) item.get("vis_y")).getArray());
//			} catch (SQLException e) {
//				log.error(ErrorCodeMsg.ERR_SQL);
//			}
//		}
//		
//		return result;
//	}
//	
//	public List<Object> getAnalResultChartColumns(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultChartColumns(paramMap);
//	}
//
//	public List<Object> getAnalResultChartData(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultChartData(paramMap);
//	}
//	
//	public List<Object> getAnalResultImage(Map<String, Object> paramMap) {
//		return analResultDAO.getAnalResultImage(paramMap);
//	}

	public List<Object> getTestResultList(Map<String, Object> paramMap) {
		return testDAO.getTestResultList(paramMap);
	}
}