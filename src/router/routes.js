
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'disciplinas', component: () => import('pages/Disciplinas.vue') },
      { path: 'disciplinas/cadastro', component: () => import('components/CadastroDisciplina.vue') },
      { path: 'professores', component: () => import('pages/Professores.vue') },
      { path: 'professores/cadastro', component: () => import('components/CadastroProfessores.vue') }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  })
}

export default routes
