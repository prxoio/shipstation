import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC3UKZlqkGvhO8sASAVpdX6UDSFc2uXz4M',
  authDomain: 'manufi-v2.firebaseapp.com',
  projectId: 'manufi-v2',
  storageBucket: 'manufi-v2.appspot.com',
  messagingSenderId: '405865261925',
  appId: '1:405865261925:web:582841985b381efe458f8c',
  measurementId: 'G-X2JK1NG8TE',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
export { auth }
