# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Turbo

To run the turbo dev

```bash
pnpm turbo run dev
```

To build turbo, run

```bash
pnpm turbo run build
```

To import new component from shadcn.ui, run 

```bash
pnpm dlx shadcn@2.9.2 add [Component]
```

To add dependencies to package.json, run

```bash
pnpm -F backend add --save-dev @types/node
```
