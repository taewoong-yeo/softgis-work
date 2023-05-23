package softGis.core;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public class Encrypter {
	
	public static String encrypt(String algorithm, String str) {
		MessageDigest md;
		StringBuilder builder = new StringBuilder();
		
		try {
			md = MessageDigest.getInstance(algorithm);
			md.update(str.getBytes());
			
			for(byte b : md.digest()) {
				builder.append(String.format("%02x", b));
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		return builder.toString();
	}

	public static void encrypt(Map<String, Object> paramMap) {
		if(paramMap.get("usr_pw") != null && !"".equals(paramMap.get("usr_pw"))) {
			paramMap.replace("usr_pw", Encrypter.encrypt("SHA-256", (String) paramMap.get("usr_pw")));
		}
	}

	public static void encryptId(Map<String, Object> paramMap) {
		if(paramMap.get("usr_id") != null && !"".equals(paramMap.get("usr_id"))) {
			paramMap.replace("usr_id", Encrypter.encrypt("SHA-256", (String) paramMap.get("usr_id")));
		}
	}
	
}
