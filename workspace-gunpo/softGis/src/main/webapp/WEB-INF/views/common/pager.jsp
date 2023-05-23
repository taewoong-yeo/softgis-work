<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script>
	function submit(page){
		$("input[name=currentPage]").val(page);
		$("#searchForm").submit();
	}
</script>
<div>
	<nav aria-label="" style="display:flex; justify-content:center; margin-top:20px;">
	  <ul class="pagination" style="display:flex;">
	  	<c:if test='${pagination.startPage ne 1 }'>
		  	<li class="page-item">
		        <a class="page-link" href="#" onclick="return submit(${pagination.firstPage})" aria-label="Previous">
		          <span aria-hidden="true"><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
		    	</a>
		    </li>
	    </c:if>
	    <li class="page-item <c:if test='${pagination.startPage eq 1 }'>disabled</c:if>">
	      <a class="page-link" href="#" onclick="return submit(${pagination.startPage-10 })">
	        <i class="fa fa-angle-left"></i>
	        <span class="sr-only">Previous</span>
	      </a>
	    </li>
	    <c:forEach var="i" begin="${pagination.startPage }" end="${pagination.lastPage}" varStatus="status">
	    	<c:if test="${status.count <= 10 }">
		    	<li class="page-item <c:if test='${pagination.currentPage eq i }'> active </c:if>">
		    		<a class="page-link" href="#" onclick="return submit(${i})">${i }</a>
		    	</li>
	    	</c:if>
	    </c:forEach>
	    <li class="page-item <c:if test='${pagination.endPage eq pagination.lastPage }'>disabled</c:if>">
	      <a class="page-link" href="#" onclick="return submit(${pagination.startPage+10 })">
	        <i class="fa fa-angle-right"></i>
	        <span class="sr-only">Next</span>
	      </a>
	    </li>
	    <c:if test='${pagination.endPage ne pagination.lastPage }'>
		    <li class="page-item">
		      <a class="page-link" href="#" onclick="return submit(${pagination.lastPage})" aria-label="Next">
		        <span aria-hidden="true"><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
		      </a>
		    </li>
	    </c:if>
	  </ul>
	</nav>
</div>