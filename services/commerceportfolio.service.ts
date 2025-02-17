import { Injectable } from '@angular/core';
import { Commerceportfolio } from '../interfaces/commerceportfolio.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceportfolioService extends CrudService<Commerceportfolio> {
	commerceportfolios: Commerceportfolio[] = this.getDocs();

	commerceportfoliosByAuthor: Record<string, Commerceportfolio[]> = {};

	constructor() {
		super({
			name: 'commerceportfolio'
		});

		this.get();

		this.filteredDocuments(this.commerceportfoliosByAuthor);
	}
}
