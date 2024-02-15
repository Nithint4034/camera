import axios from 'axios';

export default axios.create({ baseURL: 'http://poi.deducetech.com:6831' });  //Local
// export default axios.create({ baseURL: 'http://10.10.5.130:8793' });  //Server


