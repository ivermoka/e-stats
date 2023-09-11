import Link from "next/link";

const FooterLink = ({ link, text, onClick }) => {
  return (
    <Link onClick={onClick} className="underline" href={link}>
      {text}
    </Link>
  );
};

export default FooterLink;
