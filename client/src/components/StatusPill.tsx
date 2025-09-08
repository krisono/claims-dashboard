export default function StatusPill({ status }: { status: string }) {
  const getStatusClass = (status: string) => {
    return `status-pill ${status.toLowerCase()}`;
  };

  return <span className={getStatusClass(status)}>{status}</span>;
}
