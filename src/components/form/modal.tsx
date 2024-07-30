const Modal = () => {

    function closeModal() {
        const modal = document.getElementById('successModal');
        modal.close();
        window.location.href = '/';
    }

    return (
        <div>
            <dialog id="successModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Анкету збережено!</h3>
                    <p className="py-4">Ваші відповіді були збережені і надіслані на перевірку</p>
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