import { Injectable } from '@angular/core';
import { Commercecontent } from '../interfaces/commercecontent.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercecontentService extends CrudService<Commercecontent> {
	commercecontents: Commercecontent[] = this.getDocs();

	commercecontentsByAuthor: Record<string, Commercecontent[]> = {};

	constructor() {
		super({
			name: 'commercecontent'
		});

		this.get();

		this.filteredDocuments(this.commercecontentsByAuthor);
	}
}
