import Router from './Router';
import About from './routes/About';
import Contact from './routes/Contact';
import Home from './routes/Home';

export const AppRoutes = () => {
    // Função para inicializar as rotas
    const router = new Router();
    // Adiciona as rotas ao roteador

    // As rotas do app sendo adicionadas ao roteador.
    router.addRoute(Home);
    router.addRoute(About);
    router.addRoute(Contact);

    // Carrega a rota inicial do app com base no caminho atual!
    console.log("Rota inicial: " + window.location.pathname)
    router.loadRoute(window.location.pathname);
};
