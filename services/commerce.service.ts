import { Injectable } from '@angular/core';
import { Commerce } from '../interfaces/commerce.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceService extends CrudService<Commerce> {
	commerces: Commerce[] = this.getDocs();

	commercesByAuthor: Record<string, Commerce[]> = {};

	constructor() {
		super({
			name: 'commerce'
		});

		this.get();

		this.filteredDocuments(this.commercesByAuthor);
	}
}
