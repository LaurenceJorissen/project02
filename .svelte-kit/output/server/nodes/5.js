

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.HhaZCqsI.js","_app/immutable/chunks/scheduler.B4houzoZ.js","_app/immutable/chunks/index.DlrXzjOH.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/supabase.DztQxiPM.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = [];
export const fonts = [];
