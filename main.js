const form=document.getElementById('login');

form.addEventListener('submit',(event)=>{
  event.preventDefault();

  const username=document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const data = {
    username: username,
    password: password
  };

  fetch('/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log(result); // 서버 응답 로그 출력
  })
  .catch(error => {
    console.error(error); // 에러 로그 출력
  });
});


// fetch("/session",{
//   method:"GET"™¡
// })
//   .then(function(res){
//     if(res.ok){
//       console.log("successed to get session id");
//       return res.json();
//     }else{
//       throw new Error("Network res is not ok");
//     }
//   })
//   .then(function(data){
//     console.log("세션 아이디:",data.sessionId);
//   })
//   .catch(function(error){
//     console.error("Error fetching session ID:", error);
//   });