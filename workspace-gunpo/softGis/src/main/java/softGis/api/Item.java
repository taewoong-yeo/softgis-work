package softGis.api;

//@JacksonXmlRootElement(localName = "item")
public class Item {

	private int id; // 아이디
	private String institution_nm; // 꽌리기관명
	private String rdnmadr; // 소재지 도로명 주소
	private String lnmadr; // 소재지 지번 주소
	private String installation_purps_type; // 설치 목적 구분
	private int cctv_number; // 카메라 대수
	private int cctv_pixel; // 카메라 화소
	private String potogrf_info; // 촬영방면 정보
	private int cstdy_day; // 보관일수
	private String installation_yymm; // 설치년월
	private String phone_number; // 관리기관 전화번호
	private float latitude; // 위도
	private float longitude; // 경도
	private String reference_date; // 데이터 기준일자
	private String cctv_manage_no; // cctv 관리번호
	private String geom; // 지오메트리

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getInstitution_nm() {
		return institution_nm;
	}

	public void setInstitution_nm(String institution_nm) {
		this.institution_nm = institution_nm;
	}

	public String getRdnmadr() {
		return rdnmadr;
	}

	public void setRdnmadr(String rdnmadr) {
		this.rdnmadr = rdnmadr;
	}

	public String getLnmadr() {
		return lnmadr;
	}

	public void setLnmadr(String lnmadr) {
		this.lnmadr = lnmadr;
	}

	public String getInstallation_purps_type() {
		return installation_purps_type;
	}

	public void setInstallation_purps_type(String installation_purps_type) {
		this.installation_purps_type = installation_purps_type;
	}

	public int getCctv_number() {
		return cctv_number;
	}

	public void setCctv_number(int cctv_number) {
		this.cctv_number = cctv_number;
	}

	public int getCctv_pixel() {
		return cctv_pixel;
	}

	public void setCctv_pixel(int cctv_pixel) {
		this.cctv_pixel = cctv_pixel;
	}

	public String getPotogrf_info() {
		return potogrf_info;
	}

	public void setPotogrf_info(String potogrf_info) {
		this.potogrf_info = potogrf_info;
	}

	public int getCstdy_day() {
		return cstdy_day;
	}

	public void setCstdy_day(int cstdy_day) {
		this.cstdy_day = cstdy_day;
	}

	public String getInstallation_yymm() {
		return installation_yymm;
	}

	public void setInstallation_yymm(String installation_yymm) {
		this.installation_yymm = installation_yymm;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public String getReference_date() {
		return reference_date;
	}

	public void setReference_date(String reference_date) {
		this.reference_date = reference_date;
	}

	public String getCctv_manage_no() {
		return cctv_manage_no;
	}

	public void setCctv_manage_no(String cctv_manage_no) {
		this.cctv_manage_no = cctv_manage_no;
	}

	public String getGeom() {
		return geom;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

}
