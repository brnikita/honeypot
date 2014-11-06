honeypot
========
<h4>Generate self-signed certificate:</h4>
<pre>
openssl genrsa -out private-key.pem 1024
openssl req -new -key private-key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem
</pre>

<h4>Server installation:</h4>
<pre>
npm install
sudo npm install forever --global
</pre>

<h4>Start server:</h4>
<pre>
forever start honeypot/honeypot.js
forever start server.js
</pre>