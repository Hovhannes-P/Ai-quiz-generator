import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
  className?: string;
}

const BackLink = ({ to, label, className = "" }: BackLinkProps) => {
  const classes = ["back-link", className].filter(Boolean).join(" ");

  return (
    <Link className={classes} to={to}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
        <path d="M9 12h10" />
      </svg>
      <span>{label}</span>
    </Link>
  );
};

export default BackLink;
