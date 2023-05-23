"use strict";

// ES6 Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Global
import './global';

// Routes
//------- 관리도구
import CommonRoute from './routes/common-route';
import MainRoute from './routes/main-route';
import LoginRoute from './routes/login-route';
import RegisterRoute from './routes/register-route';
import MypageRoute from './routes/mypage-route';
import AdminCodeRoute from './routes/admin-code-route';
import AdminNoticeRoute from './routes/admin-notice-route';
import AdminFaqRoute from './routes/admin-faq-route';
import AdminAnalMngrRoute from './routes/admin-anal-mngr-route';
import AdminAnalModelRoute from './routes/admin-anal-model-route';
import AdminAnalDataRoute from './routes/admin-anal-data-route';
import AdminAnalResultRoute from './routes/admin-anal-result-route';
import AdminMetaMngrRoute from './routes/admin-meta-mngr-route';
import AdminMetaLoadRoute from './routes/admin-meta-load-route';
import AdminusrRoute from './routes/admin-user-route';
import AdminCmmntyRoute from './routes/admin-cmmnty-route';
import AdminCmmntyReportRoute from './routes/admin_admin-cmmnty-report';
import AdminCmmntyAnswerReportRoute from './routes/admin_admin-cmmnty-answer-report';  
import AdminCmmntyAnswerQuesRoute from './routes/admin-cmmnty-answer-ques-route';  
import AdminQnaRoute from './routes/admin-qna-route';
import AdminDataBoardRoute from './routes/admin-data-board-route';
import AdminStopwordsRoute from './routes/admin-stopwords-route';


import TroblGoodsCnrsRoute from './routes/trobl-goods-cnrs-route';
import DbUrRoute from './routes/db-ur-route';
import DbWasteRoute from './routes/db-waste-route';
import DbCoronaRoute from './routes/db-corona-route';
import SurveyGroupListRoute from './routes/survey-group-list-route';
import DataCatalogRoute from './routes/data-catalog-route';
import DataCatalogDetailRoute from './routes/data-catalog-detail-route';
import CmmntyListRoute from './routes/cmmnty-list-route';
import CmmntyDetailRoute from './routes/cmmnty-detail-route';
import CmmntyFormRoute from './routes/cmmnty-form-route';
import CmmntyDashboardRoute from './routes/cmmnty-dashboard-route';
import CmmntyStatisticsRoute from './routes/cmmnty-statistics-route';
import CmmntyStatisticsEachRoute from './routes/cmmnty-statistics-each-route';
import MyCmmntyFormRoute from './routes/mycmmnty-form-route';
import NoticeDetailRoute from './routes/notice-detail-route';
import NoticeListRoute from './routes/notice-list-route';
import FaqDetailRoute from './routes/faq-detail-route';
import FaqListRoute from './routes/faq-list-route';
import DataListRoute from './routes/data-list-route';
import DataFormRoute from './routes/data-form-route';
import DataDetailRoute from './routes/data-detail-route';

import QnaListRoute from './routes/Qna-list-route';
import QnaFormRoute from './routes/Qna-form-route';
import QnaDetailRoute from './routes/Qna-detail-route';

// Default Ajax Options
$.ajaxSetup({
	type: 'POST',
	dataType: 'json',
	cache: false,
	error: e => {
		if(e.responseJSON && e.responseJSON.error) {
			alert(e.responseJSON.error);
		} else {
			alert('처리 중 오류가 발생하였습니다.\n관리자에게 문의바랍니다.');
		}
	}
});
	
// Register Proj4 to Openlayers
ol.proj.proj4.register(proj4);

// Initialize
$(document).ready(() => {
	// Route Map
	const routeMap = {
		// Common
		'*': CommonRoute
		, 'main': MainRoute
		, 'login': LoginRoute
		, 'register': RegisterRoute
		, 'mypage': MypageRoute
		, 'admin_admin-notice': AdminNoticeRoute 
		, 'admin_admin-code': AdminCodeRoute
		, 'admin_admin-faq': AdminFaqRoute
		, 'admin_admin-anal-mngr': AdminAnalMngrRoute
		, 'admin_admin-anal-model': AdminAnalModelRoute
		, 'admin_admin-anal-data': AdminAnalDataRoute
		, 'admin_admin-anal-result': AdminAnalResultRoute
		, 'admin_admin-meta-mngr': AdminMetaMngrRoute
		, 'admin_admin-meta-load': AdminMetaLoadRoute 
		, 'admin_admin-usr': AdminusrRoute
		, 'admin_admin-cmmnty' : AdminCmmntyRoute
		, 'admin_admin-cmmnty-report' : AdminCmmntyReportRoute
		, 'admin_admin-cmmnty-answer-report' : AdminCmmntyAnswerReportRoute
		, 'admin_admin-cmmnty-answer-ques' : AdminCmmntyAnswerQuesRoute
		
		//AdminCmmntyReportRoute
		, 'admin_admin-qna' : AdminQnaRoute
		, 'admin_admin-data-board': AdminDataBoardRoute
		, 'admin_admin-stopwords': AdminStopwordsRoute
		// ------------------------------관리도구
		
		, 'partcptn_map_trobl-goods-cnrs': TroblGoodsCnrsRoute
		, 'dashboard_db-ur': DbUrRoute
		, 'dashboard_db-waste': DbWasteRoute
		, 'dashboard_db-corona': DbCoronaRoute
		, 'survey_survey-group-list': SurveyGroupListRoute
		, 'data-catalog': DataCatalogRoute
		, 'data_catalog_detail': DataCatalogDetailRoute
		, 'cmmnty_map_cmmnty-list': CmmntyListRoute
		, 'cmmnty_map_cmmnty-detail': CmmntyDetailRoute
		, 'cmmnty_map_cmmnty-form': CmmntyFormRoute
		, 'cmmnty_map_cmmnty-dashboard': CmmntyDashboardRoute
		, 'cmmnty_map_cmmnty-statistics': CmmntyStatisticsRoute
		, 'cmmnty_map_cmmnty-statistics-each': CmmntyStatisticsEachRoute
		, 'mycmmnty_map_mycmmnty-form': MyCmmntyFormRoute //마이커뮤니티
		
		, 'notice_detail': NoticeDetailRoute
		, 'notice_list': NoticeListRoute
		, 'faq_detail':FaqDetailRoute
		, 'faq_list':FaqListRoute
		, 'data_list':DataListRoute
		, 'data_form': DataFormRoute
		, 'data_detail' : DataDetailRoute
		
		, 'qna_list': QnaListRoute
		, 'qna_form': QnaFormRoute
		, 'qna_detail' : QnaDetailRoute

	};

	// Remove no-js
	document.body.classList.remove("no-js");
	
	// Start Routing
	let pageId = document.body.id;
	
	let routeDissolve = Object.keys(routeMap).filter(v => {		
		return new RegExp("^" + v.split("*").join(".*") + "$").test(pageId);
	});
	
	for(let i in routeDissolve) {
		routeMap[routeDissolve[i]]();
	}
	
	//반응형 header 메뉴명 변경
	if($(".title_menu").text() == "") {
		$(".mobTitle").text($("h2").eq(0).text());
	}else {
		$(".mobTitle").text($(".title_menu").text());
	}
});