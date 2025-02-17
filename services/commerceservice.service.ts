import { Injectable } from '@angular/core';
import { Commerceservice } from '../interfaces/commerceservice.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceserviceService extends CrudService<Commerceservice> {
	commerceservices: Commerceservice[] = this.getDocs();

	commerceservicesByAuthor: Record<string, Commerceservice[]> = {};

	constructor() {
		super({
			name: 'commerceservice'
		});

		this.get();

		this.filteredDocuments(this.commerceservicesByAuthor);
	}
}
