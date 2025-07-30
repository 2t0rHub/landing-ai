import NavBar from "@/components/navbar";
import { createClient } from "@/prismicio";

export default async function Header() {
  // get the settings from the CMS
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header>
      <NavBar settings={settings.data} />
    </header>
  );
}
