import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        {duration: '15s', target : 1000},
        {duration: '30s', target : 4000},
        {duration: '15s', target : 0}
    ]
}


export default function () {
  /*
  Randomize from last 10% of the database
  935391 to 1000011
  */
  var randomInt = parseInt((Math.random() * (1000011 - 935391) + 935391));
  let res = http.get('http://localhost:3050/fec2/hr-rpp/qna/questions/product_id=' + randomInt);
  check(res, {'status was 200': r => r.status === 200});
  check(res, {'status was 400': r => r.status === 400});
  sleep(1);
}
