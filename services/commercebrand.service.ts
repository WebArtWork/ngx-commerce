import { Injectable } from '@angular/core';
import { Commercebrand } from '../interfaces/commercebrand.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercebrandService extends CrudService<Commercebrand> {
	commercebrands: Commercebrand[] = this.getDocs();

	commercebrandsByAuthor: Record<string, Commercebrand[]> = {};

	constructor() {
		super({
			name: 'commercebrand'
		});

		this.get();

		this.filteredDocuments(this.commercebrandsByAuthor);
	}
}
