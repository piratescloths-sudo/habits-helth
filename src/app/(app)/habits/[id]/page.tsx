import HabitDetailClient from "./habit-detail-client";

// This function is required for static export of dynamic routes.
// Since habit IDs are user-specific and not known at build time,
// we return an empty array. This means no habit pages will be
// pre-built. They will be rendered on the client-side after initial load.
// This resolves the build error but means these pages won't be available
// in a purely static environment without client-side JavaScript.
export async function generateStaticParams() {
  return [];
}

export default function HabitDetailPage() {
  return <HabitDetailClient />;
}
