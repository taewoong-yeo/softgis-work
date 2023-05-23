import Validator from '../shared/validator';
import FormAjax from '../shared/form-ajax';
import Loading from '../modules/loading';
import Highchart from '../modules/adminHighcharts';
import AdminDashboardColumnManager from './admin-dashboard-column-manager';

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
	TBL_COLUMN_OPTION: (column) => `
		<option value="${column.data_tbl}">${column.data_desc}</option>
	`,
	USE_STAT_SWITCH: (v) => `
		<label class="admin-visualize-use-at switch">
			<input type="checkbox" ${v.use_at === 'Y' ? 'checked' : ''}>
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
		<div class="row k-dialog-scroll">
			<form class="form col-6">
				<div class="form-field ff">
					<label for="data_tbl" class="form-required">테이블 선택</label>
					<select name="data_tbl" id="data_tbl">
						<option disabled selected>테이블 선택</option>
					</select>
				</div>
				<div class="form-field">
					<label>컬럼 정의</label>
					<div class="admin-column-manager"></div>
				</div>
				<div class="form-field">
					<label for="vis_nm" class="form-required">시각화 제목</label>
					<input type="text" name="vis_nm" id="vis_nm" placeholder="시각화 제목">
				</div>
				<div class="form-field">
					<label for="vis_desc">시각화 설명</label>
					<textarea id="vis_desc" name="vis_desc" placeholder="시각화 설명"></textarea>
				</div>
				<div class="row row-hspace-1">
					<div class="form-field col-6">
						<label for="vis_x" class="form-required">X 축</label>
						<select id="vis_x" name="vis_x">
							<option disabled selected>X 축</option>
						</select>
					</div>
					<div class="form-field col-6">
						<label for="vis_unit" class="form-required">시각화 단위</label>
						<input type="text" name="vis_unit" id="vis_unit" placeholder="시각화 단위">
					</div>
				</div>
				<div class="form-field">
					<label for="vis_y" class="form-required">Y 축</label>
					<select class="multiple" id="vis_y" name="vis_y" multiple></select>
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
							<option value="columnNormal">막대2 차트</option>
							<option value="columnPercent">막대3 차트</option>
							<option value="bar">수평 막대 차트</option>
							<option value="barNormal">수평 막대2 차트</option>
							<option value="barPercent">수평 막대2 차트</option>
							<option value="dualAxes">컬럼&라인 차트</option>
							<option value="pie">파이 차트</option>
						</select>
					</div>
				</div>
				<div class="row row-hspace-1">
					<div class="form-field col-6">
						<label for="vis_col">날짜 정렬축</label>
						<!-- <input type="text" name="vis_col" id="vis_col" placeholder="날짜 정렬축"> -->
						<select id="vis_col" name="vis_col">
							<option selected disabled>날짜 축</option>
						</select>
					</div>
					<div class="form-field col-6">
						<label for="date_scope">시계열 여부</label>
						<!-- <input type="text" name="date_scope" id="date_scope" placeholder="시계열 여부">-->
						<select name="date_scope" id="date_scope">
							<option value="Y">사용</option>
							<option value="N" selected>미사용</option>
						</select>
					</div>
				</div>
			</form>
			<div class="admin-visualize-preview col-6">
				<div class="admin-visualize-chart u-hide" id="chart"></div>
				<div class="admin-visualize-placeholder">필수 입력 사항을 모두 입력하시면 차트 미리보기가 표시됩니다.</div>
			</div>
		</div>
	`
};

class AdminDashboardVisualizeManager{
	constructor(opts = {}) {
		// if(opts.columnManager === undefined)
		// 	throw new ReferenceError('Invaild admin column manager object');
		if(opts.manager === undefined)
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

		// this.columnManager = opts.columnManager;
		this.manager = opts.manager;


		this.urls = opts.urls;

		this.$element = $(opts.$element);
		this.$grid = undefined;
		this.$dialog = undefined;
		this.$form = undefined;
		this.$chart = undefined;
		this.$visX = undefined;
		this.$visY = undefined;
		this.$visO = undefined;
		this.$visCol = undefined;
		this.$columnList = undefined;
		this.$currentRowData = undefined;
		this.$tbl = undefined;
		this.data_v = undefined;

		this.validator = opts.validator || new Validator({});

		this.formAjax = undefined;

		this.kendoGridOption = opts.kendoGridOption;
		this.kendoDialogOption = opts.kendoDialogOption;
		this.kendoMultiSelectOption = opts.kendoMultiSelectOption;
		this.formAjaxOption = opts.formAjaxOption;

		this.previewDelay = opts.previewDelay || 200;

		this.init();
	}

	// get manager() {
	// 	return this.manager;
	// }

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
		// this.dataSet();


		// undefined
		this.form = $(".admin-form-el");
		this.$form.on('submit', onSaveStart.bind(this));
		this.$form.on('submitAjax', onSaveComplete.bind(this));
		this.$form.on('input', onInput.bind(this));
		this.$form.find('#vis_nm').on('change', onCheck.bind(this));
		this.visY.bind('change', onInput.bind(this));
		this.$element.on('click', '.admin-visualize-add', onAddButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-update', onUpdateButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-delete', onDeleteButtonClick.bind(this));
		this.$element.on('click', '.admin-visualize-use-at', onUseStatSwitchClick.bind(this));
		this.$element.on('click', '.admin-visualize-up, .admin-visualize-down', onSequenceChangerClick.bind(this));
		this.manager.grid.bind('change', onManagerGridChange.bind(this));




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

		async function onCheck(){
			const rowData = this.data_v;
			console.log(rowData);
			try{
				rowData.nm = this.$form.find('#vis_nm').val();
				await $.post(Constant.CONTEXT_PATH + '/admin/dashboard/check.do', {
					vis_nm : rowData.nm,
					dashboard_ix_id : rowData.ix_id,
					dashboard_mngid : rowData.dashboard_mngid
				});
			} catch(e){
				console.log('==');
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

			$chart[isValid ? 'removeClass' : 'addClass']('u-hide');
			$placeholder[isValid ? 'addClass' : 'removeClass']('u-hide');
			this.chart.refresh();
			this.chart.setOptions({
				title: {
					text: formData.vis_nm
				},
				seriesDefaults: {
					type: formData.vis_type
				}
			});
			if(isValid) {
				const result = await $.post(this.urls.preview, $.extend(true, {}, mngrData, cvtData));

				var data = result.result;

				if(data){
					new Highchart("chart", {
						chart: {
							type: formData.vis_type,
						},
						xAxis: {
							categories: data.category
						},
						series: data.data,
						data: data,
						thema: formData.ix_thema,
					});
				}else{
					new Highchart("chart", {
						chart: {},
					    xAxis: {},
				        legend: {},
					});
				}
/*
				const columnMapping = this.columnManager.currentAvailableColumnData.reduce((acc, column) => {
					acc[column.col_nm_org] = column.col_nm_alias;

					return acc;
				}, {});

				this.chart.setOptions({
					series: formData.vis_y.map((y) => {
						return {
							name: columnMapping[y],
							field: y,
							data: result.result,
							categoryField: formData.vis_x
						};
					})
				});
				*/
			}
		}



		 function onAddButtonClick(e) {
			e.preventDefault();
			const $this = $(e.currentTarget);
			if($this.hasClass('active')) {
				this.$form.reset();
				this.visY.dataSource.data([]);
				this.$visX.find('option:not([disabled])').remove();
				this.$visO.find('option:not([disabled])').remove();
				this.$visCol.find('option:not([disabled])').remove();
				this.$form.find(`#data_tbl`).val(this.data_v.data_tbl).prop('selected', true);
				this.$form.trigger('input', [true]);
				this.data_v.dashboard_mngid = undefined;

				this.formAjax.url = this.urls.insert;
				this.formAjax.prependData.vis_nm_old = undefined;

				this.dialog.setOptions({ title: '시각화 추가' });
				this.dialog.open();
			}
		}

		function onUpdateButtonClick(e) {
			e.preventDefault();
			this.visY.dataSource.data([]);
			this.$visX.find('option:not([disabled])').remove();
			this.$visO.find('option:not([disabled])').remove();
			this.$visCol.find('option:not([disabled])').remove();
			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');
			let rowData = this.grid.dataItem($row);
			rowData = this.parseRowData(rowData);
			rowData = this.formAjax.getReverseMappingFormData(rowData);
			this.formAjax.url = this.urls.update;
			this.formAjax.prependData = $.extend(true, {}, this.formAjax.prependData, rowData);
			this.data_v.dashboard_mngid = rowData.dashboard_mngid;
			this.$form.find('#vis_nm').val(rowData.vis_nm);
			this.$form.find('#vis_desc').val(rowData.vis_desc);
			this.$form.find('#vis_unit').val(rowData.vis_unit);
			this.$form.find(`#vis_type option[value="${rowData.vis_type}"]`).prop('selected', true);
			this.$form.find(`#data_tbl option[value="${rowData.data_tbl}"]`).prop('selected', true);
			this.$form.find(`#use_at`).prop('checked', rowData.use_at);
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
			e.preventDefault();
			const $this = $(e.currentTarget);
			const $row = $this.closest('tr');
			const $input = $this.find('input');

			const rawData = this.grid.dataItem($row);
			const rowData = this.parseRowData(rawData);
			const item = this.grid.dataSource.data();
			const params = item[0];
			// const cnt2 = await $.post(Constant.CONTEXT__PATH + '/admin/dashboard/getVisCnt', params);
			const useStat = $input.prop('checked') ? 'N' : 'Y';
			const useStatBoolean = $input.prop('checked') ? 'false' : 'true';
			if(useStat == 'Y'){
				let cnt = 0;
				for(let i = 0; i<item.length; i++){
					if(item[i].use_at == 'Y'){
						cnt++;
					}
				}
				if(cnt > 2){
					alert('시각화 차트 사용은 2개 까지 가능합니다.');
					return false;
				} else {
					Loading.show();

					rawData.use_at = useStat;
					rowData.use_at = useStat;
					$input.prop('checked', useStatBoolean);
					try {
						await $.post(this.urls.update, rowData);
					} finally {
						Loading.hide();
					}
				}

			} else {
				Loading.show();

				rawData.use_at = useStat;
				rowData.use_at = useStat;
				$input.prop('checked', false);
				try {
					await $.post(this.urls.update, rowData);
				} finally {
					Loading.hide();
				}
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


		async function onManagerGridChange(e) {
			const getGridButton = () => this.$element.find('.admin-visualize-add');

			const currentRowData = this.manager.currentRowData;
			this.dataSet(currentRowData);
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
				const resultRowNum = await $.post(this.urls.get, this.manager.currentRowData);
				// if(resultRowNum.result.length < 2){
					getGridButton().addClass('active');
				// } else {
				// 	getGridButton().removeClass('active');
				// }
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
				{ field: 'use_at', title: '사용여부', template: HTML.USE_STAT_SWITCH },
				{ template: HTML.UPDATE_BUTTON + HTML.DELETE_BUTTON}
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
				labels: {
					font: '300 12px "Noto Sans KR", sans-serif'
				}
			},
			categoryAxis: {
				labels: {
					font: '300 12px "Noto Sans KR", sans-serif',
					rotation: -45
				}
			},
			tooltip: {
				visible: true,
				template: "#= category #: #= value #"
			}
		});

		this.$chart = $chart;
	}

	initForm() {
		const $form = this.$dialog.find('form');
		const $tbl = $form.find('select[name="data_tbl"]')
		const $visX = $form.find('select[name="vis_x"]');
		const $visY = $form.find('select[name="vis_y"]');
		const $visO = $form.find('select[name="vis_o"]');
		const $visCol = $form.find('select[name="vis_col"]');
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
		this.$tbl = $tbl;
		this.$visCol = $visCol;
		this.formAjax = formAjax;
	}

	overrideValidatorRule() {
		this.validator.rules = $.extend(true, {
			vis_nm: { required: true, maxLength: 50 },
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

	async dataSet(v){
		console.log(v);
		if(typeof v != 'undefined'){
			this.data_v = v;
			$("#data_tbl").find('option:not([disabled])').remove();
			const thema = await $.post(Constant.CONTEXT_PATH + '/admin/dashboard/getDataTable.do', {ix_thema : this.data_v.cod_cd});
			for(const i in thema.result) {
				if(thema.result[i].data_tbl == v.data_tbl){
					$("#data_tbl").find('option[disabled]').removeAttr("selected");
					$("#data_tbl").append(HTML.TBL_COLUMN_OPTION(thema.result[i]));
					// $("#data_tbl").append(`<option value="${thema.result[i].data_tbl}" selected>${thema.result[i].data_desc}</option>`)
				} else {
					$("#data_tbl").append(HTML.TBL_COLUMN_OPTION(thema.result[i]));
					// $("#data_tbl").append(`<option value="${thema.result[i].data_tbl}">${thema.result[i].data_desc}</option>`);
				}
			}
		}
	}
}


export default AdminDashboardVisualizeManager;