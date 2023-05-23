package softGis.catalog;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.opencsv.CSVWriter;

import softGis.auth.UserVO;
import softGis.core.ErrorCodeMsg;

@Controller
public class CatalogController {
	
	private static final Log log = LogFactory.getLog(CatalogController.class);
	
	@Resource(name="catalogService")
	public CatalogService catalogService;
	
	@RequestMapping(value="/data-catalog.do")
	public String dataCatalogList(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		UserVO user = (UserVO) req.getSession().getAttribute("user");
		if (user != null) paramMap.put("usr_perm", user.getUsr_auth());
		
		String[] filter = { "category", "gather", "cycle", "source" };
		for(String key : filter) {
			String value = (String) paramMap.get(key);
			if(value != null) paramMap.put(key, Arrays.asList(value.split("\\,")));
		}
		
		String queryString = req.getQueryString();
		if (queryString != null) queryString = "&" + queryString; 
		else queryString = "";

		model.addAttribute("queryString", queryString);		
		model.addAttribute("metadatas", catalogService.getMetadatas(paramMap));
		model.addAttribute("sources", catalogService.getMetadataSources(paramMap));
		
		if (req.getMethod().equals("GET")) {
			model.addAllAttributes(paramMap);
			return "catalog/data-catalog";
		} else {
			return "jsonString";
		}
	}
	
	@RequestMapping(value="/getDataCatalogFullData.do")
	@ResponseBody
	public void getDataCatalogFullData(@RequestParam Map<String, Object> paramMap, HttpServletResponse response, ModelMap model) {
		CSVWriter csvWriter = null;
		OutputStreamWriter ops = null;
		BufferedWriter bw = null;
		final int FETCH_SIZE = 1000;
		Map<String, Object> data;
		List<Object> columns;
		List<Object> chunk;
		String[] columnArray;
		String[] rowArray;
		String fileName;
		
		try {
			int count, i;
			ops = new OutputStreamWriter(response.getOutputStream(), "UTF-8");
			bw = new BufferedWriter(ops);
			csvWriter = new CSVWriter(bw);
			
			data = catalogService.getData(paramMap);
			columns = catalogService.getDataCatalogListColumns(paramMap);
			count = catalogService.getDataCatalogRowCount(paramMap);
			columnArray = new String[columns.size()];
			
			for(i = 0; i < columns.size(); i++) {
				@SuppressWarnings("unchecked")
				Map<String, Object> column = (Map<String, Object>) columns.get(i);
				columnArray[i] = (String) column.get("col_nm_org");
			}
			
			fileName = (data.get("mta_nm") + " " + data.get("data_date_cvt")); 
			
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment; filename=" + (new String(fileName.getBytes("KSC5601"), "8859_1")) + ".csv");
			
			// Execute
			paramMap.put("columns", columnArray);
			
			csvWriter.writeNext(columnArray);
			
			for(i = 0; i < count; i += FETCH_SIZE) {
				paramMap.put("take", FETCH_SIZE);
				paramMap.put("skip", i);
				
				chunk = catalogService.getDataCatalogChunkData(paramMap);
				
				for(Object itemObj : chunk) {
					@SuppressWarnings("unchecked")
					Map<String, Object> item = (Map<String, Object>) itemObj;
					
					rowArray = new String[columnArray.length];
					
					for(int j = 0; j < columnArray.length; j++) {
						Object cell = item.get(columnArray[j]);
	
						rowArray[j] = Objects.toString(cell, null);
					}
					csvWriter.writeNext(rowArray);
				}
				csvWriter.flush();
			}
		} catch (UnsupportedEncodingException e) {
			log.error(ErrorCodeMsg.ERR_ENCODING);
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		} finally {
			try {
				if (ops != null) ops.close();
				if (bw != null) bw.close();
				if (csvWriter != null) csvWriter.close();
			} catch (IOException e) {
				log.error(ErrorCodeMsg.ERR_IO);
			}
		}
	}
	
}