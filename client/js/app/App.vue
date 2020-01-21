<template>
  <el-container>
    <el-header>
      <h1>Kanban App</h1>
    </el-header>
    <!-- <BToolbar /> -->
    <el-main>
      <el-row class="task-board">
        <el-col :span="24/(headers.length)" v-for="(column, value, key) in board" :key="key">
          <div class="mg-8">
            <div class="board-header">
              <div class="board-header__title">
                <el-tag :type="headers[key].style">{{ headers[key].title }}</el-tag>
              </div>
              <div class="board-header__options">
                <el-button size="small" icon="el-icon-plus" @click="createTask(column.length, key)"></el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <draggable :id="'dropzone-' + key" :class="'dropzone dropzone-' + key" v-model="board[key]" @start="dragStart" @end="dragEnd" v-bind="draggableBinds" :move="moveTask">
            <template v-for="task in column">
              <BCard :data="task" @removeTask="removeTask" @updateTask="updateTask" :key="task._id"/>
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
      tasks: undefined,
      columnRefresh: 0,
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
        handle : '.handler',
        group: 'tasks',
        dragClass: 'drag',
        draggable: '.el-card',
        animation: 200,
        ghostClass: 'ghost-placeholder'
      }
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      let tasks = await this.$store.dispatch('tasks/loadTasks');
      _.map(_.sortBy(tasks, 'order'), this.appendToColumn);
    },

    removeTask(task) {
      this.removeOfColumn(task);
    },

    updateTask(task) {
      this.board[task.status][task.order] = task;
    },

    async createTask(order, status) {
        let task = await this.$store.dispatch('tasks/createTask', {...arguments});
        this.appendToColumn(task);
    },

    dragStart(){
      this.dragging = true;
    },

    dragEnd({to, newIndex, srcElement, oldIndex}){
      this.dragging = false;

      let oldColumn = srcElement.id.split('-')[1];
      let column = to.id.split('-')[1];

      if(oldColumn === column && oldIndex === newIndex) return;
      
      this.board[column][newIndex].status = parseInt(column);

      let updates = [...this.updateOrderIndexes(column, newIndex)];

      if(oldColumn !== column){
        updates.push(...this.updateOrderIndexes(oldColumn, oldIndex));
      }

      this.updateManyTasks(updates);

    },

    updateManyTasks(tasks){
      this.$http.patch('/api/tasks', tasks);
    },

    moveTask(event, originalEvent) {
      return;
    },

    updateOrderIndexes(columnIndex, startAt){
      
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

.board-header{
  display: flex;

  &__title{
    flex-grow: 1;
    widows: inherit;
  }
}

.task-board{
  min-height: 70vh;
}

.el-main{
  margin: 0 auto;
  width: 85vw;
}

.ghost-placeholder{
  color: white;
  border: 2px dashed #409EFF;
}

.dropzone{
  min-height: 400px;
  padding: 8px;
}

.mg-8 {
  margin: 8px;
}

.el-button.el-button--mini {
  padding: 12px;
}

.el-divider {
  margin: 12px 0;
}

.el-button-full {
  width: calc(100% - 16px);
}
</style>