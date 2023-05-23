import Loading from '../modules/loading';
import FormAjax from '../shared/form-ajax';

const HTML = {
	UPDATE_BUTTON: `
		<a role="button" class="admin-column-update">수정</a>
	`,
	COLUMN_ITEM: (column) => `
		<span class="admin-column admin-column-${column.col_axis.toLowerCase()}">
		<strong>${column.col_axis}:</strong> ${column.col_nm_alias}</span>
	`,
	COLUMN_OPTION: (column) => `
		<option value="${column.col_nm_org}">${column.col_nm_alias}</option>
	`,
	LIST: `
		<div class="admin-column admin-column-action">시각화 컬럼 정의</div>
		<div class="admin-columns"></div>
	`,
	LIST_DIALOG: `
		<table class="admin-column-grid">
			<thead>
				<tr>
					<th data-field="col_nm_org">컬럼 본명</th>
					<th data-field="col_nm_alias">컬럼 별명</th>
					<th data-field="col_type">컬럼 데이터 타입</th>
					<th data-field="col_axis">컬럼 시각화 축</th>
					<th></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	`,
	UPDATE_DIALOG: `
		<form class="form">
			<div class="form-field">
				<label for="col_nm_org" class="form-required">컬럼 본명</label>
				<input type="text" id="col_nm_org" name="col_nm_org" placeholder="컬럼 본명" readonly>
			</div>
			<div class="form-field">
				<label for="col_nm_alias">컬럼 별명</label>
				<input type="text" id="col_nm_alias" name="col_nm_alias" placeholder="컬럼 별명">
			</div>
			<div class="form-field">
				<label for="col_axis">컬럼 시각화 축</label>
				<select id="col_axis" name="col_axis">
					<option value="" selected>없음</option>
					<option value="X">X</option>
					<option value="Y">Y</option>
				</select>
			</div>
		</form>
	`
};

class AdminDashboardColumnManager {
	constructor(opts = {}) {
		if(opts.visualizeManager === undefined)
			throw new ReferenceError('Invaild admin data manager object');

		if(opts.$element === undefined)
			throw new ReferenceError('Invaild target element');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.update === undefined)
			throw new ReferenceError('Invaild URLs');

		this.manager = opts.manager;
		this.visualizeManager = opts.visualizeManager;

		this.urls = opts.urls;

		this.$element = $(opts.$element);
		this.$columnList = undefined;
		this.$columnListAction = undefined;
		this.$listDialog = undefined;
		this.$listGrid = undefined;
		this.$updateDialog = undefined;
		this.$updateForm = undefined;
		this.$setData = undefined;
		this.$updateData = undefined;
		this.visualizeData = undefined;

		this.$form = $(".admin-form-el");
		this.$visY = this.$form.find('select[name="vis_y"]');
		this.$visO = this.$form.find('select[name="vis_o"]');
        this.$visX = this.$form.find('select[name="vis_x"]');
		this.$visCol = this.$form.find('select[name="vis_col"]');

		this.kendoListDialogOption = opts.kendoListDialogOption;
		this.kendoListGridOption = opts.kendoListGridOption;
		this.kendoUpdateDialogOption = opts.kendoUpdateDialogOption;
		this.formAjaxOption = opts.formAjaxOption;

		this.init();
	}

	get listDialog() {
		return this.$listDialog.data('kendoDialog');
	}

	get listGrid() {
		return this.$listGrid.data('kendoGrid');
	}

	get updateDialog() {
		return this.$updateDialog.data('kendoDialog');
	}

	init() {
		this.initElement();
		this.initListDialog();
		this.initListGrid();
		this.initUpdateDialog();
		this.initUpdateForm();

		this.$columnListAction.on('click', onActionButtonClick.bind(this));
		this.$listGrid.on('click', '.admin-column-update', onUpdateButtonClick.bind(this));
		this.$updateForm.on('submit', onUpdateStart.bind(this));
		this.$updateForm.on('submitAjax', onUpdateComplete.bind(this));
		this.visualizeManager.$element.on('click', '.admin-visualize-add', onManagerGridChange.bind(this));
		this.visualizeManager.$element.on('click', '.admin-visualize-update', onManagerGridChange.bind(this));
		this.visualizeManager.$dialog.on('change', '#data_tbl', onDialogSelChange.bind(this));


		function onActionButtonClick(e) {
			e.preventDefault();

			const $this = $(e.currentTarget);

			if($this.hasClass('active')) {
				if(this.currentColumnData === undefined || this.currentColumnData.length < 1) {
					alert('컬럼 정보가 존재하지 않는 데이터입니다.\n데이터를 먼저 업로드해 주십시오.');
					return;
				}

				this.listDialog.open();
			}
		}

		function onUpdateButtonClick(e) {
			e.preventDefault();

			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');

			const rowData = this.listGrid.dataItem($row);
			const rowData2 = $.extend(true, {data_tbl : $("select[name='data_tbl']").val()}, rowData);

			for(const i in rowData2) {
				const $input = this.$updateDialog.find('input[name="' + i + '"]');
				const $select = this.$updateDialog.find('select[name="' + i + '"]');

				$input.val(rowData2[i]);
				$select.find('option').prop('selected', false);
				$select.find('option[value="' + rowData2[i] + '"]').prop('selected', true);
			}
			this.formAjax.prependData = {data_tbl : $("select[name='data_tbl'] option:selected").val()}

			this.updateDialog.open();
		}

		async function onUpdateStart(e) {
			e.preventDefault();

			Loading.showGlobal();
			try {
				const result = await this.formAjax.submit();

				if(result !== false)
					this.$updateForm.trigger('submitAjax', [result]);
			} finally {
				Loading.hide();
			}
		}

		async function onUpdateComplete(e, d) {
			//alert('컬럼 수정이 완료되었습니다.');
			this.updateDialog.close();
			await this.removeSelect();
			await this.Columns(this.$setData);
			await this.getColumnData({data_tbl:this.$setData});
			console.log("await");
			await this.addSetting(this.visualizeData);
			this.visualizeManager.$form.trigger('input', [true]);
		}

		function onDialogSelChange(){
			const selectData = $("select[name='data_tbl']").val();
			this.visualizeManager.visY.dataSource.data([]);
			this.visualizeManager.$visX.find('option:not([disabled])').remove();
			this.visualizeManager.$visO.find('option:not([disabled])').remove();
			this.Columns(selectData);
			this.getColumnData({data_tbl : selectData});
		}

		function onManagerGridChange(e) {
			this.clearColumns();
			const $this = $(e.currentTarget);
			if($this.attr("class") == 'admin-visualize-update' ){
				// onInputTimeout();
				const $row = $this.closest('tr');
				let rowData = this.visualizeManager.grid.dataItem($row);
				rowData = this.visualizeManager.parseRowData(rowData);
				rowData = this.formAjax.getReverseMappingFormData(rowData);
				if(rowData) {
					//==
					this.getColumnData(rowData);

					this.$columnListAction[rowData ? 'addClass' : 'removeClass']('active');
					this.formAjax.prependData = rowData;
					this.loadColumns(rowData.data_tbl);

				} else {
					this.clearColumns();
				}
			} else {


				// const tbl = $("select[name='data_tbl'] option:selected").val();

				if(this.visualizeManager.manager.currentRowData) {
					// this.getColumnData(tbl);

					this.$columnListAction[this.visualizeManager.manager.currentRowData ? 'addClass' : 'removeClass']('active');
					this.formAjax.prependData = this.visualizeManager.manager.currentRowData;
					this.getColumnData(this.visualizeManager.manager.currentRowData);
					this.loadColumns(this.visualizeManager.manager.currentRowData.data_tbl);

				} else {
					this.clearColumns();
				}
			}


		}


	}

	initElement() {
		this.$element.html(HTML.LIST);
		this.$columnList = this.$element.find('.admin-columns');
		this.$columnListAction = this.$element.find('.admin-column-action');
	}

	initListDialog() {
		const kendoListDialogOption = {
			title: '컬럼 정의',
			actions: [
				{ text: '닫기' }
			]
		};

		const $listDialog = $('<div class="admin-column-list-dialog"/>');
		$listDialog.appendTo($('body'));
		$listDialog.html(HTML.LIST_DIALOG);
		$listDialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoListDialogOption, this.kendoListDialogOption));
		$listDialog.next('.k-dialog-buttongroup').find('.k-primary').remove();

		this.$listDialog = $listDialog;
	}

	initListGrid() {
		const $listGrid = this.$listDialog.find('.admin-column-grid');

		const kendoListGridOption = {
			selectable: false,
			pageable: {
				refresh: false,
				pageSizes: false,
				buttonCount: 5
			},
			columns: [
				{ field: 'col_nm_org', title: '컬럼 본명' },
				{ field: 'col_nm_alias', title: '컬럼 별명' },
				{ field: 'col_type', title: '컬럼 데이터 타입' },
				{ field: 'col_axis', title: '컬럼 시각화 축' },
				{ template: HTML.UPDATE_BUTTON, width: 80 }
			]
		};

		this.$listGrid = $listGrid;
		this.$listGrid.kendoGrid($.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, kendoListGridOption, this.kendoListGridOption));

		this.listGrid.dataSource.online(false);
		this.listGrid.dataSource.data([]);
	}

	initUpdateDialog() {
		const kendoUpdateDialogOption = {
			title: '컬럼 정보 수정',
			width: 300,
			actions: [
				{ text: '닫기' },
				{ text: '저장', primary: true, action: () => {
					this.$updateForm.submit(); return false;
				} }
			]
		};

		const $updateDialog = $('<div class="admin-column-update-dialog"/>');
		$updateDialog.appendTo($('body'));
		$updateDialog.html(HTML.UPDATE_DIALOG);
		$updateDialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoUpdateDialogOption, this.kendoUpdateDialogOption));

		this.$updateDialog = $updateDialog;
	}

	initUpdateForm() {
		const $updateForm = this.$updateDialog.find('form');

		const formAjaxOption = {
			url: this.urls.update,
			type: 'POST',
			overrideSubmitEvent: false
		};

		const formAjax = new FormAjax($updateForm, $.extend(true, {}, formAjaxOption, this.formAjaxOption));

		this.$updateForm = $updateForm;

		this.formAjax = formAjax;

	}


	async Columns(v) {
		this.clearColumns();

		Loading.show();

		try {
			const result = await $.post(this.urls.get, {data_tbl : v});
			this.$setData = v;
			this.currentColumnData = result.result;
			this.currentAvailableColumnData = result.result.filter(v => v.col_axis !== '' && v.col_axis !== '없음');

			this.listGrid.dataSource.data(this.currentColumnData);

			for(const i in this.currentAvailableColumnData) {
				const column = this.currentAvailableColumnData[i];
				const $column = $(HTML.COLUMN_ITEM(column));

				$column.appendTo(this.$columnList);
			}

		} catch(e) {
			this.visualizeManager.manager.setFormMode('insert');

			throw e;
		} finally {
			Loading.hide();
		}


	}

	async loadColumns(v) {
		// this.clearColumns();

		Loading.show();

		try {
			const result = await $.post(this.urls.get, {data_tbl : v});
			this.$setData = v;
			this.currentColumnData = result.result;
			this.currentAvailableColumnData = result.result.filter(v => v.col_axis !== '' && v.col_axis !== '없음');

			this.listGrid.dataSource.data(this.currentColumnData);

			for(const i in this.currentAvailableColumnData) {
				const column = this.currentAvailableColumnData[i];
				const $column = $(HTML.COLUMN_ITEM(column));

				$column.appendTo(this.$columnList);
			}

		} catch(e) {
			this.visualizeManager.manager.setFormMode('insert');

			throw e;
		} finally {
			Loading.hide();
		}


	}

	removeSelect(){
		this.visualizeManager.visY.dataSource.data([]);
		this.visualizeManager.$visX.find('option:not([disabled])').remove();
		this.visualizeManager.$visO.find('option:not([disabled])').remove();
		this.visualizeManager.$visCol.find('option:not([disabled])').remove();
	}

	async getColumnData(v){
		let vis_y = [];
		const columns = await $.post(Constant.CONTEXT_PATH + '/admin/dashboard/getDashboardColumns.do', v);
		for(const i in columns.result) {
			const column = columns.result[i];

			if(column.col_axis === 'Y'){
				vis_y.push(column.col_nm_org);
				this.visualizeManager.visY.dataSource.add(column);
			} else if(column.col_axis === 'X'){
				this.visualizeManager.$visX.append(HTML.COLUMN_OPTION(column));
				this.visualizeManager.$visCol.append(HTML.COLUMN_OPTION(column));
			}
			this.visualizeManager.$visO.append(HTML.COLUMN_OPTION(column));
		}
		if(Object.keys(v).length > 1){
			this.visualizeData = v;
			this.addSetting(this.visualizeData);
		}
		// console.log(this.visualizeManager.visY);
		this.visualizeManager.$form.trigger('input', [true]);
	}
	async addSetting(v){
		console.log(v);
		// this.visualizeManager.$form.find(`#data_tbl option[value="${v.data_tbl}"]`).prop('selected', true);
		this.visualizeManager.$form.find(`#vis_x option[value="${v.vis_x}"]`).prop('selected', true);
		this.visualizeManager.$form.find(`#vis_o option[value="${v.vis_o}"]`).prop('selected', true);
		this.visualizeManager.$form.find(`#vis_col option[value="${v.vis_col}"]`).prop('selected', true);
		this.visualizeManager.visY.value(v.vis_y);
	}


	clearColumns() {
		this.$columnList.html('');
		this.listGrid.dataSource.data([]);
		this.currentColumnData = undefined;
		this.currentAvailableColumnData = undefined;
	}
}

export default AdminDashboardColumnManager;