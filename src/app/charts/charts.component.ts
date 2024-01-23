import { Component, Input } from '@angular/core';
import { ChartData, ChartDatasetProperties, ChartOptions } from 'chart.js';
import { FormResult } from '../models/form-result';

@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent{

  barChartData: ChartData | undefined;
  barChartOptions: ChartOptions = {
    plugins: {
        legend: {
            display: false,
         }
    },
    scales: {
      x: {
          ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 60
          }
      }
    },
    responsive: true
  };
  barChartProperties!: ChartDatasetProperties<any, any>;

  pieChartData: ChartData | undefined;
  pieChartOptions: ChartOptions = {
    plugins: {
        legend: {
            display: false,
         }
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  pieChartProperties!: ChartDatasetProperties<any, any>;


  @Input() formResult!: FormResult[];

  ngOnChanges(): void {
    this.formResult = this.filterFormResult(this.formResult);
    this.generateBarChart();
    this.generatePieChart();
  }

  generateBarChart(): void {
    const headersCountMap = new Map<string, { total: number, successful: number }>();

    this.formResult.forEach(result => {
      result.headers.forEach(header => {
        const headerName = header.type;
        const currentCount = headersCountMap.get(headerName) || { total: 0, successful: 0 };
        currentCount.total++;
        if (header.status === 'SUCCESS') {
          currentCount.successful++;
        }

        if (currentCount.successful > 0) {
          headersCountMap.set(headerName, currentCount);
        }
      });
    });

    const labels = Array.from(headersCountMap.keys());
    const data = labels.map(headerName => {
      const counts = headersCountMap.get(headerName);
      return counts ? (counts.successful / this.formResult.length) * 100 : 0;
    });

    this.barChartData = {
      labels: labels,
      datasets: [{
        label: 'Success rate in %',
        data: data,
        backgroundColor: this.generateRandomColors(labels.length),
        borderWidth: 0
      }],
    };
  }

  generatePieChart(): void {
    const certificatesCountMap = new Map<string, number>();

    this.formResult.forEach(result => {
      const certificateName = result.certificate;
      const currentCount = certificatesCountMap.get(certificateName) || 0;
      certificatesCountMap.set(certificateName, currentCount + 1);
    });

    const labels = Array.from(certificatesCountMap.keys());

    const data = labels.map(headerName => {
      const counts = certificatesCountMap.get(headerName);
      return counts ? (counts / this.formResult.length) * 100 : 0;
    });

    this.pieChartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: this.generateRandomColors(labels.length),
        borderWidth: 0
      }],
    };
  }

  filterFormResult(formResult: FormResult[]): FormResult[] {
    return formResult.filter(result => !result.error);
  }

  generateRandomColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
