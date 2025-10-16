import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$site_name}/__not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__not-found"!</div>
}
