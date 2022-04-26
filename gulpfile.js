import gulp from 'gulp';
import { path } from './gulp/config/path';

import { copy } from './gulp/tasks/copy';
import { reset } from './gulp/tasks/reset';

global.app = {
    path,
    gulp,
};

function watcher() {
    gulp.watch(path.watch.files, copy);
}

const dev = gulp.series(reset, copy, watcher);

gulp.task('default', dev);
