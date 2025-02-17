import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercebrandService } from '../../services/commercebrand.service';
import { Commercebrand } from '../../interfaces/commercebrand.interface';

@Component({
	selector: 'commercebrand-selector',
	templateUrl: './commercebrand-selector.component.html',
	styleUrls: ['./commercebrand-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercebrand[] {
		return this._commercebrandService.commercebrands;
	}

	constructor(private _commercebrandService: CommercebrandService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
