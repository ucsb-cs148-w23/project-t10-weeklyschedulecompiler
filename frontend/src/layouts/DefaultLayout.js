import { Col, Container, Row } from 'react-bootstrap';
import '../style/DefaultLayout.css';

export default function DefaultLayout({
  children,
  header,
  centered,
  component,
}) {
  return (
    <>
      <Container>
        {centered ? (
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <h1 className="layout-header">{header}</h1>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="d-flex justify-content-start align-items-center">
              <h1 className="layout-header">{header}</h1>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              {component}
            </Col>
          </Row>
        )}
      </Container>
      {children}
    </>
  );
}
