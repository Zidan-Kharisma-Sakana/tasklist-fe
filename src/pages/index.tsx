import { guardAuthenticated } from "@/lib/utils/guardAuthenticated";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <main
      className=""
    >
      haha
    </main>
  );
}
export default guardAuthenticated(Home)