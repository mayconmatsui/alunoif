export const getProfessores = state => {
  const prof = {}
  state.professores.forEach((a) => {
    prof[a.id] = a.nome
  })
  return prof
}
