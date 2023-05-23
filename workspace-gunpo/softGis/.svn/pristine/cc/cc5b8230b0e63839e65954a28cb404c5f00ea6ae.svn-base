package softGis.test;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/test")
public class TestController {
	
	@Resource(name="testService")
	private TestService testService;

	@RequestMapping(value="/mainTest.do")
	public String mainTest() {
		return "test/main-test";
	}
	
	@RequestMapping(value="/search.do", method=RequestMethod.POST)
	public String testSearch(@RequestParam Map<String, Object> paramMap, ModelMap model){
		model.addAttribute("result", testService.getTestResultList(paramMap));
		return "jsonString";
	}
	
	@RequestMapping(value="/mapTest.do")
	public String mapTest() {
		return "test/map-test";
	}
	
	
	@RequestMapping(value="/uploadTest.do")
	public String uploadTestGet() {
		return "test/upload-test";
	}
	
	
}