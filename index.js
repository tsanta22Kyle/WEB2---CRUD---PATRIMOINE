
import { log } from "node:console";
import Flux from "./models/possessions/Flux.js";


import fs from "node:fs/promises";

async function readFile(path) {
  try {
    const data = await fs.readFile(path, { encoding: "utf8" });
    return {
      status: "OK",
      data: JSON.parse(data),
    };
  } catch (err) {
    return {
      status: "ERROR",
      error: err,
    };
  }
}

async function writeFile(path, data) {
  try {
    await fs.writeFile(path, JSON.stringify(data), {
      encoding: "utf8",
    });
    return {
      status: "OK",
    };
  } catch (err) {
    return {
      status: "ERROR",
      error: err,
    };
  }
}

export async function generatePossessionToFront() {
    try{
        const path = "./data.json/"
        const JSONToObject = await fs.readFile(path,"utf-8");
        console.log(JSON.parse(JSONToObject)[1].data.possessions)
        const jsContent = `export const myData =  ${JSON.stringify(JSON.parse(JSONToObject)[1].data.possessions)}`
        await fs.writeFile("./handler.js",jsContent,'utf-8')
        console.log('data file generated succefully')

    }catch(err){
        console.log("error can't generate data file",err);
        
    }
    
}
generatePossessionToFront()



export { readFile, writeFile };

