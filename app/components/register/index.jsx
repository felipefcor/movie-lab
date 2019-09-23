function SignUp({ onSignUp, onClose, toLogIn, error }) {
    return <>
        <a href="" className="close" onClick={event => {
            event.preventDefault()

            onClose()
        }}></a>
        <div className="form-panel">

        <h3 className="big-letter">BECOME A MOVIE LAB MEMBER</h3>
        <form method="get" autoComplete= "off" id="form1" onSubmit={event => {
            event.preventDefault()
            const { target: { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password }, repassword: { value: repassword } } } = event
            onSignUp(name, surname, email, password, repassword)
        }}>
            <label><input type="text" name="name" placeholder="Name" /></label>
            <label><input type="text" name="surname" placeholder="Surname" /></label>
            <label><input type="email" name="email" placeholder="Email" /></label>
            <label><input type="password" name="password" placeholder="Password" /></label>
            <label><input type="password" name="repassword" placeholder="Repeat password" /></label>
        </form>
        {error && <Feedback message={error} />}
        <button type="submit" className="button" form="form1">SIGN UP NOW</button>

        <a href="" className="button" onClick={event => {
            event.preventDefault()

            toLogIn()
        }}>LOG IN</a>
        </div>
    </>
}