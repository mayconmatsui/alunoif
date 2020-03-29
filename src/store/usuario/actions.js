export const setDisciplinasUser = ({ commit, rootState }) => {
  commit('setDisciplinasUser', rootState.auth.userData.disciplinas)
}
