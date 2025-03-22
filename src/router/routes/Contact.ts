import Route from "../Route";

const Contact = new Route({
    name: "Contact Page",
    description: "Esta é a página inicial.",
    path: "/contact",
    component() {
        return (document.body.querySelector('#app')!.innerHTML = `
            <h1 class="text-3xl font-bold mb-4">Contact Page</h1>
            <p class="text-lg mb-6">Bem-vindo à página Contact!</p>
            <div class="flex space-x-4">
            <button 
                onclick="window.goToRoute('/about')" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Voltar para a página About
            </button>
            <button 
                onclick="window.goToRoute('/')" 
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
                Voltar para a página Home
            </button>
            </div>
          `)
    },
})

export default Contact;