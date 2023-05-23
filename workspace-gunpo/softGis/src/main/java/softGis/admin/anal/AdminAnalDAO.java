package softGis.admin.anal;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("AdminAnalDAO")
public interface AdminAnalDAO {

	public List<Object> getAnalList(Map<String, Object> paramMap);
	
	public int insertAnal(Map<String, Object> paramMap);
	
	public int updateAnal(Map<String, Object> paramMap);
		
	public int deleteAnal(Map<String, Object> paramMap);
	
	public List<Object> getModelList(Map<String, Object> paramMap);
	
	public Map<String, Object> getModel(Map<String, Object> paramMap);
	
	public int insertModel(Map<String, Object> paramMap);
	
	public int updateModel(Map<String, Object> paramMap);
		
	public int deleteModel(Map<String, Object> paramMap);
	
	public int deleteModelAttachment(Map<String, Object> paramMap);
	
	List<Object> getAnalMetadatas(Map<String, Object> paramMap);

	List<Object> getAnalAvailableMetadatas(Map<String, Object> paramMap);
	
	boolean checkAnalMetadataCollision(Map<String, Object> paramMap);
	
	int insertAnalMetadata(Map<String, Object> paramMap);

	int updateAnalMetadata(Map<String, Object> paramMap);

	int updateAnalMetadataIndex(Map<String, Object> paramMap);

	int deleteAnalMetadata(Map<String, Object> paramMap);
	
}