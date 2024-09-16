import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-screen h-14 bg-blue-300 flex items-center justify-between px-10">
      <Link href="/" className="font-bold text-2xl">
        スペイン語学習
      </Link>
      <div>
        <Link href="#" className="text-lg">
          お問い合わせ
        </Link>
      </div>
    </header>
  );
};

export default Header;
