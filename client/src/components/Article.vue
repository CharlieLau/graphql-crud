<template>
  <div>
    <div style="margin:15px; text-align:right">
      <el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
    </div>
    <el-table :data="articles">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="分类" prop="category">
        <template slot-scope="{ row }">
          {{ row.category.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteArticle(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增Category" :visible.sync="visible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="category">
          <el-select v-model="form.category" style="width:100%">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            ></el-option>
          </el-select>
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
    articles: {
      query: gql`
        query {
          getArticles {
            id
            name
            category {
              id
              name
            }
          }
        }
      `,
      update: data => data.getArticles
    },
    categories: {
      query: gql`
        query {
          getCategories {
            id
            name
          }
        }
      `,
      update: data => data.getCategories
    }
  },
  methods: {
    handleAddOrUpdate() {
      if (this.form.id) {
        this.updateArticle();
      } else {
        this.addArticle();
      }
    },
    addArticle() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($name: String!, $category: String!) {
            addArticle(name: $name, category: $category) {
              id
              name
              category {
                id
                name
              }
            }
          }
        `,
        variables: {
          name: this.form.name,
          category: this.form.category
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.articles.refetch();
          this.visible = false;
        }
      });
    },
    updateArticle() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($name: String!, $category: String!, $id: String!) {
            editArticle(id: $id, name: $name, category: $category) {
              id
              name
            }
          }
        `,
        variables: {
          name: this.form.name,
          id: this.form.id,
          category: this.form.category
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.articles.refetch();
          this.visible = false;
        }
      });
    },
    deleteArticle(row) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: String!) {
            deleteArticle(id: $id) {
              id
              name
            }
          }
        `,
        variables: {
          id: row.id
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.articles.refetch();
        }
      });
    },
    handleEdit(row) {
      this.visible = true;
      this.form = row;
      this.form.category = row.category.id;
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
