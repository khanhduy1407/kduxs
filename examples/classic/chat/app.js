import { createApp } from 'kdu'
import App from './components/App.kdu'
import store from './store'
import { getAllMessages } from './store/actions'

const app = createApp(App)

app.use(store)

app.mount('#app')

getAllMessages(store)
