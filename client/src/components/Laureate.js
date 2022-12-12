import { Card } from "react-bootstrap";

export default function Laureate(props) {
    return (<Card style={ { width: '18rem', margin: "1rem"} }>
        <Card.Img variant="top" src={props.data ? "https://placekitten.com/270/180" : "/loading.jpg"}></Card.Img>
        <Card.Body>
            <Card.Title>{props.data ? props.data.knownName : "Loading..."}</Card.Title>
            <Card.Text>{props.data && JSON.stringify(props.data)}</Card.Text>
        </Card.Body>
    </Card>)

    /*
    return (
        <div>
            <div> AwardWinner: {props.data.knownName === undefined ? props.data.orgName.en : props.data.knownName.en}</div>
            <div > Portion : {props.data.portion}</div>
        </div>)
    */
}