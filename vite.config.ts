// import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
        @use "sass:math";
        `
			}
		}
	}
})

