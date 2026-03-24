import { css } from '@vandeurenglenn/lite';

export const commonStyles = css`
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.2;
  }

  p {
    line-height: 1.7;
    margin: 0 0 14px 0;
  }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    border: none;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.25s ease,
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.25s ease;
    text-align: center;
    letter-spacing: 0.3px;
  }

  .btn:active {
    transform: scale(0.97) !important;
  }

  .btn-primary {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
    box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  }

  .btn-primary:hover {
    background-color: color-mix(in srgb, var(--md-sys-color-primary) 85%, black);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.28);
  }

  .btn-secondary {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .btn-secondary:hover {
    background-color: var(--md-sys-color-secondary);
    color: var(--md-sys-color-on-secondary);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.16);
  }

  /* Layout */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section {
    padding: 56px 0;
  }

  .section-title {
    text-align: center;
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--md-sys-color-on-surface);
    letter-spacing: -0.3px;
  }

  /* Card styles */
  .card {
    background-color: color-mix(in srgb, var(--md-sys-color-surface) 97%, transparent);
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08);
    border: 1px solid color-mix(in srgb, var(--md-sys-color-outline) 10%, transparent);
    overflow: hidden;
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.14);
  }

  /* Entrance animation keyframes */
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
