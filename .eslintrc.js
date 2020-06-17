
module.exports = {
	env: {
		browser: false,
		es6: true
	},
	extends: [
		"eslint:recommended"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
		require: "readonly",
		process: "readonly",
		console: "readonly",
		__dirname: "readonly",
		module: "readonly",
		Buffer: "readonly",
		describe: "readonly",
		it: "readonly",
		global: "readonly"
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module"
	},
	plugins: [],
	rules: {
		"no-console": 0,
		"indent": [
			"warn",
			"tab",
			{
				"SwitchCase": 1,
				"ignoredNodes": [],
				"outerIIFEBody": 0,
				"MemberExpression": 1,
				"ArrayExpression": 1,
				"ObjectExpression": 1
			}
		],
		"no-undef": 2,
		"no-undefined": 0,
		"no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
		// "linebreak-style": ["error", "unix"],
		// quotes: ["error", "backtick"],
		"camelcase": [
			"error",
			{
				allow: []
			}
		],
		semi: [
			"error",
			"never"
		],
		"comma-dangle": 2,
		"comma-spacing": [
			"error",
			{
				before: false,
				after: true
			}
		]
		// "keyword-spacing": [
		//     "error",
		//     {
		//         before: true,
		//         after: true
		//     }
		// ],
	}
}