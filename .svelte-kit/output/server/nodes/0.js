

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B3aPAXtN.js","_app/immutable/chunks/scheduler.B4houzoZ.js","_app/immutable/chunks/index.DlrXzjOH.js"];
export const stylesheets = [];
export const fonts = [];
