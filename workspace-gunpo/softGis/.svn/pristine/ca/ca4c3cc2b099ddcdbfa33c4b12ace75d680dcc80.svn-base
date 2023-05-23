<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>
<c:url value="/dataCatalogList.do" var="dataCatalogURL">
	<c:if test="${query != null}"><c:param name="query" value="${query}" /></c:if>
	<c:if test="${category != null}"><c:param name="category" value="${category}" /></c:if>
	<c:if test="${gather != null}"><c:param name="gather" value="${gather}" /></c:if>
	<c:if test="${cycle != null}"><c:param name="cycle" value="${cycle}" /></c:if>
	<c:if test="${source != null}"><c:param name="source" value="${source}" /></c:if>
</c:url>
<t:subapp>
	<div class="catalog">
		<div class="catalog-menu">
			<h1 class="catalog-title">데이터 상세</h1>
			<div class="catalog-menu-list">
				<a href="javascript: void(0);" data-scroll-to="basic" class="scroll-top catalog-menu-item"><span>데이터 기본정보</span></a>
				<a href="javascript: void(0);" data-scroll-to="preview" class="scroll-top catalog-menu-item"><span>데이터 미리보기</span></a>
				<a href="javascript: void(0);" data-scroll-to="spec" class="scroll-top catalog-menu-item"><span>데이터 명세</span></a>
			</div>
		</div>
		<div class="catalog-content">
			<div id="basic" class="catalog-section">
				<div class="catalog-basic-action">
					<a href="<c:url value="${dataCatalogURL}" />" class="btn btn-secondary-border">목록으로 돌아가기</a>
				</div>
				<h3 class="catalog-section-title">데이터 기본정보</h3>
				<div class="catalog-section-inner catalog-basic">
					<div class="catalog-basic-inner">
						<div class="catalog-basic-title">
							<small>데이터명</small>
							<h2><c:out value="${metadata.mta_nm}" /></h2>
						</div>
						<div class="catalog-basic-desc">
							<small>데이터 설명</small>
							<p><c:out value="${metadata.mta_desc}" /></p>
						</div>
					</div>
				</div>
			</div>
			<div id="preview" class="catalog-section">
				<h3 class="catalog-section-title">데이터 미리보기</h3>
				<div class="catalog-section-inner catalog-preview">
					<div class="catalog-preview-inner">
						<div class="catalog-preview-option">
							<span class="catalog-preview-label"><i class="bx bx-time-five"></i> 데이터 일자 </span>
							<select id="catalog_preview_date" title="데이터일자">
								<c:forEach var="item" varStatus="status" items="${metadata.mta_dates}">
									<option value="${metadata.mta_tbls[status.index]}">${item}</option>
								</c:forEach>
							</select>
							<div id="catalog_preview_type">
								<c:if test="${metadata.mta_gther eq 'DG_SHP'}">
									<a href="#map" class="${metadata.mta_gther eq 'DG_SHP' ? 'active' : '' }"><i class="bx bxs-map"></i> 지도</a>
								</c:if>
								<a href="#chart"><i class="bx bxs-bar-chart-alt-2"></i> 차트</a>
								<a href="#list" class="${metadata.mta_gther eq 'DG_SHP' ? '' : 'active' }"><i class="bx bx-list-ul"></i>리스트</a>
								<input type="hidden" name="download_stat" id="download_stat" value="<c:url value='${metadata.download_stat}' />">
							</div>
						</div>
						<div class="catalog-preview-visualize catalog-preview-list"></div>
						<p class="preview_guid">※ 미리보기 데이터는 최대  50개 항목을 100건까지 보여줍니다.</p>
					</div>
				</div>
			</div>
			<div id="spec" class="catalog-section">
				<h3 class="catalog-section-title">데이터 명세</h3>
				<div class="catalog-section-inner catalog-spec">
					<div class="catalog-spec-inner">
						<table>
							<tbody>
								<tr>
									<td>카테고리</td>
									<td>${metadata.mta_cat_nm}</td>
									<td>테이블명</td>
									<td id="mta_tbl">${metadata.mta_tbl}</td>
								</tr>
								<tr>
									<td>수집주기</td>
									<td>${metadata.mta_fcly_nm}</td>
									<td>수집형태</td>
									<td>${metadata.mta_gther_nm}</td>
								</tr>
								<tr>
									<td>수집 URL</td>
									<td colspan="3"><a href="${metadata.mta_url}" target="_blank">${metadata.mta_url}</a></td>
								</tr>
								<tr>
									<td>출처</td>
									<td>${metadata.mta_src}</td>
									<td>최신 데이터 날짜</td>
									<td>${metadata.mta_upt_date}</td>
								</tr>
								<tr>
									<td>명세서</td>
									<td colspan="3">
										<a href="<c:url value="/getDataCatalogSpecification.do"><c:param name="mta_nm" value="${metadata.mta_nm}" /><c:param name="mta_tbl" value="${metadata.mta_tbl}" /></c:url>" class="btn btn-secondary">데이터 명세서 다운로드</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</t:subapp>