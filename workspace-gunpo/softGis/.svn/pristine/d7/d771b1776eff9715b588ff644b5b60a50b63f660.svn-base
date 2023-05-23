package softGis.core;

import java.util.HashMap;
import java.util.Map;

public class Pagination {
	
	/**
	 * 데이터 페이지 처리
	 * 
	 * @param dataTotalCount
	 * @param dataCountPerPage
	 * @param currentPage
	 * @param pageCount
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> getPagination(Map<String, Object> paramMap, Map<String, Object> countInfo, Integer dataCountPerPage) {
		long dataTotalCount = Long.valueOf(countInfo.get("cnt").toString());
		long currentPage = 1L;
		int pageCount = 10;
		Map<String, Object> returnValue = new HashMap<String, Object>();
		if(paramMap.get("currentPage") != null) {
			currentPage = Long.valueOf(paramMap.get("currentPage").toString());
		}
		
		// 페이지당 데이터 건수
		if (dataCountPerPage <= 0) {
			dataCountPerPage = 2;
		}
		
		// 현재 페이지 번호
		if (currentPage <= 0) {
			currentPage = 1L;
		}
		
		// 페이지 건수
		if (pageCount <= 0) {
			pageCount = 10;
		}
		
		// 시작 페이지 번호
		long startPage = 1L;
		
		// 종료 페이지 번호
		long endPage = 1L;
		
		// 이전 페이지 번호
		long prePage = 1L;
		
		// 다음 페이지 번호
		long nextPage = 1L;
		
		// 처음 페이지 번호
		final long firstPage = 1L;
		
		// 마지막 페이지 번호
		long lastPage = 1L;
		
		if (dataTotalCount > 0L) {
			lastPage = dataTotalCount / dataCountPerPage;
			
			if ((dataTotalCount % dataCountPerPage) > 0L) {
				lastPage++;
			}
		}
		
		if (currentPage > lastPage) {
			currentPage = lastPage;
		}
		
		startPage = ((currentPage - 1) / pageCount) * pageCount + 1;
		
		endPage = startPage + pageCount - 1L;
		
		if (endPage > lastPage) {
			endPage = lastPage;
		}
		
		prePage = startPage - pageCount;
		
		if (prePage < firstPage) {
			prePage = firstPage;
		}
		
		nextPage = endPage + 1L;
		
		if (nextPage > lastPage) {
			nextPage = lastPage;
		}
		
		// 데이터 전체 건수
		returnValue.put("dataTotalCount", dataTotalCount);
		
		// 페이지당 데이터 건수
		returnValue.put("dataCountPerPage", dataCountPerPage);
		
		// 현재 페이지 번호
		returnValue.put("currentPage", currentPage);
		
		// 현재 페이지 블럭
		returnValue.put("offsetCount", (currentPage-1)*dataCountPerPage);
		
		// 페이지 건수
		returnValue.put("pageCount", pageCount);
		
		// 시작 페이지 번호
		returnValue.put("startPage", startPage);
		
		// 종료 페이지 번호
		returnValue.put("endPage", endPage);
		
		// 이전 페이지 번호
		returnValue.put("prePage", prePage);
		
		// 다음 페이지 번호
		returnValue.put("nextPage", nextPage);
		
		// 처음 페이지 번호
		returnValue.put("firstPage", firstPage);
		
		// 마지막 페이지 번호
		returnValue.put("lastPage", lastPage);
		

		paramMap.put("dataCountPerPage", dataCountPerPage);
		paramMap.put("offsetCount", (currentPage-1)*dataCountPerPage);
		
		return returnValue;
		
	}
}
