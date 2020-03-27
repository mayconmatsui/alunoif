// import moment from 'moment'
// import _ from 'lodash'

export const getAulas = (state, getters, rootState, rootGetters) => {
  const aulas = []

  state.aulas.map((a) => {
    const temp = {
      nome: a.disciplina.nome,
      data: a.data,
      horarios: a.horarios
    }
    aulas.push(temp)
  })
  return aulas
}

export const getAulasWeek = (state, getters, rootState, rootGetters) => {
  // const weekDays = {
  //   segunda: moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'),
  //   terca: moment().startOf('week').add(2, 'days').format('DD/MM/YYYY'),
  //   quarta: moment().startOf('week').add(3, 'days').format('DD/MM/YYYY'),
  //   quinta: moment().startOf('week').add(4, 'days').format('DD/MM/YYYY'),
  //   sexta: moment().startOf('week').add(5, 'days').format('DD/MM/YYYY'),
  //   sabado: moment().startOf('week').add(6, 'days').format('DD/MM/YYYY')
  // }

  const disciplinas = rootState.disciplinas.disciplinas

  function getDisciplinasByWeekDay (disciplinas, dia) {
    return disciplinas.filter((disciplina) => {
      return disciplina.horarios[dia]
    })
  }

  function removeOutersDay (disciplinas, dia) {
    const horas = disciplinas.map((a) => {
      return a.horarios[dia]
    })

    const horarios = {
      [dia]: horas
    }

    return Object.assign(horarios, disciplinas)
  }

  const quinta = getDisciplinasByWeekDay(disciplinas, 4)

  console.log(removeOutersDay(quinta, 4))
  // console.log(quinta)
  // disciplinas.map((a) => {
  //   console.log(a.horarios)
  // })
  // console.log(disciplinas)
  // console.log(state.aulasWeek)
  // console.log(disciplinas)

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
