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
            <div className="inputFieldTitle">
                <h3 style={{ margin: '5px', marginLeft: '0px' }}>{title}</h3>
            </div>
            <input
                className='inputfield'
                type={name === 'password' ? 'password' : 'text'}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}