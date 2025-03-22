import Route from "../router/Route";

// Features: Implementar rotas dinamicas para lidar com as tracks a partir de seus id.

export default class Router {
    private routes: Route[] = [];
    private appContainer: HTMLElement | null = null;
    // Construtor da classe Router
    // Adiciona um listener para o evento popstate, que é acionado quando o usuário navega pelo histórico do navegador.
    constructor() {
        this.getAppContainer();
        window.addEventListener("popstate", () => {
            this.loadRoute(window.location.pathname);
        });
        (window as any).goToRoute = (path: string) => this.goToRoute(path);
    }

    // Método para obter o elemento do contêiner do aplicativo.
    private getAppContainer() {
        const container = document.querySelector('#app');
        if (!container) {
            throw new Error("Elemento com id 'app' não encontrado!");
        }
        this.appContainer = container as HTMLElement;
    }

    // Método para adicionar uma rota ao roteador
    /**
     * 
     * @description Este método adiciona uma nova rota à lista de rotas do roteador.
     * @param route Rota que deseja adicionar ao roteador.
     */
    public addRoute(route: Route): void {
        this.routes.push(route);
    }

    // Método para encontrar uma rota com base no caminho fornecido
    /**
     * 
     * @description Este método percorre a lista de rotas e retorna a rota correspondente ao caminho fornecido.
     * @param path Caminho da rota que deseja encontrar.
     */
    private findRoute(path: string): Route | undefined {
        return this.routes.find(route => route.path === path);
    }

    // Método para carregar uma rota com base no caminho fornecido
    /**
     * 
     * @param path Caminho da rota que deseja carregar.
     * @description Este método encontra a rota correspondente ao caminho fornecido e chama seu componente para renderizá-lo.
     */
    public loadRoute(path: string) {
        const route = this.findRoute(path);
        console.log("Rota encontrada:", route?.name);
        if (route && this.appContainer) {
            this.appContainer.innerHTML = route.component();
        } else {
            console.warn("Rota não encontrada:", path);
        }
    }

    // Método para navegar para uma rota específica - Este método tem que deixar ele global para ser acessado de qualquer lugar do app.
    /**
     * 
     * @param path Caminho da rota para a qual deseja navegar.
     */
    public goToRoute(path: string) {
        const route = this.findRoute(path);
        console.log("Navegando para a rota:", route?.name);
        if (route) {
            history.pushState({}, "", path);
            route.component();
        } else {
            console.warn(`Rota não encontrada: ${path}`);
        }
    }
}
