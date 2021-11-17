import s from '../button/Button.module.css';

export default function Button({onClick}) {
    return (
        <button type='button' onClick={onClick} className={s.Button} >More</button>
    )
}
