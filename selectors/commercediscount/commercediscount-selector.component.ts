import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercediscountService } from '../../services/commercediscount.service';
import { Commercediscount } from '../../interfaces/commercediscount.interface';

@Component({
	selector: 'commercediscount-selector',
	templateUrl: './commercediscount-selector.component.html',
	styleUrls: ['./commercediscount-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercediscount[] {
		return this._commercediscountService.commercediscounts;
	}

	constructor(private _commercediscountService: CommercediscountService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
