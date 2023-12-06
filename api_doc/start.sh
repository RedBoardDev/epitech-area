npm list -g http-server > /dev/null
if [ $? -ne 0 ]; then
    sudo npm install -g http-server
fi
http-server
