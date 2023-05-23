import FormAjax from './form-ajax';
import Validator from './validator';
import Loading from '../modules/loading';

class AdminDataManager {
	constructor(opts = {}) {
		if(opts.$grid === undefined)
			throw new ReferenceError('Invaild grid element');

		if(opts.$form === undefined)
			throw new ReferenceError('Invaild form element');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.insert === undefined
			|| opts.urls.update === undefined
			|| opts.urls.delete === undefined)
			throw new ReferenceError('Invaild URLs');

		this.$grid = $(opts.$grid);
		this.$gridFields = this.$grid.find('[data-field]');

		this.$form = $(opts.$form);
		this.$formSubmitBtn = this.$form.find('.form-submit');
		this.$formDeleteBtn = this.$form.find('.form-delete');
		this.$formInsertBtn = this.$form.find('.form-reset');

		// 사용자 비밀번호 초기화
		this.$formInitUserPwdBtn = this.$form.find('#init_usr_pwd_btn');

		this.formAjax = new FormAjax(this.$form, opts.formAjaxOption || {});
		this.formAjax.overrideSubmitEvent = false;

		this.formMode = 'insert';
		this.formInsertModeClass = 'form-insert';
		this.formUpdateModeClass = 'form-update';

		this.urls = opts.urls;

		this.validator = opts.validator;
		this.validatorIntegrated = false;

		this.overrideSubmitEvent = opts.overrideSubmitEvent !== undefined ? opts.overrideSubmitEvent : true;

		this.kendoGridOption = opts.kendoGridOption;

		this.messages = $.extend({
			updateComplete: '수정이 완료되었습니다.',
			insertComplete: '등록이 완료되었습니다.',
			deleteComplete: '삭제가 완료되었습니다.',
			deleteConfirm: '정말 삭제하시겠습니까?',
			insertButton: '등록',
			updateButton: '수정'
		}, opts.messages);

		this.currentRowData = undefined;

		this.init();
	}

	init() {
		if(this.validator instanceof Validator) {
			this.formAjax.validator = this.validator;
			this.validatorIntegrated = true;
		}

		this.initGrid();

		this.setFormMode('insert');

		this.$formInitUserPwdBtn.on('click', () => this.onInitUserPwd());
		this.$formDeleteBtn.on('click', () => this.onDelete());
		this.$formInsertBtn.on('click', () => this.setFormMode('insert'));
		this.$form.on('submit', onSubmit.bind(this));
		this.$form.on('submitAjax', onSubmitComplete.bind(this));

		async function onSubmit(e) {
			e.preventDefault();

			if(this.overrideSubmitEvent) {
				Loading.showGlobal();

				try {
					const result = await this.formAjax.submit();

					if(result !== false)
						this.$form.trigger('submitAjax', [result]);
				} catch(e) {
					if(this.formMode === 'delete')
						this.setFormMode('update', this.currentRowData);

					throw e;
				} finally {
					Loading.hide();
				}
			}
		}

		function onSubmitComplete(e, d) {
			this.onSubmitted();
		}
	}

	initGrid() {

		const kendoOption = {
			dataSource: {
				transport: {
					read: {
						url: this.urls.get
					}
				},
				requestStart: () => {
					this.setFormMode('insert');
				}
			},
			change: () => {
				const selectedRow = this.grid.select();

				if($('#usr_login_type').length>0){
					$("#usr_login_type").hide(); 
				}

				if(selectedRow.length > 0) {
					const selectedRowData = this.grid.dataItem(selectedRow).toJSON();
					const reverseMappedData = this.formAjax.getReverseMappingFormData(selectedRowData);

					this.setFormMode('update', reverseMappedData);
				}
			},
			search: {
				fields: this.$gridFields.map((i, el) => $(el).data('field'))
			}
		};

		this.$grid.kendoGrid($.extend(true, {}, Constant.KENDO_DEFAULT_GRID_OPTION, kendoOption, this.kendoGridOption));
	}

	get grid() {
		return this.$grid.data('kendoGrid');
	}

	onSubmitted() {
		if(this.formMode === 'update') {
			alert(this.messages.updateComplete);
		} else if(this.formMode === 'insert') {
			alert(this.messages.insertComplete);
		} else if(this.formMode === 'delete') {
			alert(this.messages.deleteComplete);
		}

		this.grid.dataSource.read();
	}

	onInitUserPwd(){

		if(this.formMode !== 'update')
			return;
			
		if(confirm(this.messages.initpwdConfirm)) {
			this.formMode = 'update';
			this.formAjax.url = this.urls.initpwd;
			this.formAjax.validator = undefined;

			this.$form.submit();
		}
	}

	onDelete() {
		if(this.formMode !== 'update')
			return;

		if(confirm(this.messages.deleteConfirm)) {
			this.formMode = 'delete';
			this.formAjax.url = this.urls.delete;
			this.formAjax.validator = undefined;

			this.$form.submit();
		}
	}

	setFormMode(name, data) {
		this.formMode = name;

		if(this.validator) {
			if(!this.validatorIntegrated) {
				this.formAjax.validator = this.validator[name];
			} else {
				this.formAjax.validator = this.validator;
			}
		}

		this.$form.find('[class*="form-readonly"]').each((i, el) => {
			const $el = $(el);

			const isReadonly = $el.is(`.form-readonly-${name}`);

			$el.find('input, textarea').prop('readonly', isReadonly);
			$el.find('option:not(:first-child)').prop('disabled', isReadonly);
			$el.find('select')[isReadonly ? 'addClass' : 'removeClass']('readonly');
		});

		if(name === 'update' || name === 'insert')
			this.$form.reset();

		if(name === 'update') {
			this.currentRowData = data;


			this.formAjax.prependData = data;
			this.formAjax.url = this.urls.update;

			this.$form.addClass(this.formUpdateModeClass);
			this.$form.removeClass(this.formInsertModeClass);

			this.$formSubmitBtn.text(this.messages.updateButton);
			this.$formDeleteBtn.show();
			this.$formInsertBtn.show();
 
			for(let i in data) {
				const prefixName = this.formAjax.getPrefixName(i);

				if(this.formAjax.$elInputs.hasOwnProperty(prefixName)) {
					const $input = this.formAjax.$elInputs[prefixName];

					if($input.is('select')) {
						$input.find(`option[value="${data[i]}"]`).prop('selected', true);
					} else {
						switch($input.attr('type')) {
							case 'password': break;
							case 'radio':
								$input.prop('checked', $input.val() == data[i]);
								break;
							case 'checkbox':
								$input.prop('checked', !!data[i])
								break;
							default:
								$input.val(data[i]);
								break;
						}
					}
				}

				// usr_login_type =null 인 user 비밀번호 초기화
				if ( prefixName === 'usr_login_type'){
					if (data[i] === 'X'){
						$("#usr_login_type").show();
					}else{
						$("#usr_login_type").hide();
					}
				}
			}
		} else if(name === 'insert') {
			this.currentRowData = undefined;
			
			this.formAjax.prependData = {};
			this.formAjax.url = this.urls.insert;

			this.$form.addClass(this.formInsertModeClass);
			this.$form.removeClass(this.formUpdateModeClass);

			this.$formSubmitBtn.text(this.messages.insertButton);
			this.$formDeleteBtn.hide();
			this.$formInsertBtn.hide();

			this.grid.clearSelection();
		} else {
			console.warn(`Warning: AdminDataManager form mode \'${name}\' is invaild`);
		}
	}
}

export default AdminDataManager;