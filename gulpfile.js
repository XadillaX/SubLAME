var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rm = require('gulp-rm');

var path = {
    "sublame_css": ["./css/*.css"],
    "sublame_app": ["./js/*.js"],

    // codemirror
    "codemirror_themes": ["./vendor/codemirror/theme/*.css"],
    "codemirror_themes_concat": "./vendor/codemirror/theme/themes.css"
};

gulp.task('concat-css', function () {
    gulp.src(path.sublame_css)
	.pipe(concat('all.css'))
	.pipe(gulp.dest('./css'));
});

gulp.task('concat-cm-themes', function () {
    gulp.src(path.codemirror_themes_concat)
	.pipe(rm({async: false}));

    gulp.src(path.codemirror_themes)
	.pipe(concat('themes.css'))
	.pipe(gulp.dest('./vendor/codemirror/theme'))
});

gulp.task('default', []);
