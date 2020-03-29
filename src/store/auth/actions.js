import { DBFS, AUTH } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const login = ({ state }, email, senha) => {
  AUTH.signInWithEmailAndPassword(email, senha)
}

export const logout = ({ commit }) => {
  commit('setLoginState', false)
  AUTH.signOut()
}

export const setUserData = firestoreAction(({ bindFirestoreRef }, userId) => {
  return bindFirestoreRef('userData', DBFS.doc(`users/${userId}`))
})
