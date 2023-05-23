package softGis.admin.anal;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import softGis.core.ErrorCodeMsg;

@Controller
@RequestMapping(value="/python")
public class PythonController {
	
	private static final Log log = LogFactory.getLog(PythonController.class);
	
	@Value("${sys.python}") 
	private String sysPython;
	
	@Value("${sys.python.win}") 
	private String sysPythonWin;
	
	@RequestMapping(value="analModelProcess.do")
	public String analModelProcess(HttpServletRequest request, @RequestParam Map<String, Object> paramMap, ModelMap model) {
		String os = null;
		String command = null;
		String program = (String) paramMap.get("program");
		
		try {
			if (System.getProperty("os.name") != null) os = System.getProperty("os.name").toLowerCase();
			if (os.indexOf("window") > -1) command = sysPythonWin;
			else command = sysPython;
			
			ProcessBuilder  builder = new ProcessBuilder(command, program);
			Process process = builder.start();
			int processVal = process.waitFor();

			BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), "euc-kr"));
			String line;
			while ((line = br.readLine()) != null) {
			     //System.out.println(">>> " + line);
			}
			
			if (processVal == 0) {
				return "분석 프로세스가 비정상 종료되었습니다.";
			} else {
				log.error(ErrorCodeMsg.ERR_PYHON_PROCESS);
			}
		} catch (IOException e) {
			log.error(ErrorCodeMsg.ERR_IO);
		} catch (InterruptedException e) {
			log.error(ErrorCodeMsg.ERR_INTERRUPTED);
		}
		
		return "analysis";
	}
}
