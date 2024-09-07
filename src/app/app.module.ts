import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotMachineComponent } from './containers/slot-machine/slot-machine.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletSelectionComponent } from './components/wallet-selection/wallet-selection.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SlotMachineComponent,
    NgbModule,
    WalletSelectionComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
