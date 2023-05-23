package softGis.core;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("coreService")
public class CoreService extends EgovAbstractServiceImpl {
	
	private static final Log log = LogFactory.getLog(CoreService.class);
	
	@Resource(name="coreDAO")
	public CoreDAO coreDAO;
	
	@Resource(name="coreService")
	private CoreService coreService;
	
    public List<Object> getCodesForInterceptor(Map<String, Object> paramMap) {
    	return coreDAO.getCodesForInterceptor(paramMap);
    }

	public boolean publishTextDataToDatabase(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName) {
		return this.publishTextDataToDatabase(columns, datas, schemaName, tableName, null, null);
	}
	
	public boolean publishTextDataToDatabase(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName, Date date, String dateCycleType) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("columns", columns);
		map.put("datas", datas);

		int create = coreDAO.createTextTable(map);
		int insert = coreDAO.insertTextData(map);
		
		return create > 0 && insert > 0;
	}
	
	public boolean createTextTable(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName, Date date, String dateCycleType) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("columns", columns);
		map.put("datas", datas);

		int create = coreDAO.createTextTable(map);
		
		return create > 0;
	}
	
	public boolean insertTextData(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName, Date date, String dateCycleType) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("columns", columns);
		map.put("datas", datas);

		int insert = coreDAO.insertTextData(map);
		
		return insert > 0;
	}
	
	public boolean deleteTextDataFromDatabase(String schemaName, String tableName) throws Exception {
		try {
			this.deleteTable(schemaName, tableName);
		} catch(Exception e) { }
		
		return true;
	}
	
	public boolean getTableExistence(String schemaName, String tableName) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		
		return coreDAO.getTableExistence(map);
	}
	
	public int deleteTable(String schemaName, String tableName) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		
		return coreDAO.deleteTable(map);
	}

	public int updateImporterCharacterField(String schemaName, String tableName, List<String> fields) {
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("fields", fields);
		
		return coreDAO.updateImporterCharacterField(map);
	}
	
	public String getSuffixTableName(String tableName, Date date, String dateCycleType) {
		StringBuilder tableDateSuffix = new StringBuilder(tableName).append("_");
		Calendar calendar = Calendar.getInstance(Locale.getDefault());
		
		calendar.setTime(date);
		
		switch(dateCycleType) {
			case "DF_IRRE":
				tableDateSuffix.append(calendar.get(Calendar.YEAR));
				tableDateSuffix.append(String.format("%02d", calendar.get(Calendar.MONTH) + 1));
				tableDateSuffix.append(String.format("%02d", calendar.get(Calendar.DATE)));
				break;
			case "DF_MONTH":
				tableDateSuffix.append(calendar.get(Calendar.YEAR));
				tableDateSuffix.append(String.format("%02d", calendar.get(Calendar.MONTH) + 1));
				break;
			case "DF_YEAR":
				tableDateSuffix.append(calendar.get(Calendar.YEAR));
				break;
			case "DF_QUART":
				tableDateSuffix.append(calendar.get(Calendar.YEAR));
				switch(calendar.get(Calendar.MONTH) + 1) {
					case 1: case 2: case 3: tableDateSuffix.append("q1"); break;
					case 4: case 5: case 6: tableDateSuffix.append("q2"); break;
					case 7: case 8: case 9: tableDateSuffix.append("q3"); break;
					case 10: case 11: case 12: tableDateSuffix.append("q4"); break;
				}
				break;
			case "DF_HALF":
				tableDateSuffix.append(calendar.get(Calendar.YEAR));
				if(calendar.get(Calendar.MONTH) + 1 < 7)
					tableDateSuffix.append("h1");
				else
					tableDateSuffix.append("h2");
				break;
		}
		
		return tableDateSuffix.toString();
	}
	
	public boolean publishTextDataToDatabase(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName, Date date, String dateCycleType, int repetition) {
		if(date != null && dateCycleType != null) {
			tableName = this.getSuffixTableName(tableName, date, dateCycleType);
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("columns", columns);
		map.put("datas", datas);
		
		if (datas.size() > 0) {
			for(Map<String, Object> item : datas) {
				Iterator<String> iterator = item.keySet().iterator();
				while(iterator.hasNext()) {
					String key = iterator.next().toString();
					String val = (item.get(key) == null ? "" : item.get(key).toString());
					item.replace(key, val.replaceAll("^\"|\"$", ""));
				}
			}
		}
		
		int create = 0;
		if (repetition == 0)  create = coreDAO.createColctTextTable(map);
		int insert = coreDAO.insertColctTextData(map);
		
		return create > 0 && insert > 0;
	}
	
	public boolean publishGeoJsonToDatabase(String[] columns, List<Map<String, Object>> datas, String schemaName, String tableName, Date date, String dateCycleType) {
		if(date != null && dateCycleType != null) {
			tableName = coreService.getSuffixTableName(tableName, date, dateCycleType);
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("schema_nm", schemaName);
		map.put("table_nm", tableName);
		map.put("columns", columns);
		map.put("datas", datas);
		
		int create = coreDAO.createGeoJsonTable(map);
		int insert = coreDAO.insertGeoJsonData(map);
		
		return create > 0 && insert > 0;
	}
	
	public SimpleDateFormat getDateFormat() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
		
		return format;
	}
	
	public SimpleDateFormat getDateTimeFormat() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());
		
		return format;
	}

	public void publishTextDataToDatabase(String[] csvColumns, List<Map<String, Object>> csvDatas, String schemaName,
			String data_tbl, Date date, String tableCycleType, String string) {
		// TODO Auto-generated method stub
		
	}
}