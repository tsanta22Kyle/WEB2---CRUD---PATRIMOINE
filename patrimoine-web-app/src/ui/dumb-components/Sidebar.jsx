function Sidebar() {
    return (
      <>
        {/* <button
          class="btn "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          {" "}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
            className="rounded-circle"
            height="25"
            alt="Black and White bg menu"
            loading="lazy"
          />
        </button> */}
  
        <div
          class="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
              Gestionnaire de patrimoine
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body container col myLinks">
            <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
              <a
                href="/#acceuil"
                className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover "
              >
                Mon patrimoine
              </a>
            </label>
            <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
              <a
                href="/#total"
                className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover"
              >
                le total
              </a>
            </label>
            <label htmlFor="offcanvasWithBothOptions" data-bs-dismiss="offcanvas">
              <a
                href="/chart"
                className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover row text-center link-offset-3-hover"
              >
                voir les stats
              </a>
            </label>
          </div>
        </div>
      </>
    );
  }

  export default Sidebar;