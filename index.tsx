import { NEOVIXAR_ORIGIN } from './lib/neovixar';

const frame = document.getElementById('nv-mirror') as HTMLIFrameElement | null;
const fallback = document.getElementById('nv-fallback');

if (frame) {
  frame.src = `${NEOVIXAR_ORIGIN}/`;
  frame.addEventListener('error', () => {
    if (fallback) {
      fallback.style.display = 'flex';
      frame.style.display = 'none';
    }
  });
}
