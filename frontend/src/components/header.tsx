interface Title {
    title: string
}

export default function Header({title}: Title) {
    return (
        <>
        <h1 style={{
            fontFamily: "sans-serif",
            fontWeight:"bolder",
            margin:'0px auto',
            fontSize:"40px"
            }} > 
            {title} 
        </h1>
        </>
    )
}