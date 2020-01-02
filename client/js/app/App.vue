<template>
  <el-container>
    <el-header>
      <h1>Biju App</h1>
    </el-header>
    <BToolbar @createTask="addTask" />
    <el-row class="task-board">
      <el-col :span="6">
        <template v-for="task in tasks">
          <div class="card-item" :key="task._id">
            <BCard :data="task" @removeTask="removeTask" @updateTask="updateTask" />
          </div>
        </template>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import BCard from "./components/B-Card.vue";
import BToolbar from "./components/B-Toolbar.vue";

export default {
  components: {
    BCard,
    BToolbar
  },
  data() {
    return {
      tasks: undefined,
      mosonryId: "masonry"
    };
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    getTasks() {
      fetch("/api/tasks")
        .then(res => res.json())
        .then(res => {
          this.tasks = Object.fromEntries(res.data.map(t => [t._id, t]));
        })
        .catch(err => console.log(err));
    },

    addTask(task) {
      this.$set(this.tasks, task._id, task);
    },

    removeTask(task) {
      this.$delete(this.tasks, task._id);
    },

    updateTask(task) {
      // Do something...
    }
  }
};
</script>

<style lang="scss">
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.card-item {
  width: 300px;
  margin: 10px;
}
</style>