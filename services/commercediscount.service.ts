import { Injectable } from '@angular/core';
import { Commercediscount } from '../interfaces/commercediscount.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercediscountService extends CrudService<Commercediscount> {
	commercediscounts: Commercediscount[] = this.getDocs();

	commercediscountsByAuthor: Record<string, Commercediscount[]> = {};

	constructor() {
		super({
			name: 'commercediscount'
		});

		this.get();

		this.filteredDocuments(this.commercediscountsByAuthor);
	}
}
