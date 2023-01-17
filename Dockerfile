FROM node:16-alpine AS node


FROM node AS node-with-gyp
RUN apk add g++ make python3


FROM node-with-gyp AS builder
WORKDIR /squid
ADD .yarn .yarn
ADD .yarnrc.yml .
ADD yarn.lock .
ADD Makefile .
ADD package.json .
ADD apps/demo/package.json apps/demo/
ADD apps/squid/package.json apps/squid/
ADD packages/eslint-config packages/eslint-config
ADD packages/lib packages/lib
ADD packages/react-hook packages/react-hook
ADD packages/tsconfig packages/tsconfig
ADD packages/types packages/types
RUN yarn install --immutable
ADD apps/squid/tsconfig.json apps/squid/
ADD apps/squid/schema.graphql apps/squid/
ADD apps/squid/src apps/squid/src
ADD packages packages
RUN make build


FROM node AS squid
WORKDIR /squid

COPY --from=builder /squid/Makefile .
COPY --from=builder /squid/package.json .
COPY --from=builder /squid/node_modules node_modules
COPY --from=builder /squid/yarn.lock .

COPY --from=builder /squid/apps/squid/package.json apps/squid/
COPY --from=builder /squid/apps/squid/schema.graphql apps/squid/
COPY --from=builder /squid/apps/squid/lib apps/squid/lib
ADD apps/squid/db apps/squid/db
ADD apps/squid/assets apps/squid/assets

# TODO: use shorter PROMETHEUS_PORT
ENV PROCESSOR_PROMETHEUS_PORT 3000
EXPOSE 3000
EXPOSE 4000


FROM squid AS processor
CMD ["yarn", "workspace", "@talismn/wayfinder-squid", "processor:start"]


FROM squid AS query-node
CMD ["yarn", "workspace", "@talismn/wayfinder-squid", "query-node:start"]
