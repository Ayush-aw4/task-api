# Caching Strategy

## Why caching?
GET /tasks is frequently used.

## How it works
- Cache stored in memory
- Valid for 60 seconds

## Invalidation
Cache cleared on:
- Create
- Update
- Delete

## Limitations
- Lost on server restart
- Not scalable