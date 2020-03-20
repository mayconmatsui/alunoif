import { DBFS } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const setProfessores = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('professores', DBFS.collection('professores'))
})

export const localizarProfessores = ({ state, dispatch, commit }, busca) => {
  if (busca === '') {
    commit('setItensFiltrados', state.professores)
  } else {
    const needle = busca ? busca.toLowerCase() : ''
    const lista = Object.values(state.professores)
    const items = []
    lista.map(a => {
      const b = Object.values(a)

      const filtra = b.filter(
        v =>
          v
            .toString()
            .toLowerCase()
            .indexOf(needle) > -1
      )
      if (filtra.length > 0) {
        items.push(a)
      }
    })
    commit('setItensFiltrados', items)
  }
}

export const addProfessor = firestoreAction((context, dados) => {
  DBFS
    .collection(
      'professores'
    )
    .doc()
    .set(dados)
})
