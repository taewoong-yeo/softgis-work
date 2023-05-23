package softGis.admin.notice;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.fileGet.FileGetService;

@Service("AdminNoticeService")
public class AdminNoticeService extends EgovAbstractServiceImpl {

	@Resource(name="AdminNoticeDAO")
	private AdminNoticeDAO dao;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;
	
	public List<Object> getNotices(Map<String, Object> paramMap) {
		return dao.getNotices(paramMap);
	}

	public int insertNotice(Map<String, Object> paramMap) {
		return dao.insertNotice(paramMap);
	}
	
	public int updateNotice(Map<String, Object> paramMap) {
		return dao.updateNotice(paramMap);
	}

	public int deleteNotice(Map<String, Object> paramMap) {
		return dao.deleteNotice(paramMap);
	}
	
	public Map<String, Object> getNotice(Map<String, Object> paramMap) {
		return dao.getNotice(paramMap);
	}
	
	public int deleteNoticeAttachment(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> notice = this.getNotice(paramMap);
		
		if(notice.get("noti_id") != null) {
			long attFileNo = (long) notice.get("noti_id");
			
			dao.deleteNoticeAttachment(paramMap);

			if(fileGetService.fileDeleteFile(attFileNo));
				return 1;
		}
		
		return 0;
	}
}
