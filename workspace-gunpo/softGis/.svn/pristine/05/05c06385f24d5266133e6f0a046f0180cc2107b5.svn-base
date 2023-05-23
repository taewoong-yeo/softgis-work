class FormAjax {
	constructor($el, opts = {}) {
		if($el === undefined)
			throw new ReferenceError('Invaild form element');

		this.$el = $($el);
		this.$elInputs = {};

		this.url = opts.url || $el.attr('action');
		this.method = opts.method || $el.attr('method');
		this.ajaxOption = opts.ajaxOption || {};
		this.namePrefix = opts.namePrefix || '';
		this.fieldNames = opts.fieldNames || {};
		this.prependData = opts.prependData || {};
		this.overrideSubmitEvent = opts.overrideSubmitEvent !== undefined ? opts.overrideSubmitEvent : true;
		this.validator = opts.validator;

		this.valueMapping = $.extend({ use_stat: 'YN' }, opts.valueMapping);
		this.valueMapper = $.extend({ YN: v => v == true ? 'Y' : 'N', NULL: v => v === '' || v === null ? null : v }, opts.valueMapper);
		this.valueReverseMapper = $.extend({ YN: v => v === 'Y', NULL: v => v }, opts.valueReverseMapper)

		this.$el.find('input, select, textarea').each((i, el) => {
			const $el = $(el);
			const elName = $el.attr('name');
			const elId = $el.attr('id');

			if($el.is('input[type="radio"]')) {
				if(this.$elInputs.hasOwnProperty(elName))
					this.$elInputs[elName].push($el);
				else
					this.$elInputs[elName] = [$el];
			}

			if(!this.fieldNames.hasOwnProperty(elName)) {
				const $elLabel = this.$el.find(`label[for='${elId}']`);

				if($elLabel.length === 1)
					this.fieldNames[elName] = $elLabel.text();
			}

			this.$elInputs[elName] = $el;
		});

		this.$el.on('submit', async e => {
			e.preventDefault();
			
			if(this.overrideSubmitEvent)
				this.$el.trigger('submitAjax', [await this.submit()]);
		});
	}

	getUnPrefixName(name) {
		const prefixIdx = name.indexOf(this.namePrefix);
		const prefixName = prefixIdx === 0 ? name.slice(this.namePrefix.length) : name;

		return prefixName;
	}

	getPrefixName(name) {
		return this.namePrefix + name;
	}

	getMappingFormData(rawData) {
		const cvtData = {};

		for(let n in rawData) {
			const name = this.getUnPrefixName(n);

			let value = rawData[n];

			if(this.valueMapping.hasOwnProperty(n)) {
				const mapper = this.valueMapping[name];

				if(typeof mapper === 'string')
					value = this.valueMapper[mapper](value);
				else
					console.warn(`Warning: FormAjax value mapper for '${name}' is invalid`);
			}

			cvtData[name] = value;
		}

		return cvtData;
	}

	getReverseMappingFormData(cvtData) {
		const rawData = {};

		for(let name in cvtData) {
			let value = cvtData[name];

			if(this.valueMapping.hasOwnProperty(name)) {
				const mapper = this.valueMapping[name];

				if(typeof mapper === 'string')
					value = this.valueReverseMapper[mapper](value);
				else
					console.warn(`Warning: FormAjax value reverse mapper for '${name}' is invalid`);
			}

			if(value !== null) {
				rawData[name] = value;
			}
		}

		return rawData;
	}

	async submit() {
		const rawData = this.$el.serializeFlat();
		const cvtData = this.getMappingFormData(rawData);
		const oldData = this.getMappingFormData(this.prependData);
		
		if(this.validator !== undefined) {
			const fieldNamesUnPrefix = {};

			for(let i in this.fieldNames) {
				fieldNamesUnPrefix[this.getUnPrefixName(i)] = this.fieldNames[i];
			}

			this.validator.fieldNames = fieldNamesUnPrefix;

			if(!(await this.validator.validateAllAsync(cvtData, oldData)))
				return false;
		}
		
		return await $.ajax($.extend({}, {
			url: this.url,
			type: this.method,
			data: $.extend({}, oldData, cvtData)
		}, this.ajaxOption));
	}
}

export default FormAjax;