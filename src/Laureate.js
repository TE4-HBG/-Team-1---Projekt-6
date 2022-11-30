export default function Laureate(props) {
    return (
        <div>
            <div>{props.data.knownName === undefined ? props.data.orgName.en : props.data.knownName.en}</div>
        </div>)
}