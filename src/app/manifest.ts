import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "African Global Business",
    short_name: "AGB",
    description: "African Global Business (AGB) : BTP, infrastructures, logistique, import-export, imprimerie et fournitures en Guinée.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#dc0111",
    lang: "fr",
  };
}
