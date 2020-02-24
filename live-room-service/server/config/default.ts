export default{
  port: 3000,
  database: {
    HOST: '127.0.0.1',  //数据库地址
    PORT: '3306',
    USER: 'root', //数据库用户
    PASSWORD: '18819640516', //数据库密码
    DATABASE: 'front_logger_db' //选中数据库
  },
  useRedis:true, // 缓存使用 redis
  redis:{
    exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host
    password: "",
    prefix: "front-logger:", // 存诸前缀
    keyPrefix: "front-logger:" // 存诸前缀
  },
  secret:"gesafe",
  // 生产环境配置文件
  prod: {
    database: {
      HOST: 'rm-2ze8wa1j31ay60omx.mysql.rds.aliyuncs.com',  //数据库地址
      PORT: '3306',
      USER: 'front_logger_db', //数据库用户
      PASSWORD: 'front_logger_db!@#QWE', //数据库密码
      DATABASE: 'front_logger_db' //选中数据库
    },
    redis:{
      exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
      port: 6379, // Redis port
      host: "r-2zeoy97gwck0jyyv6s.redis.rds.aliyuncs.com", // Redis host
      password: "sKzJedjM5OsWr2Ra",
      prefix: "front-logger:", // 存诸前缀
      keyPrefix: "front-logger:" // 存诸前缀
    }
  },
  // daditest
  test: {
    database: {
      HOST: 'rm-8vb94upn9y782wh4e20800.mysql.zhangbei.rds.aliyuncs.com',  //数据库地址
      PORT: '3306',
      USER: 'front_logger_db', //数据库用户
      PASSWORD: 'front_logger_db!@#QWE', //数据库密码
      DATABASE: 'front_logger_db' //选中数据库
    },
    redis:{
      exprires:60000 * 5, //默认缓存时间 单位ms 本地缓存ms单位 redis设置s 已在redis工具统一使用ms
      port: 6379, // Redis port
      host: "r-8vby8jsgwho40hv6y1.redis.zhangbei.rds.aliyuncs.com", // Redis host
      password: "dVzVkKjUnAs4pXBD",
      prefix: "front-logger:", // 存诸前缀
      keyPrefix: "front-logger:" // 存诸前缀
    }
  }
}
