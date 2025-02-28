import { Injectable } from '@angular/core';
import { Commercetag } from '../interfaces/commercetag.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercetagService extends CrudService<Commercetag> {
	commercetags: Commercetag[] = this.getDocs();

	commercetagsByAuthor: Record<string, Commercetag[]> = {};

	commercetagsByCommerce: Record<string, Commercetag[]> = {};

	commercetagsByParent: Record<string, Commercetag[]> = {};

	constructor() {
		super({
			name: 'commercetag'
		});

		this.get();

		this.filteredDocuments(this.commercetagsByAuthor);

		this.filteredDocuments(
			this.commercetagsByCommerce,
			'commerce',
			(doc) => !doc.parent,
			(a, b) => a.order - b.order
		);

		this.filteredDocuments(
			this.commercetagsByParent,
			'parent',
			(doc) => !!doc.parent,
			(a, b) => a.order - b.order
		);
	}
}
