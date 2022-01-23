# TypeScript Support

Kduxs provides its typings so you can use TypeScript to write a store definition. You don't need any special TypeScript configuration for Kduxs.

However, if you're writing your Kdu components in TypeScript, there're a few steps to follow that require for you to correctly provide typings for a store.

## Typing `$store` Property in Kdu Component

Kduxs doesn't provide typings for `this.$store` property out of the box. When used with TypeScript, you must declare your own module augmentation.

To do so, declare custom typings for Kdu's `ComponentCustomProperties` by adding a declaration file in your project folder:

```ts
// kduxs.d.ts
import { ComponentCustomProperties } from 'kdu'
import { Store } from 'kduxs'

declare module '@nkduy/runtime-core' {
  // declare your own store states
  interface State {
    count: number
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
```

## Typing `useStore` Composition Function

When you're writing your Kdu component in Composition API, you will most likely want `useStore` to return the typed store. For `useStore` to correctly return the typed store, you must:

1. Define the typed `InjectionKey`.
2. Provide the typed `InjectionKey` when installing a store to the Kdu app.
3. Pass the typed `InjectionKey` to the `useStore` method.

Let's tackle this step by step. First, define the key using Kdu's `InjectionKey` interface along with your own store typing definition:

```ts
// store.ts
import { InjectionKey } from 'kdu'
import { createStore, Store } from 'kduxs'

// define your typings for the store state
export interface State {
  count: number
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  }
})
```

Next, pass the defined injection key when installing the store to the Kdu app:

```ts
// main.ts
import { createApp } from 'kdu'
import { store, key } from './store'

const app = createApp({ ... })

// pass the injection key
app.use(store, key)

app.mount('#app')
```

Finally, you can pass the key to the `useStore` method to retrieve the typed store.

```ts
// in a kdu component
import { useStore } from 'kduxs'
import { key } from './store'

export default {
  setup () {
    const store = useStore(key)

    store.state.count // typed as number
  }
}
```

Under the hood, Kduxs installs the store to the Kdu app using Kdu's Provide/Inject feature which is why the injection key is an important factor.

### Simplifying `useStore` usage

Having to import `InjectionKey` and passing it to `useStore` everywhere it's used can quickly become a repetitive task. To simplify matters, you can define your own composable function to retrieve a typed store:

```ts
// store.ts
import { InjectionKey } from 'kdu'
import { createStore, useStore as baseUseStore, Store } from 'kduxs'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  }
})

// define your own `useStore` composition function
export function useStore () {
  return baseUseStore(key)
}
```

Now, by importing your own composable function, you can retrieve the typed store **without** having to provide the injection key and its typing:

```ts
// in a kdu component
import { useStore } from './store'

export default {
  setup () {
    const store = useStore()

    store.state.count // typed as number
  }
}
```
