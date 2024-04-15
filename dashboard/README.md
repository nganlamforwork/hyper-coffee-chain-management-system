## Getting Started

Resources: https://www.youtube.com/watch?v=_LF-IvJsr5Y&ab_channel=TomDoesTech

Install all the dependencies

```bash
npm install
```

Run the website:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Documents

-   Write model schema in `prisma/schema.prisma`
-   Always run this when create a new schema:

```bash
npm run generate
```

-   Then, remeber to push the migrations to `NeonDB`:

```bash
npm run push
```

-   Run `Prisma Studio` to view db and modify it:

```bash
npm run studio
```

## Authentication & Authorization

-   Using `NextAuth`

-   **Roles availables:**
    -   ADMIN
    -   USER
    -   STAFF
    -   SWITCH_BOARD_STAFF

## Third party services

-   ORM: prisma
-   Email: Resend
-   Database: NeonDB
