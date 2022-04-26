/* global app */
// eslint-disable-next-line import/no-extraneous-dependencies
import del from 'del';

export const reset = () => del(app.path.clean);
