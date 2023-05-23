
class Chart {
	constructor($el, opts = {}) {
		this.$el = $el;

		this.title = opts.title || '';
		this.desc = opts.desc || '';

		this.x = opts.x;
		this.y = opts.y;
		this.type = opts.type;
		this.data = opts.data;

		this.yNames = opts.yNames || [];

		this.kendoChartOption = opts.kendoChartOption;

		this.init();
	}

	get chart() {
		return this.$el.data('kendoChart');
	}

	init() {
		this.$el.kendoChart();

		this.refresh();

		return this;
	}

	refresh() {
		this.chart.setOptions(this.getKendoChartOption());
	}

	getKendoChartOption() {
		let chartRendered = false;

		const kendoChartOption = {
			transitions: false,
			dataSource: this.data,
			title: {
				text: this.title + '\n' + this.desc,
				font: '700 24px "Noto Sans KR", sans-serif',
				color: '#000000'
			},
			legend: {
				labels: {
					font: '400 16px "Noto Sans KR", sans-serif'
				}
			},
			seriesDefaults: {
				type: this.type
			},
			seriesColors: Constant.KENDO_DEFAULT_CHART_COLORS,
			series: this.y.map((y) => {
				return {
					field: y,
					name: this.yNames[y] || y,
					categoryField: this.x
				};
			}),
			valueAxis: {
				name: 'y-value',
				labels: {
					font: '300 14px "Noto Sans KR", sans-serif'
				}
			},
			categoryAxis: [{
				visible: false,
				name: 'x-series'
			}, {
				name: 'x-labels',
				field: this.x,
				labels: {
					font: '300 14px "Noto Sans KR", sans-serif',
					rotation: -45
				}
			}],
			tooltip: {
				visible: true,
				template: "#= category # (#= series.name #): #= value #"
			},
			render: (e) => {
				const $title = e.sender.element.find('text').filter((v, el) => $(el).text().trim() === this.title.trim()).first();
				const $desc = $title.siblings();

				$desc.attr({ 'x': '50%', 'text-anchor': 'middle' });
				$desc.css({ fontSize: '16px', fontWeight: '400' });

				if(!chartRendered) {
					chartRendered = true;

					const _chart = this.$el.data('kendoChart');
					const yAxis = _chart.getAxis('y-value');
					const yRange = yAxis.range();

					_chart.setOptions({
						valueAxis: {
							axisCrossingValue: [0, yRange.min]
						}
					});
				}
			}
		};

		return $.extend(true, {}, kendoChartOption, this.kendoChartOption);
	}
}

export {
	Chart as default,
	Chart
};