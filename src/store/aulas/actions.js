import { DBFS } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'
import moment from 'moment'

export const setAulas = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('aulas', DBFS.collection('aulas'))
})

export const setAulasWeek = firestoreAction(({ bindFirestoreRef }, today) => {
  const seg = moment().startOf('week').add(1, 'days').format('DD/MM/YYYY')
  const sab = moment().startOf('week').add(6, 'days').format('DD/MM/YYYY')
  return bindFirestoreRef('aulasWeek', DBFS.collection('aulas').where('data', '>=', seg).where('data', '<=', sab))
})

export const addAula = firestoreAction((context, dados) => {
  const nomeDoc = Object.values(dados)[0].data.replace(/\//g, '-')

  DBFS.collection('aulas')
    .doc(nomeDoc)
    .set(dados, { merge: true })
})

export const deleteAula = firestoreAction((context, id) => {
  DBFS.collection('aulas')
    .doc(id)
    .delete()
})
