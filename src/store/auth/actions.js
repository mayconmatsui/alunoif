import { DBFS, AUTH } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const login = async ({ state, dispatch, commit }, dados) => {
  await AUTH.signInWithEmailAndPassword(dados.email, dados.senha)
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
}

export const logout = async ({ commit }) => {
  commit('setLoginState', false)
  commit('setUser', null)
  await AUTH.signOut()
}

export const setUser = firestoreAction(({ bindFirestoreRef }, userId) => {
  return bindFirestoreRef('user', DBFS.doc(`users/${userId}`))
})
