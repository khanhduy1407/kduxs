import { createApp } from 'kdu'
import store from './store'
import App from './components/App.kdu'

const app = createApp(App)

app.use(store)

app.mount('#app')
