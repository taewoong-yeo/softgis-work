import Loading from '../modules/loading';
import FormAjax from '../shared/form-ajax';

const HTML = {
	UPDATE_BUTTON: `
		<a role="button" class="admin-column-update">수정</a>
	`,
	COLUMN_ITEM: (column) => `
		<strong>${column.col_axis}:</strong> ${column.col_nm_alias}</span>
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
			<input type="hidden" name="sel_mta_tbl" id="sel_mta_tbl" value="">
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

class AdminDataColumnManager {
	constructor(opts = {}) {
		if(opts.manager === undefined)
			throw new ReferenceError('Invaild admin data manager object');

		if(opts.$element === undefined)
			throw new ReferenceError('Invaild target element');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.update === undefined
			|| opts.urls.delete === undefined)
			throw new ReferenceError('Invaild URLs');

		this.manager = opts.manager;

		this.urls = opts.urls;

		this.$element = $(opts.$element);
		this.$columnList = undefined;
		this.$listDialog = undefined;
		this.$listGrid = undefined;
		this.$updateDialog = undefined;
		this.$updateForm = undefined;

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

		this.$element.on('click', onActionButtonClick.bind(this));
		this.$listGrid.on('click', '.admin-column-update', onUpdateButtonClick.bind(this));
		this.$updateForm.on('submit', onUpdateStart.bind(this));
		this.$updateForm.on('submitAjax', onUpdateComplete.bind(this));
		this.manager.grid.bind('change', onManagerGridChange.bind(this));

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

			for(const i in rowData) {
				const $input = this.$updateDialog.find('input[name="' + i + '"]');
				const $select = this.$updateDialog.find('select[name="' + i + '"]');

				$input.val(rowData[i]);
				$select.find('option').prop('selected', false);
				$select.find('option[value="' + rowData[i] + '"]').prop('selected', true);
			}

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

		function onUpdateComplete(e, d) {
			alert('컬럼 수정이 완료되었습니다.');

			this.updateDialog.close();

			this.loadColumns();
		}

		async function onManagerGridChange() {
			const currentRowData = this.manager.currentRowData;
			this.$element[currentRowData ? 'addClass' : 'removeClass']('active');
			if (currentRowData) {
				this.loadColumns();
				this.formAjax.prependData = currentRowData;
			} else {
				this.clearColumns();
			}
		}
	}

	initElement() {
		
	}

	initListDialog() {
		const kendoListDialogOption = {
			title: '컬럼 정의',
			actions: [
				{ text: '초기화', primary: false, action: (e) => {
					if(confirm('정말 초기화 하시겠습니까?'))
						this.resetColumns();

					return false;
				} },
				{ text: '닫기', primary: false }
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
					let sel_mta_table = $("#mta_tables option:selected").val();
					$("#sel_mta_tbl").val(sel_mta_table);
					this.$updateForm.submit(); 
					$("#sel_mta_tbl").val('');
					return false;
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

	async loadColumns(sel_mta_table) {
		this.clearColumns();
		Loading.show();
		try {
			const result = await $.post(this.urls.get, this.manager.currentRowData);
			this.currentColumnData = result.result;
			this.currentAvailableColumnData = result.result.filter(v => v.col_axis !== '' && v.col_axis !== '없음');
			this.listGrid.dataSource.data(this.currentColumnData);

			for(const i in this.currentAvailableColumnData) {
				const column = this.currentAvailableColumnData[i];
				const $column = $(HTML.COLUMN_ITEM(column));

				$column.appendTo(this.$columnList);
			}
		} catch(e) {
			this.manager.setFormMode('insert');

			throw e;
		} finally {
			Loading.hide();
		}
	}

	async resetColumns() {
		Loading.showGlobal();

		try {
			await $.post(this.urls.delete, this.manager.currentRowData);

			alert('컬럼 초기화가 완료되었습니다.');

			await this.loadColumns();
		} finally {
			Loading.hide();
		}
	}

	clearColumns() {
		this.listGrid.dataSource.data([]);
		this.currentColumnData = undefined;
		this.currentAvailableColumnData = undefined;
	}
}

export default AdminDataColumnManager;