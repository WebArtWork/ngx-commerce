import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceportfolioService } from '../../services/commerceportfolio.service';
import { Commerceportfolio } from '../../interfaces/commerceportfolio.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceportfolioFormComponents } from '../../formcomponents/commerceportfolio.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './commerceportfolios.component.html',
	styleUrls: ['./commerceportfolios.component.scss'],
	standalone: false
})
export class CommerceportfoliosComponent {
	columns = ['name', 'description'];

	commerce = this._router.url.includes('/commerceportfolios/')
		? this._router.url.replace('/commerceportfolios/', '')
		: '';

	form: FormInterface = this._form.getForm(
		'commerceportfolio',
		commerceportfolioFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commerceportfolio>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commerceportfolio).commerce = this.commerce;
					}
					this._commerceportfolioService.create(
						created as Commerceportfolio
					);

					close();
				}
			});
		},
		update: (doc: Commerceportfolio): void => {
			this._form
				.modal<Commerceportfolio>(this.form, [], doc)
				.then((updated: Commerceportfolio) => {
					this._core.copy(updated, doc);

					this._commerceportfolioService.update(doc);
				});
		},
		delete: (doc: Commerceportfolio): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerceportfolio?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceportfolioService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commerceportfolio): void => {
					this._form.modalUnique<Commerceportfolio>(
						'commerceportfolio',
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

	get rows(): Commerceportfolio[] {
		return this._commerceportfolioService.commerceportfolios;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceportfolioService: CommerceportfolioService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerceportfolio>(create ? [] : this.rows)
				.then((commerceportfolios: Commerceportfolio[]) => {
					if (create) {
						for (const commerceportfolio of commerceportfolios) {
							if (this.commerce) {
								commerceportfolio.commerce = this.commerce;
							}
							this._commerceportfolioService.create(
								commerceportfolio
							);
						}
					} else {
						for (const commerceportfolio of this.rows) {
							if (
								!commerceportfolios.find(
									(localCommerceportfolio) =>
										localCommerceportfolio._id ===
										commerceportfolio._id
								)
							) {
								this._commerceportfolioService.delete(
									commerceportfolio
								);
							}
						}

						for (const commerceportfolio of commerceportfolios) {
							const localCommerceportfolio = this.rows.find(
								(localCommerceportfolio) =>
									localCommerceportfolio._id ===
									commerceportfolio._id
							);

							if (localCommerceportfolio) {
								this._core.copy(
									commerceportfolio,
									localCommerceportfolio
								);

								this._commerceportfolioService.update(
									localCommerceportfolio
								);
							} else {
								if (this.commerce) {
									commerceportfolio.commerce = this.commerce;
								}
								commerceportfolio.__created = false;

								this._commerceportfolioService.create(
									commerceportfolio
								);
							}
						}
					}
				});
		};
	}
}
