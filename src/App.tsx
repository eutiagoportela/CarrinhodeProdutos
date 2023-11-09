import type { Router as RemixRouter } from '@remix-run/router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { CarrinhoScreens } from './modules/carrinho/routes';
import { finalizaCarrinhoScreens } from './modules/finalizarCarrinho/routes';
import { firstScreenRoutes } from './modules/firstScreen/routes';
import { loginRoutes } from './modules/login/routes';
import { pedidosScreens } from './modules/pedidosrealizados/routes';
import { produtoScreens } from './modules/produtos/routes';
import { UsuarioScreenRoutes } from './modules/usuarios/routes';
import { verifyLoggedIn } from './shared/functions/auth';
import { useNotification } from './shared/hooks/useNotification';

const queryClient = new QueryClient();

function App() {
  const { contextHolder } = useNotification();

  const routes: RouteObject[] = [...loginRoutes];
  const routesLoggedIn: RouteObject[] = [
    ...UsuarioScreenRoutes,
    ...pedidosScreens,
    ...produtoScreens,
    ...CarrinhoScreens,
    ...finalizaCarrinhoScreens,
    ...firstScreenRoutes,
  ].map((route) => ({
    ...route,
    loader: () => verifyLoggedIn(),
  }));

  const router: RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {contextHolder}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
