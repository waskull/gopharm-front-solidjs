/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import Routes from './routes';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'No se encuentra el elemento "root" en el index.html para renderizar la app',
  );
}

render(
    () => (
        <Routes />
    ),
    root
);