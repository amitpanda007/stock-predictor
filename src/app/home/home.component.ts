import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { BehaviorSubject } from "rxjs";
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
  stockResponseData: any[];
  stockMetaData: any;
  stockSubject = new BehaviorSubject([]);

  // Price curves on/off
  showOpenPrice = true;
  showHighPrice = true;
  showLowPrice = true;
  showClosePrice = true;

  // options
  view: any[] = [800, 400];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Date";
  yAxisLabel: string = "Stock Price";
  timeline: boolean = true;

  colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  };

  constructor(
    private homeService: HomeService,
    private _snackBar: MatSnackBar
  ) {
    this.stockSubject.subscribe((data) => {
      this.stockData = [...data];
    });
  }

  ngOnInit(): void {
    this.readonlyMode = false;
  }

  // findStock() {
  //   const search = this.searchTerm.trim();
  //   if (search.length > 0) {
  //     console.log(search);
  //     this.homeService.getStockInformation(search).subscribe((resp) => {
  //       console.log(resp);
  //       const data = resp["Time Series (Daily)"];
  //       this.stockMetaData = {
  //         stockSymbol: resp["Meta Data"]["2. Symbol"],
  //         stockName: resp["Meta Data"]["6. Name"],
  //       };

  //       const openPrice = { name: "Open Price", series: [] };
  //       const highPrice = { name: "High Price", series: [] };
  //       const lowPrice = { name: "Low Price", series: [] };
  //       const closePrice = { name: "Close Price", series: [] };
  //       const volumes = { name: "Volumes", series: [] };
  //       Object.entries(data).forEach((item) => {
  //         const dayOpenStock = {};
  //         dayOpenStock["name"] = item[0];
  //         dayOpenStock["value"] = item[1]["1. open"];
  //         openPrice.series.push(dayOpenStock);

  //         const dayHighStock = {};
  //         dayHighStock["name"] = item[0];
  //         dayHighStock["value"] = item[1]["2. high"];
  //         highPrice.series.push(dayHighStock);

  //         const dayLowStock = {};
  //         dayLowStock["name"] = item[0];
  //         dayLowStock["value"] = item[1]["3. low"];
  //         lowPrice.series.push(dayLowStock);

  //         const dayCloseStock = {};
  //         dayCloseStock["name"] = item[0];
  //         dayCloseStock["value"] = item[1]["4. close"];
  //         closePrice.series.push(dayCloseStock);

  //         const dayVolumeStock = {};
  //         dayVolumeStock["name"] = item[0];
  //         dayVolumeStock["value"] = item[1]["5. volume"];
  //         volumes.series.push(dayVolumeStock);
  //       });
  //       openPrice.series.reverse();
  //       highPrice.series.reverse();
  //       lowPrice.series.reverse();
  //       closePrice.series.reverse();
  //       volumes.series.reverse();
  //       // console.log(openPrice);
  //       this.stockData = [openPrice, highPrice, lowPrice, closePrice];
  //       console.log(this.stockData);
  //     });
  //   }
  // }

  findStock() {
    const search = this.searchTerm.trim();
    this.stockResponseData = [];

    if (search.length > 0) {
      console.log(search);
      this.homeService.getStockInformation(search).subscribe((resp: any) => {
        console.log(resp);
        const data = resp.stocksData;
        this.stockMetaData = {
          stockSymbol: resp.metaData.symbol,
          stockName: resp.metaData.name,
        };

        const openPrice = { name: "Open Price", series: [] };
        const highPrice = { name: "High Price", series: [] };
        const lowPrice = { name: "Low Price", series: [] };
        const closePrice = { name: "Close Price", series: [] };
        const volumes = { name: "Volumes", series: [] };
        data.forEach((item: any) => {
          const dayOpenStock = {};
          dayOpenStock["name"] = item.date;
          dayOpenStock["value"] = item.stock.open;
          openPrice.series.push(dayOpenStock);

          const dayHighStock = {};
          dayHighStock["name"] = item.date;
          dayHighStock["value"] = item.stock.high;
          highPrice.series.push(dayHighStock);

          const dayLowStock = {};
          dayLowStock["name"] = item.date;
          dayLowStock["value"] = item.stock.low;
          lowPrice.series.push(dayLowStock);

          const dayCloseStock = {};
          dayCloseStock["name"] = item.date;
          dayCloseStock["value"] = item.stock.close;
          closePrice.series.push(dayCloseStock);

          const dayVolumeStock = {};
          dayVolumeStock["name"] = item.date;
          dayVolumeStock["value"] = item.stock.volume;
          volumes.series.push(dayVolumeStock);
        });

        openPrice.series.reverse();
        highPrice.series.reverse();
        lowPrice.series.reverse();
        closePrice.series.reverse();
        volumes.series.reverse();
        // console.log(openPrice);
        const prices = [openPrice, highPrice, lowPrice, closePrice];

        //clone the data into another array
        prices.forEach((price) =>
          this.stockResponseData.push(Object.assign({}, price))
        );
        // this.stockResponseData = [...prices];
        this.stockSubject.next([...prices]);
      });
    }
  }

  onSelect(data) {
    console.log(data);
    const tempStocksData = [...this.stockData];
    const index = tempStocksData.findIndex((legend) => legend.name === data);
    if (tempStocksData[index].series.length > 0) {
      console.log("Turning off legend");
      tempStocksData[index].series = [];
    } else {
      // The user is clicking to re activate the data curve
      console.log("Turning on legend");
      tempStocksData[index].series = [...this.stockResponseData[index].series];
    }

    this.stockSubject.next([...tempStocksData]);
  }

  onActivate(data) {
    // console.log("ACTIVATE");
    // console.log(data);
  }

  onDeactivate(data) {
    // console.log("DEACTIVATE");
    // console.log(data);
  }
}
