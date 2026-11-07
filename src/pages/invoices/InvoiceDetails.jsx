const InvoiceDetails = (props) =>
  props.showModal && (
    <div
      className="modal d-block"
      role="presentation"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-details-title"
      >
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title" id="invoice-details-title">
                Invoice Details
              </h5>
              <p className="text-muted mb-0">Customer: {props.invoice.customer.name}</p>
            </div>
            <button type="button" className="btn-close" aria-label="Close" />
          </div>

          <div className="modal-body">
            <h6 className="mb-3">Invoice products</h6>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Unit price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props.invoice.invoice_products.map(
                    (invoice_product, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{invoice_product.product.name}</td>
                        <td>{invoice_product.product.price}</td>
                        <td>{invoice_product.qty}</td>
                        <td>{invoice_product.sale_price}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={()=>props.closeInvoiceDetails(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

export default InvoiceDetails;
