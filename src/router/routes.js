
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'aulas', component: () => import('pages/AulasTrocadas.vue') },
      { path: 'aulas/cadastrar', component: () => import('components/FormAula.vue') },
      { path: 'disciplinas', component: () => import('pages/Disciplinas.vue') },
      { path: 'disciplinas/cadastrar', component: () => import('components/FormDisciplina.vue') },
      { path: 'disciplinas/:id/editar', component: () => import('components/FormDisciplina.vue') },
      { path: 'professores', component: () => import('pages/Professores.vue') },
      { path: 'professores/cadastrar', component: () => import('components/FormProfessor.vue') },
      { path: 'professores/:id/editar', component: () => import('components/FormProfessor.vue') }

    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MyAuth.vue')
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
