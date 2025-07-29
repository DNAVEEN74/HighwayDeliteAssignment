import '../styles/googleAuthButton.css'

interface IPars {
    type: string
}

export function GoogleAuthButton ({type}: IPars) {

    const handleSubmit = () => {
    }

    return (
        <>
        <button className="googleAuthButton" onClick={handleSubmit}>
            <span className="googleAuthText">Continue with Google</span>
        </button>
        </>
    )
}