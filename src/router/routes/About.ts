import Route from "../Route";

const About = new Route({
    name: "About Page",
    description: "Esta é a página Sobre.",
    path: "/about",
    component() {
        return (document.body.querySelector('#app')!.innerHTML = `
            <h1 class="text-3xl font-bold mb-4">About Page</h1>
            <p class="text-lg mb-6">Bem-vindo à página Sobre!</p>
            <button 
                onclick="window.goToRoute('/')" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Voltar para Home
            </button>
            <button 
                onclick="window.goToRoute('/contact')" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Ir para Contact
            </button>
          `)
    },
})

export default About;