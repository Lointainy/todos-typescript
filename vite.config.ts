import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
			{ find: '@bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap/scss') }
		]
	},
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

