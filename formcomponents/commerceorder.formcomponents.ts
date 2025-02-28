export const commerceorderFormComponents = {
	formId: 'commerceorder',
	title: 'Commerceorder',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceorder title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceorder description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		}
	]
};
