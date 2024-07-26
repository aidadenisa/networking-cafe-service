import type { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInvitationTable1720472131244 implements MigrationInterface {
  name = 'CreateInvitationTable1720472131244'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."invitation_status_enum" AS ENUM('created', 'sent', 'accepted', 'rejected')`)
    await queryRunner.query(
      `CREATE TABLE "invitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."invitation_status_enum" NOT NULL DEFAULT 'created', CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invitation"`)
    await queryRunner.query(`DROP TYPE "public"."invitation_status_enum"`)
  }
}
