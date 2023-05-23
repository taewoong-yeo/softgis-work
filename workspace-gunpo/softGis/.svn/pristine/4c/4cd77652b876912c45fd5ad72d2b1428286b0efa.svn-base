package softGis.core;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class DateManager {
	
	private static final Log log = LogFactory.getLog(DateManager.class);	
	
	public static String getNowYear() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		Date date = new Date();
		
		String year = format.format(date);
		return year;
	}
}