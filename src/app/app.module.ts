import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { HomeModule } from "./home/home.module";

import { AppComponent } from "./app.component";
import { SuccessSnackbar, ErrorSnackbar } from "./common/snackbar.component";
import { environment } from "src/environments/environment";
import { DeleteConfirmationDialogComponent } from "./common/delete.dialog.component";
import { AuthModule } from "./auth/auth.module";
import { FileUploadDialogComponent } from "./common/file-upload.dialog.component";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire";

@NgModule({
  declarations: [
    AppComponent,
    SuccessSnackbar,
    ErrorSnackbar,
    DeleteConfirmationDialogComponent,
    FileUploadDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CoreModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ],
  entryComponents: [
    SuccessSnackbar,
    ErrorSnackbar,
    DeleteConfirmationDialogComponent,
    FileUploadDialogComponent,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
