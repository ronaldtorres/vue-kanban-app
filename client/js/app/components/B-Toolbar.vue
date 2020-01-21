<template>
  <el-row type="flex" justify="end">
      <el-button @click="createTask">Add</el-button>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  methods: {
    createTask() {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: "Untitled",
          author: "Ronald Torres"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(res => {
          this.$emit('createTask', res.data);
        })
        .catch(err => {
          console.error(err.result);
        });
    }
  }
};
</script>