package server;

import com.fastcgi.FCGIInterface;

class Server {

    public static void main(String[] args) {
        
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {
            
        }
    }
}
