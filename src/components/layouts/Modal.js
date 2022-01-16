import {Fragment} from 'react'
import ReactDom from 'react-dom'
import classes from './Modal.module.css'
const Backdrop = props => {
    return <div onClick={props.onClose} className={classes.backdrop}/>
}
const MaodalOverlay = props => {
    return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
    </div>
    
}
const protalElement = document.getElementById('overlays')
const Modal = (props) => {
    return(
        <Fragment>
        {ReactDom.createPortal(<Backdrop  onClose={props.onClick}/>,protalElement)}
        {ReactDom.createPortal(<MaodalOverlay>{props.children}</MaodalOverlay>,protalElement)}
        <Backdrop/>
        <MaodalOverlay>{props.children}</MaodalOverlay>
        </Fragment>
    )
}
export default Modal