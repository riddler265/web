package org.example.validator;

import java.math.BigDecimal;

public class Validator {

    public BigDecimal validateX(String x) throws NumberFormatException {
        try {
            BigDecimal X = new BigDecimal(x);

            if (X.compareTo(BigDecimal.valueOf(-5.0)) < 0 || X.compareTo(BigDecimal.valueOf(5.0)) > 0) throw new NumberFormatException();
            return X;
        } catch (NumberFormatException e) {
            throw new NumberFormatException("X в диапазоне (-5 ; 5)");
        }
    }

    public BigDecimal validateY(String y) throws NumberFormatException {
        BigDecimal Y = new BigDecimal(y);
        int[] available = {-4, -3, -2, -1, 0, 1, 2, 3, 4};

        for (int i = 0; i < available.length; i++) {
            if (Y.compareTo(BigDecimal.valueOf(available[i])) != 0) return Y;
        } throw new NumberFormatException("Y");
    }

    public BigDecimal validateR(String r) throws NumberFormatException {
        BigDecimal R = new BigDecimal(r);
        int[] available = {1, 2, 3, 4, 5};

        for (int i = 0; i < available.length; i++) {
            if (R.compareTo(BigDecimal.valueOf(available[i])) != 0) return R;
        } throw new NumberFormatException("R");
    }

    public boolean isHit(BigDecimal X, BigDecimal Y, BigDecimal R) {
        if (X.compareTo(BigDecimal.valueOf(0)) >= 0 && X.compareTo(R.divide(BigDecimal.valueOf(2))) <= 0) {
            if (Y.compareTo(BigDecimal.valueOf(0)) >= 0 && Y.compareTo(R) <= 0) return true;
        }
        else if (X.compareTo(BigDecimal.valueOf(0)) >= 0 && Y.compareTo(BigDecimal.valueOf(0)) <= 0) {
            if (Y.compareTo(X.subtract(R)) <= 0) return true;
        }
        else if (Y.compareTo(BigDecimal.valueOf(0)) >= 0) {
            if (X.multiply(X).add(Y.multiply(Y)).compareTo(R.multiply(R).divide(BigDecimal.valueOf(4))) <= 0) return true;
        }
        return false;
    }
}