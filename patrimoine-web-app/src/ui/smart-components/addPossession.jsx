import { useForm } from "react-hook-form";
import { url } from "../dashboard";
import axios from "axios";
function AddPossession({ func, email }) {
    const { handleSubmit, register, watch } = useForm();
  
    const onSubmit = (data) => {
      // console.log(data);
      func();
      async function post() {
        try {
          const res = await axios.post(url + "possession", {
            ...data,
            email: email,
          });
  
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      }
      post();
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
          <h3 className="mt-2 mb-1">Ajouter une possession</h3>
  
          <div className="w-75">
            <label htmlFor="name" className="form-label">
              Libellé
            </label>
            <input
              type="text"
              className="possession-name form-control"
              id="name"
              {...register("possessionName", {
                required: true,
              })}
            />
          </div>
          <div className="w-75">
            <label htmlFor="initial-value" className="form-label">
              valeur initiale
            </label>
            <input
              type="text"
              id="initial-value"
              className="form-control"
              {...register("possessionValue", {
                required: {
                  value: true,
                },
              })}
            />
          </div>
          <div className="w-75">
            <label htmlFor="owning-date" className="form-label">
              date d'obtention
            </label>
            <input
              type="date"
              name="obtention"
              id="owning-date"
              className="form-control"
              {...register("owningDate", {
                required: {
                  value: true,
                },
              })}
            />
          </div>
          <div className="w-75">
            <label id="decreasing-rate" className="form-label">
              Taux d'amortissement
            </label>
            <select
              class="form-select"
              aria-label="decreasing-rate"
              {...register("decreasingRate", {
                required: {
                  value: true,
                },
              })}
            >
              <option selected>2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </form>
      </>
    );
  }

  export default AddPossession;