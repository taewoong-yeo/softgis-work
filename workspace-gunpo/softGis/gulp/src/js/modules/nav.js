let __instance__;

class Nav {
	constructor() {
		if(__instance__) return __instance__;

		__instance__ = this;
	}

	init() {
		this.$el = $('.nav');
	}
}

export default new Nav;