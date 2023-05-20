import http from 'http'
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'
// 세션ID 정보를 담을 객체 생성
const sessions = {};

function IsSessionChecker(req) {
  const cookies = req.headers.cookie;
  if (cookies && sessions[cookies]) {
    // 세션 데이터가 있으면 인증된 사용자이다.
    return true;
  } else {
    // 세션 데이터가 없으면 인증이 안된 사용자이다.
    return false;
  }
}

const server=http.createServer((req,res)=>{
  if(req.method === 'GET') {
    if(req.url === '/' ) {
      const html = fs.readFileSync('./main.html');
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    }
    if(req.url === '/main.js') {
      console.log("/main.js 요청 처리");
      const js = fs.readFileSync('./main.js');
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(js);
    }
  }

  if(req.method === 'POST') {
    console.log("POST 진입")

    if(req.url === '/login'){
      console.log("login 진입")
      req.on('data', chunk => {
        const data = JSON.parse(chunk);

        // 로그인 처리 부분
        // 로그인 성공 시 세션 ID 생성
        const sessionID = uuidv4();
        // 세션 정보 저장
        sessions[sessionID] = {
          // 사용자 로그인 정보
          // data에 사용자의 정보가 있다고 가정
          userId : data.id,
          userPwd : data.pwd,
        };
        // 응답에서 클라이언트에게 세션ID 전송
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ sessionID }));
      })
    }
  }
})

server.listen(3000, () => {
  console.log('3000port server on')
});