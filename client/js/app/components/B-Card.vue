<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="item pd-none">
      <div class="handler"></div>
      <div
        ref="description"
        v-html="data.description"
        @input="updateTask('description')"
        contenteditable
        class="display-1 text--primary"
      ></div>
      <el-button type="danger" size="mini" circle @click.native="removeTask()" icon="el-icon-delete" />
    </div>
  </el-card>
</template>

<script>
import _ from 'lodash';

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

    updateTask: _.debounce(function(key) {
      this[key] = this.$refs[key].innerHTML;
      
      this.$store.dispatch('tasks/update', {
        id: this.data._id,
        data: {
          [key]: this[key]
        }
      });

      this.$emit("updateTask", this.$data);
    }, 1200)
  }
};
</script>


<style scoped lang="scss">
.el-card {
  position: relative;
  border-radius: 6px;
  box-shadow: none;
  margin-bottom: 8px;

  *[contenteditable]:focus {
    outline: none;
  }

  &:hover{
    .handler, .el-button.el-button--mini{
      opacity: 1;
    }
  }
  
  .handler{
    cursor: pointer;
    background: #F2F6FC;
    width: 5px;
    position: absolute;
    top: 0;
    height: 100%;
    opacity: 0;
    transition: width 200ms ease;

    &:hover{
      width: 8px;
    }
  }

  .el-button.el-button--mini {
    padding: 6px;
    position: absolute;
    bottom: 4px;
    right: 4px;
    opacity: 0;
  }

  &__body {
    div[contenteditable] {
      padding: 16px;
    }
  }
}
</style>