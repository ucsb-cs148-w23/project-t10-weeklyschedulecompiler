import React from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';

function inviteCard( { groupName }) {

    function acceptInvite() {
        console.log('accept invite')
    }
    
    function declineInvite() {
        console.log('decline invite')
    }

    return (
        <Card className="m-2">
            <Card.Body style={{ width: '100%', cursor: 'pointer' }}>
                <Row>
                    <Col style={{display:'flex', alignItems:'center'}}>
                        <Card.Title>{groupName}</Card.Title> 
                    </Col>
                    <Col style={{display:'flex', justifyContent:'end'}}>
                        <Button className='m-1' variant='success' onClick={() => {acceptInvite()}}>&#x2713;</Button>
                        <Button className='m-1' variant='danger' onClick={() => {declineInvite()}}>&#x2715;</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default inviteCard