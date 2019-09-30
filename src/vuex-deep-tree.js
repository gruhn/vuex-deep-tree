import Vue from "vue";

function deepDelete(tree, path) {
  const [ head, ...tail ] = path
  const isLastPathSegment = tail.length === 0

  if (isLastPathSegment) {
    Vue.delete(tree, head)
  } else {
    deepDelete(tree[head], tail)

    const isEmptyNode = Object.keys(tree[head]).length === 0;

    if (isEmptyNode) {
      Vue.delete(tree, head)
    }
  }
}

function deepSet(tree, path, value) {
  const [ head, ...tail ] = path
  const isLastPathSegment = tail.length === 0

  if (isLastPathSegment) {
    Vue.set(tree, head, value)
  } else {
    const nodeMissing = tree[head] === undefined

    if (nodeMissing) {
      Vue.set(tree, head, {})
    }

    deepSet(tree[head], tail, value)
  }
}

export default function() {
  return {
    namespaced: true,

    state: {},

    mutations: {
      delete (state, { path }) {
        deepDelete(state, path)
      },

      set (state, { path, value }) {
        deepSet(state, path, value)
      },

      init (state, tree) {
        Object.keys(tree).forEach(key => {
          Vue.set(state, key, tree[key])
        })
      }
    }
  }
}
