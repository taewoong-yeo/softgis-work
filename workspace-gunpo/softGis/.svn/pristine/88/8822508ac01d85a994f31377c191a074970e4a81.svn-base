package softGis.admin.data;

import java.util.List;
import java.util.Map;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("adminDataDAO")
public interface AdminDataDAO {
	
	public List<Object> getMetadatas(Map<String, Object> paramMap);
	
	public Object checkMetadataNameCollision(Map<String, Object> paramMap);
	
	public Object checkMetadataTableCollision(Map<String, Object> paramMap);

	public boolean checkMetadataUsed(Map<String, Object> paramMap);
	
	public int insertMetadata(Map<String, Object> paramMap);
	
	public int updateMetadata(Map<String, Object> paramMap);
	
	public int deleteMetadata(Map<String, Object> paramMap);
	
	public List<Object> getDatas(Map<String, Object> paramMap);

	public boolean checkDataIntegrated(Map<String, Object> paramMap);
	
	public String getMtaTableName(Map<String, Object> paramMap);
	
	public int insertData(Map<String, Object> paramMap);

	public int updateData(Map<String, Object> paramMap);
	
	public int deleteData(Map<String, Object> paramMap);

	public List<Object> getDataColumns(Map<String, Object> paramMap);

	public List<Object> getDataDefinedColumns(Map<String, Object> paramMap);

	public int updateDataColumn(Map<String, Object> paramMap);

	public int deleteDataColumn(Map<String, Object> paramMap);

	public boolean checkDataColumnUsed(Map<String, Object> paramMap);
	
	public List<Object> getVisualizes(Map<String, Object> paramMap);

	public List<Object> getVisualizePreview(Map<String, Object> paramMap);

	public Object checkVisualizeCollision(Map<String, Object> paramMap);
	
	public int insertVisualize(Map<String, Object> paramMap);

	public int updateVisualize(Map<String, Object> paramMap);

	public int updateVisualizeIndex(Map<String, Object> paramMap);
	
	public int deleteVisualize(Map<String, Object> paramMap);
	
	int saveApi(Map<String, Object> paramMap);
	
	void totRowCnt();
	
}