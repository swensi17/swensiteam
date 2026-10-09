/** Canonical portfolio site (source of truth for content). */
export const NEOVIXAR_ORIGIN = 'https://neovixar.com';

/** Where GitHub Pages should send visitors (always the live site). */
export function neovixarHomeUrl(): string {
  return `${NEOVIXAR_ORIGIN}/`;
}

export function redirectToNeovixar(): void {
  const target = neovixarHomeUrl();
  if (window.location.href === target) return;
  window.location.replace(target);
}
