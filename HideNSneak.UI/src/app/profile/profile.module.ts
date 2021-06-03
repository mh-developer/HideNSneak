import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile/profile.page';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
    imports: [SharedModule, ProfilePageRoutingModule],
    declarations: [ProfilePage, ProfileEditComponent],
})
export class ProfilePageModule {}
