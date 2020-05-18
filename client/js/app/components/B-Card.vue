<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <div class="item pd-none">
      <div class="handler"></div>
      <div class="el-card__body-content">
        <div
          ref="description"
          v-html="data.description"
          @input="updateTask('description')"
          contenteditable
          class="display-1 text--primary"
        ></div>
        <div class="el-card__toolbar">
          <el-button
            type="text"
            size="mini"
            class="delete"
            circle
            @click.native="removeTask()"
            icon="el-icon-delete"
          />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import _ from "lodash";

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
  mounted(){
    if(this.$store.state.appIsLoaded === true){
      this.$refs.description.focus()
    }
  },
  methods: {
    removeTask() {
      this.$store.dispatch("tasks/delete", this.data._id).then(({message}) => {
        this.$message({
          message,
          type: "success"
        });
      });

      this.$emit("removeTask", this.data);
    },

    updateTask: _.debounce(function(key) {
      this[key] = this.$refs[key].innerHTML;

      this.$store.dispatch("tasks/update", {
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

  &:hover {
    .handler,
    .el-card__toolbar {
      opacity: 1;
    }
  }

  .handler {
    cursor: pointer;
    background: #f2f6fc;
    width: 5px;
    position: absolute;
    top: 0;
    height: 100%;
    opacity: 0;
    transition: width 200ms ease;

    &:hover {
      width: 8px;
    }
  }

  

  &__body {
    div[contenteditable] {
      padding-bottom: 8px;
    }
    &-content {
      padding: 16px 16px 8px;
    }
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    opacity: 0;

    .el-button.el-button--mini {
      padding: 6px;
      bottom: 4px;
      right: 4px;
      color: #909399;

      &:hover{
        color: #606266;
      }

      &.delete:hover {
        color: #F56C6C;
      }
    }
  }
}
</style>