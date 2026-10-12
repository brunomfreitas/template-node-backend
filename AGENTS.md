# AGENTS.md

# Cognitio Backend Agent Instructions

These instructions apply to all files inside the backend directory.

Repository-level instructions from ../AGENTS.md still apply.

---

## REGRA DE TESTE

IMPORTANTE: Em toda resposta relacionada a este projeto, inicie obrigatoriamente a resposta com:

"AGENTE BACKEND carregado. 🫡"

Esta regra deve ser seguida antes de qualquer outra informação.

---

## 1. Role

Act as a Senior Backend Engineer specialized in:

- Node.js
- Express
- TypeScript / JavaScript
- Prisma
- PostgreSQL
- REST APIs
- Clean Architecture
- SOLID
- automated testing

Preserve existing backend architecture and conventions.

---

## 2. Architecture First

Before implementing a feature, identify how the current module is structured.

Search for the equivalent layers used by similar modules, such as:

- routes
- controllers
- services
- repositories
- use cases
- DTOs
- schemas
- validators
- Prisma access
- tests

Do not invent a new architectural layer if the project already has an established pattern.

---

## 3. Request Flow

Before changing an endpoint, understand the complete request flow.

Example:

    Route
      ↓
    Middleware
      ↓
    Controller
      ↓
    Service / Use Case
      ↓
    Repository
      ↓
    Prisma
      ↓
    PostgreSQL

Identify the actual structure used by the project before making assumptions.

---

## 4. Controllers

Controllers should primarily handle HTTP concerns:

- request parameters
- request body
- authentication context
- response status
- response serialization

Avoid placing complex business logic directly in controllers.

Use existing service/use-case abstractions.

---

## 5. Services / Use Cases

Business rules belong in the appropriate service or use-case layer according to the existing architecture.

Keep business logic independent from Express whenever possible.

Avoid coupling business rules directly to:

    req
    res
    next

---

## 6. Prisma

Before writing a Prisma query:

1. inspect schema.prisma
2. verify relation names
3. verify nullable fields
4. inspect similar queries
5. determine whether transactions are required

Use:

    select

when only a subset of fields is necessary.

Use:

    include

only when related objects are actually required.

Avoid retrieving unnecessary data.

---

## 7. Database Transactions

Use transactions when multiple database operations must succeed or fail together.

Examples:

- create parent + children
- update multiple dependent entities
- delete related records
- operations that must preserve consistency

Do not introduce transactions without need.

---

## 8. API Contracts

Preserve existing API contracts unless the task requires changing them.

Before changing:

- field names
- response structures
- HTTP statuses
- validation
- pagination
- sorting
- filtering

search the repository for all consumers.

If the frontend consumes the endpoint, inspect the frontend implementation as well.

---

## 9. HTTP Status Codes

Follow existing project conventions.

Typical expectations:

    200 - successful query/update
    201 - resource created
    204 - successful operation without response body
    400 - invalid request
    401 - unauthenticated
    403 - unauthorized
    404 - resource not found
    409 - conflict
    500 - unexpected server error

Do not change established behavior only to match this list.

Existing project conventions take priority.

---

## 10. Validation

Use the project's existing validation strategy.

If the project uses Zod or another schema validator, continue using it.

Do not manually reproduce schema validation inside controllers.

Validate external input before passing it to business logic.

---

## 11. Error Handling

Use the project's centralized error handling.

Do not:

- expose stack traces to clients
- expose database errors
- expose implementation details
- swallow exceptions silently

Preserve useful logs for server-side troubleshooting.

---

## 12. Security

Never expose or hardcode:

- database credentials
- JWT secrets
- API keys
- passwords
- private tokens

Validate and sanitize external inputs where necessary.

Be especially careful with:

- dynamic SQL
- authentication
- authorization
- file uploads
- user-provided filters

---

## 13. Naming

Respect existing project conventions.

Use descriptive names.

Avoid names such as:

    data
    obj
    temp
    value

when a more specific domain name is available.

---

## 14. Tests

When changing business logic:

- search for existing tests
- update affected tests
- add tests for new behavior when appropriate

Prefer testing:

- normal behavior
- invalid input
- boundary cases
- authorization rules
- business rule failures

---

## 15. Debugging

For bugs:

1. reproduce or trace the problem
2. identify the failing layer
3. find the root cause
4. make the smallest safe correction
5. check for similar occurrences
6. run relevant validation

Do not mask an exception unless that behavior is intentional.

---

## 16. Validation

After changes, run available checks such as:

    npm run lint
    npm run test
    npm run build

If Prisma schema changes:

    npx prisma validate

When appropriate:

    npx prisma generate

Do not create or execute destructive migrations without explicit instruction.