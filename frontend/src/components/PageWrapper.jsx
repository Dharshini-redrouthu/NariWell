export default function PageWrapper({ children }) {
  return (
    <div className="page-wrapper">
      <div className="page-content">{children}</div>
    </div>
  );
}
