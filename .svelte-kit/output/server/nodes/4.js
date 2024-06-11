

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CCR_HT0T.js","_app/immutable/chunks/scheduler.B4houzoZ.js","_app/immutable/chunks/index.DlrXzjOH.js","_app/immutable/chunks/supabase.DztQxiPM.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = [];
export const fonts = [];
