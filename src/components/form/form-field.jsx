const FormField = ({ label, name, type = 'text', value, onChange, error, options, hidden, inline }) => {
    if (hidden) return null;
    return (
        <div className={`form-group ${inline ? 'inline' : ''} ${error ? 'has-error' : ''}`}>
            <label>
                {label}
                {type === 'select' ? (
                    <select name={name} value={value} onChange={onChange} className={error ? 'input-error' : ''}>
                        <option value="">Оберіть ваш варіант</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea name={name} value={value} onChange={onChange} className={error ? 'input-error' : ''} />
                ) : (
                    <input type={type} name={name} value={value} onChange={onChange} className={error ? 'input-error' : ''} />
                )}
                {error && <span className="error-text">{error}</span>}
            </label>
        </div>
    );
};

export default FormField;