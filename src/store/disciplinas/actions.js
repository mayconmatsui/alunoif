import { DBFS } from '../../boot/firebase'
import { firestoreAction } from 'vuexfire'

export const getDisciplinas = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('disciplinas', DBFS.collection('disciplinas'))
})

// export function getDisciplinas (t) {
//   // setTimeout(() => {
//   //   console.log(DB)
//   // }, 2000)

//   // this.$dbfs.collection('disciplinas').get().then(function (doc) {
//   //   // Document was found in the cache. If no cached document exists,
//   //   // an error will be returned to the 'catch' block below.
//   //   console.log('Cached document data:', doc.data())
//   // }).catch(function (error) {
//   //   console.log('Error getting cached document:', error)
//   // })
//   DBFS.collection('disciplinas')
//     .onSnapshot({ includeMetadataChanges: true }, (snap) => {
//       console.log(snap.docs)

//       // if (snap.empty) {
//       //   this.itens = null
//       // } else {
//       //   this.itens = snap.docs.map(doc => {
//       //     const data = doc.data()
//       //     const id = doc.id
//       //     // return { id, ...data }
//       //   })
//       //   this.itensFiltrados = this.itens
//       // }
//     })
// }
