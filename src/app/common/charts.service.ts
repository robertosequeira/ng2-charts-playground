import { Injectable } from '@angular/core';

import { Chart } from 'chart.js';

interface ChartColor {
  hex: string;
  solid: string;
  background: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private palette: ChartColor[] = [
    { hex: '#003f5c', solid: 'rgba(0, 63, 92, 1)', background: 'rgba(0, 63, 92, 0.2)' },
    { hex: '#2f4b7c', solid: 'rgba(47,75,124,1)', background: 'rgba(47,75,124,0.2)' },
    { hex: '#665191', solid: 'rgba(102,81,145,1)', background: 'rgba(102,81,145,0.2)' },
    { hex: '#a05195', solid: 'rgba(160,81,149,1)', background: 'rgba(160,81,149,0.2)' },
    { hex: '#d45087', solid: 'rgba(212,80,135,1)', background: 'rgba(212,80,135,0.2)' },
    { hex: '#f95d6a', solid: 'rgba(249,93,106,1)', background: 'rgba(249,93,106,0.2)' },
    { hex: '#ff7c43', solid: 'rgba(255,124,67,1)', background: 'rgba(255,124,67,0.2)' },
    { hex: '#ffa600', solid: 'rgba(255,166,0,1)', background: 'rgba(255,166,0,0.2)' }
  ];

  constructor() {
  }

  /**
   * Returns a array of colors from the main palette
   * @number number of colors to return
   */
  public getColors(n: number): ChartColor[] {
    return this.palette.sort(() => 0.5 - Math.random()).slice(0, n);
  }
}
