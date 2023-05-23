import { Validator, VALIDATOR_ZIP_FILE_REGEX_RULE, VALIDATOR_CSV_FILE_REGEX_RULE, VALIDATOR_XLSX_FILE_REGEX_RULE } from '../shared/validator';
import AdminDataManager from '../shared/admin-data-manager';
import AdminDataColumnManager from '../shared/admin-data-column-manager';
import AdminDataLoader from '../shared/admin-data-loader';
import { Loading } from '../modules/loading';

function AdminMetaLoadRoute() {
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.admin-form-el'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getMetadatas.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertMetadata.do',
			update: Constant.CONTEXT_PATH + '/admin/updateMetadata.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteMetadata.do'
		}
	});

	const loaderDateCollisionCheck = async (v) => {
		const result = await $.post(Constant.CONTEXT_PATH + '/admin/checkDataCollision.do', {
			mta_tbl: manager.currentRowData.mta_tbl,
			mta_fcly: manager.currentRowData.mta_fcly,
			base_date: v
		});

		return result.result;
	};

	const loader = new AdminDataLoader({
		$element: $('.admin-loader'),
		type: 'zip',
		manager: manager,
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getDatas.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertData.do',
			update: Constant.CONTEXT_PATH + '/admin/updateData.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteData.do',
			save_api: Constant.CONTEXT_PATH + '/admin/saveApi.do',
			exe_api: Constant.CONTEXT_PATH + '/admin/executeApi.do'
		},
		validator: new Validator({
			base_date: { function: [loaderDateCollisionCheck, '이미 데이터가 입력된 기준일자입니다.'] }
		})
	});
	
	const columnManager = new AdminDataColumnManager({
		manager: manager,
		$element: $('.admin-loader-edit'),
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getDataColumns.do',
			update: Constant.CONTEXT_PATH + '/admin/updateDataColumn.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteDataColumn.do'
		}
	});

	manager.grid.bind('change', (e) => {
		if(manager.currentRowData) {
			let type, regex;

			switch(manager.currentRowData.mta_gther) {
				case 'DG_SHP':
					type = 'zip';
					regex = VALIDATOR_ZIP_FILE_REGEX_RULE;
					break;
				case 'DG_CSV':
					type = 'csv';
					regex = VALIDATOR_CSV_FILE_REGEX_RULE;
					break;
				case 'DG_XLSX':
					type = 'xlsx';
					regex = VALIDATOR_XLSX_FILE_REGEX_RULE;
					break;
				case 'DG_API':
					type = 'api';
					break;
			}

			loader.type = type;
			loader.validator.rules.data_file = { regex };

			loader.$dialog.remove();
			loader.initDialog();
			loader.initDialogForm();
		}
	});
	
	const loading = new Loading();
	
	$('#RELOAD').on('submit', async function(e) {
		e.preventDefault();
		loading.show(true);
		await $.ajax({
			url: Constant.CONTEXT_PATH + '/test/reloadTest.do',
			type: 'POST'
		});
		loading.hide();
		alert('리로드 성공');
	});
}

export default AdminMetaLoadRoute;