import { html, css, LiteElement, property, customElement } from '@vandeurenglenn/lite';

@customElement('contact-view')
export class ContactView extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
      }

      .contact-container {
        display: flex;
        flex-direction: row;
        gap: 32px;
        max-width: 1000px;
        width: 100%;
        flex-wrap: wrap;
        padding: 24px;
        border-radius: var(--md-sys-shape-corner-small);
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0 3px 7px -1px rgba(#000, .1);
      }

      .contact-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
        background-color: var(--md-sys-color-surface-variant);
        border-radius: var(--md-sys-shape-corner-medium);
      }
      .header-container {
        display: flex;
        align-items: center;
        width: 100%;
      }
      
      .title {
        font-size: 20px;
        font-weight: bold;
        color: var(--md-sys-color-on-surface);
      }
      
      .social-icons {
        display: flex;
        gap: 16px;
        margin-left: auto; /* Push to right */
      }

      .social-icons {
        display: flex;
        gap: 16px;
        margin-top: 16px;
      }

      .social-icons a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        background-color: var(--md-sys-color-primary);
        border-radius: 50%;
        text-decoration: none;
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      .social-icons a:hover {
        background-color: var(--md-sys-color-primary-dark);
        transform: scale(1.1);
      }

      .social-icons svg {
        width: 24px;
        height: 24px;
        fill: var(--md-sys-color-on-primary);
      }

      .contact-form {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      label {
        font-weight: bold;
        font-size: 14px;
        color: var(--md-sys-color-on-surface);
      }

      input,
      textarea {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        border: 1px solid var(--md-sys-color-outline);
        border-radius: var(--md-sys-shape-corner-medium);
        background-color: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface);
        outline: none;
        transition: border-color 0.3s ease-in-out;
        box-sizing: border-box;
      }

      input:focus,
      textarea:focus {
        border-color: var(--md-sys-color-primary);
        box-shadow: 0 0 5px var(--md-sys-color-primary-light);
      }

      textarea {
        resize: vertical;
        min-height: 150px;
      }

      button {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        padding: 14px;
        font-size: 16px;
        border: none;
        border-radius: var(--md-sys-shape-corner-medium);
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
      }

      button:hover {
        background-color: var(--md-sys-color-primary-dark);
      }

      /* Responsive Layout */
      @media (max-width: 768px) {
        .contact-container {
          flex-direction: column;
        }
      }
    `
  ];

  @property({ type: String }) accessor subject = '';
  @property({ type: String }) accessor email = '';
  @property({ type: String }) accessor message = '';
  @property({ type: String }) accessor successMessage = '';
  @property({ type: String }) accessor errorMessage = '';

  async handleSubmit(e: Event) {
    e.preventDefault();

    if (!this.subject.value.trim() || !this.email.value.trim() || !this.message.value.trim()) {
      this.errorMessage = 'Alle velden zijn verplicht.';
      this.successMessage = '';
      return;
    }

    const formData = new FormData();
    formData.append("entry.1830700209", this.subject.value.trim());
    formData.append("entry.1918043850", this.email.value.trim());
    formData.append("entry.1135930811", this.message.value.trim());

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSfSii_KTjca2F8NIlTjTjB5irLXqJ79wQvFTwUGpUVR-3qCHg/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      this.successMessage = 'Bedankt voor je bericht!';
      this.errorMessage = '';

      this.subject = '';
      this.email = '';
      this.message = '';
    } catch (error) {
      this.errorMessage = 'Er liep iets mis, probeer later opnieuw.';
      this.successMessage = '';
    }
  }
  render() {
    return html`
      <div class="contact-container">
        <div class="header-container">
          <h2 class="title">Neem contact met ons op</h2>
          <div class="social-icons">
            <a href="https://maps.google.com/?q=Baiko's Home Bosstraat, Erpe-Mere" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
            <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
          </svg>
            </a>
            <a href="tel:+32486295339">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
            </a>
            <a href="https://www.facebook.com/BaikosHome" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
          </svg>          </a>
            <a href="https://www.instagram.com/baikos_home" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
          </svg>          </a>
          </div>
        </div>

        <div class="contact-form">
          <form @submit="${this.handleSubmit}">
          <label for="subject">Onderwerp:</label>
          <input
            type="text"
            name="subject"
            required
          />
          <label for="email">Uw E-mail adres:</label>
          <input
            type="email"
            name="email"
            required
          />
          <label for="message">Uw vraag:</label>
          <textarea
            name="message"
            required
          ></textarea>
            <button type="submit">Verzenden</button>
          </form>
        </div>
      </div>
    `;
  }
}