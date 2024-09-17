import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotMachineComponent } from './containers/slot-machine/slot-machine.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WalletSelectionComponent } from './components/wallet-selection/wallet-selection.component';
import { ToggleWalletComponent } from './components/toggle-wallet/toggle-wallet.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    ToggleWalletComponent,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['gateway.api.jackpot2024.win'],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
