import { createApp } from 'kdu'
import Counter from './Counter.kdu'
import store from './store'

const app = createApp(Counter)

app.use(store)

app.mount('#app')
