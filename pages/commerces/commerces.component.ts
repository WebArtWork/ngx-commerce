import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { CommerceService } from '../../services/commerce.service';
import { Commerce } from '../../interfaces/commerce.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commerceFormComponents } from '../../formcomponents/commerce.formcomponents';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commerces.component.html',
	styleUrls: ['./commerces.component.scss'],
	standalone: false
})
export class CommercesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'commerce',
		commerceFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commerce>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._commerceService.create(created as Commerce);

					close();
				}
			});
		},
		update: (doc: Commerce): void => {
			this._form
				.modal<Commerce>(this.form, [], doc)
				.then((updated: Commerce) => {
					this._core.copy(updated, doc);

					this._commerceService.update(doc);
				});
		},
		delete: (doc: Commerce): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commerce?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commerceService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			environment.commerceArticleUrl
				? {
						icon: 'article',
						hrefFunc: (doc: Commerce): string => {
							return (
								environment.commerceArticleUrl +
								'/Commerce/' +
								doc._id
							);
						}
				  }
				: null,
			{
				icon: 'list_alt',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commerceorders/' + doc._id;
				}
			},
			{
				icon: 'store',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercestores/' + doc._id;
				}
			},
			{
				icon: 'home',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercewarehouses/' + doc._id;
				}
			},
			{
				icon: 'production_quantity_limits',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commerceproducts/' + doc._id;
				}
			},
			{
				icon: 'room_service',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commerceservices/' + doc._id;
				}
			},
			{
				icon: 'photo_camera',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commerceportfolios/' + doc._id;
				}
			},
			{
				icon: 'content_paste',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercecontents/' + doc._id;
				}
			},
			{
				icon: 'style',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercetags/' + doc._id;
				}
			},
			{
				icon: 'branding_watermark',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercebrands/' + doc._id;
				}
			},
			{
				icon: 'percent',
				hrefFunc: (doc: Commerce): string => {
					return '/commerce/commercediscounts/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Commerce): void => {
					this._form.modalUnique<Commerce>('commerce', 'url', doc);
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

	get rows(): Commerce[] {
		return this._commerceService.commerces;
	}

	constructor(
		private _translate: TranslateService,
		private _commerceService: CommerceService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commerce>(create ? [] : this.rows)
				.then((commerces: Commerce[]) => {
					if (create) {
						for (const commerce of commerces) {
							this._commerceService.create(commerce);
						}
					} else {
						for (const commerce of this.rows) {
							if (
								!commerces.find(
									(localCommerce) =>
										localCommerce._id === commerce._id
								)
							) {
								this._commerceService.delete(commerce);
							}
						}

						for (const commerce of commerces) {
							const localCommerce = this.rows.find(
								(localCommerce) =>
									localCommerce._id === commerce._id
							);

							if (localCommerce) {
								this._core.copy(commerce, localCommerce);

								this._commerceService.update(localCommerce);
							} else {
								commerce.__created = false;

								this._commerceService.create(commerce);
							}
						}
					}
				});
		};
	}
}
