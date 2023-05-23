import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import AdminAnalCatalogManager from '../shared/admin-anal-catalog-manager';
import FileReaderAsync from '../shared/file-reader-async';

const HTML = {
	FILE_BUTTON: (href, file_org_nm, file_size) => `
		<a href='${href}'>
			<i class='bx bx-file'></i>${file_org_nm}  [${file_size}]
		</a>
	`
};

function AdminAnalModelRoute() {

	const $attFile = $('.sub-file');
	const $fileDownload = $('.sub-file-download');
	const $attFileBtn = $('.sub-file-btn');
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getModelList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertModel.do',
			update: Constant.CONTEXT_PATH + '/admin/updateModel.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteModel.do'
		},
		validator: new Validator({
			anal_id: { required: true },
			model_nm: { required: true, maxLength: 100 },
			model_desc: { maxLength: 255 },
		}),
		overrideSubmitEvent: false
	});
	
	const catalogManager = new AdminAnalCatalogManager({
		manager: manager,
		$element: $('.admin-anal-catalog-manager'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getAnalMetadatas.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertAnalMetadata.do',
			update: Constant.CONTEXT_PATH + '/admin/updateAnalMetadata.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteAnalMetadata.do',
			catalog: Constant.CONTEXT_PATH + '/admin/getAnalAvailableMetadatas.do'
		}
	});
	
	manager.grid.bind('change', onAdminDataManagerGridChange);
	
	$attFileBtn.on('click', onAttFileBtnEvt);
	
	function onAdminDataManagerGridChange(e) {
		const currentRowData = manager.currentRowData;
		
		if(currentRowData) {
			if(currentRowData.file_id) {
				let href = Constant.CONTEXT_PATH + '/fileGet.do?fileId=' + currentRowData.file_id;
				$fileDownload.html(HTML.FILE_BUTTON(href, currentRowData.file_org_nm, currentRowData.file_size));
				$fileDownload.show();
				$attFile.hide();
				$attFileBtn.show();
			} else {
				$attFile.show();
				$fileDownload.hide();
				$attFileBtn.hide();
			}
		} else {
			$attFile.show()
			$fileDownload.hide();
			$attFileBtn.hide();
		}
	}
	
	function onAttFileBtnEvt (e) {
		e.preventDefault();
		
		if ($fileDownload.is(':visible')) {
			$attFile.show();
			$fileDownload.hide();
		} else {
			$attFile.hide();
			$fileDownload.show();
		}
	}

}

export default AdminAnalModelRoute;