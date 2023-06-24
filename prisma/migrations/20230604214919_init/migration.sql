-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_user_id_fkey";

-- DropIndex
DROP INDEX "product_product_id_key";

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "token" SET DATA TYPE TEXT;
