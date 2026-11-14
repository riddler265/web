package org.example.validator;

import java.math.BigDecimal;

public class Validator {

    public BigDecimal validateX(String x) throws NumberFormatException {
        try {
            BigDecimal X = new BigDecimal(x);

            if (X.compareTo(BigDecimal.valueOf(-5.0)) <= 0 || X.compareTo(BigDecimal.valueOf(5.0)) >= 0) {
                throw new NumberFormatException();
            } return X;
        } catch (NumberFormatException e) {
            throw new NumberFormatException("X в пределах (-5 ; 5)");
        }
    }

    public BigDecimal validateY(String y) throws NumberFormatException {
        BigDecimal Y = new BigDecimal(y);
        int[] available = {-4, -3, -2, -1, 0, 1, 2, 3, 4};

        for (int a : available) {
            if (Y.compareTo(BigDecimal.valueOf(a)) == 0) return Y;
        } throw new NumberFormatException("Y - целое число в пределах [-4, 4]");
    }

    public BigDecimal validateR(String r) throws NumberFormatException {
        BigDecimal R = new BigDecimal(r);
        int[] available = {1, 2, 3, 4, 5};

        for (int a : available) {
            if (R.compareTo(BigDecimal.valueOf(a)) == 0) return R;
        } throw new NumberFormatException("R - целое число в пределах [1, 5]");
    }

    public boolean isHit(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal halfR = r.divide(BigDecimal.valueOf(2));

        boolean rect = x.signum() >= 0 && x.compareTo(halfR) <= 0
                && y.signum() >= 0 && y.compareTo(r) <= 0;

        boolean triangle = x.signum() >= 0 && x.compareTo(r) <= 0
                && y.signum() <= 0 && y.compareTo(x.subtract(r)) >= 0;

        boolean circle = y.signum() >= 0 && x.multiply(x).add(y.multiply(y))
                .compareTo(r.multiply(r).divide(BigDecimal.valueOf(4))) <= 0;

        return rect || triangle || circle;
    }
}