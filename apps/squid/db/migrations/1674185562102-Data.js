module.exports = class Data1674185562102 {
  name = 'Data1674185562102'

  async up(db) {
    await db.query(
      `ALTER TABLE "token" ADD "logo" text NOT NULL DEFAULT 'https://raw.githubusercontent.com/TalismanSociety/chaindata/v3/assets/tokens/unknown.svg'`
    )
  }

  async down(db) {
    await db.query(`ALTER TABLE "token" DROP COLUMN "logo"`)
  }
}
