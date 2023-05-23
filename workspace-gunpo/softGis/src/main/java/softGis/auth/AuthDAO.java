package softGis.auth;

import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("authDAO")
public interface AuthDAO {

	UserVO getUser(Map<String, Object> paramMap);

	int insertUser(Map<String, Object> paramMap);

	UserVO registerCollisionCheck(Map<String, Object> paramMap);
	
	int deleteUser(Map<String, Object> paramMap);
}