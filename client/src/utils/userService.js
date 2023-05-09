import axios from "axios";
const token = localStorage.getItem('token');


export default {
  //user
  signIn: function (userCred) {
    return axios.post("/user/signin",userCred);
  },
  signUp: function (userCred) {
    return axios.post("/user/signup/",userCred);
  },
  verfiyEmail:function(user_id){
    return axios.get(`/user/verifiyMyEmail/${user_id}`);
  },
  getMyProfile:function(){
    return axios.get("/user/getMyProfile/");
  },
  updateMyProfile:function(user){
    return axios.post("/user/updateMyProfile/",user);
  },
  sendForgetPassword:function(email){
    return axios.post("/user/forgetMypassword",{email:email});
  },
  sendResetPassword:function(password_data){
    return axios.post("/user/resetMypassword",password_data);
  },
  logout:function(){
    return axios.get("/user/logout/");
  },
  
  //questions
  getMyQuestions:function(){
    return axios.get("/user/getMyQuestions/");
  },
  getMySortedQuestions:function({value,type}){
    return axios.get(`/user/getMySortedQuestions/?sortBy=${value}&type=${type}`);
  },
  getMyQuestion:function(question_id){
    return axios.get(`/user/getMyQuestion/${question_id}`);
  },
  likeMyQuestion:function(question_id){
    return axios.get(`/user/likeMyQuestion/${question_id}`);
  },
  addMyQuestion:function(review){
    return axios.post("/user/addMyQuestion/",review);
  },
  updateMyQuestion:function(question){
    return axios.post("/user/updateMyQuestion/",question);
  },
  deleteMyQuestion:function(question_id){
    return axios.get(`/user/deleteMyQuestion/${question_id}`);
  },

  //answers
  getMyAnswers:function(){
    return axios.get("/user/getMyAnswers/");
  },
  getMyAnswer:function(answer_id){
    return axios.get(`/user/getMyAnswer/${answer_id}`);
  },
  likeMyAnswer:function(answer_id){
    return axios.get(`/user/likeMyAnswer/${answer_id}`);
  },
  addMyAnswer:function(answer){
    return axios.post("/user/addMyAnswer/",answer);
  },
  updateMyAnswer:function(answer){
    return axios.post("/user/updateMyAnswer/",answer);
  },
  deleteMyAnswer:function(answer_id){
    return axios.get(`/user/deleteMyAnswer/${answer_id}`);
  },
  getAcessForQuestion:function(questionId){
    return axios.post(`/user/requestAcess/${questionId}`).then((res)=>res.data)
  },


  //admin
  getAllUsers:function(){
    return axios.get(`/api/admin/users/`).then((res)=>res.data)
  },
  updateUserRole:function(body){
    return axios.post(`/api/admin/updateUserRole/`,body).then((res)=>res.data)
  },
  getAllAccessList:function(){
    return axios.get(`/api/admin/getAllAccessList/`).then((res)=>res.data)
  },
  giveAccess:function(body){
    return axios.post(`/api/admin/giveAccess/`,body).then((res)=>res.data)
  },
  revokeAccess:function(body){
    return axios.post(`/api/admin/revokeAccess/`,body).then((res)=>res.data)
  },
  deleteAccess:function(body){
    return axios.post(`/api/admin/deleteAccess/`,body).then((res)=>res.data)
  },
  // folders
  getParentFolder: function(){
    return axios.get(`/user/getParentFolder/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res)=>res.data)
  },
  getSubFolder: function(parent){
    return axios.get(`/user/getSubfolder/${parent}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res)=>res.data)
  }  
  
};