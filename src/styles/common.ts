import { css } from '@vandeurenglenn/lite';

export const commonStyles = css`
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    line-height: 1.2;
  }
  
  p {
    line-height: 1.6;
    margin: 0 0 16px 0;
  }
  
  /* Buttons */
  .btn {
    display: inline-block;
    padding: 12px 24px;
    border: none;
    border-radius: var(--md-sys-shape-corner-medium);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    text-align: center;
  }
  
  .btn-primary {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
  }
  
  .btn-primary:hover {
    background-color: var(--md-sys-color-primary-dark);
    transform: scale(1.05);
  }
  
  .btn-secondary {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }
  
  .btn-secondary:hover {
    background-color: var(--md-sys-color-secondary);
    color: var(--md-sys-color-on-secondary);
  }
  
  /* Layout */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .section {
    padding: 64px 0;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.25rem;
    font-weight: 600;
    margin-bottom: 48px;
    color: var(--md-sys-color-on-surface);
  }
  
  /* Card styles */
  .card {
    background-color: var(--md-sys-color-surface);
    border-radius: var(--md-sys-shape-corner-medium);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;
