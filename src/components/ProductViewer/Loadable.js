/**
 *
 * Asynchronously loads the component for ProductViewer
 *
 */

import loadable from '../../utils/loadable';

export default loadable(() => import('./index'), true);
