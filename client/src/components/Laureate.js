import { Card } from "react-bootstrap";

export default function Laureate(props) {
    return (<Card style={ { width: '18rem', margin: "1rem"} }>
        <Card.Img variant="top" src="https://placekitten.com/286/180"></Card.Img>
        <Card.Body>
            <Card.Title>{props.data && props.data.knownName}</Card.Title>
            {JSON.stringify(props.data)}
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