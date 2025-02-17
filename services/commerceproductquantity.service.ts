import { Injectable } from '@angular/core';
import { Commerceproductquantity } from '../interfaces/commerceproductquantity.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class CommerceproductquantityService extends CrudService<Commerceproductquantity> {
	quantitiesByProduct: Record<string, Commerceproductquantity[]> = {};

	constructor() {
		super({
			name: 'commerceproductquantity'
		});

		this.filteredDocuments(this.quantitiesByProduct, 'product');
	}
}
