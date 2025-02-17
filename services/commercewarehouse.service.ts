import { Injectable } from '@angular/core';
import { Commercewarehouse } from '../interfaces/commercewarehouse.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommercewarehouseService extends CrudService<Commercewarehouse> {
	commercewarehouses: Commercewarehouse[] = this.getDocs();

	commercewarehousesByAuthor: Record<string, Commercewarehouse[]> = {};

	constructor() {
		super({
			name: 'commercewarehouse'
		});

		this.get();

		this.filteredDocuments(this.commercewarehousesByAuthor);
	}
}
