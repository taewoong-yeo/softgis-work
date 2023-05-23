package softGis.admin.data;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("adminDataService")
public class AdminDataService extends EgovAbstractServiceImpl {

	@Resource(name="adminDataDAO")
	private AdminDataDAO dao;
	
	public List<Object> getMetadatas(Map<String, Object> paramMap) {
		return dao.getMetadatas(paramMap);
	}
	
	public Object checkMetadataNameCollision(Map<String, Object> paramMap) {
		return dao.checkMetadataNameCollision(paramMap);
	}
	
	public Object checkMetadataTableCollision(Map<String, Object> paramMap) {
		return dao.checkMetadataTableCollision(paramMap);
	}

	public boolean checkMetadataUsed(Map<String, Object> paramMap) {
		return dao.checkMetadataUsed(paramMap);
	}
	
	public int insertMetadata(Map<String, Object> paramMap) {
		return dao.insertMetadata(paramMap);
	}
	
	public int updateMetadata(Map<String, Object> paramMap) {
		return dao.updateMetadata(paramMap);
	}
	
	public int deleteMetadata(Map<String, Object> paramMap) {
		return dao.deleteMetadata(paramMap);
	}
	
	public List<Object> getDatas(Map<String, Object> paramMap) {
		return dao.getDatas(paramMap);
	}

	public boolean checkDataIntegrated(Map<String, Object> paramMap) {
		return dao.checkDataIntegrated(paramMap);
	}
	
	public String getMtaTableName(Map<String, Object> paramMap) {
		return dao.getMtaTableName(paramMap);
	}
	
	public int insertData(Map<String, Object> paramMap) {
		return dao.insertData(paramMap);
	}

	public int updateData(Map<String, Object> paramMap) {
		return dao.updateData(paramMap);
	}
	
	public int deleteData(Map<String, Object> paramMap) {
		return dao.deleteData(paramMap);
	}

	public List<Object> getDataColumns(Map<String, Object> paramMap) {
		return dao.getDataColumns(paramMap);
	}

	public List<Object> getDataDefinedColumns(Map<String, Object> paramMap) {
		return dao.getDataDefinedColumns(paramMap);
	}

	public int updateDataColumn(Map<String, Object> paramMap) {
		return dao.updateDataColumn(paramMap);
	}

	public int deleteDataColumn(Map<String, Object> paramMap) {
		return dao.deleteDataColumn(paramMap);
	}

	public boolean checkDataColumnUsed(Map<String, Object> paramMap) {
		return dao.checkDataColumnUsed(paramMap);
	}
	
	public int saveApi(Map<String, Object> paramMap) {
		return dao.saveApi(paramMap);
	}
	
	//데이터 카운트 스케줄
	public void totRowCnt() {
		dao.totRowCnt();
	}
	
}
