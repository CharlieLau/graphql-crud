<template>
  <div>
    <div style="margin:15px; text-align:right">
      <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="categories">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteCategory(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增Category" :visible.sync="visible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="handleAddOrUpdate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";
import {
  getCategoriesGQL,
  addCategoryGQL,
  editCategoryGQL,
  deletCategoryGQL
} from "../gqls/category.js";
export default {
  data() {
    return {
      form: {
        id: null,
        name: null
      },
      visible: false
    };
  },
  apollo: {
    categories: {
      query: getCategoriesGQL,
      update: data => data.getCategories
    }
  },
  methods: {
    handleAddOrUpdate() {
      if (this.form.id) {
        this.editCategory();
      } else {
        this.addCategory();
      }
    },
    addCategory() {
      this.$apollo.mutate({
        mutation: addCategoryGQL,
        variables: {
          name: this.form.name
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.categories.refetch();
          this.visible = false;
        }
      });
    },
    editCategory() {
      this.$apollo.mutate({
        mutation: editCategoryGQL,
        variables: {
          name: this.form.name,
          id: this.form.id
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.categories.refetch();
          this.visible = false;
        }
      });
    },
    deleteCategory(row) {
      this.$apollo.mutate({
        mutation: deletCategoryGQL,
        variables: {
          id: row.id
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.categories.refetch();
        }
      });
    },
    handleEdit(row) {
      this.visible = true;
      this.form = { ...row };
    },
    handleAdd() {
      this.form = {
        id: null,
        name: null
      };
      this.visible = true;
    }
  }
};
</script>

<style></style>
