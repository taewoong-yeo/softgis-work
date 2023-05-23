package softGis.partcptnMap.troblGoods;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.SessionManager;
import softGis.fileGet.FileGetService;

@Service("troblGoodsService")
public class TroblGoodsService extends EgovAbstractServiceImpl {

	@Resource(name="troblGoodsDAO")
	private TroblGoodsDAO dao;

	@Value("${social.kakao.client_id}")
	private String kakaoClientId;

	@Resource(name="FileGetService")
	private FileGetService fileGetService;

	public String getTroblGoodsList(Map<String, Object> paramMap, ModelMap model) {
		if("INDVDL".equals(paramMap.get("listGb"))) {
			SessionManager.getSessionInfo(paramMap);
		}
		List<Object> list = dao.getTroblGoodsList(paramMap);
		
		model.addAttribute("list",list);
		return "jsonString";
	};
	
	public String getTroblGoodsDetail(Map<String, Object> paramMap, ModelMap model) {
		Object result = dao.getTroblGoodsDetail(paramMap);
		List<Object> replyList = dao.getTroblGoodsReplyList(paramMap);
		
		model.addAttribute("replyList",replyList);
		model.addAttribute("result", result);
		return "jsonString";
	};
	
	public String insertTroblGoods(Map<String, Object> paramMap, List<MultipartFile> files, HttpServletRequest request) throws Exception {
		SessionManager.getSessionInfo(paramMap);

		if(files != null) {
			for(int i=0; i<files.size(); i++) {
				int fileNo = fileGetService.fileInsertFile(files.get(i), FileGetService.UPLOAD_SUBPATH_PARTCPTN);
			}
//			paramMap.put("file_id", fileNo);
		} 
		if(paramMap.get("goods_addr") != null && !"".equals(paramMap.get("goods_addr"))) {
			Map<String,Object> crdntInfo = getCrdntInfoRestApi(paramMap.get("goods_addr").toString());
			List<Map<String,Object>> info = (List<Map<String, Object>>) crdntInfo.get("documents");
			paramMap.put("lat", info.get(0).get("y"));
			paramMap.put("lon", info.get(0).get("x"));
		}
		dao.insertTroblGoods(paramMap);
		request.setAttribute("message", "등록되었습니다.");
		request.setAttribute("url", "/partcptnMap/trobl-goods-cnrs.do");
		return "forward:/redirect.do";
	};
	
	public String updateTroblGoods(Map<String, Object> paramMap, HttpServletRequest request) {
		SessionManager.getSessionInfo(paramMap);
		
		if(paramMap.get("goods_addr") != null && !"".equals(paramMap.get("goods_addr"))) {
			Map<String,Object> crdntInfo = getCrdntInfoRestApi(paramMap.get("goods_addr").toString());
			List<Map<String,Object>> info = (List<Map<String, Object>>) crdntInfo.get("documents");
			paramMap.put("lat", info.get(0).get("y"));
			paramMap.put("lon", info.get(0).get("x"));
		}
		dao.updateTroblGoods(paramMap);
		request.setAttribute("message", "수정되었습니다.");
		request.setAttribute("url", "/partcptnMap/trobl-goods-cnrs.do");
		return "forward:/redirect.do";
	};

	public List<Object> getTroblGoodsReplyList(Map<String, Object> paramMap) {
		return dao.getTroblGoodsReplyList(paramMap);
	};
	
	public int insertTroblGoodsReply(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return dao.insertTroblGoodsReply(paramMap);
	};
	
	public int deleteTroblGoodsReply(Map<String, Object> paramMap) {
		return dao.deleteTroblGoodsReply(paramMap);
	};
	
	public Map<String,Object> getCrdntInfoRestApi(String query) {
		HttpURLConnection conn = null;
		Map<String, Object> result = new HashMap<String, Object>();
		  try {
		    //Create connection
		    URL url = new URL("https://dapi.kakao.com/v2/local/search/address.json");
		    conn = (HttpURLConnection) url.openConnection();
		    conn.setRequestMethod("POST"); 
		    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		    conn.setRequestProperty("Authorization", "KakaoAK 57cb8a8524d676883cac3850964b1601");

		    conn.setUseCaches(false);// 캐싱데이터를 받을지 말지 세팅합니다.
		    conn.setDoOutput(true); // 쓰기모드를 지정할지 세팅합니다.
		    
//			POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("&query="+query);
            bw.write(sb.toString());
            bw.flush();

            //    요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            result = new ObjectMapper().readValue(br.readLine(), Map.class);

            br.close();
            bw.close();
		  } catch (Exception e) {
		    e.printStackTrace();
		    return null;
		  } finally {
		    if (conn != null) {
		      conn.disconnect();
		    }
		  }
		  
		  return result;
	}
}
