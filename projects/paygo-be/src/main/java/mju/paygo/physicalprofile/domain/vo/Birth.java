package mju.paygo.physicalprofile.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.physicalprofile.exception.exceptions.BirthInputException;

import java.util.Arrays;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Birth {

    private static final String DELIMITER = "\\.";
    private static final int YEAR_INDEX = 0;
    private static final int MONTH_INDEX = 1;
    private static final int DAY_INDEX = 2;
    private static final int TOKEN_SIZE = 3;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer month;

    @Column(nullable = false)
    private Integer day;

    public Birth(final Integer year, final Integer month, final Integer day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public static Birth from(final String birthInput) {
        validateInput(birthInput);
        String[] tokens = birthInput.split(DELIMITER);
        int year = Integer.parseInt(tokens[YEAR_INDEX]);
        int month = Integer.parseInt(tokens[MONTH_INDEX]);
        int day = Integer.parseInt(tokens[DAY_INDEX]);

        return new Birth(year, month, day);
    }

    private static void validateInput(final String input) {
        validateSize(input);
        validateNumberFormat(input);
    }

    private static void validateSize(final String input) {
        if (input.split(DELIMITER).length != TOKEN_SIZE) {
            System.out.println("사이즈 에러");
            System.out.println(input.split(DELIMITER).length);
            throw new BirthInputException();
        }
    }

    private static void validateNumberFormat(final String input) {
        try {
            int[] tokens = Arrays.stream(input.split(DELIMITER))
                    .mapToInt(Integer::parseInt)
                    .toArray();
        } catch (NumberFormatException e) {
            System.out.println("형식 에러");
            throw new BirthInputException();
        }
    }
}
