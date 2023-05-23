package softGis.partcptnMap.troblGoods;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(value="/partcptnMap")
public class TroblGoodsController {
	
	@Resource(name="troblGoodsService")
	private TroblGoodsService service;
	
	@RequestMapping(value="/trobl-goods-cnrs.do")
	public String getTroblGoods(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return "partcptnMap/trobl-goods-cnrs";
	}
	
	@RequestMapping(value="/getTroblGoodsList.do")
	public String getTroblGoodsList(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		return service.getTroblGoodsList(paramMap, model);
	}
	
	@RequestMapping(value="/getTroblGoodsDetail.do")
	public String getTroblGoodsDetail(@RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		return service.getTroblGoodsDetail(paramMap, model);
	}
	
	@RequestMapping(value="/insertTroblGoods.do")
	public String insertTroblGoods(@RequestParam Map<String, Object> paramMap, @RequestParam("fileList") List<MultipartFile> files, ModelMap model, HttpServletRequest request) throws Exception {
		
		return service.insertTroblGoods(paramMap, files, request);
	}
	
	@RequestMapping(value="/updateTroblGoods.do")
	public String updateTroblGoods(@RequestParam Map<String, Object> paramMap, ModelMap model, HttpServletRequest request) {
		
		return service.updateTroblGoods(paramMap, request);
	}

	@RequestMapping(value="/insertTroblGoodsReply.do")
	public String insertTroblGoodsReply(@RequestParam Map<String, Object> paramMap) {
		service.insertTroblGoodsReply(paramMap);
		return "jsonString";
	};

	@RequestMapping(value="/deleteTroblGoodsReply.do")
	public String deleteTroblGoodsReply(@RequestParam Map<String, Object> paramMap) {
		service.deleteTroblGoodsReply(paramMap);
		return "jsonString";
	};
	
}
