
-- UpdateTable
UPDATE "Transaction" SET "currentParcel" = 1 WHERE parcels IS NOT NULL AND parcels > 0;
