import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen h-14 bg-pink-300 flex items-center justify-between px-10">
      <Link href="/" className="font-bold text-2xl">
        スペイン語学習
      </Link>
      <div>
        <Link href="#" className="text-lg">
          お問い合わせ
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
