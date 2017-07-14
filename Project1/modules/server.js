let http = require('http');
let url = require('url'); //посмотреть назначение модуля url

function start() {
    function generateServer(req, res) {
        let path = url.parse(req.url).pathname,
            arr = path.split('/'),
            str;

        res.writeHead(200, {"Content-Type":"text/html"});
        switch  (arr[3]) {
            case '+':
                str = arr[1] + arr[2];
                res.write(str.toString());
                break;
            case '-':
                str = arr[1] - arr[2];
                res.write(str.toString());
                break;
            case '*':
                str = arr[1] * arr[2];
                res.write(str.toString());
                break;
            case '/':
                str = arr[1] / arr[2];
                res.write(str.toString());
                break;
            default:
                res.write('404');
                break;
        }

        res.end();
    }

    http.createServer(generateServer).listen(300);
    console.log('Server running on port 300');
}

exports.st = start; //задание экспортируемой функции для странички index.js