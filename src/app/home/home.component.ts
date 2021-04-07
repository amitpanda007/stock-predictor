import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ErrorSnackbar } from "../common/snackbar.component";
import { HomeService } from "../core/services/home.service";

@Component({
  selector: "home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"],
})
export class HomeComponent implements OnInit {
  public searchTerm: string;
  public readonlyMode: boolean;

  constructor(
    private homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.readonlyMode = false;
  }

  findStock() {
    const search = this.searchTerm.trim();
    if (search.length > 0) {
      console.log(search);
      this.homeService.getStockInformation(search).subscribe(resp => {
        console.log(resp);
      })
    }
  }

}
