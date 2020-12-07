import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { IReading } from 'src/app/models/i-reading';

@Component({
  selector: 'app-test-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})

export class LineChartComponent implements OnInit {
  @Input() data: IReading[];
  displayData: ChartDataSets[] = [];

  // Date related variables
  thisMonth = moment().format('MMM');
  viewMode = 'week';
  startDate = new Date(Date.now());
  endDate = new Date(Date.now());

  chartLabels: Label[] = [];
  hoursLabels: Label[] = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
  weekLabels: Label[] = [];
  monthLabels: Label[] = [];

  // Chart options
  lineChartOptions = { responsive: true };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(100,100,255,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  ngOnInit() {
    for (let i = 0; i < moment().daysInMonth(); i++) {
      this.monthLabels.push(String(i + 1));
    }

    for (let i = 0; i < 7; i++) {
      this.weekLabels.push(moment().format('DDDD'));
    }

    this.chartLabels = this.weekLabels;
  }

  dateChanged(event: any, isStartDate: boolean) {
    if (isStartDate) this.startDate = event.detail;
    else this.startDate = event.detail;

    if (this.startDate && this.endDate) {
      this.groupData();
    }
  }

  modeChange(event: any) {
    if (!event || !event.detail) return;

    this.viewMode = event.detail;
    if (this.viewMode === 'lastWeek') this.chartLabels = this.weekLabels;
    else if (this.viewMode === 'month') this.chartLabels = this.monthLabels;

    if (this.viewMode !== 'month') {
      this.startDate = null;
      this.endDate = null;
    }
  }

  selectMonth(event: any) {
    moment(event.detail)
  }

  groupData() {
    if (this.viewMode === 'lastWeek') {
      this.groupByDayOfWeek();
    } else if (this.viewMode === 'lastWeek') {

    } else return;
  }

  private groupByDayOfWeek() {
    let currentReadingDate = moment();
    let accumulator = 0;
    let numOfReadings = 0;
    let readingDay = 'Mon';

    for (const iterator of this.data) {
      currentReadingDate = moment(new Date(iterator.timestamp));

      if (currentReadingDate.format('DDD') === readingDay) {
        accumulator += +iterator.value;
        numOfReadings++;
      } else {
        this.displayData[0].data.push(accumulator / numOfReadings);
        readingDay = currentReadingDate.format('DDD');
        accumulator = +iterator.value;
        numOfReadings = 0;
      }
    }
  }
}

export enum ChartViewMode {
  DAY,
  WEEK,
  MONTH
}
