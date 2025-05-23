import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserModule1744383785532 implements MigrationInterface {
  name = 'AddUserModule1744383785532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login_logs" ("id" SERIAL NOT NULL, "login_time" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "PK_15f7b02ad55d5ba905b2962ebab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_register_type_enum" AS ENUM('EMAIL', 'GOOGLE', 'KAKAO', 'NAVER')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_theme_enum" AS ENUM('light', 'dark')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(255), "register_type" "public"."users_register_type_enum" NOT NULL DEFAULT 'EMAIL', "social_id" character varying(255), "profile_image" text, "location" character varying(255), "theme" "public"."users_theme_enum" NOT NULL DEFAULT 'light', "last_login_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."theme" IS '사용자 테마 설정 (light 또는 dark)'`,
    );
    await queryRunner.query(
      `ALTER TABLE "login_logs" ADD CONSTRAINT "FK_e2dffa109d0d3dbd94a0a51669c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_logs" DROP CONSTRAINT "FK_e2dffa109d0d3dbd94a0a51669c"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_theme_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_register_type_enum"`);
    await queryRunner.query(`DROP TABLE "login_logs"`);
  }
}
