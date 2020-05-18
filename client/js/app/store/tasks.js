export default {
  namespaced: true,
  state: {
    tasks: [],
    last_created: ''
  },

  mutations: {
    SET(state, [key, data]) {
      this._vm.set(state, key, data);
    }
  },

  actions: {
    load() {
      return this._vm.$http
        .get("/api/tasks")
        .then(({data}) => {
          let {data: tasks} = data;
          return Object.fromEntries(tasks.map(t => [t._id, t]));
        })
        .catch(err => console.error(err));
    },

    create(context, {order, status}){
      return this._vm.$http
        .post("/api/tasks", {
          author: "Ronald Torres",
          order,
          status,
          description: ''
        })
        .then(({ data: {data:task} }) => {
          // context.commit('SET', ['last_created', task._id]);
          return task;
        })
        .catch(err => console.error(err.result));
    },

    update(context, {id, data}){
      return this._vm.$http
        .put(`/api/tasks/${id}`, data)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },

    delete(context, id){
      
      return this._vm.$http
      .delete(`/api/tasks/${id}`).then(res => {
        return res.data;
      }).catch(err => {
        console.error(err);
      });
    },

    updateMany(context, tasks){
      this._vm.$http.patch('/api/tasks', tasks);
    }
  }
}