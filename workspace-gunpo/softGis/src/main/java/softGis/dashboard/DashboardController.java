package softGis.dashboard;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.core.DateManager;

@Controller
public class DashboardController {
	
	@Resource(name="dashboardService")
	public DashboardService dashboardService;
	
	/** 도시재생 대시보드 **/
	@RequestMapping(value="/dashboard/db-ur.do")
	public String dbUr(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("year",DateManager.getNowYear());
		return "dashboard/db-ur";
	}
	
	@RequestMapping(value="/dashboardDataUr.do")
	public String dashboardDataUr(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return dashboardService.dashboardDataUr(req, paramMap, model);
	}
	
	/** 자원순환 대시보드 **/
	@RequestMapping(value="/dashboard/db-waste.do")
	public String dbWaste(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("year",DateManager.getNowYear());
		return "dashboard/db-waste";
	}
	
	@RequestMapping(value="/dashboardDataWaste.do")
	public String dashboardDataWaste(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return dashboardService.dashboardDataWaste(req, paramMap, model);
	}
	

	/** 재난안전 대시보드 **/
	@RequestMapping(value="/dashboard/db-corona.do")
	public String calamity(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		
		return "dashboard/db-corona";
	}
	
	@RequestMapping(value="/dashboardDataCorona.do")
	public String dashboardDataCorona(HttpServletRequest req, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		return dashboardService.dashboardDataCorona(req, paramMap, model);
	}

	@RequestMapping(value="/dashboardSeoulMap.do")
	public String dashboardSeoulMap(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		model.addAttribute("result", (String) dashboardService.dashboardSeoulMap(paramMap));
		
		return "jsonString";
	}
	
}