import tasks from './tasks';


export default {
    state: {
        appIsLoaded: false
    },

    mutations: {
        SET(state, [key, data]) {
            state[key] = data;
        }
    },
    actions: {
        appIsLoaded(context) {
            context.commit('SET', ['appIsLoaded', true])
        }
    },
    modules: {
        tasks
    }
}