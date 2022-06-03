import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Taken } from '../models/history';
import { StorageService } from '../services/storage.service';
import Chart from 'chart.js/auto';
import { ChartViewModel } from '../models/chartViewModel';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  history: Observable<Array<Taken>>;

  @ViewChild('totalGraph', { static: true }) totalGraph;
  chart: any;

  totalChart: Observable<ChartViewModel>;

  endDate: Date;
  startDate: Date;
  data;
  config;



  constructor(private storageService: StorageService) {
    this.endDate = new Date();
    this.startDate = new Date(this.endDate);
    this.startDate.setDate(this.startDate.getDate() - 30)
    console.log(this.startDate)
    console.log(this.endDate)

    this.totalChart = storageService.getChartData(this.startDate, this.endDate, null)

    

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Taken',
          data: [],
          backgroundColor: 'rgba(45, 211, 111, 1)',
        },
        {
          label: 'Not Taken',
          data: [],
          backgroundColor: 'rgba(40, 186, 98, 1)',
        }
      ]
    };

    this.config = {
      type: 'bar',
      data: this.data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Medication History'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    };

  }

  ngOnInit() {
    this.history = this.storageService.getHistory();
    console.log(this.history);
    this.createChart();
    this.totalChart.subscribe((chartData) => {
      this.chart.data.labels = chartData.labels;
      this.chart.data.datasets[0].data = chartData.taken;
      this.chart.data.datasets[1].data = chartData.notTaken;
      this.chart.update();
    })
  }

  createChart() {
    this.chart = new Chart(this.totalGraph.nativeElement, this.config as any)
  }

}
