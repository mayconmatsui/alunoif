import { DBFS, AUTH, FIREBASE } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const login = async ({ state, dispatch, commit }, dados) => {
  await AUTH.setPersistence(FIREBASE.auth.Auth.Persistence.LOCAL)
    .then(function () {
      return AUTH.signInWithEmailAndPassword(dados.email, dados.senha)
        .then((response) => {
          commit('setError', null)
          dispatch('setUser', response.user.uid)
          commit('setLoginState', true)
        })
        .catch((err) => {
          commit('setLoginState', false)
          commit('setUser', null)
          commit('setError', err)
        })
    })
}

export const logout = async ({ commit }) => {
  await commit('setLoginState', false)
  await commit('setUser', null)
  await commit('setError', null)
  await AUTH.signOut()
}

export const setUser = firestoreAction(async ({ bindFirestoreRef }, userId) => {
  return bindFirestoreRef('user', await DBFS.doc(`users/${userId}`))
})

export const setAulasUserWeek = async ({ state, commit }) => {
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
  state.user.disciplinas.map((disciplina) => {
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
  let horarios = Object.entries(disciplinas).map((hora) => {
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
  horarios = Object.fromEntries(horarios)

  return commit('setAulasUser', horarios)
  // return Object.fromEntries(horarios)
}
