export const commerceproductFormComponents = {
	formId: 'commerceproduct',
	title: 'Commerceproduct',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct title',
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
					value: 'fill commerceproduct description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		},
		{
			name: 'Select',
			key: 'tags',
			fields: [
				{
					name: 'Placeholder',
					value: 'Select tags',
				},
				{
					name: 'Label',
					value: 'Tags',
				},
				{
					name: 'Multiple',
					value: true
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Text',
			key: 'country',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct country',
				},
				{
					name: 'Label',
					value: 'Country',
				}
			]
		},
		{
			name: 'Number',
			key: 'volume',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct volume',
				},
				{
					name: 'Label',
					value: 'Volume',
				}
			]
		},
		{
			name: 'Number',
			key: 'weight',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct weight',
				},
				{
					name: 'Label',
					value: 'Weight',
				}
			]
		},
		{
			name: 'Text',
			key: 'battery',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct battery',
				},
				{
					name: 'Label',
					value: 'Battery',
				}
			]
		},		{
			name: 'Text',
			key: 'power',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct power',
				},
				{
					name: 'Label',
					value: 'Power',
				}
			]
		},		{
			name: 'Text',
			key: 'atomizerType',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct atomizerType',
				},
				{
					name: 'Label',
					value: 'AtomizerType',
				}
			]
		},		{
			name: 'Text',
			key: 'warranty',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct warranty',
				},
				{
					name: 'Label',
					value: 'Warranty',
				}
			]
		},		{
			name: 'Text',
			key: 'type',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct type',
				},
				{
					name: 'Label',
					value: 'Type',
				}
			]
		},
		{
			name: 'Number',
			key: 'price',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill commerceproduct price',
				},
				{
					name: 'Label',
					value: 'Price',
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
		},
		{
			name: 'Photos',
			key: 'thumbs',
			fields: [
				{
					name: 'Label',
					value: 'Detailed pictures'
				}
			]
		}
	]
}
