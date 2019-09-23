const { Component } = React

class App extends Component {
    constructor() {
        super()

        let credentials

        const { id, token } = sessionStorage

        id && token && (credentials = { id, token })

        this.state = { view: 'landing', credentials, error: undefined, register_success: undefined , query: undefined, collection: undefined}

        this.handleBackToLanding = this.handleBackToLanding.bind(this)
        this.handleGoToLogIn = this.handleGoToLogIn.bind(this)
        this.handleSubmitLogIn = this.handleSubmitLogIn.bind(this)
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
        this.handleGoToSignUp = this.handleGoToSignUp.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)

    }

    handleBackToLanding() {
        this.setState({ view: 'landing' })

    }

    handleGoToSignUp() {
        this.setState({ view: 'signup', error: undefined })
    }


    handleSubmitSignUp(name, surname, email, password, repassword){
        try {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => this.setState({ view: 'login', register_success: true, error: undefined}))
                .catch(({ message }) => this.setState({ error: message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoToLogIn(query, collection) {
        this.setState({ view: 'login', error: undefined, register_success: undefined, query, collection })
    }

    handleSubmitLogIn(email, password) {
        try {
            logic.authenticateUser(email, password)
                .then(credentials => {

                    sessionStorage.id = credentials.id
                    sessionStorage.token = credentials.token

                    this.setState({ view: 'landing', credentials, register_success: undefined })})
                .catch(({ message }) => this.setState({ error: message}))
        } catch ({message}) {
            this.setState({ error: message })
        }
    }

    handleLogOut(){
        

        delete sessionStorage.id 
        delete sessionStorage.token 

        this.setState({credentials: undefined})
    }

    render() {
        const { state: { view, credentials, error, register_success, query, collection }, handleBackToLanding, handleSubmitLogIn, handleSubmitSignUp, handleGoToLogIn, handleGoToSignUp, handleLogOut } = this

        return <>
            {view === 'landing' && <Landing goToLogin={handleGoToLogIn} query={query} collection={collection} credentials={credentials} onLogOut={handleLogOut} />}
            {view === 'login' && <LogIn onClose={handleBackToLanding} onLogIn={handleSubmitLogIn} error={error} register_success={register_success} toSignUp={handleGoToSignUp} />}

            {view === 'signup' && <SignUp onClose={handleBackToLanding} onSignUp={handleSubmitSignUp} error={error} toLogIn={handleGoToLogIn} />}
        </>
    }
}