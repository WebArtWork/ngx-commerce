export const commercetagFormComponents = {
	formId: 'commercetag',
	title: 'Commercetag',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commercetag title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commercetag description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Label',
					value: 'Header picture'
				}

			]
		} 
	]
};
