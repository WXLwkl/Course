import { createStore } from 'vuex'
import modules from './modules'

export default createStore({
  modules
})

// export default createStore({

//   state: {
//     pushPath:'',
//     include:[]
//   },
//   getters: {
//   },
//   mutations: {
//     setPushPath(state, payload){
//       state.pushPath = payload
//     },
//     addIncludes(state, payload) {
//       if (!state.include.includes(payload)) {
//         state.include.push(payload) 
//       }
//     },
//     minusIncludes(state, payload){
//       const index = state.include.indexOf(payload)
//       if (index !== -1) {
//         state.include.splice(index, 1)
//       }
//     }
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
