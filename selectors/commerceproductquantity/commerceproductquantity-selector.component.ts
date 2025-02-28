import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceproductquantityService } from '../../services/commerceproductquantity.service';
import { Commerceproductquantity } from '../../interfaces/commerceproductquantity.interface';

@Component({
	selector: 'commerceproductquantity-selector',
	templateUrl: './commerceproductquantity-selector.component.html',
	styleUrls: ['./commerceproductquantity-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceproductquantity[] {
		return this._commerceproductquantityService.commerceproductquantitys;
	}

	constructor(
		private _commerceproductquantityService: CommerceproductquantityService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
