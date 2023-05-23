package softGis.partcptnMap.troblGoods;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("troblGoodsDAO")
public interface TroblGoodsDAO {

	public List<Object> getTroblGoodsList(Map<String, Object> paramMap);
	
	public Object getTroblGoodsDetail(Map<String, Object> paramMap);
	
	public int insertTroblGoods(Map<String, Object> paramMap);
	
	public int updateTroblGoods(Map<String, Object> paramMap);

	public List<Object> getTroblGoodsReplyList(Map<String, Object> paramMap);
	
	public int insertTroblGoodsReply(Map<String, Object> paramMap);
	
	public int deleteTroblGoodsReply(Map<String, Object> paramMap);
}