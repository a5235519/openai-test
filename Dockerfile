# 基于 Node.js 镜像
FROM node:14-alpine

# 安装系统依赖
RUN apk add --no-cache python3 make g++

# 设置工作目录
WORKDIR /app

# 将应用程序的依赖复制到工作目录
COPY package.json package-lock.json /app/

# 安装应用程序的依赖
RUN yarn install --production

# 复制应用程序的代码到工作目录
COPY ./

# 设置环境变量
ENV NODE_ENV production

# 暴露端口
EXPOSE 3000

# 启动应用程序
CMD ["yarn", "build"]

# 启动应用程序
CMD ["yarn", "start"]