-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "sessionCartId" TEXT NOT NULL,
    "Items" JSON[] DEFAULT ARRAY[]::JSON[],
    "ItemsPrice" DECIMAL(12,2) NOT NULL,
    "TotalPrice" DECIMAL(12,2) NOT NULL,
    "ShippingPrice" DECIMAL(12,2) NOT NULL,
    "TaxPrice" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
