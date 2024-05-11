import Image from "next/image";

export default function Logo() {
    return (
        <Image 
        src="/base/logo.png"
        alt="Logo"
        width={50}
        height={50}
        />
    );
  };