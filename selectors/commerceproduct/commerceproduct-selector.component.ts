import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceproductService } from '../../services/commerceproduct.service';
import { Commerceproduct } from '../../interfaces/commerceproduct.interface';

@Component({
	selector: 'commerceproduct-selector',
	templateUrl: './commerceproduct-selector.component.html',
	styleUrls: ['./commerceproduct-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceproduct[] {
		return this._commerceproductService.commerceproducts;
	}

	constructor(private _commerceproductService: CommerceproductService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
