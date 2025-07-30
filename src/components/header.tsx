import Navbar from "@/components/navbar";
import { createClient } from "@/prismicio";

export default async function Header () {
  // get the settings from the CMS
  const client = createClient();
  const settings = await client.getSingle("settings");
  
  return (
    <header>
        <Navbar settings={settings.data} />
    </header>
  )
}