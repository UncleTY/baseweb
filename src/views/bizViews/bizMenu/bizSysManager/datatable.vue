<template>
  <div>
      <h-table stripe :columns="titles" :data="data"></h-table>
  </div>
</template>
<script>

export default {
  data() {
      return {
          titles:[{title:'name',key:'name'},{title:'age',key:'age'},{title:'sex',key:'sex'}],
          data:[{
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        sex:'男'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
                        sex:'男'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道',
                        sex:'女'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道',
                        sex:'男'
                    }]
      }
  },
  methods: {
  }
};
</script>
