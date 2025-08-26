import { createSignal, createEffect } from 'solid-js';
import { HiSolidLightBulb, HiOutlineLightBulb } from 'solid-icons/hi'

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = createSignal(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  createEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode());
  };

  return (
    <button onClick={toggleDarkMode} class="rounded-md  text-gray-600 dark:text-gray-100">
      {isDarkMode() ? <HiSolidLightBulb class="w-6 h-6" /> : <HiOutlineLightBulb class="w-6 h-6" />}
    </button>
  );
}

export default DarkModeToggle;