import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceserviceService } from '../../services/commerceservice.service';
import { Commerceservice } from '../../interfaces/commerceservice.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceserviceFormComponents } from '../../formcomponents/commerceservice.formcomponents';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commerceservices.component.html',
	styleUrls: ['./commerceservices.component.scss'],
	standalone: false
})
export class CommerceservicesComponent {
	columns = ['name', 'description'];

	commerce = this._router.url.includes('/commerce/commerceservices/')
		? this._router.url.replace('/commerce/commerceservices/', '')
		: environment.commerceId || '';

	form: FormInterface = this._form.getForm(
		'commerceservice',
		commerceserviceFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commerceservice>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commerceservice).commerce = this.commerce;
					}
					this._commerceserviceService.create(
						created as Commerceservice
					);

					close();
				}
			});
		},
		update: (doc: Commerceservice): void => {
			this._form
				.modal<Commerceservice>(this.form, [], doc)
				.then((updated: Commerceservice) => {
					this._core.copy(updated, doc);

					this._commerceserviceService.update(doc);
				});
		},
		delete: (doc: Commerceservice): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceserviceService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceservice): void => {
					this._form.modalUnique<Commerceservice>(
						'commerceservice',
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

	get rows(): Commerceservice[] {
		return this._commerceserviceService.commerceservices;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceserviceService: CommerceserviceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceservice>(create ? [] : this.rows)
				.then((commerceservices: Commerceservice[]) => {
					if (create) {
						for (const commerceservice of commerceservices) {
							if (this.commerce) {
								commerceservice.commerce = this.commerce;
							}
							this._commerceserviceService.create(
								commerceservice
							);
						}
					} else {
						for (const commerceservice of this.rows) {
							if (
								!commerceservices.find(
									(localCommerceservice) =>
										localCommerceservice._id ===
										commerceservice._id
								)
							) {
								this._commerceserviceService.delete(
									commerceservice
								);
							}
						}

						for (const commerceservice of commerceservices) {
							const localCommerceservice = this.rows.find(
								(localCommerceservice) =>
									localCommerceservice._id ===
									commerceservice._id
							);

							if (localCommerceservice) {
								this._core.copy(
									commerceservice,
									localCommerceservice
								);

								this._commerceserviceService.update(
									localCommerceservice
								);
							} else {
								if (this.commerce) {
									commerceservice.commerce = this.commerce;
								}
								commerceservice.__created = false;

								this._commerceserviceService.create(
									commerceservice
								);
							}
						}
					}
				});
		};
	}
}
