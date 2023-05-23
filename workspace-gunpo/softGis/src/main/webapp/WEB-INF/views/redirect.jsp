<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script>
	alert("${message}");
	location.href = "<c:url value='${url}' />";
	if("${type}" == "close"){
		window.close();
	}
</script>