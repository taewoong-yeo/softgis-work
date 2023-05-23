class FormSelectionDialog {
	constructor(opts = {}) {
		this.columnMapping = opts.columnMapping;

		this.url = opts.url;
		this.type = 'POST';
		
		this.kendoDialogOption = $.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, opts.kendoDialogOption);
		this.kendoGridOption = $.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, { dataSource: { pageSize: 5, transport: { read: { url: this.url, type: this.type } } } }, opts.kendoGridOption);

		this.initDialog();
		this.initGrid();

		this.$dialog.append(this.$grid);
	}

	initDialog() {
		this.kendoDialogOption.actions[1].action = _ => this.onSelect();

		const $dialog = $('<div/>');
		$dialog.appendTo($('body'));
		$dialog.addClass('form-selection-dialog');
		$dialog.kendoDialog(this.kendoDialogOption);

		this.$dialog = $dialog;
	}

	initGrid() {
		const $grid = $('<div />');
		$grid.kendoGrid(this.kendoGridOption);

		this.$grid = $grid;
	}

	get dialog() {
		return this.$dialog.data('kendoDialog');
	}

	get grid() {
		return this.$grid.data('kendoGrid');
	}

	onSelect() {
		if(this.grid.select().length < 1)
			return;

		const result = this.grid.dataItem(this.grid.select()).toJSON();
		
		for(let i in this.columnMapping) {
			this.columnMapping[i].val(result[i]);
		}
	}

	open() {
		this.dialog.open();
	}
}

export default FormSelectionDialog;