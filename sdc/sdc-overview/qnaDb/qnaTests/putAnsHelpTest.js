export let options = {
    stages: [
        {duration: '15s', target : 100},
        {duration: '30s', target : 100},
        {duration: '15s', target : 0}
    ]
}


export default function () {
    /*
  Randomize from last 10% of the database
  935391 to 1000011
  */
  var randomAId = parseInt((Math.random() * (6879306 - 6191375) + 6191375));
    let res = http.put(`http://localhost:3050/fec2/hr-rpp/qna/answers/${randomAId}/helpful`);
    check(res, {'status was 200': r => r.status === 200});
    check(res, {'status was 400': r => r.status === 400});
    sleep(1);
}