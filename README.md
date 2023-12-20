# Secret Friend Api

## Database

### Tables
  
#### events

- id INT PK AUTO_INCREMENT
- status BOOLEAN default=false
- title STRING
- description STRING
- grouped BOOLEAN default=false

#### event_groups

- id INT PK AUTO_INCREMENT
- eventId INT
- name STRING

#### event_peoples

- id INT PK AUTO_INCREMENT
- eventId INT
- groupId  INT
- name STRING
- cpf STRING
- matched STRING default=""

## Routes

- POST /admin/login

- GET /admin/events
- GET /admin/events/:id
- POST /admin/events
- PUT /admin/events/:id
- DELETE /admin/events/:id
  
- GET /admin/events/:event_id/groups
- GET /admin/events/:event_id/groups/:id
- POST /admin/events/:event_id/groups
- PUT /admin/events/:event_id/groups/:id
- DELETE /admin/events/:event_id/groups/:id

- GET /admin/events/:event_id/groups/group_id/people
- GET /admin/events/:event_id/groups/group_id/people/:id
- POST /admin/events/:event_id/groups/group_id/people
- PUT /admin/events/:event_id/groups/group_id/people/:id
- DELETE /admin/events/:event_id/groups/group_id/people/:id

- GET /events/:id
- GET /events/:event_id/person?cpf=cpf

## Prisma

- Install
  
````install prisma
npm install prisma --save-dev
````

- ````npx prisma init````

- Create a Model Schema
  
``````schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Event {
  id          Int           @id @default(autoincrement())
  status      Boolean       @default(false)
  title       String
  description String
  grouped     Boolean       @default(false)
  EventGroup  EventGroup[]
  EventPeople EventPeople[]
}

model EventGroup {
  id          Int           @id @default(autoincrement())
  eventId     Int
  name        String
  event       Event?        @relation(fields: [eventId], references: [id])
  EventPeople EventPeople[]
}

model EventPeople {
  id      Int         @id @default(autoincrement())
  eventId Int
  groupId Int
  name    String
  cpf     String
  matched String      @default("")
  event   Event?      @relation(fields: [eventId], references: [id])
  group   EventGroup? @relation(fields: [groupId], references: [id])
}
``````

- Run Migration
  
``````run migration
npx prisma migrate dev --name init
``````
