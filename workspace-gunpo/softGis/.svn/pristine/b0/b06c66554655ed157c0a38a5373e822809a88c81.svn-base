let __instance__;

class Loading {
	constructor() {
		if(__instance__) return __instance__;

		this.isAttached = false;

		this.$el = $(`
			<div class="loading">
				<div class="loading-overlay"></div>
				<div class="loading-wrapper">
					<div class="loading-icon-wrapper">
						<svg class="loading-svg" viewBox="25 25 50 50">
							<circle class="loading-path" cx="50" cy="50" r="20" fill="none" stroke="#fff" stroke-width="3.5" />
						</svg>
						<div class="loading-text">Loading...</div>
					</div>
				</div>
			</div>
		`);

		__instance__ = this;
	}
	
	show(glob = false) {
		if(!this.isAttached) {
			this.setText('Loading...');

			this.$el[glob ? 'addClass' : 'removeClass']('loading-global');
			this.$el.appendTo(glob ? 'body' : '#wrap .ctn');
		}

		$(':focus').blur();

		this.isAttached = true;
	}

	showGlobal() {
		this.show(true);
	}
	
	hide() {
		if(this.isAttached) {
			this.$el.remove();
		}
		
		this.isAttached = false;
	}

	setText(text) {
		this.$el.find('.loading-text').text(text);
	}
}

class LoadingPromise extends Promise {
	constructor(arg) {
		const isDeferred = (arg.promise);

		if(isDeferred) {
			arg = arg.promise();

			if(!arg.finally)
				arg.finally = arg.always;
		}

		if(arg instanceof Promise || isDeferred) {
			const loading = new Loading;

			loading.show();

			super((resolve, reject) => {
				arg.finally(() => loading.hide())
				   .then(resolve)
				   .catch(reject);
			});
		} else {
			super(arg);
		}
	}

	static call(method, ...args) {
		const loading = new Loading;

		loading.show();

		return Promise[method](...args).finally(v => {
			loading.hide();
		});
	}

	static all(queue) {
		return this.call('all', queue);
	}

	static race(queue) {
		return this.call('race', queue);
	}
}

const LoadingInstance = new Loading();

export {
	LoadingInstance as default,
	Loading,
	LoadingInstance,
	LoadingPromise
};