class Validator {
	constructor(rules, opts = {}) {
		if(rules === undefined)
			throw new ReferenceError('Invaild validation ruleset');

		this.rules = rules;

		this.fieldNames = opts.fieldNames || {};
		this.bypassCollision = opts.bypassCollision || false;
		this.slience = opts.slience || false;
	}

	parseMessages(messages) {
		let messageKeys = Object.keys(messages);

		if(messageKeys.length > 0) {
			let cMessages = messageKeys.map(v => {
				let name = this.fieldNames.hasOwnProperty(v) ? this.fieldNames[v] : v;

				return `'${name}' ${messages[v]}`;
			});

			if(this.slience) {
				return cMessages;
			} else {
				alert(cMessages.join('\n'));
			}

			return false;
		}

		return true;
	}

	validateAll(values, oldValues = {}) {
		let messages = {};

		for(let field in this.rules) {
			let rules = this.rules[field];

			for(let i in rules) {
				let args = rules[i];

				if(i === 'confirm') {
					args = values[args];
				}

				let result = this.validate(values[field], i, args, oldValues[field]);

				if(result !== true) {
					messages[field] = result;
					break;
				}
			}
		}

		return this.parseMessages(messages);
	}

	async validateAllAsync(values, oldValues = {}) {
		let messages = {};

		for(let field in this.rules) {
			let rules = this.rules[field];

			for(let i in rules) {
				let args = rules[i];

				if(i === 'confirm') {
					args = values[args];
				}
				
				let result = await this.validateAsync(values[field], field, i, args, oldValues[field], values, oldValues);

				if(result !== true) {
					messages[field] = result;
					break;
				}
			}
		}

		return this.parseMessages(messages);
	}

	validate(value, rule, args, oldValue) {
		let r, m;

		switch(rule) {
			case 'maxLength': r = value.length <= args; break;
			case 'minLength': r = value.length >= args; break;
			case 'number': r = /^\-?\d+$/.test(value); break;
			case 'required': r = value !== '' && value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0); break;
			case 'confirm': r = value === args;  break;
			case 'regex': r = args[0].test(value); break;
			case 'regexNotEmpty': r = value !== '' ? args[0].test(value) : true; break;
			case 'min': r = value >= args; break;
			case 'max': r = value <= args; break;
			case 'function': r = args[0](value, oldValue); break;
			default: r = true; console.warn(`Warning: Validator rule name \'${rule}\' is invaild`); break;
		}

		if(r === true)
			return r;

		switch(rule) {
			case 'maxLength': m = `은(는) 최대 ${args}자 까지 입력가능합니다.`; break;
			case 'minLength': m = `은(는) 최소 ${args}자를 입력해야합니다.`; break;
			case 'number': m = `은(는) 숫자를 입력해야합니다.`; break;
			case 'required': m = `은(는) 필수 입력 값입니다.`; break;
			case 'confirm': m = `은(는) 확인과 일치해야 합니다.`; break;
			case 'regex': case 'regexNotEmpty': m = `은(는) ${args[1]}`; break;
			case 'min': m = `은(는) ${args}보다 커야 합니다.`; break;
			case 'max': m = `은(는) ${args}보다 작아야 합니다.`; break;
			case 'function': m = `은(는) ${args[1]}`; break;
		}

		return m;
	}

	async validateAsync(value, key, rule, args, oldValue, values, oldValues) {
		if(rule === 'collision') {
			if(this.bypassCollision === true)
				return true;
			
			const ajaxValues = $.extend(true, {}, values);

			for(const i in oldValues) {
				ajaxValues[i + '_old'] = oldValues[i] || '';
			}

			const ajax = await $.post(args, ajaxValues);

			if(ajax.result === null)
				return true;

			return `은(는) 이미 사용중입니다.`;
		} else if(rule === 'function') {
			const r = await args[0](value, oldValue);

			if(r === true)
				return r;

			return `은(는) ${args[1]}`;
		} else {
			return this.validate(value, rule, args);
		}
	}
}

const VALIDATOR_ID_REGEX_RULE = [/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, '이메일 형식이어야 합니다.'];
const VALIDATOR_PW_REGEX_RULE = [/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~`!@#$%\^&*()-+=]).{9,20}$/, '영문, 숫자, 특수문자 조합 9~20자 이어야 합니다.'];
const VALIDATOR_GCODE_REGEX_RULE = [/^[a-z]{1,5}$/, '영어 소문자로 최대 5자까지 입력가능 합니다.'];
const VALIDATOR_CODE_REGEX_RULE = [/^[a-z]{3}[0-9]{2}$/, '영어 소문자 3자리 + 숫자 2자리로 구성되어야합니다.'];
const VALIDATOR_URL_REGEX_RULE = [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, '올바른 URL이 아닙니다.'];
const VALIDATOR_DATE_REGEX_RULE = [/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, '올바른 날짜 형식이 아닙니다.'];
const VALIDATOR_PHONE_REGEX_RULE = [/^\d{3}\-\d{3,4}\-\d{4}$/, '올바른 전화번호 형식이 아닙니다.(000-000*-0000)'];
const VALIDATOR_ZIP_FILE_REGEX_RULE = [/^.*\.(zip|ZIP)$/, 'ZIP 파일이 아닙니다.'];
const VALIDATOR_CSV_FILE_REGEX_RULE = [/^.*\.(csv|CSV)$/, 'CSV 파일이 아닙니다.'];
const VALIDATOR_XLSX_FILE_REGEX_RULE = [/^.*\.(xlsx|XLSX)$/, 'XLSX 파일이 아닙니다.'];
 
export {
	Validator as default,
	Validator,
	VALIDATOR_ID_REGEX_RULE,
	VALIDATOR_PW_REGEX_RULE,
	VALIDATOR_GCODE_REGEX_RULE,
	VALIDATOR_CODE_REGEX_RULE,
	VALIDATOR_URL_REGEX_RULE,
	VALIDATOR_DATE_REGEX_RULE,
	VALIDATOR_PHONE_REGEX_RULE,
	VALIDATOR_ZIP_FILE_REGEX_RULE,
	VALIDATOR_CSV_FILE_REGEX_RULE,
	VALIDATOR_XLSX_FILE_REGEX_RULE
}