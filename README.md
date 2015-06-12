Honeypot Test
========
<ul>
<li>
Create a node.js server that supports TLS v1.2.
</li>
<li>
It opens a port (8765) for accepting connections.
</li>
<li>
The packets that it accepts on this connection have a certain specific payload-header (all packets start with the sequence 0xABCD1234DEADBEEF).
</li>
<li>
If the payload-header is not this specific header, then the connection must be re-routed to another similar node.js server called the honeypot.
</li>
<li>
The honeypot responds with some random garbage to all input
</li>
<li>
It records all incoming packets into a database.
</li>
<li>
It also records the IP address and the port of the source of input.
</li>
</ul>

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
