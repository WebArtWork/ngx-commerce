import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceorderService } from '../../services/commerceorder.service';
import { Commerceorder } from '../../interfaces/commerceorder.interface';

@Component({
	selector: 'commerceorder-selector',
	templateUrl: './commerceorder-selector.component.html',
	styleUrls: ['./commerceorder-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceorder[] {
		return this._commerceorderService.commerceorders;
	}

	constructor(private _commerceorderService: CommerceorderService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
