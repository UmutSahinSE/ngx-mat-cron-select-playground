import { Component, inject } from '@angular/core';
import {
  IInputsFormGroup,
  ITab,
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
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-root',
  imports: [
    NgxMatCronSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    MatInput,
    MatButton,
    MatFormField,
    MatLabel,
    AsyncPipe,
    MatSelect,
    MatOption,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient],
})
export class AppComponent {
  public readonly translate = inject(TranslateService);
  public isDisabled = false;

  public inputsFormGroup = new FormGroup<IInputsFormGroup>({
    dayOfMonth: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dayOfWeek: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    // Example single select
    // hour: new FormControl<number | null>(null, {
    //   validators: [Validators.required],
    // }),
    hour: new FormControl<number[]>([], {nonNullable: true, validators: [Validators.required] }),
    minute: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    monthOfYear: new FormControl<number[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public readonly cronSelectFormControl = new FormControl('1 * 3 * *', [
    Validators.required,
  ]);

  public readonly widthFormControl = new FormControl('600px', {
    nonNullable: true,
  });

  public readonly loadFormControl = new FormControl('1 * 3 * *', {
    nonNullable: true,
  });

  public readonly visibleTabsFormControl = new FormControl<(keyof ITab)[]>(
    ['hour', 'day', 'week', 'month', 'year'],
    {
      nonNullable: true,
    },
  );
  public readonly visibleTabsFormatted$: Observable<ITab> =
    this.visibleTabsFormControl.valueChanges.pipe(
      startWith(this.visibleTabsFormControl.value),
      map((selectedOptions) => ({
        hour: selectedOptions.includes('hour'),
        day: selectedOptions.includes('day'),
        week: selectedOptions.includes('week'),
        month: selectedOptions.includes('month'),
        year: selectedOptions.includes('year'),
      })),
    );

  public disableSelect(): void {
    this.isDisabled = !this.isDisabled;
  }

  public load(): void {
    this.cronSelectFormControl.reset(this.loadFormControl.value);
  }
}
