import { DBFS } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const setDisciplinas = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('disciplinas', DBFS.collection('disciplinas'))
})

export const localizarDisciplinas = ({ state, dispatch, commit }, busca) => {
  if (busca === '') {
    commit('setItensFiltrados', state.disciplinas)
    console.log(state)
  } else {
    console.log(state)

    // const needle = (this.busca ? this.busca.toLowerCase() : '')
    // const lista = Object.values(state.disciplinas)
    // const items = []
    // lista.map((a) => {
    //   const b = Object.values(a)
    //   const filtra = b.filter(
    //     v => v.toString().toLowerCase().indexOf(needle) > -1
    //   )
    //   if (filtra.length > 0) {
    //     items.push(a)
    //   }
    // })
    // commit('setItensFiltrados', 'items')
  }
}
