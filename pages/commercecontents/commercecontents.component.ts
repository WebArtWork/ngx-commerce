import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommercecontentService } from '../../services/commercecontent.service';
import { Commercecontent } from '../../interfaces/commercecontent.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercecontentFormComponents } from '../../formcomponents/commercecontent.formcomponents';
import { Router } from '@angular/router';

@Component({
	templateUrl: './commercecontents.component.html',
	styleUrls: ['./commercecontents.component.scss'],
	standalone: false
})
export class CommercecontentsComponent {
	columns = ['name', 'description'];

	commerce = this._router.url.includes('/commerce/commercecontents/')
	? this._router.url.replace('/commerce/commercecontents/', '')
	: '';

	form: FormInterface = this._form.getForm('commercecontent', commercecontentFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Commercecontent>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commercecontent).commerce = this.commerce;
					}
					this._commercecontentService.create(created as Commercecontent);

					close();
				}
			});
		},
		update: (doc: Commercecontent): void => {
			this._form.modal<Commercecontent>(this.form, [], doc).then((updated: Commercecontent) => {
				this._core.copy(updated, doc);

				this._commercecontentService.update(doc);
			});
		},
		delete: (doc: Commercecontent): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercecontent?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercecontentService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Commercecontent): void => {
					this._form.modalUnique<Commercecontent>('commercecontent', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	get rows(): Commercecontent[] {
		return this._commercecontentService.commercecontents;
	}

	constructor(
		private _translate: TranslateService,
		private _commercecontentService: CommercecontentService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercecontent>(create ? [] : this.rows)
				.then((commercecontents: Commercecontent[]) => {
					if (create) {
						for (const commercecontent of commercecontents) {
							if (this.commerce) {
								commercecontent.commerce = this.commerce;
							}
							this._commercecontentService.create(commercecontent);
						}
					} else {
						for (const commercecontent of this.rows) {
							if (!commercecontents.find(
								localCommercecontent => localCommercecontent._id === commercecontent._id
							)) {
								this._commercecontentService.delete(commercecontent);
							}
						}

						for (const commercecontent of commercecontents) {
							const localCommercecontent = this.rows.find(
								localCommercecontent => localCommercecontent._id === commercecontent._id
							);

							if (localCommercecontent) {
								this._core.copy(commercecontent, localCommercecontent);

								this._commercecontentService.update(localCommercecontent);
							} else {
								if (this.commerce) {
									commercecontent.commerce = this.commerce;
								}
								commercecontent.__created = false;

								this._commercecontentService.create(commercecontent);
							}
						}
					}
				});
		};
	}
}
