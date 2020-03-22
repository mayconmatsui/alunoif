export const getDisciplinasFiltradas = state => {
  return state.itensFiltrados
}

export const getDisciplinaById = (state) => (id) => {
  return state.disciplinas.filter((a) => {
    return a.id === id
  })
}
