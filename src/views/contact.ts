import { html, css, LiteElement, property } from '@vandeurenglenn/lite';
import { customElement } from 'lit/decorators.js'

@customElement('contact-view')
export class ContactView extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 16px 12px;
        width: 100%;
        box-sizing: border-box;
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-thumb {
        background: color-mix(in srgb, var(--md-sys-color-on-surface-container-highest) 50%, transparent);
        border-radius: 4px;
      }

      .contact-container {
        display: flex;
        flex-direction: row;
        gap: 0;
        max-width: 960px;
        width: 100%;
        flex-wrap: wrap;
        border-radius: 20px;
        background-color: color-mix(in srgb, var(--md-sys-color-surface) 97%, transparent);
        color: var(--md-sys-color-on-surface);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.1);
        border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 12%, transparent);
        overflow: hidden;
        animation: fadeSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .contact-info {
        flex: 0 0 260px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 32px 24px;
        background-color: color-mix(in srgb, var(--md-sys-color-primary) 15%, var(--md-sys-color-surface));
        border-right: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 10%, transparent);
      }

      .header-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        padding-bottom: 20px;
        border-bottom: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 15%, transparent);
        margin-bottom: 4px;
      }

      .title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--md-sys-color-on-surface);
        line-height: 1.3;
        letter-spacing: -0.2px;
      }

      .contact-address {
        font-size: 0.88rem;
        color: var(--md-sys-color-on-surface-variant);
        line-height: 1.6;
        margin: 0;
      }

      .social-icons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 4px;
      }

      .social-icons a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: var(--md-sys-color-primary);
        border-radius: 50%;
        text-decoration: none;
        transition:
          background-color 0.25s ease,
          transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 0.25s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }

      .social-icons a:hover {
        background-color: color-mix(in srgb, var(--md-sys-color-primary) 85%, black);
        transform: translateY(-2px) scale(1.08);
        box-shadow: 0 6px 16px rgba(0,0,0,0.25);
      }

      .social-icons a:active {
        transform: scale(0.95);
      }

      .social-icons svg {
        width: 18px;
        height: 18px;
        fill: var(--md-sys-color-on-primary);
      }

      .contact-form {
        flex: 1;
        min-width: 280px;
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 32px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      label {
        font-weight: 600;
        font-size: 0.83rem;
        color: var(--md-sys-color-on-surface-variant);
        letter-spacing: 0.3px;
        text-transform: uppercase;
        margin-top: 12px;
        margin-bottom: 4px;
        display: block;
      }

      input,
      textarea {
        width: 100%;
        padding: 11px 14px;
        font-size: 0.97rem;
        border: 1.5px solid color-mix(in srgb, var(--md-sys-color-outline) 50%, transparent);
        border-radius: 12px;
        background-color: color-mix(in srgb, var(--md-sys-color-surface-variant) 60%, transparent);
        color: var(--md-sys-color-on-surface);
        outline: none;
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease,
          background-color 0.2s ease;
        box-sizing: border-box;
        font-family: inherit;
      }

      input:hover,
      textarea:hover {
        border-color: color-mix(in srgb, var(--md-sys-color-outline) 80%, transparent);
      }

      input:focus,
      textarea:focus {
        border-color: var(--md-sys-color-primary);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--md-sys-color-primary) 20%, transparent);
        background-color: var(--md-sys-color-surface);
      }

      textarea {
        resize: vertical;
        min-height: 130px;
      }

      button {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        margin-top: 20px;
        padding: 13px 32px;
        border: none;
        border-radius: 40px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.3px;
        transition:
          background-color 0.25s ease,
          transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 0.25s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        align-self: flex-start;
      }

      button:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--md-sys-color-primary) 85%, black);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
      }

      button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      /* Responsive Layout */
      @media (max-width: 680px) {
        :host {
          padding: 8px 6px;
        }
        .contact-container {
          border-radius: 16px;
          flex-direction: column;
        }
        .contact-info {
          flex: none;
          width: 100%;
          box-sizing: border-box;
          border-right: none;
          border-bottom: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 10%, transparent);
          padding: 24px 20px;
        }
        .contact-form {
          flex: none;
          width: 100%;
          box-sizing: border-box;
          padding: 24px 20px;
        }
      }

      /* Status messages */
      .success-message {
        background-color: rgba(76, 175, 80, 0.1);
        border-left: 3px solid #4caf50;
        padding: 12px 16px;
        margin-bottom: 16px;
        color: #2e7d32;
        border-radius: 0 10px 10px 0;
        font-size: 0.92rem;
        animation: fadeSlideUp 0.3s ease;
      }

      .error-message {
        background-color: color-mix(in srgb, var(--md-sys-color-error) 10%, transparent);
        border-left: 3px solid var(--md-sys-color-error);
        padding: 12px 16px;
        margin-bottom: 16px;
        color: var(--md-sys-color-error);
        border-radius: 0 10px 10px 0;
        font-size: 0.92rem;
        animation: fadeSlideUp 0.3s ease;
      }

      /* Loading indicator */
      .loading {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2.5px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: var(--md-sys-color-on-primary);
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      button:disabled {
        opacity: 0.65;
        cursor: not-allowed;
      }
    `
  ];

  @property() accessor name: string = '';
  @property() accessor email: string = '';
  @property() accessor subject: string = '';
  @property() accessor message: string = '';
  @property() accessor successMessage: string = '';
  @property() accessor errorMessage: string = '';
  @property() accessor isSubmitting: boolean = false;

  /**
   * Resets form fields
   */
  resetForm() {
    console.log('Resetting form...');
    
    // Reset our property values
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    
    // Reset the actual form fields in the DOM
    const nameInput = this.shadowRoot?.querySelector<HTMLInputElement>('#name');
    const emailInput = this.shadowRoot?.querySelector<HTMLInputElement>('#email');
    const subjectInput = this.shadowRoot?.querySelector<HTMLInputElement>('#subject');
    const messageInput = this.shadowRoot?.querySelector<HTMLTextAreaElement>('#message');
    
    console.log('Form inputs:', { nameInput, emailInput, subjectInput, messageInput });
    
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (subjectInput) subjectInput.value = '';
    if (messageInput) messageInput.value = '';
  }
  
  /**
   * Handles the form submission by sending data to Firebase Cloud Function
   */
  handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    // Extract form data
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    
    // Get form field values
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    // Client-side validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      this.errorMessage = 'Alle velden zijn verplicht.';
      this.successMessage = '';
      return;
    }
    
    // Set loading state
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    try {
      console.log('Sending email via Firebase function...');
      
      // Updated URL to use Europe region
      const response = await fetch('https://europe-west1-baikos-home.cloudfunctions.net/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      });
      
      console.log('Response received:', response.status);
      
      if (response.ok) {
        this.successMessage = 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.';
        this.resetForm();
    } else {
        // Parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { error: 'Er is een onbekende fout opgetreden.' };
        }
        
        this.errorMessage = errorData.error || 'Er is een fout opgetreden bij het verzenden van je bericht.';
        console.error('Form submission error:', errorData);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.errorMessage = 'Er is een probleem opgetreden bij het verzenden van je bericht. Controleer je internetverbinding en probeer het later opnieuw.';
    } finally {
      // Always reset loading state
      this.isSubmitting = false;
    }
  }

  render() {
    return html`
      <div class="contact-container">
        <div class="contact-info">
          <div class="header-container">
            <h2 class="title">Neem contact met ons op</h2>
            <p class="contact-address">Baiko's Home<br />Bosstraat 136<br />9420 Mere<br />BE0730642897</p>
          </div>
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
          ${this.successMessage ? html`<div class="success-message">${this.successMessage}</div>` : ''}
          ${this.errorMessage ? html`<div class="error-message">${this.errorMessage}</div>` : ''}
          <form @submit="${this.handleSubmit}">
            <label for="name">Naam:</label>
            <input
              type="text"
              id="name"
              name="name"
              .value="${this.name}"
              @input="${(e: Event) => this.name = (e.target as HTMLInputElement).value}"
              required
            />
            
            <label for="email">E-mailadres:</label>
            <input
              type="email"
              id="email"
              name="email"
              .value="${this.email}"
              @input="${(e: Event) => this.email = (e.target as HTMLInputElement).value}"
              required
            />
            
            <label for="subject">Onderwerp:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              .value="${this.subject}"
              @input="${(e: Event) => this.subject = (e.target as HTMLInputElement).value}"
              required
            />
            
            <label for="message">Bericht:</label>
            <textarea
              id="message"
              name="message"
              .value="${this.message}"
              @input="${(e: Event) => this.message = (e.target as HTMLTextAreaElement).value}"
              required
            ></textarea>
            
            <button type="submit" ?disabled="${this.isSubmitting}">
              ${this.isSubmitting ? 'Verzenden...' : 'Verzenden'} 
              ${this.isSubmitting ? html`<span class="loading"></span>` : ''}
            </button>
          </form>
        </div>
      </div>
    `;
  }
}