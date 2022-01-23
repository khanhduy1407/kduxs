import { createApp } from 'kdu'
import store from './store'
import CounterControls from './CounterControls.kdu'

const app = createApp(CounterControls)

app.use(store)

app.mount('#app')
