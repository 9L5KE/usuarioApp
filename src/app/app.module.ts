import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuarioEditComponent } from './componentes/usuario-edit/usuario-edit.component';
import { ListaRolesUsuarioComponent } from './componentes/lista-roles-usuario/lista-roles-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    UsuarioEditComponent,
    ListaRolesUsuarioComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ventasApp'),
    AngularFirestoreModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
