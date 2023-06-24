-- CreateTable
CREATE TABLE "token" (
    "user_id" UUID NOT NULL,
    "token" UUID NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "media" TEXT[],
    "created_At" TIMESTAMP(3),
    "seller_id" UUID,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "warehouse_fullness" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 1,
    "product_id" UUID NOT NULL,
    "warehouse_id" UUID,

    CONSTRAINT "warehouse_fullness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouse" (
    "id" UUID NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "house_street" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "amount_procent" INTEGER NOT NULL,
    "seller_id" UUID,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seller" (
    "seller_id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "photo" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "house_street" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "settings" JSONB DEFAULT '{}',
    "amount_customer" INTEGER DEFAULT 0,
    "rating" INTEGER DEFAULT 0,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("seller_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "preferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "photo" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "house_street" TEXT NOT NULL,
    "house_number" INTEGER NOT NULL,
    "settings" JSONB DEFAULT '{}',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "media" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "text" TEXT NOT NULL,
    "chat_id" UUID NOT NULL,
    "from_seller_id" UUID NOT NULL,
    "from_user_id" UUID NOT NULL,
    "to_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_user_id_key" ON "token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_product_id_key" ON "product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_seller_id_key" ON "product"("seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_id_key" ON "warehouse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_seller_id_key" ON "seller"("seller_id");

-- CreateIndex
CREATE UNIQUE INDEX "seller_email_key" ON "seller"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("seller_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse_fullness" ADD CONSTRAINT "warehouse_fullness_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse_fullness" ADD CONSTRAINT "warehouse_fullness_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "seller"("seller_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "token"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "token"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_from_seller_id_fkey" FOREIGN KEY ("from_seller_id") REFERENCES "seller"("seller_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
