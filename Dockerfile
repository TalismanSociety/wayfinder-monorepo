FROM node:16-alpine AS node


FROM node AS node-with-gyp
RUN apk add g++ make python3


FROM node-with-gyp AS builder
WORKDIR /squid
ADD . .
RUN yarn install --immutable


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
CMD ["make", "process"]


FROM squid AS query-node
CMD ["make", "serve"]
