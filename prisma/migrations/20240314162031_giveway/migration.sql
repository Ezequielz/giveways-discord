-- CreateTable
CREATE TABLE "Giveaway" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "effectiveDate" TEXT NOT NULL,
    "participantLimit" INTEGER,
    "quantityWinners" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Giveaway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "userId" TEXT NOT NULL,
    "giveawayId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winner" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("userId","giveawayId")
);

-- CreateTable
CREATE TABLE "Prize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "giveawayId" TEXT NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prize" ADD CONSTRAINT "Prize_giveawayId_fkey" FOREIGN KEY ("giveawayId") REFERENCES "Giveaway"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
