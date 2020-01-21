export default {
  namespaced: true,
  state: {
    tasks: []
  },

  mutations: {
    SET(state, [key, data]) {
      this._vm.set(state, key, data);
    }
  },

  actions: {
    loadTasks() {
      return this._vm.$http
        .get("/api/tasks")
        .then(({data}) => {
          let {data: tasks} = data;
          return Object.fromEntries(tasks.map(t => [t._id, t]));
        })
        .catch(err => console.error(err));
    },

    createTask(context, {order, status}){

      return this._vm.$http
        .post("/api/tasks", {
          author: "Ronald Torres",
          order,
          status,
          description: ''
        })
        .then(({ data: {data:task} }) => {
          return task;
        })
        .catch(err => console.error(err.result));
    }
  }
}