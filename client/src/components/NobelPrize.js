import { Container } from "react-bootstrap";


export default function NobelPrize(props) {
    return (
        <Container>
            {JSON.stringify(props.data)}
        </Container>
    )
    /*
    return  props.data===null ? <div>loading...</div> :
    (<div className ="NobelPrize">
        <div> Award Year: {props.data.awardYear}</div>
        <div> Category: {props.data.category_en}</div>
        
        {props.data.laureates === undefined ? 
            <div>price was not given out</div> : 
            
            props.data.laureates.map((laureate) => {return <Laureate data={laureate} key={laureate.id} />})}
        <div> prizeAmount: {props.data.prizeAmount}</div>
        <div> prizeAmountAdjusted: {props.data.prizeAmountAdjusted}</div>
        
        
    </div>)
    */
}