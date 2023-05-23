'use strict';

// Build Environment
let __ENV__ = 'development';

// Master Package
const { dest, src, watch, series, parallel } = require('gulp');

// Utility Package
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

// CSS Package
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const prefixCSS = require('gulp-autoprefixer');

// JS Package
const webpack = require('webpack-stream');
const webpackCompiler = require('webpack');
const webpackConfig = require('./webpack.config.js');

// Global Properties
const SRC_PREFIX = './src/';
const DIST_PREFIX = '../src/main/webapp/assets/';

// Tasks
function css() {
	const namingRule = (path) => { path.basename += '.bundle' }
	
	if(__ENV__ === 'production') {
		return src(SRC_PREFIX + 'sass/**/*.scss')
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(prefixCSS())
			.pipe(cleanCSS())
			.pipe(rename(namingRule))
			.pipe(dest(DIST_PREFIX + 'css'));
	} else if(__ENV__ === 'development') {
		return src(SRC_PREFIX + 'sass/**/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(prefixCSS())
			.pipe(cleanCSS())
			.pipe(rename(namingRule))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(DIST_PREFIX + 'css'));
	}
}

function js() {
	return src(SRC_PREFIX + 'js/app.js')
		.pipe(webpack(webpackConfig, webpackCompiler))
		.pipe(dest(DIST_PREFIX + 'js'));
}

function build() {
	if(__ENV__ == 'development') {
		delete webpackConfig['plugins'];
	}

	webpackConfig['mode'] = __ENV__;
	
	parallel(css, js)();

	if(__ENV__ == 'development') {
		watch(SRC_PREFIX + 'sass/**/*.scss', css);
		watch(SRC_PREFIX + 'js/**/*.js', js);
	}
}

exports.default = build;

exports.production = async function() {
	__ENV__ = 'production';

	build();
}