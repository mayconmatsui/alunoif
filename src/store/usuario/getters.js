export const getAulasUserWeek = (state, getters, rootState, rootGetters) => {
  console.log(rootGetters)
  /****************
  disciplinas por dia da semana
  1 => segunda
  2 => terca
  3 => quarta
  4 => quinta
  5 => sexta
  6 => sabado
  */

  const disciplinas = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  }

  // const user = rootGetters

  // Sepando aulas por dia da semana
  rootState.auth.user.disciplinas.map((disciplina) => {
    // segunda
    if (disciplina.horarios[1]) {
      disciplinas[1].push(disciplina)
    }
    // terca
    if (disciplina.horarios[2]) {
      disciplinas[2].push(disciplina)
    }
    // quarta
    if (disciplina.horarios[3]) {
      disciplinas[3].push(disciplina)
    }
    // quinta
    if (disciplina.horarios[4]) {
      disciplinas[4].push(disciplina)
    }
    // sexta
    if (disciplina.horarios[5]) {
      disciplinas[5].push(disciplina)
    }
    // sabado
    if (disciplina.horarios[6]) {
      disciplinas[6].push(disciplina)
    }
  })

  /****
    retirando horarios que não seja do dia da semana
    Object.entries separa o objeto em 2 arrays um com o indice e outro com os valores
  ****/
  const horarios = Object.entries(disciplinas).map((hora) => {
    // fazendo uma copia profunda do objeto por questao de mutação
    const temp = JSON.parse(JSON.stringify(hora))
    temp[1].map((el) => {
      // removendo horarios que não sejam do dia da semana
      el.horarios = el.horarios[hora[0]]
    })
    return temp
  })

  /****
    Object.fromEntries reconstroi o objeto separado
    anteriormente pelo Object.entries
  ****/
  return Object.fromEntries(horarios)
}
