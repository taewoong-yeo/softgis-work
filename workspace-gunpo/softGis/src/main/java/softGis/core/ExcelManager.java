package softGis.core;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelManager {

	public static void getExcelDownload(List<Object> data, String[] columns, String[] keys, String title, HttpServletResponse response) {
		String[] columnArray = new String[columns.length];
		try {
			Workbook workbook = new XSSFWorkbook();
			Sheet sheet;
			Row row;
			Cell cell;
			
			Font headerFont = workbook.createFont();
			headerFont.setBold(Boolean.TRUE);
			headerFont.setFontName("맑은 고딕");
			
			CellStyle headerStyle = workbook.createCellStyle();
			headerStyle.setFont(headerFont);
			headerStyle.setAlignment(HorizontalAlignment.CENTER);
			headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
			headerStyle.setBorderTop(BorderStyle.THIN);
			headerStyle.setBorderBottom(BorderStyle.THIN);
			headerStyle.setBorderRight(BorderStyle.THIN);
			headerStyle.setBorderLeft(BorderStyle.THIN);
			headerStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
			headerStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
			headerStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
			headerStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
	        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);		
			sheet = workbook.createSheet(title);
			row = sheet.createRow(0);
			row.setHeight((short) 1000);
			
			for(int i = 0; i < columns.length; i++) {
				cell = row.createCell(i);
				cell.setCellValue(columns[i]);
				cell.setCellStyle(headerStyle);
			}
	
			Font cellFont = workbook.createFont();
			cellFont.setFontName("맑은 고딕");
			
			CellStyle cellStyle = workbook.createCellStyle();
			cellStyle.setFont(cellFont);
			cellStyle.setBorderTop(BorderStyle.THIN);
			cellStyle.setBorderBottom(BorderStyle.THIN);
			cellStyle.setBorderRight(BorderStyle.THIN);
			cellStyle.setBorderLeft(BorderStyle.THIN);
			cellStyle.setBottomBorderColor(IndexedColors.BLACK.getIndex());
			cellStyle.setTopBorderColor(IndexedColors.BLACK.getIndex());
			cellStyle.setRightBorderColor(IndexedColors.BLACK.getIndex());
			cellStyle.setLeftBorderColor(IndexedColors.BLACK.getIndex());
			
			String[] rowArray;
			int seq = 1;
			
			for(Object itemObj : data) {
				rowArray = new String[columnArray.length];
				row = sheet.createRow(seq);
				Map<String, Object> item = (Map<String, Object>) itemObj;
				for(int j = 0; j < columnArray.length; j++) {
					String cellValue = item.get(keys[j]).toString();
					cell = row.createCell(j);
					cell.setCellValue(cellValue);
					cell.setCellStyle(cellStyle);
				}
				
				seq ++;
			}

	        for(int l = 0; l < columns.length; l++) {
	        	sheet.autoSizeColumn(l);
			}
			response.setContentType("application/vnd.ms-excel");
			// 엑셀 파일명 설정
			response.setHeader("Content-Disposition", "attachment;filename="+URLEncoder.encode(title, "UTF-8").replaceAll("\\+", "%20")+".xlsx");

			workbook.write(response.getOutputStream());                                            // 엑셀파일로 작성
			workbook.close();
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 
	}
}
