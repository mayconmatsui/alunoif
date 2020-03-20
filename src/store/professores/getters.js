export const getProfessoresFiltrados = state => {
  return state.professoresFiltrados
}

export const getProfessores = state => {
  const prof = {}
  state.professores.forEach((a) => {
    prof[a.id] = a.nome
  })
  return prof
}

export const getProfessoresSelect = state => {
  const prof = []
  state.professores.forEach((a) => {
    const p = {
      label: a.nome,
      value: a.id
    }
    prof.push(p)
  })
  return prof
}
