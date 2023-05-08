import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function RelatedTicketModals() {
  const [relatedId, setRelatedId] = useState(0)
  const [items, setItems] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function FetchTickets() {
    console.log("start")
    api.get("/ticket/related/" + relatedId).then(x => {
      api.post("/ticket/idarray", {"ids": x.data.relatedTicketIds}).then(x2 => {
        setItems(x2.data);
        console.log(items[0])
      })
    })
  }

  useEffect(() => {
    
    
  }, [items]);


  return (
    <Modal show={show} onHide={handleClose} className='my-modal' size="lg">
      <style type="text/css">
          {`
      .btn-flat {
        background-color: #08141c;
        color: white;
        font-size:large;
      }

      .btn-xxl {
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
      }
      `}
        </style>
        <Modal.Header closeButton>
          <Modal.Title>Poveži zahtjeve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="flat" onClick={handleShow}>
        Launch demo modal
      </Button>

        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
          <Form.Label size="lg" column="lg" sm="3">
            Sifra zahtjeva
          </Form.Label>
          <Col sm="6">
            <Form.Control size="lg" type="password" placeholder="Šifra zahtjeva" onChange={e => setRelatedId(e.target.value)} />
          </Col>
          <Col>
            <Button variant="flat" onClick={FetchTickets}>
              <FaSearch />
            </Button>
          </Col>
        </Form.Group>

        <table class="tablebig">
          {items.map(item => (
            <>
              <tr key={item.id}>
                <td class="trround">
                  <table class="table1"> 
                    <tr>
                      <td class="td1 tdround"><b>#{item.id}</b></td>
                      <td class="td2 tdround">{new Date(item.date).toLocaleString()}</td>
                    </tr>
                    <tr> 
                      <td class="td3 tdround"><b>{item.title}</b></td>
                      <td class="td4 tdround">{item.createdBy.firstname} {item.createdBy.lastname}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="tdsep"><Button variant="flat" onClick={handleClose}>Poveži</Button></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </>
          ))}
        </table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" onClick={handleClose}>
            Close
          </Button>
          <Button variant="flat" onClick={FetchTickets}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   
  );
}

export default RelatedTicketModals;