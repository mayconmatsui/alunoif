export const getDisciplinasFiltradas = state => {
  return state.itensFiltrados
}

export const getDisciplinaById = (state) => (id) => {
  return state.disciplinas.filter((a) => {
    return a.id === id
  })
}

export const getDisciplinasSelect = state => {
  const disc = []
  state.disciplinas.forEach((a) => {
    const d = {
      label: a.nome,
      value: a.id
    }
    disc.push(d)
  })
  return disc
}
