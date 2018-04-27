<template>
  <div>
    <h-form ref="testForm" :model="testForm">
      <h-form-item label="name">
        <h-input type="text" v-model="testForm.name" aria-placeholder="username"></h-input>
      </h-form-item>
      <h-form-item label="pwd">
        <h-input type="password" v-model="testForm.pwd" aria-placeholder="password"></h-input>
      </h-form-item>
      <h-form-item label="pwd_comfirm">
        <h-input type="password" v-model="testForm.pwd_comfirm" aria-placeholder="password again"></h-input>
      </h-form-item>
      <h-form-item>
        <h-radio-group v-model="testForm.sex">
          <h-radio label="Male">Male</h-radio>
          <h-radio label="Female">Female</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item>
        <h-checkbox-group v-model="testForm.hobbies">
          <h-checkbox label="sports">
              <span>sports</span>
          </h-checkbox>
          <h-checkbox label="sing111">
              <span>sing222</span>
          </h-checkbox>
          <h-checkbox label="dance">
              <span>dance</span>
          </h-checkbox>
          <h-checkbox label="eat">
              <span>eat</span>
          </h-checkbox>
        </h-checkbox-group>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="submitForm">submit</h-button>
        <h-button type="warning" @click="cancelSubmit">cancel</h-button>
      </h-form-item>  
    </h-form>
    <component-a></component-a>
  </div>
</template>
<script>
// import HA from '@/component/HA'
export default {
  data() {
    return {
      testForm: {
        name: "taoyu",
        pwd: "",
        pwd_comfirm: "",
        male:true
      } 
    };
  },
  // components:{
  //   HA
  // },
  methods: {
    submitForm() {
      let valueObj = this.testForm;
      let str = "";
      for (let obj in valueObj) {
        str += valueObj[obj] + "|";
      }
      console.log(typeof valueObj);
      console.log(this.testForm);
    },
    cancelSubmit() {
      let valueObj = this.testForm;
      let str = "";
      for (let obj in valueObj) {
        valueObj[obj] = "";
      }
      alert("success");
    }
  }
};
</script>
