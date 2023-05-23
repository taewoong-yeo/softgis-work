<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ attribute name="group" %>
<%@ attribute name="selValue" %>

<c:forEach var="item" items="${__CODES__}">
	<c:if test="${item.grp_id eq group}">
		<option value="${item.cd_id}" <c:if test="${item.cd_id eq selValue }">selected</c:if>>${item.cd_nm}</option>
	</c:if>
</c:forEach>
