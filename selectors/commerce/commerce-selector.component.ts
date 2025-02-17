import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceService } from '../../services/commerce.service';
import { Commerce } from '../../interfaces/commerce.interface';

@Component({
	selector: 'commerce-selector',
	templateUrl: './commerce-selector.component.html',
	styleUrls: ['./commerce-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerce[] {
		return this._commerceService.commerces;
	}

	constructor(private _commerceService: CommerceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
