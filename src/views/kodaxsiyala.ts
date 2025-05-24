import { html, css, LiteElement } from '@vandeurenglenn/lite'
import { customElement } from 'lit/decorators.js'
import '../components/post.js'
import Chart from 'chart.js/auto'

@customElement('kodaxsiyala-view')
export class KodaxsiyalaView extends LiteElement {
  static styles = [
    css`
      :host {
        overflow-y: auto;
        padding-bottom: 12px;
        flex-direction: column;
      }
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: var(--md-sys-shape-corner-extra-large);
        background-color: var(--md-sys-color-surface-container-highest);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--md-sys-color-on-surface-container-highest);
        border-radius: var(--md-sys-shape-corner-extra-large);
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.5) inset;
      }
      flex-container {
        max-width: 1280px;
        margin: 0 auto;
      }
      @media (max-width: 1280px) {
        :host {
          padding-bottom: 0px;
        }
        flex-container {
          border-radius: 0px;
        }
      }
      post-element:nth-of-type(even) {
        --flex-direction: row;
      }
      post-element:nth-of-type(odd) {
        --flex-direction: row-reverse;
      }
      canvas {
        max-width: 100%;
        width: 100%;
        height: 100%;
        margin: 24px auto 0 auto;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        border-radius: var(--md-sys-shape-corner-large);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        padding: 24px 12px 12px 12px;
        display: block;
        min-height: 460px;
        background: white;
        box-shadow: 0 3px 7px -1px rgba(0,0,0,.1);
      }
    `
  ]

  chartInstance?: Chart;

  connectedCallback(): void {
    requestAnimationFrame(() => {
      const ctx = (this.shadowRoot?.querySelector('#growthChart') as HTMLCanvasElement | null)?.getContext('2d');
      if (ctx) {
        this.chartInstance = new Chart(ctx, this.getChartConfig());
      }
    });
    window.addEventListener('resize', this.handleResize);
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    const ctx = (this.shadowRoot?.querySelector('#growthChart') as HTMLCanvasElement | null)?.getContext('2d');
    if (ctx) {
      this.chartInstance = new Chart(ctx, this.getChartConfig());
    }
  };

  private getChartConfig() {
    const isMobile = window.innerWidth <= 640;
    return {
      type: 'line' as const,
      data: {
        labels: ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            label: 'Teef 1',
            data: [412, 410],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Reu 1',
            data: [334, 350],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
          {
            label: 'Teef 2',
            data: [330, 340],
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
          },
          {
            label: 'Reu 2',
            data: [260, 272],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Reu 3',
            data: [398, 418],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
          },
          {
            label: 'Teef 3',
            data: [300, 308],
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 16 / 9,
        plugins: {
            legend: {
            position: isMobile ? 'bottom' : 'top',
            labels: {
                font: {
                size: isMobile ? 10 : 12
                }
            }
            }
            title: {
            display: true,
            text: isMobile ? 'Growth Chart (g)' : 'Puppy Growth Chart (Weight in grams)',
            font: {
                size: isMobile ? 12 : 18
            }
            }
        }
      }
    };
  }

  render() {
    return html`
    <flex-container>
      <post-element
        image="./img/litters/kodaxsiyala.webp"
        headline="Koda x Siyala"
        subline="23 Mei 2025"
        .content=${html`
        <ul>
            <li>Teef 1 - 16:35 - 412g - Brown Sable Merle</li>
            <li>Reu&nbsp;&nbsp;1 - 16:41 - 334g - Brown Sable</li>
            <li>Teef 2 - 17:10 - 330g - Brown Tricolor</li>
            <li>Reu&nbsp;&nbsp;2 - 17:16 - 260g - Brown Sable</li>
            <li>Reu&nbsp;&nbsp;3 - 17:40 - 398g - Brown Sable Merle</li>
            <li>Teef 3 - 17:53 - 300g - Brown (Possibly Tricolor)</li>
        </ul>
            `}
      ></post-element>
      </flex-container><flex-container>
      <canvas id="growthChart"></canvas>
      </flex-container>
    `
  }
}
