# Composition API

To access the store within the `setup` hook, you can call the `useStore` function. This is the equivalent of retrieving `this.$store` within a component using the Option API.

```js
import { useStore } from 'kduxs'

export default {
  setup () {
    const store = useStore()
  }
}
```

## Accessing State and Getters

In order to access state and getters, you will want to create `computed` references to retain reactivity. This is the equivalent of creating computed properties using the Option API.

```js
import { computed } from 'kdu'
import { useStore } from 'kduxs'

export default {
  setup () {
    const store = useStore()

    return {
      // access a state in computed function
      count: computed(() => store.state.count),

      // access a getter in computed function
      double: computed(() => store.getters.double)
    }
  }
}
```

## Accessing Mutations and Actions

When accessing mutations and actions, you can simply provide the `commit` and `dispatch` function inside the `setup` hook.

```js
import { useStore } from 'kduxs'

export default {
  setup () {
    const store = useStore()

    return {
      // access a mutation
      increment: () => store.commit('increment'),

      // access an action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
  }
}
```

## Examples

Check out the [Composition API example](https://github.com/khanhduy1407/kduxs/tree/dev/examples/composition) to see example applications utilizing Kduxs and Kdu's Composition API.
