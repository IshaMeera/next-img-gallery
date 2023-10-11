import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(url: string): 
Promise<ImagesResults | undefined>{
    try{
        const response = await fetch(url,{
            headers:{
                Authorization: env.PEXELS_API_KEY
            }
        })
        if(!response.ok) throw new Error("Fetch Images error!\n")

        const ImagesResults: ImagesResults = await response.json()

        console.log(ImagesResults)

        //Parse data with zod schema
        const parsedData = ImagesSchemaWithPhotos.parse(ImagesResults)

        if(parsedData.total_results === 0) return undefined

        return parsedData
    }catch(e){
        //Will show in the terminal
        if(e instanceof Error)
        console.log(e.stack)       
    }
}