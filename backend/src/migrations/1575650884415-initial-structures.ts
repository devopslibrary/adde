import {MigrationInterface, QueryRunner} from "typeorm";

export class initialStructures1575650884415 implements MigrationInterface {
    name = 'initialStructures1575650884415'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "nukeStaleBranches" boolean NOT NULL, "nukeStalePRs" boolean NOT NULL, CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "fullName" character varying NOT NULL, "defaultBranch" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "org" ("id" integer NOT NULL, "name" character varying(50) NOT NULL, "installationId" integer NOT NULL, "lastSynced" TIMESTAMP NOT NULL, "userId" integer, "settingId" integer, CONSTRAINT "REL_680ec81e27c65100ee528b2bdd" UNIQUE ("settingId"), CONSTRAINT "PK_703783130f152a752cadf7aa751" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "repo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "fullName" character varying NOT NULL, "lastSynced" TIMESTAMP NOT NULL, "defaultBranch" character varying NOT NULL, "orgId" integer, CONSTRAINT "PK_6c3318a15f9a297481f341128cf" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "fullName" character varying NOT NULL, "lastCommitDate" TIMESTAMP NOT NULL, "lastSynced" TIMESTAMP NOT NULL, "protected" boolean NOT NULL, "repoId" integer, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "org" ADD CONSTRAINT "FK_51bb6b13249db07294d47494c55" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "org" ADD CONSTRAINT "FK_680ec81e27c65100ee528b2bddc" FOREIGN KEY ("settingId") REFERENCES "setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "repo" ADD CONSTRAINT "FK_55f707b7d91f446ca54614d3d58" FOREIGN KEY ("orgId") REFERENCES "org"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_694908aba49e7f8fdaf104a48a3" FOREIGN KEY ("repoId") REFERENCES "repo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_694908aba49e7f8fdaf104a48a3"`, undefined);
        await queryRunner.query(`ALTER TABLE "repo" DROP CONSTRAINT "FK_55f707b7d91f446ca54614d3d58"`, undefined);
        await queryRunner.query(`ALTER TABLE "org" DROP CONSTRAINT "FK_680ec81e27c65100ee528b2bddc"`, undefined);
        await queryRunner.query(`ALTER TABLE "org" DROP CONSTRAINT "FK_51bb6b13249db07294d47494c55"`, undefined);
        await queryRunner.query(`DROP TABLE "branch"`, undefined);
        await queryRunner.query(`DROP TABLE "repo"`, undefined);
        await queryRunner.query(`DROP TABLE "org"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "setting"`, undefined);
    }

}
