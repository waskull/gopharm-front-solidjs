import { useNavigate } from "@solidjs/router";
import { createSignal, JSX } from "solid-js";
import { createForm, SubmitHandler, valiForm } from '@modular-forms/solid';
import * as v from 'valibot';
import { authStore } from "../store";
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
    role?: string;
}

const LoginSchema = v.object({
    username: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca el correo.'),
        v.minLength(3, 'La contraseña debe tener al menos 3 caracteres.')
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty('Por favor introduzca la contraseña.'),
        v.minLength(4, 'La contraseña debe tener al menos 4 caracteres.')
    ),
});

type LoginForm = v.InferInput<typeof LoginSchema>;


export default function SignIn(): JSX.Element {
    const [loading, setLoading] = createSignal<boolean>(false);
    const [loginForm, { Form, Field }] = createForm<LoginForm>({
        validate: valiForm(LoginSchema),
    });
    const navigate = useNavigate();

    const handleSubmit: SubmitHandler<LoginForm> = (values, event) => {
        console.log(values);
        event.preventDefault();
        setLoading(true);
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
            }),
            credentials: 'same-origin',
        }).then(res => res.json())
            .then((data: Response) => {
                console.log(data);
                setLoading(false);
                if (data.message === "Invalid credentials" || data.message === "Username and password required") {
                    alert("Usuario o contraseña incorrecta");
                    return;
                }
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                authStore.login(data.firstName + " " + data.lastName, data.role, data.image);
                navigate("/dashboard");
            }).catch(err => { console.log(err); setLoading(false); });
    };
    return (
        <main class="w-full bg-gray-100 dark:bg-gray-900 h-full min-h-screen flex flex-col items-center justify-center px-4">
            <div class="max-w-sm w-full text-gray-800 dark:text-gray-200 space-y-5">
                <div class="text-center pb-1">
                    <img src="/logo.png" width="150" class="mx-auto" />
                    <div class="mt-5">
                        <h3 class="text-gray-800 dark:text-gray-200 text-2xl font-bold sm:text-3xl">
                            Iniciar Sesión
                        </h3>
                    </div>
                </div>
                <Form onSubmit={handleSubmit} class="space-y-4">
                    <p class="text-center">Usuario de prueba <strong>emilys</strong>, contraseña: <strong>emilyspass</strong></p>
                    <Field name="username">
                        {(field, props) => (
                            <div>
                                <input {...props} type="text"
                                    required
                                    placeholder="emilys"
                                    value={field.value}
                                    class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg" />
                                {field.error && <div class="text-red-500">{field.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {(field, props) => (
                            <>
                                <input {...props} type="password"
                                    required
                                    value={field.value}
                                    placeholder="emilyspass"
                                    class="w-full mt-2 px-3 py-2 text-gray-500 dark:text-gray-200 bg-transparent outline-none  transition duration-150 ease-in-out border focus:border-green-600 shadow-sm rounded-lg"
                                />
                                {field.error && <div class="text-red-500">{field.error}</div>}
                            </>
                        )}
                    </Field>
                    <div>{loginForm.response.message}</div>
                    <button
                        type="submit"
                        disabled={loginForm.invalid || loading()}
                        class={`w-full flex px-4 py-2 items-center justify-center text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150 ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div class={"h-5 w-5 rounded-full border-2 mr-4 border-white border-t-transparent animate-spin" + (loading() ? '' : ' hidden')}></div>
                        {loading() ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </Form >
                <button
                    disabled
                    class="w-full flex items-center justify-center gap-x-3 py-2.5 rounded-lg text-sm font-medium dark:text-gray-500 cursor-not-allowed disabled:bg-gray-200 hover:bg-gray-50 duration-150 active:bg-gray-100"
                >

                    <img
                        src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                        alt="Google"
                        class="w-5 h-5"
                    />

                    Iniciar sesión con Google (WIP)
                </button>
                {/* <p class="text-center">
                    No tienes una cuenta?
                    <a href="javascript:void(0)" class="font-medium text-green-600 hover:text-green-500"> Registrarse</a>
                </p> */}
            </div >
        </main >
    );
}