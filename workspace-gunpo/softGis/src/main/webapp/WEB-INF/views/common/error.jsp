<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:app>
	<div class="contents">
		<div class="error">
	        <div class="details">
	            <h3>${error.MESSAGE }</h3>
	            <div class="number">에러코드 <c:out value="${error.STATUS_CODE }"> </c:out></div>
	            <p><a href="<c:url value='/'/>"> [HOME] </a>을 클릭하시면, 홈으로 돌아갑니다.</p>
	        </div>
        </div>
	</div>
</t:app>
	