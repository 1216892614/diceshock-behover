import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__not-found"!</div>
}
