<template>
  <el-container>
    <el-header>
      <h1>Kanban App</h1>
    </el-header>
    <!-- <BToolbar /> -->
    <el-main>
      <el-row class="tasks-board">
        <el-col :span="24/(headers.length)" v-for="(column, value, key) in board" :key="key">
          <div class="mg-8">
            <div class="tasks-board__header">
              <div class="tasks-board__header__title">
                <el-tag :type="headers[key].style">{{ headers[key].title }}</el-tag>
              </div>
              <div class="tasks-board__header__options">
                <el-button size="small" icon="el-icon-plus" @click="createTask(column.length, key)"></el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <draggable
            :id="'dropzone-' + key"
            class="tasks-board__dropzone"
            v-model="board[key]"
            @start="dragStart"
            @end="dragEnd"
            v-bind="draggableBinds"
            :move="moveTask"
          >
            <template v-for="task in column">
              <BCard
                :data="task"
                @removeTask="removeTask"
                @updateTask="updateTask"
                :key="f_index + task._id"
              />
            </template>
          </draggable>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import BCard from "./components/B-Card.vue";
import BToolbar from "./components/B-Toolbar.vue";
import draggable from "vuedraggable";
import _ from "lodash";

export default {
  components: {
    BCard,
    BToolbar,
    draggable
  },
  data() {
    return {
      headers: [
        { title: "To do", style: "info" },
        { title: "In progress", style: "warning" },
        { title: "Done", style: "success" }
      ],
      // board: [[],[],[]],
      board: {
        0: [],
        1: [],
        2: []
      },
      dragging: false,
      draggableBinds: {
        handle: ".handler",
        group: "tasks",
        dragClass: "drag",
        draggable: ".el-card",
        animation: 200,
        ghostClass: "ghost-placeholder"
      },
      f_index: 'A_'
    };
  },

  mounted() {
    this.load();
    this.$store.dispatch('appIsLoaded');
  },

  methods: {
    async load() {
      let tasks = await this.$store.dispatch("tasks/load");
      _.map(_.sortBy(tasks, "order"), this.appendToColumn);
    },

    removeTask(task) {
      this.removeOfColumn(task);
    },

    updateTask(task) {
      this.board[task.status][task.order] = task;
    },

    async createTask(order, status) {
      let task = await this.$store.dispatch('tasks/create', { order, status });
      this.appendToColumn(task);
    },

    dragStart() {
      this.dragging = true;
    },

    dragEnd({ to, newIndex, srcElement, oldIndex }) {
      this.dragging = false;

      let oldColumn = srcElement.id.split("-")[1];
      let column = to.id.split("-")[1];

      if (oldColumn === column && oldIndex === newIndex) return;

      this.board[column][newIndex].status = parseInt(column);
      
      let updates = [...this.updateOrderIndexes(column, newIndex)];

      if (oldColumn !== column) {
        updates.push(...this.updateOrderIndexes(oldColumn, oldIndex));
      }

      this.$store.dispatch('tasks/updateMany', updates);
      this.forceCardsReRender();
    },

    moveTask(event, originalEvent) {
      return;
    },

    updateOrderIndexes(columnIndex, startAt) {
      let column = this.board[columnIndex];

      for (let i = startAt; i < column.length; i++) {
        column[i].order = i;
      } 

      return column;
    },

    appendToColumn(task) {
      let status = task.status || 0;
      this.board[status].push(task);
    },

    removeOfColumn(task) {
      let status = task.status || 0;
      this.board[status] = _.filter(this.board[status], t => t._id != task._id);
    },

    forceCardsReRender(){
      this.f_index = this.f_index == 'A_' ? 'B_' : 'A_';
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

.el-main {
  margin: 0 auto;
  width: 85vw;
}

.tasks-board {
  min-height: 70vh;

  &__header {
    display: flex;

    &__title {
      flex-grow: 1;
      widows: inherit;
    }
  }

  &__dropzone {
    min-height: 400px;
    padding: 8px;
  }
}

.ghost-placeholder {
  color: white;
  border: 2px dashed #409eff;
}

.el-button.el-button--mini {
  padding: 12px;
}

.el-button-full {
  width: calc(100% - 16px);
}

.el-divider {
  margin: 12px 0;
}

.mg-8 {
  margin: 8px;
}
</style>