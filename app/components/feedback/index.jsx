function Feedback({ message, level }) { // level: 'error', 'warn', 'success'
    return <p className={`feedback feedback--${level? level : 'error'}`}>{message}</p>
}