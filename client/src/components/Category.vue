<template>
  <div>
    <div style="margin:15px; text-align:right">
      <el-button type="primary" size="mini" @click="visible = true"
        >新增</el-button
      >
    </div>
    <el-table :data="categories">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
    </el-table>
    <el-dialog title="新增Category" :visible.sync="visible">
      <el-form :model="form" label-width="120px">
        <el-form-item label="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="addCategory">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return { form: {}, visible: false };
  },
  apollo: {
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
    addCategory() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($name: String!) {
            addCategory(name: $name) {
              id
              name
            }
          }
        `,
        variables: {
          name: this.form.name
        },
        update: (store, { data: { addCategory } }) => {
          this.$apollo.queries.categories.refetch();
          this.visible = false;
        }
      });
    }
  }
};
</script>

<style></style>
