package org.example;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;

import org.example.validator.Validator;
import com.fastcgi.FCGIInterface;

class Server {

    final static long SERVER_START_TIME = System.nanoTime();

    public static void main(String[] args) {

        FCGIInterface fcgiInterface = new FCGIInterface();
        System.out.println("Server Started");

        Validator validator = new Validator();

        while (fcgiInterface.FCGIaccept() >= 0) {

            try {
                final BigDecimal X, Y, R;
                final boolean IS_HIT;
                String CURRENT_TIME = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT);
                final double SERVER_WORK_TIME = (System.nanoTime() - SERVER_START_TIME) / 1_000_000.0;


                String rawInput = System.getProperty("QUERY_STRING");
                String[] rawParams = rawInput.split("&");

                for (int i = 0; i < rawParams.length; i++) {
                    rawParams[i] = rawParams[i].replaceAll("[XYR]=\\s*", "");
                }

                R = validator.validateR(rawParams[0]);
                Y = validator.validateY(rawParams[1]);
                X = validator.validateX(rawParams[2]);

                IS_HIT = validator.isHit(X, Y, R);

                success(X, Y, R, IS_HIT, CURRENT_TIME, SERVER_WORK_TIME);

            } catch (NumberFormatException e) {
                fail(e.getMessage());
            } catch (Exception e) {
                fail("Internal Server Error");
            }
        }
    }

    static void success(BigDecimal x, BigDecimal y, BigDecimal r, boolean is_hit, String current_time, double server_work_time) {

        String json = String.format(Locale.ROOT,
                "{\"x\": \"%s\", \"y\": \"%s\", \"r\": \"%s\", \"is_hit\": %b, \"current_time\": \"%s\", \"server_work_time\": %.3f}",
                x, y, r, is_hit, current_time, server_work_time);

        String httpResponse = "Status: 200 Ok\r\n" + 
                "Content-Type: application/json\r\n" +
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
