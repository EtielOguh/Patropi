import type { MetadataRoute } from "next";
import { assetPath, basePath } from "@/config/business";
export const dynamic = "force-static";
export default function manifest():MetadataRoute.Manifest{return {name:"Hotel e Churrascaria Patropi",short_name:"Patropi",description:"Restaurante e hospedagem em Casimiro de Abreu — RJ",start_url:`${basePath}/`,scope:`${basePath}/`,display:"standalone",background_color:"#f5f4ec",theme_color:"#19352d",icons:[{src:assetPath("/icon.png"),sizes:"150x150",type:"image/png"}]}}
