import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercediscountService } from '../../services/commercediscount.service';
import { Commercediscount } from '../../interfaces/commercediscount.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercediscountFormComponents } from '../../formcomponents/commercediscount.formcomponents';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commercediscounts.component.html',
	styleUrls: ['./commercediscounts.component.scss'],
	standalone: false
})
export class CommercediscountsComponent {
	columns = ['name', 'description'];

	commerce = this._router.url.includes('/commerce/commercediscounts/')
		? this._router.url.replace('/commerce/commercediscounts/', '')
		: environment.commerceId || '';

	form: FormInterface = this._form.getForm(
		'commercediscount',
		commercediscountFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commercediscount>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commercediscount).commerce = this.commerce;
					}
					this._commercediscountService.create(
						created as Commercediscount
					);

					close();
				}
			});
		},
		update: (doc: Commercediscount): void => {
			this._form
				.modal<Commercediscount>(this.form, [], doc)
				.then((updated: Commercediscount) => {
					this._core.copy(updated, doc);

					this._commercediscountService.update(doc);
				});
		},
		delete: (doc: Commercediscount): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercediscount?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercediscountService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercediscount): void => {
					this._form.modalUnique<Commercediscount>(
						'commercediscount',
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

	get rows(): Commercediscount[] {
		return this._commercediscountService.commercediscounts;
	}

	constructor(
		private _translate: TranslateService,
		private _commercediscountService: CommercediscountService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercediscount>(create ? [] : this.rows)
				.then((commercediscounts: Commercediscount[]) => {
					if (create) {
						for (const commercediscount of commercediscounts) {
							if (this.commerce) {
								commercediscount.commerce = this.commerce;
							}
							this._commercediscountService.create(
								commercediscount
							);
						}
					} else {
						for (const commercediscount of this.rows) {
							if (
								!commercediscounts.find(
									(localCommercediscount) =>
										localCommercediscount._id ===
										commercediscount._id
								)
							) {
								this._commercediscountService.delete(
									commercediscount
								);
							}
						}

						for (const commercediscount of commercediscounts) {
							const localCommercediscount = this.rows.find(
								(localCommercediscount) =>
									localCommercediscount._id ===
									commercediscount._id
							);

							if (localCommercediscount) {
								this._core.copy(
									commercediscount,
									localCommercediscount
								);

								this._commercediscountService.update(
									localCommercediscount
								);
							} else {
								if (this.commerce) {
									commercediscount.commerce = this.commerce;
								}
								commercediscount.__created = false;

								this._commercediscountService.create(
									commercediscount
								);
							}
						}
					}
				});
		};
	}
}
