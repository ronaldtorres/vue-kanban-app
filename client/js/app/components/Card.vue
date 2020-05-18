<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="10" type="flex" justify="space-between">
          <el-col :span="20" class="grid-content">
            <span>{{ data.title }}</span>
          </el-col>
          <el-col :span="2" class="grid-content">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">Delete</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">Update</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">Tags</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div class="text item">
        <p contenteditable class="display-1 text--primary">{{ data.description }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>


<style scoped lang="scss">
  .el-card{
    width: 250px;
  }
</style>