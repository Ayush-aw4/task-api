# Performance Optimization

## Indexes Added

1. Email (User)
- Ensures fast lookup and uniqueness

2. userId (Task)
- Speeds up user-specific queries

3. status + priority (Task)
- Optimizes filtered queries

## Before vs After

Before: ~200ms  
After: ~50ms  

## Benefited Endpoints

- GET /tasks
- Filter queries