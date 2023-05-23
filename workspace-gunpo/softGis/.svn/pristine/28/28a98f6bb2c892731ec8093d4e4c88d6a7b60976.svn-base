import Validator from '../shared/validator';
import { DBFParser } from '../shared/shp-parser';

import FileReaderAsync from '../shared/file-reader-async';
import FormAjax from '../shared/form-ajax';
import Loading from '../modules/loading';

const HTML = {
	DIALOG: (t) => `
		<form class="form">
			<div class="form-field">
				<label for="data_file" class="form-required">파일 (${t})</label>
				<input type="file" name="data_file" id="data_file" placeholder="파일" accept="${t}">
				${t == '.zip' ? '<div class="u-text-primary u-margin-top-1">※ 스타일(.sld)을 같이 압축하여 업로드 해 주십시오.</div>' : ''}
			</div>
		</form>
	`
};

class AdminAnalLoader {
	constructor(opts = {}) {
		if(opts.manager === undefined)
			throw new ReferenceError('Invaild admin data manager object');

		if(opts.type === undefined
			|| (opts.type !== 'zip'
			&&  opts.type !== 'csv'))
			throw new ReferenceError('Invaild data type');

		if(typeof(opts.urls) !== 'object'
			|| opts.urls.get === undefined
			|| opts.urls.insert === undefined
			|| opts.urls.delete === undefined)
			throw new ReferenceError('Invaild URLs');

		this.manager = opts.manager;
		this.columnManager = opts.columnManager;

		this.urls = opts.urls;
		this.type = opts.type;
		this.gbn = opts.gbn;

		this.validator = opts.validator || new Validator({}); 

		this.$dialog = undefined;
		this.$dialogForm = undefined;

		this.formAjax = undefined;

		this.formAjaxOption = opts.formAjaxOption;
		this.kendoDialogOption = opts.kendoDialogOption;

		this.init();
	}

	get dialog() {
		return this.$dialog.data('kendoDialog');
	}

	init() {
		this.initDialog();
		this.initDialogForm();

		$('.admin-loader-add').on('click', onAddButtonClick.bind(this)); 
		$('.admin-loader-delete').on('click', onDeleteButtonClick.bind(this)); 

		async function onAddButtonClick(e) {
			e.preventDefault();

			const $this = $(e.currentTarget);
			if($this.hasClass('active')) {
				let bRst = true;
				
				if(this.gbn == "data_vis"){
				
					const result = await $.post(this.urls.get, {
						mta_tbl: this.manager.currentRowData.mta_cd
					});
					
					if(result.result && result.result.length>0){
						bRst = false;
						alert('기존 테이블에서 시각화를 사용중입니다.\n시각화목록을 삭제 후 다시 시도해 주십시오.');
						return;
					}
					
				    const axisCount = this.columnManager.currentAvailableColumnData.reduce((acc, column) => {
						acc[column.col_axis]++;
	
						return acc;
					}, { X: 0, Y: 0 });
	
					if(axisCount.X > 0 || axisCount.Y > 0) {
						bRst = false;
						alert('기존 테이블의 시각화 컬럼이 정의되어 있습니다.\n컬럼 초기화 후 다시 시도해 주십시오.');
						return;
					}
				}
				
				if(bRst){
					this.$dialogForm.reset();
					this.dialog.open();
				}
			}
		}
		
		async function onDeleteButtonClick(e) {
			e.preventDefault();
			if(this.manager.currentRowData){
				if(!confirm('정말 삭제하시겠습니까?'))
					return;
	
				Loading.showGlobal();
	
				try {
					await $.post(this.urls.delete, this.manager.currentRowData);
	
					alert('삭제가 완료되었습니다.');
	
					this.manager.grid.dataSource.read();
					
				} finally {
					Loading.hide();
				}
			}
		}
	}

	initDialog() {
		let typeName = '';

		switch(this.type) {
			case 'csv': typeName = '.csv'; break;
			case 'xlsx': typeName = '.xlsx'; break;
			case 'zip': typeName = '.zip'; break;
		}

		const kendoDialogOption = {
			title: '데이터 업로드',
			actions: [
				{ text: '취소' },
				{ text: '업로드', primary: true, action: e => { this.submit(); return false; }}
			]
		};

		const $dialog = $('<div class="admin-loader-dialog"/>');
		$dialog.appendTo($('body'));
		$dialog.html(HTML.DIALOG(typeName));
		$dialog.kendoDialog($.extend(true, {}, Constant.KENDO_DEFAULT_DIALOG_OPTION, kendoDialogOption, this.kendoDialogOption));

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
				data_file: '파일'
			}
		};

		const formAjax = new FormAjax($form, $.extend(true, {}, formAjaxOption, this.formAjaxOption));

		this.$dialogForm = $form;

		this.formAjax = formAjax;
	}

	async submit() {
		const $file = this.$dialogForm.find('input[type="file"]');

		let rowObj, formObj = this.$dialogForm.serializeFlat();

		rowObj = this.formAjax.getMappingFormData(this.manager.currentRowData);
		formObj = this.formAjax.getMappingFormData(formObj);

		this.formAjax.validator.fieldNames = this.formAjax.fieldNames;
		this.formAjax.validator.rules = $.extend(true, {
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
			
			var result = await this.formAjax.submit();
			
			if(result && result.error){
				alert(result.error);
			}else{
				alert('업로드가 완료되었습니다.');
			}

			this.manager.grid.dataSource.read();
			
			this.dialog.close(); 
		} finally {
			Loading.hide();
		}
	}
}

export default AdminAnalLoader;