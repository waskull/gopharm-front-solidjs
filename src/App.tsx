import { useNavigate } from '@solidjs/router';
import { createSignal, Show, type Component } from 'solid-js';
import { FaBrandsFacebook, FaBrandsInstagram, FaBrandsTwitter } from "solid-icons/fa";
import "solid-slider/slider.css";
import DarkModeToggle from './components/DarkModeToggle';
const App: Component = () => {
  const navigate = useNavigate();
  const [toggleAlert, setToggleAlert] = createSignal(false);
  return (
    <div>
      <Show when={!toggleAlert()}>
        <div class="flex items-center justify-between p-1 leading-normal text-blue-600 bg-blue-200" role="alert">
          <p class="font-semibold ml-12">Recuerda seguirnos en redes sociales <FaBrandsFacebook class="inline mr-2 ml-4 cursor-pointer" /> <FaBrandsInstagram class="inline mr-2 cursor-pointer text-orange-500" /> <FaBrandsTwitter class="inline mr-2 cursor-pointer text-blue-400" /> </p>
          <svg onClick={() => setToggleAlert(!toggleAlert())} class="inline w-4 h-4 fill-current ml-2 mr-4 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
          </svg>
        </div>
      </Show>
      <header class="bg-green-500 text-gray-950 shadow-lg py-4 sticky top-0 z-50">
        <div class="container mx-auto flex items-center justify-between px-4">

          <a href="#" class="flex items-center text-white hover:text-secondary">
            <svg class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707.707m12.728 0l.707.707M6.343 17.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span class="text-2xl font-bold text-gray-50 dark:text-white">GoPharm</span>
          </a>


          <div class="md:hidden">
            <button id="menu-toggle"
              class="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>


          <nav class="hidden md:block">
            <ul class="flex space-x-1 text-white font-normal dark:text-white">
              <li><a href="#home" class="hover:text-primary hover:bg-green-800 px-4 py-2 transition-colors duration-300 rounded-md">Inicio</a></li>
              <li><a href="#about" class="hover:text-primary hover:bg-green-800 px-4 py-2 transition-colors duration-300 rounded-md">Nosotros</a></li>
              <li class="group relative">
                <a href="#services" class="hover:text-primary hover:bg-green-800 px-4 py-2 transition-colors duration-300 rounded-md">Servicios</a>

                <ul
                  class="absolute dark:text-gray-950 left-0 hidden group-hover:block bg-white shadow-md py-2 mt-1 rounded-md w-48 transition-all duration-300">
                  <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Service 1</a></li>
                  <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Service 2</a></li>
                  <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Service 3</a></li>
                </ul>
              </li>
              <li><a href="#contact" class="hover:text-primary hover:bg-green-800 px-4 py-2 transition-colors duration-300 rounded-md">Contacto</a></li>
              <li><a onclick={() => navigate('/auth/signin')} href="#"
                class="bg-primary font-semibold hover:bg-green-800 bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300">Iniciemos</a></li>
                <li class="px-4"><DarkModeToggle></DarkModeToggle></li>
            </ul>
          </nav>
        </div>


        <nav id="mobile-menu"
          class="hidden md:hidden text-gray-950 bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out">
          <ul class="px-4 py-2 text-gray-950">
            <li><a href="#home" class="block py-2 hover:text-primary">Inicio</a></li>
            <li><a href="#about" class="block py-2 hover:text-primary">Nosotros</a></li>
            <li>
              <a href="#services" id="services-dropdown-toggle" class="block py-2 hover:text-primary">Servicios</a>

              <ul id="services-dropdown" class="hidden pl-4">
                <li><a href="#" class="block py-2 hover:text-primary">Servicio 1</a></li>
                <li><a href="#" class="block py-2 hover:text-primary">Servicio 2</a></li>
                <li><a href="#" class="block py-2 hover:text-primary">Servicio 3</a></li>
              </ul>
            </li>
            <li><a href="#contact" class="block py-2 hover:text-primary">Contacto</a></li>
            <li><a href="#"
              class="block py-2 bg-primary hover:bg-secondary text-white rounded-md text-center transition-colors duration-300">Iniciemos</a></li>
          </ul>
        </nav>
      </header>
      <section id="home" class="overflow-hidden h-screen bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center dark:bg-gray-900">
        <div class="p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 class="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit
            </h2>

            <p class="hidden text-gray-500 md:mt-4 md:block dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
              sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>

            <div class="mt-4 md:mt-8">
              <button
                onclick={() => navigate('/auth/signin')}
                class="inline-block rounded-sm w-6/12 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:ring-3 focus:ring-green-400 focus:outline-hidden"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[20px] md:h-[calc(100%_-_3rem)] md:rounded-ss-[40px]"
        />
      </section>
      <div id="about" class="bg-gray-50">
        <header class="bg-green-500 text-gray-50 text-center py-12">
          <h1 class="text-4xl font-bold mt-0">Nosotros</h1>
        </header>

        <section class="text-center dark:bg-gray-800 bg-gray-100 text-gray-950 py-12 dark:text-gray-100 px-4">
          <h2 class="text-2xl font-bold">Nuestra Misión</h2>
          <p class="mt-4 text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
            Our mission is to provide exceptional healthcare services with a focus on availability, reliability, and support.
          </p>
          <div class="flex justify-center space-x-8 mt-8 animate-fadeIn">
            <div class="transition transform hover:scale-110">
              <h3 class="text-xl font-bold" >85+</h3>
              <p class="text-gray-500 dark:text-gray-100">Specialists</p>
            </div>
            <div class="transition transform hover:scale-110">
              <h3 class="text-xl font-bold" >25+</h3>
              <p class="text-gray-500 dark:text-gray-100">Years of Experience</p>
            </div>
          </div>
        </section>

        <section class="bg-green-500 text-white py-12 px-4">
          <h2 class="text-2xl font-bold text-center">Nuestra Visión</h2>
          <p class="mt-4 text-center max-w-2xl mx-auto">
            Healthcare anytime, anywhere. We aim to revolutionize the healthcare industry by making quality healthcare accessible to everyone.
          </p>
        </section>

        {/*  <section class="bg-gray-100 py-8 px-12">

           <SliderProvider>
            <Slider class="" options={{ loop: true }}>
              <div><img class="mb-7 rounded-xl" src="https://iili.io/33etOiX.png"/>
                <div>
                  <h3 class="text-[#0A2025] dark:text-white text-2xl font-bold font-['Roboto']">Keni Golf</h3>
                  <p class="mt-5 mb-8 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">Everything you need
                    for any course</p><button class="text-[#3e9d26] text-sm font-semibold font-['Roboto']">Shop</button>
                </div>
              </div>
              <div>Slide 2</div>
              <div>Slide 3</div>
            </Slider>
            <SliderButton prev>Previous</SliderButton>
            <SliderButton next>Next</SliderButton>
          </SliderProvider> 
        </section>*/}

        <section class="bg-green-500 text-white text-center py-12 px-4">
          <h2 class="text-2xl font-bold">Patient Testimonials</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
            <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi."</p>

              <div class="text-sm  flex justify-center place-items-center">
                <img class="w-10 h-10 rounded-full mr-1" src="https://dummyjson.com/icon/emilys/128" alt="Avatar de Jonathan Reinink" />
                <h3 class="text-gray-50 font-bold leading-none cursor-pointer">-Ramon Valdez</h3>
              </div>
            </div>
            <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi."</p>

              <div class="text-sm  flex justify-center place-items-center">
                <img class="w-10 h-10 rounded-full mr-1" src="https://dummyjson.com/icon/emilys/128" alt="Avatar de Jonathan Reinink" />
                <h3 class="text-gray-50 font-bold leading-none cursor-pointer">-Pablo Perez</h3>
              </div>
            </div>
            <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-green-500 transition-colors">
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique mi."</p>

              <div class="text-sm  flex justify-center place-items-center">
                <img class="w-10 h-10 rounded-full mr-1" src="https://dummyjson.com/icon/emilys/128" alt="Avatar de Jonathan Reinink" />
                <h3 class="text-gray-50 font-bold leading-none cursor-pointer">-Don Juanito</h3>
              </div>
            </div>
          </div>
        </section>

        <section class="dark:bg-gray-800 bg-gray-100 text-center py-12 px-4 w-full text-gray-800 dark:text-gray-100">
          <h2 class="text-2xl font-bold">Get Answer To Your Most Asked Questions</h2>
          <div class="mt-8">
            <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
              <h3 class="text-xl font-bold">How do I make an appointment online?</h3>
              <p class="mt-2 text-gray-700 dark:text-gray-400">You can book an appointment online through our website or mobile app.</p>
            </div>
            <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
              <h3 class="text-xl font-bold">What types of medical tests do you offer?</h3>
              <p class="mt-2 text-gray-700 dark:text-gray-400">We offer a wide range of medical tests including blood tests, imaging, and more.</p>
            </div>
            <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
              <h3 class="text-xl font-bold">Do you accept insurance plans?</h3>
              <p class="mt-2 text-gray-700 dark:text-gray-400">Yes, we accept most major insurance plans.</p>
            </div>
          </div>
        </section>

      </div>

      <section id="contact" class='h-screen dark:bg-gray-800 bg-gray-100'>
        <div class=" my-12 mx-auto ">
          <header class="bg-green-500 text-gray-50 text-center w-full py-12">
            <h1 class="text-2xl font-bold mt-0">Contactanos</h1>
          </header>
          <section class="mb-32 mx-12 text-gray-50 mt-12">



            <div class="flex flex-wrap">

              <form class="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:px-6">

                <div class="mb-3 w-full">
                  <label class="block font-medium mb-[2px] text-green-400" for="exampleInput90">
                    Name
                  </label>
                  <input type="text" class="px-2 py-2 border border-gray-800 dark:border-gray-400 placeholder:text-gray-600 dark:placeholder:text-gray-4  00 w-full outline-none rounded-md" id="exampleInput90" placeholder="Name" />
                </div>

                <div class="mb-3 w-full">
                  <label class="block font-medium mb-[2px] text-green-400" for="exampleInput90">
                    Email
                  </label>
                  <input type="email" class="px-2 py-2 border border-gray-800 dark:border-gray-400 placeholder:text-gray-600 dark:placeholder:text-gray-4  w-full outline-none rounded-md" id="exampleInput90"
                    placeholder="Enter your email address" />
                </div>

                <div class="mb-3 w-full">
                  <label class="block font-medium mb-[2px] text-green-400" for="exampleInput90">
                    Message
                  </label>
                  <textarea placeholder='Escribe tu mensaje' class="px-2 py-2 border border-gray-800 dark:border-gray-400 placeholder:text-gray-600 dark:placeholder:text-gray-4  rounded-[5px] w-full outline-none" name="" id=""></textarea>
                </div>

                <button type="button"
                  class="mb-6 inline-block w-full rounded bg-green-500 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-green-600">
                  Enviar
                </button>
                <div class="w-full shrink-0 grow-0 basis-auto ">
                  <div class="flex flex-wrap justify-between">
                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                      <div class="flex items-center">
                        <div class="shrink-0">
                          <div class="inline-block rounded-md bg-green-400-100 p-4 text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                              stroke-width="2" stroke="currentColor" class="h-6 w-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                            </svg>
                          </div>
                        </div>
                        <div class="ml-6 grow">
                          <p class="mb-2 text-gray-400 dark:text-gray-200 font-bold">
                            Información de contacto
                          </p>
                          <p class="text-gray-700 dark:text-gray-200">
                            soporte@gmail.com
                          </p>
                          <p class="text-gray-700 dark:text-gray-200">
                            +58 414-234-67-89
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                      <div class="flex items-center">
                        <div class="shrink-0">
                          <div class="inline-block rounded-md bg-teal-400-100 p-4 text-teal-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                              stroke-width="2" stroke="currentColor" class="h-6 w-6">
                              <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                            </svg>
                          </div>
                        </div>
                        <div class="ml-6 grow">
                          <p class="mb-2 font-bold text-gray-400 dark:text-gray-200">
                            Sales questions
                          </p>
                          <p class="text-gray-700 dark:text-gray-200">
                            sales@example.com
                          </p>
                          <p class="text-gray-700 dark:text-gray-200">
                            +1 234-567-89
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
      <footer class="bg-green-500 text-white text-center py-8">
        <p>&copy; Copyright [Your Name] . Todos los derechos reservados. Hecho por <a class='underline' href='https://github.com/waskull'>Martin Castillo.</a></p>
      </footer>
    </div>
  );
};

export default App;
