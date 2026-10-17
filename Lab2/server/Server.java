package server;

import java.math.BigDecimal;
import com.fastcgi.FCGIInterface;


class Server {

    public static void main(String[] args) {
        
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {

            try {
                String rawInput = System.getProperty("QUERY_STRING");

                BigDecimal X, Y, R;

                String[] rawParams = rawInput.split("&");

                for (int i = 0; i < rawParams.length; i++) {
                    rawParams[i] = rawParams[i].replaceAll("[XYZ]=\\s*", "");
                }

                R = validateR(rawParams[0]);
                Y = validateY(rawParams[1]);
                X = validateX(rawParams[2]);
                



                
            } catch (NumberFormatException e) {

            }
        }  
    }

    static BigDecimal validateX(String x) throws NumberFormatException {
        BigDecimal X = new BigDecimal(x);

        if (X.compareTo(BigDecimal.valueOf(-5.0)) < 0 || X.compareTo(BigDecimal.valueOf(5.0)) > 0) throw new NumberFormatException("X");
        return X;
    }

    static BigDecimal validateY(String y) throws NumberFormatException {
        BigDecimal Y = new BigDecimal(y);
        int[] available = {-4, -3, -2, -1, 0, 1, 2, 3, 4};

        for (int i = 0; i < available.length; i++) {
            if (Y.compareTo(BigDecimal.valueOf(available[i])) != 0) throw new NumberFormatException("Y");
        } return Y;
    }

    static BigDecimal validateR(String r) throws NumberFormatException {
        BigDecimal R = new BigDecimal(r);
        int[] available = {1, 2, 3, 4, 5};

        for (int i = 0; i < available.length; i++) {
            if (R.compareTo(BigDecimal.valueOf(available[i])) != 0) throw new NumberFormatException("R");
        } return R;
    }


}
