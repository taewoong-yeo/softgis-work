import Validator from '../shared/validator';
import FormAjax from '../shared/form-ajax';
import Loading from '../modules/loading';
import Chart from '../modules/chart';

const HTML = {
	ADD_BUTTON: `
		<a role="button" class="admin-visualize-add">시각화 추가</a>
	`,
	UPDATE_BUTTON: `
		<a role="button" class="admin-visualize-update">수정</a>
	`,
	DELETE_BUTTON: `
		<a role="button" class="admin-visualize-delete">삭제</a>
	`,
	COLUMN_OPTION: (column) => `
		<option value="${column.col_nm_org}">${column.col_nm_alias}</option>
	`,
	USE_STAT_SWITCH: (v) => `
		<label class="admin-visualize-use-stat switch">
			<input type="checkbox" ${v.use_stat === 'Y' ? 'checked' : ''}>
			<span></span>
		</label>
	`,
	SEQUENCE_CHANGER: `
		<div class="u-text-align-center">
			<a class="bx bx-chevron-up-circle admin-visualize-up"></a>
			<a class="bx bx-chevron-down-circle admin-visualize-down"></a>
		</div>
	`,
	GRID: `
		<table class="admin-visualize-grid">
			<thead>
				<tr>
					<th data-field="vis_nm">시각화 제목</th>
					<th data-field="vis_idx" data-fit>시각화 순서</th>
					<th data-field="use_stat" data-fit>사용여부</th>
					<th></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	`,
	DIALOG: `
		<div class="row">
			<form class="form col-6">
				<div class="form-field">
					<label for="vis_nm" class="form-required">시각화 제목</label>
					<input type="text" name="vis_nm" id="vis_nm" placeholder="시각화 제목">
				</div>
				<div class="form-field">
					<label for="vis_desc" class="form-required">시각화 설명</label>
					<textarea id="vis_desc" name="vis_desc" placeholder="시각화 설명"></textarea>
				</div>
				<div class="form-field">
					<label for="vis_x" class="form-required">X 축</label>
					<select id="vis_x" name="vis_x">
						<option disabled selected>X 축</option>
					</select>
				</div>
				<div class="form-field">
					<label for="vis_y" class="form-required">Y 축</label>
					<select id="vis_y" name="vis_y" multiple></select>
				</div>
				<div class="row row-hspace-1">
					<div class="form-field col-6">
						<label for="vis_o" class="form-required">정렬 축</label>
						<select id="vis_o" name="vis_o">
							<option disabled selected>정렬 축</option>
						</select>
					</div>
					<div class="form-field col-6">
						<label for="vis_type" class="form-required">시각화 타입</label>
						<select id="vis_type" name="vis_type">
							<option disabled selected>시각화 타입</option>
							<option value="line">라인 차트</option>
							<option value="column">막대 차트</option>
							<option value="bar">수평 막대 차트</option>
							<option value="area">영역 차트</option>
							<option value="pie">파이 차트</option>
						</select>
					</div>
				</div>
				<div class="form-field form-field-inline">
					<label for="use_stat">사용여부</label>
					<label for="use_stat" class="switch"><input type="checkbox" id="use_stat" name="use_stat" checked><span></span></label>
				</div>
			</form>
			<div class="admin-visualize-preview col-6">
				<div class="admin-visualize-chart u-hide"></div>
				<div class="admin-visualize-placeholder">필수 입력 사항을 모두 입력하시면 차트 미리보기가 표시됩니다.</div>
			</div>
		</div>
	`
};

class AdminDataVisualizeManager {
	constructor(opts = {}) {
		if(opts.columnManager === undefined)
			throw new ReferenceError('Invaild admin column manager object');

		if(opts.$element === undefined)
			throw new ReferenceError('Invaild target element');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.insert === undefined
			|| opts.urls.update === undefined
			|| opts.urls.delete === undefined
			|| opts.urls.preview === undefined)
			throw new ReferenceError('Invaild URLs');

		this.columnManager = opts.columnManager;

		this.urls = opts.urls;

		this.$element = $(opts.$element);
		this.$grid = undefined;
		this.$dialog = undefined;
		this.$form = undefined;
		this.$chart = undefined;
		this.$visX = undefined;
		this.$visY = undefined;
		this.$visO = undefined;

		this.validator = opts.validator || new Validator({});

		this.formAjax = undefined;

		this.kendoGridOption = opts.kendoGridOption;
		this.kendoDialogOption = opts.kendoDialogOption;
		this.kendoMultiSelectOption = opts.kendoMultiSelectOption;
		this.formAjaxOption = opts.formAjaxOption;

		this.previewDelay = opts.previewDelay || 200;

		this.init();
	}

	get manager() {
		return this.columnManager.manager;
	}

	get grid() {
		return this.$grid.data('kendoGrid');
	}

	get dialog() {
		return this.$dialog.data('kendoDialog');
	}

	get chart() {
		return this.$chart.data('kendoChart');
	}

	get visY() {
		return this.$visY.data('kendoMultiSelect');
	}

	init() {
		let onInputTimer;

		this.initGrid();
		this.initDialog();
		this.initChart();
		this.initForm();

		this.$form.on('submit', onSaveStart.bind(this));
		this.$form.on('submitAjax', onSaveComplete.bind(this));
		this.$form.on('input', onInput.bind(this));
		this.visY.bind('change', onInput.bind(this));
		this.$element.on('click', '.admin-visualize-add', onAddButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-update', onUpdateButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-delete', onDeleteButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-use-stat', onUseStatSwitchClick.bind(this));
		this.$element.on('click', '.admin-visualize-up, .admin-visualize-down', onSequenceChangerClick.bind(this));
		this.manager.grid.bind('change', onManagerGridChange.bind(this));
		this.columnManager.listGrid.dataSource.bind('change', onColumnManagerDataChange.bind(this));

		async function onSaveStart(e) {
			e.preventDefault();

			Loading.showGlobal();

			try {
				this.overrideValidatorRule();

				const result = await this.formAjax.submit();

				if(result !== false)
					this.$form.trigger('submitAjax', result);
			} finally {
				Loading.hide();
			}
		}

		function onSaveComplete(e) {
			alert('시각화 저장이 완료되었습니다.');

			this.dialog.close();

			this.grid.dataSource.read();
		}

		function onInput(e, instant) {
			if(instant === true) {
				onInputTimeout.call(this);
				return;
			}

			clearTimeout(onInputTimer);

			onInputTimer = setTimeout(onInputTimeout.bind(this), this.previewDelay);
		}

		async function onInputTimeout() {
			this.overrideValidatorRule();

			const $chart = this.$dialog.find('.admin-visualize-chart');
			const $placeholder = this.$dialog.find('.admin-visualize-placeholder');

			const formData = this.$form.serializeFlat();
			const cvtData = this.formAjax.getMappingFormData(formData);
			const mngrData = this.formAjax.getMappingFormData(this.manager.currentRowData);

			const validatorTemporary = new Validator(this.formAjax.validator.rules, {
				fieldNames: this.formAjax.validator.fieldNames,
				bypassCollision: true,
				slience: true
			});

			const isValid = (await validatorTemporary.validateAllAsync(cvtData)) === true;

			let chartRendered = false;

			$chart[isValid ? 'removeClass' : 'addClass']('u-hide');
			$placeholder[isValid ? 'addClass' : 'removeClass']('u-hide');

			this.chart.refresh();
			this.chart.setOptions({
				title: {
					text: formData.vis_nm + '\n' + formData.vis_desc
				},
				seriesDefaults: {
					type: formData.vis_type
				},
				render: (e) => {
					const $title = e.sender.element.find('text').filter((v, el) => $(el).text().trim() === formData.vis_nm.trim()).first();
					const $desc = $title.siblings();

					$desc.attr({ 'x': '50%', 'text-anchor': 'middle' });
					$desc.css({ fontSize: '14px', fontWeight: '400' });

					if(!chartRendered) {
						chartRendered = true;

						const yAxis = this.chart.getAxis('y-value');
						const yRange = yAxis.range();

						this.chart.setOptions({
							valueAxis: {
								axisCrossingValue: [0, yRange.min]
							}
						});
					}
				}
			});

			if(isValid) {
				const result = await $.post(this.urls.preview, $.extend(true, {}, mngrData, cvtData));

				const columnMapping = this.columnManager.currentAvailableColumnData.reduce((acc, column) => {
					acc[column.col_nm_org] = column.col_nm_alias;

					return acc;
				}, {});

				this.chart.setOptions({
					dataSource: result.result,
					series: formData.vis_y.map((y) => {
						return {
							field: y,
							name: columnMapping[y],
							categoryField: formData.vis_x
						};
					}),
					categoryAxis: [{
						visible: false,
						name: 'x-series'
					}, {
						name: 'x-labels',
						field: formData.vis_x,
						labels: {
							font: '300 12px "Noto Sans KR", sans-serif',
							rotation: -45
						}
					}]
				});
			}
		}

		function onAddButtonClick(e) {
			e.preventDefault();

			const $this = $(e.currentTarget);

			if($this.hasClass('active')) {
				const axisCount = this.columnManager.currentAvailableColumnData.reduce((acc, column) => {
					acc[column.col_axis]++;

					return acc;
				}, { X: 0, Y: 0 });

				if(axisCount.X < 1 || axisCount.Y < 1) {
					alert('시각화 가능한 X 또는 Y 컬럼이 설정되지 않았습니다.\n컬럼 정의를 먼저 해주십시오.');
					return;
				}

				this.$form.reset();
				this.$form.trigger('input', [true]);

				this.formAjax.url = this.urls.insert;
				this.formAjax.prependData.vis_nm_old = undefined;

				this.dialog.setOptions({ title: '시각화 추가' });
				this.dialog.open();
			}
		}

		function onUpdateButtonClick(e) {
			e.preventDefault();

			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');

			let rowData = this.grid.dataItem($row);
			rowData = this.parseRowData(rowData);
			rowData = this.formAjax.getReverseMappingFormData(rowData);

			this.formAjax.url = this.urls.update;
			this.formAjax.prependData = $.extend(true, {}, this.formAjax.prependData, rowData);

			this.$form.find('#vis_nm').val(rowData.vis_nm);
			this.$form.find('#vis_desc').val(rowData.vis_desc);
			this.$form.find(`#vis_x option[value="${rowData.vis_x}"]`).prop('selected', true);
			this.$form.find(`#vis_o option[value="${rowData.vis_o}"]`).prop('selected', true);
			this.$form.find(`#vis_type option[value="${rowData.vis_type}"]`).prop('selected', true);
			this.$form.find(`#use_stat`).prop('checked', rowData.use_stat);
			this.visY.value(rowData.vis_y);

			this.$form.trigger('input', [true]);

			this.dialog.setOptions({ title: '시각화 수정' });
			this.dialog.open();
		}

		async function onDeleteButtonClick(e) {
			e.preventDefault();

			if(!confirm('정말 삭제하시겠습니까?'))
				return;

			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');

			const rawData = this.grid.dataItem($row);
			const rowData = this.parseRowData(rawData);

			Loading.show();

			try {
				await $.post(this.urls.delete, rowData);

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

			const rawData = this.grid.dataItem($row);
			const rowData = this.parseRowData(rawData);

			const useStat = $input.prop('checked') ? 'Y' : 'N';

			rawData.use_stat = useStat;
			rowData.use_stat = useStat;

			Loading.show();

			try {
				await $.post(this.urls.update, rowData);
			} finally {
				Loading.hide();
			}
		}

		async function onSequenceChangerClick(e) {
			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');

			const isUp = $this.is('.admin-visualize-up');
			const isDown = $this.is('.admin-visualize-down');

			const rawDataSource = this.grid.dataSource;
			const rawData = this.grid.dataItem($row);
			const rowData = this.parseRowData(rawData);

			const idx = rawDataSource.indexOf(rawData);
			const len = rawDataSource.total();

			let dstIdx, dstData;

			if(isUp && idx > 0) {
				dstIdx = idx - 1;
			} else if(isDown && idx < len - 1) {
				dstIdx = idx + 1;
			}

			if(dstIdx === undefined)
				return;

			dstData = rawDataSource.at(dstIdx);

			rawData.vis_idx = dstData.vis_idx;
			rowData.vis_idx = dstData.vis_idx;

			Loading.show();

			try {
				await $.post(this.urls.update, rowData);

				rawDataSource.read();
			} finally {
				Loading.hide();
			}
		}

		function onColumnManagerDataChange(e) {
			const columns = this.columnManager.currentAvailableColumnData;

			this.visY.dataSource.data([]);
			this.$visX.find('option:not([disabled])').remove();
			this.$visO.find('option:not([disabled])').remove();

			for(const i in columns) {
				const column = columns[i];

				if(column.col_axis === 'Y')
					this.visY.dataSource.add(column);
				else if(column.col_axis === 'X')
					this.$visX.append(HTML.COLUMN_OPTION(column));

				this.$visO.append(HTML.COLUMN_OPTION(column));
			}

			this.visY.dataSource.sync();
		}

		function onManagerGridChange(e) {
			const getGridButton = () => this.$element.find('.admin-visualize-add');

			const currentRowData = this.manager.currentRowData;

			this.grid.dataSource.page(1);

			if(currentRowData) {
				this.grid.setOptions({
					dataSource: {
						transport: {
							read: {
								data: currentRowData
							}
						}
					}
				});

				this.formAjax.prependData = currentRowData;

				getGridButton().addClass('active');
			} else {
				this.grid.dataSource.online(false);
				this.grid.dataSource.data([]);

				getGridButton().removeClass('active');
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
				{ field: 'vis_nm', title: '시각화 제목' },
				{ field: 'vis_idx', title: '시각화 순서', template: HTML.SEQUENCE_CHANGER },
				{ field: 'use_stat', title: '사용여부', template: HTML.USE_STAT_SWITCH },
				{ template: HTML.UPDATE_BUTTON + HTML.DELETE_BUTTON }
			],
			dataSource: {
				pageSize: 5,
				transport: {
					read: {
						url: this.urls.get
					}
				}
			}
		};

		const $grid = this.$element.find('.admin-visualize-grid');

		this.$grid = $grid;
		this.$grid.kendoGrid($.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, kendoGridOption, this.kendoGridOption));

		this.grid.dataSource.data([]);
		this.grid.autoFitColumn(3);
	}

	initDialog() {
		const kendoDialogOption = {
			title: '시각화 관리',
			width: 1200,
			actions: [
				{ text: '취소' },
				{ text: '저장', primary: true, action: e => {
					this.$form.submit();

					return false;
				} }
			]
		};

		const $dialog = $('<div class="admin-visualize-dialog"/>');
		$dialog.appendTo($('body'));
		$dialog.html(HTML.DIALOG);
		$dialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoDialogOption, this.kendoDialogOption));

		this.$dialog = $dialog;
	}

	initChart() {
		const $chart = this.$dialog.find('.admin-visualize-chart');

		$chart.kendoChart({
			transitions: false,
			seriesColors: Constant.KENDO_DEFAULT_CHART_COLORS,
			title: {
				font: '700 18px "Noto Sans KR", sans-serif',
				color: '#000000'
			},
			legend: {
				labels: {
					font: '400 14px "Noto Sans KR", sans-serif'
				}
			},
			valueAxis: {
				name: 'y-value',
				labels: {
					font: '300 12px "Noto Sans KR", sans-serif'
				}
			},
			tooltip: {
				visible: true,
				template: "#= category # (#= series.name #): #= value #"
			}
		});

		this.$chart = $chart;
	}

	initForm() {
		const $form = this.$dialog.find('form');
		const $visX = $form.find('select[name="vis_x"]');
		const $visY = $form.find('select[name="vis_y"]');
		const $visO = $form.find('select[name="vis_o"]');

		const formAjaxOption = {
			url: this.urls.insert,
			type: 'POST',
			validator: this.validator,
			overrideSubmitEvent: false
		};

		const kendoMultiSelectOption = {
			dataTextField: 'col_nm_alias',
			dataValueField: 'col_nm_org'
		}

		const formAjax = new FormAjax($form, $.extend(true, {}, formAjaxOption, this.formAjaxOption));

		$visY.kendoMultiSelect($.extend(true, {}, kendoMultiSelectOption, this.kendoMultiSelectOption));

		this.$form = $form;
		this.$visX = $visX;
		this.$visY = $visY;
		this.$visO = $visO;

		this.formAjax = formAjax;
	}

	overrideValidatorRule() {
		this.validator.rules = $.extend(true, {
			vis_nm: { required: true, maxLength: 50 },
			vis_desc: { required: true },
			vis_x: { required: true },
			vis_y: { required: true },
			vis_o: { required: true },
			vis_type: { required: true }
		}, this.validator.rules);
	}

	parseRowData(rowData) {
		rowData = rowData.toJSON();
		rowData.vis_nm_old = rowData.vis_nm;
		rowData.vis_y = JSON.parse(rowData.vis_y.value);
		return rowData;
	}
}

export default AdminDataVisualizeManager;