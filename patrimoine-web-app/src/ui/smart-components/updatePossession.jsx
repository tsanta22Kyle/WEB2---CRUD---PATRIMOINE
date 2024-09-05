import { useForm } from "react-hook-form";
import { url } from "../dashboard";
import axios from "axios";

function UpdatePossession({ func, email, possessionID }) {
    const { handleSubmit, register, watch } = useForm();
  
    const onSubmit = (data) => {
      // console.log(data);
      func();
      async function put() {
        try {
          const res = await axios.put(url + "possession/" + possessionID, {
            ...data,
            email: email,
            possessionID: possessionID,
          });
  
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      put();
    };
  
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="add-possession-container"
        >
          <button
            type="button"
            class="btn-close close-btn"
            aria-label="Close"
            onClick={func}
          ></button>
          <h3 className="mt-2 mb-1">Mettre à jour une possession</h3>
          <div className="w-75">
            <label htmlFor="name" className="form-label">
              nouveau Libellé
            </label>
            <input
              type="text"
              className="possession-name form-control"
              id="name"
              {...register("possessionNameNew", {
                required: true,
              })}
              placeholder="le nouveau nom"
            />
          </div>
          <div className="w-75">
            <label htmlFor="name" className="form-label">
              date de fin
            </label>
            <input
              type="date"
              className="possession-name form-control"
              id="name"
              {...register("endDate", {
                required: false,
              })}
            />
          </div>
  
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </>
    );
  }


  export default UpdatePossession;