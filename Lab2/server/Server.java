package server;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;

import com.fastcgi.FCGIInterface;


class Server {

    final static long SERVER_START_TIME = System.nanoTime();

    public static void main(String[] args) {
        
        FCGIInterface fcgiInterface = new FCGIInterface();

        while (fcgiInterface.FCGIaccept() >= 0) {

            try {
                final BigDecimal X, Y, R;
                final boolean IS_HIT;
                String CURRENT_TIME = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);
                final double SERVER_WORK_TIME = (System.nanoTime() - SERVER_START_TIME) / 1_000_000.0;


                String rawInput = System.getProperty("QUERY_STRING");
                String[] rawParams = rawInput.split("&");

                for (int i = 0; i < rawParams.length; i++) {
                    rawParams[i] = rawParams[i].replaceAll("[XYZ]=\\s*", "");
                }

                R = validateR(rawParams[0]);
                Y = validateY(rawParams[1]);
                X = validateX(rawParams[2]);
                
                IS_HIT = isHit(X, Y, R);

                success(X, Y, R, IS_HIT, CURRENT_TIME, SERVER_WORK_TIME);
                
            } catch (NumberFormatException e) {
                fail(e.getMessage());
            } catch (Exception e) {
                fail("Internal Server Error");
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

    static boolean isHit(BigDecimal X, BigDecimal Y, BigDecimal R) {
        if (X.compareTo(BigDecimal.ZERO) >= 0 && X.compareTo(R.divide(BigDecimal.TWO)) <= 0) {
            if (Y.compareTo(BigDecimal.ZERO) >= 0 && Y.compareTo(R) <= 0) return true;
        } 
        else if (X.compareTo(BigDecimal.ZERO) >= 0 && Y.compareTo(BigDecimal.ZERO) <= 0) {
            if (Y.compareTo(X.add(R)) <= 0) return true;
        }
        else if (Y.compareTo(BigDecimal.ZERO) >= 0) {
            if (X.multiply(X).add(Y.multiply(Y)).compareTo(R.multiply(R).divide(BigDecimal.valueOf(0.25))) <= 0) return true;
        }
        return false;
    }

    static void success(BigDecimal x, BigDecimal y, BigDecimal r, boolean is_hit, String current_time, double server_work_time) {

        String json = String.format(
            "{\"x\": \"%s\", \"y\": \"%s\", \"r\": \"%s\", \"is_hit\": %b, \"curren_time\": \"%s\", \"server_work_time\": %d}",
        x.toString(), y.toString(), r.toString(), is_hit, current_time, server_work_time);

        String httpResponse = "Content-Type: application/json\r\n" +
                "Content-Length: " + json.getBytes(StandardCharsets.UTF_8).length + "\r\n\r\n" +
                json;
        System.out.println(httpResponse);
    }

    static void fail(String message) {
        String json = String.format("{\"error\": \"%s\"}", message);
        String httpResponse = "Status: 400 Bad Request\r\n" +
                "Content-Type: application/json\r\n" +
                "Content-Length: " + json.getBytes(StandardCharsets.UTF_8).length + "\r\n\r\n" +
                json;
        System.out.println(httpResponse);
    }
}
