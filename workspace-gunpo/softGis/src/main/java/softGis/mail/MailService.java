package softGis.mail;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import javax.activation.CommandMap;
import javax.activation.MailcapCommandMap;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("mailService")
public class MailService {
	
	@Value("${mail.host}")
	private String smtp_host;
	
	@Value("${mail.id}")
	private String smtp_id;
	
	@Value("${mail.pwd}")
	private String smtp_pwd;
	
	@Value("${mail.sender}")
	private String smtp_sender;
	
	MailController mcon = new MailController();

	private String URI_1 = mcon.getMailUri(1);
	private String URI_2 = mcon.getMailUri(2);
	
	public boolean sendMail(Map<String, Object> paramMap, String toAddr, String mailSubject, String htmlStr) { 
//		String m_name = "LX";
		
		// smtp 포트
		String m_port_587 = "587";
		String m_port_465 = "465";
		
		//구글 smtp
		String m_host = smtp_host;
		
		boolean r = false;
		
		String mailAddr = smtp_id;
		String mailSender = smtp_sender;
		String mailPwd = smtp_pwd;

		Properties prop = new Properties();
		
		// port: 587
		prop.put("mail.smtp.host", m_host); // v
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.port", m_port_587); // v
		prop.put("mail.smtp.socketFactory.port" , "587");		
		prop.put("mail.smtp.starttls.enable", "true");
		
//		prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
//		prop.put("mail.debug","true");
//		prop.put("mail.transport.protocol.rfc822", "smtps");
		
		// port: 465
//		prop.put("mail.smtp.user", mailAddr); // v
//		prop.put("mail.smtp.host", m_host); // v
//		prop.put("mail.smtp.port", m_port_465); // v
//		prop.put("mail.smtp.auth", "true"); // v
//		prop.put("mail.smtp.debug", "true"); // v
//		prop.put("mail.smtp.ssl.enable", "true");
//		prop.put("mail.smtp.ssl.trust", m_host);
//		prop.put("mail.smtp.socketFactory.port", m_port_465); // v
//		prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory"); // v
//		prop.put("mail.smtp.socketFactory.fallback", "false"); // v
		
		Authenticator auth = new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(mailAddr, mailPwd);
			}
		};
		
		Session session = Session.getDefaultInstance(prop, auth);
		session.setDebug(true);
		
		try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(mailAddr, mailSender));

            // recipient address
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(toAddr)); 

            // Subject / Date
//            message.setSubject("[ TO. " + userNm + " 님 ] LX softGIS 회원 가입 인증 메일");
            message.setSubject(mailSubject);
            message.setSentDate(new Date());
            
            // main content
            Multipart multiPart = new MimeMultipart();
            MimeBodyPart mimeBody = new MimeBodyPart();
            mimeBody.setText(htmlStr, "UTF-8", "html");
            multiPart.addBodyPart(mimeBody);
            message.setContent(multiPart);
            
            // mime type setting
            MailcapCommandMap mailCmdMap = (MailcapCommandMap) CommandMap.getDefaultCommandMap();
            mailCmdMap.addMailcap("text/html;; x-java-content-handler=com.sun.mail.handlers.text_html");
            mailCmdMap.addMailcap("text/xml;; x-java-content-handler=com.sun.mail.handlers.text_xml");
            mailCmdMap.addMailcap("text/plain;; x-java-content-handler=com.sun.mail.handlers.text_plain");
            mailCmdMap.addMailcap("multipart/*;; x-java-content-handler=com.sun.mail.handlers.multipart_mixed");
            mailCmdMap.addMailcap("message/rfc822;; x-java-content-handler=com.sun.mail.handlers.message_rfc822");
            CommandMap.setDefaultCommandMap(mailCmdMap);
            
            // port: 587 - send
            Transport transport = session.getTransport("smtp");
            transport.connect(m_host, mailAddr, mailPwd);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            
            // port: 465 - send
            // Transport.send(message); 
            
            // must be undermost (반드시 최하단에 위치시킬 것.)
            r = true;
            System.out.println("message sent successfully...");
        }catch (AddressException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return r;
		
	}
	
}
