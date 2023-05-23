package softGis.survey;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import softGis.core.SessionManager;

@Service("surveyService")
public class SurveyService extends EgovAbstractServiceImpl {
	
	@Resource(name="surveyDAO")
	public SurveyDAO surveyDAO;

	public List<Object> getSurveyGroupList(Map<String, Object> paramMap) {
		return surveyDAO.getSurveyGroupList(paramMap);
	};
	
	public Object getSurveyGroupDetail(Map<String, Object> paramMap) {
		return surveyDAO.getSurveyGroupDetail(paramMap);
	};
	
	public int insertSurveyGroup(Map<String, Object> paramMap) {
		return surveyDAO.insertSurveyGroup(paramMap);
	};
	
	public int updateSurveyGroup(Map<String, Object> paramMap) {
		return surveyDAO.updateSurveyGroup(paramMap);
	};
	
	public int deleteSurveyGroup(Map<String, Object> paramMap) {
		return surveyDAO.deleteSurveyGroup(paramMap);
	};
	
	public List<Object> getSurveyList(Map<String, Object> paramMap) {
		return surveyDAO.getSurveyList(paramMap);
	};
	
	public Object getSurveyDetail(Map<String, Object> paramMap) {
		return surveyDAO.getSurveyDetail(paramMap);
	};
	
	public void insertSurvey(Map<String, Object> paramMap) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		
		surveyDAO.insertSurvey(paramMap);
		
		JSONParser jsonParser = new JSONParser();
        Object obj = jsonParser.parse(paramMap.get("itemList").toString());
        List<Map<String,Object>> itemArr = (List<Map<String, Object>>) obj;
        
        if(itemArr.size() > 0) {
        	for(int i=0; i<itemArr.size(); i++) {
        		paramMap.put("item_nm", itemArr.get(i).get("item_nm"));
        		paramMap.put("item_desc", itemArr.get(i).get("item_desc"));
        		paramMap.put("ans_opt_cd", itemArr.get(i).get("ans_opt_cd"));
        		
        		surveyDAO.insertSurveyItem(paramMap);
        	}
        }
	};
	
	public void updateSurvey(Map<String, Object> paramMap) throws Exception {
		SessionManager.getSessionInfo(paramMap);
		
		surveyDAO.updateSurvey(paramMap);
		
		surveyDAO.deleteSurveyItem(paramMap);
		JSONParser jsonParser = new JSONParser();
        Object obj = jsonParser.parse(paramMap.get("itemList").toString());
        List<Map<String,Object>> itemArr = (List<Map<String, Object>>) obj;
        
        if(itemArr.size() > 0) {
        	for(int i=0; i<itemArr.size(); i++) {
        		paramMap.put("item_nm", itemArr.get(i).get("item_nm"));
        		paramMap.put("item_desc", itemArr.get(i).get("item_desc"));
        		paramMap.put("ans_opt_cd", itemArr.get(i).get("ans_opt_cd"));
        		
        		surveyDAO.insertSurveyItem(paramMap);
        	}
        }
	};
	
	public void deleteSurvey(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		surveyDAO.deleteSurvey(paramMap);
		surveyDAO.deleteSurveyItem(paramMap);
	};

	public List<Object> getAnswerList(Map<String, Object> paramMap){
		return surveyDAO.getAnswerList(paramMap);
	};
	
	public int insertSurveyAnswer(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return surveyDAO.insertSurveyAnswer(paramMap);
	};

	public int updateSurveyAnswer(Map<String, Object> paramMap) {
		SessionManager.getSessionInfo(paramMap);
		return surveyDAO.updateSurveyAnswer(paramMap);
	};

	public List<Object> getSurveyAnswerPersonal(Map<String, Object> paramMap){
		return surveyDAO.getSurveyAnswerPersonal(paramMap);
	};

}