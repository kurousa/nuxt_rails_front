FROM node:14.4.0-alpine

ARG WORKDIR
ARG CONTAINER_PORT
# 追加
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}

# ENV check（このRUN命令は確認のためなので無くても良い）
RUN echo ${HOME}
RUN echo ${CONTAINER_PORT}
RUN echo ${API_URL}

WORKDIR ${HOME}

COPY package*.json ./

RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python && \
    # yarn installの記載場所を移動
    yarn install

COPY . ./

RUN yarn run build

EXPOSE ${CONTAINER_PORT}