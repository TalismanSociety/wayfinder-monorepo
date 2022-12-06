module.exports = class Data1670329880485 {
  name = 'Data1670329880485'

  async up(db) {
    await db.query(
      `CREATE TABLE "token" ("id" character varying NOT NULL, "name" text NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "chain_token" ("id" character varying NOT NULL, "is_native" boolean NOT NULL, "existential_deposit" text NOT NULL, "token_id" character varying NOT NULL, "chain_id" character varying, CONSTRAINT "PK_dc45f4dc156be196c13257cc4e0" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_dff8075dddab26148799406841" ON "chain_token" ("chain_id") `)
    await db.query(`CREATE INDEX "IDX_13e5ca3c40773721d7da7c48c0" ON "chain_token" ("token_id") `)
    await db.query(
      `CREATE TABLE "chain" ("id" character varying NOT NULL, "para_id" integer, "name" text NOT NULL, "logo" text NOT NULL, "prefix" integer NOT NULL, CONSTRAINT "PK_8e273aafae283b886672c952ecd" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "route" ("id" character varying NOT NULL, "fee" text NOT NULL, "weight_limit" text NOT NULL, "from_id" character varying, "to_id" character varying, "token_id" character varying, "fee_token_id" character varying, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_57107d6f4ed4405ee1c8895f94" ON "route" ("from_id") `)
    await db.query(`CREATE INDEX "IDX_476fe7944ef7dd25e93827274d" ON "route" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_3eb2858c4d5559985c0354e967" ON "route" ("token_id") `)
    await db.query(`CREATE INDEX "IDX_f87dfe1d27d9872aed68822385" ON "route" ("fee_token_id") `)
    await db.query(
      `ALTER TABLE "chain_token" ADD CONSTRAINT "FK_dff8075dddab261487994068419" FOREIGN KEY ("chain_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "chain_token" ADD CONSTRAINT "FK_13e5ca3c40773721d7da7c48c06" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "route" ADD CONSTRAINT "FK_57107d6f4ed4405ee1c8895f942" FOREIGN KEY ("from_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "route" ADD CONSTRAINT "FK_476fe7944ef7dd25e93827274df" FOREIGN KEY ("to_id") REFERENCES "chain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "route" ADD CONSTRAINT "FK_3eb2858c4d5559985c0354e9670" FOREIGN KEY ("token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "route" ADD CONSTRAINT "FK_f87dfe1d27d9872aed688223855" FOREIGN KEY ("fee_token_id") REFERENCES "token"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(db) {
    await db.query(`DROP TABLE "token"`)
    await db.query(`DROP TABLE "chain_token"`)
    await db.query(`DROP INDEX "public"."IDX_dff8075dddab26148799406841"`)
    await db.query(`DROP INDEX "public"."IDX_13e5ca3c40773721d7da7c48c0"`)
    await db.query(`DROP TABLE "chain"`)
    await db.query(`DROP TABLE "route"`)
    await db.query(`DROP INDEX "public"."IDX_57107d6f4ed4405ee1c8895f94"`)
    await db.query(`DROP INDEX "public"."IDX_476fe7944ef7dd25e93827274d"`)
    await db.query(`DROP INDEX "public"."IDX_3eb2858c4d5559985c0354e967"`)
    await db.query(`DROP INDEX "public"."IDX_f87dfe1d27d9872aed68822385"`)
    await db.query(`ALTER TABLE "chain_token" DROP CONSTRAINT "FK_dff8075dddab261487994068419"`)
    await db.query(`ALTER TABLE "chain_token" DROP CONSTRAINT "FK_13e5ca3c40773721d7da7c48c06"`)
    await db.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_57107d6f4ed4405ee1c8895f942"`)
    await db.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_476fe7944ef7dd25e93827274df"`)
    await db.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_3eb2858c4d5559985c0354e9670"`)
    await db.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_f87dfe1d27d9872aed688223855"`)
  }
}
