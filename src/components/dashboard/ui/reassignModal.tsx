const ReassignModal = () => (
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <form className="modal-content" action="/lead/1" method="GET">
        <input type="hidden" name="status" value="1" />
        <input type="hidden" name="user" value="4" />
        <input type="hidden" name="source" value="all" />
        <input type="hidden" name="lead_id_share" className="lead_id_share" />
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Reassign
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="inputPassword4">
              Assign to <span id="reassignModalDom"></span>
            </label>
            <select
              name="assign_to"
              id="inputState"
              className="form-control"
            ></select>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ReassignModal;
