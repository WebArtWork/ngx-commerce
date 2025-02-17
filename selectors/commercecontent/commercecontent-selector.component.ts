import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommercecontentService } from '../../services/commercecontent.service';
import { Commercecontent } from '../../interfaces/commercecontent.interface';

@Component({
	selector: 'commercecontent-selector',
	templateUrl: './commercecontent-selector.component.html',
	styleUrls: ['./commercecontent-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commercecontent[] {
		return this._commercecontentService.commercecontents;
	}

	constructor(private _commercecontentService: CommercecontentService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
