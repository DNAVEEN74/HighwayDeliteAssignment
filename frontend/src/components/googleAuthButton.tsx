import '../styles/googleAuthButton.css'


interface IPars {
  type: string;
}

export function GoogleAuthButton({ type }: IPars) {

  const handleSubmit = () => {
    window.location.href = `http://localhost:3000/auth/google`;
  };

  return (
    <>
      <button className="googleAuthButton" onClick={handleSubmit}>
        <span className="googleAuthText">{type} with Google</span>
      </button>
    </>
  );
}