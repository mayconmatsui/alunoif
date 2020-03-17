import { DBFS } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const setProfessores = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('professores', DBFS.collection('professores'))
})
