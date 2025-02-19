import { Component } from '@angular/core';
import { AlertService, CoreService, MongoService } from 'wacom';
import { CommercetagService } from '../../services/commercetag.service';
import { Commercetag } from '../../interfaces/commercetag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { commercetagFormComponents } from '../../formcomponents/commercetag.formcomponents';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	templateUrl: './commercetags.component.html',
	styleUrls: ['./commercetags.component.scss'],
	standalone: false
})
export class CommercetagsComponent {
	commerce = '';
	parent = '';
	childrenUrl(tag: Commercetag): string {
		const urls = this._router.url.split('/');
		if (this.parent) {
			urls.pop();
		}
		urls.push(tag._id);
		return urls.join('/');
	}
	columns = ['name'];

	form: FormInterface = this._form.getForm(
		'commercetag',
		commercetagFormComponents
	);

	config = {
		create: (): void => {
			this._form.modal<Commercetag>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.commerce) {
						(created as Commercetag).commerce = this.commerce;
					}
					if (this.parent) {
						(created as Commercetag).parent = this.parent;
					}
					this._commercetagService.create(created as Commercetag, {
						callback: () => {
							this.setTags();
						}
					});

					close();
				}
			});
		},
		update: (doc: Commercetag): void => {
			this._form
				.modal<Commercetag>(this.form, [], doc)
				.then((updated: Commercetag) => {
					this._core.copy(updated, doc);

					this._commercetagService.update(doc, {
						callback: () => {
							this.setTags();
						}
					});
				});
		},
		delete: (doc: Commercetag): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this commercetag?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._commercetagService.delete(doc, {
								callback: () => {
									this.setTags();
								}
							});
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'label_important',
				hrefFunc: this.childrenUrl.bind(this)
			},
			{
				icon: 'arrow_upward',
				click: (doc: Commercetag) => {
					const index = this.tags.findIndex((d) => d._id === doc._id);
					[this.tags[index], this.tags[index - 1]] = [
						this.tags[index - 1],
						this.tags[index]
					];
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Commercetag): void => {
					this._form.modalUnique<Commercetag>(
						'commercetag',
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

	tags: Commercetag[] = JSON.parse(
		JSON.stringify(this._commercetagService.commercetags)
	);
	setTags() {
		this.tags.splice(0, this.tags.length);
		for (const tag of this._commercetagService.commercetags) {
			if (!this.commerce && !this.parent) {
				if (!tag.parent) {
					this.tags.push(tag);
				}
			} else if (this.commerce && this.parent) {
				if (
					tag.parent === this.parent &&
					tag.commerce === this.commerce
				) {
					this.tags.push(tag);
				}
			} else if (this.parent) {
				if (tag.parent === this.parent) {
					this.tags.push(tag);
				}
			} else {
				if (tag.commerce === this.commerce && !tag.parent) {
					this.tags.push(tag);
				}
			}
		}
	}

	update(tag: Commercetag) {
		this._commercetagService.update(tag);
	}

	constructor(
		private _translate: TranslateService,
		private _commercetagService: CommercetagService,
		private route: ActivatedRoute,
		private _alert: AlertService,
		private _form: FormService,
		private _mongo: MongoService,
		private _core: CoreService,
		private _router: Router
	) {
		this._mongo.on('commercetag', this.setTags.bind(this));
	}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			if (params['parent']) {
				this.parent = params['parent'];
			}

			if (params['commerce_id']) {
				this.commerce = params['commerce_id'];
			}

			this.commerce = this.commerce || environment.commerceId;
		});

		this.setTags();
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Commercetag>(create ? [] : this.tags)
				.then((commercetags: Commercetag[]) => {
					if (create) {
						for (const commercetag of commercetags) {
							if (this.commerce) {
								commercetag.commerce = this.commerce;
							}
							this._commercetagService.create(commercetag);
						}
					} else {
						for (const commercetag of this.tags) {
							if (
								!commercetags.find(
									(localCommercetag) =>
										localCommercetag._id === commercetag._id
								)
							) {
								this._commercetagService.delete(commercetag);
							}
						}

						for (const commercetag of commercetags) {
							const localCommercetag = this.tags.find(
								(localCommercetag) =>
									localCommercetag._id === commercetag._id
							);

							if (localCommercetag) {
								this._core.copy(commercetag, localCommercetag);

								this._commercetagService.update(
									localCommercetag
								);
							} else {
								if (this.commerce) {
									commercetag.commerce = this.commerce;
								}
								commercetag.__created = false;

								this._commercetagService.create(commercetag);
							}
						}
					}
				});
		};
	}
}
