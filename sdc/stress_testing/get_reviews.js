import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://localhost:3050/fec2/hr-rpp/reviews/64620');
  sleep(1);
}