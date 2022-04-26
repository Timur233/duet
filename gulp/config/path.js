import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());
const srcFolder = './assets';
const buildFolder = './dist';

export const path = {
    build: {
        files: `${buildFolder}/`,
    },
    src: {
        files: `${srcFolder}/**/*.*`,
        scss:  `${srcFolder}/scss/**/*.*`,
    },
    watch: {
        files: `${srcFolder}/**/*.*`,
        scss:  `${srcFolder}/scss/**/*.*`,
    },
    clean: buildFolder,
    buildFolder,
    srcFolder,
    rootFolder,
    ftp:   '',
};
