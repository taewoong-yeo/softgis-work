package softGis.core;

public enum ErrorCodeMsg implements EnumModel {
	
	ERR_SQL("100", "조회 오류", "", ""),
	ERR_INSRRT("101", "입력 오류", "", ""),
	ERR_UPDATE("102", "입력 오류", "", ""),
	ERR_DELETE("103", "삭제 오류", "", ""),
	ERR_FILE("104", "파일 처리 오류", "", ""),
	ERR_API("105", "API 오류", "", ""),
	ERR_ENCODING("106", "인코딩 오류", "", ""),
	ERR_IO("107", "입출력  오류", "", ""),
	ERR_PARSE("108", "Parse 오류", "", ""),
	ERR_URL("109", "URL 오류", "", ""),
	ERR_CONFIG("111", "ParserConfiguration 오류", "", ""),
	ERR_SAX("112", "SAX 오류", "", ""),
	ERR_URI("113", "URI 오류", "", ""),
	ERR_ILLEGAL("114", "Illegal State 오류", "", ""),
	ERR_CLIENT("115", "ClientProtocol 오류", "", ""),
	ERR_JSONMAPPING("117", "JsonMapping 오류", "", ""),
	ERR_FACTORY("118", "Factory 오류", "", ""),
	ERR_XPATH("119", "XPathExpression 오류", "", ""),
	ERR_SERIAL("120", "Serial 오류", "", ""),
	ERR_LOGIN("121", "Login 오류", "", ""),
	ERR_CODEINJECT("122", "CodeInject 오류", "", ""),
	ERR_SQLSESSION("123", "SqlSession 오류", "", ""),
	ERR_INTERRUPTED("124", "InterruptedException 오류", "", ""),
	ERR_PYHON_PROCESS("125", "Python process 오류", "분석 진행 중 오류가 발생하였습니다.", ""),
	ERR_CSV("126", "CsvValidation 오류", "CSV파일 생성 중 오류가 발생하였습니다.", ""),
	
	ERR_401("401", "요청 변수 오류", "프로젝트 코드가 올바르지 않습니다.", "PRJ_CD is not valid."),
	ERR_402("402", "요청 변수 오류", "설문 아이디가 올바르지 않습니다." , "SVY_ID is not valid."),
	ERR_403("403", "요청 변수 오류", "설문 항목 아디가 올바르지 않습니다.", "ITEM_ID is not valid."),
	ERR_404("404", "요청 변수 오류", "경도가 올바르지 않습니다.", "LON is not valid."),
	ERR_405("405", "요청 변수 오류", "위도가 올바르지 않습니다.", "LAT is not valid."),
	ERR_406("406", "요청 변수 오류", "사용자 아이디가 올바르지 않습니다.", "USR_ID is not valid"),
	ERR_407("407", "요청 변수 오류", "파일이 올바르지 않습니다.", "IMG_FILE is not valid"),
	
	ERR_501("501", "중복된 요청 오류", "", ""),
	ERR_502("502", "종료된 설문 응답", "", ""),
	ERR_503("503", "삭제된 설문 응답", "", ""),
	ERR_504("504", "파일 저장 오류", "", ""),
	ERR_505("900", "알 수 없는 오류", "", ""),
	
	ERR_ETC("999", "기타 오류", "", "");
	
	private String code;
	private String reason;
	private String message;
	private String detail;

	@Override
	public String getCode() {
		return this.code;
	}
	
	@Override
	public String getReason() {
		return this.reason;
	}

	@Override
	public String getMessage() {
		return this.message;
	}
	
	@Override
	public String getDetail() {
		return this.detail;
	}
	
	ErrorCodeMsg(String code, String message, String reason, String detail) {
		this.code = code;
	    this.message = message;
	    this.reason = reason;
	    this.detail = detail;
	}
	
}