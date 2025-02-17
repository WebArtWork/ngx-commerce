import { Injectable } from '@angular/core';
import { Commercetag } from '../interfaces/commercetag.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercetagService extends CrudService<Commercetag> {
	commercetags: Commercetag[] = this.getDocs();

	commercetagsByAuthor: Record<string, Commercetag[]> = {};

	constructor() {
		super({
			name: 'commercetag'
		});

		this.get();

		this.filteredDocuments(this.commercetagsByAuthor);
	}
}
