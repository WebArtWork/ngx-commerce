import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercewarehouseService } from '../../services/commercewarehouse.service';
import { Commercewarehouse } from '../../interfaces/commercewarehouse.interface';

@Component({
	selector: 'commercewarehouse-selector',
	templateUrl: './commercewarehouse-selector.component.html',
	styleUrls: ['./commercewarehouse-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercewarehouse[] {
		return this._commercewarehouseService.commercewarehouses;
	}

	constructor(private _commercewarehouseService: CommercewarehouseService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
