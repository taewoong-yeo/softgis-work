package softGis.api;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

@JacksonXmlRootElement(localName = "header")
public class Header {
	
	public String resultCode;
	public String resultMsg;
	public String file_id;
	public String file_org_nm;

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMsg() {
		return resultMsg;
	}

	public void setResultMsg(String resultMsg) {
		this.resultMsg = resultMsg;
	}

	public String getFile_id() {
		return file_id;
	}

	public void setFile_id(String file_id) {
		this.file_id = file_id;
	}

	public String getFile_org_nm() {
		return file_org_nm;
	}

	public void setFile_org_nm(String file_org_nm) {
		this.file_org_nm = file_org_nm;
	}
	
}
