import Firebase from 'firebase'
import config from './credentials'

export const app = Firebase.initializeApp(config)
export const db = app.database()
