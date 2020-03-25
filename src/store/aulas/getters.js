import moment from 'moment'

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

export const getAulasWeek = (state, getters, rootState, rootGetters) => {
  const weekDays = {
    1: moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'),
    2: moment().startOf('week').add(2, 'days').format('DD/MM/YYYY'),
    3: moment().startOf('week').add(3, 'days').format('DD/MM/YYYY'),
    4: moment().startOf('week').add(4, 'days').format('DD/MM/YYYY'),
    5: moment().startOf('week').add(5, 'days').format('DD/MM/YYYY'),
    6: moment().startOf('week').add(6, 'days').format('DD/MM/YYYY')
  }

  const disciplinas = rootState.disciplinas.disciplinas
  console.log(weekDays)
  console.log(state.aulasWeek)
  console.log(disciplinas)

  // const aulasTab = state.aulasWeek.filter((a) => {
  //   return a.data === weekDays
  // })

  // const aulas = []

  // aulasTab.map((a) => {
  //   const disciplina = rootGetters['disciplinas/getDisciplinaById'](a.disciplina)[0]
  //   const professor = rootGetters['professores/getProfessorById'](disciplina.professor)[0]
  //   const temp = {
  //     nome: disciplina.nome,
  //     data: a.data,
  //     horarios: a.horarios,
  //     professor: professor.nome,
  //     local: a.local ? a.local : disciplina.local
  //   }
  //   aulas.push(temp)
  // })

  // console.log(aulas)

  // return aulas
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
