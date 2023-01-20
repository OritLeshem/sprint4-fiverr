import { LoginSignup } from "../user/login-signup"

export function Modal({ onLogin, onSignup, onCloseModal }) {

    return <section className="modal">
        <div className="content">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} onCloseModal={onCloseModal}/>
        </div>
    </section>
}