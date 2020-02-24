const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const koaStatic = require("koa-static");
const path = require("path");
const Router = require("koa-router");
const router = new Router();
const Kcors = require("kcors");
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
// const koaLogger = require('koa-logger-winston');
// import logger from './src/middleware/logger';
var USERCOUNT = 3;

import sample from "./src/router/sample";
// import myRouter from "./src/router/index";
import errorMiddleware from "./src/middleware/error";
// import checkMiddleware from "./src/middleware/check";

// 验证是否有token
//POST解析
app.use(bodyParser());
// 跨域设置
const corsOptions = {
  origin: "*",
  credentials: true,
  maxAge: 3600
};
app.use(Kcors(corsOptions));

// app.use(checkMiddleware);
app.use(errorMiddleware());
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(koaStatic(path.resolve(__dirname, "./public")));
} else {
  app.use(koaStatic(path.resolve(__dirname, "../public")));
}
// 路由配置
router.get("/", sample);
// for (var i in myRouter) {
//   myRouter[i].forEach(item => {
//     if (item.method == "get") {
//       router.get(item.url, item.function);
//     } else if (item.method == "post") {
//       router.post(item.url, item.function);
//     }
//   });
// }

//正常请求的日志
// app.use(koaLogger(logger.success));

app
  .use(router.routes()) //把路由都引入进来
  .use(router.allowedMethods());

// 收集错误日志
// app.use(koaLogger(logger.error));

io.sockets.on('connection', (socket)=> {

	socket.on('message', (room, data)=>{
    console.log("message",room, data);
		socket.to(room).emit('message',room, data);
	});

	socket.on('join', (room)=>{
    socket.join(room);
    console.log("join",room);
		var myRoom = io.sockets.adapter.rooms[room]; 
		var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;
    console.log("users",users);
		if(users < USERCOUNT){
			socket.emit('joined', room, socket.id); //发给除自己之外的房间内的所有人
			if(users > 1){
				socket.to(room).emit('otherjoin', room, socket.id);
			}
		
		}else{
			socket.leave(room);	
      socket.emit('full', room, socket.id);
      
		}
		//socket.emit('joined', room, socket.id); //发给自己
		//socket.broadcast.emit('joined', room, socket.id); //发给除自己之外的这个节点上的所有人
		//io.in(room).emit('joined', room, socket.id); //发给房间内的所有人
	});

	socket.on('leave', (room)=>{
		var myRoom = io.sockets.adapter.rooms[room]; 
		var users = (myRoom)? Object.keys(myRoom.sockets).length : 0;
		//socket.emit('leaved', room, socket.id);
		//socket.broadcast.emit('leaved', room, socket.id);
		socket.to(room).emit('bye', room, socket.id);
		socket.emit('leaved', room, socket.id);
		//io.in(room).emit('leaved', room, socket.id);
	});

});


// console.log("listen 9090");
// app.listen(9090);
// 监听端口
server.listen(9096, () => {
  console.log('listening on :9096');
});
