import { Injectable } from '@angular/core';
import { Commercestore } from '../interfaces/commercestore.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercestoreService extends CrudService<Commercestore> {
	commercestores: Commercestore[] = this.getDocs();

	commercestoresByAuthor: Record<string, Commercestore[]> = {};

	constructor() {
		super({
			name: 'commercestore'
		});

		this.get();

		this.filteredDocuments(this.commercestoresByAuthor);
	}
}
