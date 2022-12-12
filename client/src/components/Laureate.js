import { Accordion, Card, CarouselItem, ListGroup, ListGroupItem, Placeholder } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { json } from "react-router-dom";

export default function Laureate(props) {
    return (<Card style={{ width: '18rem', margin: "1rem" }}>
        {props.data ?

            <>
                <Card.Img variant="top" src={"https://placekitten.com/270/180"}></Card.Img>
                <Card.Body>
                    <Card.Title color="dark">{props.data.knownName}</Card.Title>
                    
                    <Card.Text>
                        <Accordion>
                            <AccordionItem eventKey="0">
                                <Accordion.Header>Nobel prizes won</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {props.data.nobelPrizes.map((num) => <li key={num}>{num}</li>)}
                                    </ul>
                                </Accordion.Body>
                            </AccordionItem>
                            <AccordionItem eventKey="1">
                                <Accordion.Header>Debug info</Accordion.Header>
                                <Accordion.Body>
                                    <code>{JSON.stringify(props.data)}</code>
                                </Accordion.Body>
                            </AccordionItem>
                        </Accordion>
                    </Card.Text>
                    <Card.Link href={props.data.wikipedia}>Wikipedia</Card.Link>
                </Card.Body>
            </>
            :
            <>
                <Card.Img variant="top" src="/loading.jpg"></Card.Img>

                <Card.Body>
                    <Card.Title><Placeholder>Buncha secret text</Placeholder></Card.Title>
                    <Card.Text>
                        <Placeholder>
                            Here's abunch of text descbribing the funny wowie yes
                        </Placeholder>
                    </Card.Text>
                    <Card.Link><Placeholder>Wikipedia</Placeholder></Card.Link>
                </Card.Body>
            </>
        }
    </Card>)

    /*
    return (
        <div>
            <div> AwardWinner: {props.data.knownName === undefined ? props.data.orgName.en : props.data.knownName.en}</div>
            <div > Portion : {props.data.portion}</div>
        </div>)
    */
}