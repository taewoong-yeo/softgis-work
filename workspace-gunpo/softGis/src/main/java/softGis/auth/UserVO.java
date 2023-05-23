package softGis.auth;

import java.io.Serializable;

public class UserVO implements Serializable {

	private static final long serialVersionUID = -614571607203126816L;
	
	private String usr_id;
	private String usr_dept;
	private String usr_nm;
	private String usr_pw;
	private String usr_mobile;
	private String usr_tel;
	private String usr_auth;
	private String usr_login_type;
	private String use_stat;
	public String getUsr_id() {
		return usr_id;
	}
	public void setUsr_id(String usr_id) {
		this.usr_id = usr_id;
	}
	public String getUsr_dept() {
		return usr_dept;
	}
	public void setUsr_dept(String usr_dept) {
		this.usr_dept = usr_dept;
	}
	public String getUsr_nm() {
		return usr_nm;
	}
	public void setUsr_nm(String usr_nm) {
		this.usr_nm = usr_nm;
	}
	public String getUsr_pw() {
		return usr_pw;
	}
	public void setUsr_pw(String usr_pw) {
		this.usr_pw = usr_pw;
	}
	public String getUsr_mobile() {
		return usr_mobile;
	}
	public void setUsr_mobile(String usr_mobile) {
		this.usr_mobile = usr_mobile;
	}
	public String getUsr_tel() {
		return usr_tel;
	}
	public void setUsr_tel(String usr_tel) {
		this.usr_tel = usr_tel;
	}
	public String getUsr_auth() {
		return usr_auth;
	}
	public void setUsr_auth(String usr_auth) {
		this.usr_auth = usr_auth;
	}
	public String getUsr_login_type() {
		return usr_login_type;
	}
	public void setUsr_token(String usr_login_type) {
		this.usr_login_type = usr_login_type;
	}
	public String getUse_stat() {
		return use_stat;
	}
	public void setUse_stat(String use_stat) {
		this.use_stat = use_stat;
	}
	
	
}
