import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  // originalUserSettings: UserSettings = {
  //   name: 'abdoz',
  //   emailOffers: true,
  //   interfaceStyle: 'dark',
  //   notes: 'Deez Nutz',
  //   subscriptionType: 'Annual'

  // };
  originalUserSettings: UserSettings = {
    name: '',
    emailOffers: false,
    interfaceStyle: '',
    notes: '',
    subscriptionType: '',
    startDate: new Date(),
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;
  singleModel = 'On';

  constructor(private dataService: DataService) {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
  }

  onBlur(field: NgModel) {
    console.log('onBlur: ', field.valid);
  }

  onHttpError(err: any) {
    console.log('error: ', err);
    this.postError = true;
    this.postErrorMessage = err.error.errorMessage;
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit: ', form.valid);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('success: ', result),
        error => this.onHttpError(error)
      );
    }
    else {
      this.postError = true;
      this.postErrorMessage = 'Fix the above errors..';
    }
  }

}
