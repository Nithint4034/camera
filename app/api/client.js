import axios from 'axios';

export default axios.create({ baseURL: 'http://10.10.5.130:8790' });  //Local
// export default axios.create({ baseURL: 'http://10.10.2.42:8082' });  //Server


