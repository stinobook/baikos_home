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
        gap: 12px;
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
        background-color: var(--md-sys-color-surface) !important;
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
    const legendPosition: 'top' | 'bottom' = isMobile ? 'bottom' : 'top';
    // Automatically generate labels based on the longest dataset
    const datasets = [
      { label: 'Teef 1', data: [412, 410, 430, 470, 522, 572, 648, 684, 722, 792, 816, 854, 884, 908, 935, 962, 1010, 1035, 1070, 1100] },
      { label: 'Reu 1', data: [334, 350, 374, 402, 450, 506, 542, 580, 642, 716, 744, 786, 848, 890, 930, 970, 1030, 1080, 1145, 1190] },
      { label: 'Teef 2', data: [330, 340, 366, 398, 442, 504, 560, 620, 676, 730, 760, 796, 840, 874, 889, 934, 970, 1015, 1075, 1120] },
      { label: 'Reu 2', data: [260, 272, 308, 338, 380, 434, 472, 518, 566, 602, 632, 672, 702, 734, 764, 794, 824, 866, 902, 942] },
      { label: 'Reu 3', data: [398, 418, 448, 490, 556, 622, 676, 720, 768, 834, 858, 908, 932, 968, 998, 1035, 1075, 1105, 1140, 1150] },
      { label: 'Teef 3', data: [300, 308, 334, 364, 420, 476, 520, 560, 612, 674, 690, 756, 800, 820, 841, 862, 914, 962, 1045, 1100] },
    ];
    const maxLength = Math.max(...datasets.map(ds => ds.data.length));
    const labels = Array.from({ length: maxLength }, (_, i) => `Day ${i}`);
    return {
      type: 'line' as const,
      data: {
        labels,
        datasets: datasets.map((ds, i) => ({
          ...ds,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ][i],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ][i],
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 16 / 9,
        plugins: {
            legend: {
            position: legendPosition,
            labels: {
                font: {
                size: isMobile ? 10 : 12
                }
            }
            },
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
      .images=${[
          './img/litters/kodaxsiyala.webp',
          './img/litters/kodaxsiyala/1.webp',
      ]}
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
      <canvas id="growthChart"></canvas>
      <post-element
      .images=${[
        './img/litters/kodaxsiyala/teef1a.webp',
        './img/litters/kodaxsiyala/teef1b.webp',
        './img/litters/kodaxsiyala/teef1c.webp',
        './img/litters/kodaxsiyala/teef1d.webp',
        './img/litters/kodaxsiyala/teef1e.webp',
        './img/litters/kodaxsiyala/teef1f.webp',
        './img/litters/kodaxsiyala/teef1g.webp',
        './img/litters/kodaxsiyala/teef1h.webp'
      ]}
        headline="Teef 1"
        subline="Brown Sable Merle"
      ></post-element>
      <post-element
        .images=${[
          './img/litters/kodaxsiyala/reu1a.webp',
          './img/litters/kodaxsiyala/reu1b.webp',
          './img/litters/kodaxsiyala/reu1c.jpeg',
          './img/litters/kodaxsiyala/reu1d.jpeg',
          './img/litters/kodaxsiyala/reu1e.webp',
          './img/litters/kodaxsiyala/reu1f.webp',
          './img/litters/kodaxsiyala/reu1g.webp'
        ]}
        headline="Reu 1"
        subline="Brown Sable"
      ></post-element>
      <post-element
        .images=${[
          './img/litters/kodaxsiyala/teef2a.webp',
          './img/litters/kodaxsiyala/teef2b.webp',
          './img/litters/kodaxsiyala/teef2c.webp',
          './img/litters/kodaxsiyala/teef2d.webp',
          './img/litters/kodaxsiyala/teef2e.webp',
          './img/litters/kodaxsiyala/teef2f.webp',
          './img/litters/kodaxsiyala/teef2g.webp',
          './img/litters/kodaxsiyala/teef2h.webp',
          './img/litters/kodaxsiyala/teef2i.webp'
        ]}
        headline="Teef 2"
        subline="Brown Tricolor"
      ></post-element>
      <post-element
        .images=${[
          './img/litters/kodaxsiyala/reu2a.webp',
          './img/litters/kodaxsiyala/reu2b.webp',
          './img/litters/kodaxsiyala/reu2c.webp',
          './img/litters/kodaxsiyala/reu2d.webp',
          './img/litters/kodaxsiyala/reu2e.webp',
          './img/litters/kodaxsiyala/reu2f.webp',
          './img/litters/kodaxsiyala/reu2g.webp'
        ]}
        headline="Reu 2"
        subline="Brown Sable"
      ></post-element>
      <post-element
        .images=${[
          './img/litters/kodaxsiyala/reu3a.webp',
          './img/litters/kodaxsiyala/reu3b.webp',
          './img/litters/kodaxsiyala/reu3c.webp',
          './img/litters/kodaxsiyala/reu3d.webp',
          './img/litters/kodaxsiyala/reu3e.webp',
          './img/litters/kodaxsiyala/reu3f.webp',
          './img/litters/kodaxsiyala/reu3g.webp',
          './img/litters/kodaxsiyala/reu3h.webp'
        ]}
        headline="Reu 3"
        subline="Brown Sable Merle"
      ></post-element>
      <post-element
        .images=${[
          './img/litters/kodaxsiyala/teef3a.webp',
          './img/litters/kodaxsiyala/teef3b.webp',
          './img/litters/kodaxsiyala/teef3c.webp',
          './img/litters/kodaxsiyala/teef3d.webp',
          './img/litters/kodaxsiyala/teef3e.webp',
          './img/litters/kodaxsiyala/teef3f.webp',
          './img/litters/kodaxsiyala/teef3g.webp',
          './img/litters/kodaxsiyala/teef3h.webp'
        ]}
        headline="Teef 3"
        subline="Brown (Possibly Tricolor)"
      ></post-element>
      </flex-container>
    `
  }
}
