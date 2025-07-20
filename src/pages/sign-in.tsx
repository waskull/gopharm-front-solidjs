import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";

export interface Response {
    accessToken: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    image: string;
    lastName: string;
    refreshToken: string;
    username: string;
    message?: string;
}


export default function SignIn(): JSX.Element {
    const [username, setUsername] = createSignal<string>('');
    const [password, setPassword] = createSignal<string>('');
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        console.log(username() + " " + password());
        event.preventDefault();
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username(),
                password: password(),
            }),
            credentials: 'same-origin',
        }).then(res => res.json())
            .then((data: Response) => {
                console.log(data);
                if (data.message === "Invalid credentials" || data.message === "Username and password required") {
                    alert("Usuario o contraseña incorrecta");
                    return;
                }
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem("fullname", data.firstName + " " + data.lastName);
                localStorage.setItem("image", data.image)
                localStorage.setItem("id", String(data.id));
                navigate("/dashboard");
            }).catch(err => console.log(err));

    }
    return (
        <main class="w-full bg-gray-100 dark:bg-gray-900 h-full min-h-screen flex flex-col items-center justify-center px-4">
            <div class="max-w-sm w-full text-gray-800 dark:text-gray-200 space-y-5">
                <div class="text-center pb-8">
                    <img src="/logo.png" width="150" class="mx-auto" />
                    <div class="mt-5">
                        <h3 class="text-gray-800 dark:text-gray-200 text-2xl font-bold sm:text-3xl">
                            Iniciar Sesión
                        </h3>
                    </div>
                </div>
                <form onsubmit={handleSubmit} class="space-y-5">
                    <div>
                        <label class="font-medium"> Usuario </label>
                        <input
                            onChange={(e: any) => setUsername(e.target.value)}
                            type="text"
                            value={username()}
                            required
                            placeholder="emilys"
                            class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label class="font-medium"> Contraseña </label>
                        <input
                            onChange={(e: any) => setPassword(e.target.value)}
                            type="password"
                            value={password()}
                            required
                            placeholder="emilyspass"
                            class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-x-3">
                            <input
                                type="checkbox"
                                id="remember-me-checkbox"
                                class="checkbox-item peer hidden"
                            />
                            <label
                                for="remember-me-checkbox"
                                class="relative flex w-5 h-5 bg-white peer-checked:bg-green-600 rounded-md border ring-offset-2 ring-green-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                            ></label>
                            <span>Recordarme</span>
                        </div>
                        <a
                            href="javascript:void(0)"
                            class="text-center text-green-600 hover:text-green-500"
                        >Olvidaste tu contraseña?</a>
                    </div>
                    <button
                        type="submit"
                        class="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <button
                    class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
                >

                    <img
                        src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                        alt="Google"
                        class="w-5 h-5"
                    />

                    Iniciar sesión con Google
                </button>
                <p class="text-center">
                    No tienes una cuenta?
                    <a href="javascript:void(0)" class="font-medium text-green-600 hover:text-green-500"> Registrarse</a>
                </p>
            </div>
        </main>
    );
}