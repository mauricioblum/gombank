import { requireUserSession } from '../session';

export async function loader({ request }: { request: Request }) {
  await requireUserSession(request);

  return true;
}

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-500">
      <h1>Dashboard</h1>
    </div>
  );
}
