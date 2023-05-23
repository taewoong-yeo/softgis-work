<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="type" %>
<t:base>
	<div id="wrap_vertical">
		<div id="wrap_vertical_element" class="auth auth-${type}">
			<div class="auth-inner">
				<div class="auth-logo">
					<div class="auth-logo-bg"></div>
					<img src="<c:url value='/assets/images/login/exp.png' />" alt="커뮤니티매핑">
				</div>
				<div class="auth-form">
					<jsp:doBody />
				</div>
			</div>
		</div>
	</div>
</t:base>