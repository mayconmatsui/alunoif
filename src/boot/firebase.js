import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'
import { FireSQL } from 'firesql'

const config = {
  apiKey: 'AIzaSyBoYnBEWWJfw7K1zrGRvKH30knmvRLFZW4',
  authDomain: 'alunoif-a30f8.firebaseapp.com',
  databaseURL: 'https://alunoif-a30f8.firebaseio.com',
  projectId: 'alunoif-a30f8',
  storageBucket: 'alunoif-a30f8.appspot.com',
  messagingSenderId: '333272692568',
  appId: '1:333272692568:web:a31f1d3325ce3bab94172d'
}

const connection = firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
})
firebase.firestore().enablePersistence()
const DB = connection.database()
const AUTH = connection.auth()
const DBFS = connection.firestore()
const DBST = connection.storage()
const FIREBASE = firebase
const FSQL = new FireSQL(DBFS)

export default ({ app, router, Vue }) => {
  AUTH.onAuthStateChanged(user => {
    // if (!user) {
    //   router.push({ path: '/auth' })
    // }
  })

  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $dbfs: {
      get () {
        return DBFS
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    },
    $dbst: {
      get () {
        return DBST
      }
    },
    $firebase: {
      get () {
        return FIREBASE
      }
    },
    $firesql: {
      get () {
        return FSQL
      }
    }
  })
}

export { DB, DBFS, AUTH, DBST, FIREBASE, FSQL }
