package softGis.admin.data;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import softGis.core.CoreService;
import softGis.core.ErrorCodeMsg;
import softGis.core.SessionManager;

@Controller
@RequestMapping(value="/admin", method=RequestMethod.POST)
public class AdminDataController {
	
	final static Pattern quote = Pattern.compile("\\s*(\"[^\"]*\")\\s*");
	private static final Log log = LogFactory.getLog(AdminDataController.class);
	
	final private String schemaName = "data_catalog";
	
	@Resource(name="adminDataService")
	private AdminDataService service;
	
	@Resource(name="coreService")
	private CoreService coreService;
	
	@RequestMapping(value="/getMetadatas.do")
	public String getMetadatas(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getMetadatas(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/checkMetadataNameCollision.do")
	public String checkMetadataNameCollision(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = service.checkMetadataNameCollision(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/checkMetadataTableCollision.do")
	public String checkMetadataTableCollision(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Object result = service.checkMetadataTableCollision(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/insertMetadata.do")
	public String insertMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		int result = service.insertMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateMetadata.do")
	public String updateMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		SessionManager.getSessionInfo(paramMap);
		int result = service.updateMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/checkMetaTableUsed.do")
	public String checkMetaTableUsed(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		List<Object> childrenData = service.getDatas(paramMap);
		boolean childrenExists = service.checkMetadataUsed(paramMap);
		
		if(childrenData.size() > 0 || childrenExists) {
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			
			model.addAttribute("error", "하위 데이터가 존재하는 데이터입니다.\n테이블명을 변경 할 수 없습니다.");
			
			return "jsonString";
		}
		
		model.addAttribute("result", "success");
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteMetadata.do")
	public String deleteMetadata(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		SessionManager.getSessionInfo(paramMap);
		List<Object> childrenData = service.getDatas(paramMap);
		boolean childrenExists = service.checkMetadataUsed(paramMap);
		
		if(childrenData.size() > 0 || childrenExists) {
			response.setStatus(HttpServletResponse.SC_CONFLICT);
			
			model.addAttribute("error", "하위 데이터가 존재하는 데이터입니다.\n데이터를 모두 삭제 후 다시 시도해 주십시오.");
			
			return "jsonString";
		}
		
		int result = service.deleteMetadata(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getDatas.do")
	public String getDatas(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		List<Object> result = service.getDatas(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/checkDataCollision.do")
	public String checkDataCollision(@RequestParam Map<String, Object> paramMap, @RequestParam(value="base_date") Date date, ModelMap model) {
		String tableName = (String) paramMap.get("mta_tbl");
		String tableCycleType = (String) paramMap.get("mta_fcly");
		String tableSuffixName = coreService.getSuffixTableName(tableName, date, tableCycleType);
		
		boolean result = coreService.getTableExistence(schemaName, tableSuffixName);
		
		model.addAttribute("result", !result);
			
		return "jsonString";
	}

	@RequestMapping(value="/insertData.do")
	public String uploadData(@RequestParam Map<String, Object> paramMap, @RequestParam(value="data_file") MultipartFile file, @RequestParam(value="base_date") Date date, ModelMap model,HttpServletResponse response)  {
		
		try {
			ObjectMapper mapper = new ObjectMapper();
			
			String tableName = (String) paramMap.get("mta_tbl");
			String tableCycleType = (String) paramMap.get("mta_fcly");
			String tableGatherType = (String) paramMap.get("mta_gther");
			int mta_id =  Integer.parseInt((String) paramMap.get("mta_id"));
			paramMap.put("data_tbl", coreService.getSuffixTableName(tableName, date, tableCycleType));
	
			int result = service.insertData(paramMap);
			
			if(result > 0) {
				switch(tableGatherType) {
					case "DG_SHP":
						String dbf = (String) paramMap.get("data_dbf");
						String sld = (String) paramMap.get("data_sld");
						
						List<String> dbfList = mapper.readValue(dbf, List.class);
						dbfList = mapper.readValue(dbf, List.class);
						//coreService.publishGeometryDataToGeoserver(file, schemaName, tableName, sld, dbfList, date, tableCycleType);
						break;
					
					case "DG_CSV":
						String data_tbl = (String) paramMap.get("data_tbl");
						InputStreamReader isr = null;
						BufferedReader reader = null;
						List<Map<String, Object>> csvDatas = new ArrayList<>();
						String[] csvColumns = null;
						
						try {
							isr = new InputStreamReader(file.getInputStream(), "UTF-8");
							reader = new BufferedReader(isr);
							int countLineNumber = 0;
							boolean state = false;
							String line = null;
							int lineNo = 0;
							
							
							if (reader != null) {
								while((line = reader.readLine()) != null) {
									CSVReader csvReader = new CSVReader(new FileReader(line));
									String [] nextLine;
									while ((nextLine = csvReader.readNext()) != null) {
										System.out.println(nextLine[0] + nextLine[1] + "etc...");
									}
								}
							}
							
							if (reader != null) {
								while((line = reader.readLine()) != null) {
									String[] row = null;
									
									if (lineNo++ == 0) {
										csvColumns = line.toLowerCase().replaceAll("\"","").split(",");
									} else {
										countLineNumber++;
										
										//String[] tmpRow = StringEscapeUtils.unescapeCsv(line).replaceAll("\"\"", "\"").split(",");
										String[] tmpRow = line.replaceAll("\"\"", "\"").split(",");
										for(int i = 0; i < tmpRow.length; i++) {
											if (tmpRow[i].length() > 0 ) {
												//&#34;: double quote, &#39;: single quote
												if (tmpRow[i].matches("\".*\"")) {
													tmpRow[i] = "\"" + tmpRow[i].substring(1, tmpRow[i].length() -1).replaceAll("\"", "&#34;") + "\"";
												}
												
												tmpRow[i] = tmpRow[i].replaceAll("\'", "&#39;");
											}
										}
										
										row = String.join(",", tmpRow).split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)");
										
										Map<String, Object> data = new HashMap<>();
										if (csvColumns.length == row.length) {
											for(int i = 0; i < csvColumns.length; i++) {
												data.put(csvColumns[i].toLowerCase(), row[i].replaceAll("\"", "").replaceAll("&#34;", "\"").replaceAll("&#39;", "\'\'"));
											}
											csvDatas.add(data);
											state = true;
										} else {
											response.setStatus(HttpServletResponse.SC_CONFLICT);
											model.addAttribute("error", countLineNumber + " line 데이터가 올바르지 않습니다.");
											result = 0;
											state = false;
											break;
										}
									}
									
 									if (lineNo == 1) {
 										coreService.createTextTable(csvColumns, csvDatas, schemaName, data_tbl, null, null);
									} else {
										coreService.insertTextData(csvColumns, csvDatas, schemaName, data_tbl, null, null);
										csvDatas = new ArrayList<>();
									}
								} 
							}
							
							if (state == false) {
								service.deleteData(paramMap);
								coreService.deleteTable(schemaName, data_tbl);
							}
						} catch(IOException e) {
							log.error(ErrorCodeMsg.ERR_IO);
						} catch(CsvValidationException e) {
							log.error(ErrorCodeMsg.ERR_CSV);
						} finally {
							try {
								if (isr != null) isr.close();
								if (reader != null) reader.close();
							} catch (IOException e) {
								log.error(ErrorCodeMsg.ERR_IO);
							}
						}
						
						break;
					case "DG_XLSX":
						Calendar calendar = Calendar.getInstance(Locale.getDefault());
						SimpleDateFormat dateFormat = coreService.getDateFormat();
						SimpleDateFormat dateTimeFormat = coreService.getDateTimeFormat();
						
						XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
						XSSFSheet sheet = workbook.getSheetAt(0);
						XSSFRow row;
						XSSFCell cell;
						
						List<Map<String, Object>> xlsxDatas = new ArrayList<>();
						String[] xlsxColumns = null;
						
						for(int i = 0; i < sheet.getPhysicalNumberOfRows(); i++) {
							row = sheet.getRow(i);
							
							int cellLength = row.getPhysicalNumberOfCells();
							
							if(i == 0) {
								xlsxColumns = new String[cellLength];
								
								for(int j = 0; j < cellLength; j++) {
									xlsxColumns[j] = row.getCell(j).getStringCellValue();
								}
							} else {
								Map<String, Object> data = new HashMap<>();
	
								for(int j = 0; j < cellLength; j++) {
									cell = row.getCell(j);
									
									if (cell == null) {
										data.put(xlsxColumns[j], null);
									} else if(cell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(cell)) {
										Date cellDate = cell.getDateCellValue();
										
										int formatId = cell.getCellStyle().getDataFormat();
										String formatString = cell.getCellStyle().getDataFormatString();
										
										calendar.setTime(cellDate);
										
										if(calendar.get(Calendar.HOUR_OF_DAY) > 0
										|| calendar.get(Calendar.MINUTE) > 0
										|| (formatId >= 18 && formatId <= 22)
										|| formatString.toLowerCase().contains("h")) {
											data.put(xlsxColumns[j], dateTimeFormat.format(cellDate));
										} else {
											data.put(xlsxColumns[j], dateFormat.format(cellDate));
										}
									} else {
										data.put(xlsxColumns[j], cell.getRawValue());
									}
								}
								
								xlsxDatas.add(data);
							}
						}
						
						coreService.publishTextDataToDatabase(xlsxColumns, xlsxDatas, schemaName, tableName, date, tableCycleType);
						break;
				}
			}
			
			model.addAttribute("result", result);
		} catch (JsonParseException e) {
			log.error(ErrorCodeMsg.ERR_PARSE);
		} catch (JsonMappingException e) {
			log.error(ErrorCodeMsg.ERR_JSONMAPPING);
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		}
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateData.do")
	public String updateData(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		int result = service.updateData(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteData.do")
	public String deleteData(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		int result = -1;
		
		try {
			result = service.deleteData(paramMap);
		} catch (Exception e) {
			if (e.getCause().getClass().toString().indexOf("PSQLException") > -1) {
				model.addAttribute("msg", "다른 서비스에서 활용중인 데이터입니다.\n데이터 확인 후 삭제 진행바랍니다.");
			};
		}
		
		
		String tableName = (String) paramMap.get("data_tbl");
		String tableGatherType = (String) paramMap.get("mta_gther");
		try {
				
			switch(tableGatherType) {
				case "DG_SHP":
					//coreService.deleteGeometryDataFromGeoserver(schemaName, tableName);
					break;
				case "DG_CSV":
				case "DG_XLSX":
					coreService.deleteTextDataFromDatabase(schemaName, tableName);
					break;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/getDataColumns.do")
	public String getDataColumns(@RequestParam Map<String, Object> paramMap, @RequestParam(value="mta_upt_date", required=false) Date date, ModelMap model, HttpServletResponse response) {
		/*
		boolean isIntegrated = service.checkDataIntegrated(paramMap);
		if (!isIntegrated) {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			model.addAttribute("error", "모든 데이터가 같은 컬럼을 가지고 있지 않습니다.\n잘못된 데이터를 삭제한 이후 다시 시도해 주십시오.");
			
			return "jsonString";
		}
		*/
		
		String tableName = (String) paramMap.get("mta_tbl");
		String dateCycleType = (String) paramMap.get("mta_fcly");
		
		if (tableName != null && date != null && dateCycleType != null) {
			paramMap.put("mta_tbl_latest", coreService.getSuffixTableName(tableName, date, dateCycleType));
		}
		
		List<Object> result = service.getDataColumns(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/updateDataColumn.do")
	public String updateDataColumn(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		paramMap.put("tableName", service.getMtaTableName(paramMap));
		
		int result = service.updateDataColumn(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/deleteDataColumn.do")
	public String deleteDataColumn(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletResponse response) {
		int result = service.deleteDataColumn(paramMap);
		
		model.addAttribute("result", result);
		
		return "jsonString";
	}
	
	@RequestMapping(value="/saveApi.do")
	public String saveApi(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		Integer result = service.saveApi(paramMap);
		model.addAttribute("result", result);
		
		return "jsonString";
	}
}
