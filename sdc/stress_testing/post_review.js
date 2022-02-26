import http from 'k6/http';
export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:3050/fec2/hr-rpp/reviews';
  const payload = JSON.stringify({
    "product_id": "64620",
    "rating": "3",
    "summary": "hello",
    "body": "I'm from postman",
    "recommend": "false",
    "name": "dxfhdfh",
    "email": "dfghdfhdf@mail.com",
    "photos": [],
    "characteristics": "{ '1': 3, '2': 1, '3': 1, '4': 1 }"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}