import Loader from "react-loader-spinner";
import s from '../spinner/'
export default class Loader extends React.Component {
  //other logic
  render() {
      return (
        <div className='s.spinner'>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    );
  }
}