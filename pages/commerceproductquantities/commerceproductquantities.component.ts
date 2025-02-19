import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceproductquantityService } from '../../services/commerceproductquantity.service';
import { Commerceproductquantity } from '../../interfaces/commerceproductquantity.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceproductquantityFormComponents } from '../../formcomponents/commerceproductquantity.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './commerceproductquantities.component.html',
	styleUrls: ['./commerceproductquantities.component.scss'],
	standalone: false
})
export class CommerceproductquantitiesComponent {
	columns = ['name', 'code', 'quantity'];

	store = this._router.url.includes('/store/')
		? this._router.url.split('/')[3]
		: '';

	warehouse = this._router.url.includes('/warehouse/')
		? this._router.url.split('/')[3]
		: '';

	product = this._router.url.includes('/product/')
		? this._router.url.split('/')[3]
		: '';

	form: FormInterface = this._form.getForm(
		'commerceproductquantity',
		commerceproductquantityFormComponents
	);

	config = {
		paginate: this.setProductquantity.bind(this),
		perPage: 20,
		setPerPage: this._commerceproductquantityService.setPerPage.bind(
			this._commerceproductquantityService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Commerceproductquantity>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.product) {
						(created as Commerceproductquantity).product =
							this.product;
					}

					if (this.store) {
						(created as Commerceproductquantity).store = this.store;
					}

					if (this.warehouse) {
						(created as Commerceproductquantity).warehouse =
							this.warehouse;
					}

					this._commerceproductquantityService.create(
						created as Commerceproductquantity
					);

					this.setProductquantity();

					close();
				}
			});
		},
		update: (doc: Commerceproductquantity): void => {
			this._form
				.modal<Commerceproductquantity>(this.form, [], doc)
				.then((updated: Commerceproductquantity) => {
					this._core.copy(updated, doc);

					this._commerceproductquantityService.update(doc);
				});
		},
		delete: (doc: Commerceproductquantity): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceproductquantity?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceproductquantityService.delete(doc);

							this.setProductquantity();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceproductquantity): void => {
					this._form.modalUnique<Commerceproductquantity>(
						'commerceproductquantity',
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

	rows: Commerceproductquantity[] = [];

	private _page = 1;

	setProductquantity(page = this._page) {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._commerceproductquantityService
					.get({ page, query: 'product=' + this.product })
					.subscribe((products) => {
						this.rows.splice(0, this.rows.length);

						this.rows.push(...products);
					});
			},
			250
		);
	}

	constructor(
		private _translate: TranslateService,
		private _commerceproductquantityService: CommerceproductquantityService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setProductquantity();
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceproductquantity>(create ? [] : this.rows)
				.then((commerceproductquantitys: Commerceproductquantity[]) => {
					if (create) {
						for (const commerceproductquantity of commerceproductquantitys) {
							if (this.product) {
								commerceproductquantity.product = this.product;
							}

							if (this.store) {
								commerceproductquantity.store = this.store;
							}

							if (this.warehouse) {
								commerceproductquantity.warehouse =
									this.warehouse;
							}

							this._commerceproductquantityService.create(
								commerceproductquantity
							);

							this.setProductquantity();
						}
					} else {
						for (const commerceproductquantity of this.rows) {
							if (
								!commerceproductquantitys.find(
									(localCommerceproductquantity) =>
										localCommerceproductquantity._id ===
										commerceproductquantity._id
								)
							) {
								this._commerceproductquantityService.delete(
									commerceproductquantity
								);

								this.setProductquantity();
							}
						}

						for (const commerceproductquantity of commerceproductquantitys) {
							const localCommerceproductquantity = this.rows.find(
								(localCommerceproductquantity) =>
									localCommerceproductquantity._id ===
									commerceproductquantity._id
							);

							if (localCommerceproductquantity) {
								this._core.copy(
									commerceproductquantity,
									localCommerceproductquantity
								);

								this._commerceproductquantityService.update(
									localCommerceproductquantity
								);
							} else {
								if (this.product) {
									commerceproductquantity.product =
										this.product;
								}
								if (this.store) {
									commerceproductquantity.store = this.store;
								}
								if (this.warehouse) {
									commerceproductquantity.warehouse =
										this.warehouse;
								}
								commerceproductquantity.__created = false;

								this._commerceproductquantityService.create(
									commerceproductquantity
								);

								this.setProductquantity();
							}
						}
					}
				});
		};
	}
}
