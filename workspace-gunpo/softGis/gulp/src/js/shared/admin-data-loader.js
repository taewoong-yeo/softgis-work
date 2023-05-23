import { Validator, VALIDATOR_DATE_REGEX_RULE } from '../shared/validator';
import { DBFParser } from '../shared/shp-parser';
import AdminDataColumnManager from '../shared/admin-data-column-manager';
import FileReaderAsync from '../shared/file-reader-async';
import FormAjax from '../shared/form-ajax';
import Loading from '../modules/loading';

const HTML = {
	ADD_BUTTON: `
		<a role="button" class="admin-loader-add">데이터 업로드</a>
		<a role="button" class="admin-loader-edit">컬럼명 한글화</a>
	`,
	DELETE_BUTTON: `
		<a role="button" class="admin-loader-delete">삭제</a>
	`,
	USE_STAT_SWITCH: (v) => `
		<label class="admin-loader-use-stat switch">
			<input type="checkbox" ${v.use_stat === 'Y' ? 'checked' : ''}>
			<span></span>
		</label>
	`,
	GRID: `
		<table class="admin-loader-grid">
			<thead>
				<tr>
					<th data-field="data_tbl">테이블명</th>
					<th data-field="base_date">기준일자</th>
					<th data-field="use_stat" data-fit>사용여부</th>
					<th></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	`,
	DIALOG: (typeName) => `
		<form class="form" action="/insertData.do">
			<div class="row row-hspace-1">
				<div class="form-field col-6">
					<label for="base_date" class="form-required">기준일자</label>
					<input type="date" name="base_date" id="base_date" placeholder="기준일자">
				</div>
				<div class="form-field col-6">
					<label for="data_file" class="form-required">파일 (${typeName})</label>
					<input type="file" name="data_file" id="data_file" placeholder="파일" accept="${typeName}">
					${typeName == '.zip' ? '<div class="u-text-primary u-margin-top-1">※ 스타일(.sld)을 같이 압축하여 업로드 해 주십시오.</div>' : ''}
				</div>
			</div>
			<div class="form-field form-field-inline">
				<label for="use_stat">사용여부</label>
				<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
			</div>
		</form>
	`,
	DIALOG_API: `
		<form class="form">
			<div class="row row-hspace-1">
				<div class="form-field col-4">
					<label for="base_date" class="form-required">기준일자</label>
					<input type="date" name="base_date" id="base_date" placeholder="기준일자">
				</div>
				<div class="form-field col-4">
					<label for="api_key" class="form-required">API Key</label>
					<input type="text" name="api_key" id="api_key" placeholder="API Key" readonly="">
				</div>
				<div class="form-field col-4">
					<label for="req_type" class="form-required">요청파일타입</label>
					<select name="req_type" id="req_type">
						<option value="xml">xml</option>
						<option value="json">json</option>
					</select>
				</div>
			</div>
			<div class="row row-hspace-1">
				<div class="form-field col-6">
					<label for="api_url" class="form-required">API URL</label>
					<input type="text" name="api_url" id="api_url" placeholder="API URL">
				</div>
				<div class="form-field col-6">
					<label for="api_param" class="form-required">요청인자</label>
					<input type="text" name="api_param" id="api_param" placeholder="요청인자">
				</div>
			</div>
			<div class="row row-hspace-1">
				<div class="form-field col-6">
					<label for="api_total_ele" class="form-required">총건수 항목</label>
					<input type="text" name="api_total_ele" id="api_total_ele" placeholder="총건수 항목">
				</div>
				<div class="form-field col-6">
					<label for="api_data_ele" class="form-required">데이터 항목</label>
					<input type="text" name="api_data_ele" id="api_data_ele" placeholder="데이터 항목">
				</div>
			</div>
			<div class="row row-hspace-1">
				<div class="form-field col-10">
					<label for="api_test_url">API TEST URL</label>
					<input type="text" name="api_test_url" id="api_test_url" placeholder="API TEST URL">
					※ 연결 테스트 진행시 요청항목을 최소로 설정해주세요.
				</div>
				<div class="form-field col-1">
					<label for="">&nbsp;</label>
					<button class="k-button k-primary admin-loader-apitest">테스트</button><br>
				</div>
			</div>
			<div class="form-field">
				<label for="">테스트 결과</label>
				<textarea name="api_result" id="api_result" placeholder="테스트 결과" rows="5"></textarea>
			</div>
			<div class="form-field form-field-inline">
				<label for="use_stat">사용여부</label>
				<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
			</div>
		</form>
	`
};

class AdminDataLoader {
	constructor(opts = {}) {
		if(opts.manager === undefined)
			throw new ReferenceError('Invaild admin data manager object');

		if(opts.$element === undefined)
			throw new ReferenceError('Invaild target element');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.insert === undefined
			|| opts.urls.update === undefined
			|| opts.urls.delete === undefined
			|| opts.urls.save_api === undefined
			|| opts.urls.exe_api === undefined)
			throw new ReferenceError('Invaild URLs');

		if(opts.type === undefined
			|| (opts.type !== 'zip'
			&&  opts.type !== 'csv'
			&&  opts.type !== 'xlsx'))
			throw new ReferenceError('Invaild data type');

		this.manager = opts.manager;

		this.urls = opts.urls;
		this.type = opts.type;

		this.validator = opts.validator || new Validator({});

		this.$element = $(opts.$element);
		this.$grid = undefined;
		this.$dialog = undefined;
		this.$dialogForm = undefined;

		this.formAjax = undefined;

		this.formAjaxOption = opts.formAjaxOption;
		this.kendoGridOption = opts.kendoGridOption;
		this.kendoDialogOption = opts.kendoDialogOption;
		this.kendoDialogOptionNo = opts.kendoDialogOptionNo;

		this.init();
	}

	get grid() {
		return this.$grid.data('kendoGrid');
	}

	get dialog() {
		return this.$dialog.data('kendoDialog');
	}

	init() {
		this.initGrid();
		this.initDialog();
		this.initDialogForm();

		this.$element.on('click', '.admin-loader-add', onAddButtonClick.bind(this));
		this.$element.on('click', '.admin-loader-delete', onDeleteButtonClick.bind(this));
		this.$element.on('click', '.admin-loader-use-stat', onUseStatSwitchClick.bind(this));
		
		this.manager.grid.bind('change', onManagerGridChange.bind(this));

		function onAddButtonClick(e) {
			e.preventDefault();
			const $this = $(e.currentTarget);
			
			if($this.hasClass('active')) {
				this.$dialogForm.reset();
				
				$('#api_key').val(this.manager.currentRowData.mta_apikey);
				
				if (this.type == 'api') {
					$('.admin-loader-apitest').on('click', async function(e) {
						e.preventDefault();
						
						if ($('#api_test_url').val() == '') return;
						Loading.showGlobal();
						
						await $.ajax({
							type: 'GET',
							dataType: $('#api_req_type').val(),
							url: $('#api_test_url').val(),
							success: function(data){
								switch($('#api_req_type').val()) {
									case 'json': $('#api_result').text(JSON.stringify(data)); break;
									case 'xml': $('#api_result').text(new XMLSerializer().serializeToString(data.documentElement)); break;
									case 'geojson': typeName = '.zip'; break;
								}
								
							}, error : function(error){
								$('#api_result').text('요청이 실패하였습니다.');
								Loading.hide();
							}
						});
						
						Loading.hide();
					});
				}
				this.dialog.open();
			}
		}
		
		async function onDeleteButtonClick(e) {
			e.preventDefault();

			if(!confirm('정말 삭제하시겠습니까?'))
				return;

			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');

			const rowData = this.grid.dataItem($row).toJSON();
			const mergedData = $.extend({}, this.manager.currentRowData, rowData);

			Loading.showGlobal();

			try {
				await $.post(this.urls.delete, mergedData);

				alert('삭제가 완료되었습니다.');

				this.grid.dataSource.read();
			} finally {
				Loading.hide();
			}
		}

		async function onUseStatSwitchClick(e) {
			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');
			const $input = $this.find('input');

			const rowData = this.grid.dataItem($row);

			const useStat = $input.prop('checked') ? 'Y' : 'N';

			rowData.use_stat = useStat;

			Loading.show();

			try {
				await $.post(this.urls.update, rowData.toJSON());
			} finally {
				Loading.hide();
			}
		}
		
		function onManagerGridChange(e) {
			const getGridAddButton = () => this.$element.find('.admin-loader-add');
			const getGridEditButton = () => this.$element.find('.admin-loader-edit');

			this.grid.dataSource.page(1);

			if(this.manager.currentRowData) {
				this.grid.setOptions({
					dataSource: {
						transport: {
							read: {
								data: this.manager.currentRowData
							}
						}
					}
				});

				getGridAddButton().addClass('active');
				getGridEditButton().addClass('active');
			} else {
				this.grid.dataSource.online(false);
				this.grid.dataSource.data([]);

				getGridAddButton().removeClass('active');
				getGridEditButton().removeClass('active');
			}
		}
	}

	initGrid() {
		this.$element.html(HTML.GRID);

		const kendoGridOption = {
			selectable: false,
			pageable: {
				refresh: false,
				pageSizes: false,
				buttonCount: 5
			},
			toolbar: [
				{ template: HTML.ADD_BUTTON }
			],
			columns: [
				{ field: 'data_tbl', title: '테이블명' },
				{ field: 'base_date', title: '기준일자' },
				{ field: 'use_stat', title: '사용여부', template: HTML.USE_STAT_SWITCH },
				{ template: HTML.DELETE_BUTTON, width: 30 }
			],
			dataSource: {
				pageSize: 10,
				transport: {
					read: {
						url: this.urls.get
					}
				}
			}
		};

		const $grid = this.$element.find('.admin-loader-grid');

		this.$grid = $grid;
		this.$grid.kendoGrid($.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, kendoGridOption, this.kendoGridOption));

		this.grid.dataSource.data([]);
	}

	initDialog() {
		let typeName = '';

		switch(this.type) {
			case 'csv': typeName = '.csv'; break;
			case 'xlsx': typeName = '.xlsx'; break;
			case 'zip': typeName = '.zip'; break;
			case 'api': typeName = 'api'; break;
		}

		const kendoDialogOption = {
			title: '데이터 업로드',
			actions: [
				{ text: '취소' },
				{ text: '저장', primary: true, action: e => { this.submitSave(); return false; }},
				{ text: '업로드', primary: true, action: e => { this.submit(); return false; }}
			]
		};
		
		const kendoDialogOptionNo = {
				title: '데이터 업로드',
				actions: [
					{ text: '취소' },
					{ text: '업로드', primary: true, action: e => { this.submit(); return false; }}
				]
			};

		const $dialog = $('<div class="admin-loader-dialog"/>');
		$dialog.appendTo($('body'));
		
		if (typeName == 'api') {
			$dialog.html(HTML.DIALOG_API); 
			$dialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoDialogOption, this.kendoDialogOption));
		}else {
			$dialog.html(HTML.DIALOG(typeName));
			$dialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoDialogOptionNo, this.kendoDialogOptionNo));
		}
		this.$dialog = $dialog;
	}

	initDialogForm() {
		const $form = this.$dialog.find('form');

		const formAjaxOption = {
			url: this.urls.insert,
			validator: this.validator,
			method: 'POST',
			overrideSubmitEvent: false,
			fieldNames: {
				base_date: '기준일자',
				base_file: '파일',
				/*api_req_type: '요청파일타입',
				api_url: '연결 URL'*/
			}
		};

		const formAjax = new FormAjax($form, $.extend(true, {}, formAjaxOption, this.formAjaxOption));

		$form.find('input[type="date"]').kendoDatePicker(Constant.KENDO_DEFAULT_DATEPICKER_OPTION);

		this.$dialogForm = $form;

		this.formAjax = formAjax;
	}
	
	async submitSave() {
		let rowObj, formObj = this.$dialogForm.serializeFlat();
		rowObj = this.formAjax.getMappingFormData(this.manager.currentRowData);
		formObj = this.formAjax.getMappingFormData(formObj);

		this.formAjax.validator.fieldNames = this.formAjax.fieldNames;
		this.formAjax.validator.rules = $.extend(true, {
			base_date: { required: true, regex: VALIDATOR_DATE_REGEX_RULE },
			req_type: { required: true, maxLength: 10 },
			api_url: { required: true, maxLength: 255 },
			api_param: { required: true, maxLength: 255 },
			api_total_ele: { required: true, maxLength: 50 },
			api_data_ele: { required: true, maxLength: 50 }
		}, this.formAjax.validator.rules);

		if(!await this.formAjax.validator.validateAllAsync(formObj)) return;
		
		

		Loading.showGlobal();

		try {
			const formData = new FormData();
			
			for(const key in rowObj) {
				formData.set(key, rowObj[key]);
			}
				
			formData.set('req_type', formObj.req_type);
			formData.set('api_url', formObj.api_url);
			formData.set('api_key', formObj.api_key);
			formData.set('api_param', formObj.api_param);
			formData.set('api_total_ele', formObj.api_total_ele);
			formData.set('api_data_ele', formObj.api_data_ele);
			formData.set('use_stat', formObj.use_stat);
			
			this.formAjax.url = this.urls.save_api;
			this.formAjax.ajaxOption = {
				contentType: false,
				processData: false,
				data: formData
			};
			
			await this.formAjax.submit();

			alert('저장 되었습니다.');

			//this.grid.dataSource.read();

			this.dialog.close();
		} finally {
			Loading.hide();
		}
	}

	async submit() {
		if (this.type == 'api') {
			let rowObj, formObj = this.$dialogForm.serializeFlat();
	
			rowObj = this.formAjax.getMappingFormData(this.manager.currentRowData);
			formObj = this.formAjax.getMappingFormData(formObj);
	
			this.formAjax.validator.fieldNames = this.formAjax.fieldNames;
			this.formAjax.validator.rules = $.extend(true, {
				base_date: { required: true, regex: VALIDATOR_DATE_REGEX_RULE },
				api_req_type: { required: true },
				api_url: { required: true }
			}, this.formAjax.validator.rules);
	
			if(!await this.formAjax.validator.validateAllAsync(formObj)) return;
			
			if(!confirm('데이터 업로드는 시간이 오래 걸리는 작업입니다.\n업로드 중에는 창을 닫거나 이동할 수 없습니다.\n진행하시겠습니까?')) return;
			
			const formData = new FormData();
	
			Loading.showGlobal();
	
			try {
				for(const key in rowObj) {
					formData.set(key, rowObj[key]);
				}
	
				formData.set('base_date', formObj.base_date);
				formData.set('api_req_type', formObj.api_req_type);
				formData.set('api_url', formObj.api_url);
				formData.set('use_stat', formObj.use_stat);
				
				this.formAjax.url = this.urls.exe_api;
				
				await this.formAjax.submit();
	
				alert('업로드가 완료되었습니다.');
	
				this.grid.dataSource.read();
	
				this.dialog.close();
			} finally {
				Loading.hide();
			}
		} else {
			const $file = this.$dialogForm.find('input[type="file"]');

			let rowObj, formObj = this.$dialogForm.serializeFlat();

			rowObj = this.formAjax.getMappingFormData(this.manager.currentRowData);
			formObj = this.formAjax.getMappingFormData(formObj);

			this.formAjax.validator.fieldNames = this.formAjax.fieldNames;
			this.formAjax.validator.rules = $.extend(true, {
				base_date: { required: true, regex: VALIDATOR_DATE_REGEX_RULE },
				data_file: { required: true }
			}, this.formAjax.validator.rules);

			if(!await this.formAjax.validator.validateAllAsync(formObj))
				return;

			if(!confirm('데이터 업로드는 시간이 오래 걸리는 작업입니다.\n업로드 중에는 창을 닫거나 이동할 수 없습니다.\n진행하시겠습니까?'))
				return;

			const formData = new FormData();
			const reader = new FileReaderAsync();

			Loading.showGlobal();

			try {
				const file = $file.get(0).files[0];

				for(const i in rowObj) {
					formData.append(i, rowObj[i]);
				}

				formData.set('data_file', file);
				formData.set('base_date', formObj.base_date);
				formData.set('use_stat', formObj.use_stat);

				try {
					switch(this.type) {
						case 'zip':
							const fileBinary = await reader.readAsArrayBuffer(file);

							const zip = await JSZip.loadAsync(fileBinary);

							try {
								const dbf = zip.file(/.dbf$/i)[0];
								const dbfBinary = await dbf.async('arraybuffer');
								const dbfResult = new DBFParser().parse(dbfBinary, dbf.name);
								const dbfCharFields = dbfResult.fields.filter(f => f.type === 'C').map(f => f.name);

								formData.set('data_dbf', JSON.stringify(dbfCharFields));
							} catch(e) {
								alert('ZIP 파일 안에 DBF 파일이 손상되었거나 존재하지 않습니다.');
								return;
							}

							try {
								const sld = zip.file(/.sld$/i)[0];
								const sldString = await sld.async('string');

								formData.set('data_sld', sldString);
							} catch(e) {
								alert('ZIP 파일 안에 SLD 파일이 손상되었거나 존재하지 않습니다.');
								return;
							}
							break;

						case 'csv':
							const fileText = await reader.readAsText(file);
							const fileArray = fileText.split('\n').map(v => v.split(','));
							const fileIntegrity = fileArray.map(v => v.length).filter((v, i, a) => a.indexOf(v) === i);

							//if(fileIntegrity.length !== 1) throw new RangeError;
							break;
						
						case 'xlsx':
							break;
					}
				} catch(e) {
					alert('파일을 읽는 중에 오류가 발생하였습니다.\n확인 후 다시 시도해주세요.');
					return;
				}

				this.formAjax.ajaxOption = {
					contentType: false,
					processData: false,
					data: formData
				};

				await this.formAjax.submit();

				alert('업로드가 완료되었습니다.');

				this.grid.dataSource.read();

				this.dialog.close();
			} finally {
				Loading.hide();
			}
		}
	}
}

export default AdminDataLoader;