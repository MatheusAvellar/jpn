import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		} as any),
		vanillaExtractPlugin()
	],
	server: {
		allowedHosts: ["lh"],
	},
})
