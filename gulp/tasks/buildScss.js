/* global app */

export const buildScss = () => app.gulp.src(app.path.src.scss)
    .pipe(app.gulp.dest(app.path.build.files));
