 interface SubHeading{
    subHeading: string
 }
 
 export default function SubHeading({subHeading}: SubHeading) {
    return (
        <>
        <p style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontSize:'18px',
            opacity:'60%',
            margin:'0px auto',
            paddingLeft:'10px',
            paddingRight:'10px',
            textAlign:'center'
        }} >
            {subHeading}
        </p>
        </>
    )
 }