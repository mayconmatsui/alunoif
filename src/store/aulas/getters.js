export const getAulas = (state, getters, rootState, rootGetters) => {
  const aulas = []

  state.aulas.map((a) => {
    const disciplina = rootGetters['disciplinas/getDisciplinaById'](a.disciplina)[0]
    const temp = {
      nome: disciplina.nome,
      data: a.data,
      horarios: a.horarios,
      local: a.local ? a.local : disciplina.local
    }
    aulas.push(temp)
  })

  return aulas
}

export const getAulasIndex = (state, getters, rootState, rootGetters) => {
  const aulas = []

  state.aulasIndex.map((a) => {
    const disciplina = rootGetters['disciplinas/getDisciplinaById'](a.disciplina)[0]
    const professor = rootGetters['professores/getProfessorById'](disciplina.professor)[0]
    const temp = {
      nome: disciplina.nome,
      data: a.data,
      horarios: a.horarios,
      professor: professor.nome,
      local: a.local ? a.local : disciplina.local
    }
    aulas.push(temp)
  })

  return aulas
}
// export const getProfessoresSelect = state => {
//   const prof = []
//   state.professores.forEach((a) => {
//     const p = {
//       label: a.nome,
//       value: a.id
//     }
//     prof.push(p)
//   })
//   return prof
// }

// export const getProfessorById = (state) => (id) => {
//   return state.professores.filter((a) => {
//     return a.id === id
//   })
// }
