<template>
  <div class="container">
    <el-header>
      <h1>App</h1>
    </el-header>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="6" :xs="24" :sm="12"  v-for="task in tasks" :key="task.id">
          <div class="grid-content bg-purple">
            <Card :data="task" />
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import Card from "./components/Card.vue";

export default {
  components: {
    Card
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
          this.tasks = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>