
function Button({ text, onClick,add, disabled = false }) {
    return (
        <button
            className={' bg-action w-8 h-7 rounded-md text-white font-bold cursor-pointer hover:bg-blue-400 delay-0 transition-all ease-in-out '}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;
