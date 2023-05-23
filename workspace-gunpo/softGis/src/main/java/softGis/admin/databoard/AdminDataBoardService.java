package softGis.admin.databoard;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.fileGet.FileGetService;

@Service("AdminDataBoardService")
public class AdminDataBoardService extends EgovAbstractServiceImpl {

	@Resource(name="AdminDataBoardDAO")
	private AdminDataBoardDAO dao;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	public List<Object> getDataBoards(Map<String, Object> paramMap) {
		return dao.getDataBoards(paramMap);
	}

	public int insertDataBoard(Map<String, Object> paramMap) {
		return dao.insertDataBoard(paramMap);
	}
	
	public int updateDataBoard(Map<String, Object> paramMap) {
		return dao.updateDataBoard(paramMap);
	}

	public int deleteDataBoard(Map<String, Object> paramMap) {
		return dao.deleteDataBoard(paramMap);
	}
	
	public Map<String, Object> getDataBoard(Map<String, Object> paramMap) {
		return dao.getDataBoard(paramMap);
	}
	
	public int deleteDataBoardAttachment(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> databoard = this.getDataBoard(paramMap);
		
		if(databoard.get("data_id") != null) {
			if(paramMap.get("file_id") != null && !"".equals(paramMap.get("file_id"))){
				long attFileNo = (long) databoard.get("file_id");
				
				dao.deleteDataBoardAttachment(paramMap);

				if(fileGetService.fileDeleteFile(attFileNo));
					return 1;
			}
		}
		
		return 0;
	}

	
}
