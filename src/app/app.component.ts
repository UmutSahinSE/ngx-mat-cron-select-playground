import { Component, inject } from '@angular/core';
import {
  IInputsFormGroup,
  NgxMatCronSelectComponent,
} from 'ngx-mat-cron-select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [NgxMatCronSelectComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient],
})
export class AppComponent {
  public readonly translate = inject(TranslateService);
  public isDisabled = false;
  public value = '1 * 3 4 5';
  public valueChange: string | null = null;

  title = 'ngx-mat-cron-select-playground';
  lalala = this.translate.instant('ngxMatCronSelect.dayOfMonthSelectLabel');

  public inputsFormGroup = new FormGroup<IInputsFormGroup>({
    dayOfMonth: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dayOfWeek: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    hour: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    // hour: new FormControl<number[]>([], {nonNullable: true, validators: [Validators.required] }),
    minute: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    monthOfYear: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  public readonly formControl = new FormControl('1 2 3 * 5', [
    Validators.required,
  ]);

  public disableSelect(): void {
    this.isDisabled = !this.isDisabled;
  }

  public setValue(): void {
    this.value = '* 2 * * *';
  }

  public setValueFC(): void {
    this.formControl.setValue(null);
  }

  public setFGVal(): void {
    this.inputsFormGroup.controls.hour.setValue(10);
  }

  public setFG(): void {
    this.inputsFormGroup = new FormGroup<IInputsFormGroup>({
      dayOfMonth: new FormControl<number[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      dayOfWeek: new FormControl<number[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      hour: new FormControl<number[]>([], {
        validators: [Validators.required],
      }),
      // hour: new FormControl<number[]>([], {nonNullable: true, validators: [Validators.required] }),
      minute: new FormControl<number[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
      monthOfYear: new FormControl<number[]>([], {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }
}
