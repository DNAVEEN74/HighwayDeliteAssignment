import '../styles/inputBox.css';

interface InputCompPars {
    title: string,
    placeholder: string,
    name: string,
    value: string,
    onChange: (e: any) => void
}

export default function InputBox({ title, placeholder, name, value, onChange }: InputCompPars) {
    return (
        <div className="inputBoxContainer">
            <label className="floatingLabel" htmlFor={name}>{title}</label>
            <input
                className="inputfield"
                id={name}
                type={name === 'password' ? 'password' : 'text'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}