package softGis.catalog;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("catalogService")
public class CatalogService extends EgovAbstractServiceImpl {
	
	@Resource(name="catalogDAO")
	public CatalogDAO catalogDAO;
	
	public List<Object> getMetadatas(Map<String, Object> paramMap) {
		return catalogDAO.getMetadatas(paramMap);
	}
	
	public List<Object> getMetadataSources(Map<String, Object> paramMap) {
		return catalogDAO.getMetadataSources(paramMap);
	}
	
	public Map<String, Object> getData(Map<String, Object> paramMap) {
		return catalogDAO.getData(paramMap);
	}
	
	public List<Object> getDataCatalogListColumns(Map<String, Object> paramMap) {
		return catalogDAO.getDataCatalogListColumns(paramMap);
	}
	
	public int getDataCatalogRowCount(Map<String, Object> paramMap) {
		return catalogDAO.getDataCatalogRowCount(paramMap);
	}
	
	public List<Object> getDataCatalogChunkData(Map<String, Object> paramMap) {
		return catalogDAO.getDataCatalogChunkData(paramMap);
	}
	
}