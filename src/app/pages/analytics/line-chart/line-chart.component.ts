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
  viewMode = 'lastWeek';
  startDate = moment().subtract(7, 'days').toDate();
  endDate = moment().toDate();

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
    const value = event.detail.value;

    if (isStartDate) this.startDate = value ? moment(value).toDate() : value;
    else this.startDate = value ? moment(value).toDate() : value;

    if (this.startDate && this.endDate) {
      this.groupByDate();
    }
  }

  modeChange(event: any) {
    if (!event || !event.detail || !event.detail.value) return;

    const viewMode = event.detail.value;
    if (viewMode === 'lastWeek') this.chartLabels = this.weekLabels;
    else if (viewMode === 'month') this.chartLabels = this.monthLabels;

    if (viewMode !== 'month') {
      this.startDate = null;
      this.endDate = null;
    }
  }

  selectMonth(event: any) {
    if (!event || !event.detail || !event.detail.value) return;

    const month = moment(event.detail.value);
    this.startDate = month.startOf('month').toDate();
    this.endDate = month.endOf('month').toDate();

    this.groupByDate();
  }

  private groupByDate() {
    const groupDate = moment(this.startDate);
    const startStamp = groupDate.unix();
    const maxDate = moment(this.endDate);
    let readingDate: moment.Moment = null;
    let accumulator = 0;
    let numOfReadings = 0;
    let pushReading = 0;
    let iterator: IReading = null;

    let i = this.findIndexOfFirstReadingInRange(startStamp);
    this.fillDaysWithMissingReadings(groupDate, moment(new Date(this.data[i].timestamp)), maxDate);



    for (; this.data.length; i++) {
      if (groupDate.isAfter(maxDate)) break;

      iterator = this.data[i];
      readingDate = moment(new Date(iterator.timestamp));

      if (readingDate.isSame(groupDate)) {
        accumulator += +iterator.value;
        numOfReadings++;
      } else if (readingDate.isBefore(maxDate)) {
        pushReading = numOfReadings ? accumulator / numOfReadings : 0;
        this.displayData[0].data.push(pushReading);

        if (this.fillDaysWithMissingReadings(groupDate, readingDate, maxDate)) break;

        accumulator = +iterator.value;
        numOfReadings = 1;
      }

      groupDate.add(1, 'day');
    }
  }

  private fillDaysWithMissingReadings(groupDate: moment.Moment, readingDate: moment.Moment, max: moment.Moment): boolean {
    const noReadingsDays = groupDate.diff(readingDate, 'days');

    if (noReadingsDays > 0) {
      const maxDays = groupDate.diff(max, 'days');
      let i = 1;

      for (i = 1; i < noReadingsDays && i < maxDays; i++) {
        groupDate.add(1, 'day');
        this.displayData[0].data.push(0);
      }

      return i >= maxDays;
    }

    return false;
  }

  findIndexOfFirstReadingInRange(startStamp: number): number {
    return this.data.findIndex((value => value.timestamp >= startStamp));
  }
}
