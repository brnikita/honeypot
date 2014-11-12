honeypot
========
<h4>Generate self-signed certificate:</h4>
<pre>
openssl genrsa -out private-key.pem 2048
openssl req -new -nodes -out req.csr -config req.conf
openssl x509 -req -in req.csr -signkey private-key.pem -out public-cert.pem
</pre>

<h4>Server installation:</h4>
<pre>
npm install
sudo npm install forever --global
</pre>

<h4>Start server:</h4>
<pre>
forever start honeypot/honeypot.js
forever start server/server.js
</pre>

<h4>Start tests</h4>
<pre>
sudo npm install -g mocha
mocha
</pre>