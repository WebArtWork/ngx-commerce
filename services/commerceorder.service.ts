import { Injectable } from '@angular/core';
import { Commerceorder } from '../interfaces/commerceorder.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceorderService extends CrudService<Commerceorder> {
	commerceorders: Commerceorder[] = this.getDocs();

	commerceordersByAuthor: Record<string, Commerceorder[]> = {};

	constructor() {
		super({
			name: 'commerceorder'
		});

		this.get();

		this.filteredDocuments(this.commerceordersByAuthor);
	}
}
