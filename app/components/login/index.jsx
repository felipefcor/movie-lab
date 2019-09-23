function LogIn({ onLogIn, toSignUp, onClose, error, register_success }) {
    return <>

        <a href="" className="close" onClick={event => {
            event.preventDefault()

            onClose()
        }}></a>

        <div className="form-panel">
            <h3 className="big-letter">LOG IN</h3>
            <form id="form-log"method="get" autoComplete="off" id="form1" onSubmit={event => {
                event.preventDefault()
                const { target: { username: { value: username }, password: { value: password } } } = event
                onLogIn(username, password)
            }}>
                <label><input type="text" name="username" placeholder="Enter your email" /></label>
                <label><input type="password" name="password" placeholder="Enter your password" /></label>
            </form>


            

            {error? 
            <Feedback message={error}/> 
            :
            register_success && <Feedback message='Register successful' level='success' /> }
            <button type="submit" className="button" form="form1">LOG IN</button>


            <a href="" className="button" onClick={event => {
                event.preventDefault()


                toSignUp()

            }}>SIGN UP</a>
        </div>

    </>
}