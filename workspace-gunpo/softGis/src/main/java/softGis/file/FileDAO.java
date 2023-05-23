package softGis.file;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("fileDAO")
public interface FileDAO {

	Map<String, Object> getFile(Map<String, Object> paramMap);

	Map<String, Object> deleteFile(Map<String, Object> paramMap);

	int insertFile(Map<String, Object> paramMap);
	
}