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

// export const getAulasWeek = (state, getters, rootState, rootGetters) => {
//   console.log(getAulasByWeekDay()('1'))
//   // const weekDays = {
//   //   segunda: moment().startOf('week').add(1, 'days').format('DD/MM/YYYY'),
//   //   terca: moment().startOf('week').add(2, 'days').format('DD/MM/YYYY'),
//   //   quarta: moment().startOf('week').add(3, 'days').format('DD/MM/YYYY'),
//   //   quinta: moment().startOf('week').add(4, 'days').format('DD/MM/YYYY'),
//   //   sexta: moment().startOf('week').add(5, 'days').format('DD/MM/YYYY'),
//   //   sabado: moment().startOf('week').add(6, 'days').format('DD/MM/YYYY')
//   // }
//
//   // const disciplinas = rootState.disciplinas.disciplinas
//   // const disciplinas1 = rootState.disciplinas.disciplinas
//   //
//   // function getSegunda (disciplinas, dia) {
//   //   const aulas = disciplinas.filter((disciplina) => {
//   //     const teste = Object.entries(disciplina.horarios).filter((a) => {
//   //       return a[0] === dia
//   //     })
//   //     const horas = Object.fromEntries(teste)
//   //     delete disciplina.horarios
//   //     disciplina.horarios = horas
//   //     return disciplina.horarios[Number(dia)]
//   //   })
//   //   return aulas
//   // }
//   //
//   // function getTerca (disciplinas1, dia) {
//   //   const aulas = disciplinas.filter((disciplina) => {
//   //     const teste = Object.entries(disciplina.horarios).filter((a) => {
//   //       return a[0] === dia
//   //     })
//   //     const horas = Object.fromEntries(teste)
//   //     delete disciplina.horarios
//   //     disciplina.horarios = horas
//   //     return disciplina.horarios[Number(dia)]
//   //   })
//   //   return aulas
//   // }
//   //
//   // const weekDays = {
//   //   segunda: getSegunda(disciplinas, '1'),
//   //   terca: getTerca(disciplinas1, '1')
//   // quarta: getDisciplinasByWeekDay(disciplinas, '3'),
//   // quinta: getDisciplinasByWeekDay(disciplinas, '4'),
//   // sexta: getDisciplinasByWeekDay(disciplinas, '5'),
//   // sabado: getDisciplinasByWeekDay(disciplinas, '6')
//   // }
//
//   // console.log(getDisciplinasByWeekDay(disciplinas, '1'))
//   // console.log(weekDays)
//   // console.log(getDisciplinasByWeekDay(disciplinas, '3'))
// }

export const getAulasByWeekDay = (state, getters, rootState, rootGetters) => (day) => {
  console.log(state)
  // const disciplinas = rootState.disciplinas.disciplinas
  // const aulas = disciplinas.filter((disciplina) => {
  //   const teste = Object.entries(disciplina.horarios).filter((a) => {
  //     return a[0] === day
  //   })
  //   const horas = Object.fromEntries(teste)
  //   delete disciplina.horarios
  //   disciplina.horarios = horas
  //   return disciplina.horarios[Number(day)]
  // })
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
