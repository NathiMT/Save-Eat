import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CadastroConsumidorView from '@/views/CadastroConsumidorView.vue'
import CadastroEmpresaView from '@/views/CadastroEmpresaView.vue'
import EsqueciSenhaView from '@/views/EsqueciSenhaView.vue'
import { isAuthenticated } from '@/services/authUtils'
import Home from '@/views/Home.vue'
import RedefinirSenhaView from '@/views/RedefinirSenhaView.vue'
import PerfilEmpresa from '@/views/Empresa/PerfilEmpresa.vue'
import PerfilConsumidor from '@/views/Cliente/PerfilConsumidor.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: LoginView,
    meta: { hideHeader: true }
  },
  {
    path: '/cadastro-cliente',
    component: CadastroConsumidorView,
    meta: { hideHeader: true }
  },
  {
    path: '/cadastro-empresa',
    component: CadastroEmpresaView,
    meta: { hideHeader: true }
  },
  {
    path: '/esqueci-senha',
    component: EsqueciSenhaView,
    meta: { hideHeader: true }
  },
  {
    path: '/redefinir-senha',
    component: RedefinirSenhaView,
    meta: { hideHeader: true }
  },
  {
    path: '/empresa',
    name: 'EmpresaHome',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/cliente',
    name: 'ClienteHome',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/empresa/perfil',
    name: 'PerfilEmpresa',
    component: PerfilEmpresa,
    meta: { requiresAuth: true }
  },
  {
    path: '/cliente/perfil',
    name: 'PerfilCliente',
    component: PerfilConsumidor,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta!.requiresAuth;

  if (requiresAuth && !isAuthenticated()) {
    next('/');
  } else {
    next();
  }
});

export default router
