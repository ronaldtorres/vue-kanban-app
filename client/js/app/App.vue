<template>
  <el-container>
    <el-header>
      <h1>Bijju App</h1>
    </el-header>
    <BToolbar @createTask="addTask" />
      <div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="task in tasks" :key="task._id">
            <div class="grid-content">
              <BCard :data="task" @removeTask="removeTask" @updateTask="updateTask"/>
            </div>
          </el-col>
        </el-row>
      </div>
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
      tasks: undefined
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
          this.tasks = Object.fromEntries(res.data.map((t) => [t._id, t]));
        })
        .catch(err => console.log(err));
    },

    addTask(task){
      this.$set(this.tasks, task._id, task);
    },

    removeTask(task){
      this.$delete(this.tasks, task._id);
    },

    updateTask(task){
      // Do something...
    }
  }
};
</script>

<style scoped>
</style>