<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <el-checkbox 
        style="opacity: 0; position: absolute; width: 100%"
        :checked="todo.done"
        @change="toggleTodo(todo)">
      </el-checkbox>
      <!--<input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      >-->
      <label v-text="todo.text" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    }
  }
}
</script>
