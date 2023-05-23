package softGis.api;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.google.common.collect.Lists;

import softGis.core.CoreService;
import softGis.core.ErrorCodeMsg;

@Controller
@RequestMapping(value="/api", method=RequestMethod.POST)
public class ApiColectController {
	
	private static final Log log = LogFactory.getLog(ApiColectController.class);
	
	@Resource(name="coreService")
	private CoreService coreService;
	
	@RequestMapping(value="/executeApi.do")
	public Map<String, Object> executeApi(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		String reqType = "";
		String tableName = "";
		String apiUrl = "";
		String apiKey = "";
		String serviceNm = "";
		Date base_date = null;
		String tableCycleType  = "";
		
		Map<String, Object> apiMap = new HashMap<String, Object>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		
		switch(tableName) {
			case "trafic_wlk_net":
				apiMap = exeSeoulNodelink(reqType, apiUrl, apiKey, serviceNm);
				
				datas = (List<Map<String, Object>>) apiMap.get("datas");
				String[] columns = (String[]) apiMap.get("columns");
				
				List<List<Map<String, Object>>> splitedList = Lists.partition(datas, 1000);
				
				for(int i = 0; i < splitedList.size(); i++) {
					List<Map<String, Object>> data = splitedList.get(i);
					if (reqType.equals("geojson")) {
						coreService.publishGeoJsonToDatabase(columns, data, "data_catlog", tableName, base_date, tableCycleType);
					} else {
						coreService.publishTextDataToDatabase(columns, data, "data_catlog", tableName, base_date, tableCycleType, i);
					}
				}
				break;
		}
		
		return apiMap;
	}
		
	public Map<String, Object> exeSeoulNodelink(String reqType, String apiUrl, String apiKey, String serviceNm) {
		Map<String, Object> result = new HashMap<String, Object>();
		List<Map<String, Object>> datas = new ArrayList<Map<String, Object>>();
		List<String> columnsList = new ArrayList<String>();
		String[] columns;
		int totalCount = 1000;

		int pageNo = 1;
		final int perPage = 1000;
		int repetition = 1;
		
		try {
			for (int i = 0; i <= totalCount / perPage; i++) {
				StringBuilder urlBuilder = new StringBuilder(apiUrl);
				urlBuilder.append("/" + URLEncoder.encode(apiKey, "UTF-8"));
				urlBuilder.append("/" + URLEncoder.encode(reqType, "UTF-8"));
				urlBuilder.append("/" + URLEncoder.encode(serviceNm, "UTF-8"));
		        urlBuilder.append("/" + URLEncoder.encode(Integer.toString(pageNo), "UTF-8"));
		        urlBuilder.append("/" + URLEncoder.encode(Integer.toString(perPage), "UTF-8"));
		        
		        if (reqType.equals("xml")) {
		        	Map<String, Object> map = getSeoulNodelink(urlBuilder);
		        	
		        } else {
			        URL url = new URL(urlBuilder.toString());
			        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.setRequestMethod("GET");
					conn.setRequestProperty("Content-type", (reqType.equals("xml") ? "Application/xml" : "Application/json"));
					
					BufferedReader rd;
					if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
						rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
					} else {
						rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
					}
	
					StringBuilder sb = new StringBuilder();
					String line;
					while ((line = rd.readLine()) != null) {
						sb.append(line);
					}
		        }
			}
		} catch (UnsupportedEncodingException e) {
			log.error(ErrorCodeMsg.ERR_ENCODING);
		} catch (MalformedURLException e) {
			log.error(ErrorCodeMsg.ERR_URL);
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		}
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		NodeList nList = null;
		StringBuilder urlBuilder = null;
		
    	try {
    		urlBuilder = new StringBuilder(apiUrl);
			urlBuilder.append("/" + URLEncoder.encode(apiKey, "UTF-8"));
			urlBuilder.append("/" + URLEncoder.encode("xml", "UTF-8"));
			urlBuilder.append("/" + URLEncoder.encode("", "UTF-8"));
	        urlBuilder.append("/" + URLEncoder.encode("1", "UTF-8"));
	        urlBuilder.append("/" + URLEncoder.encode("1", "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			log.error(ErrorCodeMsg.ERR_ENCODING);
		}
        
        Document document = requestProcess(urlBuilder);
        if (document != null) {
        	nList = document.getElementsByTagName("list_total_count");
            
        	if (nList != null) {
        		for (int temp = 0; temp < nList.getLength(); temp++) {
        			Node nNode = nList.item(temp);
        			
        			if (nNode != null) {
        				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
        					Element eElement = (Element) nNode;
							map.put("list_total_count", eElement.getChildNodes().item(0).getTextContent());
			            }
		            }
		        }
			}
		}
		
		return map;
	}
	
	public Map<String, Object> getSeoulNodelink(StringBuilder urlBuilder) throws UnsupportedEncodingException {
		Map<String, Object> map = new HashMap<String, Object>();
		NodeList nList = null;
        
        Document document = requestProcess(urlBuilder);
        if (document != null) {
        	nList = document.getElementsByTagName("row");
            
        	if (nList != null) {
        		for (int temp = 0; temp < nList.getLength(); temp++) {
        			Node nNode = nList.item(temp);
        			
        			if (nNode != null) {
        				if (nNode.getNodeType() == Node.ELEMENT_NODE) {
        					Element eElement = (Element) nNode;
        					
							map.put("type", eElement.getChildNodes().item(0).getTextContent());
							map.put("node_wkt", eElement.getChildNodes().item(1).getTextContent());
							map.put("node_id", eElement.getChildNodes().item(2).getTextContent());
							map.put("node_code", eElement.getChildNodes().item(3).getTextContent());
							map.put("link_wkt", eElement.getChildNodes().item(4).getTextContent());
							map.put("link_id", eElement.getChildNodes().item(5).getTextContent());
							map.put("link_code", eElement.getChildNodes().item(6).getTextContent());
							map.put("strt_node_id", eElement.getChildNodes().item(7).getTextContent());
							map.put("end_node_id", eElement.getChildNodes().item(8).getTextContent());
							map.put("link_len", eElement.getChildNodes().item(9).getTextContent());
							map.put("sgg_cd", eElement.getChildNodes().item(9).getTextContent());
							map.put("sgg_nm", eElement.getChildNodes().item(9).getTextContent());
							map.put("emd_cd", eElement.getChildNodes().item(9).getTextContent());
							map.put("emd_nm", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_hw", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_uw", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_br", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_tn", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_sw", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_cw", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_pk", eElement.getChildNodes().item(9).getTextContent());
							map.put("tp_in", eElement.getChildNodes().item(9).getTextContent());
			            }
		            }
		        }
			}
		}
		
		return map;
	}
	
	//xml parsing documnet object
	public Document requestProcess(StringBuilder urlBuilder) {
		Document document = null;
		try {
			String xmlString = requestURLProc(urlBuilder);
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(new InputSource(new StringReader(xmlString)));
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}
		
		if (document != null ) {
        	document.getDocumentElement().normalize();
        	return document;
        } else {
        	return null;
        }   
	}
	
	//URL connect process
	public String requestURLProc(StringBuilder urlBuilder) throws IOException {
		HttpURLConnection conn = null;
		BufferedReader rd = null;
		String result = "";
		
		try {
			URL url = new URL(urlBuilder.toString());
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
	
			if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
			    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
			    sb.append(line);
			}
			
			result = sb.toString();
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		} finally {
			if (rd != null) rd.close();
			if (conn != null) conn.disconnect();
		}
		
		return result;
	}
	
	//1000 comma
	public String addComma(String amount) {
		return amount.replaceAll("\\B(?=(\\d{3})+(?!\\d))", ",");
	}
	
}
