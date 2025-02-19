import { Component } from '@angular/core';
import { AlertService, CoreService, MongoService } from 'wacom';
import { CommerceproductService } from '../../services/commerceproduct.service';
import { Commerceproduct } from '../../interfaces/commerceproduct.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceproductFormComponents } from '../../formcomponents/commerceproduct.formcomponents';
import { Router } from '@angular/router';
import { Commercetag } from 'src/app/modules/commerce/interfaces/commercetag.interface';
import { CommercetagService } from 'src/app/modules/commerce/services/commercetag.service';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commerceproducts.component.html',
	styleUrls: ['./commerceproducts.component.scss'],
	standalone: false
})
export class CommerceproductsComponent {
	tags: Commercetag[] = [];
	columns = ['name', 'tags'];

	commerce = this._router.url.includes('/commerce/commerceproducts/')
		? this._router.url.replace('/commerce/commerceproducts/', '')
		: environment.commerceId || '';

	form: FormInterface = this._form.getForm('commerceproduct', {
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
						value: 'fill commerceproduct title'
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
						value: 'fill commerceproduct description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			},
			{
				name: 'Text',
				key: 'country',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct country'
					},
					{
						name: 'Label',
						value: 'Country'
					}
				]
			},
			{
				name: 'Number',
				key: 'volume',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct volume'
					},
					{
						name: 'Label',
						value: 'Volume'
					}
				]
			},
			{
				name: 'Number',
				key: 'weight',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct weight'
					},
					{
						name: 'Label',
						value: 'Weight'
					}
				]
			},
			{
				name: 'Text',
				key: 'battery',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct battery'
					},
					{
						name: 'Label',
						value: 'Battery'
					}
				]
			},
			{
				name: 'Text',
				key: 'power',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct power'
					},
					{
						name: 'Label',
						value: 'Power'
					}
				]
			},
			{
				name: 'Text',
				key: 'atomizerType',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct atomizerType'
					},
					{
						name: 'Label',
						value: 'AtomizerType'
					}
				]
			},
			{
				name: 'Text',
				key: 'warranty',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct warranty'
					},
					{
						name: 'Label',
						value: 'Warranty'
					}
				]
			},
			{
				name: 'Text',
				key: 'type',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct type'
					},
					{
						name: 'Label',
						value: 'Type'
					}
				]
			},
			{
				name: 'Number',
				key: 'price',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill commerceproduct price'
					},
					{
						name: 'Label',
						value: 'Price'
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
			},
			{
				name: 'Select',
				key: 'tags',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill product tag'
					},
					{
						name: 'Label',
						value: 'Tag'
					},
					{
						name: 'Multiple',
						value: true
					},
					{
						name: 'Items',
						value: this.tags
					}
				]
			}
		]
	});

	config = {
		paginate: this.setProducts.bind(this),
		perPage: 20,
		setPerPage: this._commerceproductService.setPerPage.bind(
			this._commerceproductService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Commerceproduct>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commerceproduct).commerce = this.commerce;
					}
					this._commerceproductService.create(
						created as Commerceproduct
					);
					this.setProducts();
					close();
				}
			});
		},
		update: (doc: Commerceproduct): void => {
			this._form
				.modal<Commerceproduct>(this.form, [], doc)
				.then((updated: Commerceproduct) => {
					this._core.copy(updated, doc);
					this._commerceproductService.update(doc);
				});
		},
		delete: (doc: Commerceproduct): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceproduct?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceproductService.delete(doc);
							this.setProducts();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: '1x_mobiledata',
				hrefFunc: (doc: Commerceproduct): string => {
					return (
						'/commerce/commerceproductquantities/product/' + doc._id
					);
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Commerceproduct): void => {
					this._form.modalUnique<Commerceproduct>(
						'commerceproduct',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Commerceproduct[] = [];
	private _page = 1;

	constructor(
		private _tagService: CommercetagService,
		private _translate: TranslateService,
		private _commerceproductService: CommerceproductService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setTags();
	}

	setProducts(page = this._page) {
		this._page = page;
		this._core.afterWhile(
			this,
			() => {
				this._commerceproductService
					.get({ page })
					.subscribe((products) => {
						this.rows = products;
					});
			},
			250
		);
	}

	getTags(product: Commerceproduct): string {
		return (
			product.tags
				?.map(
					(tagId) => this.tags.find((tag) => tag._id === tagId)?.name
				)
				.filter((tagName) => tagName)
				.join(', ') || 'No tags'
		);
	}

	tagIncludeCommerce(tag: Commercetag) {
		if (tag.commerce === this.commerce) return true;
		return false;
	}

	tagName(tag: Commercetag) {
		let name = tag.name;
		while (tag.parent) {
			tag = this._tagService.doc(tag.parent);
			name = tag.name + ' / ' + name;
		}
		return name;
	}

	setTags() {
		this.tags.splice(0, this.tags.length);
		for (const tag of this._tagService.commercetags) {
			if (this.tagIncludeCommerce(tag)) {
				this.tags.push({
					...tag,
					name: this.tagName(tag)
				});
			}
		}
		this.tags.sort((a, b) => {
			if (a.name < b.name) {
				return -1; // a comes first
			} else if (a.name > b.name) {
				return 1; // b comes first
			} else {
				return 0; // no sorting necessary
			}
		});
		this.setProducts();
	}

	replaceTagsWithIds(product: Commerceproduct) {
		if (product.tags) {
			product.tags = product.tags.map((tagName) => {
				const tag = this.tags.find((t) => t.name == tagName);
				return tag ? tag._id : tagName;
			});
		}
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceproduct>(create ? [] : this.rows)
				.then((commerceproducts: Commerceproduct[]) => {
					if (create) {
						console.log(commerceproducts);

						for (const commerceproduct of commerceproducts) {
							if (this.commerce) {
								commerceproduct.commerce = this.commerce;
							}

							this.replaceTagsWithIds(commerceproduct);
							this._commerceproductService.create(
								commerceproduct
							);
						}
					} else {
						for (const commerceproduct of this.rows) {
							if (
								!commerceproducts.some(
									(local) => local._id === commerceproduct._id
								)
							) {
								this._commerceproductService.delete(
									commerceproduct
								);
							}
						}

						for (const commerceproduct of commerceproducts) {
							const local = this.rows.find(
								(row) => row._id === commerceproduct._id
							);
							if (local) {
								this.replaceTagsWithIds(commerceproduct);
								this._core.copy(commerceproduct, local);
								this._commerceproductService.update(local);
							} else {
								if (this.commerce) {
									commerceproduct.commerce = this.commerce;
								}
								this.replaceTagsWithIds(commerceproduct);
								commerceproduct.__created = false;
								this._commerceproductService.create(
									commerceproduct
								);
							}
						}
					}
					this.setProducts();
				});
		};
	}
}
