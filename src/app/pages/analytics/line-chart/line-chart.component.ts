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
  @Input() data: IReading[] = [
    {
      value: 12,
      timestamp: moment().valueOf() - 1000 * 60 * 60 * 24 + 100000
    },
    {
      value: 12,
      timestamp: moment().valueOf() - 3600000 + 100000
    },
    {
      value: 12,
      timestamp: moment().valueOf() - 3600000
    },
    {
      value: 10,
      timestamp: moment().valueOf() - 20000
    },
    {
      value: 13,
      timestamp: moment().valueOf() - 10000
    },
    {
      value: 12,
      timestamp: moment().valueOf()
    },
    {
      value: 13,
      timestamp: moment().valueOf() + 10000
    },
    {
      value: 10,
      timestamp: moment().valueOf() + 20000
    },
    {
      value: 12,
      timestamp: moment().valueOf() + 3600000
    },
    {
      value: 12,
      timestamp: moment().valueOf() + 3600000 + 100000
    },
    {
      value: 12,
      timestamp: moment().valueOf() + 1000 * 60 * 60 * 24 + 100000
    },
  ];
  displayData: ChartDataSets[] = [{ data: [], label: 'Readings' }];

  // Date related variables
  thisMonth = moment().format('YYYY-MM');
  viewMode: 'lastWeek' | 'month' | 'day';
  startDate = moment().subtract(7, 'days').toISOString();
  endDate = moment().toISOString();
  selectedMonth = moment().toISOString();

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

  // Change events regulation
  ignoreCount = 0;

  ngOnInit() {
    this.setMonthLabels(moment(this.selectedMonth).startOf('month'), moment(this.selectedMonth).endOf('month'));
    this.setLastWeekLabels();

    this.viewMode = 'lastWeek';
    this.chartLabels = this.weekLabels;
    this.groupByDate();
  }

  setMonthLabels(start: moment.Moment, end: moment.Moment) {
    const days = end.diff(start, 'days') + 1;
    let labelIterator = +start.format('DD');
    let endLabel = end.format('DD');
    if (this.monthLabels[0] == String(labelIterator) && this.monthLabels[this.monthLabels.length - 1] == endLabel) return;
    this.monthLabels = [];

    for (let i = 0; i < days; i++, labelIterator++)
      this.monthLabels.push(String(labelIterator));
  }

  setLastWeekLabels() {
    const iterator = moment().subtract(7, 'days');
    this.weekLabels = [];

    this.weekLabels.push(iterator.format('DD/MM'));
    for (let i = 0; i < 7; i++)
      this.weekLabels.push(iterator.add(1, 'days').format('DD/MM'));
  }

  dateChanged(event: any) {
    if (this.ignoreCount !== 0) this.ignoreCount--;
    else {
      this.selectedMonth = null;
      if (this.startDate && this.endDate) {
        this.groupByDate();
        this.setMonthLabels(moment(this.startDate), moment(this.endDate));
        this.chartLabels = [...this.monthLabels];
      }
    }
  }

  modeChange(event: any) {
    if (!event || !event.detail || !event.detail.value) return;
    const viewMode = event.detail.value;

    if (viewMode === 'lastWeek') {
      this.stopCascadePropagationToDateSelects();
      this.startDate = moment().subtract(7, 'days').toISOString();
      this.endDate = moment().toISOString();
      this.chartLabels = this.weekLabels;
      this.groupByDate();
    }
  }

  selectDates(event: Event & { detail: { value: any } }) {
    if (!event || !event.detail || !event.detail.value) return;
    const date = moment(event.detail.value);

    this.stopCascadePropagationToDateSelects();
    if (this.viewMode === 'month') {
      this.startDate = date.startOf('month').toISOString();
      this.endDate = date.clone().endOf('month').toISOString();
      this.setMonthLabels(date.startOf('month'), date.clone().endOf('month'));
      this.chartLabels = this.monthLabels;
    } else {
      this.startDate = date.toISOString();
      this.endDate = date.toISOString();
    }

    this.groupByDate();
  }

  private groupByDate() {
    if (!this.data || !this.data.length) return;

    const groupDate = moment(this.startDate);
    const startStamp = groupDate.valueOf();
    const maxDate = moment(this.endDate);
    let readingDate: moment.Moment = null;
    let accumulator = 0;
    let numOfReadings = 0;
    let pushReading = 0;
    let iterator: IReading = null;
    this.displayData[0].data = [];

    let i = this.findIndexOfFirstReadingInRange(startStamp);

    if (i < 0) return;
    if (this.fillDaysWithMissingReadings(groupDate, moment(new Date(this.data[i].timestamp)), maxDate, true)) return;

    for (; i < this.data.length; i++) {
      if (groupDate.isAfter(maxDate)) break;
      
      iterator = this.data[i];
      readingDate = moment(+iterator.timestamp);

      if (readingDate.isSame(groupDate, 'day')) {
        accumulator += +iterator.value;
        numOfReadings++;
      } else {
        pushReading = numOfReadings ? accumulator / numOfReadings : 0;
        this.displayData[0].data.push(pushReading);
        if (this.fillDaysWithMissingReadings(groupDate, readingDate, maxDate, false)) break;

        groupDate.add(1, 'day');
        accumulator = +iterator.value;
        numOfReadings = 1;
      }

    }
    pushReading = numOfReadings ? accumulator / numOfReadings : 0;
    this.displayData[0].data.push(pushReading);
  }

  private stopCascadePropagationToDateSelects() {
    this.ignoreCount = 2;
  }

  private fillDaysWithMissingReadings(groupDate: moment.Moment, readingDate: moment.Moment, max: moment.Moment, setFirst: boolean): boolean {
    const noReadingsDays = readingDate.diff(groupDate, 'day');
    let reachedEndOfDataOrInterval = false;

    if (noReadingsDays > 0) {
      const daysLeftInInterval = max.diff(groupDate, 'days') + 1;
      let maxIterations = Math.min(noReadingsDays, daysLeftInInterval);
      reachedEndOfDataOrInterval = noReadingsDays > daysLeftInInterval;

      for (let i = setFirst ? 0 : 1; i < maxIterations; i++) {
        groupDate.add(1, 'day');
        this.displayData[0].data.push(0);
      }
    }

    return reachedEndOfDataOrInterval;
  }

  findIndexOfFirstReadingInRange(startStamp: number): number {
    return this.data.findIndex((value => value.timestamp >= startStamp));
  }
}
