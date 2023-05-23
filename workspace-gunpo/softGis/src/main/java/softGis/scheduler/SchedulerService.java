package softGis.scheduler;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service("schedulerService")
public class SchedulerService {

	@Resource(name="schedulerDAO")
	SchedulerDAO dao;
	
	public int trancateApiTable(Map<String, Object> paramMap) {
		return dao.trancateApiTable(paramMap);
	}
	
	public int insertApiData(Map<String, Object> paramMap) {
		return dao.insertApiData(paramMap);
	}

}

