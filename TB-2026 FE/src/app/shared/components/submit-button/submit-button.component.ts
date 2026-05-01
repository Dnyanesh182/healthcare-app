import { Component, HostBinding, Input } from '@angular/core';
import { USER_IMPORTS } from '../../../user/user.config';

@Component({
  selector: 'app-submit-button',
  imports: [USER_IMPORTS],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent {

  @HostBinding('class') class = 'buttonWrapper';

	@Input()
  submitting!: boolean;
	@Input() canCreateTask !:boolean;
	@Input() defaultText = 'Save';
	@Input() submitText  = 'Saving';


}
