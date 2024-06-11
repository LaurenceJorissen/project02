import * as universal from '../entries/pages/frontpage/_page.js';
import * as server from '../entries/pages/frontpage/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/frontpage/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/frontpage/+page.js";
export { server };
export const server_id = "src/routes/frontpage/+page.server.js";
export const imports = ["_app/immutable/nodes/3.rimDz7I2.js","_app/immutable/chunks/scheduler.B4houzoZ.js","_app/immutable/chunks/index.DlrXzjOH.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.CV1gxh0y.js"];
export const stylesheets = [];
export const fonts = [];
