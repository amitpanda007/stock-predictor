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
  stockData: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Stock Price';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

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
        const data = resp['Time Series (Daily)'];
        const openPrice = {'name': 'Opening Price', 'series': []}
        Object.entries(data).forEach(item => {
          const dayOpenStock = {};
          dayOpenStock['name'] = item[0];
          dayOpenStock['value'] = item[1]['1. open'];
          openPrice.series.push(dayOpenStock);
        }); 
        openPrice.series.reverse();
        console.log(openPrice);
        this.stockData = [openPrice];
      });
    }
  }

}
