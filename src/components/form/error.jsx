const ErrorModal = () => {
    return (
        <dialog id="error-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Помилка!</h3>
                <p className="py-4">Анкета вже існує!</p>
                <p className="py-4">Слідкуйте за результатами перевірки у нашому Discord сервері!</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn"> Закрити</button>
                    </form>
                </div>
            </div>
        </dialog>)
}

export default ErrorModal;