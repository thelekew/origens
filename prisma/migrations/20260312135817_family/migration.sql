-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    CONSTRAINT "FamilyMember_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
