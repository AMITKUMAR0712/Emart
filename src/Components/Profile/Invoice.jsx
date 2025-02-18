import styled from "styled-components";
import { FaFileInvoice } from "react-icons/fa";


const Container = styled.div`
  background-color: #6c757d;
  padding: 1.5rem;
`;

const InvoiceCard = styled.div`
  background-color: white;
  padding: 2.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const InvoiceTitle = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
`;

const AddressSection = styled.address`
  font-style: normal;
`;

const CardTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    border: 1px solid #dee2e6;
    text-align: left;
  }

  thead {
    background-color: #f8f9fa;
  }

  tfoot {
    font-weight: bold;
  }
`;

const Note = styled.p`
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  a {
    padding: 0.5rem 1rem;
    border: 1px solid #ced4da;
    text-decoration: none;
    color: #495057;
    background-color: #f8f9fa;
    border-radius: 0.25rem;
  }
`;

const Invoice = () => {
  return (
    <Container>
      <InvoiceCard>
        <Row>
          <div>
            <FaFileInvoice size={64} />
          </div>
          <InvoiceTitle>Invoice</InvoiceTitle>
        </Row>
        <Row>
          <div>
            <strong>Invoice Date:</strong>{" "}
            {new Date(Date.now()).toLocaleDateString()}
          </div>
          <div>
            <strong>Invoice No:</strong> #1234567890
          </div>
        </Row>
        <Row>
          <div>
            <strong>From</strong>
            <AddressSection>
              <strong>Twitter, Inc.</strong>
              <br />
              1355 Market St, Suite 900
              <br />
              San Francisco, CA 94103
              <br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </AddressSection>
          </div>
          <div style={{ textAlign: "right" }}>
            <strong>To</strong>
            <AddressSection>
              <strong>Twitter, Inc.</strong>
              <br />
              1355 Market St, Suite 900
              <br />
              San Francisco, CA 94103
              <br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </AddressSection>
          </div>
        </Row>
        <CardTable>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Rate</th>
              <th>QTY</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>T-shirts</td>
              <td>
                Maecenas suscipit volutpat gravida. Nulla hendrerit nisi a
                lectus blandit aliquam. Integer enim magna, consequat sed justo
                nec, auctor sagittis urna.
              </td>
              <td>$50.00</td>
              <td>10</td>
              <td>$500.00</td>
            </tr>
            <tr>
              <td>Sweater</td>
              <td>Nulla sodales sit amet orci eu vehicula.</td>
              <td>$120.00</td>
              <td>10</td>
              <td>$1200.00</td>
            </tr>
            <tr>
              <td>Jeans</td>
              <td>A pair of nice jeans</td>
              <td>$450.00</td>
              <td>1</td>
              <td>$450.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                Sub Total:
              </td>
              <td>$2150.00</td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                Tax:
              </td>
              <td>$215.00</td>
            </tr>
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                Total:
              </td>
              <td>$2365.00</td>
            </tr>
          </tfoot>
        </CardTable>
        <Note>
          <strong>NOTE:</strong> This is a computer-generated receipt and does
          not require a physical signature.
        </Note>
        <ButtonGroup>
          <a href="#" onClick={() => window.print()}>
            Print
          </a>
          <a href="#" download>
            Download
          </a>
        </ButtonGroup>
      </InvoiceCard>
    </Container>
  );
};

export default Invoice;
