const http=require('http');
const host='localhost';
const port=3000;
const url=require('url')

const server=http.createServer((req,res)=>{
  const path=url.parse(req.url).pathname

  if(path==='/'){
    res.writeHead(200, {'Content-type':'text-html'})
    res.end('<h1>Home Page!</h1>')
  }else if(path==='/post'){
    res.writeHead(200, {'Content-type':'text-html'})
    res.end('<h1>Post Page!</h1>')
  }else if(path==='/user'){
    res.writeHead(200, {'Content-type':'text-html'})
    res.end('<h1>User Page!</h1>')
  }else{
    res.writeHead(404, {'Content-type':'text-html'})
    res.end('<h1>404 Page not found</h1>')   
  }
})

server.listen(port, host, ()=>{
  console.log('server running on http://localhost:3000')
})