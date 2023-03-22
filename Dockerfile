# 基于 Node.js 镜像
FROM node:16-alpine

# 安装系统依赖
RUN apk add --no-cache python3 make g++

# 创建目录
RUN mkdir -p /app

# 复制工程
COPY ["./", "/app"]

# 设置工作目录
WORKDIR /app

# 安装应用程序的依赖
RUN npm i -g next

# 设置环境变量
ENV NODE_ENV production

# 暴露端口
EXPOSE 3000

# build
RUN npm run build

# 启动应用程序
CMD ["npm", "start"]