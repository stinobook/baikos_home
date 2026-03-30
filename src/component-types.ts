export interface CustomPages extends HTMLElement {
  rendered: Promise<void>
  select(value: string): void
}

export interface CustomSelector extends HTMLElement {
  selected?: string
}
