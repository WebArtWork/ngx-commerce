import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercetagService } from '../../services/commercetag.service';
import { Commercetag } from '../../interfaces/commercetag.interface';

@Component({
	selector: 'commercetag-selector',
	templateUrl: './commercetag-selector.component.html',
	styleUrls: ['./commercetag-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercetag[] {
		return this._commercetagService.commercetags;
	}

	constructor(private _commercetagService: CommercetagService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
