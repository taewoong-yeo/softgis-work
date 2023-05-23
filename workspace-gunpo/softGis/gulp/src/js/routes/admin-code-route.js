import AdminDataManager from '../shared/admin-multi-data-manager';
import FormSelectionDialog from '../shared/form-selection-dialog';
import Validator from '../shared/validator';

function AdminCommonCodeRoute() {
	const $groupForm = $(".group");
	const $codeForm = $(".code");
	const $btnGroup = $("#btn_group");
	const $btnCode = $("#btn_code");
	$codeForm.hide();
	
	const groupManager = new AdminDataManager({
		$grid: $('.admin-grid-el-group'),
		$codeGrid: $('.admin-grid-el'),
		$form: $('.group'),
		$change: groupFormChange,
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getGroupCodeList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertGroupCode.do',
			update: Constant.CONTEXT_PATH + '/admin/updateGroupCode.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteGroupCode.do'
		},
		validator: {
			insert: new Validator({
				grp_id: { required: true, collision: Constant.CONTEXT_PATH + '/admin/getGroupCodeExist.do' },
				grp_nm: { required: true, maxLength: 60 },
				grp_desc: { maxLength: 150 },
			}),
			update: new Validator({
				grp_id: { required: true },
				grp_nm: { required: true, maxLength: 60},
				grp_desc: { maxLength: 150 }
			})
		}
	});
	
	const manager = new AdminDataManager({
		$grid: $('.admin-grid-el'),
		$form: $('.code'),
		$change: codeFormChange,
		urls: {
			get: Constant.CONTEXT_PATH + '/admin/getCodeList.do',
			insert: Constant.CONTEXT_PATH + '/admin/insertCode.do',
			update: Constant.CONTEXT_PATH + '/admin/updateCode.do',
			delete: Constant.CONTEXT_PATH + '/admin/deleteCode.do'
		},
		validator: {
			insert: new Validator({
				grp_id: { required: true },
				cd_id: { required: true, maxLength: 20, collision: Constant.CONTEXT_PATH + '/admin/getCodeExist.do' },
				cd_nm: { required: true, maxLength: 60 },
				cd_desc: { maxLength: 150 }
			}),
			update: new Validator({
				grp_id: { required: true },
				cd_id: { required: true, maxLength: 20 },
				cd_nm: { required: true, maxLength: 60 },
				cd_desc: { maxLength: 150 }
			})
		}
	});

	const dialog = new FormSelectionDialog({
		url: Constant.CONTEXT_PATH + '/admin/getGroupCodeList.do',
		columnMapping: {
			'grp_id': $('#grp_id2')
		},
		kendoGridOption: {
			columns: [
				{ field: 'grp_id', title: '그룹코드' },
				{ field: 'grp_nm', title: '그룹코드명' }
			]
		},
		kendoDialogOption: {
			title: '그룹코드 찾기'
		}
	});

	$('#grp_id_selection').on('click', (e) => {
		e.preventDefault();

		dialog.open();
	});
	
	$btnCode.on('click', codeFormChange);
	
	$btnGroup.on('click', groupFormChange);
	
	function codeFormChange() {
		$codeForm.show(); 
		$groupForm.hide(); 
		$btnCode.removeClass("btn-primary-border");
		$btnCode.addClass("btn-primary");
		$btnGroup.removeClass("btn-primary");
		$btnGroup.addClass("btn-primary-border");
	}
	
	function groupFormChange() {
		$codeForm.hide(); 
		$groupForm.show(); 
		$btnGroup.removeClass("btn-primary-border");
		$btnGroup.addClass("btn-primary");
		$btnCode.removeClass("btn-primary");
		$btnCode.addClass("btn-primary-border");
	}
	
}

export default AdminCommonCodeRoute;