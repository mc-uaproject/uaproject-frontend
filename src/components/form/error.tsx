const Modal = () => {

    function closeModal() {
        const modal = document.getElementById('errorModal');
        modal.close();
        window.location.href = '/';
    }

    return (
        <div>
            <dialog id="errorModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Помилка!</h3>
                    <p className="py-4">Ви вже надсилали свою анкету!</p>
                    <p className="py-4">Слідкуйте за результатами перевірки у нашому Discord сервері!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={closeModal} className="btn">Закрити</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>);
}

export default Modal;