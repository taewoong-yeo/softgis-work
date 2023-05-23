package softGis.catalog;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("catalogDAO")
public interface CatalogDAO {
	
	public List<Object> getMetadatas(Map<String, Object> paramMap);
	
	public List<Object> getMetadataSources(Map<String, Object> paramMap);
	
	public Map<String, Object> getData(Map<String, Object> paramMap);
	
	public List<Object> getDataCatalogListColumns(Map<String, Object> paramMap);

	public int getDataCatalogRowCount(Map<String, Object> paramMap);
	
	public List<Object> getDataCatalogChunkData(Map<String, Object> paramMap);
	
}