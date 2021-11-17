import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from '../spinner/Spinner.module.css';

export default function Spinner() {
    return (
         
        <div>
            <Loader
                className = { s.spinner }
                    type="ThreeDots"
                    color="#3f51b5"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs  
          />
        </div>
    )
}



