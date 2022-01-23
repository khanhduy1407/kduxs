import { createApp } from 'kdu'
import App from './components/App.kdu'
import store from './store'
import { currency } from './currency'

const app = createApp(App)

app.use(store)

app.mount('#app')
