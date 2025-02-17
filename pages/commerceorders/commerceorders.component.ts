import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceorderService } from '../../services/commerceorder.service';
import { Commerceorder } from '../../interfaces/commerceorder.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceorderFormComponents } from '../../formcomponents/commerceorder.formcomponents';
import { Router } from '@angular/router';
import { Commerceproduct } from 'src/app/modules/commerce/interfaces/commerceproduct.interface';

@Component({
	templateUrl: './commerceorders.component.html',
	styleUrls: ['./commerceorders.component.scss'],
	standalone: false
})
export class CommerceordersComponent {
	columns = ['id', 'products', 'information', 'status'];

	commerce = this._router.url.includes('/commerce/commerceorders/')
		? this._router.url.replace('/commerce/commerceorders/', '')
		: '';

	form: FormInterface = this._form.getForm(
		'commerceorder',
		commerceorderFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commerceorder>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commerceorder).commerce = this.commerce;
					}
					this._commerceorderService.create(created as Commerceorder);

					close();
				}
			});
		},
		update: (doc: Commerceorder): void => {
			this._form
				.modal<Commerceorder>(this.form, [], doc)
				.then((updated: Commerceorder) => {
					this._core.copy(updated, doc);

					this._commerceorderService.update(doc);
				});
		},
		delete: (doc: Commerceorder): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceorder?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceorderService.delete(doc);
						}
					}
				]
			});
		}
		// buttons: [
		// 	{
		// 		icon: 'cloud_download',
		// 		click: (doc: Commerceorder): void => {
		// 			this._form.modalUnique<Commerceorder>('commerceorder', 'url', doc);
		// 		}
		// 	}
		// ],
		// headerButtons: [
		// 	{
		// 		icon: 'playlist_add',
		// 		click: this._bulkManagement(),
		// 		class: 'playlist',
		// 	},
		// 	{
		// 		icon: 'edit_note',
		// 		click: this._bulkManagement(false),
		// 		class: 'edit',
		// 	},
		// ]
	};
	setStatus(order: Commerceorder, status: string) {
		order.status = status;
		const newOrder = JSON.parse(JSON.stringify(order));
		newOrder.products.forEach(
			(product: {
				product: Commerceproduct | string;
				quantity: number;
				_id?: string;
				productquantity: { _id: string } | string;
			}) => {
				product.product = (product.product as Commerceproduct)._id;
				product.productquantity = (
					product.productquantity as { _id: string }
				)._id;
			}
		);
		this.update(newOrder);
	}

	update(order: Commerceorder) {
		this._commerceorderService.update(order);
	}

	get rows(): Commerceorder[] {
		return this._commerceorderService.commerceorders;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceorderService: CommerceorderService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceorder>(create ? [] : this.rows)
				.then((commerceorders: Commerceorder[]) => {
					if (create) {
						for (const commerceorder of commerceorders) {
							if (this.commerce) {
								commerceorder.commerce = this.commerce;
							}
							this._commerceorderService.create(commerceorder);
						}
					} else {
						for (const commerceorder of this.rows) {
							if (
								!commerceorders.find(
									(localCommerceorder) =>
										localCommerceorder._id ===
										commerceorder._id
								)
							) {
								this._commerceorderService.delete(
									commerceorder
								);
							}
						}

						for (const commerceorder of commerceorders) {
							const localCommerceorder = this.rows.find(
								(localCommerceorder) =>
									localCommerceorder._id === commerceorder._id
							);

							if (localCommerceorder) {
								this._core.copy(
									commerceorder,
									localCommerceorder
								);

								this._commerceorderService.update(
									localCommerceorder
								);
							} else {
								if (this.commerce) {
									commerceorder.commerce = this.commerce;
								}
								commerceorder.__created = false;

								this._commerceorderService.create(
									commerceorder
								);
							}
						}
					}
				});
		};
	}
}
