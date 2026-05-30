import lapikitConfig from 'eslint-config-lapikit';

export default [
	...lapikitConfig, // first
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					// your custom options here
				}
			]
		}
	}
];
