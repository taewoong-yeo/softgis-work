let __instance__;

class Aside {
	constructor() {
		if(__instance__) return __instance__;

		__instance__ = this;
	}

	init() {
		this.$el = $('.aside');
		this.setupEvent();
	}

	setupEvent() {
		const self = this;

		this.$el.on('click', '.aside-nav-toggler', function(e) {
			e.preventDefault();

			const $this = $(this);

			$this.siblings().removeClass('active');
			$this.toggleClass('active');

			closeModal();
		});

		this.$el.on('click', '.aside-overlay', function() {
			closeModal();
		});

		this.$el.on('click', '.aside-nav li a', function(e) {
			const $this = $(this);
			const $other = $('.aside-nav li a').not($this);

			if($this.next('ul').length > 0) {
				e.preventDefault();

				$other.removeClass('active');
				$this.toggleClass('active');

				self.$el[$this.hasClass('active') ? 'addClass' : 'removeClass']('aside-modal');
			}
		});

		function closeModal() {
			self.$el.find('.aside-nav li a').removeClass('active');
			self.$el.removeClass('aside-modal');
		}
	}
}

export default new Aside;