package softGis.core;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("coreDAO")
public interface CoreDAO {
	
    public List<Object> getCodesForInterceptor(Map<String, Object> paramMap);

	public boolean getTableExistence(Map<String, Object> paramMap);

	public int createTextTable(Map<String, Object> paramMap);

	public int insertTextData(Map<String, Object> paramMap);

	public int deleteTable(Map<String, Object> paramMap);
	
	public int commentTable(Map<String, Object> paramMap);
	
	public int commentColumn(Map<String, Object> paramMap);
	
	public int updateImporterCharacterField(Map<String, Object> paramMap);
	
	int createColctTextTable(Map<String, Object> map);
	
	int insertColctTextData(Map<String, Object> map);
	
	int createGeoJsonTable(Map<String, Object> map);

	int insertGeoJsonData(Map<String, Object> map);
	
    public List<Object> getBndSdCdList(Map<String, Object> paramMap);
	
    public List<Object> getBndSggCdList(Map<String, Object> paramMap);

}