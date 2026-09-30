CREATE INDEX CONCURRENTLY idx_large_transactions_customer_created_at
ON large_transactions (customer_id, created_at DESC);
