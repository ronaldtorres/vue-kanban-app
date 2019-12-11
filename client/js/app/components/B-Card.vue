<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div slot="header" class="clearfix">
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="20" class="grid-content">
          <span @input="updateTask('title')" ref="title" contenteditable>{{ data.title }}</span>
        </el-col>
        <el-col :span="2" class="grid-content">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="removeTask()" icon="el-icon-plus">Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="text item pd-none">
      <div
        ref="description"
        @input="updateTask('description')"
        contenteditable
        class="display-1 text--primary"
      >{{ data.description }}</div>
    </div>
  </el-card>
</template>

<script>
import Debounce from '../utils/debounce'

export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ...this.data
    };
  },

  methods: {
    removeTask() {
      fetch(`/api/tasks/${this.data._id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(res => {
          this.$emit("removeTask", this.$data);

          this.$message({
            message: res.message,
            type: "success"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },

    updateTask: Debounce(function(key) {
      this[key] = this.$refs[key].innerText;
      console.log(this[key]);

      fetch(`/api/tasks/${this.data._id}`, {
        method: "PUT",
        body: JSON.stringify({
          [key]: this.$refs[key].innerText
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          this.$emit("updateTask", this.$data);
        })
        .catch(err => {
          console.error(err);
        });
    }, 1200)
  }
};
</script>


<style scoped lang="scss">
.el-card {
  *[contenteditable]:focus {
    outline: none;
  }

  &__body {
    div[contenteditable] {
      padding: 20px;
    }
  }
}
</style>