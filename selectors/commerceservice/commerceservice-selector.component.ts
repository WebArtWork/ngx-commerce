import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceserviceService } from '../../services/commerceservice.service';
import { Commerceservice } from '../../interfaces/commerceservice.interface';

@Component({
	selector: 'commerceservice-selector',
	templateUrl: './commerceservice-selector.component.html',
	styleUrls: ['./commerceservice-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceservice[] {
		return this._commerceserviceService.commerceservices;
	}

	constructor(private _commerceserviceService: CommerceserviceService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
