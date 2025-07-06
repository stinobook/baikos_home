import { LiteElement, customElement, html, property } from '@vandeurenglenn/lite'
import { StyleList, css } from '@vandeurenglenn/lite/element'

@customElement('post-element')
export class PostElement extends LiteElement {
  @property()
  accessor image: string;

  @property({type: Array})
  accessor images: string[] = [];

  @property()
  accessor headline

  @property()
  accessor subline

  @property()
  accessor content

  @property({type: Boolean, reflect: true})  // Added reflect: true
  accessor visible: boolean = false;

  private observer: IntersectionObserver;

  // New properties for image viewer
  private static imageViewer: HTMLDivElement | null = null;
  private static currentImages: string[] = [];
  private static currentIndex: number = 0;
  private static isAnimating: boolean = false;

  @property({type: Boolean})
  accessor mainImage: boolean = true;

  @property({type: Number})
  accessor mainImageRows: number = 2;

  static styles?: StyleList = [
    css`
      :host {
        width: 100%;
        display: block;
        max-width: 1280px;
        height: fit-content;
        margin: 6px auto;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        border-radius: var(--md-sys-shape-corner-large);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
      }

      :host([visible]) .card {
        opacity: 1;
        transform: translateY(0);
      }

      :host * {
        box-sizing: border-box;
      }
      .card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease-out;
        display: flex;
        margin: 1rem auto;
        box-shadow: 0 3px 7px -1px rgba(#000, .1);
        line-height: 1.4;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: var(--flex-direction);
        align-items: stretch;
        align-content: stretch;
        gap: 12px;
        padding: 12px;
      }
      
      /* When no content, make it full width */
      .card.no-content {
        flex-direction: column;
      }
      
      .card.no-content .image-grid,
      .card.no-content .img {
        flex: 1 1 100%;
        max-width: 100%;
      }
      
      .card.no-content .image-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        min-height: 300px;
        grid-auto-rows: minmax(140px, 200px);
      }
      
      .img {
        flex: 1 1 30%;
        min-height:150px;
        align-items: center;
        display: flex;
      }
      img {
        width: 100%;
        max-height:300px;
        object-fit: contain;
        border-radius: 5px;
      }
      .content {
        position: relative;
        flex: 3 0 65%;
      }
      h1 {
        line-height: 1;
        margin: 24px 0;
        font-size: 1.7rem;
      }
      h2 {
        font-size: 1rem;
        font-weight: 300;
        margin-top: 5px;
      }
      p {
        position: relative;
        margin-bottom: 12px;
      }
      .ul {
        margin: 0 0 24px 20px;
        padding: 0;
        color: var(--md-sys-color-on-surface-variant);
      }
      
      li {
        margin-bottom: 8px;
        position: relative;
        line-height: 1.5;
      }
      
      li::before {
        content: "•";
        color: var(--md-sys-color-primary);
        font-weight: bold;
        display: inline-block;
        width: 20px;
        margin-left: -20px;
      }
      a {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        padding: 16px 38px;
        border: none;
        border-radius: var(--md-sys-shape-corner-medium);
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        letter-spacing: 0.5px;
      }
      a:hover {
        background-color: var(--md-sys-color-primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
      }

      custom-icon {
        --custom-icon-color: var(--md-sys-color-on-primary);
      }
      custom-button {
        margin-bottom: 12px;
      }
      th {
        text-align: left;
      }
      tr, td, th {
        padding: 0 12px;
      }
      @media (max-width: 640px) {
        .card {
          flex-direction: column;
        }
        img {
          margin: 0 auto;
          width: auto;
          max-width: 100%;
        }
      }

      .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-auto-rows: minmax(120px, auto);
        gap: 8px;
        flex: 1 1 30%;
        min-height: 150px;
        align-items: stretch;
        overflow: hidden;
        grid-auto-flow: row dense;
      }

      .main-image-wrapper {
        width: 100%;
        grid-column: 1 / -1 !important;
        grid-row: 1 / span 2 !important;
      }
      .main-image {
        min-height: 240px !important;
        max-height: 400px !important;
        object-fit: contain !important;
        object-position: center 25%;
        border-radius: 5px;
        width: 100% !important;
        display: block !important;
      }
      /* Extra Safari fix for grid image spanning */
      @media not all and (min-resolution:.001dpcm) {
        @supports (-webkit-appearance:none) {
          .main-image-wrapper {
            grid-column: 1 / -1 !important;
            grid-row: 1 / span 2 !important;
          }
          .main-image {
            min-height: 240px !important;
            max-height: 400px !important;
            width: 100% !important;
            display: block !important;
          }
        }
      }
      
      /* Adjust content area when no content */
      .content.has-only-titles {
        flex: 1 0 100%;
        text-align: center;
      }

      .image-grid img {
        width: 100%;
        height: 100%;
        min-height: 120px;
        max-height: 200px;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
        display: block;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }

      /* Mixed sizing for visual interest */
      .image-grid img:nth-child(3n+2):not(:first-child) {
        grid-row: span 2;
        min-height: 240px;
        max-height: 280px;
      }
      
      /* Ensure no overlapping in Safari */
      @media not all and (min-resolution:.001dpcm) { 
        @supports (-webkit-appearance:none) {
          .image-grid {
            grid-auto-flow: row;
            grid-auto-rows: minmax(120px, 180px);
          }
          
          .image-grid img {
            height: 100%;
            min-height: unset;
            max-height: unset;
            object-fit: cover;
          }
          
          .image-grid img:first-child {
            min-height: unset;
            max-height: unset;
          }
        }
      }

      @media (max-width: 640px) {
        .image-grid {
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        }
      }

      /* Fixed Image Viewer Styles */
      .image-viewer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .image-viewer-overlay.visible {
        display: flex !important;
        opacity: 1;
      }

      .image-container {
        position: relative;
        max-width: 100%;
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .image-container img {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
      }

      .viewer-controls {
        position: absolute;
        bottom: -50px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      }

      .nav-button {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
        font-size: 24px;
      }

      .nav-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease;
        font-size: 24px;
      }

      .close-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      .counter {
        color: white;
        font-size: 16px;
      }

      .img img, .image-grid img {
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .img img:hover, .image-grid img:hover {
        transform: scale(1.03);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideIn {
        from { transform: translateY(20px); }
        to { transform: translateY(0); }
      }
    `
  ]

  connectedCallback(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            this.setAttribute('visible', '');
          });
          this.observer.unobserve(this);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    requestAnimationFrame(() => {
      this.observer.observe(this);
    });

    // Initialize image viewer once on first component load
    if (!PostElement.imageViewer) {
      this.initializeImageViewer();
    }
  }

  disconnectedCallback(): void {
    this.observer?.disconnect();
  }

  // Create a completely independent image viewer with improved UI
  private static createOrUpdateImageViewer() {
    // Remove any existing viewer first to prevent duplicates
    const existingViewer = document.getElementById('global-image-viewer');
    if (existingViewer) {
      existingViewer.remove();
    }
    
    // Create a fresh viewer element
    const viewer = document.createElement('div');
    viewer.id = 'global-image-viewer';
    viewer.style.position = 'fixed';
    viewer.style.zIndex = '999999';
    viewer.style.top = '0';
    viewer.style.left = '0';
    viewer.style.width = '100vw';
    viewer.style.height = '100vh';
    viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    viewer.style.display = 'none';
    viewer.style.opacity = '0';
    viewer.style.transition = 'opacity 0.3s ease';
    viewer.style.overflow = 'hidden';
    
    // Add HTML content with improved UI layout
    viewer.innerHTML = `
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <!-- Image container -->
        <div style="position: relative; max-width: 85vw; max-height: 80vh; display: flex; align-items: center; justify-content: center;">
          <img src="" alt="Fullscreen view" style="max-width: 85vw; max-height: 80vh; object-fit: contain; box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);">
        </div>
        
        <!-- Fixed position UI controls -->
        <!-- Close button at top right -->
        <button style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 28px; transition: background 0.2s ease;">&times;</button>
        
        <!-- Navigation buttons at sides -->
        <button class="prev-btn" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 30px; transition: background 0.2s ease;">&#10094;</button>
        
        <button class="next-btn" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 30px; transition: background 0.2s ease;">&#10095;</button>
        
        <!-- Counter at bottom center -->
        <div style="position: absolute; bottom: 20px; left: 0; width: 100%; display: flex; justify-content: center; align-items: center;">
          <span style="color: white; font-size: 18px; background: rgba(0, 0, 0, 0.5); padding: 8px 16px; border-radius: 20px;">1 / 1</span>
        </div>
      </div>
    `;
    
    // Add hover effects for buttons
    const buttons = viewer.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseover', () => {
        button.style.background = 'rgba(255, 255, 255, 0.3)';
      });
      button.addEventListener('mouseout', () => {
        button.style.background = 'rgba(255, 255, 255, 0.2)';
      });
    });
    
    // Append to body outside any shadow DOM
    document.body.appendChild(viewer);
    
    // Add event listeners directly
    viewer.addEventListener('click', (e) => {
      if (e.target === viewer) {
        PostElement.closeViewer(viewer);
      }
    });
    
    const closeBtn = viewer.querySelector('button');
    closeBtn?.addEventListener('click', () => {
      PostElement.closeViewer(viewer);
    });
    
    const prevBtn = viewer.querySelector('.prev-btn');
    prevBtn?.addEventListener('click', () => {
      PostElement.showPrevImage(viewer);
    });
    
    const nextBtn = viewer.querySelector('.next-btn');
    nextBtn?.addEventListener('click', () => {
      PostElement.showNextImage(viewer);
    });
    
    // Add global keyboard events
    const keyHandler = (e: KeyboardEvent) => {
      if (viewer.style.display !== 'flex') return;
      
      switch (e.key) {
        case 'Escape': 
          PostElement.closeViewer(viewer);
          break;
        case 'ArrowLeft': 
          PostElement.showPrevImage(viewer);
          break;
        case 'ArrowRight': 
          PostElement.showNextImage(viewer);
          break;
      }
    };
    
    document.addEventListener('keydown', keyHandler);
    
    return viewer;
  }
  
  // Replace initializeImageViewer with this
  private initializeImageViewer() {
    // No need to store in a class property - we'll get it from the DOM
  }

  // Completely rewritten openImage method with improved UI visibility
  openImage(index: number) {
    const imagesToShow = this.images?.length ? this.images : [this.image];
    if (!imagesToShow.length) return;
    
    // Create or get the viewer
    const viewer = PostElement.createOrUpdateImageViewer();
    
    // Store data in the viewer's dataset (HTML5 data attributes)
    viewer.dataset.currentIndex = index.toString();
    viewer.dataset.images = JSON.stringify(imagesToShow);
    
    // Update image and counter
    const img = viewer.querySelector('img');
    const counter = viewer.querySelector('span');
    
    if (img) {
      (img as HTMLImageElement).src = imagesToShow[index];
    }
    
    // Show/hide navigation buttons and counter based on number of images
    const prevBtn = viewer.querySelector('.prev-btn');
    const nextBtn = viewer.querySelector('.next-btn');
    const counterContainer = counter?.parentElement;
    
    if (imagesToShow.length <= 1) {
      // Hide navigation buttons and counter for single images
      if (prevBtn) (prevBtn as HTMLElement).style.display = 'none';
      if (nextBtn) (nextBtn as HTMLElement).style.display = 'none';
      if (counterContainer) (counterContainer as HTMLElement).style.display = 'none';
    } else {
      // Show navigation and counter for multiple images
      if (prevBtn) (prevBtn as HTMLElement).style.display = 'flex';
      if (nextBtn) (nextBtn as HTMLElement).style.display = 'flex';
      if (counterContainer) (counterContainer as HTMLElement).style.display = 'flex';
      
      // Update counter text
      if (counter) {
        counter.textContent = `${index + 1} / ${imagesToShow.length}`;
      }
      
      // Update prev/next button state based on current position
      if (prevBtn) (prevBtn as HTMLElement).style.opacity = index === 0 ? '0.5' : '1';
      if (nextBtn) (nextBtn as HTMLElement).style.opacity = index === imagesToShow.length - 1 ? '0.5' : '1';
    }
    
    // Show the viewer with direct style manipulation
    viewer.style.display = 'flex';
    
    // Force reflow
    void viewer.offsetWidth;
    
    // Fade in
    viewer.style.opacity = '1';
  }
  
  // Static methods for navigation
  private static closeViewer(viewer: HTMLElement) {
    viewer.style.opacity = '0';
    
    setTimeout(() => {
      viewer.style.display = 'none';
    }, 300);
  }
  
  // Update showPrevImage with improved navigation state
  private static showPrevImage(viewer: HTMLElement) {
    const currentIndex = parseInt(viewer.dataset.currentIndex || '0');
    const images = JSON.parse(viewer.dataset.images || '[]');
    
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      viewer.dataset.currentIndex = newIndex.toString();
      
      const img = viewer.querySelector('img');
      const counter = viewer.querySelector('span');
      const prevBtn = viewer.querySelector('.prev-btn');
      const nextBtn = viewer.querySelector('.next-btn');
      
      // Update navigation button states
      if (prevBtn) (prevBtn as HTMLElement).style.opacity = newIndex === 0 ? '0.5' : '1';
      if (nextBtn) (nextBtn as HTMLElement).style.opacity = '1'; // Always enabled when going backwards
      
      if (img) {
        (img as HTMLImageElement).style.opacity = '0';
        
        setTimeout(() => {
          (img as HTMLImageElement).src = images[newIndex];
          (img as HTMLImageElement).style.opacity = '1';
          
          if (counter) {
            counter.textContent = `${newIndex + 1} / ${images.length}`;
          }
        }, 200);
      }
    }
  }
  
  // Update showNextImage with improved navigation state
  private static showNextImage(viewer: HTMLElement) {
    const currentIndex = parseInt(viewer.dataset.currentIndex || '0');
    const images = JSON.parse(viewer.dataset.images || '[]');
    
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      viewer.dataset.currentIndex = newIndex.toString();
      
      const img = viewer.querySelector('img');
      const counter = viewer.querySelector('span');
      const prevBtn = viewer.querySelector('.prev-btn');
      const nextBtn = viewer.querySelector('.next-btn');
      
      // Update navigation button states
      if (prevBtn) (prevBtn as HTMLElement).style.opacity = '1'; // Always enabled when going forwards
      if (nextBtn) (nextBtn as HTMLElement).style.opacity = newIndex === images.length - 1 ? '0.5' : '1';
      
      if (img) {
        img.style.opacity = '0';
        
        setTimeout(() => {
          img.src = images[newIndex];
          img.style.opacity = '1';
          
          if (counter) {
            counter.textContent = `${newIndex + 1} / ${images.length}`;
          }
        }, 200);
      }
    }
  }

  _renderImages() {
    if (this.images?.length) {
      if (this.images.length === 1) {
        return this._renderSingleImage(this.images[0]);
      }
      // Determine if this post has content
      const hasContent = this.content || this.shadowRoot?.querySelector('slot')?.assignedNodes().length;
      // Use main image style by default if there is content
      if (hasContent) {
        return html`
          <div class="image-grid">
            <div class="main-image-wrapper">
              <img class="main-image" loading="lazy" src=${this.images[0]} @click=${() => this.openImage(0)} />
            </div>
            ${this.images.slice(1).map((img, i) => html`
              <img class="after-main-image" loading="lazy" src=${img} @click=${() => this.openImage(i+1)} />
            `)}
          </div>
        `;
      }
      // No content: show all images normal
      return html`
        <div class="image-grid">
          ${this.images.map((img, i) => html`
            <img loading="lazy" src=${img} @click=${() => this.openImage(i)} />
          `)}
        </div>
      `;
    }
    return this._renderImage();
  }

  _renderSingleImage(src: string) {
    return html`
      <div class="img">
        <img loading="lazy" src=${src} @click=${() => this.openImage(0)} />
      </div>
    `;
  }

  _renderImage() {
    if (!this.image) return '';
    return this._renderSingleImage(this.image);
  }

  _renderHeadline() {
    if (!this.headline) return ''
    return html`<h1>${this.headline}</h1>`
  }

  _renderSubline() {
    if (!this.subline) return ''
    return html`<h2>${this.subline}</h2>`
  }

  _renderContent() {
    if (!this.content) return ''
    return html`${this.content}`
  }

  render() {
    const hasContent = this.content || this.shadowRoot?.querySelector('slot')?.assignedNodes().length;
    const hasOnlyTitles = !hasContent && (this.headline || this.subline);
    
    return html`
    <div class="card ${hasOnlyTitles ? 'no-content' : ''}">
        ${this._renderImages()}
      <div class="content ${hasOnlyTitles ? 'has-only-titles' : ''}">
        ${this._renderHeadline()} 
        ${this._renderSubline()}
        ${this._renderContent()}
       <slot></slot>
      </div>
    </div>
    `
  }
}