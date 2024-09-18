import Image from "next/image";
import "./page.css"
import TypingTest from "@/Widgets/TypingTest/TypingTest";

export default function Home() {
  return (
    <main>
      
      <div className="typingtest">
        <TypingTest />
      </div>
    </main>
  );
}
