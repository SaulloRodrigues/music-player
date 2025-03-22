import Route from "../Route";

const Home = new Route({
    name: "Home Page",
    description: "Esta é a página inicial.",
    path: "/",
    component() {
        return (document.body.querySelector('#app')!.innerHTML = `
            <h1 class="text-3xl font-bold mb-4">Home Page</h1>
            <p class="text-lg mb-6">Bem-vindo à página Home!</p>
            <button 
                onclick="window.goToRoute('/about')" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Ir para a pagina About
            </button>
          `)
    },
})

export default Home;