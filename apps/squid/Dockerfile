FROM node:16-alpine AS node

FROM node AS node-with-gyp
RUN apk add g++ make python3

FROM node-with-gyp AS builder
WORKDIR /squid
ADD Makefile .
ADD package.json .
ADD yarn.lock .
RUN yarn install --immutable
ADD tsconfig.json .
ADD schema.graphql .
ADD src src
RUN make build

FROM node-with-gyp AS deps
WORKDIR /squid
ADD Makefile .
ADD package.json .
ADD yarn.lock .
RUN yarn install --immutable

FROM node AS squid
WORKDIR /squid
COPY --from=deps /squid/Makefile .
COPY --from=deps /squid/package.json .
COPY --from=deps /squid/yarn.lock .
COPY --from=deps /squid/node_modules node_modules
COPY --from=builder /squid/schema.graphql .
COPY --from=builder /squid/lib lib
ADD db db
ADD assets assets
# TODO: use shorter PROMETHEUS_PORT
ENV PROCESSOR_PROMETHEUS_PORT 3000
EXPOSE 3000
EXPOSE 4000


FROM squid AS processor
CMD ["make", "process"]


FROM squid AS query-node
CMD ["make", "serve"]
