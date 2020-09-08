import { Injectable } from '@angular/core';

import { Chart } from 'chart.js';


interface ChartColor {
  hex: string;
  solid: string;
  strong: string;
  med: string;
  light: string;
}

interface YearData {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}


@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public years = ['2018', '2019', '2020'];

  private palette: ChartColor[] = [
    { hex: '#003f5c', solid: 'rgba(0,63,92,1)', strong: 'rgba(0,63,92,0.75)', med: 'rgba(0,63,92,0.5)', light: 'rgba(0,63,92,0.2)' },
    { hex: '#2f4b7c', solid: 'rgba(47,75,124,1)', strong: 'rgba(47,75,124,0.75)', med: 'rgba(47,75,124,0.5)', light: 'rgba(47,75,124,0.2)' },
    { hex: '#665191', solid: 'rgba(102,81,145,1)', strong: 'rgba(102,81,145,0.75)', med: 'rgba(102,81,145,0.5)', light: 'rgba(102,81,145,0.2)' },
    { hex: '#a05195', solid: 'rgba(160,81,149,1)', strong: 'rgba(160,81,149,0.75)', med: 'rgba(160,81,149,0.5)', light: 'rgba(160,81,149,0.2)' },
    { hex: '#d45087', solid: 'rgba(212,80,135,1)', strong: 'rgba(212,80,135,0.75)', med: 'rgba(212,80,135,0.5)', light: 'rgba(212,80,135,0.2)' },
    { hex: '#f95d6a', solid: 'rgba(249,93,106,1)', strong: 'rgba(249,93,106,0.75)', med: 'rgba(249,93,106,0.5)', light: 'rgba(249,93,106,0.2)' },
    { hex: '#ff7c43', solid: 'rgba(255,124,67,1)', strong: 'rgba(255,124,67,0.75)', med: 'rgba(255,124,67,0.5)', light: 'rgba(255,124,67,0.2)' },
    { hex: '#ffa600', solid: 'rgba(255,166,0,1)', strong: 'rgba(255,166,0,0.75)', med: 'rgba(255,166,0,0.5)', light: 'rgba(255,166,0,0.2)' }
  ];

  constructor() {
  }

  /**
   * Returns fake data within the specied range
   * @min lower limit for data series generation
   * @max higher limit for data series generation
   */
  public bugs(min: number = 25, max: number = 125): { label: string, data: { [key: string]: number } }[] {
    return this.years.map(y => ({
      label: y,
      data: this.months.reduce((acc, m) => {
        acc[m] = Math.floor(Math.random() * (max - min) + min);
        return acc;
      }, {})
    }));
  }

  /**
   * Returns a array of colors from the main palette
   * @number number of colors to return
   */
  public getColors(n: number): ChartColor[] {
    return this.palette.sort(() => 0.5 - Math.random()).slice(0, n);
  }
}

export interface BasicChartElement {
  _index: number;
  _datasetIndex: number;
  _chart: Chart;
  _model: any;
}
