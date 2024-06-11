import * as universal from '../entries/pages/usersProfile/_Id_/_page.js';
import * as server from '../entries/pages/usersProfile/_Id_/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/usersProfile/_Id_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/usersProfile/[Id]/+page.js";
export { server };
export const server_id = "src/routes/usersProfile/[Id]/+page.server.js";
export const imports = ["_app/immutable/nodes/8.CJlAHTeR.js","_app/immutable/chunks/scheduler.B4houzoZ.js","_app/immutable/chunks/index.DlrXzjOH.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
