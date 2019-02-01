import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../settings.service';

const update_timeout_time = 200;

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {
  settingsForm: FormGroup;
  private update_timeout = null;

  constructor(private settings: SettingsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      home_amount: [this.settings.home_amount, [
        Validators.required,
        Validators.pattern("[1-9]+[0-9]*")
      ]],
      cache_max_age: [this.settings.cache_max_age, [
        Validators.required,
        Validators.pattern("[1-9]+[0-9]*")
      ]]
    });

    this.settingsForm.valueChanges.subscribe(val => {
      if (this.update_timeout != null) {
        clearTimeout(this.update_timeout);
      }
      this.update_timeout = setTimeout(() => {
        try {
          if (val.home_amount != null && !val.home_amount.empty) {
            let home_amount = parseInt(val.home_amount);

            if (home_amount <= 0) {
              throw new Error('home_amount can\'t be negative');
            }

            this.settings.home_amount = home_amount;
          }
        } catch (e) { }

        try {
          if (val.cache_max_age != null && !val.cache_max_age.empty) {
            let cache_max_age = parseInt(val.cache_max_age);

            if (cache_max_age <= 0) {
              throw new Error('cache_max_age can\'t be negative');
            }

            this.settings.cache_max_age = cache_max_age;
          }
        } catch (e) { }
      }, update_timeout_time);
    });
  }

  get home_amount() { return this.settingsForm.get("home_amount") };
  get cache_max_age() { return this.settingsForm.get("cache_max_age") };

}
