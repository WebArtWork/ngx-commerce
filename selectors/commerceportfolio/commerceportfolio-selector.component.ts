import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommerceportfolioService } from '../../services/commerceportfolio.service';
import { Commerceportfolio } from '../../interfaces/commerceportfolio.interface';

@Component({
	selector: 'commerceportfolio-selector',
	templateUrl: './commerceportfolio-selector.component.html',
	styleUrls: ['./commerceportfolio-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Commerceportfolio[] {
		return this._commerceportfolioService.commerceportfolios;
	}

	constructor(private _commerceportfolioService: CommerceportfolioService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
