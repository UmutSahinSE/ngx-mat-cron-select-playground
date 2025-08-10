import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
  signal,
} from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  NGX_MAT_CRON_SELECT_IS_TWELVE_HOUR,
  NGX_MAT_CRON_SELECT_MONTH_FORMAT,
  NGX_MAT_CRON_SELECT_TRANSLATE_SERVICE,
  NGX_MAT_CRON_SELECT_WEEK_FORMAT,
  provideNMCSTranslations,
} from 'ngx-mat-cron-select';
import { filter, of, take } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          deps: [HttpClient],
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
        },
      }),
    ),
    provideAppInitializer(() =>
      appInitializerFactory(inject(TranslateService))(),
    ),
    provideNativeDateAdapter(),
    { provide: NGX_MAT_CRON_SELECT_IS_TWELVE_HOUR, useValue: signal(false) },
    { provide: NGX_MAT_CRON_SELECT_WEEK_FORMAT, useValue: 'long' },
    { provide: NGX_MAT_CRON_SELECT_MONTH_FORMAT, useValue: 'long' },
    // { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    provideNMCSTranslations(
      of({
        en: {
          dayOfMonthSelectLabel: 'Select days',
          dayOfWeekSelectLabel: 'Select days of week',
          everyDayLabel: 'Every Day',
          everyHourLabel: 'Every Hour',
          everyMinuteLabel: 'Every Minute',
          everyMonthLabel: 'Every Month',
          hourSelectLabel: 'Select hours',
          minuteSelectLabel: 'Select minutes',
          monthSelectLabel: 'Select months',
          tabLabelDay: 'Day',
          tabLabelHour: 'Hour',
          tabLabelMonth: 'Month',
          tabLabelWeek: 'Week',
          tabLabelYear: 'Year',
        },
      }),
      of('en'),
    ),
    // {
    //   provide: NGX_MAT_CRON_SELECT_TRANSLATE_SERVICE,
    //   useExisting: TranslateService,
    // },
  ],
};

function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', `.json`);
}

function appInitializerFactory(
  translate: TranslateService,
): () => Promise<void> {
  return () =>
    new Promise<void>(
      (resolve: (value: void) => void, reject: (value: void) => void): void => {
        translate.setDefaultLang('en');
        translate
          .use('en')
          .pipe(
            filter(
              (translateResponseData): boolean =>
                translateResponseData !== undefined,
            ),
            take(1),
          )
          .subscribe({
            complete: (): void => {
              resolve();
            },
            error: (): void => {
              reject();
            },
          });
      },
    );
}
