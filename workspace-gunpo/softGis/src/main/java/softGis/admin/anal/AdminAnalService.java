package softGis.admin.anal;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.postgresql.jdbc.PgArray;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.ErrorCodeMsg;
import softGis.fileGet.FileGetService;

@Service("AdminAnalService")
public class AdminAnalService extends EgovAbstractServiceImpl {
	
	private static final Log log = LogFactory.getLog(AdminAnalService.class);
	
	@Resource(name="AdminAnalDAO")
	private AdminAnalDAO dao;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	public List<Object> getAnalList(Map<String, Object> paramMap) {
		return dao.getAnalList(paramMap);
	}
	
	public int insertAnal(Map<String, Object> paramMap) {
		return dao.insertAnal(paramMap);
	}
	
	public int updateAnal(Map<String, Object> paramMap) {
		return dao.updateAnal(paramMap);
	}

	public int deleteAnal(Map<String, Object> paramMap) {
		return dao.deleteAnal(paramMap);
	}
	
	public List<Object> getModelList(Map<String, Object> paramMap) {
		return dao.getModelList(paramMap);
	}
	
	public int insertModel(Map<String, Object> paramMap) {
		return dao.insertModel(paramMap);
	}
	
	public int updateModel(Map<String, Object> paramMap) {
		return dao.updateModel(paramMap);
	}

	public int deleteModel(Map<String, Object> paramMap) {
		return dao.deleteModel(paramMap);
	}
	
	public Map<String, Object> getModel(Map<String, Object> paramMap) {
		return dao.getModel(paramMap);
	}
	
	public int deleteModelAttachment(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> model = this.getModel(paramMap);
		
		if(model.get("model_id") != null) {
			long attFileNo = (long) model.get("file_id");
			
			dao.deleteModelAttachment(paramMap);

			if(fileGetService.fileDeleteFile(attFileNo));
				return 1;
		}
		
		return 0;
	}
	
	public List<Object> getAnalMetadatas(Map<String, Object> paramMap) {
		List<Object> result = null;
		
		try {
			result = dao.getAnalMetadatas(paramMap);
			
			for(Object itemObj : result) {
				@SuppressWarnings("unchecked")
				Map<String, Object> item = (Map<String, Object>) itemObj;
				item.put("mta_dates", ((PgArray) item.get("mta_dates")).getArray());
			}
		} catch (SQLException e) {
			log.error(ErrorCodeMsg.ERR_SQL);
		}
		
		return result;
	}

	public List<Object> getAnalAvailableMetadatas(Map<String, Object> paramMap) {
		return dao.getAnalAvailableMetadatas(paramMap);
	}

	public boolean checkAnalMetadataCollision(Map<String, Object> paramMap) {
		return dao.checkAnalMetadataCollision(paramMap);
	}

	public int insertAnalMetadata(Map<String, Object> paramMap) {
		return dao.insertAnalMetadata(paramMap);
	}

	public int updateAnalMetadata(Map<String, Object> paramMap) {
		return dao.updateAnalMetadata(paramMap) &
			   dao.updateAnalMetadataIndex(paramMap);
	}

	public int deleteAnalMetadata(Map<String, Object> paramMap) {
		return dao.deleteAnalMetadata(paramMap);
	}
	
}
