import axios from "axios";
import { url } from "../dashboard";



export async function DeletePossession(possessionID, email) {
    try {
      const res = await axios.delete(
        url + "possession/" + possessionID,

        {
          params: {
            id: possessionID,
          },
        }
      );
      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  }