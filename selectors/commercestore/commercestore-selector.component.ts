import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercestoreService } from '../../services/commercestore.service';
import { Commercestore } from '../../interfaces/commercestore.interface';

@Component({
	selector: 'commercestore-selector',
	templateUrl: './commercestore-selector.component.html',
	styleUrls: ['./commercestore-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercestore[] {
		return this._commercestoreService.commercestores;
	}

	constructor(private _commercestoreService: CommercestoreService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
