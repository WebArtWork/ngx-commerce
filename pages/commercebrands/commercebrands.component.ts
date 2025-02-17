import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercebrandService } from '../../services/commercebrand.service';
import { Commercebrand } from '../../interfaces/commercebrand.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercebrandFormComponents } from '../../formcomponents/commercebrand.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './commercebrands.component.html',
	styleUrls: ['./commercebrands.component.scss'],
	standalone: false
})
export class CommercebrandsComponent {
	columns = ['name', 'description'];

	commerce = this._router.url.includes('/commerce/commercebrands/')
		? this._router.url.replace('/commerce/commercebrands/', '')
		: '';

	form: FormInterface = this._form.getForm(
		'commercebrand',
		commercebrandFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commercebrand>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commercebrand).commerce = this.commerce;
					}
					this._commercebrandService.create(created as Commercebrand);

					close();
				}
			});
		},
		update: (doc: Commercebrand): void => {
			this._form
				.modal<Commercebrand>(this.form, [], doc)
				.then((updated: Commercebrand) => {
					this._core.copy(updated, doc);

					this._commercebrandService.update(doc);
				});
		},
		delete: (doc: Commercebrand): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercebrand?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercebrandService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercebrand): void => {
					this._form.modalUnique<Commercebrand>(
						'commercebrand',
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

	get rows(): Commercebrand[] {
		return this._commercebrandService.commercebrands;
	}

	constructor(
		private _translate: TranslateService,
		private _commercebrandService: CommercebrandService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercebrand>(create ? [] : this.rows)
				.then((commercebrands: Commercebrand[]) => {
					if (create) {
						for (const commercebrand of commercebrands) {
							if (this.commerce) {
								commercebrand.commerce = this.commerce;
							}
							this._commercebrandService.create(commercebrand);
						}
					} else {
						for (const commercebrand of this.rows) {
							if (
								!commercebrands.find(
									(localCommercebrand) =>
										localCommercebrand._id ===
										commercebrand._id
								)
							) {
								this._commercebrandService.delete(
									commercebrand
								);
							}
						}

						for (const commercebrand of commercebrands) {
							const localCommercebrand = this.rows.find(
								(localCommercebrand) =>
									localCommercebrand._id === commercebrand._id
							);

							if (localCommercebrand) {
								this._core.copy(
									commercebrand,
									localCommercebrand
								);

								this._commercebrandService.update(
									localCommercebrand
								);
							} else {
								if (this.commerce) {
									commercebrand.commerce = this.commerce;
								}
								commercebrand.__created = false;

								this._commercebrandService.create(
									commercebrand
								);
							}
						}
					}
				});
		};
	}
}
