var gulp = require('gulp'),
	hash = require('hash-files'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace');

// Hash Eight

function hashEight(files) {
	return hash.sync({
		files: files
	}).substring(0, 8);
}

// Cache

gulp.task('cache', function() {
	gulp.src('dest/**/*.html')
		.pipe(replace(
			/(<link rel="stylesheet" href="\/styles\/)(screen)(\.css">)/g,
			'$1' + hashEight(['dest/styles/screen.css']) + '$3'
		))
		.pipe(replace(
			/(<script src="\/scripts\/)(script)(\.js">)/g,
			'$1' + hashEight(['dest/scripts/script.js']) + '$3'
		))
		.pipe(gulp.dest('dest'));

	gulp.src('dest/styles/screen.css')
		.pipe(rename(function(path) {
			path.basename = hashEight(['dest/styles/screen.css'])
		}))
		.pipe(gulp.dest('dest/styles'));

	gulp.src('dest/scripts/script.js')
		.pipe(rename(function(path) {
			path.basename = hashEight(['dest/scripts/script.js'])
		}))
		.pipe(gulp.dest('dest/scripts'));
});
