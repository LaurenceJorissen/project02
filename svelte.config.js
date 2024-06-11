import adapter from '@sveltejs/adapter-netlify';

export default {
	kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true
        })
    }
};